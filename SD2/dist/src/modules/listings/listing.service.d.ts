import type { ListingFilters } from "./listing.filters.js";
export declare function create(landlordId: string, data: {
    title: string;
    description: string;
    price: number;
    sizeSqft: number;
    bedrooms: number;
    bathrooms: number;
    floorNumber?: number | null;
    address: string;
    area: string;
    city: string;
    latitude: number;
    longitude: number;
    amenities?: string[];
}): Promise<{
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
export declare function findAll(query: ListingFilters & {
    page: number;
    limit: number;
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
export declare function findById(id: string): Promise<{
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
export declare function update(id: string, userId: string, data: Record<string, unknown>): Promise<{
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
export declare function remove(id: string, userId: string): Promise<void>;
export declare function updateStatus(id: string, userId: string, status: "AVAILABLE" | "RENTED" | "INACTIVE"): Promise<{
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
export declare function findByLandlord(landlordId: string): Promise<({
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
//# sourceMappingURL=listing.service.d.ts.map