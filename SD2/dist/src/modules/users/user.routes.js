import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authenticate } from "../../middleware/auth.js";
import { isSelf } from "../../middleware/isSelf.js";
import { updateUserSchema } from "./user.schema.js";
import * as userController from "./user.controller.js";
const router = Router();
router.get("/:id", userController.getUser);
router.patch("/:id", authenticate, isSelf, validate(updateUserSchema), userController.updateUser);
router.get("/:id/listings", userController.getUserListings);
export default router;
//# sourceMappingURL=user.routes.js.map