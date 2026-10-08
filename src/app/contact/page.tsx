import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui";
import { company } from "@/lib/data";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

const details: [string, React.ReactNode][] = [
  ["Email", <a key="e" className="hover:text-brand-deep" href={`mailto:${company.email}`}>{company.email}</a>],
  ["Phone", <a key="p" className="hover:text-brand-deep" href={company.phoneHref}>{company.phone}</a>],
  ["Office", <>{company.street}<br />{company.city}</>],
  ["Hours", "Mon–Fri, 9:00–18:00 CET"],
];

export default function ContactPage() {
  return (
    <>
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
