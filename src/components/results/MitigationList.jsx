import { ShieldCheck } from 'lucide-react';
import ResultCard from './ResultCard';

export default function MitigationList({ mitigation }) {
  if (!mitigation || mitigation.length === 0) return null;

  return (
    <ResultCard title="Recommended Mitigation" icon={ShieldCheck}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mitigation.map((step, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3"
          >
            <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#a1a1aa]">
              <span className="text-[10px] font-mono">{idx + 1}</span>
            </div>
            <p className="text-[13px] text-[#a1a1aa] leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </ResultCard>
  );
}
