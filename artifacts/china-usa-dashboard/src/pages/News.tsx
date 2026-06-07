import { AppLayout } from "@/components/layout/AppLayout";
import { useGetNews, GetNewsCountry } from "@workspace/api-client-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ExternalLink, RefreshCcw, TrendingDown, TrendingUp, Minus } from "lucide-react";

type NewsArticle = {
  id: string;
  title: string;
  summary: string;
  source: string;
  country: "USA" | "CHINA";
  category: "Markets" | "Economy" | "Currency" | "Trade" | "Technology" | "Policy";
  publishedAt: string;
  sentiment: "positive" | "negative" | "neutral";
  url: string;
  imageTag?: string | null;
};

const CATEGORY_COLORS: Record<string, string> = {
  Markets: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Economy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Currency: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Trade: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Technology: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  Policy: "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

const TICKER_TAGS = [
  { label: "S&P 500", value: "5,487.03", change: "+0.64%", up: true },
  { label: "USD/CNY", value: "7.3549", change: "-0.24%", up: false },
  { label: "Shanghai", value: "3,128.45", change: "-0.31%", up: false },
  { label: "DXY", value: "104.23", change: "+0.12%", up: true },
  { label: "Gold", value: "$2,318", change: "+0.48%", up: true },
  { label: "Oil WTI", value: "$78.42", change: "-0.91%", up: false },
  { label: "NASDAQ", value: "17,891", change: "+0.82%", up: true },
  { label: "10Y UST", value: "4.28%", change: "+3bps", up: false },
];

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function SentimentIcon({ sentiment }: { sentiment: string }) {
  if (sentiment === "positive") return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
  if (sentiment === "negative") return <TrendingDown className="w-3.5 h-3.5 text-red-400" />;
  return <Minus className="w-3.5 h-3.5 text-slate-400" />;
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const isUSA = article.country === "USA";
  const catStyle = CATEGORY_COLORS[article.category] ?? "text-slate-400 bg-slate-500/10 border-slate-500/20";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`group relative p-5 rounded-xl border backdrop-blur-md transition-all duration-200 hover:scale-[1.01] cursor-pointer ${
        isUSA
          ? "bg-slate-900/60 border-blue-500/15 hover:border-blue-500/40 hover:bg-blue-950/30"
          : "bg-slate-900/60 border-red-500/15 hover:border-red-500/40 hover:bg-red-950/30"
      }`}
    >
      {/* Glow on hover */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isUSA ? "bg-blue-500/5" : "bg-red-500/5"
      } blur-xl pointer-events-none`} />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Country badge */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${
              isUSA ? "bg-blue-500/15 text-blue-400 border-blue-500/25" : "bg-red-500/15 text-red-400 border-red-500/25"
            }`}>
              {isUSA ? "🇺🇸 USA" : "🇨🇳 CHINA"}
            </span>
            {/* Category badge */}
            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium border ${catStyle}`}>
              {article.category}
            </span>
            {/* Sentiment */}
            <span className="flex items-center gap-1">
              <SentimentIcon sentiment={article.sentiment} />
            </span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0 mt-0.5" />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white leading-snug mb-2 group-hover:text-white transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {article.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold ${isUSA ? "text-blue-400/70" : "text-red-400/70"}`}>
            {article.source}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
            <Clock className="w-3 h-3" />
            {timeAgo(article.publishedAt)}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function TickerBar() {
  return (
    <div className="w-full overflow-hidden border-y border-white/5 bg-slate-950/80 py-2 mb-8">
      <div className="flex animate-marquee gap-10 whitespace-nowrap">
        {[...TICKER_TAGS, ...TICKER_TAGS].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">{t.label}</span>
            <span className="text-white font-semibold">{t.value}</span>
            <span className={t.up ? "text-emerald-400" : "text-red-400"}>{t.change}</span>
            <span className="text-slate-700">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function News() {
  const [filter, setFilter] = useState<GetNewsCountry>("ALL");

  const { data, isLoading, dataUpdatedAt } = useGetNews(
    { country: filter },
    { query: { refetchInterval: 60000 } }
  );

  const articles = (data?.articles ?? []) as NewsArticle[];

  const usaArticles = articles.filter((a) => a.country === "USA");
  const chinaArticles = articles.filter((a) => a.country === "CHINA");

  const tabs: { label: string; value: GetNewsCountry; count?: number }[] = [
    { label: "All Headlines", value: "ALL", count: (data?.usaCount ?? 0) + (data?.chinaCount ?? 0) },
    { label: "USA", value: "USA", count: data?.usaCount },
    { label: "China", value: "CHINA", count: data?.chinaCount },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">News & Insights</h1>
            <p className="text-slate-400 text-sm">Financial intelligence from both sides of the world</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
            <RefreshCcw className="w-3 h-3 animate-spin-slow" />
            {dataUpdatedAt ? `Updated ${timeAgo(new Date(dataUpdatedAt).toISOString())}` : "Auto-refreshing"}
          </div>
        </div>

        {/* Ticker bar */}
        <TickerBar />

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                filter === tab.value
                  ? tab.value === "USA"
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : tab.value === "CHINA"
                    ? "bg-red-500/20 border-red-500/40 text-red-300"
                    : "bg-white/10 border-white/20 text-white"
                  : "border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-300 bg-transparent"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 text-[10px] opacity-60">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 rounded-xl bg-slate-900/40 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : filter === "ALL" ? (
          /* Side-by-side layout when showing all */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* USA column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                <span className="text-xs font-bold tracking-widest text-blue-400 uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                  United States
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent" />
              </div>
              <div className="space-y-4">
                {usaArticles.map((article, i) => (
                  <NewsCard key={article.id} article={article} index={i} />
                ))}
              </div>
            </div>

            {/* China column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
                <span className="text-xs font-bold tracking-widest text-red-400 uppercase px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                  China
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-red-500/50 to-transparent" />
              </div>
              <div className="space-y-4">
                {chinaArticles.map((article, i) => (
                  <NewsCard key={article.id} article={article} index={i} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Grid layout for filtered view */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, i) => (
              <NewsCard key={article.id} article={article} index={i} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
