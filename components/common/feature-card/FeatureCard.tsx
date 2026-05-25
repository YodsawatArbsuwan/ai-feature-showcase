import type { FeatureMeta } from "@/types/feature";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const badgeColors: Record<string, string> = {
  New: "bg-brand/15 text-brand",
  Beta: "bg-brand-bright/15 text-brand-bright",
  Stable: "bg-slate-100 text-slate-400",
};

const cardGradient: Record<string, string> = {
  NLP:        "from-brand-navy via-brand to-brand-bright",
  Vision:     "from-brand via-brand-bright to-sky-400",
  Audio:      "from-brand-navy via-brand-bright to-cyan-400",
  Data:       "from-indigo-600 via-brand to-brand-bright",
  Coding:     "from-brand-navy via-brand to-blue-400",
  Multimodal: "from-brand via-brand-bright to-sky-300",
};

const fallbackBg: Record<string, string> = {
  NLP:        "from-brand-tint via-[#d5e9f8] to-brand-tint",
  Vision:     "from-brand-tint via-[#c8e5f5] to-brand-tint",
  Audio:      "from-brand-tint via-[#cce5f5] to-brand-tint",
  Data:       "from-brand-tint via-[#c0d8f2] to-brand-tint",
  Coding:     "from-brand-tint via-[#d0e5f5] to-brand-tint",
  Multimodal: "from-brand-tint via-[#c5ddf2] to-brand-tint",
};

type Props = { feature: FeatureMeta };

export default function FeatureCard({ feature }: Props) {
  const gradient = cardGradient[feature.category] ?? "from-brand-navy via-brand to-brand-bright";
  const bg       = fallbackBg[feature.category]   ?? "from-brand-tint via-[#d5e9f8] to-brand-tint";

  return (
    <Link
      href={`/features/${feature.slug}`}
      className={cn(
        "group block rounded-2xl p-0.5 transition-all duration-300 bg-linear-to-br",
        gradient,
        "hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-bright/20"
      )}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[14px] bg-white">

        {/* ── Preview ── */}
        <div className="relative h-52 overflow-hidden">
          {feature.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={feature.imageUrl}
              alt={feature.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={cn("flex h-full items-center justify-center bg-linear-to-br", bg)}>
              <span className="text-7xl select-none transition-transform duration-300 group-hover:scale-110">
                {feature.icon ?? "✨"}
              </span>
            </div>
          )}

          {/* Fade overlay so body blends */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-white to-transparent" />

          {/* Badge */}
          {feature.badge && (
            <span className={cn(
              "absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm",
              badgeColors[feature.badge]
            )}>
              {feature.badge}
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col gap-3 px-5 py-4">
          <h3 className="text-xl font-bold leading-tight text-brand-navy transition-colors group-hover:text-brand">
            {feature.name}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-slate-500">
            {feature.description}
          </p>
          <div>
            <span className="inline-flex items-center rounded-full border border-brand-tint px-3 py-1 text-xs font-medium text-brand">
              {feature.category}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
