export interface ParsedFilters {
    maxPrice?: number;
    minBedrooms?: number;
    area?: string;
    amenities?: string[];
}
export interface ParsedArea {
    area: string;
    maxPrice?: number;
}
export interface RecommendResult {
    query: string;
    parsedFilters: ParsedFilters;
    usedFallback: boolean;
    results: Record<string, unknown>[];
    total: number;
}
export interface PriceSummary {
    count: number;
    minPrice: number | null;
    avgPrice: number | null;
    maxPrice: number | null;
}
export interface AreaPriceResult {
    query: string;
    area: string;
    summary: PriceSummary;
    cheapest: Record<string, unknown>[];
    bestReviewed: Record<string, unknown>[];
    insight: string;
}
//# sourceMappingURL=ai.types.d.ts.map