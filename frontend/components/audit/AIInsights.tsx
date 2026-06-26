"use client";

import { motion } from "framer-motion";
import type { Insights } from "@/types/audit";
import { Search, MessageSquare, MousePointerClick, FileText, Sparkles } from "lucide-react";

interface AIInsightsProps {
  insights: Insights;
}

export function AIInsights({ insights }: AIInsightsProps) {
  const cards = [
    { 
      title: "SEO", 
      description: insights.seo, 
      icon: Search 
    },
    { 
      title: "Messaging", 
      description: insights.messaging, 
      icon: MessageSquare 
    },
    { 
      title: "CTA", 
      description: insights.cta, 
      icon: MousePointerClick 
    },
    { 
      title: "Content Depth", 
      description: insights.contentDepth, 
      icon: FileText 
    },
    { 
      title: "UX", 
      description: insights.ux, 
      icon: Sparkles 
    },
  ];

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">
        AI Website Insights
      </h2>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:border-zinc-700/80 hover:bg-zinc-900/60"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2.5 rounded-xl bg-zinc-800/80 text-zinc-300 shadow-sm border border-zinc-700/50">
                  <Icon className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <h3 className="font-semibold text-zinc-100 text-lg tracking-wide">
                  {card.title}
                </h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
