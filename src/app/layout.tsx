import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({ weight: ["300", "400", "500", "600", "700", "800"], subsets: ["latin"], variable: "--font-poppins" });

const description =
  "Zollgate Agency represents, develops and protects ambitious footballers, from first contract to final whistle.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zollgate.de"),
  title: { default: "Zollgate Agency | Football Player Representation", template: "%s | Zollgate Agency" },
  description,
  openGraph: {
    type: "website",
    siteName: "Zollgate Agency",
    locale: "en_GB",
    title: "Zollgate Agency | Football Player Representation",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
