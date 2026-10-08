"use client";

import { useMemo, useState } from "react";
import { PlayerCard } from "@/components/ui";
import { players, positions, type Position } from "@/lib/data";

export default function PlayerGrid() {
  const [position, setPosition] = useState<Position | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return players.filter(
      (p) =>
        (position === "All" || p.position === position) &&
        (!q || [p.name, p.club, p.nationality, p.league].some((v) => v?.toLowerCase().includes(q))),
    );
  }, [position, query]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["All", ...positions] as const).map((pos) => (
            <button
              key={pos}
              onClick={() => setPosition(pos)}
              className={`rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider transition ${
                position === pos ? "bg-navy text-white" : "border border-line text-mute hover:border-navy hover:text-ink"
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, club, country…"
          aria-label="Search players"
          className="w-full rounded-full border border-line bg-panel px-5 py-3 outline-none placeholder:text-mute focus:border-navy lg:w-80"
        />
      </div>

      <p className="mt-8 text-sm text-mute">
        Showing {filtered.length} of {players.length} players
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filtered.map((p) => (
            <PlayerCard key={p.slug} player={p} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border border-line p-12 text-center text-mute">No players match your filters.</p>
      )}
    </section>
  );
}
