import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = false, ...props }) {
  return (
    <motion.div
      className={`glass-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
