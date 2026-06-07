import { Router, type IRouter } from "express";
import { GetNewsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const ALL_ARTICLES = [
  // USA Articles
  {
    id: "us-1",
    title: "Federal Reserve Signals Potential Rate Cut in Q3 as Inflation Eases",
    summary: "Fed Chair indicates openness to cutting benchmark rates if inflation continues its downward trajectory toward the 2% target. Markets rallied sharply on the guidance, with the S&P 500 posting its largest single-day gain in four months.",
    source: "Bloomberg",
    country: "USA" as const,
    category: "Policy" as const,
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    sentiment: "positive" as const,
    url: "#",
    imageTag: "Federal Reserve",
  },
  {
    id: "us-2",
    title: "S&P 500 Hits New Milestone as Tech Earnings Beat Expectations",
    summary: "The benchmark index crossed another record high as Magnificent Seven companies reported earnings well above analyst consensus. Apple, Microsoft, and NVIDIA collectively added over $400B in market cap in a single session.",
    source: "Reuters",
    country: "USA" as const,
    category: "Markets" as const,
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    sentiment: "positive" as const,
    url: "#",
    imageTag: "Stock Market",
  },
  {
    id: "us-3",
    title: "US Trade Deficit Widens to $773B Annually as Import Demand Stays Strong",
    summary: "Commerce Department data shows the US goods trade deficit expanded for the third consecutive quarter, driven by elevated consumer imports from Asia. Economists warn the imbalance may pressure the dollar in medium-term currency markets.",
    source: "CNBC",
    country: "USA" as const,
    category: "Trade" as const,
    publishedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
    sentiment: "negative" as const,
    url: "#",
    imageTag: "Trade Deficit",
  },
  {
    id: "us-4",
    title: "Dollar Index Holds Above 104 Despite Global De-Dollarization Concerns",
    summary: "The DXY dollar index maintained strength above the 104 level as safe-haven demand remained elevated amid geopolitical tensions. Currency strategists at Goldman Sachs maintain a bullish 12-month target on USD.",
    source: "Financial Times",
    country: "USA" as const,
    category: "Currency" as const,
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    sentiment: "neutral" as const,
    url: "#",
    imageTag: "US Dollar",
  },
  {
    id: "us-5",
    title: "US GDP Growth Revised Up to 2.5% on Strong Consumer Spending",
    summary: "Bureau of Economic Analysis revised Q2 GDP growth upward from the initial 2.1% estimate, citing resilient household spending and a robust services sector. The revision reduces recession fears that had spooked markets last month.",
    source: "Wall Street Journal",
    country: "USA" as const,
    category: "Economy" as const,
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    sentiment: "positive" as const,
    url: "#",
    imageTag: "US Economy",
  },
  {
    id: "us-6",
    title: "Big Tech Antitrust Pressure Mounts as DOJ Files New Suit Against Platform Giants",
    summary: "The Department of Justice has escalated antitrust enforcement, filing a new suit targeting ad-market dominance. Legal analysts expect a multi-year battle that could reshape the $14.8T US tech sector's competitive dynamics.",
    source: "The Verge",
    country: "USA" as const,
    category: "Technology" as const,
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    sentiment: "negative" as const,
    url: "#",
    imageTag: "Tech Regulation",
  },

  // China Articles
  {
    id: "cn-1",
    title: "PBOC Holds Rates Steady as China Navigates Deflationary Pressure",
    summary: "The People's Bank of China left the one-year loan prime rate unchanged at its latest meeting, opting to preserve monetary space. Analysts note China's 0.3% CPI, far below Western inflation levels, gives policymakers unusual room to maneuver.",
    source: "Xinhua Financial",
    country: "CHINA" as const,
    category: "Policy" as const,
    publishedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    sentiment: "neutral" as const,
    url: "#",
    imageTag: "PBOC China",
  },
  {
    id: "cn-2",
    title: "Shanghai Composite Under Pressure as Property Sector Debt Fears Linger",
    summary: "The SSE Composite index fell for the second consecutive week, weighed down by renewed concerns over unresolved debt at major property developers. Regulators are reportedly considering a new stabilization fund to bolster market confidence.",
    source: "South China Morning Post",
    country: "CHINA" as const,
    category: "Markets" as const,
    publishedAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    sentiment: "negative" as const,
    url: "#",
    imageTag: "Shanghai Market",
  },
  {
    id: "cn-3",
    title: "China's Trade Surplus Hits Record $823B — Exports Surge Despite Tariff Headwinds",
    summary: "China recorded its largest-ever annual trade surplus as export volumes to Southeast Asia and the Middle East offset losses in Western markets. Manufacturing competitiveness remains a structural advantage, with PMI holding near 50.",
    source: "Reuters",
    country: "CHINA" as const,
    category: "Trade" as const,
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    sentiment: "positive" as const,
    url: "#",
    imageTag: "China Trade",
  },
  {
    id: "cn-4",
    title: "Yuan Weakens Against Dollar as Capital Outflows Pressure CNY Index",
    summary: "The offshore yuan dipped toward the 7.35 level per dollar as portfolio outflows from Chinese equities accelerated. The PBOC's daily fixing mechanism is keeping depreciation orderly, but pressure on the CNY strength index is mounting.",
    source: "Bloomberg",
    country: "CHINA" as const,
    category: "Currency" as const,
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    sentiment: "negative" as const,
    url: "#",
    imageTag: "Yuan Currency",
  },
  {
    id: "cn-5",
    title: "China GDP Growth Outpaces West at 5.2%, But Quality of Growth Questioned",
    summary: "China's National Bureau of Statistics confirmed 5.2% annual GDP growth, meeting the government's target. Economists note the growth is increasingly reliant on exports and investment rather than domestic consumption, raising structural concerns.",
    source: "Financial Times",
    country: "CHINA" as const,
    category: "Economy" as const,
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    sentiment: "neutral" as const,
    url: "#",
    imageTag: "China GDP",
  },
  {
    id: "cn-6",
    title: "China Accelerates Semiconductor Self-Sufficiency Drive with $47B State Fund",
    summary: "Beijing's 'Big Fund III' is targeting domestic chip production, AI infrastructure, and advanced packaging. The initiative aims to reduce dependence on US and TSMC-manufactured semiconductors by 2030 amid ongoing export control restrictions.",
    source: "Nikkei Asia",
    country: "CHINA" as const,
    category: "Technology" as const,
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    sentiment: "positive" as const,
    url: "#",
    imageTag: "China Tech",
  },
];

router.get("/news", async (req, res): Promise<void> => {
  const country = req.query.country as string | undefined;

  let articles = ALL_ARTICLES;
  if (country === "USA") {
    articles = ALL_ARTICLES.filter((a) => a.country === "USA");
  } else if (country === "CHINA") {
    articles = ALL_ARTICLES.filter((a) => a.country === "CHINA");
  }

  const usaCount = ALL_ARTICLES.filter((a) => a.country === "USA").length;
  const chinaCount = ALL_ARTICLES.filter((a) => a.country === "CHINA").length;

  const response = GetNewsResponse.parse({
    articles,
    lastUpdated: new Date().toISOString(),
    usaCount,
    chinaCount,
  });

  res.json(response);
});

export default router;
