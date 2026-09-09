import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authenticate, authorize } from "../../middleware/auth.js";
import { listingQuerySchema, updateStatusSchema } from "../listings/listing.schema.js";
import {
  adminUserQuerySchema,
  updateUserRoleSchema,
  updateUserBanSchema,
} from "./admin.schema.js";
import * as adminController from "./admin.controller.js";

const router = Router();

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: List all users (admin only)
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20, maximum: 100 }
 *       - in: query
 *         name: role
 *         schema: { type: string, enum: [TENANT, LANDLORD, ADMIN] }
 *     responses:
 *       200:
 *         description: Paginated user list (never exposes password_hash)
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Pagination'
 *                 - type: object
 *                   properties:
 *                     items: { type: array }
 *       401: { $ref: '#/components/schemas/Error' }
 *       403: { $ref: '#/components/schemas/Error' }
 */
router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  validate(adminUserQuerySchema, "query"),
  adminController.listUsers,
);

/**
 * @swagger
 * /admin/users/{id}/role:
 *   patch:
 *     summary: Change a user's role (admin only, cannot target self)
 *     tags: [Admin]
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
 *             required: [role]
 *             properties:
 *               role: { type: string, enum: [TENANT, LANDLORD, ADMIN] }
 *     responses:
 *       200: { description: Updated user }
 *       400: { description: Cannot modify own role }
 *       403: { $ref: '#/components/schemas/Error' }
 *       404: { $ref: '#/components/schemas/Error' }
 */
router.patch(
  "/users/:id/role",
  authenticate,
  authorize("ADMIN"),
  validate(updateUserRoleSchema),
  adminController.updateUserRole,
);

/**
 * @swagger
 * /admin/users/{id}/ban:
 *   patch:
 *     summary: Ban or unban a user (admin only, cannot target self)
 *     tags: [Admin]
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
 *             required: [banned]
 *             properties:
 *               banned: { type: boolean }
 *     responses:
 *       200: { description: Ban state updated }
 *       400: { description: Cannot ban self }
 *       403: { $ref: '#/components/schemas/Error' }
 *       404: { $ref: '#/components/schemas/Error' }
 */
router.patch(
  "/users/:id/ban",
  authenticate,
  authorize("ADMIN"),
  validate(updateUserBanSchema),
  adminController.updateUserBan,
);

/**
 * @swagger
 * /admin/listings:
 *   get:
 *     summary: List all listings incl. INACTIVE/RENTED (admin only)
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20, maximum: 100 }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *       - in: query
 *         name: bedrooms
 *         schema: { type: integer }
 *       - in: query
 *         name: bathrooms
 *         schema: { type: integer }
 *       - in: query
 *         name: area
 *         schema: { type: string }
 *       - in: query
 *         name: city
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [AVAILABLE, RENTED, INACTIVE] }
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [price_asc, price_desc, newest, oldest], default: newest }
 *     responses:
 *       200:
 *         description: Paginated listing results
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Pagination'
 *                 - type: object
 *                   properties:
 *                     items: { type: array, items: { $ref: '#/components/schemas/Listing' } }
 *       401: { $ref: '#/components/schemas/Error' }
 *       403: { $ref: '#/components/schemas/Error' }
 */
router.get(
  "/listings",
  authenticate,
  authorize("ADMIN"),
  validate(listingQuerySchema, "query"),
  adminController.listListings,
);

/**
 * @swagger
 * /admin/listings/{id}/status:
 *   patch:
 *     summary: Takedown or reinstate a listing (admin only)
 *     tags: [Admin]
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
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [AVAILABLE, RENTED, INACTIVE] }
 *     responses:
 *       200: { description: Status updated }
 *       403: { $ref: '#/components/schemas/Error' }
 *       404: { $ref: '#/components/schemas/Error' }
 */
router.patch(
  "/listings/:id/status",
  authenticate,
  authorize("ADMIN"),
  validate(updateStatusSchema),
  adminController.updateListingStatus,
);

export default router;