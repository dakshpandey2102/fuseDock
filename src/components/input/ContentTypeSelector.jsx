import { motion } from 'framer-motion';
import { Mail, Link, Code2, FileText, AlignLeft } from 'lucide-react';
import { CONTENT_TYPES } from '../../utils/constants';

const ICONS = { Mail, Link, Code2, FileText, AlignLeft };

export default function ContentTypeSelector({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CONTENT_TYPES.map((type, i) => {
        const Icon = ICONS[type.icon];
        const isSelected = selected === type.id;
        return (
          <motion.button
            key={type.id}
            id={`content-type-${type.id}`}
            onClick={() => onChange(type.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            title={type.description}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
              isSelected
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-glow-blue'
                : 'bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/20 hover:text-gray-200 hover:bg-white/[0.06]'
            }`}
          >
            <Icon size={14} />
            {type.label}
          </motion.button>
        );
      })}
    </div>
  );
}
