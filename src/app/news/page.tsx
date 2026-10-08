import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { formatDate, posts } from "@/lib/data";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <PageHero eyebrow="News" title="Agency news" text="Signings, transfers and updates from Zollgate Agency and our players." />
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <ul className="space-y-8">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/news/${p.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-line transition hover:shadow-lg hover:shadow-navy/10 sm:grid-cols-[18rem_1fr]"
              >
                <div className="relative aspect-[16/10] bg-pitch sm:aspect-auto sm:min-h-52">
                  {p.image ? (
                    <Image src={p.image} alt="" fill sizes="(min-width: 640px) 18rem, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <Image src="/brand/logo-dark.png" alt="" width={800} height={160} className="absolute left-1/2 top-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2 opacity-20" />
                  )}
                </div>
                <div className="p-7">
                  <p className="text-xs uppercase tracking-wider">
                    <span className="font-bold text-brand-deep">{p.category}</span>
                    <span className="text-mute"> · {formatDate(p.date)}</span>
                  </p>
                  <h2 className="mt-3 font-display text-2xl uppercase leading-tight group-hover:text-brand-deep sm:text-3xl">{p.title}</h2>
                  <p className="mt-3 text-mute">{p.excerpt}</p>
                  <p className="mt-5 text-sm font-bold uppercase tracking-wider">Read more →</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
