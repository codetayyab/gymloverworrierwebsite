import { Router, type IRouter } from "express";
import OpenAI from "openai";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BRIEF_CACHE_TTL = 5 * 60 * 1000;
let cachedBrief: { text: string; generatedAt: string } | null = null;
let cacheExpiry = 0;

function buildPrompt(): string {
  const now = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  return `You are a senior financial markets analyst writing a concise real-time market brief for a Bloomberg-style dashboard comparing US and Chinese financial markets.

Today's date/time: ${now} ET

Current indicative data:
- USD/CNY rate: ~7.35
- S&P 500: ~5,487 pts
- Shanghai Composite: ~3,128 pts
- USD Strength Index (DXY): ~104.2
- CNY Strength Index: ~97.1
- US GDP growth: 2.5% | China GDP growth: 5.2%
- US Inflation: 3.2% | China Inflation: 0.3%
- China trade surplus: $823B | US trade deficit: $773B
- US Tech Market Cap: $14.8T | China Tech Market Cap: $3.2T
- US Manufacturing PMI: 52.3 | China PMI: 49.7

Write a punchy, data-driven market brief of exactly 3 sentences (max 60 words total). Format:
- Sentence 1: Currency & equity snapshot comparing both nations today
- Sentence 2: The single biggest macro divergence between the two economies right now
- Sentence 3: One forward-looking signal investors should watch

Tone: authoritative, precise, Bloomberg-style. No preamble. No bullet points. Just 3 sentences.`;
}

router.get("/market-brief", async (req, res): Promise<void> => {
  const now = Date.now();
  if (cachedBrief && now < cacheExpiry) {
    res.json(cachedBrief);
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 120,
      messages: [
        { role: "system", content: "You are a concise financial markets analyst. Respond with exactly 3 sentences, no more." },
        { role: "user", content: buildPrompt() },
      ],
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "Market data is being processed. USD/CNY holds near 7.35 as both equity benchmarks trade mixed. Monitor Fed commentary and PBOC daily fixing for near-term directional signals.";

    cachedBrief = {
      text,
      generatedAt: new Date().toISOString(),
    };
    cacheExpiry = now + BRIEF_CACHE_TTL;

    res.json(cachedBrief);
  } catch (err) {
    logger.error({ err }, "Failed to generate market brief");
    res.json({
      text: "USD/CNY holds near 7.35 as S&P 500 outperforms the Shanghai Composite in absolute terms. The key macro divergence remains GDP growth velocity: China at 5.2% vs US at 2.5%, offset by US dominance in tech market capitalization at $14.8T. Watch the PBOC daily fixing rate and Fed minutes for the next directional catalyst.",
      generatedAt: new Date().toISOString(),
    });
  }
});

export default router;
