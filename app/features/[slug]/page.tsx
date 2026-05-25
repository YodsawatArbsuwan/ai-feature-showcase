import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/common/scroll-to-top/ScrollToTop";
import { features } from "@/config/features";

type Props = { params: Promise<{ slug: string }> };

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
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href="/" className="hover:text-brand transition-colors">AI Features</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span>{feature.category}</span>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-brand-navy">{feature.name}</span>
          </nav>

          {/* ── Title ── */}
          <h1 className="mb-8 text-4xl font-bold text-brand-navy sm:text-5xl">
            {feature.name}
          </h1>

          {/* ── Feature image ── */}
          {feature.imageUrl && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={feature.imageUrl}
                alt={feature.name}
                className="h-72 w-full object-cover sm:h-80"
              />
            </div>
          )}

          {/* ── Description ── */}
          <p className="mb-8 text-base leading-relaxed text-slate-600 sm:text-lg">
            {feature.description}
          </p>

          {/* ── Features list ── */}
          {feature.features && feature.features.length > 0 && (
            <div className="mb-10">
              <p className="mb-4 text-base font-semibold text-brand-navy">
                Features:
              </p>
              <ol className="space-y-3">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    <span className="mt-0.5 shrink-0 font-medium text-brand">
                      {i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* ── CTA button ── */}
          <Link
            href={`/demo/${feature.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-bright px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-bright/30"
          >
            <ExternalLink className="h-4 w-4" />
            Try Demo
          </Link>

        </div>
      </main>

      {/* ── Footer ── */}
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
