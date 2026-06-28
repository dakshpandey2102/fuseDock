import { motion } from 'framer-motion';
import { SAMPLE_INPUTS } from '../../utils/sampleInputs';

export default function SampleInputs({ onSelect }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[11px] text-[#666] font-mono mr-2 shrink-0 uppercase tracking-widest">Samples</span>
      {SAMPLE_INPUTS.map((sample, i) => (
        <motion.button
          key={sample.id}
          id={`sample-${sample.id}`}
          onClick={() => onSelect(sample)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="px-2.5 py-1 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] text-[11px] text-[#a1a1aa] hover:text-[#ededed] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200 whitespace-nowrap"
        >
          {sample.label}
        </motion.button>
      ))}
    </div>
  );
}
