import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authenticate } from "../../middleware/auth.js";
import { createReviewSchema, updateReviewSchema } from "./review.schema.js";
import * as reviewController from "./review.controller.js";

const router = Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a review for a listing (authenticated users; cannot review own listing)
 *     tags: [Reviews]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [listingId, rating, comment]
 *             properties:
 *               listingId: { type: string, format: uuid }
 *               rating: { type: integer, minimum: 1, maximum: 5 }
 *               comment: { type: string, minLength: 5, maxLength: 1000 }
 *     responses:
 *       201: { description: Review created }
 *       400: { $ref: '#/components/schemas/Error' }
 *       403: { description: Cannot review own listing }
 *       409: { description: Already reviewed this listing }
 */
router.post("/", authenticate, validate(createReviewSchema), reviewController.create);

/**
 * @swagger
 * /reviews/listing/{listingId}:
 *   get:
 *     summary: Get all reviews for a listing
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Array of reviews with tenant name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   rating: { type: integer }
 *                   comment: { type: string }
 *                   tenant: { type: object, properties: { id: { type: string }, name: { type: string } } }
 *       404: { $ref: '#/components/schemas/Error' }
 */
router.get("/listing/:listingId", reviewController.findByListing);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update your own review (owner only)
 *     tags: [Reviews]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating, comment]
 *             properties:
 *               rating: { type: integer, minimum: 1, maximum: 5 }
 *               comment: { type: string, minLength: 5, maxLength: 1000 }
 *     responses:
 *       200: { description: Review updated }
 *       403: { $ref: '#/components/schemas/Error' }
 *       404: { $ref: '#/components/schemas/Error' }
 */
router.put("/:id", authenticate, validate(updateReviewSchema), reviewController.update);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete your own review (owner only)
 *     tags: [Reviews]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Review deleted }
 *       403: { $ref: '#/components/schemas/Error' }
 *       404: { $ref: '#/components/schemas/Error' }
 */
router.delete("/:id", authenticate, reviewController.remove);

export default router;
