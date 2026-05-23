import type { FeatureMeta } from "@/types/feature";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const badgeColors: Record<string, string> = {
  New: "bg-[#a3e635]/15 text-[#a3e635]",
  Beta: "bg-blue-500/15 text-blue-400",
  Stable: "bg-white/8 text-white/40",
};

const cardGradient: Record<string, string> = {
  NLP:        "from-violet-600 via-purple-500/60 to-teal-400",
  Vision:     "from-violet-600 via-cyan-500/50 to-teal-400",
  Audio:      "from-purple-600 via-emerald-500/40 to-teal-400",
  Data:       "from-indigo-600 via-blue-500/50 to-teal-400",
  Coding:     "from-violet-600 via-yellow-500/30 to-teal-400",
  Multimodal: "from-fuchsia-600 via-purple-500/50 to-teal-400",
};

const fallbackBg: Record<string, string> = {
  NLP:        "from-[#1a0533] via-[#2d0d5c] to-[#1a0533]",
  Vision:     "from-[#001f2d] via-[#003d52] to-[#001f2d]",
  Audio:      "from-[#001a0f] via-[#003320] to-[#001a0f]",
  Data:       "from-[#001033] via-[#001f66] to-[#001033]",
  Coding:     "from-[#1a1500] via-[#332900] to-[#1a1500]",
  Multimodal: "from-[#2d0033] via-[#4d0052] to-[#2d0033]",
};

type Props = { feature: FeatureMeta };

export default function FeatureCard({ feature }: Props) {
  const gradient = cardGradient[feature.category] ?? "from-violet-600 via-purple-500/60 to-teal-400";
  const bg       = fallbackBg[feature.category]   ?? "from-[#1a1a2e] via-[#2a2a4e] to-[#1a1a2e]";

  return (
    <Link
      href={`/features/${feature.slug}`}
      className={cn(
        "group block rounded-2xl p-0.5 transition-all duration-300 bg-linear-to-br",
        gradient,
        "hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
      )}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[14px] bg-[#1a1a1a]">

        {/* ── Preview ── */}
        <div className="relative h-52 overflow-hidden">
          {feature.imageUrl ? (
            /* Real image */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={feature.imageUrl}
              alt={feature.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* Fallback gradient + icon */
            <div className={cn("flex h-full items-center justify-center bg-linear-to-br", bg)}>
              <span className="text-7xl select-none transition-transform duration-300 group-hover:scale-110">
                {feature.icon ?? "✨"}
              </span>
            </div>
          )}

          {/* Dark overlay at bottom so body blends */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-[#1a1a1a] to-transparent" />

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
          <h3 className="text-xl font-bold leading-tight text-white transition-colors group-hover:text-[#a3e635]">
            {feature.name}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-white/45">
            {feature.description}
          </p>
          <div>
            <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/60">
              {feature.category}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
