"use client";

import { motion } from "framer-motion";
import type { Recommendation } from "@/types/audit";
import { AlertCircle, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority.toUpperCase()) {
      case "HIGH":
        return {
          icon: AlertCircle,
          colors: "bg-red-500/10 border-red-500/30 text-red-400",
          iconBg: "bg-red-500/20",
          badge: "bg-red-500 text-white"
        };
      case "MEDIUM":
        return {
          icon: AlertTriangle,
          colors: "bg-amber-500/10 border-amber-500/30 text-amber-400",
          iconBg: "bg-amber-500/20",
          badge: "bg-amber-500 text-white"
        };
      case "LOW":
      default:
        return {
          icon: CheckCircle2,
          colors: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
          iconBg: "bg-emerald-500/20",
          badge: "bg-emerald-500 text-white"
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-1">
        <div className="h-8 w-1 bg-indigo-500 rounded-full" />
        <h2 className="text-2xl font-bold text-zinc-100">Priority Actions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => {
          const config = getPriorityConfig(rec.priority);
          const Icon = config.icon;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "flex flex-col p-5 rounded-2xl border backdrop-blur-sm",
                "transition-all hover:-translate-y-1 shadow-sm hover:shadow-md",
                config.colors
              )}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className={cn("p-2 rounded-xl shrink-0", config.iconBg)}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider", config.badge)}>
                  {rec.priority}
                </span>
              </div>
              
              <h3 className="font-semibold text-zinc-100 text-base mb-2">
                {rec.title}
              </h3>
              
              <div className="flex-1">
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {rec.reason}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-current/10 flex items-center gap-2 text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
