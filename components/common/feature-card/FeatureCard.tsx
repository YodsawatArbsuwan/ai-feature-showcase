"use client";

import type { FeatureMeta } from "@/types/feature";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import AssetImage from "@/components/common/asset-image/AssetImage";

const badgeColors: Record<string, string> = {
  New: "bg-brand/15 text-brand",
  Beta: "bg-amber-400/20 text-amber-600",
  Stable: "bg-slate-800/80 text-white backdrop-blur-sm",
};

const categoryColors: Record<string, string> = {
  NLP: "bg-brand/10 text-brand border-brand/20",
  Vision: "bg-purple-50 text-purple-600 border-purple-200",
  Audio: "bg-cyan-50 text-cyan-600 border-cyan-200",
  Data: "bg-indigo-50 text-indigo-600 border-indigo-200",
  Coding: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Multimodal: "bg-orange-50 text-orange-600 border-orange-200",
};

const fallbackBg: Record<string, string> = {
  NLP: "from-brand-tint via-[#d5e9f8] to-brand-tint",
  Vision: "from-purple-50 via-purple-100 to-purple-50",
  Audio: "from-cyan-50 via-cyan-100 to-cyan-50",
  Data: "from-indigo-50 via-indigo-100 to-indigo-50",
  Coding: "from-emerald-50 via-emerald-100 to-emerald-50",
  Multimodal: "from-orange-50 via-orange-100 to-orange-50",
};

type Props = { feature: FeatureMeta };

export default function FeatureCard({ feature }: Props) {
  const bg = fallbackBg[feature.category] ?? "from-brand-tint via-[#d5e9f8] to-brand-tint";
  const catColor = categoryColors[feature.category] ?? "bg-brand/10 text-brand border-brand/20";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">

      {/* ── Preview image ── */}
      <Link href={`/features/${feature.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <AssetImage
            uuid={feature.imageUuid}
            imageUrl={feature.imageUrl}
            alt={feature.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            fallback={
              <div className={cn("flex h-full items-center justify-center bg-linear-to-br", bg)}>
                <span className="text-7xl select-none transition-transform duration-300 group-hover:scale-110">
                  {feature.icon ?? "✨"}
                </span>
              </div>
            }
          />

          {/* Fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white/80 to-transparent" />

          {/* Badge */}
          {feature.badge && (
            <span className={cn(
              "absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
              badgeColors[feature.badge]
            )}>
              {feature.badge.toUpperCase()}
            </span>
          )}
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col gap-2 px-5 py-4">
        <Link href={`/features/${feature.slug}`}>
          <h3 className="text-base font-bold leading-tight text-brand-navy transition-colors group-hover:text-brand">
            {feature.name}
          </h3>
        </Link>
        <p className="flex-1 text-sm leading-relaxed text-slate-500">
          {feature.description}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-1">
          <span className={cn(
            "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium",
            catColor
          )}>
            {feature.category}
          </span>

          <button
            aria-label="Bookmark"
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-brand-tint hover:text-brand"
            onClick={(e) => e.preventDefault()}
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
