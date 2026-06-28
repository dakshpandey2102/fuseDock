import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AlertCircle, RotateCcw, Shield, Cpu, Tag, FileSearch } from 'lucide-react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
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
import ResultCard from './components/results/ResultCard';

// UI
import LoadingMessages from './components/ui/LoadingMessages';
import GlassCard from './components/ui/GlassCard';

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
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
    <div className="min-h-screen bg-cyber-bg">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f1623',
            color: '#e2e8f0',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            fontSize: '14px',
          },
        }}
      />

      <Navbar />
      <Hero />

      {/* Main workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Input section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          id="workspace"
        >
          <GlassCard className="p-6 mb-8">
            {/* Section title */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <FileSearch size={14} className="text-cyan-400" />
              </div>
              <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-widest font-mono">
                Threat Input
              </h2>
            </div>

            {/* Content type selector */}
            <div className="mb-4">
              <label className="block text-xs text-gray-500 font-mono mb-2 uppercase tracking-wider">
                Content Type
              </label>
              <ContentTypeSelector selected={contentType} onChange={setContentType} />
            </div>

            {/* Sample inputs */}
            <div className="mb-4">
              <SampleInputs onSelect={handleSampleSelect} />
            </div>

            {/* Textarea */}
            <div className="mb-5">
              <label className="block text-xs text-gray-500 font-mono mb-2 uppercase tracking-wider">
                Paste Content
              </label>
              <TextInputArea value={inputText} onChange={setInputText} contentType={contentType} />
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-3 p-4 rounded-lg border border-red-500/30 bg-red-500/10 mb-4"
                >
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analyze button */}
            <AnalyzeButton onClick={handleAnalyze} isLoading={isLoading} disabled={!inputText.trim()} />
          </GlassCard>
        </motion.section>

        {/* Loading */}
        <AnimatePresence>
          {isLoading && <LoadingMessages isVisible={isLoading} retryInfo={retryInfo} />}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !isLoading && (
            <motion.section
              id="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
            >
              {/* Results header */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Shield size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Analysis Complete</h2>
                    <p className="text-xs text-gray-500 font-mono">Threat intelligence report generated</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                >
                  <RotateCcw size={14} />
                  New Analysis
                </button>
              </motion.div>

              {/* Overview row: Gauge + Summary */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gauge */}
                <GlassCard className="p-6 flex flex-col items-center justify-center" glow={
                  result.severity === 'Critical' ? 'red' :
                  result.severity === 'High' ? 'orange' :
                  result.severity === 'Low' ? 'green' : 'blue'
                }>
                  <ThreatScoreGauge score={result.threatScore} severity={result.severity} />
                </GlassCard>

                {/* Summary */}
                <GlassCard className="p-6 lg:col-span-2">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu size={14} className="text-cyan-500" />
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Threat Classification</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{result.threatType}</h3>
                    </div>
                    <SeverityBadge severity={result.severity} size="md" />
                  </div>

                  <div className="w-full h-px bg-white/[0.06] mb-4" />

                  <div className="flex items-start gap-2">
                    <Tag size={13} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-300 leading-relaxed">{result.summary}</p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* MITRE + IOC row */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MITREMapping mitre={result.mitre} />
                <IOCList iocs={result.iocs} />
              </motion.div>

              {/* Mitigation */}
              <motion.div variants={itemVariants}>
                <MitigationList mitigation={result.mitigation} />
              </motion.div>

              {/* SOC Report */}
              <motion.div variants={itemVariants}>
                <SOCReport socReport={result.socReport} simpleExplanation={result.simpleExplanation} />
              </motion.div>

              {/* Disclaimer */}
              <motion.div variants={itemVariants}>
                <div className="flex items-start gap-2 p-4 rounded-lg border border-yellow-500/10 bg-yellow-500/5">
                  <AlertCircle size={14} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">
                    <span className="text-yellow-500/80 font-medium">AI Disclaimer:</span> This analysis is AI-generated and intended to assist, not replace, professional security review. Always validate findings with your security team before taking action.
                  </p>
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
