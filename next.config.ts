import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A fully static site: every page is built ahead of time.
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
