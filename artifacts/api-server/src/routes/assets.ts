import { Router, type IRouter } from "express";
import {
  GetUsaAssetsResponse,
  GetChinaAssetsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function jitter(base: number, pct: number): number {
  const factor = 1 + (Math.random() - 0.5) * 2 * pct;
  return parseFloat((base * factor).toFixed(2));
}

function randChange(base: number): number {
  return parseFloat(((Math.random() - 0.45) * base * 0.015).toFixed(2));
}

function randChangePct(): number {
  return parseFloat(((Math.random() - 0.45) * 1.8).toFixed(3));
}

router.get("/assets/usa", async (req, res): Promise<void> => {
  const sp500Base = 5487.03;
  const sp500Value = jitter(sp500Base, 0.008);
  const sp500Change = randChange(sp500Base);

  const usdStrengthBase = 104.23;
  const usdStrengthValue = jitter(usdStrengthBase, 0.005);

  const techMarketCapBase = 14.8;
  const techMarketCapValue = jitter(techMarketCapBase, 0.01);

  const response = GetUsaAssetsResponse.parse({
    sp500: {
      name: "S&P 500",
      value: sp500Value,
      change: sp500Change,
      changePercent: parseFloat(((sp500Change / sp500Base) * 100).toFixed(3)),
      unit: "pts",
      description: "US large-cap equities benchmark",
    },
    usdStrength: {
      name: "USD Strength Index (DXY)",
      value: usdStrengthValue,
      change: randChange(usdStrengthBase),
      changePercent: randChangePct(),
      unit: "index",
      description: "US Dollar index vs basket of currencies",
    },
    techMarketCap: {
      name: "US Tech Market Cap",
      value: techMarketCapValue,
      change: parseFloat((randChange(techMarketCapBase) * 0.01).toFixed(4)),
      changePercent: randChangePct(),
      unit: "T USD",
      description: "Combined market cap of top US tech companies",
    },
    gdp: {
      name: "US GDP",
      value: 27.36,
      change: 0.12,
      changePercent: 0.44,
      unit: "T USD",
      description: "Annual GDP at current prices",
    },
    inflation: {
      name: "US Inflation Rate",
      value: jitter(3.2, 0.05),
      change: -0.1,
      changePercent: -3.03,
      unit: "%",
      description: "Consumer Price Index YoY",
    },
    unemployment: {
      name: "US Unemployment",
      value: jitter(3.9, 0.03),
      change: 0.0,
      changePercent: 0.0,
      unit: "%",
      description: "Unemployment rate",
    },
  });

  res.json(response);
});

router.get("/assets/china", async (req, res): Promise<void> => {
  const shanghaiBase = 3128.45;
  const shanghaiValue = jitter(shanghaiBase, 0.008);
  const shanghaiChange = randChange(shanghaiBase);

  const cnyStrengthBase = 97.14;

  const response = GetChinaAssetsResponse.parse({
    shanghaiIndex: {
      name: "SSE Composite Index",
      value: shanghaiValue,
      change: shanghaiChange,
      changePercent: parseFloat(((shanghaiChange / shanghaiBase) * 100).toFixed(3)),
      unit: "pts",
      description: "Shanghai Stock Exchange main index",
    },
    cnyStrength: {
      name: "CNY Strength Index",
      value: jitter(cnyStrengthBase, 0.005),
      change: randChange(cnyStrengthBase),
      changePercent: randChangePct(),
      unit: "index",
      description: "Chinese Renminbi index vs basket of currencies",
    },
    manufacturingOutput: {
      name: "Manufacturing PMI",
      value: jitter(49.7, 0.03),
      change: 0.3,
      changePercent: 0.61,
      unit: "index",
      description: "Purchasing Managers Index for manufacturing sector",
    },
    gdp: {
      name: "China GDP",
      value: 17.79,
      change: 0.09,
      changePercent: 0.51,
      unit: "T USD",
      description: "Annual GDP at current prices",
    },
    inflation: {
      name: "China Inflation Rate",
      value: jitter(0.3, 0.1),
      change: 0.1,
      changePercent: 50.0,
      unit: "%",
      description: "Consumer Price Index YoY",
    },
    tradeBalance: {
      name: "China Trade Surplus",
      value: jitter(823.2, 0.02),
      change: 12.4,
      changePercent: 1.53,
      unit: "B USD",
      description: "Annual trade surplus",
    },
  });

  res.json(response);
});

export default router;
