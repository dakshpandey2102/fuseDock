import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, FileText, User } from 'lucide-react';
import toast from 'react-hot-toast';
import ModeToggle from '../ui/ModeToggle';
import GlassCard from '../ui/GlassCard';

export default function SOCReport({ socReport, simpleExplanation }) {
  const [mode, setMode] = useState('professional');
  const [copied, setCopied] = useState(false);

  const content = mode === 'professional' ? socReport : simpleExplanation;
  const isProf = mode === 'professional';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('SOC report copied to clipboard!', {
        icon: '📋',
        style: {
          background: '#0f1623',
          color: '#e2e8f0',
          border: '1px solid rgba(0,212,255,0.2)',
        },
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <GlassCard className="p-5" glow={isProf ? 'blue' : undefined}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center bg-white/5">
            {isProf ? (
              <FileText size={14} className="text-cyan-400" />
            ) : (
              <User size={14} className="text-purple-400" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wide uppercase font-mono">
              {isProf ? 'SOC Analyst Report' : 'Plain English Summary'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {isProf ? 'For security leadership & incident response teams' : 'For business stakeholders & non-technical staff'}
            </p>
          </div>
        </div>
        <ModeToggle mode={mode} onChange={setMode} />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={`rounded-lg p-4 border ${
            isProf
              ? 'bg-cyan-500/5 border-cyan-500/10'
              : 'bg-purple-500/5 border-purple-500/10'
          }`}
        >
          <p className={`text-sm leading-relaxed ${
            isProf ? 'font-mono text-gray-300 text-xs' : 'text-gray-200 text-sm'
          }`}>
            {content}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Copy button */}
      <div className="flex justify-end mt-4">
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
            copied
              ? 'text-green-400 border-green-400/30 bg-green-400/10'
              : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20 hover:bg-white/5'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Report'}
        </motion.button>
      </div>
    </GlassCard>
  );
}
