import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import { param } from "../../utils/param.js";
import * as aiService from "./ai.service.js";
export const recommend = asyncHandler(async (req, res) => {
    const { query } = req.body;
    const result = await aiService.recommend(query);
    success(res, result);
});
export const findSimilar = asyncHandler(async (req, res) => {
    const listings = await aiService.findSimilar(param(req, "listingId"));
    success(res, listings);
});
//# sourceMappingURL=ai.controller.js.map