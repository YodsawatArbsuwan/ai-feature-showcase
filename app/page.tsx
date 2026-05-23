import { Search } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import FeatureCatalog from "@/components/common/feature-catalog/FeatureCatalog";
import ScrollToTop from "@/components/common/scroll-to-top/ScrollToTop";
import { featuredFeatures } from "@/config/features";
import { siteConfig } from "@/config/site";

const CATEGORIES = ["NLP", "Vision", "Audio", "Data", "Coding", "Multimodal"];

/* Shared horizontal padding + max-width used everywhere */
const container = "w-full max-w-7xl mx-auto px-8";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111111]">
      <Header />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="mx-auto max-w-2xl px-4 pb-10 pt-16 text-center sm:pt-20">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            The Latest Source of
            <br />
            <span className="text-[#a3e635]">AI Features &amp; Demos</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
            Stay Ahead of the Curve with the Best Curated Directory of AI
            Resources.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors focus-within:border-white/20">
            <span className="flex items-center pl-4 text-white/40">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Find your perfect tool &amp; prompt"
              className="flex-1 bg-transparent px-3 py-3.5 text-sm text-white placeholder-white/30 outline-none"
            />
            <div className="flex shrink-0 items-center">
              <span className="border-l border-white/10 px-4 py-2 text-xs font-medium text-white/50 whitespace-nowrap">
                {siteConfig.stats.features} AI Features
              </span>
              <span className="border-l border-white/10 px-4 py-2 text-xs font-medium text-white/50 whitespace-nowrap">
                {siteConfig.stats.demos} Demos
              </span>
            </div>
          </div>
        </section>

        {/* Filter pills + card grid */}
        <FeatureCatalog features={featuredFeatures} />

        {/* Bottom bar */}
        <div className="border-t border-white/6">
          <div className={container}>
            <div className="flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
              <span className="text-xs text-white/30">
                ✳ Discover more categories
              </span>
              <select
                defaultValue=""
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/40 outline-none sm:w-52"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/6 py-5">
        <div className="flex items-center justify-center gap-6 text-xs text-white/30">
          <Link href="/about" className="transition-colors hover:text-white/60">About</Link>
          <Link href="/terms" className="transition-colors hover:text-white/60">Terms Of Use</Link>
          <Link href="/privacy" className="transition-colors hover:text-white/60">Privacy Policy</Link>
        </div>
        <p className="mt-3 text-center text-[11px] text-white/20">
          © 2026 - AI Showcase | All Rights Reserved
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
