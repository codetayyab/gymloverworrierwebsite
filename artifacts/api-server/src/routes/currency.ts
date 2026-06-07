import { Router, type IRouter } from "express";
import {
  GetExchangeRateResponse,
  GetCurrencyChartQueryParams,
  GetCurrencyChartResponse,
  ConvertCurrencyQueryParams,
  ConvertCurrencyResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const BASE_RATE = 7.2458;

function getSimulatedRate(): number {
  const now = Date.now();
  const drift = Math.sin(now / 600000) * 0.08 + Math.sin(now / 3600000) * 0.04;
  return parseFloat((BASE_RATE + drift).toFixed(4));
}

function generateChartPoints(
  period: string,
  baseValue: number,
  volatility: number
): Array<{ timestamp: string; value: number }> {
  const now = Date.now();
  let count: number;
  let intervalMs: number;

  switch (period) {
    case "1D":
      count = 24;
      intervalMs = 60 * 60 * 1000;
      break;
    case "7D":
      count = 42;
      intervalMs = 4 * 60 * 60 * 1000;
      break;
    case "30D":
    default:
      count = 30;
      intervalMs = 24 * 60 * 60 * 1000;
  }

  const points: Array<{ timestamp: string; value: number }> = [];
  let value = baseValue;
  for (let i = count - 1; i >= 0; i--) {
    const ts = new Date(now - i * intervalMs).toISOString();
    const change = (Math.random() - 0.5) * volatility;
    value = parseFloat((value + change).toFixed(4));
    points.push({ timestamp: ts, value });
  }
  return points;
}

router.get("/rate/usd-cny", async (req, res): Promise<void> => {
  const rate = getSimulatedRate();
  const change24h = parseFloat(((Math.random() - 0.4) * 0.06).toFixed(4));
  const changePercent24h = parseFloat(((change24h / rate) * 100).toFixed(3));

  const response = GetExchangeRateResponse.parse({
    usdToCny: rate,
    cnyToUsd: parseFloat((1 / rate).toFixed(6)),
    change24h,
    changePercent24h,
    high24h: parseFloat((rate + 0.03).toFixed(4)),
    low24h: parseFloat((rate - 0.03).toFixed(4)),
    lastUpdated: new Date().toISOString(),
  });

  res.json(response);
});

router.get("/charts/currency", async (req, res): Promise<void> => {
  const parsed = GetCurrencyChartQueryParams.safeParse(req.query);
  const period = parsed.success ? (parsed.data.period ?? "7D") : "7D";

  const rate = getSimulatedRate();
  const points = generateChartPoints(period, rate, 0.025);
  const first = points[0]?.value ?? rate;
  const last = points[points.length - 1]?.value ?? rate;
  const change = parseFloat((last - first).toFixed(4));
  const changePercent = parseFloat(((change / first) * 100).toFixed(3));

  const response = GetCurrencyChartResponse.parse({
    period,
    points,
    change,
    changePercent,
  });

  res.json(response);
});

router.get("/currency/convert", async (req, res): Promise<void> => {
  const parsed = ConvertCurrencyQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { amount, from } = parsed.data;
  const rate = getSimulatedRate();
  const parsedAmount = typeof amount === "number" ? amount : parseFloat(String(amount));

  let result: number;
  let effectiveRate: number;
  let to: string;

  if (from === "USD") {
    effectiveRate = rate;
    to = "CNY";
    result = parseFloat((parsedAmount * effectiveRate).toFixed(4));
  } else {
    effectiveRate = parseFloat((1 / rate).toFixed(6));
    to = "USD";
    result = parseFloat((parsedAmount * effectiveRate).toFixed(4));
  }

  const response = ConvertCurrencyResponse.parse({
    from,
    to,
    amount: parsedAmount,
    result,
    rate: effectiveRate,
  });

  res.json(response);
});

export default router;
