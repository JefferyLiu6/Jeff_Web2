"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/work", label: "Work", match: "/work" },
  { href: "/how-i-work", label: "How I work", match: "/how-i-work" },
  { href: "/#background", label: "Background" },
  { href: "/#contact", label: "Contact" },
];

/** Main navigation. The link for the page you are on is marked for sight and for screen readers. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((l) => {
        const current = l.match ? pathname === l.match || pathname.startsWith(`${l.match}/`) : false;
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={current ? "page" : undefined}
            className={`py-3 ${current ? "font-semibold underline decoration-accent decoration-2 underline-offset-[6px]" : "no-underline"}`}
          >
            {l.label}
          </Link>
        );
      })}
    </>
  );
}
