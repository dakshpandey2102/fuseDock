import { SEVERITY_CONFIG } from '../../utils/constants';

export default function SeverityBadge({ severity, size = 'md' }) {
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.Info;
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${config.textClass} ${config.bgClass} ${config.borderClass} ${sizes[size]}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: config.color }}
      />
      {severity}
    </span>
  );
}
