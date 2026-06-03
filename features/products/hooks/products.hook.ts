"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsByCategoryFetcher } from "@/features/products/fetchers/products.fetcher";

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ["products", "by-category", categoryId],
    queryFn: () => getProductsByCategoryFetcher(categoryId),
    enabled: !!categoryId,
  });
}
