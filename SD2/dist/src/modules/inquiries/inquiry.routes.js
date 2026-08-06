import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authenticate, authorize } from "../../middleware/auth.js";
import { inquiryLimiter } from "../../middleware/rateLimiter.js";
import { createInquirySchema, inquiryQuerySchema, updateStatusSchema } from "./inquiry.schema.js";
import * as inquiryController from "./inquiry.controller.js";
const router = Router();
router.post("/", inquiryLimiter, authenticate, authorize("TENANT"), validate(createInquirySchema), inquiryController.create);
router.get("/sent", authenticate, authorize("TENANT"), validate(inquiryQuerySchema, "query"), inquiryController.findSent);
router.get("/received", authenticate, authorize("LANDLORD"), validate(inquiryQuerySchema, "query"), inquiryController.findReceived);
router.patch("/:id/status", authenticate, authorize("LANDLORD"), validate(updateStatusSchema), inquiryController.updateStatus);
export default router;
//# sourceMappingURL=inquiry.routes.js.map