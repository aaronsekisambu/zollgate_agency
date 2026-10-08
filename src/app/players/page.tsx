import type { Metadata } from "next";
import { JsonLd, PageHero } from "@/components/ui";
import { players, siteUrl } from "@/lib/data";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import PlayerGrid from "./PlayerGrid";

export const metadata: Metadata = pageMetadata({
  title: "Players",
  description:
    "Browse the Zollgate Agency roster: professional footballers and rising talents across Europe, filterable by position, club and nationality.",
  path: "/players",
  keywords: ["football players", "player roster", "footballers Europe", "Zollgate Agency players"],
});

const playersLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Zollgate Agency players",
  itemListElement: players.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    url: `${siteUrl}/players/${p.slug}`,
  })),
};

export default function PlayersPage() {
  return (
    <>
      <JsonLd data={[breadcrumbs({ name: "Players", path: "/players" }), playersLd]} />
      <PageHero
        eyebrow="Our roster"
        title="The players"
        text="Professionals and rising talents across Europe's leagues. Filter by position or search by name, club or nationality."
      />
      <PlayerGrid />
    </>
  );
}
