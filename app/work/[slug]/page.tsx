import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { getProject, getProjects } from "@/lib/projects";
import { Stat } from "@/components/Stat";

export function generateStaticParams() {
  return getProjects()
    .filter((p) => p.hasCaseStudy)
    .map((p) => ({ slug: p.slug }));
}

// Only the case studies that exist are served; anything else is a real 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !p.hasCaseStudy) notFound();

  return (
    <article className="container-page">
      <header className="flex flex-col gap-6 pb-10 pt-16">
        {p.kicker && <p className="label text-accent">{p.kicker}</p>}
        <h1 className="display text-display-xl">{p.title}</h1>
        <p className="max-w-[760px] font-serif text-lede-lg text-pretty">
          {p.lede ?? p.summary}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-body">
          {p.demo && (
            <a href={p.demo} className="btn-accent">
              Try the demo
            </a>
          )}
          {p.code && (
            <a href={p.code} className="link">
              {p.codeLabel ?? "Code"}
            </a>
          )}
        </div>
      </header>

      {p.meta && (
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 gap-y-5 border-b border-t-2 border-b-rule border-t-ink py-6">
          {p.meta.map((m) => (
            <div key={m.label}>
              <dt className="label">{m.label}</dt>
              <dd className="mt-1 font-medium">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="flex max-w-[640px] flex-col gap-16 pb-18 pt-16">
        <div className="case-body flex flex-col gap-5">
          <Markdown
            components={{
              h2: (props) => (
                <h2 className="mt-11 font-serif text-stat font-medium leading-[1.1] tracking-[-0.02em] first:mt-0" {...props} />
              ),
              p: (props) => <p className="text-body text-body-colour" {...props} />,
              ol: (props) => <ol className="flex list-decimal flex-col gap-3 ps-6 text-body text-body-colour marker:font-serif marker:text-accent" {...props} />,
              ul: (props) => <ul className="flex list-disc flex-col gap-2 ps-5 text-body text-body-colour" {...props} />,
              strong: (props) => <strong className="font-semibold text-ink" {...props} />,
              a: (props) => <a className="underline" {...props} />,
              img: ({ src, alt }) => (
                // Screenshots inside a case study. Plain img keeps Markdown simple.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={typeof src === "string" ? src : undefined}
                  alt={alt ?? ""}
                  loading="lazy"
                  className="mt-2 block h-auto w-full rounded outline outline-1 -outline-offset-1 outline-black/10"
                />
              ),
            }}
          >
            {p.body}
          </Markdown>
        </div>

        {p.stats && (
          <section aria-labelledby="results-h" className="flex flex-col gap-6">
            <h2 id="results-h" className="font-serif text-stat font-medium leading-[1.1] tracking-[-0.02em]">
              Results
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-x-8 gap-y-6">
              {p.stats.map((s) => (
                <Stat key={s.caption} {...s} />
              ))}
            </div>
            {p.statsNote && <p className="text-meta text-muted">{p.statsNote}</p>}
          </section>
        )}

        {p.limits && (
          <section aria-labelledby="limits-h" className="flex flex-col gap-3.5 rounded bg-tint p-8">
            <h2 id="limits-h" className="font-serif text-lede font-medium leading-[1.15]">
              What this does not prove
            </h2>
            <ul className="flex list-disc flex-col gap-2 ps-5 text-body text-body-colour">
              {p.limits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <nav aria-label="Case study" className="flex flex-wrap justify-between gap-4 border-t-2 border-ink py-8 text-body">
        <Link href="/work" className="link">
          All work
        </Link>
        <Link href="/" className="link">
          Back to home
        </Link>
      </nav>
    </article>
  );
}
