import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, JsonLd } from "@/components/ui";
import { formatDate, getPlayer, getPost, posts, siteUrl, type Player, type Post } from "@/lib/data";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const player = post.player ? getPlayer(post.player) : undefined;
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
    image: post.image ? { url: post.image, alt: post.title } : undefined,
    article: { publishedTime: post.date, section: post.category, tags: player ? [player.name] : undefined },
    keywords: [post.category, player?.name, player?.club, "Zollgate Agency", "football news"].filter((k): k is string => Boolean(k)),
  });
}

function articleLd(post: Post, player?: Player) {
  const url = `${siteUrl}/news/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [`${siteUrl}${post.image}`] : [`${siteUrl}/opengraph-image.jpg`],
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    mainEntityOfPage: url,
    url,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    about: player && { "@type": "Person", name: player.name, url: `${siteUrl}/players/${player.slug}` },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const player = post.player ? getPlayer(post.player) : undefined;

  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
      <JsonLd
        data={[breadcrumbs({ name: "News", path: "/news" }, { name: post.title, path: `/news/${post.slug}` }), articleLd(post, player)]}
      />
      <Link href="/news" className="text-sm text-mute hover:text-brand-deep">← All news</Link>
      <p className="mt-8 text-xs uppercase tracking-wider">
        <span className="font-bold text-brand-deep">{post.category}</span>
        <span className="text-mute"> · {formatDate(post.date)}</span>
      </p>
      <h1 className="mt-4 font-display text-4xl uppercase leading-none sm:text-6xl">{post.title}</h1>
      <p className="mt-6 text-xl text-mute">{post.excerpt}</p>
      {post.image && (
        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl bg-navy">
          <Image src={post.image} alt="" fill priority sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
        </div>
      )}
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {player && (
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-pitch p-6">
          <p className="font-semibold">See {player.name.split(" ")[0]}&apos;s full player profile</p>
          <ButtonLink href={`/players/${player.slug}`}>View profile →</ButtonLink>
        </div>
      )}
    </article>
  );
}
