import { useState, useCallback, useRef } from 'react';
import { analyzeContent } from '../services/geminiService';

const ERROR_MESSAGES = {
  'GROQ_API_KEY_MISSING':   '🔑 API Key Missing — Add your VITE_GROQ_API_KEY to the .env file and restart the dev server.',
  'EMPTY_RESPONSE':         '⚠️ The AI returned an empty response. Please try again.',
  'PARSE_ERROR':            '⚠️ Could not parse the AI response. Please try again.',
  'INVALID_SCHEMA':         '⚠️ AI returned an unexpected format. Please try again.',
  'API_ERROR_400':          '❌ Bad request — the input may be too large or contain unsupported content.',
  'API_ERROR_403':          '🔑 Invalid API Key — verify your VITE_GROQ_API_KEY is correct.',
  'API_ERROR_503':          '🔄 AI is temporarily overloaded — please try again shortly.',
  'TIMEOUT':                '⏱️ Request timed out — please try again.',
};

export function useGeminiAnalysis() {
  const [isLoading, setIsLoading]     = useState(false);
  const [result, setResult]           = useState(null);
  const [error, setError]             = useState(null);
  const [retryInfo, setRetryInfo]     = useState(null);
  const countdownRef                  = useRef(null);

  const clearCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const analyze = useCallback(async (content, contentType) => {
    if (!content?.trim()) {
      setError('Please paste some content to analyze before clicking Analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setRetryInfo(null);
    clearCountdown();

    const handleRetry = (waitSec, attempt, total) => {
      let remaining = waitSec;
      setRetryInfo({ waitSec: remaining, attempt, total });
      countdownRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearCountdown();
          setRetryInfo(null);
        } else {
          setRetryInfo({ waitSec: remaining, attempt, total });
        }
      }, 1000);
    };

    try {
      const data = await analyzeContent(content, contentType, handleRetry);
      setResult(data);
    } catch (err) {
      const msg = err.message || '';
      if (msg.startsWith('API_ERROR_429')) {
        const detail = msg.replace('API_ERROR_429', '').replace(/^:\s*/, '').trim();
        setError(`⏳ Rate limited. ${detail ? `Groq says: "${detail}"` : 'Please wait a moment and try again.'}`);
      } else {
        const prefix = Object.keys(ERROR_MESSAGES).find(k => msg.startsWith(k));
        if (prefix) {
          setError(ERROR_MESSAGES[prefix]);
        } else if (msg.startsWith('UNKNOWN: ')) {
          setError(`❌ ${msg.replace('UNKNOWN: ', '')}`);
        } else {
          setError(`❌ ${msg}`);
        }
      }
    } finally {
      clearCountdown();
      setRetryInfo(null);
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setRetryInfo(null);
    clearCountdown();
  }, []);

  return { isLoading, result, error, retryInfo, analyze, reset };
}
