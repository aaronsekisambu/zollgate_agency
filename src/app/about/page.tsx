import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, PageHero, SectionHeading } from "@/components/ui";
import { company } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

const values = [
  { title: "Player first", text: "Every decision starts with what is best for the player's long-term career, not the next commission." },
  { title: "Transparency", text: "Clear fees, clear contracts and honest advice, even when it is not what someone wants to hear." },
  { title: "Long game", text: "We build relationships that last a whole career and beyond, not a single transfer window." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built for players"
        text="Zollgate Agency represents footballers who want more from their careers: more personal guidance, more honest advice and a real focus on development."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-navy shadow-xl shadow-navy/10">
          <Image src="/images/stadium-aerial.jpg" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <SectionHeading eyebrow="Who we are" title={<>Part of <span className="text-brand-deep">Zollgate</span></>} />
          <div className="mt-6 space-y-4 text-lg text-mute">
            <p>
              Zollgate Agency is the football division of{" "}
              <a href={company.parentUrl} target="_blank" rel="noopener" className="font-semibold text-brand-deep hover:underline">
                Zollgate
              </a>
              , based in {company.city.replace(/^\d+\s/, "")}, {company.country}.
            </p>
            <p>
              We work with players at every stage, from talented young players taking their first steps in senior football to established professionals planning their next move. Our job is to find the right club, negotiate the right contract and support the player and their family along the way.
            </p>
            <p>
              We keep our roster deliberately small, so every player gets real attention and a clear plan for their development.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/players">Meet our players</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Work with us</ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-pitch py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Our values" title={<>What we <span className="text-brand-deep">stand for</span></>} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-white p-8">
                <h3 className="font-display text-3xl uppercase text-navy">{v.title}</h3>
                <p className="mt-3 text-mute">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
