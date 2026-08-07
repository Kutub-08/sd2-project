import { z } from "zod";
export declare const createReviewSchema: z.ZodObject<{
    listingId: z.ZodString;
    rating: z.ZodNumber;
    comment: z.ZodString;
}, z.core.$strip>;
export declare const updateReviewSchema: z.ZodObject<{
    rating: z.ZodNumber;
    comment: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=review.schema.d.ts.map