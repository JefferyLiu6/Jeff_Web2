---
title: Northline Knowledge Workspace
area: AI agents
year: "2026"
date: 2026-11
summary: A support workspace that answers equipment and warranty questions from company documents, and shows the passages behind each answer.
result: Hybrid search passed 94.4% of technical fact checks (17 of 18), against 83.3% (15 of 18) for vector search, on a 50-question development set.
code: https://github.com/JefferyLiu6/Northline-Knowledge-Workspace
stack: [Python, FastAPI, Vue, MySQL, PostgreSQL / pgvector, Ollama (llama3.1:8b, mxbai-embed-large), Docker]

featured: 3
detail: Built on an existing RAG codebase. I fixed what makes such a system risky to rely on, so replaced documents stop being searchable, interrupted jobs recover, and search methods are compared by the facts they get wrong.
stat:
  value: 94.4%
  caption: of technical fact checks passed with hybrid search (17 of 18), against 83.3% for vector search, on a 50-question development set
steps:
  - Support documents are parsed, split and indexed, with every attempt recorded.
  - An agent asks a question and gets an answer from the matching passages.
  - The passages stay on screen, so the answer can be checked before it is used.

kicker: Case study · Retrieval you can rely on
lede: A knowledge workspace for a fictional industrial-equipment support desk, built on an existing FastAPI and Vue RAG codebase. My work was making it dependable to run, with documents that update cleanly, jobs that recover after a crash, and a retrieval comparison that counts failures.
meta:
  - { label: My role, value: "Developer, building on an existing FastAPI and Vue RAG codebase" }
  - { label: When, value: "2026, published November 2026" }
  - { label: Built with, value: "Python, FastAPI, Vue, PostgreSQL with pgvector, MySQL, local Ollama models, Docker" }
  - { label: Status, value: "Runs locally with Docker, not deployed" }
image:
  src: /projects/northline-documents.png
  alt: Northline workspace, Document Management page. Eleven documents are listed with their knowledge base, file type and size, each marked Parsed and Completed for embedding, with search filters and an Upload document button above.
  caption: The knowledge collection, with 11 documents across three knowledge bases, each parsed and embedded.
  width: 1200
  height: 800
flow:
  - { who: Documents, does: "11 documents in five formats, across three knowledge bases." }
  - { who: Parse and split, does: "Every attempt is recorded; a failed or interrupted step can be retried." }
  - { who: Index, does: "110 chunks embedded locally with mxbai-embed-large into pgvector." }
  - { who: Retrieve, does: "Vector search, hybrid search, or hybrid with reranking." }
  - { who: Answer, does: "llama3.1:8b answers, with the source passages on screen." }
stats:
  - { value: 94.4%, caption: "technical fact checks passed with hybrid search, 17 of 18 (vector search: 83.3%, 15 of 18)" }
  - { value: "0", caption: "stale or orphaned entries among 110 vectors after replacing, reparsing and deleting documents" }
  - { value: 3 of 3, caption: "interrupted parse, split and embed jobs completed on retry" }
  - { value: "222", caption: backend tests passing }
statsNote: The retrieval comparison is a 50-question development set (150 comparisons), not a held-out benchmark. The lifecycle and recovery figures come from the repository's verification record; the tests were rerun on November 25, 2026.
limits:
  - The questions are a development set. 22 were copied from the source FAQ, the labels are provisional, and the fact checks were added after the run.
  - Reranking matched hybrid search on the fact checks but took 7.62 s at the median against 0.18 s, so the extra step did not pay for itself here.
  - A known defect is kept in the demo. One answer gives the right limit but cites the wrong source number.
  - Northline is a fictional company and its documents are simulated. The workspace runs on one machine, was checked only on Apple Silicon with Docker Desktop, and has had no real users.
---

## In short

Support agents at an equipment supplier answer fault-code and warranty questions from manuals, workbooks and policies. This workspace lets them ask a question, get an answer, and check the exact passages it came from. I built it on an existing FastAPI and Vue RAG codebase and concentrated on what makes such a system safe to rely on every day.

## The problem

Getting an answer was the easy part. While verifying the system I found two defects that would hurt a real service desk. Replacing a document could leave its old text searchable, so an agent might be handed outdated guidance. And a backend interruption could leave a job marked "Processing" forever, so nobody could tell whether new material was ready.

## The approach

1. **Rebuild the knowledge collection.** 11 source documents in five file formats, across three knowledge bases for technical support, after-sales service and company policy.
2. **Fix the document lifecycle.** Replacing, reparsing, editing or deleting a document now removes its old text, chunks and vectors. A check of the live index found no orphaned or stale entries among its 110 vectors.
3. **Make processing recoverable.** Every parse, split and embed attempt is recorded. I interrupted each stage by stopping the backend: each was marked failed and then completed on retry, and a second job on the same document is refused while one is running.
4. **Lock down administration.** Raw documents are for administrators only, uploaded files cannot be overwritten, passwords are stored as salted PBKDF2 hashes, and changing a password signs out old sessions.
5. **Compare retrieval by its failures.** Vector search, hybrid search and hybrid search with reranking ran on the same 50 questions, and I counted failed fact checks instead of judging how fluent the answers sounded.
6. **Make it reproducible.** Docker packaging with database seeds and model checks, so a reviewer can run it from a clean checkout.

## A failure I kept

Asked for the maximum number of data points on a GTE-3000Pro, the workspace answers 20,000, which is right, but cites Source 2 when the limit is stated in Source 1. I left the defect in the demo. It shows why the sources are on screen, and why an agent still reviews an answer before advising a customer.
