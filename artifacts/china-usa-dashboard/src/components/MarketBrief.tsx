import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, RefreshCw, Sparkles } from "lucide-react";

type BriefData = { text: string; generatedAt: string };

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export function MarketBrief() {
  const [data, setData] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetched, setFetched] = useState(false);

  async function fetchBrief() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/market-brief");
      if (!res.ok) throw new Error("failed");
      const json: BriefData = await res.json();
      setData(json);
      setFetched(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="relative p-6 rounded-xl border border-violet-500/20 bg-slate-900/60 backdrop-blur-md overflow-hidden mb-8"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-24 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                AI Market Brief
                <Sparkles className="w-3 h-3 text-violet-400" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Powered by GPT-4o mini</div>
            </div>
          </div>

          <button
            onClick={fetchBrief}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-violet-500/25 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            {fetched ? "Refresh" : "Generate"}
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-violet-300/70 font-mono mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Analyzing market conditions...
              </div>
              <div className="h-3 bg-slate-800/80 rounded animate-pulse w-full" />
              <div className="h-3 bg-slate-800/80 rounded animate-pulse w-5/6" />
              <div className="h-3 bg-slate-800/80 rounded animate-pulse w-4/6" />
            </motion.div>
          ) : error ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-red-400 font-mono">
              Failed to generate brief. Check your API key and try again.
            </motion.div>
          ) : data ? (
            <motion.div key="data" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                {data.text}
              </p>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-600 font-mono">
                <span className="w-1 h-1 rounded-full bg-violet-500/50" />
                Generated {timeAgo(data.generatedAt)} · Cached 5 min · Not financial advice
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-sm text-slate-500 italic">
                Click "Generate" for an AI-written summary of today's US vs China market conditions.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
