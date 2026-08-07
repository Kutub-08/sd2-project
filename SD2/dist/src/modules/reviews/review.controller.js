import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import { param } from "../../utils/param.js";
import * as reviewService from "./review.service.js";
export const create = asyncHandler(async (req, res) => {
    const { listingId, rating, comment } = req.body;
    const review = await reviewService.create(req.user.id, listingId, rating, comment);
    success(res, review, 201);
});
export const findByListing = asyncHandler(async (req, res) => {
    const reviews = await reviewService.findByListing(param(req, "listingId"));
    success(res, reviews);
});
export const update = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const review = await reviewService.update(param(req, "id"), req.user.id, rating, comment);
    success(res, review);
});
export const remove = asyncHandler(async (req, res) => {
    await reviewService.remove(param(req, "id"), req.user.id);
    success(res, { message: "Review deleted" });
});
//# sourceMappingURL=review.controller.js.map