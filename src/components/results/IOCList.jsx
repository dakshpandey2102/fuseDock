import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ResultCard from './ResultCard';
import { Network } from 'lucide-react';

function IOCChip({ value, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success('IOC copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  // Determine IOC type color
  const getColor = (ioc) => {
    if (/^\d{1,3}(\.\d{1,3}){3}/.test(ioc)) return 'text-red-400 border-red-400/30 bg-red-400/5';
    if (/^[a-f0-9]{32,64}$/i.test(ioc)) return 'text-purple-400 border-purple-400/30 bg-purple-400/5';
    if (/^https?:\/\//.test(ioc) || /hxxp/.test(ioc)) return 'text-orange-400 border-orange-400/30 bg-orange-400/5';
    if (/\.[a-z]{2,}/.test(ioc)) return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5';
    return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group flex items-center gap-2 px-3 py-2 rounded-lg border font-mono text-xs break-all ${getColor(value)}`}
    >
      <span className="flex-1">{value}</span>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:text-white flex-shrink-0"
        title="Copy IOC"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </motion.div>
  );
}

export default function IOCList({ iocs }) {
  if (!iocs?.length) {
    return (
      <ResultCard title="Indicators of Compromise" icon={Network}>
        <p className="text-sm text-gray-500 italic">No specific IOCs extracted.</p>
      </ResultCard>
    );
  }

  return (
    <ResultCard title="Indicators of Compromise" icon={Network} glow="red">
      <div className="space-y-2">
        {iocs.map((ioc, i) => (
          <IOCChip key={i} value={ioc} index={i} />
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-3 font-mono">
        {iocs.length} indicator{iocs.length !== 1 ? 's' : ''} found — hover to copy
      </p>
    </ResultCard>
  );
}
