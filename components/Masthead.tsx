import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/how-i-work", label: "How I work" },
  { href: "/#background", label: "Background" },
  { href: "/#contact", label: "Contact" },
];

export function Masthead() {
  return (
    <header className="container-page">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pb-4 pt-6">
        <Link href="/" className="inline-block py-1.5 font-serif text-lede font-semibold no-underline">
          {site.name}
        </Link>
        {site.resumeHref && (
          <a href={site.resumeHref} className="btn-ink whitespace-nowrap text-meta">
            Download resume
          </a>
        )}
      </div>
      <nav
        aria-label="Main"
        className="flex flex-wrap gap-x-5 gap-y-1 border-b border-t border-b-rule border-t-ink text-meta font-medium"
      >
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="py-3 no-underline">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
