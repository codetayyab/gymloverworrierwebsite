import { Router, type IRouter } from "express";
import {
  GetMarketsChartQueryParams,
  GetMarketsChartResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function generateMarketsPoints(
  period: string
): Array<{ timestamp: string; usa: number; china: number }> {
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

  const points: Array<{ timestamp: string; usa: number; china: number }> = [];
  let usaVal = 5420;
  let chinaVal = 3100;

  for (let i = count - 1; i >= 0; i--) {
    const ts = new Date(now - i * intervalMs).toISOString();
    usaVal = parseFloat((usaVal + (Math.random() - 0.47) * 18).toFixed(2));
    chinaVal = parseFloat((chinaVal + (Math.random() - 0.48) * 12).toFixed(2));
    points.push({ timestamp: ts, usa: usaVal, china: chinaVal });
  }

  return points;
}

router.get("/charts/markets", async (req, res): Promise<void> => {
  const parsed = GetMarketsChartQueryParams.safeParse(req.query);
  const period = parsed.success ? (parsed.data.period ?? "7D") : "7D";

  const points = generateMarketsPoints(period);

  const response = GetMarketsChartResponse.parse({
    period,
    points,
  });

  res.json(response);
});

export default router;
