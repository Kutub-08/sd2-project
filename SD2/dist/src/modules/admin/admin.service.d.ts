export declare function listUsers(query: {
    page: number;
    limit: number;
    role?: "TENANT" | "LANDLORD" | "ADMIN";
}): Promise<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    items: {
        id: string;
        email: string;
        name: string;
        phone: string;
        role: import("../../../generated/prisma/enums.js").UserRole;
        isVerified: boolean;
        isBanned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
}>;
export declare function updateUserRole(userId: string, actorId: string, role: "TENANT" | "LANDLORD" | "ADMIN"): Promise<{
    id: string;
    email: string;
    name: string;
    phone: string;
    role: import("../../../generated/prisma/enums.js").UserRole;
    isVerified: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateUserBan(userId: string, actorId: string, banned: boolean): Promise<{
    id: string;
    email: string;
    name: string;
    phone: string;
    role: import("../../../generated/prisma/enums.js").UserRole;
    isVerified: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function listListings(query: {
    page: number;
    limit: number;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    area?: string;
    city?: string;
    status?: "AVAILABLE" | "RENTED" | "INACTIVE";
    sort: string;
}): Promise<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    items: ({
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
    })[];
}>;
export declare function updateListingStatus(listingId: string, status: "AVAILABLE" | "RENTED" | "INACTIVE"): Promise<{
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
}>;
//# sourceMappingURL=admin.service.d.ts.map