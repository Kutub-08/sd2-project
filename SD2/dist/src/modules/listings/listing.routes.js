import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { authenticate, authorize } from "../../middleware/auth.js";
import { isOwner } from "../../middleware/isOwner.js";
import { createListingSchema, updateListingSchema, listingQuerySchema, updateStatusSchema, } from "./listing.schema.js";
import * as listingController from "./listing.controller.js";
const router = Router();
router.get("/landlord/:landlordId", listingController.findByLandlord);
router.get("/", validate(listingQuerySchema, "query"), listingController.findAll);
router.post("/", authenticate, authorize("LANDLORD"), validate(createListingSchema), listingController.create);
router.get("/:id", listingController.findById);
router.put("/:id", authenticate, authorize("LANDLORD"), isOwner, validate(updateListingSchema), listingController.update);
router.delete("/:id", authenticate, authorize("LANDLORD"), isOwner, listingController.remove);
router.patch("/:id/status", authenticate, authorize("LANDLORD"), validate(updateStatusSchema), listingController.updateStatus);
export default router;
//# sourceMappingURL=listing.routes.js.map