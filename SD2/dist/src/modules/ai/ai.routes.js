import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { aiLimiter } from "../../middleware/rateLimiter.js";
import { recommendSchema } from "./ai.schema.js";
import * as aiController from "./ai.controller.js";
const router = Router();
router.post("/recommend", aiLimiter, validate(recommendSchema), aiController.recommend);
router.get("/similar/:listingId", aiController.findSimilar);
export default router;
//# sourceMappingURL=ai.routes.js.map