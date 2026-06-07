import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart2,
  BrainCircuit,
  DollarSign,
  Globe,
  Newspaper,
  Scale,
  ShieldAlert,
  TrendingUp,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: DollarSign,
    title: "Live Currency Tracking",
    desc: "USD/CNY exchange rate updated in real time with 24h delta, high/low range, and quick-convert tool.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Activity,
    title: "Market Dashboard",
    desc: "Side-by-side asset panels for S&P 500, Shanghai Composite, DXY, CNY Strength Index, and GDP figures.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Scale,
    title: "Metric Comparison Engine",
    desc: "10-metric head-to-head table with automatic winner highlighting per category and an overall strength score.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: BarChart2,
    title: "Historical Charts",
    desc: "Interactive USD/CNY trend and dual market-index chart with 1D, 7D, and 30D period selectors.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Newspaper,
    title: "News & Insights",
    desc: "Curated financial headlines from Bloomberg, Reuters, FT and more — filtered by country and category.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: BrainCircuit,
    title: "AI Market Brief",
    desc: "GPT-4o mini generates a 3-sentence Bloomberg-style analyst summary of current US vs China market conditions.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
];

const STACK = [
  { label: "Frontend", value: "React + Vite + TypeScript" },
  { label: "Styling", value: "Tailwind CSS + Glassmorphism" },
  { label: "Charts", value: "Recharts" },
  { label: "Animations", value: "Framer Motion" },
  { label: "Backend", value: "Node.js + Express 5" },
  { label: "AI", value: "OpenAI GPT-4o mini" },
  { label: "Data", value: "Simulated live indicators" },
  { label: "API Layer", value: "OpenAPI + Orval codegen" },
];

const SOURCES = [
  { name: "Bloomberg", color: "text-blue-400", desc: "Market data & analysis reference" },
  { name: "Reuters", color: "text-orange-400", desc: "Global financial news wire" },
  { name: "CNBC", color: "text-blue-300", desc: "US markets commentary" },
  { name: "Financial Times", color: "text-pink-300", desc: "Global economic reporting" },
  { name: "South China Morning Post", color: "text-red-400", desc: "China business & finance" },
  { name: "Nikkei Asia", color: "text-emerald-400", desc: "Asia-Pacific market insight" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden p-10 mb-10 text-center"
        >
          {/* Background glow orbs */}
          <div className="absolute top-0 left-1/4 w-72 h-36 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-72 h-36 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-red-400">
                GlobalAsset Intelligence
              </h1>
            </div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              A Bloomberg-style financial intelligence platform comparing the economic and
              financial strength of the world's two largest economies — in real time.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> USA 🇺🇸</span>
              <span className="text-slate-700">vs</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> China 🇨🇳</span>
            </div>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="mb-10">
          <h2 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/5" /> Features <span className="h-px flex-1 bg-white/5" />
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={item}
                  className="p-5 rounded-xl border bg-slate-900/50 border-white/8 backdrop-blur-sm hover:bg-slate-900/80 hover:border-white/15 transition-all group"
                >
                  <div className={`inline-flex p-2 rounded-lg border mb-3 ${f.bg}`}>
                    <Icon className={`w-4 h-4 ${f.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl border border-white/8 bg-slate-900/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4 text-yellow-400" />
              <h2 className="text-sm font-bold text-white tracking-wide">Tech Stack</h2>
            </div>
            <div className="space-y-3">
              {STACK.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">{s.label}</span>
                  <span className="text-xs text-slate-200 font-mono">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data sources */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-6 rounded-xl border border-white/8 bg-slate-900/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white tracking-wide">Reference Sources</h2>
            </div>
            <div className="space-y-3">
              {SOURCES.map((s) => (
                <div key={s.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className={`text-sm font-semibold ${s.color}`}>{s.name}</span>
                  <span className="text-xs text-slate-500">{s.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-4 p-5 rounded-xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm"
        >
          <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-red-300 mb-1">Disclaimer</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              This platform is an <strong className="text-slate-300">educational tool only</strong> and does not constitute financial advice.
              All market data shown is simulated or approximated for demonstration purposes.
              AI-generated content reflects model outputs and should not be relied upon for investment decisions.
              Always consult a qualified financial professional before making any investment.
            </p>
          </div>
        </motion.div>

      </div>
    </AppLayout>
  );
}
