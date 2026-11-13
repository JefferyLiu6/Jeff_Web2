/** A system drawn as a chain of stages. Wraps to a column on narrow screens. */
export function Flow({ steps }: { steps: { who: string; does: string }[] }) {
  return (
    <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] gap-3">
      {steps.map((s, i) => (
        <li key={s.who} className="relative flex flex-col gap-1.5 rounded bg-tint p-4">
          <span className="flex items-baseline gap-2">
            <span className="font-serif text-step text-accent" aria-hidden="true">
              {i + 1}
            </span>
            <span className="font-semibold">{s.who}</span>
          </span>
          <span className="text-meta text-body-colour">{s.does}</span>
        </li>
      ))}
    </ol>
  );
}
