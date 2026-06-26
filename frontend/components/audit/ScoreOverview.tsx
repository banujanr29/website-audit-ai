"use client";

import { motion } from "framer-motion";
import type { Score } from "@/types/audit";
import { cn } from "@/lib/utils";

interface ScoreOverviewProps {
  score: Score;
  url?: string;
}

export function ScoreOverview({ score, url }: ScoreOverviewProps) {
  // SVG Circular Progress calculation
  const radius = 90;
  const stroke = 18;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score.overall / 100) * circumference;

  const getQualityConfig = (value: number) => {
    if (value >= 80) return { label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", stroke: "#10b981" };
    if (value >= 60) return { label: "Good", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", stroke: "#3b82f6" };
    if (value >= 40) return { label: "Needs Improvement", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", stroke: "#f59e0b" };
    return { label: "Poor", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", stroke: "#ef4444" };
  };

  const getProgressColorClass = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return "bg-emerald-500";
    if (percentage >= 60) return "bg-blue-500";
    if (percentage >= 40) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const getProgressBgClass = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return "bg-emerald-500/10 border-emerald-500/20";
    if (percentage >= 60) return "bg-blue-500/10 border-blue-500/20";
    if (percentage >= 40) return "bg-amber-500/10 border-amber-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  const getProgressTextColorClass = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return "text-emerald-500";
    if (percentage >= 60) return "text-blue-500";
    if (percentage >= 40) return "text-amber-500";
    return "text-red-500";
  };

  const quality = getQualityConfig(score.overall);

  const categories = [
    { label: "SEO", value: score.seo, max: 30 },
    { label: "Content", value: score.content, max: 25 },
    { label: "Accessibility", value: score.accessibility, max: 20 },
    { label: "CTA", value: score.cta, max: 15 },
    { label: "Images", value: score.images, max: 10 },
  ];

  const getHostname = (fullUrl?: string) => {
    if (!fullUrl) return "example.com";
    try {
      return new URL(fullUrl).hostname;
    } catch {
      return fullUrl.replace(/^https?:\/\//, "").split("/")[0];
    }
  };

  const hostname = getHostname(url);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-[2rem] p-8 md:p-12 shadow-2xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-24">
      
      {/* Left Column: Overall Score & Quality */}
      <div className="flex flex-col items-center justify-center space-y-10 w-full md:w-5/12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Overall Website Score</h2>
        </div>

        {/* Large Animated Circular Score */}
        <div className="flex flex-col items-center justify-center relative" style={{ width: radius * 2, height: radius * 2 }}>
          <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg] drop-shadow-2xl">
            <circle
              stroke="#27272a" // zinc-800
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <motion.circle
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              stroke={quality.stroke}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
              className="text-5xl font-black text-zinc-100 tracking-tight"
            >
              {score.overall}
            </motion.span>
          </div>
        </div>

        {/* Quality Badge & URL */}
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className={cn("px-8 py-2.5 rounded-full border backdrop-blur-sm shadow-sm", quality.bg, quality.border)}
          >
            <span className={cn("text-base font-black tracking-widest uppercase", quality.color)}>
              {quality.label}
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-center space-y-1.5"
          >
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Analyzed Website</p>
            <p className="text-zinc-200 font-medium text-lg">{hostname}</p>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Category Scores */}
      <div className="flex-1 w-full space-y-8">
        <h3 className="text-xl font-bold text-zinc-400 uppercase tracking-wider mb-4 border-b border-zinc-800/50 pb-4">
          Category Performance
        </h3>
        
        <div className="space-y-6">
          {categories.map((cat, idx) => {
            const percentage = (cat.value / cat.max) * 100;
            return (
              <motion.div 
                key={cat.label} 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 + 0.4, duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
                className="space-y-3.5"
              >
                <div className="flex justify-between items-center text-base">
                  <span className="font-semibold text-zinc-200 tracking-wide text-lg">{cat.label}</span>
                  <div className={cn("font-bold px-4 py-1.5 rounded-full text-sm border", getProgressBgClass(cat.value, cat.max))}>
                    <span className={getProgressTextColorClass(cat.value, cat.max)}>
                      {cat.value} <span className="opacity-50">/ {cat.max}</span>
                    </span>
                  </div>
                </div>
                
                <div className="h-4 w-full bg-zinc-900/80 rounded-full overflow-hidden shadow-inner border border-zinc-800/80 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.8 + (idx * 0.15), duration: 1.2, ease: "easeOut" }}
                    className={cn("h-full rounded-full shadow-lg", getProgressColorClass(cat.value, cat.max))} 
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
