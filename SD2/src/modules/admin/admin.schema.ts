import { z } from "zod";

export const adminUserQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  role: z.enum(["TENANT", "LANDLORD", "ADMIN"]).optional(),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(["TENANT", "LANDLORD", "ADMIN"]),
});

export const updateUserBanSchema = z.object({
  banned: z.boolean(),
});