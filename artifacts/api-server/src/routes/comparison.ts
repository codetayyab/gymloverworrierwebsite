import { Router, type IRouter } from "express";
import { GetComparisonResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/comparison", async (req, res): Promise<void> => {
  const rows = [
    {
      metric: "Stock Market Performance",
      usa: "S&P 500",
      china: "SSE Composite",
      usaValue: 5487.03,
      chinaValue: 3128.45,
      winner: "USA" as const,
      unit: "index pts",
      description: "Primary equity market benchmark",
    },
    {
      metric: "Currency Strength Index",
      usa: "DXY (USD Index)",
      china: "CNY Index",
      usaValue: 104.23,
      chinaValue: 97.14,
      winner: "USA" as const,
      unit: "index",
      description: "Currency strength vs global basket",
    },
    {
      metric: "GDP (Trillions USD)",
      usa: "$27.36T",
      china: "$17.79T",
      usaValue: 27.36,
      chinaValue: 17.79,
      winner: "USA" as const,
      unit: "T USD",
      description: "Total annual economic output",
    },
    {
      metric: "GDP Growth Rate",
      usa: "2.5%",
      china: "5.2%",
      usaValue: 2.5,
      chinaValue: 5.2,
      winner: "CHINA" as const,
      unit: "%",
      description: "Year-over-year GDP growth",
    },
    {
      metric: "Trade Balance",
      usa: "-$773B",
      china: "+$823B",
      usaValue: -773,
      chinaValue: 823.2,
      winner: "CHINA" as const,
      unit: "B USD",
      description: "Annual trade surplus/deficit",
    },
    {
      metric: "Inflation Rate",
      usa: "3.2%",
      china: "0.3%",
      usaValue: 3.2,
      chinaValue: 0.3,
      winner: "CHINA" as const,
      unit: "%",
      description: "Consumer Price Index YoY (lower is better)",
    },
    {
      metric: "Tech Market Capitalization",
      usa: "$14.8T",
      china: "$3.2T",
      usaValue: 14.8,
      chinaValue: 3.2,
      winner: "USA" as const,
      unit: "T USD",
      description: "Combined top tech company market caps",
    },
    {
      metric: "Manufacturing PMI",
      usa: "52.3",
      china: "49.7",
      usaValue: 52.3,
      chinaValue: 49.7,
      winner: "USA" as const,
      unit: "index",
      description: "Manufacturing sector health (>50 = expansion)",
    },
    {
      metric: "Unemployment Rate",
      usa: "3.9%",
      china: "5.1%",
      usaValue: 3.9,
      chinaValue: 5.1,
      winner: "USA" as const,
      unit: "%",
      description: "Official unemployment rate (lower is better)",
    },
    {
      metric: "Economic Global Rank",
      usa: "#1",
      china: "#2",
      usaValue: 1,
      chinaValue: 2,
      winner: "USA" as const,
      unit: "rank",
      description: "World economic ranking by GDP",
    },
  ];

  const usaWins = rows.filter((r) => r.winner === "USA").length;
  const chinaWins = rows.filter((r) => r.winner === "CHINA").length;
  const overallWinner = usaWins > chinaWins ? "USA" as const : chinaWins > usaWins ? "CHINA" as const : "TIE" as const;

  const response = GetComparisonResponse.parse({
    rows,
    overallWinner,
    usaScore: usaWins,
    chinaScore: chinaWins,
    lastUpdated: new Date().toISOString(),
  });

  res.json(response);
});

export default router;
