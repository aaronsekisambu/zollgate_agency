import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Icon, PhotoBackdrop, PlayerCard, PlayerPortrait, SectionHeading } from "@/components/ui";
import { formatDate, players, posts, services, steps, testimonials } from "@/lib/data";

export default function Home() {
  const featured = players[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 text-white sm:pt-40">
        <PhotoBackdrop src="/images/stadium-hero.jpg" priority />
        <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="pb-16 lg:pb-28">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/85 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand" /> Football player representation
            </p>
            <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-7xl xl:text-8xl">
              Your talent.
              <br />
              <span className="text-brand">Our game plan.</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg text-white/80">
              We represent ambitious footballers and connect them with the clubs, contracts and opportunities that shape a career.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/players" variant="light">Meet our players →</ButtonLink>
              <ButtonLink href="/contact" variant="ghostLight">Join the agency</ButtonLink>
            </div>
          </div>

          <Link href={`/players/${featured.slug}`} className="group relative block">
            <PlayerPortrait player={featured} priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-t-[2rem]" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-5 text-ink shadow-xl shadow-navy/30">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-deep">Featured player</p>
              <div className="mt-1 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-3xl uppercase group-hover:text-brand-deep">{featured.name}</p>
                  <p className="text-sm text-mute">{[featured.role ?? featured.position, featured.club].filter(Boolean).join(" · ")}</p>
                </div>
                {featured.stats && (
                  <div className="text-right">
                    <p className="font-display text-3xl text-brand-deep">{featured.stats.goals}</p>
                    <p className="text-xs uppercase tracking-wider text-mute">Goals {featured.statsSeason}</p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Services ribbon */}
      <div className="overflow-hidden border-b border-line bg-white py-5 text-navy">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-lg font-semibold uppercase tracking-wider">
          {[...services, ...services].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s.title} <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="What we do" title={<>Full-service <span className="text-brand-deep">representation</span></>} />
          <ButtonLink href="/services" variant="ghost">All services</ButtonLink>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.title} className="group rounded-2xl border border-line bg-panel p-8 transition hover:shadow-lg hover:shadow-navy/5">
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-navy/5 text-navy transition group-hover:bg-navy group-hover:text-white">
                  <Icon name={s.icon} />
                </span>
                <span className="font-display text-4xl text-ink/10">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl uppercase">{s.title}</h3>
              <p className="mt-3 text-mute">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Players */}
      <section className="border-y border-line bg-pitch py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Our roster" title={<>Players we <span className="text-brand-deep">represent</span></>} />
            <ButtonLink href="/players">View all players</ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {players.slice(0, 4).map((p) => (
              <PlayerCard key={p.slug} player={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading center eyebrow="How it works" title={<>From pitch to <span className="text-brand-deep">contract</span></>} />
        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-line p-8">
              <span className="font-display text-6xl text-outline">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl uppercase text-navy">{s.title}</h3>
              <p className="mt-3 text-mute">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonials */}
      <section className="border-y border-line bg-pitch py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Testimonials" title={<>Trusted by players <span className="text-brand-deep">&amp; clubs</span></>} />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-2xl border border-line bg-panel p-8">
                <span className="font-display text-6xl leading-none text-brand">“</span>
                <blockquote className="flex-1 text-lg">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-mute">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Latest news" title={<>From the <span className="text-brand-deep">agency</span></>} />
          <ButtonLink href="/news" variant="ghost">All news</ButtonLink>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/news/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-line transition hover:shadow-lg hover:shadow-navy/10">
              {p.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                  <Image src={p.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider">
                  <span className="font-bold text-brand-deep">{p.category}</span>
                  <span className="text-mute">{formatDate(p.date)}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight group-hover:text-brand-deep">{p.title}</h3>
                <p className="mt-3 flex-1 text-mute">{p.excerpt}</p>
                <p className="mt-6 text-sm font-bold uppercase tracking-wider">Read more →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-16 text-white sm:px-16 sm:py-20">
          <PhotoBackdrop src="/images/stadium-crowd.jpg" />
          <h2 className="relative max-w-3xl font-display text-5xl uppercase leading-none sm:text-7xl">Ready for your next move?</h2>
          <p className="relative mt-6 max-w-xl text-lg text-white/80">
            Whether you are a player looking for representation or a club searching for talent, let&apos;s talk.
          </p>
          <div className="relative mt-10">
            <ButtonLink href="/contact" variant="light">Start the conversation →</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
