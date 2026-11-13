---
title: LinguaFlow
area: AI agents
year: "2026"
date: 2026-09
summary: An English tutor that shows its sources, and says so when it has none.
result: False references fell from 6 of 12 to 0 of 12 in a paired test on synthetic questions.
code: https://github.com/JefferyLiu6/linguaflow
demo: https://linguaflow-demo.vercel.app
results: https://github.com/JefferyLiu6/linguaflow/blob/808eccc6678a3355cc61aa061c18cccc06c28201/docs/RELEASE_VALIDATION_RESULTS.md
stack: [Next.js, TypeScript, FastAPI, LangGraph, PostgreSQL / pgvector, Supabase, OpenAI GPT-4.1, text-embedding-3-small]

featured: 2
detail: Before the tutor cites course material, a verification step checks that the source really supports the explanation. If it does not, the tutor does not cite it.
stat:
  value: 0 of 12
  caption: false references, down from 6 of 12, in a paired test on synthetic questions
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
  - { label: When, value: April to September 2026 }
  - { label: Built with, value: "Next.js, FastAPI, LangGraph, PostgreSQL with pgvector, GPT-4.1" }
  - { label: Status, value: "Deployed demo, no measured learner outcomes" }
flow:
  - { who: Question, does: A learner asks about a drill card. }
  - { who: Retrieve, does: "pgvector returns up to ten notes; a reranker keeps five." }
  - { who: Verify, does: One model call picks the notes that support an answer, or none. }
  - { who: Decide, does: "Answer with a source, answer without one, ask for missing text, or redirect." }
  - { who: Reply, does: Code rebuilds the cited text from the stored note. }
stats:
  - { value: 0 of 12, caption: "false references on questions with no valid source (was 6 of 12)" }
  - { value: 11 of 12, caption: "supported questions given a correct reference (was 7 of 12)" }
  - { value: 4.6 s, caption: "95th-percentile response time, measured locally" }
  - { value: "$0.0043", caption: "average model cost per request" }
statsNote: Paired comparison on the same 24 synthetic questions and the same retrieved candidates. It measures which source was chosen, not how good the written answer was.
limits:
  - The 24 test questions are synthetic. No real learners have been measured.
  - The course has only 31 notes. At that size, putting every note in the prompt is a credible alternative to retrieval, and the project's own documentation says so.
  - The verification step accounts for about 98% of the model cost per request.
  - Response time was measured on a local pipeline, not under production load.
---

## In short

A fluent explanation can still teach the wrong thing. A question about formal tone should not get a lesson on verb tense just because the card contains those words. LinguaFlow answers ordinary English questions, and attaches a course reference only when the course actually covers the point.

## The problem

My first version retrieved the nearest course note and cited it. On a 93-question holdout it found an acceptable source for 52 of 62 answerable questions, which looked fine. Then I looked at the 31 questions the course does not cover. It attached an irrelevant note to 16 of them.

That is the worse failure. A wrong reference looks like evidence, and a learner has no reason to doubt it.

The same holdout showed something else I had not expected: my hybrid reranking chose exactly the same source as plain vector search on all 93 questions. The extra machinery was not earning its place.

## The approach

I stopped trying to fix this with a better similarity score and added a separate check.

1. **Retrieve broadly.** PostgreSQL with pgvector returns up to ten candidate notes, and a simple reranker keeps the top five. One note is one chunk, because each note is already a single concept with its rule, examples and exceptions together.
2. **Verify once.** A single GPT-4.1 call sees the five candidates and returns the IDs of the notes that genuinely support an answer, or none. It also flags a question that is off-topic or missing the learner's text.
3. **Point, do not quote.** The model returns note IDs only. Code looks up the real text, so a reference can never contain words that are not in the course.
4. **Fail honestly.** If the index is incomplete or the provider errors, the user sees an error. A broken service never passes as "no source found".

## Keeping the index safe

Publishing new course notes happens in one database transaction: the notes, the removals and a manifest recording the content and embedding model. A reader that sees an incomplete or mismatched index rejects it. Integration tests on a throwaway PostgreSQL database cover a rollback after a late error, two publishers racing, and repair of a half-written index.

## What it cost

The verification step is not free. It accounts for about 98% of the model cost of each request, and the 95th-percentile response time in local testing is 4.6 seconds. I publish both next to the accuracy numbers, because whether that trade is worth it depends on the product.
