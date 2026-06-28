import { motion } from 'framer-motion';
import { Search, Loader2, Zap } from 'lucide-react';

export default function AnalyzeButton({ onClick, isLoading, disabled }) {
  return (
    <motion.button
      id="analyze-button"
      onClick={onClick}
      disabled={isLoading || disabled}
      whileHover={!isLoading && !disabled ? { scale: 1.02 } : {}}
      whileTap={!isLoading && !disabled ? { scale: 0.98 } : {}}
      className={`relative w-full py-4 rounded-xl font-bold text-base tracking-wide overflow-hidden transition-all duration-300 ${
        isLoading || disabled
          ? 'opacity-60 cursor-not-allowed'
          : 'cursor-pointer hover:shadow-glow-blue'
      }`}
      style={{
        background: isLoading
          ? 'linear-gradient(135deg, #0099bb, #5b21b6)'
          : 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
        color: 'white',
      }}
    >
      {/* Shimmer overlay */}
      {!isLoading && !disabled && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}

      <span className="relative flex items-center justify-center gap-3">
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Analyzing Threat...</span>
          </>
        ) : (
          <>
            <Zap size={20} />
            <span>Analyze with Sentinel AI</span>
            <Search size={18} className="ml-1 opacity-70" />
          </>
        )}
      </span>
    </motion.button>
  );
}
