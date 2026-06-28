import { motion } from 'framer-motion';

export default function ThreatScoreGauge({ score, severity }) {
  // SVG arc calculation
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 10) * circumference;

  const colors = {
    Critical: '#ef4444',
    High: '#f97316',
    Medium: '#eab308',
    Low: '#10b981',
    Info: '#3b82f6',
  };

  const color = colors[severity] || colors.Info;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background track */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          {/* Animated score arc */}
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>

        {/* Center score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold text-[#ededed] tracking-tighter"
          >
            {score}
          </motion.span>
          <span className="text-[10px] text-[#666] font-mono mt-1">/ 10</span>
        </div>
      </div>
    </div>
  );
}
