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
  src: /projects/linguaflow-study.png
  alt: LinguaFlow study screen. A learner asks why a passive sentence uses "was reviewed", and the tutor answers with a study reference shown beneath.
  width: 800
  height: 740
---
