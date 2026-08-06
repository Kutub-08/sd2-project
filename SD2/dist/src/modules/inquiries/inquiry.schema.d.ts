import { z } from "zod";
export declare const createInquirySchema: z.ZodObject<{
    listingId: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
export declare const inquiryQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        PENDING: "PENDING";
        RESPONDED: "RESPONDED";
        CLOSED: "CLOSED";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=inquiry.schema.d.ts.map