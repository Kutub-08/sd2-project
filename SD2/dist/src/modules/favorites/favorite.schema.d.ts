import { z } from "zod";
export declare const createFavoriteSchema: z.ZodObject<{
    listingId: z.ZodString;
}, z.core.$strip>;
export declare const favoriteQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
//# sourceMappingURL=favorite.schema.d.ts.map