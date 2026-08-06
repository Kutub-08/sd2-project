export declare function fallbackSearch(query: string): Promise<({
    landlord: {
        id: string;
        name: string;
        email: string;
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
    latitude: import("@prisma/client-runtime-utils").Decimal;
    longitude: import("@prisma/client-runtime-utils").Decimal;
    amenities: string[];
    status: import("../../../generated/prisma/enums.js").ListingStatus;
})[]>;
//# sourceMappingURL=fallbackSearch.d.ts.map