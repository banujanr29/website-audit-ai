"use client";

import { motion } from "framer-motion";
import type { Insights } from "@/types/audit";
import { Search, MessageSquare, BookOpen, Layout, MousePointerClick } from "lucide-react";

interface AIInsightsProps {
  insights: Insights;
}

export function AIInsights({ insights }: AIInsightsProps) {
  const cards = [
    { title: "SEO", content: insights.seo, icon: Search, gradient: "from-blue-500/10 to-indigo-500/10", iconColor: "text-blue-400" },
    { title: "Messaging", content: insights.messaging, icon: MessageSquare, gradient: "from-purple-500/10 to-pink-500/10", iconColor: "text-purple-400" },
    { title: "Content Depth", content: insights.contentDepth, icon: BookOpen, gradient: "from-emerald-500/10 to-teal-500/10", iconColor: "text-emerald-400" },
    { title: "User Experience", content: insights.ux, icon: Layout, gradient: "from-amber-500/10 to-orange-500/10", iconColor: "text-amber-400" },
    { title: "Calls to Action", content: insights.cta, icon: MousePointerClick, gradient: "from-rose-500/10 to-red-500/10", iconColor: "text-rose-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-1">
        <div className="h-8 w-1 bg-indigo-500 rounded-full" />
        <h2 className="text-2xl font-bold text-zinc-100">Gemini AI Insights</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`flex flex-col p-6 rounded-3xl border border-zinc-800/80 bg-gradient-to-br ${card.gradient} bg-zinc-950/50 backdrop-blur-md shadow-lg hover:border-zinc-700 transition-colors`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl bg-zinc-900 shadow-inner ${card.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-zinc-200 text-lg">{card.title}</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                {card.content}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
