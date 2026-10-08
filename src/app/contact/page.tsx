import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd, PageHero } from "@/components/ui";
import { company } from "@/lib/data";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Zollgate Agency in Lindau am Bodensee. Players, parents and clubs can reach our agents by email, phone or the enquiry form.",
  path: "/contact",
  keywords: ["contact football agent", "football agency Germany", "Zollgate Agency contact", "Lindau"],
});

const details: [string, React.ReactNode][] = [
  ["Email", <a key="e" className="hover:text-brand-deep" href={`mailto:${company.email}`}>{company.email}</a>],
  ["Phone", <a key="p" className="hover:text-brand-deep" href={company.phoneHref}>{company.phone}</a>],
  ["Office", <>{company.street}<br />{company.city}</>],
  ["Hours", "Mon–Fri, 9:00–18:00 CET"],
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbs({ name: "Contact", path: "/contact" })} />
      <PageHero
        eyebrow="Contact"
        title="Let's talk football"
        text="Players, parents, coaches and clubs: tell us a bit about yourself and we'll get back to you within two working days."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <dl className="space-y-6">
          {details.map(([k, v]) => (
            <div key={k} className="border-b border-line pb-6">
              <dt className="text-xs font-bold uppercase tracking-widest text-brand-deep">{k}</dt>
              <dd className="mt-2 break-words font-display text-xl">{v}</dd>
            </div>
          ))}
        </dl>
        <Suspense>
          <ContactForm />
        </Suspense>
      </section>
    </>
  );
}
