export interface PaginationQuery {
    page: number;
    limit: number;
}
export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare function getPagination(page?: string | number | null, limit?: string | number | null, opts?: {
    defaultLimit?: number;
    maxLimit?: number;
}): PaginationQuery;
export declare function getSkipTake(page: number, limit: number): {
    skip: number;
    take: number;
};
export declare function getPaginationMeta(total: number, page: number, limit: number): PaginationMeta;
//# sourceMappingURL=pagination.d.ts.map