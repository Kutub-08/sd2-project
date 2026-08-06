import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authenticate, authorize } from "../../middleware/auth.js";
import { createReviewSchema } from "./review.schema.js";
import * as reviewController from "./review.controller.js";
const router = Router();
router.post("/", authenticate, authorize("TENANT"), validate(createReviewSchema), reviewController.create);
router.get("/listing/:listingId", reviewController.findByListing);
export default router;
//# sourceMappingURL=review.routes.js.map