export interface ParsedFilters {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  area?: string;
  amenities?: string[];
}

export type SortOption =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "highest_rated"
  | "most_reviewed"
  | "nearest";

export interface RecommendLocation {
  lat: number;
  lng: number;
}

export interface RecommendResult {
  query: string;
  parsedFilters: ParsedFilters;
  usedFallback: boolean;
  sort: SortOption;
  results: Record<string, unknown>[];
  total: number;
}
