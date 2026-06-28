import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { LOADING_MESSAGES } from '../../utils/constants';

export default function LoadingMessages({ isVisible, retryInfo }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible || retryInfo) return;
    const interval = setInterval(() => {
      setCurrentIndex(i => (i + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isVisible, retryInfo]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col items-center gap-6 py-12"
        >
          {retryInfo ? (
            /* ── Rate-limit retry countdown ── */
            <motion.div
              key="retry"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Spinning refresh icon */}
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-500/5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <RefreshCw size={24} className="text-yellow-400" />
                </motion.div>
              </div>

              {/* Message */}
              <div className="text-center">
                <p className="text-yellow-400 font-semibold text-sm mb-1">
                  ⏳ Rate limit hit — auto-retrying
                </p>
                <p className="text-gray-500 text-xs font-mono">
                  Attempt {retryInfo.attempt} of {retryInfo.total} • retrying in{' '}
                  <span className="text-yellow-300 font-bold tabular-nums">{retryInfo.waitSec}s</span>
                </p>
              </div>

              {/* Countdown bar */}
              <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-yellow-400"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: retryInfo.waitSec, ease: 'linear' }}
                />
              </div>
            </motion.div>
          ) : (
            /* ── Normal analysis loading ── */
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Animated radar */}
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
                <div className="absolute inset-2 rounded-full border border-cyan-500/15" />
                <div className="absolute inset-4 rounded-full border border-cyan-500/10" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 270deg, rgba(0,212,255,0.6) 360deg)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
              </div>

              {/* Cycling message */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-cyan-400 font-mono text-sm tracking-wide text-center"
                >
                  {LOADING_MESSAGES[currentIndex]}
                </motion.p>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #00d4ff, #7c3aed)' }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
