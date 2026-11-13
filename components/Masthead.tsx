import Link from "next/link";
import { site } from "@/lib/site";
import { NavLinks } from "./NavLinks";

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
        className="flex flex-wrap gap-x-4 gap-y-1 max-[359px]:justify-between max-[359px]:gap-x-2 max-[359px]:text-[0.875rem] min-[420px]:gap-x-6 border-b border-t border-b-rule border-t-ink text-meta font-medium"
      >
        <NavLinks />
      </nav>
    </header>
  );
}
