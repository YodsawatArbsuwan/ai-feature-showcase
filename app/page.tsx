"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import FeatureCatalog from "@/components/common/feature-catalog/FeatureCatalog";
import ScrollToTop from "@/components/common/scroll-to-top/ScrollToTop";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="w-full bg-brand-tint">
          <div className="mx-auto max-w-2xl px-4 pb-10 pt-16 text-center sm:pt-20">
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
                placeholder="ค้นหา category..."
                className="flex-1 bg-transparent px-3 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
              <div className="flex shrink-0 items-center">
                <span className="border-l border-slate-200 px-4 py-2 text-xs font-medium text-slate-400 whitespace-nowrap">
                  {siteConfig.stats.features} AI Features
                </span>
                <span className="border-l border-slate-200 px-4 py-2 text-xs font-medium text-slate-400 whitespace-nowrap">
                  {siteConfig.stats.demos} Demos
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Category grid */}
        <FeatureCatalog search={search} />
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
