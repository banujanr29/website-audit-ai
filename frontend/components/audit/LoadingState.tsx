"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  loading: boolean;
  progress?: number;
  currentStep?: number;
}

const STEPS = [
  { title: "Fetching website", description: "Downloading HTML and assets." },
  { title: "Extracting website metrics", description: "Counting headings, links, images, metadata and content." },
  { title: "Calculating audit score", description: "Running deterministic SEO and accessibility scoring." },
  { title: "Gemini AI analysis", description: "Generating insights and recommendations." },
  { title: "Audit complete", description: "Preparing dashboard." },
];

const TIPS = [
  "Good ALT text improves accessibility.",
  "One H1 heading is usually recommended.",
  "Meta descriptions help search visibility.",
  "Clear CTAs improve conversions.",
  "Internal links improve navigation.",
  "AI recommendations are based only on extracted metrics.",
];

export function LoadingState({ loading, progress, currentStep }: LoadingStateProps) {
  const [internalStep, setInternalStep] = useState(0);
  const [internalProgress, setInternalProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  // Tip rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Progression logic
  useEffect(() => {
    if (!loading) {
      setInternalProgress(100);
      const fastInterval = setInterval(() => {
        setInternalStep((prev) => {
          if (prev < 5) return prev + 1;
          clearInterval(fastInterval);
          return prev;
        });
      }, 150);
      return () => clearInterval(fastInterval);
    }

    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (currentStep === undefined) {
      stepTimer = setInterval(() => {
        setInternalStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 3500);
    }

    if (progress === undefined) {
      progressTimer = setInterval(() => {
        setInternalProgress((prev) => {
          const inc = Math.random() * 4;
          const next = prev + inc;
          return next >= 95 ? 95 : next;
        });
      }, 500);
    }

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [loading, currentStep, progress]);

  const activeStep = currentStep !== undefined ? currentStep : internalStep;
  const activeProgress = progress !== undefined ? progress : internalProgress;

  return (
    <div className="w-full flex items-center justify-center p-6 min-h-[600px]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/80 rounded-[2rem] p-8 md:p-12 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Analyzing Your Website</h2>
          <p className="text-zinc-400 font-medium tracking-wide">This usually takes 5–15 seconds.</p>
        </div>

        {/* Multi-step List */}
        <div className="space-y-6 mb-12">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isCurrent = idx === activeStep;
            const isUpcoming = idx > activeStep;

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                className={cn(
                  "flex items-start gap-5 transition-all duration-500",
                  isCompleted ? "opacity-60" : "opacity-100",
                  isUpcoming ? "opacity-30" : "opacity-100"
                )}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                  ) : (
                    <Circle className="w-6 h-6 text-zinc-700" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "text-lg font-semibold tracking-wide transition-colors duration-300",
                    isCurrent ? "text-zinc-100" : "text-zinc-400"
                  )}>
                    {step.title}
                  </span>
                  <span className={cn(
                    "text-sm mt-1 transition-colors duration-300",
                    isCurrent ? "text-zinc-400" : "text-zinc-500"
                  )}>
                    {step.description}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar & Tips */}
        <div className="space-y-5 pt-8 border-t border-zinc-800/50">
          <div className="flex justify-between items-center text-sm font-bold text-zinc-300 px-1">
            <span className="uppercase tracking-widest text-xs text-zinc-500">Overall Progress</span>
            <span className="font-mono text-indigo-400 text-base">{Math.round(activeProgress)}%</span>
          </div>
          
          <div className="h-2.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/80 shadow-inner">
            <motion.div 
              className="h-full bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              animate={{ width: `${activeProgress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          
          <div className="h-6 mt-4 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={tipIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-xs font-medium text-zinc-500 tracking-widest uppercase text-center"
              >
                Tip: {TIPS[tipIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
