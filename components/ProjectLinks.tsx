import Link from "next/link";
import type { Project } from "@/lib/projects";

/** Only links that exist are shown, so the site never has a dead link. */
export function ProjectLinks({ project, long = false }: { project: Project; long?: boolean }) {
  const p = project;
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1 text-meta">
      {p.hasCaseStudy && (
        <Link href={`/work/${p.slug}`} className="link">
          {long ? "Read the case study" : "Case study"}
        </Link>
      )}
      {!p.hasCaseStudy && p.results && long && (
        <a href={p.results} className="link">
          Read the test results
        </a>
      )}
      {p.demo && (
        <a href={p.demo} className="link">
          {long ? "Try the demo" : "Demo"}
        </a>
      )}
      {p.code && (
        <a href={p.code} className="link">
          {long ? (p.codeLabel ?? "Code") : "Code"}
        </a>
      )}
      {p.private && !p.code && <span className="py-3 text-muted">Private code</span>}
    </div>
  );
}
