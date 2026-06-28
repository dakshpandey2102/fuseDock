import { Shield, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Shield size={14} className="text-cyan-500/50" />
            <span className="text-sm font-mono">Sentinel AI</span>
            <span className="text-xs">— AI-powered cybersecurity triage</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 font-mono">
            <Zap size={10} className="text-cyan-600" />
            <span>Built with Llama 3 on Groq</span>
            <span className="mx-2 text-gray-700">·</span>
            <span>No data stored, all analysis is client-side</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
