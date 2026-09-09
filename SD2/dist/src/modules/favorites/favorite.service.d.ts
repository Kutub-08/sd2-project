export declare function create(userId: string, listingId: string): Promise<{
    listing: {
        landlord: {
            id: string;
            email: string;
            name: string;
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
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
        amenities: string[];
        status: import("../../../generated/prisma/enums.js").ListingStatus;
    };
} & {
    id: string;
    createdAt: Date;
    userId: string;
    listingId: string;
}>;
export declare function findAll(userId: string, page: number, limit: number): Promise<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    items: ({
        listing: {
            landlord: {
                id: string;
                email: string;
                name: string;
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
            latitude: import("@prisma/client-runtime-utils").Decimal | null;
            longitude: import("@prisma/client-runtime-utils").Decimal | null;
            amenities: string[];
            status: import("../../../generated/prisma/enums.js").ListingStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        listingId: string;
    })[];
}>;
export declare function remove(userId: string, id: string): Promise<void>;
//# sourceMappingURL=favorite.service.d.ts.map