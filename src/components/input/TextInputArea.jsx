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
      <div className="relative group">
        <textarea
          ref={textareaRef}
          id="threat-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholders[contentType] || placeholders.text}
          maxLength={MAX_CHARS}
          rows={14}
          className="relative w-full bg-black border border-[rgba(255,255,255,0.1)] rounded-lg p-5 font-mono text-sm text-[#ededed] placeholder-[#666] resize-none focus:outline-none focus:border-[rgba(255,255,255,0.3)] transition-all duration-200 leading-relaxed shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}
          spellCheck={false}
        />
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-3 px-1">
        <div className="flex items-center gap-3">
          {/* Progress bar */}
          <div className="w-32 h-[2px] bg-[#333] overflow-hidden">
            <motion.div
              className="h-full transition-all duration-300"
              style={{
                width: `${percentage}%`,
                background: percentage > 85
                  ? '#ef4444' // red
                  : '#ededed', // white
              }}
            />
          </div>
          <span className={`text-[11px] font-mono tracking-widest ${charCount > MAX_CHARS * 0.85 ? 'text-red-500' : 'text-[#666]'}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
        </div>

        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onChange('')}
            className="flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#ededed] transition-colors duration-200 px-2 py-1 rounded"
          >
            <X size={12} />
            Clear
          </motion.button>
        )}
      </div>
    </div>
  );
}
