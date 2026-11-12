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
          <h3 className="display text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.02em]">{p.title}</h3>
        </div>
        <p className="font-serif text-lede leading-[1.3]">{p.summary}</p>
        <p className="max-w-[60ch] text-body text-body-colour">{p.detail}</p>
        {p.stat && (
          <div className="max-w-[420px]">
            <Stat {...p.stat} />
          </div>
        )}
        <ProjectLinks project={p} long />
      </div>
      {p.image && (
        <figure className="min-w-0 flex-[1.7_1_460px] self-start overflow-hidden rounded border border-rule-strong bg-tint">
          <Image
            src={p.image.src}
            alt={p.image.alt}
            width={p.image.width}
            height={p.image.height}
            sizes="(min-width: 1000px) 660px, 100vw"
            className="block h-auto w-full"
            priority={index === 0}
          />
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
