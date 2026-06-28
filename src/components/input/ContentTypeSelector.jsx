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
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            title={type.description}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
              isSelected
                ? 'bg-[#ededed] text-black border-[#ededed]'
                : 'bg-transparent text-[#a1a1aa] border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:text-[#ededed]'
            }`}
          >
            <Icon size={14} className={isSelected ? 'text-black' : 'text-[#a1a1aa]'} />
            {type.label}
          </motion.button>
        );
      })}
    </div>
  );
}
