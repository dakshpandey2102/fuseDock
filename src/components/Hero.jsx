import { motion } from 'framer-motion';
import { ArrowRight, GitBranch } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const scrollToWorkspace = () => {
    document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      {/* Vercel-style background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-[#a1a1aa] text-xs font-mono mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Intelligence Engine Active
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl lg:text-[90px] font-bold tracking-tighter text-[#ededed] mb-8 leading-[1.05]">
              Analyze Threats <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fff] to-[#666]">In Seconds.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-[#a1a1aa] mb-12 max-w-2xl mx-auto font-normal leading-relaxed tracking-tight">
              The zero-backend cybersecurity triage workspace. Instantly process suspicious emails, scripts, and logs with absolute precision.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={scrollToWorkspace}
                className="vercel-btn-white w-full sm:w-auto h-12 text-base px-8"
              >
                Start Analysis
                <ArrowRight size={16} />
              </button>
              
              <a 
                href="https://github.com/dakshpandey2102/fuseDock"
                target="_blank"
                rel="noreferrer"
                className="vercel-btn-glass w-full sm:w-auto h-12 text-base px-8"
              >
                <GitBranch size={16} />
                View Repository
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
