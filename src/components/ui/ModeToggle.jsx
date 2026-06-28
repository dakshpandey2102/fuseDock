import { motion } from 'framer-motion';
import { BookOpen, User } from 'lucide-react';

export default function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
      <button
        onClick={() => onChange('professional')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          mode === 'professional'
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
            : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        <BookOpen size={14} />
        Professional
      </button>
      <button
        onClick={() => onChange('simple')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          mode === 'simple'
            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
            : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        <User size={14} />
        Simple
      </button>
    </div>
  );
}
