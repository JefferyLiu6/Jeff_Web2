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
stack: [PyTorch, Hugging Face Transformers, PEFT (LoRA), TRL (DPO), Qwen2.5-1.5B]

featured: 3
detail: I fine-tuned an open model so its research notes always follow the same structure, which lets other software check and use them without a person in between.
stat:
  value: 1 of 125
  caption: test prompts with a formatting failure after fine-tuning, down from 77
steps:
  - 600 example notes, split so test prompts are never seen in training.
  - A small open model is fine-tuned on them.
  - A format checker scores every output automatically.
image:
  src: /projects/structured-notes-two-results.png
  alt: Two separate results for the Structured Notes Model on 125 held-out prompts. With the original prompt, notes in the correct format rose from 48 for the base model to 124 after LoRA tuning. With a tightened prompt, they rose from 105 for the base model to 125 after preference tuning.
  caption: Two separate measurements on the same 125 held-out prompts. The prompts differ, so they are not one chain.
  width: 1200
  height: 800

kicker: Case study · Fine-tuning
lede: A 1.5-billion-parameter open model, fine-tuned so that every research note it writes has the same four sections in the same form.
meta:
  - { label: My role, value: Sole developer }
  - { label: When, value: March to April 2026 }
  - { label: Built with, value: "PyTorch, Hugging Face Transformers, PEFT, TRL" }
  - { label: Status, value: "Research project, run locally" }
flow:
  - { who: Data, does: "600 examples with a fixed 400 / 75 / 125 split." }
  - { who: LoRA tuning, does: Teaches the format from the training examples. }
  - { who: Preference tuning, does: "Shows the model 300 pairs of a good note and a flawed one." }
  - { who: Checker, does: Scores every output against the format rules automatically. }
diagram: notes-training
stats:
  - { value: 124 of 125, caption: "test prompts in the correct format after LoRA tuning (base model: 48)" }
  - { value: 125 of 125, caption: "after preference tuning, on a tightened prompt (base model: 105)" }
  - { value: "600", caption: "examples: 68 written by hand, 532 synthetic" }
  - { value: 86% to 83%, caption: "content-overlap score, LoRA to preference tuning" }
statsNote: The two tuning stages were measured with different prompts, so they are separate results and not one before-and-after chain.
limits:
  - The checker measures format, not whether a note is factually right.
  - The content score is word overlap with a reference note, not a human judgment.
  - Most of the dataset is synthetic. Exact duplicates were removed, but near-duplicates were not independently reviewed.
  - Training and evaluation ran on a laptop. Nothing was deployed or served.
---

## In short

Downstream code can only use a model's output if it arrives in a predictable shape. I fine-tuned a small open model, Qwen2.5-1.5B, to write research notes with exactly four parts: a summary, three key points, one limitation and one follow-up question.

## The problem

Asked nicely in a prompt, the base model followed the format on 48 of 125 test prompts. It added a fourth bullet, left the limitation empty, or kept writing after the last section. Each of those breaks whatever program reads the note next.

## The approach

1. **Build the dataset carefully.** 600 examples, each with a record of where it came from. The split into 400 training, 75 validation and 125 test examples is fixed, with a check that no input appears twice.
2. **Teach the format with LoRA.** A small adapter is trained on the 400 examples while the base model stays frozen.
3. **Target the remaining mistakes.** For preference tuning (DPO) I built 300 pairs: a correct note beside the same note with one planted flaw, such as an extra bullet or trailing text. The pairs come only from training and validation data, never from the test set.
4. **Score format and content separately.** A rule-based checker decides whether a note is in the correct format. A second measure compares its content with a reference note.

![One of the 300 DPO preference pairs. Both completions answer the same prompt, and training pushes the model toward the chosen one.](diagram:notes-preference-pair)

## What I learned

The tightened prompt did a lot of the work on its own. With it, the untouched base model already followed the format on 105 of 125 prompts, against 48 with the original prompt. Preference tuning closed the last 20. That is why I report the two stages as separate results: adding them into one 48-to-125 story would credit the tuning with what the prompt did.

Format improved, and content did not improve with it. After preference tuning every test note passed the format check, but the content-overlap score slipped from 86% to 83%. Pushing harder on structure cost a little substance.

I report the two numbers side by side for that reason. A model that is perfectly formatted and slightly emptier is not obviously better, and which one you want depends on what reads the output.
