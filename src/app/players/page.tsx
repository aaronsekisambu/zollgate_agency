import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import PlayerGrid from "./PlayerGrid";

export const metadata: Metadata = { title: "Players" };

export default function PlayersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our roster"
        title="The players"
        text="Professionals and rising talents across Europe's leagues. Filter by position or search by name, club or nationality."
      />
      <PlayerGrid />
    </>
  );
}
