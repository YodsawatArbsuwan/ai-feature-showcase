"use client";

import { useState } from "react";
import type { FeatureMeta, FeatureCategory } from "@/types/feature";
import FeatureCard from "@/components/common/feature-card/FeatureCard";
import { cn } from "@/lib/utils/cn";

const ALL = "All" as const;
type Filter = typeof ALL | FeatureCategory;

const PILLS: Filter[] = [ALL, "NLP", "Vision", "Audio", "Data", "Coding", "Multimodal"];

type Props = { features: FeatureMeta[] };

export default function FeatureCatalog({ features }: Props) {
  const [active, setActive] = useState<Filter>(ALL);

  const visible =
    active === ALL ? features : features.filter((f) => f.category === active);

  return (
    <div className="w-full">
      {/* ── Filter pills ── */}
      {/* <div className="border-b border-white/6">
        <div className="w-full max-w-7xl mx-auto px-8 pb-5 pt-6">
          <div className="flex flex-wrap gap-2">
            {PILLS.map((pill) => {
              const isActive = pill === active;
              return (
                <button
                  key={pill}
                  onClick={() => setActive(pill)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#a3e635] text-black"
                      : "border border-white/15 text-white/65 hover:border-white/30 hover:text-white"
                  )}
                >
                  {pill === ALL ? "Recently Added ✨" : pill}
                </button>
              );
            })}
          </div>
        </div>
      </div> */}

      {/* ── Cards grid ── */}
      <div className="w-full max-w-7xl mx-auto px-8 py-8">
        {visible.length === 0 ? (
          <p className="py-20 text-center text-sm text-slate-400">
            No features in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((feature) => (
              <FeatureCard key={feature.slug} feature={feature} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
