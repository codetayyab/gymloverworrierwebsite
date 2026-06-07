import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import { ArrowRight, Activity } from "lucide-react";
import { useGetExchangeRate, useGetDashboardSummary } from "@workspace/api-client-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: rate } = useGetExchangeRate();
  const { data: summary } = useGetDashboardSummary();

  return (
    <AppLayout>
      <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden">
        {/* Abstract background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
            >
              Global Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Tracker</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
            >
              Real-time financial intelligence comparing the economic strength of the USA and China. Built for analysts who demand precision.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link href="/dashboard" className="px-8 py-4 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2 transition-all w-full sm:w-auto justify-center">
                Start Analysis <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/compare" className="px-8 py-4 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium flex items-center gap-2 transition-all w-full sm:w-auto justify-center">
                View Comparison <Activity className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
            >
              <div className="p-6 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <p className="text-slate-400 text-sm font-medium mb-2">USD/CNY Rate</p>
                <div className="text-3xl font-bold text-white font-mono">
                  {rate ? rate.usdToCny.toFixed(4) : "Loading..."}
                </div>
                {rate && (
                  <p className={`text-sm mt-2 font-mono ${rate.changePercent24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {rate.changePercent24h >= 0 ? "+" : ""}{rate.changePercent24h.toFixed(2)}% (24h)
                  </p>
                )}
              </div>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <p className="text-slate-400 text-sm font-medium mb-2">USA Score</p>
                <div className="text-3xl font-bold text-blue-400 font-mono">
                  {summary ? summary.usaStrength : "Loading..."}
                </div>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <p className="text-slate-400 text-sm font-medium mb-2">China Score</p>
                <div className="text-3xl font-bold text-red-400 font-mono">
                  {summary ? summary.chinaStrength : "Loading..."}
                </div>
              </div>
            </motion.div>

            {/* Trusted By */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-20 pt-10 border-t border-white/10"
            >
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-6 font-semibold">Trusted by analysts at</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
                <span className="text-xl font-serif font-bold">Bloomberg</span>
                <span className="text-xl font-sans font-bold">REUTERS</span>
                <span className="text-xl font-serif font-bold">CNBC</span>
                <span className="text-xl font-sans font-bold tracking-tight">Goldman Sachs</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
