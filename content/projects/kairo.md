---
title: Kairo
area: AI agents
year: "2026"
date: 2026-11
summary: An AI assistant for tasks and calendars that asks before it changes anything.
result: 252 of 252 evaluation cases passed across 11 test suites in the recorded run.
code: https://github.com/JefferyLiu6/Kairo

featured: 1
detail: The language model only interprets the request. Separate code checks it, decides whether a person must approve it, and records every step, so each part can be tested on its own.
stat:
  value: 252 of 252
  caption: evaluation cases passed, across 11 test suites in the recorded run
steps:
  - You ask in plain language.
  - Code checks the request and decides whether you need to approve it.
  - Only then is anything changed, and every step is logged.

kicker: Case study · AI agent
lede: An AI assistant for tasks and calendars, designed so the language model never has the authority to act on its own.
meta:
  - { label: My role, value: Sole designer and developer }
  - { label: When, value: April 2026 to now }
  - { label: Built with, value: "Python, LangGraph, FastAPI, SQLite, React" }
  - { label: Status, value: "Portfolio demo, not a production service" }
stats:
  - { value: 252 of 252, caption: "evaluation cases, across 11 suites" }
  - { value: 25 of 25, caption: approval-safety cases }
  - { value: 16 of 16, caption: adversarial cases }
  - { value: "280", caption: unit tests passing }
statsNote: From the recorded run documented in the repository.
limits:
  - The evaluation is offline and deterministic. It does not measure behaviour with real users.
  - Duplicate execution was prevented in the scenarios I tested, not proven impossible.
  - The public app is a demo. It has not been run as a production service.
demo: https://kairo-hazel.vercel.app
image:
  src: /projects/kairo-approval.png
  alt: Kairo chat. The user asks to delete a calendar block, and Kairo shows an "Action required" card with Approve and Reject buttons instead of deleting it.
  width: 680
  height: 484
---

## In short

Most assistants let the AI model decide what to do and then do it. Kairo separates those jobs. The model only works out what you asked for. Ordinary, testable code decides whether it is allowed, and asks you first when the action is risky.

## The problem

My first version gave the model a full list of tools and let it choose. It worked in demos and worried me everywhere else. Risky actions were reachable through general-purpose tools, there was no lasting record of what had been approved, and I could not test the model's understanding separately from its choice of action or from the safety rules.

## The approach

I rebuilt it so that each stage can do one thing and nothing else.

1. **The model reads the request.** It gets no tools at all and must return structured fields. If its answer is malformed or unsure, a rule-based parser takes over.
2. **The workflow validates and plans.** A multi-step request is checked as a whole before anything changes. If one part is unclear, it asks instead of doing half.
3. **A policy decides on approval.** Risky actions wait for a person. The policy lives outside the model, as an explicit list.
4. **Storage makes the change.** An approval is claimed once before it runs. Automatic retries are limited to read-only actions.
5. **An audit log records it.** Every classification, action, approval, rejection and failure is written down.

![Kairo's decision trace for a delete request: the extracted action, the approval policy's reason, and what was read and written.](/projects/kairo-decision-trace.png)

## A failure my tests caught

A request to mark a quoted task as done failed quietly. The system kept the words "as done" inside the title it searched for, found nothing, and left the task unfinished.

The fix uses the exact quoted title. The tests that guard it check the completion flag in storage, not the reply text, and they include tasks whose real titles contain "as done" or an apostrophe, so the fix cannot block a legitimate request.
