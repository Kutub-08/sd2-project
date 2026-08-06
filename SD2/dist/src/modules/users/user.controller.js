import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import * as userService from "./user.service.js";
export const getUser = asyncHandler(async (req, res) => {
    const user = await userService.getUser(req.params.id);
    success(res, user);
});
export const updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    success(res, user);
});
export const getUserListings = asyncHandler(async (req, res) => {
    const listings = await userService.getUserListings(req.params.id);
    success(res, listings);
});
//# sourceMappingURL=user.controller.js.map