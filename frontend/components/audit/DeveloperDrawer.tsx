"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PromptLogs } from "@/types/audit";
import { Terminal, ChevronDown, Copy, Check, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeveloperDrawerProps {
  logs?: PromptLogs;
}

export function DeveloperDrawer({ logs }: DeveloperDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof PromptLogs>("systemPrompt");
  const [copied, setCopied] = useState(false);

  if (!logs) return null;

  const tabs: { id: keyof PromptLogs; label: string }[] = [
    { id: "systemPrompt", label: "System Prompt" },
    { id: "userPrompt", label: "User Prompt" },
    { id: "structuredInput", label: "Structured Input" },
    { id: "rawOutput", label: "Raw Output" },
  ];

  const handleCopy = async () => {
    const textToCopy = logs[activeTab];
    if (!textToCopy) return;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <div className="w-full mt-12 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header (Accordion Toggle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-6 bg-zinc-900/50 hover:bg-zinc-900/80 transition-colors cursor-pointer outline-none"
      >
        <div className="flex items-center gap-3 text-zinc-300">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h3 className="font-semibold tracking-wide">Developer & Prompt Logs</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-zinc-500" />
        </motion.div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 md:p-6 border-t border-zinc-800">
              
              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-4 border-b border-zinc-800/50 pb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      activeTab === tab.id 
                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shadow-sm" 
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 border border-transparent"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code Viewer Container */}
              <div className="relative group rounded-xl overflow-hidden bg-[#0d0d0f] border border-zinc-800/80">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Code2 className="w-4 h-4" />
                    <span className="text-xs font-mono">{activeTab}.txt</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center justify-center"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                
                {/* Code Block */}
                <div className="p-4 overflow-auto max-h-[400px]">
                  <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap break-words">
                    {logs[activeTab] || "No data available."}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
