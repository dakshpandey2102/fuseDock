export const CONTENT_TYPES = [
  { id: 'email', label: 'Email', icon: 'Mail', description: 'Suspicious email content, headers, or phishing attempts' },
  { id: 'url', label: 'URL', icon: 'Link', description: 'Suspicious URLs, domains, or redirects' },
  { id: 'script', label: 'Script', icon: 'Code2', description: 'PowerShell, Bash, Python, or other scripts' },
  { id: 'log', label: 'Log', icon: 'FileText', description: 'System logs, event logs, or network traffic' },
  { id: 'text', label: 'Generic', icon: 'AlignLeft', description: 'Any other suspicious content for analysis' },
];

export const SEVERITY_CONFIG = {
  Critical: {
    color: '#ff4444',
    bg: 'rgba(255,68,68,0.1)',
    border: 'rgba(255,68,68,0.3)',
    glow: 'rgba(255,68,68,0.4)',
    textClass: 'text-red-400',
    bgClass: 'bg-red-400/10',
    borderClass: 'border-red-400/30',
    score: [9, 10],
  },
  High: {
    color: '#ff8c00',
    bg: 'rgba(255,140,0,0.1)',
    border: 'rgba(255,140,0,0.3)',
    glow: 'rgba(255,140,0,0.4)',
    textClass: 'text-orange-400',
    bgClass: 'bg-orange-400/10',
    borderClass: 'border-orange-400/30',
    score: [7, 8],
  },
  Medium: {
    color: '#ffaa00',
    bg: 'rgba(255,170,0,0.1)',
    border: 'rgba(255,170,0,0.3)',
    glow: 'rgba(255,170,0,0.4)',
    textClass: 'text-yellow-400',
    bgClass: 'bg-yellow-400/10',
    borderClass: 'border-yellow-400/30',
    score: [4, 6],
  },
  Low: {
    color: '#00cc88',
    bg: 'rgba(0,204,136,0.1)',
    border: 'rgba(0,204,136,0.3)',
    glow: 'rgba(0,204,136,0.4)',
    textClass: 'text-green-400',
    bgClass: 'bg-green-400/10',
    borderClass: 'border-green-400/30',
    score: [1, 3],
  },
  Info: {
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.1)',
    border: 'rgba(0,212,255,0.3)',
    glow: 'rgba(0,212,255,0.4)',
    textClass: 'text-cyan-400',
    bgClass: 'bg-cyan-400/10',
    borderClass: 'border-cyan-400/30',
    score: [0, 0],
  },
};

export const LOADING_MESSAGES = [
  '🔍 Scanning for threat indicators...',
  '🧠 Engaging SOC analyst reasoning engine...',
  '📡 Correlating against threat intelligence feeds...',
  '🛡️ Mapping to MITRE ATT&CK framework...',
  '⚡ Extracting indicators of compromise...',
  '🔬 Performing behavioral analysis...',
  '📊 Calculating threat severity score...',
  '✍️ Generating professional SOC report...',
  '🔐 Cross-referencing known malware signatures...',
  '🌐 Analyzing network indicators...',
];

export const MITRE_BASE_URL = 'https://attack.mitre.org/techniques/';
