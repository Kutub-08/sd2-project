import { z } from "zod";
export const recommendSchema = z.object({
    query: z.string().min(3, "Query must be at least 3 characters").max(500, "Query too long"),
});
export const priceSchema = z.object({
    query: z.string().min(2, "Query must be at least 2 characters").max(500, "Query too long"),
});
//# sourceMappingURL=ai.schema.js.map