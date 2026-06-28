export default function ResultCard({ title, icon: Icon, children, className = '' }) {
  return (
    <div className={`glass-card p-6 h-full flex flex-col ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Icon size={16} className="text-[#ededed]" />
        <h3 className="text-[13px] font-medium text-[#ededed] tracking-tight">{title}</h3>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
