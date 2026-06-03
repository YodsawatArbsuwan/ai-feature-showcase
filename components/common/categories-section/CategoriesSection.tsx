"use client";

import { useCategories } from "@/features/categories/hooks/categories.hook";

export default function CategoriesSection() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-8 py-6">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-28 animate-pulse rounded-full bg-brand-tint" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !categories?.length) return null;

  return (
    <div className="w-full border-b border-slate-100">
      <div className="w-full max-w-7xl mx-auto px-8 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400 mr-1">หมวดหมู่:</span>
          {categories.filter((c) => c.isActive).map((cat) => (
            <span
              key={cat.id}
              className="inline-flex items-center rounded-full border border-brand-tint bg-brand-tint px-3 py-1 text-xs font-medium text-brand hover:bg-brand/5 transition-colors"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
