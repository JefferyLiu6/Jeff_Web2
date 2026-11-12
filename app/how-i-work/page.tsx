import type { Metadata } from "next";
import Link from "next/link";
import { method } from "@/lib/method";

export const metadata: Metadata = {
  title: "How I work",
  description: "Seven practices I use to build AI agents that are safe to let act, each with a real example.",
};

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function HowIWork() {
  return (
    <div className="container-page">
      <header className="flex flex-col gap-6 pb-12 pt-14">
        <p className="label text-accent">Method</p>
        <h1 className="display text-[clamp(2.75rem,7vw,5.5rem)]">How I work</h1>
        <p className="max-w-[720px] font-serif text-lede leading-[1.35]">{method.lede}</p>
      </header>

      <nav aria-label="On this page" className="border-b border-t-2 border-b-rule border-t-ink py-6">
        <h2 className="label mb-3">The seven practices</h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-10">
          {method.practices.map((p, i) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="flex gap-4 py-2.5 text-body font-medium no-underline">
                <span className="font-serif text-accent">{num(i)}</span>
                <span className="underline">{p.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section aria-labelledby="loop-h" className="py-16">
        <h2 id="loop-h" className="display mb-8 text-[clamp(2rem,4.4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
          The order I work in
        </h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] gap-x-8 gap-y-8">
          {method.loop.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2 border-t-2 border-ink pt-4">
              <span className="font-serif text-lede text-accent">{i + 1}</span>
              <h3 className="font-serif text-step font-medium leading-[1.25]">{s.title}</h3>
              <p className="text-meta text-body-colour">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {method.practices.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          aria-labelledby={`${p.id}-h`}
          className="scroll-mt-6 border-t-2 border-ink py-14"
        >
          <div className="flex items-baseline gap-5">
            <span className="font-serif text-lede text-accent">{num(i)}</span>
            <h2 id={`${p.id}-h`} className="display text-[clamp(2rem,4.4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              {p.title}
            </h2>
          </div>
          <p className="mt-5 max-w-[760px] font-serif text-lede leading-[1.3]">{p.rule}</p>

          <div className="mt-10 flex flex-wrap gap-x-14 gap-y-10">
            <div className="flex min-w-0 flex-[1.2_1_400px] flex-col gap-8">
              <div>
                <h3 className="label mb-3">Why</h3>
                <p className="max-w-[62ch] text-body text-body-colour">{p.why}</p>
              </div>
              <div>
                <h3 className="label mb-3">What I do</h3>
                <ol className="flex max-w-[62ch] flex-col">
                  {p.steps.map((s, j) => (
                    <li key={s} className="flex gap-4 border-t border-rule py-3 text-body">
                      <span className="font-serif text-accent" aria-hidden="true">
                        {j + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-6 self-start">
              <div className="flex flex-col gap-3 rounded bg-tint p-8">
                <h3 className="label">From my work · {p.example.project}</h3>
                <p className="text-body text-body-colour">{p.example.text}</p>
                {p.example.href && (
                  <Link href={p.example.href} className="link self-start text-meta">
                    Read the case study
                  </Link>
                )}
              </div>
              <div className="border-t border-ink pt-4">
                <h3 className="label mb-2">The question I ask</h3>
                <p className="font-serif text-step leading-[1.35]">{p.ask}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <nav aria-label="Next" className="flex flex-wrap justify-between gap-4 border-t-2 border-ink py-8 text-body">
        <Link href="/work" className="link">
          See the work
        </Link>
        <Link href="/#contact" className="link">
          Get in touch
        </Link>
      </nav>
    </div>
  );
}
