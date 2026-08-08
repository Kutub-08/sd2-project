import { z } from "zod";
export declare const recommendSchema: z.ZodObject<{
    query: z.ZodString;
    sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        price_asc: "price_asc";
        price_desc: "price_desc";
        relevance: "relevance";
        highest_rated: "highest_rated";
        most_reviewed: "most_reviewed";
        nearest: "nearest";
    }>>>;
    location: z.ZodOptional<z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=ai.schema.d.ts.map