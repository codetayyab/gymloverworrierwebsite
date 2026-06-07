import { Router, type IRouter } from "express";
import healthRouter from "./health";
import currencyRouter from "./currency";
import assetsRouter from "./assets";
import comparisonRouter from "./comparison";
import marketsRouter from "./markets";
import summaryRouter from "./summary";
import newsRouter from "./news";
import marketBriefRouter from "./marketBrief";

const router: IRouter = Router();

router.use(healthRouter);
router.use(currencyRouter);
router.use(assetsRouter);
router.use(comparisonRouter);
router.use(marketsRouter);
router.use(summaryRouter);
router.use(newsRouter);
router.use(marketBriefRouter);

export default router;
