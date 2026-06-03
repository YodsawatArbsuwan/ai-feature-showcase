"use client";

import { useMutation } from "@tanstack/react-query";
import { createContactFetcher } from "@/features/contact/fetchers/contact.fetcher";
import type { CreateContactDto } from "@/generated/api/types.gen";

export function useCreateContact() {
  return useMutation({
    mutationFn: (data: CreateContactDto) => createContactFetcher(data),
  });
}
