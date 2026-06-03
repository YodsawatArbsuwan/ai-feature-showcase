import "@/lib/api/client";
import { contactControllerCreate } from "@/generated/api/sdk.gen";
import type { CreateContactDto, ContactDto } from "@/generated/api/types.gen";

export async function createContactFetcher(data: CreateContactDto): Promise<ContactDto> {
  const response = await contactControllerCreate({ body: data, throwOnError: true });
  if (!response.data) throw new Error("Failed to submit contact");
  return response.data;
}
