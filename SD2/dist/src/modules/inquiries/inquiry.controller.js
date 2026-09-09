import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import { param } from "../../utils/param.js";
import { getPagination } from "../../utils/pagination.js";
import * as inquiryService from "./inquiry.service.js";
export const create = asyncHandler(async (req, res) => {
    const { listingId, message } = req.body;
    const inquiry = await inquiryService.create(req.user.id, listingId, message);
    success(res, inquiry, 201);
});
export const findSent = asyncHandler(async (req, res) => {
    const { page, limit } = getPagination(req.query.page, req.query.limit);
    const result = await inquiryService.findSent(req.user.id, page, limit);
    success(res, result);
});
export const findReceived = asyncHandler(async (req, res) => {
    const { page, limit } = getPagination(req.query.page, req.query.limit);
    const result = await inquiryService.findReceived(req.user.id, page, limit);
    success(res, result);
});
export const updateStatus = asyncHandler(async (req, res) => {
    const inquiry = await inquiryService.updateStatus(param(req, "id"), req.user.id, req.body.status);
    success(res, inquiry);
});
//# sourceMappingURL=inquiry.controller.js.map