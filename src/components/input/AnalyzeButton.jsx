import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function AnalyzeButton({ onClick, isLoading, disabled }) {
  return (
    <motion.button
      id="analyze-button"
      onClick={onClick}
      disabled={isLoading || disabled}
      whileTap={!isLoading && !disabled ? { scale: 0.98 } : {}}
      className={`relative w-full h-12 rounded-lg font-medium text-sm overflow-hidden transition-all duration-200 flex items-center justify-center gap-2 ${
        isLoading || disabled
          ? 'bg-[#111] border border-[#333] text-[#666] cursor-not-allowed'
          : 'vercel-btn-white cursor-pointer'
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 size={16} className="animate-spin text-[#666]" />
          <span>Analyzing...</span>
        </>
      ) : (
        <span>Analyze Workspace</span>
      )}
    </motion.button>
  );
}
