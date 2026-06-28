# 🛡️ Sentinel AI

![Sentinel AI Banner](https://via.placeholder.com/1200x400/0a0a0a/00d4ff?text=Sentinel+AI+-+Next+Gen+SOC+Triage)

**Sentinel AI** is a blazing-fast, frontend-only cybersecurity triage workspace designed for modern Security Operations Centers (SOC). It empowers security analysts to instantly analyze suspicious emails, URLs, scripts, logs, and raw text to extract actionable threat intelligence.

Powered by **Llama 3.3 70B** via the **Groq API**, Sentinel AI delivers near-instantaneous, structured JSON threat assessments—bypassing the need for complex backend infrastructure.

---

## ✨ Features

- **⚡ Lightning Fast AI Inference**: Utilizes Groq's LPU architecture and Llama 3 to analyze threats in milliseconds.
- **🎯 Precision JSON Parsing**: The AI is strictly engineered to output guaranteed JSON schemas for seamless frontend integration.
- **🎨 Premium Enterprise Dashboard**: A dark-mode, glassmorphism UI inspired by CrowdStrike and Microsoft Defender.
- **📊 Comprehensive Threat Metrics**:
  - Threat Severity Scoring (0-10)
  - Extracted Indicators of Compromise (IOCs)
  - MITRE ATT&CK Technique Mapping
  - Actionable Mitigation Steps
  - Executive SOC Summaries
- **🔒 100% Client-Side**: No backend, no database, no authentication. Analysis happens entirely between your browser and the Groq API. Your data is not stored locally or on a server.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI / LLM**: [Groq API](https://console.groq.com/) (Llama 3.3 70B Versatile)
- **Deployment**: Ready for Vercel / Netlify / GitHub Pages

---

## 🚀 Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed and a free API key from [Groq](https://console.groq.com/keys).

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/sentinel-ai.git
cd sentinel-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project (if it doesn't already exist) and add your Groq API key:

```env
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5174`.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/       # Navbar, Sidebar, Footer wrappers
│   ├── input/        # Content entry, sample selectors
│   ├── results/      # Threat score, IOC grids, MITRE cards
│   └── ui/           # Reusable micro-components (Loaders, Toasts)
├── hooks/
│   └── useGeminiAnalysis.js  # Main AI orchestration hook (Handles Groq retries)
├── services/
│   └── geminiService.js      # Native fetch wrapper for Groq API with 429 backoff
├── utils/
│   └── constants.js          # Sample threat data and loading messages
├── App.jsx                   # Main application shell
└── index.css                 # Tailwind entry and custom glassmorphism utilities
```

---

## 🧠 AI Prompt Engineering

The system uses a highly constrained system prompt to force Llama 3 into a strict SOC Analyst persona. It guarantees output in the following JSON schema:

```json
{
  "threatScore": 8,
  "severity": "High",
  "threatType": "Phishing",
  "summary": "...",
  "iocs": ["malicious-domain.com"],
  "mitre": "T1566.002 - Spearphishing Link",
  "mitigation": ["Block domain at firewall", "Reset user credentials"],
  "socReport": "...",
  "simpleExplanation": "..."
}
```

---

## ☁️ Deployment

Since Sentinel AI is a purely frontend application, it can be deployed directly to Vercel with zero configuration:

1. Push your code to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Add `VITE_GROQ_API_KEY` to your Vercel Environment Variables.
4. Click **Deploy**.

*(Note: Because the API call happens in the browser, your Groq API key will be exposed in the client bundle. For strict production environments, you should proxy the request through a serverless function.)*

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
