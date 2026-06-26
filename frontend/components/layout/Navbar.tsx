import { Activity, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 h-16 border-b border-white/10 bg-black/20 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/50 text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            PagePulse AI
          </span>
        </div>

        {/* Gemini Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-medium text-purple-200">
            Powered by Gemini
          </span>
        </div>
      </div>
    </nav>
  );
}
