"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import Logo from "@/components/common/logo/Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-tint bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Nav — centered */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 sm:flex">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-navy"
          >
            Home
          </Link>
          <Link
            href="https://showcase-portal.larngeartech.com/th"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-brand-navy"
          >
            AI Features
          </Link>
        </nav>

        {/* Search icon */}
        <button
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-tint text-slate-400 transition-colors hover:border-brand/30 hover:text-brand"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
