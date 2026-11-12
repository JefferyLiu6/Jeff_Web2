import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A fully static site: every page is built ahead of time.
  // Screenshots are served at quality 90 so interface text stays crisp.
  images: { qualities: [75, 90] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
