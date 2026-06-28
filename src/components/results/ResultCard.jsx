import GlassCard from '../ui/GlassCard';

export default function ResultCard({ title, icon: Icon, children, className = '', glow }) {
  return (
    <GlassCard className={`p-5 ${className}`} glow={glow}>
      {(title || Icon) && (
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/[0.06]">
          {Icon && (
            <div className="w-7 h-7 rounded-md flex items-center justify-center bg-white/5">
              <Icon size={14} className="text-cyan-400" />
            </div>
          )}
          {title && (
            <h3 className="text-sm font-semibold text-gray-200 tracking-wide uppercase font-mono">
              {title}
            </h3>
          )}
        </div>
      )}
      {children}
    </GlassCard>
  );
}
