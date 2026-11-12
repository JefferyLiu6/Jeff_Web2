---
title: Structured Notes Model
area: AI agents
year: "2026"
date: 2026-04
summary: A small language model taught to write in a strict format.
result: Formatting failures fell from 77 to 1 across 125 test prompts.
code: https://github.com/JefferyLiu6/RA_LLM
codeLabel: Code (RA_LLM)
results: https://github.com/JefferyLiu6/RA_LLM/blob/78191e1af7a003d09a06f48a4bf46959154047d2/outputs/sft_eval_results.md

featured: 3
detail: I fine-tuned an open model so its research notes always follow the same structure, which lets other software check and use them without a person in between.
stat:
  value: 1 of 125
  caption: test prompts with a formatting failure after fine-tuning, down from 77
steps:
  - 600 example notes, split so test prompts are never seen in training.
  - A small open model is fine-tuned on them.
  - A format checker scores every output automatically.
---
