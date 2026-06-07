import { AppLayout } from "@/components/layout/AppLayout";
import { useGetComparison } from "@workspace/api-client-react";
import { motion } from "framer-motion";

export default function Compare() {
  const { data: comparison, isLoading } = useGetComparison();

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold font-sans tracking-tight mb-8">Macro Comparison</h1>

        {isLoading ? (
          <div className="text-center py-20 text-slate-400">Loading comparison data...</div>
        ) : comparison ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col items-center justify-center backdrop-blur-md">
                <div className="text-slate-400 text-sm font-medium mb-2">Overall Winner</div>
                <div className={`text-3xl font-bold ${comparison.overallWinner === 'USA' ? 'text-blue-500' : comparison.overallWinner === 'CHINA' ? 'text-red-500' : 'text-slate-300'}`}>
                  {comparison.overallWinner}
                </div>
              </div>
              <div className="p-6 rounded-xl bg-blue-900/20 border border-blue-500/20 flex flex-col items-center justify-center backdrop-blur-md">
                <div className="text-blue-400/80 text-sm font-medium mb-2">USA Score</div>
                <div className="text-4xl font-mono font-bold text-blue-400">{comparison.usaScore}</div>
              </div>
              <div className="p-6 rounded-xl bg-red-900/20 border border-red-500/20 flex flex-col items-center justify-center backdrop-blur-md">
                <div className="text-red-400/80 text-sm font-medium mb-2">China Score</div>
                <div className="text-4xl font-mono font-bold text-red-400">{comparison.chinaScore}</div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/40 text-slate-400 text-sm uppercase tracking-wider font-medium">
                    <th className="p-4 border-b border-white/5">Metric</th>
                    <th className="p-4 border-b border-white/5 text-right w-1/4">USA</th>
                    <th className="p-4 border-b border-white/5 text-center w-16">Winner</th>
                    <th className="p-4 border-b border-white/5 w-1/4">China</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={row.metric} 
                      className={`
                        border-b border-white/5 transition-colors hover:bg-white/5
                        ${row.winner === 'USA' ? 'bg-blue-500/5' : row.winner === 'CHINA' ? 'bg-red-500/5' : ''}
                      `}
                    >
                      <td className="p-4">
                        <div className="font-medium text-white">{row.metric}</div>
                        {row.description && <div className="text-xs text-slate-500 mt-1">{row.description}</div>}
                      </td>
                      <td className="p-4 text-right">
                        <div className={`font-mono text-lg ${row.winner === 'USA' ? 'text-blue-400 font-bold' : 'text-slate-300'}`}>
                          {row.usaValue.toLocaleString()} {row.unit}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">
                          {row.winner === 'USA' ? (
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs font-bold">US</div>
                          ) : row.winner === 'CHINA' ? (
                            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs font-bold">CN</div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-500/20 flex items-center justify-center text-slate-500 text-xs font-bold">-</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={`font-mono text-lg ${row.winner === 'CHINA' ? 'text-red-400 font-bold' : 'text-slate-300'}`}>
                          {row.chinaValue.toLocaleString()} {row.unit}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </AppLayout>
  );
}
