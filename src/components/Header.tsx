"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800 py-4"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
          JUS MEDIA<span className="text-blue-600">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
          >
            Articles
          </Link>
          <Link
            href="/pages/about"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
          >
            About
          </Link>
          <Link
            href="/pages/contact"
            className="px-4 py-2 rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
