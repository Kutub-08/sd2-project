import type { RecommendResult, SortOption, RecommendLocation } from "./ai.types.js";
export declare function recommend(query: string, userId?: string | null, sort?: SortOption, location?: RecommendLocation): Promise<RecommendResult>;
export declare function findSimilar(listingId: string): Promise<({
    landlord: {
        id: string;
        email: string;
        name: string;
        phone: string;
    };
    images: {
        id: string;
        listingId: string;
        imageUrl: string;
        isPrimary: boolean;
        orderIndex: number;
    }[];
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    landlordId: string;
    price: import("@prisma/client-runtime-utils").Decimal;
    sizeSqft: import("@prisma/client-runtime-utils").Decimal;
    bedrooms: number;
    bathrooms: number;
    floorNumber: number | null;
    address: string;
    area: string;
    city: string;
    latitude: import("@prisma/client-runtime-utils").Decimal | null;
    longitude: import("@prisma/client-runtime-utils").Decimal | null;
    amenities: string[];
    status: import("../../../generated/prisma/enums.js").ListingStatus;
})[]>;
//# sourceMappingURL=ai.service.d.ts.map