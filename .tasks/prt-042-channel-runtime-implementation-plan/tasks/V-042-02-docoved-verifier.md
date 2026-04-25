---
file: .tasks/prt-042-channel-runtime-implementation-plan/tasks/V-042-02-docoved-verifier.md
description: Verifier task for Docoved PRT-042 adoption.
purpose: Independently verify Docoved mapping, channel behavior, docs, and beta evidence against the adoption task.
version: 0.1.0
date: 2026-04-25
status: PLANNED
tags: [task, prt-042, verifier, docoved]
parent: ../index.md
---

# Task V-042-02: Docoved Verifier

## Context to read

- Task file `T-042-04-docoved-adoption-packet.md`.
- Executor report for `T-042-04`.
- Actual Docoved diff.
- Framework verifier report `V-042-01` if available.
- Docoved Memory Bank channel/answer docs.
- `.memory-bank/spec/operations/hosted-beta-acceptance-contract.md`
- `.memory-bank/spec/scenarios/hosted-beta-execution-model.md`

## Goal

Verify Docoved adoption preserves answer/source semantics and does not move product truth into `bot-platform`.

## Write scope

- `.tasks/prt-042-channel-runtime-implementation-plan/reports/V-042-02-docoved-verifier.md`
- `.tasks/prt-042-channel-runtime-implementation-plan/verification/V-042-02-docoved-verifier.md`

## Required verification

- Inspect mapping code and fixture output.
- Inspect email/Telegram adapter changes if any.
- Confirm Docoved Memory Bank routes upstream instead of restating framework truth.
- Confirm beta proofs were run when adapter behavior changed, including email `Re:` threading when relevant.
- Confirm no command behavior changed unless separately tasked.
- Confirm hosted deploys were not triggered without a scenario reason.
- Confirm executor report states whether lessons/insights were created.

## Definition of done

- Verifier report states `accepted`, `accepted_with_followups`, or `rejected`.
- Any missing hosted proof is explicit and justified or marked blocking.

## Lessons learned / insights

- If verification reveals undocumented Docoved hosted/provider/scenario behavior, write it to `../lessons/NNN-lessons-learned.md`.
- If verification reveals a reusable adoption-verification insight, write it to `../lessons/NNN-insights.md`.
- Do not write a diary; record only durable facts and recommendations with proposed Memory Bank destination.
- The report must state whether lessons/insights were created.

## Report format

Write `.tasks/prt-042-channel-runtime-implementation-plan/reports/V-042-02-docoved-verifier.md` with:
- verdict;
- mapping/adapter review;
- checks/evidence reviewed;
- hosted beta status;
- risks and required fixes.
