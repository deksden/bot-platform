---
file: .tasks/prt-042-channel-runtime-implementation-plan/tasks/V-042-01-framework-verifier.md
description: Verifier task for PRT-042 framework implementation slices.
purpose: Independently verify executor claims against task files, reports, and actual changed framework files.
version: 0.1.0
date: 2026-04-25
status: PLANNED
tags: [task, prt-042, verifier, framework]
parent: ../index.md
---

# Task V-042-01: Framework Verifier

## Context to read

- Task files `T-042-00`, `T-042-01`, `T-042-02`, `T-042-03`.
- Reports for `T-042-00..03`.
- Actual git diff for framework files.
- `.memory-bank/spec/runtime/channel-runtime-contract.md`
- `.memory-bank/spec/engineering/delivery-standards.md`
- `.memory-bank/spec/operations/git-flow.md`
- `.memory-bank/spec/operations/deployment-architecture.md`
- `.memory-bank/spec/operations/private-registry-package-bridge.md`

## Goal

Accept or reject the framework implementation slice based on evidence, not executor assertions.

## Write scope

- `.tasks/prt-042-channel-runtime-implementation-plan/reports/V-042-01-framework-verifier.md`
- `.tasks/prt-042-channel-runtime-implementation-plan/verification/V-042-01-framework-verifier.md`

## Required verification

- Compare executor task scope to actual changed files.
- Re-run or inspect evidence for `pnpm typecheck`, `pnpm check`, import smoke, import-boundary proof, and pack/publish readiness when applicable.
- Verify no deferred areas were accidentally implemented.
- Verify Memory Bank links and routing claims.
- Verify git-flow, push, CI, Vercel, package-publish, and no-DB/no-migration decisions are recorded correctly.
- Verify executor reports state whether lessons/insights were created.

## Definition of done

- Verifier report states `accepted`, `accepted_with_followups`, or `rejected`.
- Findings cite exact files/sections.
- Any required fix is specific and assigned to a follow-up task.

## Lessons learned / insights

- If verification reveals undocumented framework ops, CI, publish, or git-flow behavior, write it to `../lessons/NNN-lessons-learned.md`.
- If verification reveals a reusable verifier/process insight, write it to `../lessons/NNN-insights.md`.
- Do not write a diary; record only durable facts and recommendations with proposed Memory Bank destination.
- The report must state whether lessons/insights were created.

## Report format

Write `.tasks/prt-042-channel-runtime-implementation-plan/reports/V-042-01-framework-verifier.md` with:
- verdict;
- checked files;
- commands/evidence reviewed;
- deviations;
- required fixes;
- optional follow-ups.
