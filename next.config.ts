import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://plausible.io https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://plausible.io https://*.google-analytics.com https://www.google-analytics.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/bazi/free-calculator",
        destination: "https://mingliatlas.com/tools/bazi-calculator",
        permanent: true,
      },
      {
        source: "/blog/what-is-bazi",
        destination: "https://mingliatlas.com/bazi/what-is-bazi",
        permanent: true,
      },
      {
        source: "/chinese-zodiac/compatibility",
        destination: "https://mingliatlas.com/blog/chinese-zodiac-compatibility-chart",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.mingliatlas.com",
          },
        ],
        destination: "https://mingliatlas.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
