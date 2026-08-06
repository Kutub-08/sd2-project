export declare function create(userId: string, listingId: string): Promise<{
    listing: {
        landlord: {
            id: string;
            name: string;
            email: string;
            phone: string;
        };
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
    };
} & {
    id: string;
    userId: string;
    createdAt: Date;
    listingId: string;
}>;
export declare function findAll(userId: string, page: number, limit: number): Promise<{
    items: ({
        listing: {
            landlord: {
                id: string;
                name: string;
                email: string;
                phone: string;
            };
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
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        listingId: string;
    })[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function remove(userId: string, id: string): Promise<void>;
//# sourceMappingURL=favorite.service.d.ts.map