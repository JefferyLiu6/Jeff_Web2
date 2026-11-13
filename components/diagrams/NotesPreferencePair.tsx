import type { ReactNode } from "react";

const Bar = ({ width, flaw = false }: { width: string; flaw?: boolean }) => (
  <span className={`block h-2 rounded-full ${flaw ? "bg-accent/45" : "bg-rule-strong"}`} style={{ width }} />
);

const Bullet = ({ width, flaw = false }: { width: string; flaw?: boolean }) => (
  <span className="flex items-center gap-2.5">
    <span className={`size-1.5 shrink-0 rounded-full ${flaw ? "bg-accent/70" : "bg-muted"}`} />
    <Bar width={width} flaw={flaw} />
  </span>
);

const Part = ({ name, children }: { name: string; children: ReactNode }) => (
  <div className="flex flex-col gap-2">
    <span className="text-label font-semibold text-body-colour">{name}</span>
    {children}
  </div>
);

const Flaw = ({ children }: { children: string }) => (
  <span className="text-label font-semibold text-accent">{children}</span>
);

/** The note, drawn as placeholder lines. With `flawed`, it carries the planted mistakes. */
function Completion({ flawed = false }: { flawed?: boolean }) {
  return (
    <div className="flex flex-col gap-4 rounded-b bg-tint p-5">
      <Part name="Summary">
        <Bar width="100%" />
        <Bar width="64%" />
      </Part>
      <Part name="Key points">
        <Bullet width="84%" />
        <Bullet width="62%" />
        <Bullet width="74%" />
        {flawed && (
          <>
            <Bullet width="52%" flaw />
            <Flaw>A fourth bullet</Flaw>
          </>
        )}
      </Part>
      <Part name="Limitation">
        <Bar width="78%" />
      </Part>
      <Part name="Follow-up question">
        <Bar width="58%" />
      </Part>
      {flawed && (
        <div className="flex flex-col gap-2 border-t border-dashed border-accent/60 pt-3">
          <Bar width="88%" flaw />
          <Bar width="46%" flaw />
          <Flaw>Text after the last section</Flaw>
        </div>
      )}
    </div>
  );
}

/** One DPO training example: a prompt with a preferred completion and a rejected one. */
export function NotesPreferencePair() {
  return (
    <div className="flex flex-col">
      <div className="rounded bg-ink px-5 py-3 text-white">
        <span className="font-semibold">Prompt</span>
        <span className="text-white/85"> · the same ML concept or abstract for both completions</span>
      </div>
      <div className="grid gap-x-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <span aria-hidden="true" className="mx-auto h-4 w-px bg-ink" />
          <div className="rounded-t border-t-2 border-ink bg-tint px-5 pt-4">
            <div className="font-semibold">Chosen</div>
            <div className="text-meta text-muted">The correct note. Its likelihood goes up.</div>
          </div>
          <Completion />
        </div>
        <div className="flex flex-col">
          <span aria-hidden="true" className="mx-auto h-4 w-px bg-ink" />
          <div className="rounded-t border-t-2 border-accent bg-tint px-5 pt-4">
            <div className="font-semibold">Rejected</div>
            <div className="text-meta text-muted">The same note with a planted flaw. Its likelihood goes down.</div>
          </div>
          <Completion flawed />
        </div>
      </div>
    </div>
  );
}
