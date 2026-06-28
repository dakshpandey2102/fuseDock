# Sentinel AI

An AI-powered cybersecurity triage workspace built with React + Vite + Gemini API.

## Setup

1. Clone/download the repo
2. Copy `.env.example` to `.env` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

1. Push to GitHub
2. Import into Vercel
3. Add environment variable: `VITE_GEMINI_API_KEY`
4. Deploy

## Features

- 🔍 Analyze emails, URLs, scripts, logs, or generic text
- 🎯 Threat Score Gauge (0–10) with animated SVG arc
- 🛡️ MITRE ATT&CK technique mapping with links
- 🔗 Color-coded IOC extraction (IPs, domains, hashes, URLs)
- 📋 Professional SOC report + plain English summary
- 🔄 Professional/Simple mode toggle
- 📎 5 built-in sample inputs (phishing, URL, SQLi, PowerShell, Bash)
- ✅ Full error handling (empty input, API key, rate limits, parse errors)

## Tech Stack

- React 18 + Vite
- Tailwind CSS v3
- Framer Motion
- Lucide React
- React Hot Toast
- Axios
- Google Gemini 1.5 Flash API
"# fuseDock" 
"# fuseDock" 
