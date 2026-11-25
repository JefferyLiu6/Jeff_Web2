const SETS = [
  {
    count: "93",
    name: "Original holdout",
    steps: [
      "Exposed the problem: 16 of 31 uncovered questions got a false reference.",
      "First check: 0 of 31 false references, but correct ones fell from 52 to 41 of 62.",
      "I read every failure and tuned the check against them.",
    ],
    end: "Kept as a regression suite. No longer unseen.",
  },
  {
    count: "24",
    name: "Fresh set 1",
    steps: [
      "Questions and labels frozen before any run.",
      "Missed one target: 3 of 4 missing-text questions handled correctly.",
    ],
    end: "Fixed, then set aside as seen.",
  },
  {
    count: "24",
    name: "Fresh set 2",
    steps: ["Questions and labels frozen before any run.", "Run once."],
    end: "The numbers on this page.",
    reported: true,
  },
];

/** The three question sets, what happened to each, and which one the reported numbers come from. */
export function LinguaflowEvaluation() {
  return (
    <div className="flex flex-col gap-6">
      {SETS.map((set) => (
        <div
          key={set.name}
          className={`grid gap-x-6 gap-y-3 border-t pt-4 sm:grid-cols-[150px_minmax(0,1fr)] ${set.reported ? "border-t-2 border-accent" : "border-ink"}`}
        >
          <div>
            <div className="font-serif text-stat leading-[1.1]">{set.count}</div>
            <div className="text-meta text-muted">questions</div>
            <div className="mt-1 font-semibold">{set.name}</div>
          </div>
          <ol className="flex flex-col text-meta">
            {[...set.steps, set.end].map((text, i, all) => {
              const last = i === all.length - 1;
              return (
                <li key={text} className={`relative ps-6 ${last ? "" : "pb-3"}`}>
                  {!last && <span aria-hidden="true" className="absolute bottom-0 left-[4.5px] top-3 w-px bg-rule-strong" />}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-[7px] size-2.5 rounded-full ${
                      last ? (set.reported ? "bg-accent" : "bg-ink") : "border-[1.5px] border-muted bg-white"
                    }`}
                  />
                  <span className={last ? `font-semibold ${set.reported ? "text-accent" : "text-ink"}` : "text-body-colour"}>
                    {text}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
