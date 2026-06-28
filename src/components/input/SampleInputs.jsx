import { motion } from 'framer-motion';
import { SAMPLE_INPUTS } from '../../utils/sampleInputs';

export default function SampleInputs({ onSelect }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-gray-500 font-mono mr-1 shrink-0">Try sample:</span>
      {SAMPLE_INPUTS.map((sample, i) => (
        <motion.button
          key={sample.id}
          id={`sample-${sample.id}`}
          onClick={() => onSelect(sample)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="px-3 py-1 rounded-md text-xs font-medium border border-white/10 bg-white/[0.03] text-gray-400 hover:text-gray-200 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-200 whitespace-nowrap"
        >
          {sample.label}
        </motion.button>
      ))}
    </div>
  );
}
