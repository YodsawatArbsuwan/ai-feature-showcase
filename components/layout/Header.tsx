"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import Logo from "@/components/common/logo/Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#111111]/95 backdrop-blur-sm pt-2">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Nav — centered */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 sm:flex">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm font-medium text-[#a3e635] transition-colors hover:text-[#bef264]"
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            AI Features
          </Link>
          {/* <Link
            href="/demo"
            className="px-3 py-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            Playground
          </Link> */}
        </nav>

        {/* Search icon */}
        <button
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/20 hover:text-white"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
