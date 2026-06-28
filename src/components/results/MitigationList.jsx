import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import ResultCard from './ResultCard';

export default function MitigationList({ mitigation }) {
  if (!mitigation?.length) {
    return (
      <ResultCard title="Mitigation Steps" icon={ShieldCheck}>
        <p className="text-sm text-gray-500 italic">No mitigation steps available.</p>
      </ResultCard>
    );
  }

  return (
    <ResultCard title="Mitigation Steps" icon={ShieldCheck} glow="green">
      <ol className="space-y-3">
        {mitigation.map((step, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, ease: 'easeOut' }}
            className="flex items-start gap-3 group"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-green-400 border border-green-400/30 bg-green-400/10 mt-0.5">
              {i + 1}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors">
              {step}
            </p>
          </motion.li>
        ))}
      </ol>
    </ResultCard>
  );
}
