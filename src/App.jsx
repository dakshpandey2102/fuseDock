import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AlertCircle, RotateCcw, Shield, Cpu, Tag, Target } from 'lucide-react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/Hero';

// Input
import ContentTypeSelector from './components/input/ContentTypeSelector';
import TextInputArea from './components/input/TextInputArea';
import SampleInputs from './components/input/SampleInputs';
import AnalyzeButton from './components/input/AnalyzeButton';

// Results
import ThreatScoreGauge from './components/results/ThreatScoreGauge';
import SeverityBadge from './components/results/SeverityBadge';
import IOCList from './components/results/IOCList';
import MITREMapping from './components/results/MITREMapping';
import MitigationList from './components/results/MitigationList';
import SOCReport from './components/results/SOCReport';
import GlassCard from './components/ui/GlassCard';
import LoadingMessages from './components/ui/LoadingMessages';

// Hook
import { useGeminiAnalysis } from './hooks/useGeminiAnalysis';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function App() {
  const [inputText, setInputText] = useState('');
  const [contentType, setContentType] = useState('email');
  const { isLoading, result, error, retryInfo, analyze, reset } = useGeminiAnalysis();

  const handleSampleSelect = (sample) => {
    setInputText(sample.content);
    setContentType(sample.type);
    reset();
  };

  const handleAnalyze = () => {
    analyze(inputText, contentType);
  };

  const handleReset = () => {
    setInputText('');
    reset();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-[#ededed]">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#000',
            color: '#ededed',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            fontSize: '13px',
          },
        }}
      />

      <Navbar />
      
      {!result && !isLoading && <Hero />}

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Subtle background glow for workspace */}
        {!result && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        )}

        {/* Input Section */}
        <motion.section
          id="workspace"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 relative z-10"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-8">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
                  <Target size={14} className="text-[#ededed]" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#ededed] tracking-tight">Threat Assessment</h2>
                  <p className="text-xs text-[#a1a1aa]">Provide payload or artifact for analysis.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] text-[#666] font-mono mb-2 uppercase tracking-widest">
                    Type
                  </label>
                  <ContentTypeSelector selected={contentType} onChange={setContentType} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] text-[#666] font-mono uppercase tracking-widest">
                      Payload
                    </label>
                    <SampleInputs onSelect={handleSampleSelect} />
                  </div>
                  <TextInputArea value={inputText} onChange={setInputText} contentType={contentType} />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-3 p-3 rounded-md border border-red-500/20 bg-red-500/10 mt-2">
                        <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-500">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2">
                  <AnalyzeButton onClick={handleAnalyze} isLoading={isLoading} disabled={!inputText.trim()} />
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* Loading */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <LoadingMessages isVisible={isLoading} retryInfo={retryInfo} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !isLoading && (
            <motion.section
              id="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4 pt-4"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 pb-8 border-b border-[rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
                    <Shield size={20} className="text-[#ededed]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#ededed] tracking-tight">Intelligence Report</h2>
                    <p className="text-[13px] text-[#a1a1aa]">Analysis completed successfully.</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="vercel-btn-glass text-xs h-9 px-4"
                >
                  <RotateCcw size={14} />
                  New Scan
                </button>
              </motion.div>

              {/* Top Row: Gauge + Summary */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                  <GlassCard className="p-6 h-full flex flex-col items-center justify-center">
                    <ThreatScoreGauge score={result.threatScore} severity={result.severity} />
                  </GlassCard>
                </div>

                <div className="lg:col-span-2">
                  <GlassCard className="p-8 h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-[#a1a1aa]">
                          <Cpu size={14} />
                          <span className="text-[10px] font-mono uppercase tracking-widest">Classification</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#ededed] tracking-tight">{result.threatType}</h3>
                      </div>
                      <SeverityBadge severity={result.severity} size="lg" />
                    </div>

                    <div className="w-full h-px bg-[rgba(255,255,255,0.1)] mb-6" />

                    <div className="flex items-start gap-3">
                      <Tag size={14} className="text-[#666] mt-1 flex-shrink-0" />
                      <p className="text-[14px] text-[#a1a1aa] leading-relaxed">
                        {result.summary}
                      </p>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>

              {/* MITRE + IOC */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <MITREMapping mitre={result.mitre} />
                <IOCList iocs={result.iocs} />
              </motion.div>

              {/* Mitigations */}
              <motion.div variants={itemVariants}>
                <MitigationList mitigation={result.mitigation} />
              </motion.div>

              {/* SOC Report */}
              <motion.div variants={itemVariants}>
                <SOCReport socReport={result.socReport} simpleExplanation={result.simpleExplanation} />
              </motion.div>

            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
