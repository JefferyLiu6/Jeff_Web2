---
title: LinguaFlow
area: AI agents
year: "2026"
date: 2026-11
summary: An English tutor that shows its sources, and says so when it has none.
result: With the source check, 86.4% of the course notes the tutor cited really supported its answer, up from 35.6% without it, on 100 test questions.
code: https://github.com/JefferyLiu6/linguaflow
demo: https://linguaflow-demo.vercel.app
results: https://github.com/JefferyLiu6/linguaflow/blob/e1258d8b677fdfdad2805db075e7d2d0e72b84d3/docs/EXPANSION_EVALUATION_RESULTS.md
stack: [Next.js, TypeScript, FastAPI, LangGraph, PostgreSQL / pgvector, Supabase, OpenAI GPT-4.1, text-embedding-3-small]

featured: 2
detail: Before the tutor cites course material, a verification step checks that the source really supports the explanation. If it does not, the tutor does not cite it.
stat:
  value: 86.4%
  caption: of the course notes the tutor cited really supported its answer, up from 35.6% without the check. 100 test questions over a 200-note course.
steps:
  - A learner asks why a sentence was rewritten.
  - The tutor finds course notes that might explain it.
  - A second check confirms the notes support the answer before they are cited.
image:
  src: /projects/linguaflow-study-helper.png
  alt: LinguaFlow study screen. A learner asks why a passive sentence uses "was reviewed", and the tutor answers with a study reference shown beneath.
  caption: LinguaFlow answers a learner and shows the note it relied on.
  width: 1200
  height: 800

kicker: Case study · Retrieval and grounding
lede: An English tutor that explains why a sentence was rewritten, and only cites a course note when that note really supports the explanation.
meta:
  - { label: My role, value: Sole designer and developer }
  - { label: When, value: April to November 2026 }
  - { label: Built with, value: "Next.js, FastAPI, LangGraph, PostgreSQL with pgvector, GPT-4.1" }
  - { label: Status, value: "Deployed demo, no measured learner outcomes" }
flow:
  - { who: Index, does: "31 notes, one chunk each, embedded with text-embedding-3-small into pgvector." }
  - { who: Retrieve, does: "Cosine search returns up to ten notes; a rerank sends the top five forward." }
  - { who: Verify, does: "One GPT-4.1 call picks the notes that support an answer, or none." }
  - { who: Route, does: "Answer with a source, answer without one, ask for missing text, or redirect." }
  - { who: Generate, does: "The LLM writes the answer; code rebuilds the cited text from the stored note." }
diagram: linguaflow-pipeline
stats:
  - { value: 86.4%, caption: "of cited course notes really supported the answer (35.6% without the check)" }
  - { value: 2 of 40, caption: "false references on questions with no valid source (was 31 of 40)" }
  - { value: 3.20 s, caption: "95th-percentile response time, measured locally" }
  - { value: "$0.004072", caption: "average model cost per question" }
statsNote: "From a paired run on November 16, 2026: 100 frozen synthetic questions over the course expanded to 200 notes, each answered with and without the check. Precision is strict: a plausible note outside the frozen labels counts as wrong. The expanded course was evaluated locally; the live demo still uses the original 31 notes."
limits:
  - The test questions are synthetic, and the 100 in the larger run were AI-written with knowledge of the course. No real learners have been measured.
  - The 200-note course is not yet published. The live demo still answers from the original 31 notes.
  - The final version of the check was not re-run on the original 93 questions. An earlier version was, and that set can no longer count as unseen.
  - The metadata reranker is still in the code for drill cards. I have not shown that it helps there either.
  - The live course has only 31 notes. At that size, putting every note in the prompt is a credible alternative to retrieval, and the project's own documentation says so.
  - "The verification step is most of the model cost: $0.004072 per question against $0.000113 without it."
  - Response time was measured on a local pipeline, not under production load.
---

## In short

A fluent explanation can still teach the wrong thing. A question about formal tone should not get a lesson on verb tense just because the card contains those words. LinguaFlow answers ordinary English questions, and attaches a course reference only when the course actually covers the point.

## The problem

My first version retrieved the nearest course note and cited it. On a 93-question holdout it found an acceptable source for 52 of 62 answerable questions, which looked fine. Then I looked at the 31 questions the course does not cover. It attached an irrelevant note to 16 of them.

That is the worse failure. A wrong reference looks like evidence, and a learner has no reason to doubt it.

The same holdout showed something else I had not expected: my hybrid reranking chose exactly the same source as plain vector search on all 93 questions. The reranker blends the similarity score with a drill card's topic labels, and a typed question has no labels, so on these questions it had nothing to add.

## The approach

I stopped trying to fix this with a better similarity score and added a separate check.

1. **Retrieve broadly.** PostgreSQL with pgvector returns up to ten candidate notes and the top five go forward. For a typed question that is plain vector order. The reranker only changes the order when the question comes from a drill card that carries topic labels, which is why it stayed in the code. One note is one chunk, because each note is already a single concept with its rule, examples and exceptions together.
2. **Verify once.** A single GPT-4.1 call sees the five candidates and returns the IDs of the notes that genuinely support an answer, or none. It also flags a question that is off-topic or missing the learner's text.
3. **Point, do not quote.** The model returns note IDs only. Code looks up the real text, so a reference can never contain words that are not in the course.
4. **Fail honestly.** If the index is incomplete or the provider errors, the user sees an error. A broken service never passes as "no source found".

## Why the fix is reported on different questions

A fair question is why the result above comes from 24 new questions and not the 93 that exposed the problem.

I did re-run the 93. My first version of the check removed every false reference (16 of 31 down to 0 of 31), but it also became too cautious: correct references fell from 52 of 62 to 41 of 62. I then changed the check to win those back.

By that point I had read every one of the 93 failures and tuned against them, so a good score on that set would prove little. I kept the 93 as a regression suite and wrote 24 new questions, froze them and their labels before running anything, and ran them once. The first fresh set failed one of its targets (3 of 4 questions with missing text were handled correctly), so I fixed that, set it aside as seen, and wrote a second fresh set. The September release figures, 0 of 12 false references and 11 of 12 correct references, are from that second set.

![Three question sets. Only the last one was still unseen when it was run, so the September release figures come from it.](diagram:linguaflow-evaluation)

The cost of doing it this way is that the two results are not one before-and-after on the same questions, and I say so wherever the number appears.

## Scaling the course to 200 notes

In November I expanded the course from 31 to 200 notes and ran a larger paired test: 100 frozen synthetic questions, each answered with and without the check. The share of cited sources that were valid rose from 35.6% to 86.4%, and false references on questions with no valid source fell from 31 of 40 to 2 of 40.

Retrieval itself did not change. In both arms 86.7% of supported questions had a valid note in the top five, so the gain comes from choosing among the candidates and declining when none fit. The expanded course is validated locally and not yet published.

## Keeping the index safe

Publishing new course notes happens in one database transaction: the notes, the removals and a manifest recording the content and embedding model. A reader that sees an incomplete or mismatched index rejects it. Integration tests on a throwaway PostgreSQL database cover a rollback after a late error, two publishers racing, and repair of a half-written index.

## What it cost

The verification step is not free. In the 200-note run it raised the model cost per question from $0.000113 to $0.004072, and the 95th-percentile response time in local testing from 2.22 to 3.20 seconds. I publish both next to the accuracy numbers, because whether that trade is worth it depends on the product.
