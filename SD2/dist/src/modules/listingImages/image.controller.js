import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import { AppError } from "../../utils/AppError.js";
import { param } from "../../utils/param.js";
import * as imageService from "./image.service.js";
export const upload = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new AppError(400, "NO_FILE", "No image file provided");
    }
    const image = await imageService.upload(param(req, "id"), req.file);
    success(res, image, 201);
});
export const remove = asyncHandler(async (req, res) => {
    await imageService.remove(param(req, "id"), param(req, "imageId"));
    success(res, { message: "Image deleted successfully" });
});
//# sourceMappingURL=image.controller.js.map