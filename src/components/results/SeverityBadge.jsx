import { motion } from 'framer-motion';

export default function SeverityBadge({ severity, size = 'sm' }) {
  const classes = {
    Critical: 'severity-critical',
    High: 'severity-high',
    Medium: 'severity-medium',
    Low: 'severity-low',
    Info: 'severity-info',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-[11px]',
    lg: 'px-3 py-1.5 text-xs',
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center justify-center rounded-[4px] font-mono uppercase tracking-widest ${classes[severity] || classes.Info} ${sizeClasses[size]}`}
    >
      {severity}
    </motion.span>
  );
}
