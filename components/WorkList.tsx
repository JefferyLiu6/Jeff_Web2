"use client";

import { useState } from "react";
import Link from "next/link";

export type WorkItem = {
  slug: string;
  title: string;
  area: string;
  year: string;
  summary: string;
  result: string;
  stack?: string[];
  code?: string;
  demo?: string;
  hasCaseStudy: boolean;
  private: boolean;
};

/** The area that matches the site's positioning. It is listed first, under its own heading. */
const PRIMARY = "AI agents";

function Row({ p }: { p: WorkItem }) {
  return (
    <article className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-rule py-8">
      <div className="flex flex-[0_0_130px] flex-col gap-0.5 text-meta text-muted">
        <span>{p.year}</span>
        <span>{p.area}</span>
      </div>
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2">
        <h3 className="font-serif text-title font-medium leading-[1.1] tracking-[-0.01em] text-balance">{p.title}</h3>
        <p className="text-body text-body-colour">{p.summary}</p>
        <p className="text-meta font-medium">{p.result}</p>
        {p.stack && <p className="text-meta text-muted">{p.stack.join(", ")}</p>}
      </div>
      <div className="flex flex-none flex-wrap gap-x-6 text-meta">
        {p.hasCaseStudy && (
          <Link href={`/work/${p.slug}`} className="link" aria-label={`Case study: ${p.title}`}>
            Case study
          </Link>
        )}
        {p.demo && (
          <a href={p.demo} className="link" aria-label={`Demo of ${p.title}`}>
            Demo
          </a>
        )}
        {p.code && (
          <a href={p.code} className="link" aria-label={`Code for ${p.title}`}>
            Code
          </a>
        )}
        {p.private && !p.code && <span className="py-3 text-muted">Private code</span>}
      </div>
    </article>
  );
}

export function WorkList({ items, areas }: { items: WorkItem[]; areas: readonly string[] }) {
  const [area, setArea] = useState("All");
  const used = areas.filter((a) => items.some((i) => i.area === a));
  const shown = items.filter((i) => area === "All" || i.area === area);
  const primary = shown.filter((i) => i.area === PRIMARY);
  const other = shown.filter((i) => i.area !== PRIMARY);

  return (
    <>
      <div role="group" aria-label="Filter work by area" className="flex flex-wrap gap-3 pb-6">
        {["All", ...used].map((a) => {
          const active = a === area;
          return (
            <button
              key={a}
              type="button"
              aria-pressed={active}
              onClick={() => setArea(a)}
              className={`min-h-11 cursor-pointer rounded-full border px-5 text-meta font-medium transition-[opacity,scale] duration-150 ease-out hover:opacity-85 active:scale-[0.96] motion-reduce:active:scale-100 ${
                active ? "border-ink bg-ink text-white" : "border-[#8a9099] bg-white text-ink"
              }`}
            >
              {a}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length === 1 ? "1 project shown" : `${shown.length} projects shown`}
      </p>

      <div className="mb-20 flex flex-col gap-14">
        {primary.length > 0 && (
          <section aria-labelledby="primary-h">
            <h2 id="primary-h" className="label border-t-2 border-ink pt-5 text-ink">
              AI agents and LLM systems
            </h2>
            {primary.map((p) => (
              <Row key={p.slug} p={p} />
            ))}
          </section>
        )}
        {other.length > 0 && (
          <section aria-labelledby="other-h">
            <h2 id="other-h" className="label border-t-2 border-ink pt-5 text-ink">
              Other engineering and data work
            </h2>
            {other.map((p) => (
              <Row key={p.slug} p={p} />
            ))}
          </section>
        )}
      </div>
    </>
  );
}
