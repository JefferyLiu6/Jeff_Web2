import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/lib/site";
import { Masthead } from "@/components/Masthead";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website" },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Masthead />
        <main id="main">{children}</main>
        <footer className="container-page pb-14 pt-8">
          <p className="text-meta text-muted">{site.name} · Toronto</p>
        </footer>
      </body>
    </html>
  );
}
