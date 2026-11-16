import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Fraunces, Geist_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo";
import { AUTHOR, SITE } from "@/lib/constants";
import { isPreviewDeployment } from "@/lib/seo/environment";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  // Metric labels and technical annotations sit below the first viewport;
  // avoid competing with the body/display fonts for the initial preload.
  preload: false,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// Editorial display face for headings; the second (and last) preloaded font.
// A single static weight keeps the file about half the size of the variable font.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

// Decorative CJK display glyphs (命理, 龍, 八字 ...). An 8 KB subset of Noto Serif SC
// Black (SIL OFL) holding only the ~30 glyphs the UI draws, so no full CJK font
// ships. Add a glyph to the subset before using a new one in .atlas-hanzi.
const hanzi = localFont({
  src: "./fonts/atlas-hanzi.woff2",
  variable: "--font-hanzi",
  weight: "900",
  display: "swap",
  preload: false,
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
    index: !isPreviewDeployment,
    follow: !isPreviewDeployment,
    googleBot: {
      index: !isPreviewDeployment,
      follow: !isPreviewDeployment,
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
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${fraunces.variable} ${hanzi.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} RSS Feed`}
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="text/plain"
          title={`${SITE.name} LLM Context`}
          href="/llms.txt"
        />
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
      <body className="bg-paper text-ink-950 dark:bg-ink-950 dark:text-paper flex min-h-full flex-col">
        <a
          href="#main-content"
          className="bg-ink-950 fixed top-3 left-4 z-[100] -translate-y-24 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <ScrollDepthTracker />
        {isVercelDeployment ? <Analytics /> : null}
        {isVercelDeployment ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
