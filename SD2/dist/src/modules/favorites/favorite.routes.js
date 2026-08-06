import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authenticate, authorize } from "../../middleware/auth.js";
import { createFavoriteSchema, favoriteQuerySchema } from "./favorite.schema.js";
import * as favoriteController from "./favorite.controller.js";
const router = Router();
router.post("/", authenticate, authorize("TENANT"), validate(createFavoriteSchema), favoriteController.create);
router.get("/", authenticate, authorize("TENANT"), validate(favoriteQuerySchema, "query"), favoriteController.findAll);
router.delete("/:id", authenticate, authorize("TENANT"), favoriteController.remove);
export default router;
//# sourceMappingURL=favorite.routes.js.map