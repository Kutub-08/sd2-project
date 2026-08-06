import { z } from "zod";
export declare const createListingSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    sizeSqft: z.ZodNumber;
    bedrooms: z.ZodNumber;
    bathrooms: z.ZodNumber;
    floorNumber: z.ZodOptional<z.ZodNumber>;
    address: z.ZodString;
    area: z.ZodString;
    city: z.ZodString;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
    amenities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export declare const updateListingSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    sizeSqft: z.ZodOptional<z.ZodNumber>;
    bedrooms: z.ZodOptional<z.ZodNumber>;
    bathrooms: z.ZodOptional<z.ZodNumber>;
    floorNumber: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    address: z.ZodOptional<z.ZodString>;
    area: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
}, z.core.$strip>;
export declare const listingQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    minPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    maxPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    bedrooms: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    bathrooms: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    area: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        AVAILABLE: "AVAILABLE";
        RENTED: "RENTED";
        INACTIVE: "INACTIVE";
    }>>;
    sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        price_asc: "price_asc";
        price_desc: "price_desc";
        newest: "newest";
        oldest: "oldest";
    }>>>;
}, z.core.$strip>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        AVAILABLE: "AVAILABLE";
        RENTED: "RENTED";
        INACTIVE: "INACTIVE";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=listing.schema.d.ts.map