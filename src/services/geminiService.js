import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-3.1-flash-lite';

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

async function callGemini(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    systemInstruction: SYSTEM_PROMPT
  });

  const generationConfig = {
    temperature: 0.1,
    responseMimeType: "application/json",
  };

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig
  });

  const response = await result.response;
  return response.text();
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
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY_MISSING');
  }

  const prompt = `CONTENT TYPE: ${contentType.toUpperCase()}\n\nANALYZE THIS CONTENT:\n---\n${content}\n---\n\nReturn ONLY the JSON object.`;

  let lastError = null;
  const RETRY_DELAYS = [2000, 4000]; 

  for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
    try {
      console.log(`[Sentinel AI] Calling Gemini (attempt ${attempt + 1})`);
      const rawText = await callGemini(prompt);
      console.log(`[Sentinel AI] ✅ Success with Gemini`);
      return parseAndValidate(rawText);

    } catch (err) {
      lastError = err;
      const status = err.status || err.response?.status || 0;
      const msg = err.message || '';

      console.warn(`[Sentinel AI] Gemini attempt ${attempt + 1} failed:`, msg);

      // 429 Rate limit
      if (status === 429 || msg.includes('429') || msg.toLowerCase().includes('quota')) {
        if (attempt < RETRY_DELAYS.length) {
          const waitSec = RETRY_DELAYS[attempt] / 1000;
          console.warn(`[Sentinel AI] Rate limited. Waiting ${waitSec}s before retry...`);
          onRetry?.(waitSec, attempt + 1, RETRY_DELAYS.length);
          await sleep(RETRY_DELAYS[attempt]);
          continue;
        }
      }

      if (status === 400) throw new Error('API_ERROR_400');
      if (status === 401 || status === 403 || msg.includes('API key not valid')) throw new Error('API_ERROR_403');
      if (status === 503 || status === 500) throw new Error('API_ERROR_503');

      const known = ['GEMINI_API_KEY_MISSING','EMPTY_RESPONSE','PARSE_ERROR','INVALID_SCHEMA'];
      if (known.some(p => msg.startsWith(p))) throw err;

      throw new Error(`UNKNOWN: ${msg}`);
    }
  }

  const detail = lastError?.message || '';
  throw new Error(`API_ERROR_429: ${detail}`);
}
