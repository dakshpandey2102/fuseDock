import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = false, glow = null, ...props }) {
  const glowStyles = {
    blue: '0 0 30px rgba(0,212,255,0.1), inset 0 1px 0 rgba(0,212,255,0.1)',
    red: '0 0 30px rgba(255,68,68,0.1), inset 0 1px 0 rgba(255,68,68,0.1)',
    green: '0 0 30px rgba(0,204,136,0.1), inset 0 1px 0 rgba(0,204,136,0.1)',
    yellow: '0 0 30px rgba(255,170,0,0.1), inset 0 1px 0 rgba(255,170,0,0.1)',
    orange: '0 0 30px rgba(255,140,0,0.1), inset 0 1px 0 rgba(255,140,0,0.1)',
  };

  return (
    <motion.div
      className={`glass-card ${hover ? 'hover:border-white/[0.12] transition-all duration-300' : ''} ${className}`}
      style={glow ? { boxShadow: glowStyles[glow] } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
