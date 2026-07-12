import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo";
import { AUTHOR, SITE } from "@/lib/constants";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const isVercelDeployment = process.env.VERCEL === "1";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Bazi",
    "Four Pillars of Destiny",
    "Ziwei Doushu",
    "Purple Star Astrology",
    "I Ching",
    "Book of Changes",
    "Feng Shui",
    "Chinese Zodiac",
    "Chinese metaphysics",
    "Eastern philosophy",
  ],
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${playfair.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <OrganizationSchema socialLinks={[
          "https://mingliatlas.com",
        ]} />
        <WebSiteSchema />
        <link rel="alternate" type="application/rss+xml" title={`${SITE.name} RSS Feed`} href="/rss.xml" />
        <link rel="alternate" type="text/plain" title={`${SITE.name} LLM Context`} href="/llms.txt" />
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink-950 dark:bg-ink-950 dark:text-paper">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollDepthTracker />
        {isVercelDeployment ? <Analytics /> : null}
        {isVercelDeployment ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
