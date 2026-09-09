import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authenticate, authorize } from "../../middleware/auth.js";
import { listingQuerySchema, updateStatusSchema } from "../listings/listing.schema.js";
import { adminUserQuerySchema, updateUserRoleSchema, updateUserBanSchema, } from "./admin.schema.js";
import * as adminController from "./admin.controller.js";
const router = Router();
router.get("/users", authenticate, authorize("ADMIN"), validate(adminUserQuerySchema, "query"), adminController.listUsers);
router.patch("/users/:id/role", authenticate, authorize("ADMIN"), validate(updateUserRoleSchema), adminController.updateUserRole);
router.patch("/users/:id/ban", authenticate, authorize("ADMIN"), validate(updateUserBanSchema), adminController.updateUserBan);
router.get("/listings", authenticate, authorize("ADMIN"), validate(listingQuerySchema, "query"), adminController.listListings);
router.patch("/listings/:id/status", authenticate, authorize("ADMIN"), validate(updateStatusSchema), adminController.updateListingStatus);
export default router;
//# sourceMappingURL=admin.routes.js.map