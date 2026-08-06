import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.js";
import { isOwner } from "../../middleware/isOwner.js";
import { upload as uploadMiddleware } from "../../middleware/upload.js";
import * as imageController from "./image.controller.js";
const router = Router();
router.post("/:id/images", authenticate, authorize("LANDLORD"), isOwner, uploadMiddleware.single("image"), imageController.upload);
router.delete("/:id/images/:imageId", authenticate, authorize("LANDLORD"), isOwner, imageController.remove);
export default router;
//# sourceMappingURL=image.routes.js.map