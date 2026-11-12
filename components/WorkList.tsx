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
  code?: string;
  demo?: string;
  hasCaseStudy: boolean;
  private: boolean;
};

export function WorkList({ items, areas }: { items: WorkItem[]; areas: readonly string[] }) {
  const [area, setArea] = useState("All");
  const used = areas.filter((a) => items.some((i) => i.area === a));
  const shown = items.filter((i) => area === "All" || i.area === area);

  return (
    <>
      <div role="group" aria-label="Filter work by area" className="flex flex-wrap gap-2.5 pb-6">
        {["All", ...used].map((a) => {
          const active = a === area;
          return (
            <button
              key={a}
              type="button"
              aria-pressed={active}
              onClick={() => setArea(a)}
              className={`min-h-11 cursor-pointer rounded-full border px-5 text-meta font-medium transition-opacity duration-150 hover:opacity-85 active:opacity-70 ${
                active ? "border-ink bg-ink text-white" : "border-[#8a9099] bg-white text-ink"
              }`}
            >
              {a}
            </button>
          );
        })}
      </div>

      <div className="mb-20 border-t-2 border-ink" aria-live="polite">
        {shown.map((p) => (
          <article key={p.slug} className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-rule py-8">
            <div className="flex flex-[0_0_130px] flex-col gap-0.5 text-meta text-muted">
              <span>{p.year}</span>
              <span>{p.area}</span>
            </div>
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2">
              <h2 className="font-serif text-[2rem] font-medium leading-[1.1] tracking-[-0.01em]">{p.title}</h2>
              <p className="text-body text-body-colour">{p.summary}</p>
              <p className="text-meta font-medium">{p.result}</p>
            </div>
            <div className="flex flex-none flex-wrap gap-x-5 text-meta">
              {p.hasCaseStudy && (
                <Link href={`/work/${p.slug}`} className="link">
                  Case study
                </Link>
              )}
              {p.demo && (
                <a href={p.demo} className="link">
                  Demo
                </a>
              )}
              {p.code && (
                <a href={p.code} className="link">
                  Code
                </a>
              )}
              {p.private && !p.code && <span className="py-3 text-muted">Private code</span>}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
