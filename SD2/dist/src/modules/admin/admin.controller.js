import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import { param } from "../../utils/param.js";
import { getPagination } from "../../utils/pagination.js";
import * as adminService from "./admin.service.js";
export const listUsers = asyncHandler(async (req, res) => {
    const { page, limit, role } = req.query;
    const result = await adminService.listUsers({
        ...getPagination(page, limit),
        role: role,
    });
    success(res, result);
});
export const updateUserRole = asyncHandler(async (req, res) => {
    const result = await adminService.updateUserRole(param(req, "id"), req.user.id, req.body.role);
    success(res, result);
});
export const updateUserBan = asyncHandler(async (req, res) => {
    const result = await adminService.updateUserBan(param(req, "id"), req.user.id, req.body.banned);
    success(res, result);
});
export const listListings = asyncHandler(async (req, res) => {
    const { page, limit, minPrice, maxPrice, bedrooms, bathrooms, area, city, status, sort } = req.query;
    const result = await adminService.listListings({
        ...getPagination(page, limit),
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        bathrooms: bathrooms ? Number(bathrooms) : undefined,
        area,
        city,
        status: status,
        sort: sort || "newest",
    });
    success(res, result);
});
export const updateListingStatus = asyncHandler(async (req, res) => {
    const result = await adminService.updateListingStatus(param(req, "id"), req.body.status);
    success(res, result);
});
//# sourceMappingURL=admin.controller.js.map