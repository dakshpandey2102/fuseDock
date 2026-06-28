import { useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const MAX_CHARS = 8000;

export default function TextInputArea({ value, onChange, contentType }) {
  const textareaRef = useRef(null);
  const charCount = value.length;
  const percentage = Math.min(100, (charCount / MAX_CHARS) * 100);

  const placeholders = {
    email: 'Paste suspicious email content here — including headers, body, links, and attachments info...',
    url: 'Paste suspicious URLs, domains, or redirect chains here — one per line or as found...',
    script: 'Paste suspicious PowerShell, Bash, Python, JavaScript, or other script content here...',
    log: 'Paste system logs, event logs, network traffic captures, or SIEM output here...',
    text: 'Paste any suspicious content for analysis — messages, documents, commands, or notes...',
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        id="threat-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholders[contentType] || placeholders.text}
        maxLength={MAX_CHARS}
        rows={14}
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 font-mono text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all duration-200 leading-relaxed"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e2d3d transparent' }}
        spellCheck={false}
      />

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-2 px-1">
        <div className="flex items-center gap-2">
          {/* Progress bar */}
          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${percentage}%`,
                background: percentage > 85
                  ? 'linear-gradient(90deg, #ffaa00, #ff4444)'
                  : 'linear-gradient(90deg, #00d4ff, #7c3aed)',
              }}
            />
          </div>
          <span className={`text-xs font-mono ${charCount > MAX_CHARS * 0.85 ? 'text-yellow-500' : 'text-gray-600'}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
        </div>

        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onChange('')}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200 px-2 py-1 rounded hover:bg-white/5"
          >
            <X size={12} />
            Clear
          </motion.button>
        )}
      </div>
    </div>
  );
}
