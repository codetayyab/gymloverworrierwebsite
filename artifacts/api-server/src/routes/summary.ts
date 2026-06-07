import { Router, type IRouter } from "express";
import { GetDashboardSummaryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const AI_INSIGHTS = [
  "USA leads in tech sector strength today, with S&P 500 momentum and DXY index outperforming CNY benchmarks.",
  "China shows resilience in manufacturing output and trade surplus, while USA maintains equity market dominance.",
  "Diverging monetary policies continue to widen the interest rate gap, supporting USD strength against CNY.",
  "China's GDP growth rate of 5.2% outpaces USA's 2.5%, signaling stronger expansion momentum in the East.",
  "USA tech market capitalization remains 4.6x China's — a dominant structural advantage in global capital markets.",
  "CNY depreciation pressure is moderate today as PBOC continues steady intervention in offshore markets.",
];

function getInsight(): string {
  const idx = Math.floor(Date.now() / (1000 * 60 * 30)) % AI_INSIGHTS.length;
  return AI_INSIGHTS[idx] ?? AI_INSIGHTS[0]!;
}

router.get("/summary", async (req, res): Promise<void> => {
  const categories = [
    {
      category: "Equity Markets",
      winner: "USA" as const,
      margin: "Strong",
      summary: "S&P 500 outperforms SSE Composite in absolute index value and YTD returns",
    },
    {
      category: "Currency Strength",
      winner: "USA" as const,
      margin: "Moderate",
      summary: "USD maintains structural advantage with DXY above 104",
    },
    {
      category: "Economic Growth",
      winner: "CHINA" as const,
      margin: "Significant",
      summary: "China GDP growth 5.2% vs USA 2.5% — emerging economy momentum",
    },
    {
      category: "Trade Balance",
      winner: "CHINA" as const,
      margin: "Strong",
      summary: "China surplus of $823B vs USA deficit of $773B",
    },
    {
      category: "Price Stability",
      winner: "CHINA" as const,
      margin: "Strong",
      summary: "China inflation 0.3% vs USA 3.2% — tighter price control",
    },
    {
      category: "Technology Sector",
      winner: "USA" as const,
      margin: "Dominant",
      summary: "US tech market cap at $14.8T — 4.6x China's $3.2T",
    },
  ];

  const usaWins = categories.filter((c) => c.winner === "USA").length;
  const chinaWins = categories.filter((c) => c.winner === "CHINA").length;
  const todaysWinner =
    usaWins > chinaWins
      ? ("USA" as const)
      : chinaWins > usaWins
      ? ("CHINA" as const)
      : ("TIE" as const);

  const usaStrength = parseFloat(
    (50 + (usaWins / categories.length) * 50 * (0.9 + Math.random() * 0.2)).toFixed(1)
  );
  const chinaStrength = parseFloat((100 - usaStrength + (Math.random() - 0.5) * 5).toFixed(1));

  const response = GetDashboardSummaryResponse.parse({
    todaysWinner,
    aiInsight: getInsight(),
    categories,
    exchangeRate: 7.2458,
    usaStrength,
    chinaStrength,
    lastUpdated: new Date().toISOString(),
  });

  res.json(response);
});

export default router;
