"use client";

import { useCategories } from "@/features/categories/hooks/categories.hook";
import CategoryCard from "@/components/common/category-card/CategoryCard";
import type { FeatureCategory } from "@/types/feature";

type Props = {
  search?: string;
  category?: FeatureCategory;
};

export default function FeatureCatalog({ search = "", category }: Props) {
  const { data: categories, isLoading, isError } = useCategories();

  const visible = categories
    ?.filter((c) => c.isActive)
    .filter((c) =>
      category
        ? c.name.toLowerCase() === category.toLowerCase()
        : true
    )
    .filter((c) =>
      search.trim() === ""
        ? true
        : c.name.toLowerCase().includes(search.toLowerCase()) ||
          (c.description ?? "").toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-8">
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-brand-tint" />
          ))}
        </div>
      )}

      {isError && (
        <p className="py-20 text-center text-sm text-slate-400">
          ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง
        </p>
      )}

      {visible && visible.length === 0 && (
        <p className="py-20 text-center text-sm text-slate-400">
          {search ? `ไม่พบ category ที่ตรงกับ "${search}"` : "ยังไม่มีหมวดหมู่"}
        </p>
      )}

      {visible && visible.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
