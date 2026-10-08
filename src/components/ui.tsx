import Image from "next/image";
import Link from "next/link";
import type { Player } from "@/lib/data";

export function Eyebrow({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] ${
        onDark ? "text-brand" : "text-brand-deep"
      }`}
    >
      <span className="h-px w-8 bg-brand" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center [&>p:first-child]:justify-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl lg:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-lg text-mute">{text}</p>}
    </div>
  );
}

const buttonStyles = {
  primary: "bg-navy text-white hover:bg-brand-deep",
  ghost: "border border-ink/20 text-ink hover:border-navy hover:bg-navy hover:text-white",
  light: "bg-white text-navy hover:bg-brand hover:text-white",
  ghostLight: "border border-white/40 text-white hover:border-white hover:bg-white hover:text-navy",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof buttonStyles;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition ${buttonStyles[variant]}`}
    >
      {children}
    </Link>
  );
}

/** Full-bleed stadium photo under a navy overlay; header text sits on it in white. */
export function PhotoBackdrop({ src, priority, className = "" }: { src: string; priority?: boolean; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Image src={src} alt="" fill priority={priority} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/45" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/60 to-transparent" />
    </div>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-36 text-white sm:pb-24 sm:pt-44">
      <PhotoBackdrop src="/images/stadium-banner.jpg" priority />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Eyebrow onDark>{eyebrow}</Eyebrow>
        <h1 className="font-display text-4xl uppercase leading-none sm:text-6xl lg:text-7xl">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg text-white/80">{text}</p>}
      </div>
    </section>
  );
}

/** Player photo, or a brand-gradient placeholder with the shirt number when there is none. */
export function PlayerPortrait({
  player,
  className = "",
  priority,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  player: Player;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (player.photo) {
    return (
      <div className={`relative overflow-hidden bg-navy ${className}`}>
        <Image src={player.photo} alt={player.name} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: "linear-gradient(160deg, #3a63b8 0%, #1a2b6d 60%, #0b1a4a 100%)" }}
    >
      {player.number !== undefined && (
        <span className="absolute -right-2 -top-6 font-display text-[11rem] leading-none text-white/10 select-none">
          {player.number}
        </span>
      )}
      <svg viewBox="0 0 200 220" className="absolute bottom-0 left-1/2 h-[85%] -translate-x-1/2 text-white/10" aria-hidden>
        <circle cx="100" cy="62" r="38" fill="currentColor" />
        <path d="M20 220c0-55 36-95 80-95s80 40 80 95z" fill="currentColor" />
      </svg>
    </div>
  );
}

export function PlayerCard({ player }: { player: Player }) {
  const label = player.role ?? player.position;
  const subtitle = [player.club, player.nationality].filter(Boolean).join(" · ");
  const isGk = player.position === "Goalkeeper";
  return (
    <Link
      href={`/players/${player.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
    >
      <PlayerPortrait player={player} className="aspect-[4/5]" />
      <div className="flex flex-1 flex-col p-5">
        {label && (
          <span className="self-start rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-deep">
            {label}
          </span>
        )}
        <h3 className="mt-3 font-display text-2xl uppercase leading-tight group-hover:text-brand-deep">{player.name}</h3>
        <p className="text-sm text-mute">{subtitle || "Full profile coming soon"}</p>
        {player.stats ? (
          <div className="mt-4 grid grid-cols-3 border-t border-line pt-4 text-center">
            <Stat label="Age" value={player.age ?? "–"} />
            <Stat label="Apps" value={player.stats.apps} />
            <Stat label={isGk ? "Clean" : "Goals"} value={isGk ? player.stats.cleanSheets ?? 0 : player.stats.goals} />
          </div>
        ) : (
          player.videos && (
            <p className="mt-4 border-t border-line pt-4 text-sm font-semibold text-brand-deep">▶ Watch highlights</p>
          )
        )}
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <div className="font-display text-xl">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-mute">{label}</div>
    </div>
  );
}

export function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    handshake: <path d="M3 12l4-4 4 3 3-3 7 7-4 4-3-3-3 3-3-3-2 2zM7 8l-4 4" />,
    scope: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </>
    ),
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
    shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
    spark: <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />,
    home: <path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" />,
  };
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}
