import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/bazi/free-calculator",
        destination: "https://mingliatlas.com/tools/bazi-calculator",
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
