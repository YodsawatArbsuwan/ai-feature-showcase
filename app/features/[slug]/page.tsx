import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Sparkles, Clock, CheckCircle2, Cpu, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/common/scroll-to-top/ScrollToTop";
import AssetImage from "@/components/common/asset-image/AssetImage";
import { features } from "@/config/features";
import { cn } from "@/lib/utils/cn";

type Props = { params: Promise<{ slug: string }> };

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

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = features.find((f) => f.slug === slug);
  if (!feature) return {};
  return {
    title: `${feature.name} — AI Feature Showcase`,
    description: feature.description,
  };
}

export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const feature = features.find((f) => f.slug === slug);
  if (!feature) notFound();

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
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span>{feature.category}</span>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-slate-600">{feature.name}</span>
          </nav>

          {/* ── Badge row ── */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full px-3 py-0.5 text-xs font-semibold", categoryColors[feature.category])}>
              {feature.category}
            </span>
            {feature.badge && (
              <span className={cn("rounded-full px-3 py-0.5 text-xs font-semibold uppercase", badgeColors[feature.badge])}>
                {feature.badge}
              </span>
            )}
            {feature.architecturalTags?.[0] && (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs font-medium text-slate-500 uppercase">
                {feature.architecturalTags[0].replace(/\s+/g, "-").toUpperCase()}
              </span>
            )}
          </div>

          {/* ── Title & Description ── */}
          <h1 className="mb-2 text-4xl font-bold text-brand-navy sm:text-5xl">
            {feature.name}
          </h1>
          <p className="mb-8 text-base leading-relaxed text-slate-500 sm:text-lg">
            {feature.description}
          </p>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

            {/* ── Main column ── */}
            <div className="min-w-0 flex-1">

              {/* Hero image */}
              {(feature.imageUuid ?? feature.imageUrl) && (
                <div className="mb-8 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                  <AssetImage
                    uuid={feature.imageUuid}
                    imageUrl={feature.imageUrl}
                    alt={feature.name}
                    className="h-72 w-full object-cover sm:h-80"
                    fallback={
                      <div className="flex h-72 w-full items-center justify-center bg-slate-50 sm:h-80">
                        <span className="text-7xl select-none">{feature.icon ?? "✨"}</span>
                      </div>
                    }
                  />
                </div>
              )}

              {/* Core Functional Capacities */}
              {feature.features && feature.features.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-brand">
                    <Sparkles className="h-5 w-5" />
                    Core Functional Capacities
                  </h2>
                  <ol className="space-y-4">
                    {feature.features.map((item, i) => (
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

              {/* Integrated Reference Implementations */}
              {feature.references && feature.references.length > 0 && (
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
                    the LarnGear <strong className="font-semibold text-brand-navy">{feature.name}</strong> module
                    within their orchestration stack:
                  </p>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {feature.references.map((ref, i) => (
                      <div
                        key={i}
                        className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-32 overflow-hidden bg-slate-50">
                          <AssetImage
                            uuid={ref.imageUuid}
                            imageUrl={ref.imageUrl}
                            alt={ref.title}
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
                          <p className="text-sm font-semibold text-brand-navy">{ref.title}</p>
                          <p className="flex-1 text-xs leading-relaxed text-slate-400 line-clamp-3">
                            {ref.description}
                          </p>
                          {ref.activTokens && (
                            <p className="mt-1 text-xs text-slate-400">
                              Activ Token{" "}
                              <span className="font-semibold text-slate-600">{ref.activTokens}</span>
                            </p>
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

              {/* Technical Specs card */}
              {feature.technicalSpecs && (
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-brand-navy">Technical Specs</h3>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-400">
                      <Cpu className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <dl className="space-y-3">
                    {feature.technicalSpecs.avgLatency && (
                      <div className="flex items-center justify-between gap-2">
                        <dt className="flex items-center gap-2 text-xs text-slate-400">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          Avg Latency
                        </dt>
                        <dd className="text-xs font-semibold text-brand-navy">{feature.technicalSpecs.avgLatency}</dd>
                      </div>
                    )}
                    {feature.technicalSpecs.systemAccuracy && (
                      <div className="flex items-center justify-between gap-2">
                        <dt className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          System Accuracy
                        </dt>
                        <dd className="text-xs font-semibold text-emerald-600">{feature.technicalSpecs.systemAccuracy}</dd>
                      </div>
                    )}
                    {feature.technicalSpecs.activeModel && (
                      <div className="flex items-center justify-between gap-2">
                        <dt className="flex items-center gap-2 text-xs text-slate-400">
                          <Cpu className="h-3.5 w-3.5 shrink-0" />
                          Active Model
                        </dt>
                        <dd className="text-right text-xs font-semibold text-brand-navy">{feature.technicalSpecs.activeModel}</dd>
                      </div>
                    )}
                  </dl>

                  {/* Architectural tags */}
                  {feature.architecturalTags && feature.architecturalTags.length > 0 && (
                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Architectural Tags
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {feature.architecturalTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Try Demo CTA */}
              <Link
                href={`/demo/${feature.slug}`}
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
