"use client";

import { useState } from "react";
import {
  Search,
  MessageSquare,
  Eye,
  Music,
  BarChart2,
  Code2,
  Layers,
  LayoutGrid,
  Filter,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeatureCatalog from "@/components/common/feature-catalog/FeatureCatalog";
import ScrollToTop from "@/components/common/scroll-to-top/ScrollToTop";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import type { FeatureCategory } from "@/types/feature";

type FilterOption = "All" | FeatureCategory;

const filterOptions: { label: string; value: FilterOption; icon: React.ReactNode }[] = [
  { label: "All Resources", value: "All", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  { label: "NLP", value: "NLP", icon: <MessageSquare className="h-3.5 w-3.5" /> },
  { label: "Vision", value: "Vision", icon: <Eye className="h-3.5 w-3.5" /> },
  { label: "Audio", value: "Audio", icon: <Music className="h-3.5 w-3.5" /> },
  { label: "Data", value: "Data", icon: <BarChart2 className="h-3.5 w-3.5" /> },
  { label: "Coding", value: "Coding", icon: <Code2 className="h-3.5 w-3.5" /> },
  { label: "Multimodal", value: "Multimodal", icon: <Layers className="h-3.5 w-3.5" /> },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="w-full bg-brand-tint">
          <div className="mx-auto max-w-2xl px-4 pb-8 pt-14 text-center sm:pt-18">
            {/* Platform badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
              <span className="text-brand">•</span>
              CURATED INTELLIGENCE PLATFORM
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-brand-navy sm:text-5xl">
              The Latest Source of
              <br />
              <span className="bg-linear-to-r from-brand-navy to-brand-bright bg-clip-text text-transparent">
                AI Features &amp; Demos
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
              Stay Ahead of the Curve with the Best Curated Directory of AI
              Resources.
            </p>

            {/* Search bar */}
            <div className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all focus-within:border-brand/40 focus-within:shadow-md">
              <span className="flex items-center pl-4 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find your perfect tool &amp; prompt..."
                className="flex-1 bg-transparent px-3 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
              <div className="flex shrink-0 items-center">
                <span className="border-l border-slate-200 px-4 py-2 text-xs font-semibold text-brand whitespace-nowrap">
                  {siteConfig.stats.features} AI Features
                </span>
                <span className="border-l border-slate-200 px-4 py-2 text-xs font-semibold text-brand whitespace-nowrap">
                  {siteConfig.stats.demos} Demos
                </span>
              </div>
            </div>

            {/* Filter by capability */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
                <Filter className="h-3 w-3" />
                FILTER BY CAPABILITY
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setActiveFilter(opt.value)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                      activeFilter === opt.value
                        ? "bg-brand text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-brand/30 hover:text-brand"
                    )}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <FeatureCatalog search={search} category={activeFilter === "All" ? undefined : activeFilter} />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
