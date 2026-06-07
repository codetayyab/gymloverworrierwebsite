import { AppLayout } from "@/components/layout/AppLayout";
import { MarketBrief } from "@/components/MarketBrief";
import { useGetDashboardSummary, useGetExchangeRate, useGetUsaAssets, useGetChinaAssets, useConvertCurrency, ConvertCurrencyFrom } from "@workspace/api-client-react";
import { ArrowDown, ArrowUp, DollarSign, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function AssetItemCard({ asset, label }: { asset: any, label: string }) {
  if (!asset) return null;
  const isPositive = asset.changePercent >= 0;
  
  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="text-slate-400 text-xs mb-1">{label}</div>
      <div className="text-lg font-mono font-bold text-white mb-1">{asset.value.toLocaleString()} {asset.unit}</div>
      <div className={`text-xs font-mono flex items-center ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
        {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
        {Math.abs(asset.changePercent).toFixed(2)}%
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary({ query: { refetchInterval: 30000 } });
  const { data: rate, isLoading: loadingRate } = useGetExchangeRate({ query: { refetchInterval: 30000 } });
  const { data: usaAssets } = useGetUsaAssets({ query: { refetchInterval: 30000 } });
  const { data: chinaAssets } = useGetChinaAssets({ query: { refetchInterval: 30000 } });

  const [convertAmount, setConvertAmount] = useState<string>("100");
  const [convertFrom, setConvertFrom] = useState<ConvertCurrencyFrom>("USD");
  
  const { data: convertResult, isLoading: converting } = useConvertCurrency(
    { amount: Number(convertAmount) || 0, from: convertFrom },
    { query: { enabled: !!convertAmount && !isNaN(Number(convertAmount)) } }
  );

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-sans tracking-tight">Market Dashboard</h1>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <RefreshCcw className="w-3 h-3 animate-spin-slow" />
            Auto-refreshing (30s)
          </div>
        </div>

        {/* AI Market Brief */}
        <MarketBrief />

        {/* Stronger Today Banner */}
        {summary && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl border mb-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md ${
            summary.todaysWinner === 'USA' 
              ? 'bg-blue-900/20 border-blue-500/30' 
              : summary.todaysWinner === 'CHINA'
                ? 'bg-red-900/20 border-red-500/30'
                : 'bg-slate-900/40 border-slate-500/30'
          }`}>
            <div>
              <div className="text-sm font-medium text-slate-300 mb-1 uppercase tracking-wider">Overall Strength Indicator</div>
              <div className="text-2xl font-bold text-white flex items-center gap-3">
                {summary.todaysWinner === 'USA' ? 'USA Leading' : summary.todaysWinner === 'CHINA' ? 'China Leading' : 'Market Tied'}
                <span className={`px-2 py-0.5 rounded text-xs ${summary.todaysWinner === 'USA' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                  {summary.todaysWinner === 'USA' ? summary.usaStrength : summary.chinaStrength} vs {summary.todaysWinner === 'USA' ? summary.chinaStrength : summary.usaStrength}
                </span>
              </div>
            </div>
            <div className="md:max-w-md text-sm text-slate-300 bg-black/20 p-4 rounded-lg border border-white/5">
              {summary.aiInsight}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* USA Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-xl bg-slate-900/60 border border-blue-500/20 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">US</div>
                <h2 className="text-xl font-bold text-white">United States</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <AssetItemCard asset={usaAssets?.sp500} label="S&P 500" />
                <AssetItemCard asset={usaAssets?.gdp} label="GDP" />
                <AssetItemCard asset={usaAssets?.techMarketCap} label="Tech Cap" />
                <AssetItemCard asset={usaAssets?.usdStrength} label="USD Index" />
              </div>
            </div>
          </motion.div>

          {/* Center Panel - Currency */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6 text-center">USD / CNY Rate</h3>
              {rate && (
                <div className="text-center mb-8">
                  <div className="text-5xl font-mono font-bold text-white mb-2">{rate.usdToCny.toFixed(4)}</div>
                  <div className={`text-sm font-mono flex items-center justify-center ${rate.changePercent24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {rate.changePercent24h >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                    {Math.abs(rate.change24h).toFixed(4)} ({Math.abs(rate.changePercent24h).toFixed(2)}%)
                  </div>
                </div>
              )}
              
              {/* Converter */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                <div className="text-xs text-slate-400 mb-3 font-medium">Quick Convert</div>
                <div className="flex gap-2 mb-3">
                  <input 
                    type="number" 
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-md px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                  />
                  <select 
                    value={convertFrom}
                    onChange={(e) => setConvertFrom(e.target.value as ConvertCurrencyFrom)}
                    className="bg-slate-800/50 border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="CNY">CNY</option>
                  </select>
                </div>
                <div className="bg-slate-800/80 rounded-md p-3 text-center border border-white/5">
                  <div className="text-xl font-mono font-bold text-white">
                    {converting ? '...' : convertResult ? convertResult.result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                    <span className="text-sm text-slate-400 ml-2">{convertFrom === 'USD' ? 'CNY' : 'USD'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* China Panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-xl bg-slate-900/60 border border-red-500/20 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-6 relative z-10 justify-end">
                <h2 className="text-xl font-bold text-white">China</h2>
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold border border-red-500/30">CN</div>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <AssetItemCard asset={chinaAssets?.shanghaiIndex} label="Shanghai Index" />
                <AssetItemCard asset={chinaAssets?.gdp} label="GDP" />
                <AssetItemCard asset={chinaAssets?.manufacturingOutput} label="Manufacturing" />
                <AssetItemCard asset={chinaAssets?.cnyStrength} label="CNY Strength" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
