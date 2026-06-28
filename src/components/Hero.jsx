import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Eye, Server, GitBranch } from 'lucide-react';

const stats = [
  { icon: Eye, label: 'Threat Types', value: '50+' },
  { icon: GitBranch, label: 'MITRE Techniques', value: '200+' },
  { icon: Zap, label: 'Avg Analysis', value: '<3s' },
  { icon: Lock, label: 'Data Stored', value: 'Zero' },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden grid-pattern">
      {/* Background decorations */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.15) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">AI-Powered SOC Analyst</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight"
          >
            <span className="text-white">Analyze Threats</span>
            <br />
            <span className="text-gradient-blue">In Seconds</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Paste suspicious{' '}
            <span className="text-cyan-400 font-medium">emails, URLs, scripts,</span> or{' '}
            <span className="text-cyan-400 font-medium">logs</span> and get an expert-level
            security assessment with MITRE ATT&CK mapping, IOC extraction, and a professional SOC report — instantly.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="glass-card p-4 text-center rounded-xl"
              >
                <Icon size={16} className="text-cyan-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-white mb-0.5">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
