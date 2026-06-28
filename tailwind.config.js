/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0e17',
          surface: '#0f1623',
          card: '#111827',
          border: '#1e2d3d',
          blue: '#00d4ff',
          'blue-dim': '#0099bb',
          purple: '#7c3aed',
          'purple-dim': '#5b21b6',
          green: '#00cc88',
          yellow: '#ffaa00',
          red: '#ff4444',
          'red-dim': '#cc2222',
          text: '#e2e8f0',
          muted: '#64748b',
          'muted-light': '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #0a0e17 0%, #0f1623 50%, #0a0e17 100%)',
        'glow-blue': 'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)',
        'glow-red': 'radial-gradient(ellipse at center, rgba(255,68,68,0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0,212,255,0.1), 0 4px 20px rgba(0,0,0,0.4)',
        'cyber-hover': '0 0 30px rgba(0,212,255,0.2), 0 8px 30px rgba(0,0,0,0.5)',
        'glow-blue': '0 0 20px rgba(0,212,255,0.3)',
        'glow-red': '0 0 20px rgba(255,68,68,0.3)',
        'glow-green': '0 0 20px rgba(0,204,136,0.3)',
        'glow-yellow': '0 0 20px rgba(255,170,0,0.3)',
        'card': '0 1px 0 rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
