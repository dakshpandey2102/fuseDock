import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { SEVERITY_CONFIG } from '../../utils/constants';

function getGaugeColor(score) {
  if (score >= 9) return '#ff4444';
  if (score >= 7) return '#ff8c00';
  if (score >= 4) return '#ffaa00';
  if (score >= 1) return '#00cc88';
  return '#00d4ff';
}

function scoreToAngle(score) {
  // 0 = -135deg, 10 = 135deg
  return -135 + (score / 10) * 270;
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export default function ThreatScoreGauge({ score, severity }) {
  const color = getGaugeColor(score);
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.Info;
  const cx = 100, cy = 100, r = 70;
  const bgArc = describeArc(cx, cy, r, -135, 135);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      pathLength: score / 10,
      transition: { duration: 1.4, ease: [0.34, 1.56, 0.64, 1] },
    });
  }, [score, controls]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="200" height="160" viewBox="0 0 200 160">
          {/* Background track */}
          <path
            d={bgArc}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Colored arc */}
          <motion.path
            d={bgArc}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="1"
            initial={{ pathLength: 0 }}
            animate={controls}
            style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
          />

          {/* Tick marks */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(tick => {
            const angle = -135 + (tick / 10) * 270;
            const inner = polarToCartesian(cx, cy, 58, angle);
            const outer = polarToCartesian(cx, cy, 64, angle);
            return (
              <line
                key={tick}
                x1={inner.x} y1={inner.y}
                x2={outer.x} y2={outer.y}
                stroke={tick === score ? color : 'rgba(255,255,255,0.15)'}
                strokeWidth={tick % 5 === 0 ? 2 : 1}
                strokeLinecap="round"
              />
            );
          })}

          {/* Center score */}
          <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="32" fontWeight="800" fontFamily="Inter">
            {score}
          </text>
          <text x={cx} y={cy + 16} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Inter">
            / 10
          </text>
        </svg>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(ellipse at center, ${color}20 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Labels */}
      <div className="text-center mt-2">
        <p className="text-xs text-gray-500 font-mono mb-1">THREAT SCORE</p>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-bold ${config.textClass} ${config.bgClass} ${config.borderClass}`}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          {severity}
        </div>
      </div>
    </div>
  );
}
