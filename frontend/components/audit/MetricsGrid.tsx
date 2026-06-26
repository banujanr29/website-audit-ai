"use client";

import { motion } from "framer-motion";
import type { Metrics } from "@/types/audit";
import { 
  FileText, Heading1, Heading2, Heading3, 
  Link as LinkIcon, ExternalLink, Image as ImageIcon, 
  AlertTriangle, Globe, Type 
} from "lucide-react";

interface MetricsGridProps {
  metrics: Metrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const data = [
    { label: "Word Count", value: metrics.wordCount, icon: FileText },
    { label: "H1 Tags", value: metrics.h1Count, icon: Heading1 },
    { label: "H2 Tags", value: metrics.h2Count, icon: Heading2 },
    { label: "H3 Tags", value: metrics.h3Count, icon: Heading3 },
    { label: "Internal Links", value: metrics.internalLinks, icon: LinkIcon },
    { label: "External Links", value: metrics.externalLinks, icon: ExternalLink },
    { label: "Images", value: metrics.imageCount, icon: ImageIcon },
    { 
      label: "Missing ALT", 
      value: `${metrics.missingAltPercentage}%`, 
      icon: AlertTriangle,
      alert: metrics.missingAltPercentage > 10 
    },
    { label: "Language", value: metrics.language || "N/A", icon: Globe },
    { 
      label: "Meta Title", 
      value: metrics.metaTitle ? "Present" : "Missing", 
      icon: Type,
      alert: !metrics.metaTitle
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full"
    >
      {data.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={idx}
            variants={item}
            className={`flex flex-col p-4 rounded-2xl border ${
              metric.alert ? "bg-red-500/10 border-red-500/30" : "bg-zinc-950/50 border-zinc-800/80"
            } shadow-sm backdrop-blur-sm transition-all hover:bg-zinc-900/80 hover:border-zinc-700/80`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl ${metric.alert ? "bg-red-500/20 text-red-400" : "bg-zinc-900 text-indigo-400"}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-zinc-400 line-clamp-1" title={metric.label}>
                {metric.label}
              </span>
            </div>
            <div className={`text-xl font-bold ${metric.alert ? "text-red-400" : "text-zinc-100"}`}>
              {metric.value}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
