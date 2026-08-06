import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import { param } from "../../utils/param.js";
import * as listingService from "./listing.service.js";
export const create = asyncHandler(async (req, res) => {
    const listing = await listingService.create(req.user.id, req.body);
    success(res, listing, 201);
});
export const findAll = asyncHandler(async (req, res) => {
    const { page, limit, minPrice, maxPrice, bedrooms, bathrooms, area, city, status, sort } = req.query;
    const result = await listingService.findAll({
        page: Number(page) || 1,
        limit: Math.min(Number(limit) || 20, 100),
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
export const findById = asyncHandler(async (req, res) => {
    const listing = await listingService.findById(param(req, "id"));
    success(res, listing);
});
export const update = asyncHandler(async (req, res) => {
    const listing = await listingService.update(param(req, "id"), req.user.id, req.body);
    success(res, listing);
});
export const remove = asyncHandler(async (req, res) => {
    await listingService.remove(param(req, "id"), req.user.id);
    success(res, { message: "Listing deleted successfully" });
});
export const updateStatus = asyncHandler(async (req, res) => {
    const listing = await listingService.updateStatus(param(req, "id"), req.user.id, req.body.status);
    success(res, listing);
});
export const findByLandlord = asyncHandler(async (req, res) => {
    const listings = await listingService.findByLandlord(param(req, "landlordId"));
    success(res, listings);
});
//# sourceMappingURL=listing.controller.js.map