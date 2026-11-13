import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { AREAS } from "@/lib/site";
import { WorkList } from "@/components/WorkList";

export const metadata: Metadata = {
  title: "All work",
  description: "Agent and LLM systems first, then other engineering and data work, each with one defensible result.",
};

export default function WorkPage() {
  const items = getProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    area: p.area,
    year: p.year,
    summary: p.summary,
    result: p.result,
    stack: p.stack,
    code: p.code,
    demo: p.demo,
    hasCaseStudy: p.hasCaseStudy,
    private: p.private,
  }));

  return (
    <div className="container-page">
      <header className="flex flex-col gap-5 pb-10 pt-14">
        <h1 className="display text-display-lg">All work</h1>
        <p className="max-w-[680px] text-pretty font-serif text-lede leading-[1.35]">
          Agent and LLM systems first, then the other engineering and data work that got me here. Each has the one result I&rsquo;d stand behind.
        </p>
      </header>
      <WorkList items={items} areas={AREAS} />
    </div>
  );
}
