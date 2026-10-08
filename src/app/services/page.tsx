import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Icon, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { services, siteUrl, steps } from "@/lib/data";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Player representation, contract negotiation, scouting, career development, legal support, media and relocation services for professional footballers.",
  path: "/services",
  keywords: ["player representation", "contract negotiation", "football scouting", "career development", "football agent services"],
});

const servicesLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Zollgate Agency services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.text,
      image: `${siteUrl}${s.image}`,
      provider: { "@id": `${siteUrl}/#organization` },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbs({ name: "Services", path: "/services" }), servicesLd]} />
      <PageHero
        eyebrow="Services"
        title="Everything a career needs"
        text="From the first professional contract to life after football, we cover the details so players can focus on performing."
      />

      <section className="mx-auto max-w-7xl space-y-20 px-4 py-24 sm:px-6 lg:space-y-28">
        {services.map((s, i) => (
          <article key={s.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-navy shadow-xl shadow-navy/10 ${i % 2 ? "lg:order-2" : ""}`}>
              <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy text-white">
                  <Icon name={s.icon} />
                </span>
                <span className="font-display text-5xl text-ink/10">0{i + 1}</span>
              </div>
              <h2 className="mt-6 font-display text-4xl uppercase leading-tight sm:text-5xl">{s.title}</h2>
              <p className="mt-5 max-w-lg text-lg text-mute">{s.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="border-y border-line bg-pitch py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="For clubs" title={<>Recruit with <span className="text-brand-deep">confidence</span></>} />
            <p className="mt-6 text-mute">
              Sporting directors and recruitment teams work with us to find players who fit their tactical system, budget and culture. We share full scouting dossiers, video and data, and handle negotiations transparently.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact">Talk to our club team</ButtonLink>
            </div>
          </div>
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-2xl border border-line bg-white p-6">
                <span className="font-display text-4xl text-brand-deep">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl uppercase">{s.title}</h3>
                  <p className="mt-1 text-mute">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
