"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PromptLogs } from "@/types/audit";
import { Terminal, ChevronDown, Copy, Check, Code2, User, FileJson, Sparkles } from "lucide-react";

interface DeveloperDrawerProps {
  logs?: PromptLogs;
}

export function DeveloperDrawer({ logs }: DeveloperDrawerProps) {
  const [openSection, setOpenSection] = useState<keyof PromptLogs | null>(null);
  const [copiedId, setCopiedId] = useState<keyof PromptLogs | null>(null);

  if (!logs) return null;

  const sections: { id: keyof PromptLogs; label: string; icon: any }[] = [
    { id: "systemPrompt", label: "System Prompt", icon: Terminal },
    { id: "userPrompt", label: "User Prompt", icon: User },
    { id: "structuredInput", label: "Structured Input", icon: FileJson },
    { id: "rawOutput", label: "Raw Gemini Output", icon: Sparkles },
  ];

  const handleCopy = async (id: keyof PromptLogs, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const toggleSection = (id: keyof PromptLogs) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="w-full mt-12 p-6 md:p-8 bg-zinc-950 border border-zinc-800 rounded-3xl shadow-xl">
      {/* Title & Subtitle */}
      <div className="mb-6 space-y-1.5">
        <h2 className="text-2xl font-semibold text-zinc-100 flex items-center gap-2.5">
          <Code2 className="w-6 h-6 text-indigo-400" />
          Developer Mode
        </h2>
        <p className="text-sm text-zinc-400">Prompt Logs and AI Trace</p>
      </div>

      {/* Shadcn-like Accordion */}
      <div className="w-full border-b border-zinc-800">
        {sections.map((section) => {
          const isOpen = openSection === section.id;
          const Icon = section.icon;
          const content = logs[section.id];

          return (
            <div key={section.id} className="border-t border-zinc-800">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex flex-1 items-center justify-between w-full py-4 text-sm font-medium transition-all hover:underline text-zinc-200 outline-none"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-zinc-400" />
                  {section.label}
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 pt-1">
                      <div className="relative group rounded-xl overflow-hidden bg-[#09090b] border border-zinc-800/80 shadow-inner">
                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800/80">
                          <span className="text-xs font-mono text-zinc-500">{section.id}.txt</span>
                          <button
                            onClick={() => handleCopy(section.id, content)}
                            className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center justify-center"
                            title="Copy to clipboard"
                          >
                            {copiedId === section.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        
                        {/* Code Block with Syntax Styling */}
                        <div className="p-4 overflow-auto max-h-[400px]">
                          <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap break-words leading-relaxed selection:bg-indigo-500/30">
                            {content || "No data available."}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
