---
title: Kairo
area: AI agents
year: "2026"
date: 2026-11
summary: An AI assistant for tasks and calendars that asks before it changes anything.
result: 96% and 97% of turns ended with the right data stored, on 127 un-coached messages from simulated users, in the last two recorded runs.
code: https://github.com/JefferyLiu6/Kairo

featured: 1
detail: A language model can only propose one typed action. Separate code checks it against what you actually wrote, decides whether a person must approve it, and builds the reply from what was stored, so each part can be tested on its own.
stat:
  value: "96–97%"
  caption: of turns stored the right result, on 127 un-coached messages from 14 simulated users (last two recorded runs)
steps:
  - You ask in plain language.
  - A model proposes one typed action; code checks it against your words and decides whether you need to approve it.
  - Only then is anything changed, and the reply is built from what was stored.

kicker: Case study · AI agent
lede: An AI assistant for tasks and calendars, designed so the language model never has the authority to act on its own.
meta:
  - { label: My role, value: Sole designer and developer }
  - { label: When, value: April 2026 to now }
  - { label: Built with, value: "Python, LangGraph, LangChain, FastAPI, SQLite, React, TypeScript, Docker, with Claude or GPT models (configurable)" }
  - { label: Status, value: "Portfolio demo on Vercel and an Oracle Cloud VM, not a production service" }
stats:
  - { value: "96–97%", caption: "turns right on 127 un-coached messages (blind eval, last two runs)" }
  - { value: "0", caption: "wrong results reported as done, in those two runs" }
  - { value: 252 of 252, caption: "offline cases across 11 suites, for the earlier workflow" }
  - { value: "1,555", caption: tests passing }
statsNote: The blind-eval figures are the two runs recorded in the repository on November 13, 2026, on GPT-4o mini. The offline suite and the tests were rerun on November 25, 2026.
limits:
  - The blind eval uses 14 simulated users, not real ones, and 127 messages. A single run moves by a few turns, and fixes made after the first look at the held-out users used those turns.
  - The offline suite covers the earlier workflow and runs without a live model, so it tests the code around the model, not the model.
  - Duplicate execution was prevented in the scenarios I tested, not proven impossible.
  - The public app is a demo with temporary accounts on a single cloud VM. It has not been run as a production service.
demo: https://kairo-mu-two.vercel.app
image:
  src: /projects/kairo-approval-gate.png
  alt: Kairo, with the chat beside the day calendar. The user asks to move lunch with Maya to 1 PM, and Kairo shows an "Action required" card with the old and new times, Approve and Reject buttons, and when the request expires.
  caption: Kairo asks for approval before moving an event, and the request expires if nobody decides.
  width: 1200
  height: 800
stack: [Python, LangGraph, LangChain, FastAPI, SQLite, React, TypeScript, Docker, "Claude or GPT models (configurable)"]
flow:
  - { who: Model, does: "Proposes one typed action, or hands off to the calendar, memory or assistant agent. No tool that writes." }
  - { who: Gate, does: "Checks the proposal against the schema and your own date, time and repeat words." }
  - { who: Policy, does: Decides whether a person must approve. Approvals expire. }
  - { who: Storage, does: "Makes the change once, then is read back." }
  - { who: Reply and audit log, does: "The reply is built from what was stored, and every turn is recorded." }
---

## In short

Most assistants let the AI model decide what to do and then do it. Kairo separates those jobs. A model only proposes what you asked for. Ordinary, testable code checks the proposal, decides whether it is allowed, asks you first when the action is risky, and answers from what was actually saved.

## The problem

My first version gave the model a full list of tools and let it choose. It worked in demos and worried me everywhere else. Risky actions were reachable through general-purpose tools, there was no lasting record of what had been approved, and I could not test the model's understanding separately from its choice of action or from the safety rules.

## The approach

I rebuilt it twice. The second version gave the model no tools at all: it returned structured fields, and rule-based code planned and ran everything. That was safe and easy to test, but a blind test on un-coached messages showed it got only about 30% of turns right. The current version is an agent graph that keeps the same rule: a model can propose, but only code can act.

1. **A model proposes.** A coordinator reads the message and makes exactly one typed tool call, or hands off to a calendar, memory or assistant agent that does the same. No model has a tool that writes. Which model is a setting (Claude or GPT); the recorded runs use GPT-4o mini.
2. **Code checks the proposal against your words.** A date, time or repeat that contradicts what you wrote, such as "by friday" read as next week's Friday, is sent back once and then asked about. Nothing wrong is stored silently.
3. **A policy decides on approval.** Risky changes wait for a person, several removals are asked for once in one card, and an approval expires if nobody decides in time.
4. **Storage makes the change once.** Each message carries an idempotency key, so a message resent after a dropped connection does not run twice.
5. **The reply comes from storage.** The stores are read back after each write and the reply is built from the stored record. A small model may reword it, but the rewording is dropped if any number, time, name or list item changed.
6. **An audit log records it.** Every turn records its route, the tool called, the approval and what was stored.

![Kairo's decision trace for moving an event: the proposed action, the approval policy's reason, what was read, and the reply that waits for approval.](/projects/kairo-decision-trace.png)

## A failure my tests caught

A request to mark a quoted task as done failed quietly. The system kept the words "as done" inside the title it searched for, found nothing, and left the task unfinished.

The fix uses the exact quoted title. The tests that guard it check the completion flag in storage, not the reply text, and they include tasks whose real titles contain "as done" or an apostrophe, so the fix cannot block a legitimate request.
