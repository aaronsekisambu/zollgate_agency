import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Eyebrow, PlayerCard, PlayerPortrait } from "@/components/ui";
import { formatDate, getPlayer, players } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const player = getPlayer((await params).slug);
  return {
    title: player ? player.name : "Player not found",
    description: player?.bio,
    alternates: player ? { canonical: `/players/${player.slug}` } : undefined,
    openGraph: player?.photo ? { images: [player.photo] } : undefined,
  };
}

export default async function PlayerPage({ params }: Props) {
  const player = getPlayer((await params).slug);
  if (!player) notFound();

  const isGk = player.position === "Goalkeeper";
  const { stats } = player;
  const seasonStats = stats && [
    { label: "Appearances", value: stats.apps },
    isGk ? { label: "Clean sheets", value: stats.cleanSheets ?? 0 } : { label: "Goals", value: stats.goals },
    stats.minutes !== undefined ? { label: "Minutes", value: stats.minutes } : { label: "Assists", value: stats.assists },
  ];
  const label = player.role ?? player.position;
  const profile = (
    [
      ["Date of birth", player.birthDate && `${formatDate(player.birthDate)} (${player.age})`],
      ["Age", !player.birthDate && player.age],
      ["Joined Zollgate", player.joined],
      ["Nationality", player.nationality],
      ["Position", player.role ?? player.position],
      ["Height", player.height],
      ["Weight", player.weight],
      ["Strong foot", player.foot],
      ["Club", player.club],
      ["League", player.league],
      ["Contract until", player.contractUntil],
      ["Market value", player.marketValue],
    ] as [string, string | number | undefined | false][]
  ).filter(([, v]) => v);
  const firstName = player.name.split(" ")[0];
  const related = player.position
    ? players.filter((p) => p.slug !== player.slug && p.position === player.position).slice(0, 4)
    : players.filter((p) => p.slug !== player.slug).slice(0, 4);

  return (
    <>
      <section className="border-b border-line bg-pitch pt-28 sm:pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <PlayerPortrait player={player} priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-t-[2rem]" />
          <div className="pb-16">
            <Link href="/players" className="text-sm text-mute hover:text-brand-deep">← All players</Link>
            {(player.number !== undefined || label) && (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {player.number !== undefined && <span className="font-display text-6xl text-brand-deep">#{player.number}</span>}
                {label && (
                  <span className="rounded-full bg-brand/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-deep">{label}</span>
                )}
              </div>
            )}
            <h1 className="mt-2 font-display text-5xl uppercase leading-none sm:text-7xl">{player.name}</h1>
            <p className="mt-6 max-w-xl text-lg text-mute">{player.bio}</p>

            {seasonStats && (
              <>
                <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {seasonStats.map((s) => (
                    <div key={s.label} className="bg-white p-5">
                      <p className="font-display text-4xl text-brand-deep">{s.value}</p>
                      <p className="text-xs uppercase tracking-wider text-mute">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-mute">
                  League season {player.statsSeason}
                  {player.sourceUrl && (
                    <>
                      {" · Source: "}
                      <a href={player.sourceUrl} target="_blank" rel="noopener" className="underline hover:text-brand-deep">FuPa</a>
                    </>
                  )}
                </p>
              </>
            )}

            <dl className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {profile.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="text-mute">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={`/contact?player=${player.slug}`}>Enquire about {firstName} →</ButtonLink>
              {player.portfolio && (
                <a
                  href={player.portfolio}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition hover:border-brand hover:text-brand-deep"
                >
                  Portfolio (German)
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {(player.career || player.strengths) && (
        <section className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2">
          {player.career && (
            <div>
              <Eyebrow>Career</Eyebrow>
              <h2 className="font-display text-4xl uppercase">Club history</h2>
              <ol className="mt-10 border-l-2 border-brand/40">
                {player.career.map((c, i, all) => (
                  <li key={c.period + c.club} className="relative pb-8 pl-8 last:pb-0">
                    <span
                      className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${
                        i === all.length - 1 ? "bg-brand ring-4 ring-brand/25" : "bg-brand-deep"
                      }`}
                    />
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-deep">{c.period}</p>
                    <p className="mt-1 text-lg font-semibold">{c.club}</p>
                    {c.detail && <p className="text-sm text-mute">{c.detail}</p>}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {player.strengths && (
            <div>
              <Eyebrow>Scouting profile</Eyebrow>
              <h2 className="font-display text-4xl uppercase">Strengths</h2>
              <ul className="mt-10 space-y-5">
                {player.strengths.map((s) => (
                  <li key={s.label}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-semibold">
                        {s.label}
                        {s.note && <span className="ml-2 text-xs font-normal text-mute">{s.note}</span>}
                      </span>
                      <span className="font-display text-lg text-brand-deep">{s.score}/10</span>
                    </div>
                    <div
                      className="mt-2 h-2.5 overflow-hidden rounded-full bg-pitch"
                      role="meter"
                      aria-label={s.label}
                      aria-valuenow={s.score}
                      aria-valuemin={0}
                      aria-valuemax={10}
                    >
                      <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-deep" style={{ width: `${s.score * 10}%` }} />
                    </div>
                  </li>
                ))}
              </ul>

              {player.ambition && (
                <div className="mt-12 rounded-2xl border border-line bg-pitch p-8">
                  <h3 className="font-display text-2xl uppercase">In his own words</h3>
                  <div className="mt-4 space-y-3 text-mute">
                    {player.ambition.map((a) => (
                      <p key={a}>“{a}”</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {player.seasons && (
        <section className="border-y border-line bg-pitch py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Eyebrow>Statistics</Eyebrow>
            <h2 className="font-display text-4xl uppercase">Season by season</h2>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="w-full min-w-[640px] text-left">
                <thead className="border-b border-line text-xs uppercase tracking-wider text-mute">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Season</th>
                    <th className="px-6 py-4 font-semibold">Club</th>
                    <th className="px-6 py-4 font-semibold">League</th>
                    <th className="px-6 py-4 text-right font-semibold">Apps</th>
                    <th className="px-6 py-4 text-right font-semibold">Goals</th>
                    <th className="px-6 py-4 text-right font-semibold">Assists</th>
                    <th className="px-6 py-4 text-right font-semibold">Minutes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {player.seasons.map((s) => (
                    <tr key={s.season + s.club}>
                      <td className="px-6 py-4 font-semibold">{s.season}</td>
                      <td className="px-6 py-4">{s.club}</td>
                      <td className="px-6 py-4 text-mute">{s.league}</td>
                      <td className="px-6 py-4 text-right">{s.apps}</td>
                      <td className="px-6 py-4 text-right font-semibold text-brand-deep">{s.goals}</td>
                      <td className="px-6 py-4 text-right">{s.assists}</td>
                      <td className="px-6 py-4 text-right">{s.minutes.toLocaleString("en-GB")}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-line font-semibold">
                  <tr>
                    <td className="px-6 py-4" colSpan={3}>Total</td>
                    <td className="px-6 py-4 text-right">{player.seasons.reduce((n, s) => n + s.apps, 0)}</td>
                    <td className="px-6 py-4 text-right text-brand-deep">{player.seasons.reduce((n, s) => n + s.goals, 0)}</td>
                    <td className="px-6 py-4 text-right">{player.seasons.reduce((n, s) => n + s.assists, 0)}</td>
                    <td className="px-6 py-4 text-right">{player.seasons.reduce((n, s) => n + s.minutes, 0).toLocaleString("en-GB")}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      )}

      {player.videos && player.videos.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Eyebrow>Highlights</Eyebrow>
          <h2 className="font-display text-4xl uppercase">Watch {firstName}</h2>
          <div className="mt-10 grid items-start gap-6 md:grid-cols-[2fr_1fr]">
            {player.videos.map((v) => (
              <figure key={v.src} className="overflow-hidden rounded-2xl border border-line bg-navy">
                <video controls playsInline preload="metadata" poster={v.poster} className="max-h-[70vh] w-full bg-navy">
                  <source src={v.src} type="video/mp4" />
                </video>
                <figcaption className="bg-white px-5 py-3 text-sm font-semibold">{v.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-line bg-pitch py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Eyebrow>{player.position ? `More ${player.position.toLowerCase()}s` : "Our roster"}</Eyebrow>
            <h2 className="font-display text-4xl uppercase">Similar profiles</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <PlayerCard key={p.slug} player={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
