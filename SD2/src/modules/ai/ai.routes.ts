import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { aiLimiter } from "../../middleware/rateLimiter.js";
import { priceSchema, recommendSchema } from "./ai.schema.js";
import * as aiController from "./ai.controller.js";

const router = Router();

/**
 * @swagger
 * /ai/recommend:
 *   post:
 *     summary: AI-powered listing recommendation from natural language query
 *     tags: [AI]
 *     rateLimit: 10/min
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [query]
 *             properties:
 *               query: { type: string, minLength: 3, example: "2 bed flat under 15000 in Panchlaish" }
 *     responses:
 *       200:
 *         description: Recommended listings with parsed filters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 query: { type: string }
 *                 parsedFilters: { type: object }
 *                 usedFallback: { type: boolean }
 *                 results: { type: array }
 *                 total: { type: integer }
 *       429: { $ref: '#/components/schemas/Error' }
 */
router.post("/recommend", aiLimiter, validate(recommendSchema), aiController.recommend);

/**
 * @swagger
 * /ai/price:
 *   post:
 *     summary: AI-powered current rent prices for an area (min/avg/max + cheapest + best-reviewed flats)
 *     tags: [AI]
 *     rateLimit: 10/min
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [query]
 *             properties:
 *               query: { type: string, minLength: 2, example: "flats in Khulshi under 18000" }
 *     responses:
 *       200:
 *         description: Price summary, cheapest and best-reviewed listings for the area
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 query: { type: string }
 *                 area: { type: string }
 *                 summary: { type: object }
 *                 cheapest: { type: array }
 *                 bestReviewed: { type: array }
 *                 insight: { type: string }
 *       429: { $ref: '#/components/schemas/Error' }
 */
router.post("/price", aiLimiter, validate(priceSchema), aiController.areaPrice);

/**
 * @swagger
 * /ai/similar/{listingId}:
 *   get:
 *     summary: Find similar listings by price range, area, and bedrooms
 *     tags: [AI]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Array of similar listings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Listing' }
 *       404: { $ref: '#/components/schemas/Error' }
 */
router.get("/similar/:listingId", aiController.findSimilar);

export default router;
