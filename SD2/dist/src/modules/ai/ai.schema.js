import { z } from "zod";
export const recommendSchema = z.object({
    query: z.string().min(3, "Query must be at least 3 characters").max(500, "Query too long"),
    sort: z
        .enum(["relevance", "price_asc", "price_desc", "highest_rated", "most_reviewed", "nearest"])
        .optional()
        .default("relevance"),
    location: z
        .object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
    })
        .optional(),
});
//# sourceMappingURL=ai.schema.js.map