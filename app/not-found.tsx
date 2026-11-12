import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-start gap-6 py-24">
      <p className="label text-accent">Page not found</p>
      <h1 className="display text-display-lg">Nothing here.</h1>
      <p className="max-w-[56ch] text-pretty font-serif text-lede leading-[1.35]">
        The page may have moved, or the link was mistyped.
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-body">
        <Link href="/" className="btn-ink">
          Go to the home page
        </Link>
        <Link href="/work" className="link">
          See all work
        </Link>
      </div>
    </div>
  );
}
