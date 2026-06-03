import "@/lib/api/client";
import { productControllerFindByCategoryId } from "@/generated/api/sdk.gen";
import type { ProductDto } from "@/generated/api/types.gen";

export async function getProductsByCategoryFetcher(categoryId: string): Promise<ProductDto[]> {
  const response = await productControllerFindByCategoryId({
    path: { categoryId },
    throwOnError: true,
  });
  if (!response.data) throw new Error("Failed to fetch products");
  return response.data;
}
