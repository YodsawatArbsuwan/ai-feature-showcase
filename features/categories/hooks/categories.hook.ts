"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoriesFetcher } from "@/features/categories/fetchers/categories.fetcher";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesFetcher,
  });
}
