import { Shield, GitBranch, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.1)] bg-black/50 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <Shield size={20} className="text-[#ededed]" />
              </div>
              <span className="text-base font-bold text-[#ededed] tracking-tight">FuseDock</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-[#a1a1aa] uppercase tracking-wider">Online</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-2 py-1">
              <Activity size={12} className="text-[#a1a1aa]" />
              <span className="text-[11px] font-mono text-[#a1a1aa]">Llama 3 (Groq)</span>
            </div>
            
            <a
              href="https://github.com/dakshpandey2102/fuseDock"
              target="_blank"
              rel="noreferrer"
              className="vercel-btn-glass text-[13px] px-4 py-1.5 h-8 rounded-full"
            >
              <GitBranch size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
          
        </div>
      </div>
    </motion.nav>
  );
}
