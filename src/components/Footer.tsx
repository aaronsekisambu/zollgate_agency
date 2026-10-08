import Link from "next/link";
import { company } from "@/lib/data";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo onDark />
          <p className="mt-5 max-w-sm text-white/70">
            A football agency for players with ambition. We represent, develop and protect talent from first contract to final whistle.
          </p>
          <p className="mt-4 text-sm text-white/70">
            Part of{" "}
            <a href={company.parentUrl} className="text-brand hover:underline" target="_blank" rel="noopener">
              Zollgate
            </a>
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg uppercase tracking-wide">Agency</h3>
          <ul className="mt-4 space-y-2 text-white/70">
            <li><Link className="hover:text-brand" href="/players">Players</Link></li>
            <li><Link className="hover:text-brand" href="/services">Services</Link></li>
            <li><Link className="hover:text-brand" href="/about">About us</Link></li>
            <li><Link className="hover:text-brand" href="/news">News</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg uppercase tracking-wide">Contact</h3>
          <ul className="mt-4 space-y-2 text-white/70">
            <li><a className="hover:text-brand" href={`mailto:${company.email}`}>{company.email}</a></li>
            <li><a className="hover:text-brand" href={company.phoneHref}>{company.phone}</a></li>
            <li>
              {company.street}
              <br />
              {company.city}
              <br />
              {company.country}
            </li>
            <li>
              <a className="hover:text-brand" href={company.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-white/70 sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Zollgate. All rights reserved.</p>
          <p className="flex gap-6">
            <a className="hover:text-brand" href={company.imprintUrl} target="_blank" rel="noopener">Imprint</a>
            <a className="hover:text-brand" href={company.privacyUrl} target="_blank" rel="noopener">Privacy policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
