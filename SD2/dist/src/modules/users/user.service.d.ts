import type { UserProfile } from "./user.types.js";
export declare function getUser(id: string): Promise<UserProfile>;
export declare function updateUser(id: string, data: {
    name?: string;
    phone?: string;
}): Promise<{
    id: string;
    name: string;
    email: string;
    phone: string;
    role: import("../../../generated/prisma/enums.js").UserRole;
    createdAt: Date;
}>;
export declare function getUserListings(userId: string): Promise<({
    images: {
        id: string;
        imageUrl: string;
        isPrimary: boolean;
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
//# sourceMappingURL=user.service.d.ts.map