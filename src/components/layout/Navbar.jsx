import { motion, AnimatePresence } from 'framer-motion';
import { Shield, GitBranch, Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]"
      style={{
        background: 'rgba(10, 14, 23, 0.85)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))', border: '1px solid rgba(0,212,255,0.3)' }}>
                <Shield size={18} className="text-cyan-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-cyber-bg animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-gradient-blue">Sentinel AI</span>
              <p className="text-[10px] text-gray-500 leading-none tracking-widest uppercase font-mono">Cyber Triage</p>
            </div>
          </div>

          {/* Center badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-mono">SOC ANALYST ONLINE</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 font-mono">
              <Zap size={12} className="text-cyan-500" />
              <span>Powered by Groq</span>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-white/5"
            >
              <GitBranch size={15} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
