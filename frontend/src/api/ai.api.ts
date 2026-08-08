import axiosClient from "./axiosClient";
import type { ApiSuccess } from "../types/api.types";
import type { Listing } from "../types/listing.types";

export type AISortOption =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "highest_rated"
  | "most_reviewed"
  | "nearest";

export type AILocation = {
  lat: number;
  lng: number;
};

export type RecommendResult = {
  query: string;
  parsedFilters: {
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    area?: string;
    amenities?: string[];
  };
  usedFallback: boolean;
  sort: AISortOption;
  results: Listing[];
  total: number;
};

export async function recommendListings(
  query: string,
  sort: AISortOption = "relevance",
  location?: AILocation,
) {
  const res = await axiosClient.post<ApiSuccess<RecommendResult>>(
    "/ai/recommend",
    {
      query,
      sort,
      ...(location ? { location } : {}),
    },
  );
  return res.data.data;
}
