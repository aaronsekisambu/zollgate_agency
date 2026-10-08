"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Pages whose top banner is a dark stadium photo; the header starts transparent with white text there.
const photoHeroPages = ["/", "/players", "/services", "/about", "/news", "/contact"];

const nav = [
  { href: "/", label: "Home" },
  { href: "/players", label: "Players" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
];

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Zollgate Agency home">
      <Image
        src={onDark ? "/brand/logo-light.png" : "/brand/logo-dark.png"}
        alt="Zollgate"
        width={800}
        height={160}
        priority
        className="h-7 w-auto sm:h-8"
      />
      <span
        className={`border-l pl-3 text-[11px] font-semibold uppercase tracking-[0.3em] ${
          onDark ? "border-white/25 text-brand" : "border-ink/20 text-brand-deep"
        }`}
      >
        Agency
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open || !photoHeroPages.includes(pathname);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        solid ? "border-b border-line bg-white/95 backdrop-blur" : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo onDark={!solid} />
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${solid ? "hover:text-brand-deep" : "hover:text-white"} ${
                isActive(item.href) ? (solid ? "text-brand-deep" : "text-brand") : solid ? "text-ink/75" : "text-white/85"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className={`hidden rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition md:inline-block ${
            solid ? "bg-navy text-white hover:bg-brand-deep" : "bg-white text-navy hover:bg-brand hover:text-white"
          }`}
        >
          Get in touch
        </Link>
        <button
          className={`grid h-10 w-10 place-items-center rounded-full border md:hidden ${solid ? "border-line" : "border-white/40"}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-line px-4 pb-6 md:hidden">
          {[...nav, { href: "/contact", label: "Contact" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block border-b border-line py-4 font-display text-2xl uppercase ${
                isActive(item.href) ? "text-brand-deep" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
