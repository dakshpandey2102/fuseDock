import { Target, ExternalLink } from 'lucide-react';
import ResultCard from './ResultCard';

export default function MITREMapping({ mitre }) {
  if (!mitre || mitre === 'Unknown') {
    return (
      <ResultCard title="MITRE ATT&CK Mapping" icon={Target}>
        <div className="flex flex-col items-center justify-center h-full text-[#666] py-6">
          <Target size={24} className="mb-2 opacity-50" />
          <p className="text-xs">No specific technique identified</p>
        </div>
      </ResultCard>
    );
  }

  // Parse T-code
  const tCodeMatch = mitre.match(/(T\d{4}(?:\.\d{3})?)/);
  const tCode = tCodeMatch ? tCodeMatch[1] : null;

  return (
    <ResultCard title="MITRE ATT&CK Mapping" icon={Target}>
      <div className="flex flex-col justify-center h-full">
        {tCode && (
          <div className="inline-block px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[#a1a1aa] font-mono text-[11px] mb-2 self-start border border-[rgba(255,255,255,0.1)]">
            {tCode}
          </div>
        )}
        <p className="text-sm text-[#ededed] leading-relaxed mb-3">
          {mitre}
        </p>
        
        {tCode && (
          <a
            href={`https://attack.mitre.org/techniques/${tCode.split('.')[0]}/${tCode.includes('.') ? tCode.split('.')[1] : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#666] hover:text-[#ededed] transition-colors self-start underline underline-offset-2"
          >
            View on MITRE
            <ExternalLink size={10} />
          </a>
        )}
      </div>
    </ResultCard>
  );
}
