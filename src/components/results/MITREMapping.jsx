import { motion } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import ResultCard from './ResultCard';
import { MITRE_BASE_URL } from '../../utils/constants';

export default function MITREMapping({ mitre }) {
  if (!mitre) return null;

  // Parse "T1566.001 - Spearphishing Attachment" format
  const match = mitre.match(/^(T\d{4}(?:\.\d{3})?)\s*[-–]\s*(.+)$/);
  const techniqueId = match?.[1] || null;
  const techniqueName = match?.[2] || mitre;

  const url = techniqueId
    ? `${MITRE_BASE_URL}${techniqueId.replace('.', '/')}/`
    : 'https://attack.mitre.org/';

  return (
    <ResultCard title="MITRE ATT&CK" icon={GitBranch} glow="blue">
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className="group flex items-start gap-4 p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200"
      >
        {/* Technique ID badge */}
        <div className="flex-shrink-0">
          {techniqueId ? (
            <div className="px-2.5 py-1.5 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-center">
              <span className="font-mono text-sm font-bold text-cyan-300 whitespace-nowrap">{techniqueId}</span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-md bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
              <GitBranch size={16} className="text-cyan-400" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
            {techniqueName}
          </p>
          <p className="text-xs text-gray-500 mt-1 font-mono">MITRE ATT&CK Enterprise</p>
        </div>

        <ExternalLink size={14} className="text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-0.5" />
      </motion.a>
    </ResultCard>
  );
}
