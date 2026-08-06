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
        name: string;
        email: string;
        phone: string;
    };
} & {
    id: string;
    message: string;
    createdAt: Date;
    status: import("../../../generated/prisma/enums.js").InquiryStatus;
    listingId: string;
    tenantId: string;
}>;
export declare function findSent(tenantId: string, page: number, limit: number): Promise<{
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
            name: string;
            email: string;
            phone: string;
        };
    } & {
        id: string;
        message: string;
        createdAt: Date;
        status: import("../../../generated/prisma/enums.js").InquiryStatus;
        listingId: string;
        tenantId: string;
    })[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function findReceived(landlordId: string, page: number, limit: number): Promise<{
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
            name: string;
            email: string;
            phone: string;
        };
    } & {
        id: string;
        message: string;
        createdAt: Date;
        status: import("../../../generated/prisma/enums.js").InquiryStatus;
        listingId: string;
        tenantId: string;
    })[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
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
        name: string;
        email: string;
        phone: string;
    };
} & {
    id: string;
    message: string;
    createdAt: Date;
    status: import("../../../generated/prisma/enums.js").InquiryStatus;
    listingId: string;
    tenantId: string;
}>;
//# sourceMappingURL=inquiry.service.d.ts.map