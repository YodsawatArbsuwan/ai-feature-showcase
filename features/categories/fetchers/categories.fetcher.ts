import "@/lib/api/client";
import { projectCategoryControllerFindAll } from "@/generated/api/sdk.gen";
import type { ProjectCategoryDto } from "@/generated/api/types.gen";

export async function getCategoriesFetcher(): Promise<ProjectCategoryDto[]> {
  const response = await projectCategoryControllerFindAll({ throwOnError: true });
  if (!response.data) throw new Error("Failed to fetch categories");
  return response.data;
}
