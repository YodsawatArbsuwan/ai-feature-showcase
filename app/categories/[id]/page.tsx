"use client";

import { use } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/common/scroll-to-top/ScrollToTop";
import ProductCard from "@/components/common/product-card/ProductCard";
import { useCategories } from "@/features/categories/hooks/categories.hook";
import { useProductsByCategory } from "@/features/products/hooks/products.hook";

type Props = { params: Promise<{ id: string }> };

export default function CategoryDetailPage({ params }: Props) {
  const { id } = use(params);

  const { data: categories } = useCategories();
  const { data: products, isLoading, isError } = useProductsByCategory(id);

  const category = categories?.find((c) => c.id === id);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="w-full max-w-7xl mx-auto px-8 py-10">

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-brand-navy">{category?.name ?? "..."}</span>
          </nav>

          {/* Title */}
          <h1 className="mb-3 text-4xl font-bold text-brand-navy sm:text-5xl">
            {category?.name ?? <span className="inline-block h-10 w-64 animate-pulse rounded-lg bg-brand-tint" />}
          </h1>

          {/* Description */}
          {category?.description && (
            <p className="mb-10 text-base leading-relaxed text-slate-500 sm:text-lg">
              {category.description}
            </p>
          )}

          {/* Products */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl bg-brand-tint" />
              ))}
            </div>
          )}

          {isError && (
            <p className="py-20 text-center text-sm text-slate-400">
              ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง
            </p>
          )}

          {products && products.length === 0 && (
            <p className="py-20 text-center text-sm text-slate-400">
              ยังไม่มี product ในหมวดหมู่นี้
            </p>
          )}

          {products && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p) => p.isActive)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-deep py-8">
        <div className="flex items-center justify-center gap-6 text-xs text-white/60">
          <Link href="/about" className="transition-colors hover:text-white">About</Link>
          <Link href="/terms" className="transition-colors hover:text-white">Terms Of Use</Link>
          <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
        </div>
        <p className="mt-3 text-center text-[11px] text-white/40">
          © 2026 - AI Showcase | All Rights Reserved
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
