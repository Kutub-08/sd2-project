export declare function create(tenantId: string, listingId: string, message: string): Promise<{
    listing: {
        id: string;
        title: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        area: string;
        city: string;
    };
    tenant: {
        id: string;
        email: string;
        name: string;
        phone: string;
    };
} & {
    id: string;
    createdAt: Date;
    message: string;
    status: import("../../../generated/prisma/enums.js").InquiryStatus;
    listingId: string;
    tenantId: string;
}>;
export declare function findSent(tenantId: string, page: number, limit: number): Promise<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    items: ({
        listing: {
            id: string;
            title: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            area: string;
            city: string;
        };
        tenant: {
            id: string;
            email: string;
            name: string;
            phone: string;
        };
    } & {
        id: string;
        createdAt: Date;
        message: string;
        status: import("../../../generated/prisma/enums.js").InquiryStatus;
        listingId: string;
        tenantId: string;
    })[];
}>;
export declare function findReceived(landlordId: string, page: number, limit: number): Promise<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    items: ({
        listing: {
            id: string;
            title: string;
            landlordId: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            area: string;
            city: string;
        };
        tenant: {
            id: string;
            email: string;
            name: string;
            phone: string;
        };
    } & {
        id: string;
        createdAt: Date;
        message: string;
        status: import("../../../generated/prisma/enums.js").InquiryStatus;
        listingId: string;
        tenantId: string;
    })[];
}>;
export declare function updateStatus(inquiryId: string, landlordId: string, status: "PENDING" | "RESPONDED" | "CLOSED"): Promise<{
    listing: {
        id: string;
        title: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        area: string;
        city: string;
    };
    tenant: {
        id: string;
        email: string;
        name: string;
        phone: string;
    };
} & {
    id: string;
    createdAt: Date;
    message: string;
    status: import("../../../generated/prisma/enums.js").InquiryStatus;
    listingId: string;
    tenantId: string;
}>;
//# sourceMappingURL=inquiry.service.d.ts.map