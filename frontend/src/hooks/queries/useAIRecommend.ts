import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { recommendListings } from "../../api/ai.api";
import type {
  RecommendResult,
  AISortOption,
  AILocation,
} from "../../api/ai.api";

export function useAIRecommend() {
  const [data, setData] = useState<RecommendResult | null>(null);

  const mutation = useMutation({
    mutationFn: ({
      query,
      sort,
      location,
    }: {
      query: string;
      sort: AISortOption;
      location?: AILocation;
    }) => recommendListings(query, sort, location),
    onSuccess: (res) => setData(res),
  });

  const { mutate } = mutation;

  return {
    ...mutation,
    data,
    search: (
      query: string,
      sort: AISortOption = "relevance",
      location?: AILocation,
    ) => mutate({ query, sort, location }),
  };
}
