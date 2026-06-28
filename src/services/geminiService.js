const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_NAME = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are a Senior SOC (Security Operations Center) Analyst. Analyze the content and return ONLY a valid JSON object. No markdown, no code fences, no extra text — pure JSON only.

JSON schema:
{
  "threatScore": <0-10 integer>,
  "severity": <"Critical"|"High"|"Medium"|"Low"|"Info">,
  "threatType": <string>,
  "summary": <2-4 sentence analysis>,
  "iocs": <string array of indicators of compromise>,
  "mitre": <"TXXXX - Technique Name">,
  "mitigation": <string array of 4-6 steps>,
  "socReport": <4-8 sentence formal SOC report>,
  "simpleExplanation": <2-4 sentences for non-technical users>
}`;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function callGroq(prompt) {
  const body = {
    model: MODEL_NAME,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    temperature: 0.1,
    response_format: { type: 'json_object' }
  };

  const res = await fetch(URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json())?.error?.message || ''; } catch { /* ignore */ }
    const err = new Error(`HTTP_${res.status}: ${detail || res.statusText}`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  const rawText = data?.choices?.[0]?.message?.content;
  if (!rawText?.trim()) throw new Error('EMPTY_RESPONSE');
  return rawText;
}

function parseAndValidate(rawText) {
  let cleaned = rawText.trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/, '')
    .replace(/\s*```$/, '')
    .trim();

  let parsed;
  try { parsed = JSON.parse(cleaned); }
  catch {
    console.error('[Sentinel AI] JSON parse failed:', cleaned.slice(0, 200));
    throw new Error('PARSE_ERROR');
  }

  const required = ['threatScore','severity','threatType','summary','iocs','mitre','mitigation','socReport','simpleExplanation'];
  const missing = required.filter(k => !(k in parsed));
  if (missing.length) throw new Error(`INVALID_SCHEMA: ${missing.join(', ')}`);

  return {
    threatScore:       Math.min(10, Math.max(0, parseInt(parsed.threatScore) || 0)),
    severity:          parsed.severity || 'Info',
    threatType:        parsed.threatType || 'Unknown',
    summary:           parsed.summary || '',
    iocs:              Array.isArray(parsed.iocs) ? parsed.iocs : [],
    mitre:             parsed.mitre || 'Unknown',
    mitigation:        Array.isArray(parsed.mitigation) ? parsed.mitigation : [],
    socReport:         parsed.socReport || '',
    simpleExplanation: parsed.simpleExplanation || '',
  };
}

export async function analyzeContent(content, contentType, onRetry) {
  if (!API_KEY || API_KEY === 'your_groq_api_key_here') {
    throw new Error('GROQ_API_KEY_MISSING');
  }

  const prompt = `CONTENT TYPE: ${contentType.toUpperCase()}\n\nANALYZE THIS CONTENT:\n---\n${content}\n---\n\nReturn ONLY the JSON object.`;

  let lastError = null;
  const RETRY_DELAYS = [2000, 4000]; // Groq is fast, short retries

  for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
    try {
      console.log(`[Sentinel AI] Calling Groq (attempt ${attempt + 1})`);
      const rawText = await callGroq(prompt);
      console.log(`[Sentinel AI] ✅ Success with Groq`);
      return parseAndValidate(rawText);

    } catch (err) {
      lastError = err;
      const status = err.status || 0;
      const msg = err.message || '';

      console.warn(`[Sentinel AI] Groq attempt ${attempt + 1} failed:`, msg);

      // 429 Rate limit
      if (status === 429 || msg.includes('429')) {
        if (attempt < RETRY_DELAYS.length) {
          const waitSec = RETRY_DELAYS[attempt] / 1000;
          console.warn(`[Sentinel AI] Rate limited. Waiting ${waitSec}s before retry...`);
          onRetry?.(waitSec, attempt + 1, RETRY_DELAYS.length);
          await sleep(RETRY_DELAYS[attempt]);
          continue;
        }
      }

      if (status === 400) throw new Error('API_ERROR_400');
      if (status === 401 || status === 403) throw new Error('API_ERROR_403');
      if (status === 503 || status === 500) throw new Error('API_ERROR_503');

      const known = ['GROQ_API_KEY_MISSING','EMPTY_RESPONSE','PARSE_ERROR','INVALID_SCHEMA'];
      if (known.some(p => msg.startsWith(p))) throw err;

      throw new Error(`UNKNOWN: ${msg}`);
    }
  }

  const detail = lastError?.message || '';
  throw new Error(`API_ERROR_429: ${detail}`);
}
