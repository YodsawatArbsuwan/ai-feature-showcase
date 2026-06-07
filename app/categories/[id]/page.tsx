"use client";

import { use } from "react";
import { ChevronRight, Sparkles, Clock, CheckCircle2, Cpu, BookOpen } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/common/scroll-to-top/ScrollToTop";
import { useCategories } from "@/features/categories/hooks/categories.hook";
import { useProductsByCategory } from "@/features/products/hooks/products.hook";
import { features as featureConfig } from "@/config/features";
import AssetImage from "@/components/common/asset-image/AssetImage";
import { cn } from "@/lib/utils/cn";

type Props = { params: Promise<{ id: string }> };

const badgeColors: Record<string, string> = {
  New: "bg-brand/10 text-brand border border-brand/20",
  Beta: "bg-amber-50 text-amber-600 border border-amber-200",
  Stable: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const categoryColors: Record<string, string> = {
  NLP: "bg-brand/10 text-brand border border-brand/20",
  Vision: "bg-purple-50 text-purple-600 border border-purple-200",
  Audio: "bg-cyan-50 text-cyan-600 border border-cyan-200",
  Data: "bg-indigo-50 text-indigo-600 border border-indigo-200",
  Coding: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  Multimodal: "bg-orange-50 text-orange-600 border border-orange-200",
};

export default function CategoryDetailPage({ params }: Props) {
  const { id } = use(params);

  const { data: categories, isLoading: catsLoading } = useCategories();
  const { data: products, isLoading: prodsLoading } = useProductsByCategory(id);

  const category = categories?.find((c) => c.id === id);

  // Normalize a display name to slug form for fuzzy matching
  const toSlug = (s: string) =>
    s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  // Match config: exact name → slug-derived name → first token match
  const config = featureConfig.find((f) => {
    const apiName = (category?.name ?? "").toLowerCase().trim();
    return (
      f.name.toLowerCase().trim() === apiName ||
      f.slug === toSlug(category?.name ?? "") ||
      apiName.includes(f.name.toLowerCase().trim())
    );
  });

  // Always derive a demo slug (even without a config match)
  const demoSlug = config?.slug ?? toSlug(category?.name ?? "");

  // Fallback mockup data — used when config has no match
  const specs = config?.technicalSpecs ?? {
    avgLatency: "~200ms",
    systemAccuracy: "95.0%",
    activeModel: "LarnGear-AI-v1",
  };
  const archTags = config?.architecturalTags ?? ["Transformer", "Fine-tuned", "LLM"];

  const isLoading = catsLoading || prodsLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-8 py-10">
            <div className="h-6 w-48 animate-pulse rounded-lg bg-brand-tint mb-6" />
            <div className="h-12 w-80 animate-pulse rounded-lg bg-brand-tint mb-4" />
            <div className="flex gap-8">
              <div className="flex-1 space-y-4">
                <div className="h-72 animate-pulse rounded-2xl bg-brand-tint" />
                <div className="h-4 w-full animate-pulse rounded bg-brand-tint" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-brand-tint" />
              </div>
              <div className="w-72 space-y-4">
                <div className="h-48 animate-pulse rounded-2xl bg-brand-tint" />
                <div className="h-32 animate-pulse rounded-2xl bg-brand-tint" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="w-full max-w-7xl mx-auto px-8 py-10">

          {/* ── Breadcrumb ── */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href="/" className="hover:text-brand transition-colors">AI Features</Link>
            {config?.category && (
              <>
                <ChevronRight className="h-3 w-3 shrink-0" />
                <span>{config.category}</span>
              </>
            )}
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-slate-600">{category?.name ?? "..."}</span>
          </nav>

          {/* ── Badge row ── */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {config?.category && (
              <span className={cn("rounded-full px-3 py-0.5 text-xs font-semibold", categoryColors[config.category] ?? "bg-brand/10 text-brand border border-brand/20")}>
                {config.category}
              </span>
            )}
            {config?.badge && (
              <span className={cn("rounded-full px-3 py-0.5 text-xs font-semibold uppercase", badgeColors[config.badge])}>
                {config.badge}
              </span>
            )}
            {config?.architecturalTags?.[0] && (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs font-medium text-slate-500 uppercase">
                {config.architecturalTags[0].replace(/\s+/g, "-").toUpperCase()}
              </span>
            )}
          </div>

          {/* ── Title & Description ── */}
          <h1 className="mb-2 text-4xl font-bold text-brand-navy sm:text-5xl">
            {category?.name ?? "..."}
          </h1>
          <p className="mb-8 text-base leading-relaxed text-slate-500 sm:text-lg">
            {category?.description ?? config?.description ?? ""}
          </p>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

            {/* ── Main column ── */}
            <div className="min-w-0 flex-1">

              {/* Hero image */}
              {(category?.assetStoreUuid ?? config?.imageUrl) && (
                <div className="mb-8 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                  <AssetImage
                    uuid={category?.assetStoreUuid}
                    imageUrl={config?.imageUrl}
                    alt={category?.name ?? ""}
                    className="h-72 w-full object-cover sm:h-80"
                    fallback={
                      <div className="flex h-72 w-full items-center justify-center bg-linear-to-br from-brand-tint via-[#d5e9f8] to-brand-tint sm:h-80">
                        <span className="text-7xl select-none">{config?.icon ?? "🤖"}</span>
                      </div>
                    }
                  />
                </div>
              )}

              {/* Core Functional Capacities */}
              {config?.features && config.features.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-brand">
                    <Sparkles className="h-5 w-5" />
                    Core Functional Capacities
                  </h2>
                  <ol className="space-y-4">
                    {config.features.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                          {i + 1}
                        </span>
                        <p className="pt-0.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Integrated Reference Implementations (products from API) */}
              {products && products.filter((p) => p.isActive).length > 0 && (
                <div>
                  <h2 className="mb-2 flex items-center gap-2 text-xl font-bold text-brand">
                    <BookOpen className="h-5 w-5" />
                    Integrated Reference Implementations
                  </h2>
                  <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Live Reference Prototypes • Multi-Platform
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500">
                    The following reference applications and production-grade commercial platforms leverage
                    the LarnGear{" "}
                    <strong className="font-semibold text-brand-navy">{category?.name}</strong> module
                    within their orchestration stack:
                  </p>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {products
                      .filter((p) => p.isActive)
                      .map((product) => (
                        <div
                          key={product.id}
                          className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                          {/* Thumbnail */}
                          <div className="relative h-32 overflow-hidden bg-slate-50">
                            <AssetImage
                              uuid={product.assetStoreUuid}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              fallback={
                                <div className="flex h-full items-center justify-center text-slate-300">
                                  <BookOpen className="h-8 w-8" />
                                </div>
                              }
                            />
                          </div>

                          {/* Info */}
                          <div className="flex flex-1 flex-col gap-1.5 p-3">
                            <p className="text-sm font-semibold text-brand-navy">{product.name}</p>
                            {product.description && (
                              <p className="flex-1 text-xs leading-relaxed text-slate-400 line-clamp-3">
                                {product.description}
                              </p>
                            )}
                            {product.url && (
                              <a
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 text-xs font-medium text-brand hover:underline"
                              >
                                View →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="w-full shrink-0 space-y-5 lg:w-72 xl:w-80">

              {/* Technical Specs — always shown */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-brand-navy">Technical Specs</h3>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-400">
                    <Cpu className="h-3.5 w-3.5" />
                  </span>
                </div>
                <dl className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <dt className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      Avg Latency
                    </dt>
                    <dd className="text-xs font-semibold text-brand-navy">{specs.avgLatency}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      System Accuracy
                    </dt>
                    <dd className="text-xs font-semibold text-emerald-600">{specs.systemAccuracy}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="flex items-center gap-2 text-xs text-slate-400">
                      <Cpu className="h-3.5 w-3.5 shrink-0" />
                      Active Model
                    </dt>
                    <dd className="text-right text-xs font-semibold text-brand-navy">{specs.activeModel}</dd>
                  </div>
                </dl>

                {/* Architectural Tags */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Architectural Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {archTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Try Demo CTA — always shown */}
              <Link
                href={`/demo/${demoSlug}`}
                className="block w-full rounded-xl bg-linear-to-r from-brand to-brand-bright py-3 text-center text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-bright/30"
              >
                Try Demo →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
