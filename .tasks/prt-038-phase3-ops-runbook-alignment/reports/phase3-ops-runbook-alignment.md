---
file: .tasks/prt-038-phase3-ops-runbook-alignment/reports/phase3-ops-runbook-alignment.md
description: 'Phase-3 synthesis for aligning PRT-038 with bot-platform ops/devops/runbook and MBB execution rules.'
purpose: 'Summarize the operational findings that were folded into PRT-038 so the protocol now reflects the accepted git, CI, deploy, hosted-verification, and lessons-learned discipline.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
tags: [report, protocol, ops, runbook, prt-038]
parent: .tasks/prt-038-phase3-ops-runbook-alignment/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/spec/operations/git-flow.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/runbook.md
  - .memory-bank/spec/operations/production-rollout-runbook.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/guides/reference/npm-package-release-runbook.md
  - .memory-bank/mbb/principles.md
  - .memory-bank/mbb/indexing-guide.md
  - .memory-bank/mbb/cross-references.md
---

# PRT-038 Phase 3 Ops / Runbook Alignment Report

## Reviewed sources

- `git-flow.md` for branch origin, protected-branch merges, worktree usage, and promotion rules.
- `delivery-standards.md` for closure evidence, hosted-verification conditions, and local-vs-remote gating.
- `deployment-architecture.md`, `runbook.md`, and `hosted-beta-acceptance-contract.md` for lane semantics, deploy truth, hosted preflight, and beta evidence expectations.
- `production-rollout-runbook.md` for governed production promotion, safety artifacts, stop conditions, and rollback handoff.
- `npm-package-release-runbook.md` for intentional package publication and the rule that `Release Packages` is not a generic feature-wave signal.
- `mbb/principles.md`, `mbb/indexing-guide.md`, and `mbb/cross-references.md` for routing accepted knowledge back into the owning Memory Bank surface instead of leaving it only in transient notes.

## Findings folded into the protocol

- Normal `PRT-038` implementation waves should run from `feature/*` branches created off `develop`, with one active parallel wave per `git worktree`; `main` is reserved for governed production promotion and `hotfix/*`.
- Commit, push, PR, GitHub CI, Vercel/hosted builds, and package release are distinct stages. Remote triggers must happen only when the wave actually needs remote review/evidence, not as a background habit.
- `Verification` is the default protected-branch health signal. `Release Packages` matters only for explicit package-release waves.
- `preview` is not `beta`. Hosted acceptance requires beta-lane deploy truth, deployment-pair integrity, auth/bootstrap readiness, and scenario-level evidence after preflight.
- Migration-sensitive waves need explicit compatibility sequencing, backup/safety-artifact handling, rollback/containment notes, and production stop conditions before promotion.
- Lessons learned and insights belong first in numbered run-folder artifacts, then accepted long-lived findings must be routed into the owning Memory Bank SSoT by MBB ownership.
- Subagents need explicit operational briefing: allowed remote actions, required checks, required runbook reading, and mandatory lessons/insights capture.

## Applied documentation updates

- `PRT-038` now marks `стадия проработки плана: фаза 3 выполнена`.
- `PRT-038` now includes an operational execution model for git/worktree discipline, commit/push/CI/hosted trigger policy, deploy/preflight/rollout rules, and subagent operational briefing.
- `PRT-038` now strengthens the local-check, CI-gate, hosted-proof, and rollout-sensitive sections so they align with real repo scripts and the accepted hosted/deploy standards.
- `PRT-038` now contains a dedicated lessons-learned / insights discipline section with MBB routing rules.

## Notes

- This phase was documentation-only; no code tests or hosted checks were executed.
- The local verification baseline referenced in the updated protocol is anchored to the real current repo scripts: `pnpm check`, `pnpm typecheck`, and package-local `build` / `typecheck` where applicable.
