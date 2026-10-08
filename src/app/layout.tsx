import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company, siteUrl } from "@/lib/data";
import "./globals.css";

const poppins = Poppins({ weight: ["300", "400", "500", "600", "700", "800"], subsets: ["latin"], variable: "--font-poppins" });

const description =
  "Zollgate Agency represents, develops and protects ambitious footballers, from first contract to final whistle.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Zollgate Agency | Football Player Representation", template: "%s | Zollgate Agency" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Zollgate Agency",
    locale: "en_GB",
    title: "Zollgate Agency | Football Player Representation",
    description,
  },
  twitter: { card: "summary_large_image" },
};

// Structured data: tells Google the site name, organisation and contact details shown in search results.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Zollgate Agency",
      alternateName: "Zollgate",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SportsOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "Zollgate Agency",
      url: siteUrl,
      logo: `${siteUrl}/brand/logo-dark.png`,
      description,
      sport: "Soccer",
      email: company.email,
      telephone: company.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.street,
        postalCode: company.city.split(" ")[0],
        addressLocality: company.city.split(" ").slice(1).join(" "),
        addressCountry: "DE",
      },
      parentOrganization: { "@type": "Organization", name: "Zollgate", url: company.parentUrl },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
