import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFeatured } from "@/lib/projects";
import { ProjectBlock } from "@/components/ProjectBlock";

export default function Home() {
  const featured = getFeatured();
  const facts = [...site.facts, ...(site.available ? [{ label: "Available", value: site.available }] : [])];

  return (
    <>
      <section className="container-page flex flex-col gap-12 pb-18 pt-16">
        <h1 className="display max-w-[1000px] text-[clamp(2.75rem,8vw,6.5rem)]">
          {site.headline.before}
          <em className="text-accent">{site.headline.emphasis}</em>
          {site.headline.after}
        </h1>
        {/* Facts come first in the markup so they sit under the headline on a phone. */}
        <div className="flex flex-row-reverse flex-wrap items-start gap-x-16 gap-y-10">
          <dl className="flex min-w-0 flex-[1_1_300px] flex-col border-t-2 border-ink">
            {facts.map((f) => (
              <div key={f.label} className="border-b border-rule py-3">
                <dt className="label">{f.label}</dt>
                <dd className="mt-1 text-body font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex min-w-0 flex-[1.6_1_420px] flex-col gap-6">
            <div className="flex flex-wrap items-start gap-6">
              {site.portraitSrc && (
                <Image
                  src={site.portraitSrc}
                  alt={`Portrait of ${site.name}`}
                  width={120}
                  height={150}
                  className="h-[150px] w-[120px] flex-none rounded object-cover"
                  priority
                />
              )}
              <p className="min-w-0 flex-[1_1_260px] font-serif text-lede leading-[1.35]">{site.intro}</p>
            </div>
            <p className="max-w-[62ch] text-body text-body-colour">{site.introMore}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-body">
              <a href="#work" className="btn-accent">
                See my work
              </a>
              <a href={site.linkedin} className="link">
                LinkedIn
              </a>
              <a href={site.github} className="link">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="work" aria-labelledby="work-h" className="container-page scroll-mt-6 pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-ink pt-5">
          <h2 id="work-h" className="label text-ink">
            Selected work
          </h2>
          <Link href="/work" className="link text-meta">
            All work
          </Link>
        </div>
        {featured.map((p, i) => (
          <ProjectBlock key={p.slug} project={p} index={i} last={i === featured.length - 1} />
        ))}
      </section>

      <section aria-label="A principle I work by" className="bg-accent text-white">
        <div className="container-page flex flex-col gap-6 py-24">
          <p className="display max-w-[940px] text-[clamp(1.875rem,4.6vw,3.5rem)] leading-[1.12] tracking-[-0.02em]">
            {site.quote.text}
          </p>
          <p className="max-w-[56ch] text-body">{site.quote.note}</p>
        </div>
      </section>

      <section id="how" aria-labelledby="how-h" className="container-page scroll-mt-6 pb-18 pt-24">
        <h2 id="how-h" className="display mb-10 text-[clamp(2rem,4.4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
          How I work
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-10">
          {site.principles.map((p) => (
            <div key={p.title} className="flex flex-col gap-2.5 border-t-2 border-ink pt-4">
              <h3 className="font-serif text-lede font-medium leading-[1.25]">{p.title}</h3>
              <p className="text-body text-body-colour">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="background" aria-labelledby="bg-h" className="scroll-mt-6 bg-tint">
        <div className="container-page py-20">
          <h2 id="bg-h" className="display mb-7 text-[clamp(2rem,4.4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            Background
          </h2>
          <ul className="border-b border-rule-strong">
            {site.background.map((b, i) => (
              <li
                key={b.role}
                className={`flex flex-wrap gap-x-8 gap-y-1 border-t py-4 ${i === 0 ? "border-ink" : "border-rule-strong"}`}
              >
                <span
                  className={`flex-[0_0_130px] text-meta ${"current" in b && b.current ? "font-semibold text-accent" : "text-muted"}`}
                >
                  {b.when}
                </span>
                <span className="min-w-0 flex-[1_1_300px] font-semibold">{b.role}</span>
                <span className="min-w-0 flex-[1_1_300px] text-meta text-body-colour">{b.where}</span>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-14 gap-y-10 pt-12">
            <div>
              <h3 className="label mb-3 text-ink">Education</h3>
              {site.education.map((e) => (
                <p key={e.school} className="mb-2.5 text-body">
                  <span className="font-semibold">{e.school}</span> {e.detail}
                </p>
              ))}
            </div>
            <div>
              <h3 className="label mb-3 text-ink">Publications</h3>
              {site.publications.map((p) => (
                <p key={p.title} className="mb-2.5 text-body">
                  {p.title} <span className="text-muted">{p.venue}</span>{" "}
                  {p.doi && (
                    <a href={p.doi} className="underline">
                      DOI
                    </a>
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="ct-h" className="container-page scroll-mt-6 pb-6 pt-24">
        <h2 id="ct-h" className="display mb-10 text-[clamp(2.25rem,6vw,4.5rem)]">
          Let&rsquo;s talk.
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-8">
          <div className="flex flex-col gap-3.5 rounded border border-ink p-8">
            <h3 className="font-serif text-lede font-medium">{site.contact.recruiter.title}</h3>
            <p className="text-body text-body-colour">{site.contact.recruiter.text}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-body">
              {site.resumeHref && (
                <a href={site.resumeHref} className="btn-ink">
                  Download resume
                </a>
              )}
              {site.email && (
                <a href={`mailto:${site.email}`} className="link">
                  Email me
                </a>
              )}
              <a href={site.linkedin} className="link">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3.5 rounded border border-ink p-8">
            <h3 className="font-serif text-lede font-medium">{site.contact.collaborate.title}</h3>
            <p className="text-body text-body-colour">{site.contact.collaborate.text}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-body">
              {site.email && (
                <a href={`mailto:${site.email}`} className="link">
                  Get in touch
                </a>
              )}
              <a href={site.github} className="link">
                GitHub
              </a>
              <Link href="/work" className="link">
                All work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
