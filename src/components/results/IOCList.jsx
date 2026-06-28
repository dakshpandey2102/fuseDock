import { Link2, ShieldAlert } from 'lucide-react';
import ResultCard from './ResultCard';

export default function IOCList({ iocs }) {
  if (!iocs || iocs.length === 0) {
    return (
      <ResultCard title="Indicators of Compromise" icon={ShieldAlert}>
        <div className="flex flex-col items-center justify-center h-full text-[#666] py-6">
          <ShieldAlert size={24} className="mb-2 opacity-50" />
          <p className="text-xs">No clear IOCs extracted</p>
        </div>
      </ResultCard>
    );
  }

  return (
    <ResultCard title="Indicators of Compromise" icon={Link2}>
      <ul className="space-y-1">
        {iocs.map((ioc, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between py-2 px-3 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]"
          >
            <span className="font-mono text-xs text-[#a1a1aa] break-all">{ioc}</span>
            <button
              onClick={() => navigator.clipboard.writeText(ioc)}
              className="text-[10px] uppercase text-[#666] hover:text-[#ededed] transition-colors shrink-0 ml-4"
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
    </ResultCard>
  );
}
