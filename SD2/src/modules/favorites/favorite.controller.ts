import { type Request, type Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import { param } from "../../utils/param.js";
import { getPagination } from "../../utils/pagination.js";
import * as favoriteService from "./favorite.service.js";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { listingId } = req.body;
  const favorite = await favoriteService.create(req.user!.id, listingId);
  success(res, favorite, 201);
});

export const findAll = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(
    req.query.page as string | undefined,
    req.query.limit as string | undefined,
  );
  const result = await favoriteService.findAll(req.user!.id, page, limit);
  success(res, result);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await favoriteService.remove(req.user!.id, param(req, "id"));
  success(res, { message: "Favorite removed successfully" });
});
