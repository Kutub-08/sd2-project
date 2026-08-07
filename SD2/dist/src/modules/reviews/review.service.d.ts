export declare function create(tenantId: string, listingId: string, rating: number, comment: string): Promise<{
    tenant: {
        id: string;
        name: string;
    };
} & {
    id: string;
    createdAt: Date;
    listingId: string;
    tenantId: string;
    rating: number;
    comment: string;
}>;
export declare function update(reviewId: string, userId: string, rating: number, comment: string): Promise<{
    tenant: {
        id: string;
        name: string;
    };
} & {
    id: string;
    createdAt: Date;
    listingId: string;
    tenantId: string;
    rating: number;
    comment: string;
}>;
export declare function remove(reviewId: string, userId: string): Promise<{
    id: string;
    createdAt: Date;
    listingId: string;
    tenantId: string;
    rating: number;
    comment: string;
}>;
export declare function findByListing(listingId: string): Promise<({
    tenant: {
        id: string;
        name: string;
    };
} & {
    id: string;
    createdAt: Date;
    listingId: string;
    tenantId: string;
    rating: number;
    comment: string;
})[]>;
//# sourceMappingURL=review.service.d.ts.map