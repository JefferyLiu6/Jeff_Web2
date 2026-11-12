/**
 * The "How I work" page. Each entry is one practice: the rule, what I actually
 * do, and a real example from a project. Edit the wording freely; keep the
 * numbers in line with the project files.
 */
export type Practice = {
  id: string;
  title: string;
  rule: string;
  why: string;
  steps: string[];
  example: { project: string; href?: string; text: string };
  ask: string;
};

export const method = {
  lede: "Seven practices I use on every agent I build. Each one came from something that went wrong, and each has an example you can check in the code.",

  loop: [
    { title: "Decide what it may do", text: "Before any prompt, I list the actions the system can take and who is allowed to trigger each one." },
    { title: "Write the cases first", text: "I write the requests it must handle, including the awkward and hostile ones, and what should be true afterwards." },
    { title: "Build the smallest version", text: "One path, end to end, with the checks in place from the start." },
    { title: "Break it on purpose", text: "I look for requests that almost work, fix them, and keep every one as a permanent test." },
    { title: "Report the limits", text: "I write down how much was tested, on what data, and what I still do not know." },
  ],

  practices: [
    {
      id: "limit-authority",
      title: "Limit what the model can do",
      rule: "The part that understands language should have no power to act.",
      why: "A language model is good at reading a messy request and poor at being trusted with consequences. If it can call any tool, a single misreading becomes a real change that nobody approved.",
      steps: [
        "Give the model one job: turn the request into structured fields. It gets no tools.",
        "Make it answer in a strict format, and fall back to rule-based parsing when the answer is malformed or unsure.",
        "Let ordinary code validate the request, plan the steps and decide whether a person must approve.",
        "Check a multi-step request as a whole before changing anything, so it never does half.",
      ],
      example: {
        project: "Kairo",
        href: "/work/kairo",
        text: "The first version let the model choose from every tool. I replaced it with five stages: the model extracts, the workflow validates, a policy approves, storage makes the change, and an audit log records it. I also tried rules alone, with no model. That was easy to test but missed messy phrasing, so the final design uses both.",
      },
      ask: "If the model misreads this request, what is the worst thing that can happen without a person seeing it?",
    },
    {
      id: "test-outcomes",
      title: "Test outcomes, not answers",
      rule: "A test should check what was saved, not what the assistant said.",
      why: "An assistant can reply “done” and change nothing. If the test only reads the reply, it passes while the user's task stays unfinished.",
      steps: [
        "After each test request, read the stored data and assert on it directly.",
        "Test the understanding, the choice of action and the safety rule separately, so a failure points to one place.",
        "Keep the evaluation deterministic and offline, so the same run gives the same result.",
      ],
      example: {
        project: "Kairo",
        href: "/work/kairo",
        text: "A request to mark a quoted task as done replied normally and left the task unfinished: the words “as done” had been kept inside the title it searched for. A test that asserted the completion flag in storage caught it. The recorded run now passes 252 of 252 cases across 11 suites.",
      },
      ask: "If the reply were a polite lie, would this test still pass?",
    },
    {
      id: "near-neighbour",
      title: "Pair every fix with its neighbour",
      rule: "A safety fix is not finished until I have shown it does not block the normal version of the same request.",
      why: "The easy way to stop a bad request is to refuse everything that looks like it. That quietly breaks the product for honest users.",
      steps: [
        "For each fix, write one test where the problem case now fails safely.",
        "Write a second test with the closest legitimate request, and prove it still works.",
        "Keep both forever. They run on every change.",
      ],
      example: {
        project: "Kairo",
        href: "/work/kairo",
        text: "After the “as done” fix, the tests include tasks whose real titles contain “as done” or an apostrophe. The fix cannot pass by simply stripping those words.",
      },
      ask: "What is the most similar request that a real user would send, and does it still work?",
    },
    {
      id: "verify-sources",
      title: "Check a source before citing it",
      rule: "The model may point at evidence. It may not write the evidence.",
      why: "When a model writes out a quotation, it can blend two sources into one that reads well and exists nowhere. A citation the reader cannot trust is worse than no citation.",
      steps: [
        "Give every piece of source material an ID.",
        "Ask the model to choose IDs, never to produce the quoted text.",
        "Have code look up the exact text for each ID, and reject any ID that does not exist.",
        "When nothing supports the answer, say so instead of citing the nearest thing.",
      ],
      example: {
        project: "LinguaFlow",
        text: "Adding a verification step cut false references from 6 of 12 to 0 of 12 on questions with no valid source, and raised correct references from 7 of 12 to 11 of 12, in a paired test on synthetic questions. I hit the same problem in Kairo's automated grader: two outputs merged text from separate sources, so I changed it to select source IDs as well.",
      },
      ask: "Could a reader click this reference and find exactly these words?",
    },
    {
      id: "safe-retries",
      title: "Retry only what is safe to repeat",
      rule: "Reading twice is harmless. Writing twice is not.",
      why: "An error can arrive after the change has already been made. Retrying a write on an uncertain result can create a second meeting or send a second message.",
      steps: [
        "Keep an explicit list of read-only actions that may be retried automatically.",
        "Send every uncertain write down a fallback path that asks or reports, and never repeats.",
        "Make an approval something that can be claimed only once.",
      ],
      example: {
        project: "Kairo",
        href: "/work/kairo",
        text: "Automatic retries are limited to an allowlist of reads. Running an approved action first claims it, moving it from pending to executing in one step, which prevented duplicate execution in the concurrency scenarios I tested.",
      },
      ask: "If this ran twice, would anyone be worse off?",
    },
    {
      id: "keep-baseline",
      title: "Keep the simple version until something beats it",
      rule: "A more complex approach has to earn its place with a measurement.",
      why: "It is easy to add retrieval, a second model or more features because they sound better. Each one adds cost and new ways to fail.",
      steps: [
        "Build the plain baseline first and measure it.",
        "Compare the new approach on the same cases, not on a different, friendlier set.",
        "If the gain is not there, keep the baseline and say so.",
      ],
      example: {
        project: "LinguaFlow and others",
        text: "LinguaFlow's own documentation says that with only 31 teaching notes, putting everything in the prompt is a credible alternative to retrieval. In a separate analytics project, adding three sets of features made validation slightly worse (log loss 0.929 against 0.922), so I recommended keeping the simpler model.",
      },
      ask: "What is the simplest thing that could work here, and have I measured it?",
    },
    {
      id: "state-limits",
      title: "Say what I have not proven",
      rule: "Every result ships with its sample size, its data and its gaps.",
      why: "A number without conditions invites the reader to assume the best case. Stating the limits is what makes the rest of the claim believable.",
      steps: [
        "Give the count behind every percentage.",
        "Say when test data is synthetic and when figures come from one recorded run.",
        "Measure cost and speed as well as accuracy, and name the trade-off.",
        "End each project write-up with a section on what the evaluation does not show.",
      ],
      example: {
        project: "LinguaFlow",
        text: "The verification step that removed false references also accounts for about 98% of the token cost per request, with a typical worst-case response time of 4.6 seconds in local testing. Both are published next to the accuracy result. The demo has no real users yet, and the write-up says that too.",
      },
      ask: "What would a skeptical reader ask next, and have I already answered it on the page?",
    },
  ] satisfies Practice[],
};
