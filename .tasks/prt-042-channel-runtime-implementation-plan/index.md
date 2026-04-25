---
file: .tasks/prt-042-channel-runtime-implementation-plan/index.md
description: Implementation planning workspace for PRT-042 channel-runtime canonical response document and rendering.
purpose: Hold task graph, subagent task packets, reports, verification evidence, lessons, and final synthesis for the PRT-042 implementation wave.
version: 0.2.0
date: 2026-04-25
status: ACTIVE
tags: [tasks, prt-042, implementation, subagents, channel-runtime]
parent: .memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md
related_files:
  - .memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md
  - .memory-bank/spec/runtime/channel-runtime-contract.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/engineering/delivery-standards.md
history:
  - version: 0.2.0
    date: 2026-04-25
    changes: Added phase-3 operations planning note for git-flow, CI/Vercel gating, hosted deployment policy, and lessons/insights capture.
  - version: 0.1.0
    date: 2026-04-25
    changes: Created the PRT-042 implementation planning workspace and task graph.
---

# PRT-042 Implementation Workspace

Стадия проработки плана: фаза 2 выполнена.
Стадия проработки плана: фаза 3 выполнена.

This workspace is transient execution evidence. The canonical plan lives in `.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`.

## Folder shape

- `inventory/` — read-only package/vocabulary/product-surface inventory.
- `tasks/` — task files passed to executor/verifier subagents.
- `reports/` — written reports from executor/verifier subagents.
- `verification/` — command outputs, proof notes, hosted evidence links.
- `lessons/` — numbered lessons for later Memory Bank promotion.
- `summary/` — final integrated synthesis.

## Ops rules

- Follow `.memory-bank/spec/operations/git-flow.md`: feature branches from `develop` by default; if `develop` is still absent, record the explicit current-baseline exception in task reports.
- Do not push just to trigger CI or Vercel. Push only after local gates pass and remote evidence is needed for PR, package readiness, or hosted scenario proof.
- GitHub and Vercel results triggered by this protocol must be monitored to final success/failure and recorded in `verification/`.
- Hosted beta deployment is required only when a hosted scenario needs real beta lane proof.
- Framework package-only work does not require Vercel by default.
- No DB backup/migration is planned in first wave; any DB/storage need is a blocker requiring protocol update.

## Lessons and insights

- Lessons go to `lessons/NNN-lessons-learned.md`.
- Insights go to `lessons/NNN-insights.md`.
- Record durable reusable knowledge only, not a diary.
- Each executor/verifier report must say whether lessons/insights were created.
- Final synthesis must route accepted lessons/insights into the correct Memory Bank destination or explicitly defer them with owner/reason.

## Task graph

| Task | Status | Depends on | Write scope |
| --- | --- | --- | --- |
| `T-042-00-framework-inventory-and-placement.md` | planned | none | `.tasks/.../inventory/**` |
| `T-042-01-framework-contract-package-or-module.md` | planned | `T-042-00` | framework package/module files |
| `T-042-02-framework-docs-and-mbb-routing.md` | planned | `T-042-00` | `bot-platform/.memory-bank/**` |
| `T-042-03-framework-verification-and-publish-readiness.md` | planned | `T-042-01`, `T-042-02` | verification evidence, publish allowlist if needed |
| `T-042-04-docoved-adoption-packet.md` | planned | `T-042-01`, `T-042-02` | `docoved-agent` adoption slice |
| `T-042-05-selleragent-adoption-readiness.md` | planned | `T-042-01`, `T-042-02` | `seller-agent` research/docs slice |
| `V-042-01-framework-verifier.md` | planned | `T-042-01..03` | verifier report/evidence |
| `V-042-02-docoved-verifier.md` | planned | `T-042-04` | verifier report/evidence |
| `V-042-03-final-synthesis.md` | planned | all accepted verifier reports | final synthesis |

## Orchestration notes

- Launch independent tasks in parallel only when write scopes do not overlap.
- Use fresh subagents for new tasks and close them after accepted reports unless a follow-up is planned.
- Executor reports go to `reports/T-042-XX-*.md`.
- Verifier reports go to `reports/V-042-XX-*.md`.
- Lessons that should survive the task go to `lessons/L-042-XX-*.md`.
- Final synthesis goes to `summary/PRT-042-implementation-synthesis.md`.
