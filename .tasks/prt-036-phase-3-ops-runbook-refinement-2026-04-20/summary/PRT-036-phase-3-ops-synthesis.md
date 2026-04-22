---
file: .tasks/prt-036-phase-3-ops-runbook-refinement-2026-04-20/summary/PRT-036-phase-3-ops-synthesis.md
description: Phase-3 synthesis for PRT-036 focused on operational execution, git-flow alignment, CI/Vercel policy, deploy gates, and lessons-learned discipline.
purpose: Record which project runbooks and delivery standards were used to refine PRT-036 so the repo-split protocol stays aligned with real operational practice.
version: 1.0.0
date: 2026-04-20
status: ACTIVE
tags: [tasks, protocol, synthesis, ops, runbook, ci-cd, lessons-learned]
---

# PRT-036 Phase 3 Ops/Runbook Synthesis

## Purpose

Refine `PRT-036` so the repository-split protocol follows the project's real operating model for:
- git flow and worktrees;
- commit/push timing;
- GitHub CI and Vercel build triggers;
- beta/prod deployment truth;
- hosted verification sequencing;
- migration, backup, and rollout preflight;
- lessons learned / insights capture.

## Source documents reviewed

- `.memory-bank/spec/operations/git-flow.md`
- `.memory-bank/spec/operations/deployment-architecture.md`
- `.memory-bank/spec/operations/runbook.md`
- `.memory-bank/spec/operations/production-rollout-runbook.md`
- `.memory-bank/spec/operations/hosted-beta-acceptance-contract.md`
- `.memory-bank/spec/scenarios/hosted-beta-execution-model.md`
- `.memory-bank/spec/engineering/delivery-standards.md`
- `.memory-bank/mbb/principles.md`
- `.github/workflows/verification.yml`
- `.github/workflows/release-packages.yml`
- `package.json`

## Main operational conclusions

### Git and worktrees

- The split protocol must keep using the project's canonical branch model:
  - `feature/*` from `develop`
  - `hotfix/*` from `main`
  - PR merge commits into protected branches
- Parallel protocol lanes should use separate worktrees rather than one shared dirty workspace.
- Commits should be made at bounded slice checkpoints before verifier handoff or PR/update.

### Push, CI, and hosted builds

- Pushes are justified when review, remote verification, or an intentional hosted deploy step is needed.
- GitHub `Verification` is the main protected-branch quality signal.
- `Release Packages` on `develop` is release-readiness validation, not hosted deploy truth.
- Hosted builds must not be triggered casually; docs-only or local-only waves should usually stop before deploy-triggering branches.

### Deployment and hosted proof

- Beta proof must use the stable aliased environment, not preview or branch intention.
- Hosted acceptance must follow:
  - preflight
  - bootstrap/session
  - `beta_api`
  - thin `beta_ui`
  - `beta_external_manual` only when unavoidable
- Deploy to beta when hosted scenarios are actually in scope, not just because code changed.

### Migration and rollout

- Migration-sensitive waves must record schema compatibility strategy, backup/preflight obligations, and rollback notes.
- For current SellerAgent hosted production promotion, `sa-admin rollout` remains the governed path.
- Green build or green package workflow alone is insufficient proof for beta/prod readiness.

### Lessons learned and insights

- Run-folder lessons are useful execution artifacts, but MBB requires long-lived truth to be folded back into owning SSoT.
- Therefore the protocol must require numbered `lessons/*-lessons-learned.md` and `lessons/*-insights.md` files when non-obvious findings appear, plus an explicit closeout step that absorbs accepted lessons into Memory Bank docs.

## Protocol changes applied

- Added explicit `Git And Worktree Discipline`.
- Added `Push, CI, And Hosted Build Policy`.
- Added `Local Verification Baseline`.
- Added `Deployment And Hosted Verification Policy`.
- Added `Lessons Learned And Insights Discipline`.
- Strengthened evidence and acceptance gates for GitHub/Vercel green states, hosted scenario verdicts, and migration/backups.
- Marked `стадия проработки плана: фаза 3 выполнена`.

## Outcome

`PRT-036` now reflects the project's actual delivery/runbook model closely enough to use as the execution protocol for the repo split without re-deriving the ops rules from chat each time.
