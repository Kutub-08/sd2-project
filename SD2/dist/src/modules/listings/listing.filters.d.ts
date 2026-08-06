export interface ListingFilters {
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    area?: string;
    city?: string;
    status?: "AVAILABLE" | "RENTED" | "INACTIVE";
    sort: string;
}
export declare function buildWhereClause(filters: ListingFilters): Record<string, unknown>;
export declare function buildOrderBy(sort: string): Record<string, string>;
//# sourceMappingURL=listing.filters.d.ts.map