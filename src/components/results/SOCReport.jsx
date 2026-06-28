import { FileText, Users } from 'lucide-react';
import ResultCard from './ResultCard';

export default function SOCReport({ socReport, simpleExplanation }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ResultCard title="Executive SOC Report" icon={FileText} className="lg:col-span-1">
        <div className="text-[#a1a1aa] text-[13px] leading-relaxed">
          {socReport || 'No detailed report available.'}
        </div>
      </ResultCard>

      <ResultCard title="Non-Technical Summary" icon={Users} className="lg:col-span-1">
        <div className="text-[#a1a1aa] text-[13px] leading-relaxed">
          {simpleExplanation || 'No summary available.'}
        </div>
      </ResultCard>
    </div>
  );
}
