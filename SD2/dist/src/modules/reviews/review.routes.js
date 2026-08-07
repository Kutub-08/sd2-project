import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authenticate } from "../../middleware/auth.js";
import { createReviewSchema, updateReviewSchema } from "./review.schema.js";
import * as reviewController from "./review.controller.js";
const router = Router();
router.post("/", authenticate, validate(createReviewSchema), reviewController.create);
router.get("/listing/:listingId", reviewController.findByListing);
router.put("/:id", authenticate, validate(updateReviewSchema), reviewController.update);
router.delete("/:id", authenticate, reviewController.remove);
export default router;
//# sourceMappingURL=review.routes.js.map