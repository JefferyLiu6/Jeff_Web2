import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ProjectLinks } from "./ProjectLinks";
import { Stat } from "./Stat";

/** A featured project on the home page. */
export function ProjectBlock({ project, index, last }: { project: Project; index: number; last: boolean }) {
  const p = project;
  return (
    <article className={`flex flex-wrap gap-x-14 gap-y-10 py-12 ${last ? "" : "border-b border-rule"}`}>
      <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-4">
        <div className="flex items-baseline gap-5">
          <span className="font-serif text-lede text-accent">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="display text-display-md tracking-[-0.02em]">{p.title}</h3>
        </div>
        <p className="text-pretty font-serif text-lede leading-[1.3]">{p.summary}</p>
        <p className="max-w-[60ch] text-body text-body-colour">{p.detail}</p>
        {p.stack && (
          <p className="text-meta text-muted">
            <span className="font-semibold text-ink">Built with:</span> {p.stack.join(", ")}
          </p>
        )}
        {p.stat && (
          <div className="max-w-[420px]">
            <Stat {...p.stat} />
          </div>
        )}
        <ProjectLinks project={p} long />
      </div>
      {p.image && (
        <figure className="flex min-w-0 flex-[1.7_1_460px] flex-col gap-3 self-start">
          {/* Every screenshot gets the same 3:2 mat and inset, so different apps look like one set. */}
          <a
            href={p.image.src}
            aria-label={`Open the ${p.title} screenshot at full size`}
            className="relative block aspect-[3/2] rounded bg-tint"
          >
            <div className="absolute inset-x-[4.5%] inset-y-[4.5%] overflow-hidden rounded bg-white shadow-[0_8px_24px_rgba(22,24,29,0.10)] outline outline-1 -outline-offset-1 outline-black/10">
              <Image
                src={p.image.src}
                alt={p.image.alt}
                fill
                sizes="(min-width: 1000px) 620px, 100vw"
                quality={90}
                className="object-cover object-top"
                priority={index === 0}
              />
            </div>
          </a>
          {p.image.caption && <figcaption className="text-meta text-muted">{p.image.caption}</figcaption>}
        </figure>
      )}
      {!p.image && p.steps && (
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-5 self-start rounded bg-tint p-8">
          <h4 className="label">How it works</h4>
          <ol className="flex flex-col gap-4 font-serif text-step leading-[1.35]">
            {p.steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="text-accent" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </article>
  );
}
