import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { AREAS } from "@/lib/site";
import { WorkList } from "@/components/WorkList";

export const metadata: Metadata = {
  title: "All work",
  description: "Every project, most recent first, each with the one result I'd stand behind.",
};

export default function WorkPage() {
  const items = getProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    area: p.area,
    year: p.year,
    summary: p.summary,
    result: p.result,
    code: p.code,
    demo: p.demo,
    hasCaseStudy: p.hasCaseStudy,
    private: p.private,
  }));

  return (
    <div className="container-page">
      <header className="flex flex-col gap-5 pb-10 pt-14">
        <h1 className="display text-[clamp(2.75rem,7vw,5.5rem)]">All work</h1>
        <p className="max-w-[680px] font-serif text-lede leading-[1.35]">
          Everything I&rsquo;ve built, most recent first, each with the one result I&rsquo;d stand behind.
        </p>
      </header>
      <WorkList items={items} areas={AREAS} />
    </div>
  );
}
