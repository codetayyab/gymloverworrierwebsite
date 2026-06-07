import { AppLayout } from "@/components/layout/AppLayout";
import { useGetCurrencyChart, useGetMarketsChart, GetCurrencyChartPeriod, GetMarketsChartPeriod } from "@workspace/api-client-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";
import { format } from "date-fns";

export default function Charts() {
  const [period, setPeriod] = useState<'1D' | '7D' | '30D'>('7D');
  
  const { data: currencyData } = useGetCurrencyChart({ period: period as GetCurrencyChartPeriod });
  const { data: marketsData } = useGetMarketsChart({ period: period as GetMarketsChartPeriod });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-sans tracking-tight">Market Charts</h1>
          
          <div className="flex bg-slate-900 rounded-lg border border-white/10 p-1">
            {['1D', '7D', '30D'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p as any)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${period === p ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* Currency Chart */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-6">USD/CNY Exchange Rate</h2>
            <div className="h-[400px] w-full">
              {currencyData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currencyData.points} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickFormatter={(val) => format(new Date(val), period === '1D' ? 'HH:mm' : 'MMM dd')}
                    />
                    <YAxis stroke="#94a3b8" fontSize={12} domain={['auto', 'auto']} tickFormatter={(val) => val.toFixed(4)} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                      itemStyle={{ color: '#60a5fa' }}
                      labelFormatter={(val) => format(new Date(val), 'MMM dd, yyyy HH:mm')}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">Loading chart...</div>
              )}
            </div>
          </div>

          {/* Markets Chart */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-6">S&P 500 vs Shanghai Index (Normalized)</h2>
            <div className="h-[400px] w-full">
              {marketsData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketsData.points} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickFormatter={(val) => format(new Date(val), period === '1D' ? 'HH:mm' : 'MMM dd')}
                    />
                    <YAxis stroke="#94a3b8" fontSize={12} domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                      labelFormatter={(val) => format(new Date(val), 'MMM dd, yyyy HH:mm')}
                    />
                    <Legend />
                    <Line type="monotone" name="USA (S&P 500)" dataKey="usa" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    <Line type="monotone" name="China (Shanghai)" dataKey="china" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">Loading chart...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
