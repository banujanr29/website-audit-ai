"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Search, Zap, CheckCircle2, Layout, Accessibility, Loader2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAudit } from "@/hooks/useAudit";

const auditSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

type AuditFormValues = z.infer<typeof auditSchema>;

export default function LandingPage() {
  const { submitAudit, loading, error, response } = useAudit();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    defaultValues: { url: "" },
  });

  const onSubmit = (data: AuditFormValues) => {
    submitAudit(data.url);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const features = [
    { name: "SEO", icon: Search },
    { name: "Accessibility", icon: Accessibility },
    { name: "Content", icon: CheckCircle2 },
    { name: "UX", icon: Layout },
    { name: "Gemini AI", icon: Zap },
  ];

  return (
    <>
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-12"
        >
          
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-zinc-500 drop-shadow-sm">
              AI-Powered Website Auditing
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Analyze SEO, Accessibility, Content Quality and User Experience in seconds using deterministic analysis and Gemini AI.
            </p>
          </motion.div>

          {/* Feature Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-sm text-zinc-300 text-sm font-medium shadow-sm transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  {feature.name}
                </div>
              );
            })}
          </motion.div>

          {/* URL Input Card */}
          <motion.div variants={itemVariants} className="w-full max-w-2xl mt-8">
            <div className="relative p-1 rounded-3xl bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 shadow-2xl backdrop-blur-xl">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-[1.35rem] bg-zinc-950/80 border border-zinc-800/50">
                <div className="flex-1 w-full relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full h-14 pl-12 pr-4 bg-transparent text-zinc-100 placeholder:text-zinc-600 focus:outline-none text-lg rounded-2xl"
                    disabled={loading}
                    {...register("url")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-medium flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Website
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Error Messages */}
            <div className="mt-4 min-h-[24px]">
              {errors.url && (
                <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.url.message}
                </div>
              )}
              {!errors.url && error && (
                <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>
          </motion.div>

          {/* Temporary Response JSON Card */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl text-left bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl mt-8"
            >
              <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                <h3 className="font-semibold text-zinc-200">Raw Audit Response</h3>
                <p className="text-xs text-zinc-500">Temporarily displayed until dashboard is built.</p>
              </div>
              <div className="p-6 overflow-auto max-h-[500px]">
                <pre className="text-xs text-zinc-300 font-mono">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </motion.div>
          )}

        </motion.div>
      </main>

      <Footer />
    </>
  );
}
