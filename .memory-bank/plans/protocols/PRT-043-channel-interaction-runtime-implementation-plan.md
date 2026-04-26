---
file: .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md
description: Implementation plan companion for PRT-043, covering subagent task packets, dependency graph, verification-by-subagent, local/hosted checks, and documentation closure.
purpose: Use before implementing PRT-043 so work is sliced into bounded subagent tasks with clear context, ownership, verification, and Memory Bank evidence rules.
version: 0.1.0
date: 2026-04-26
status: DRAFT
tags: [protocol-detail, implementation-plan, subagents, channel-runtime, command-runtime]
parent: .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md
related_files:
  - .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md
  - .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md
  - .memory-bank/spec/runtime/command-framework-contract.md
  - .memory-bank/spec/runtime/channel-runtime-contract.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/operations/observability-and-incident-diagnostics.md
  - .memory-bank/spec/operations/git-flow.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/mbb/templates/feature.md
  - .memory-bank/mbb/templates/protocol.md
  - .memory-bank/mbb/delivery-docs-guide.md
  - .memory-bank/mbb/scenario-docs-guide.md
  - .tasks/prt-043-channel-interaction-runtime/000-index.md
  - .tasks/prt-043-channel-interaction-runtime/001-task-packet-template.md
history:
  - version: 0.1.0
    date: 2026-04-26
    changes: Added phase-2 implementation planning for subagent-based execution, task packet format, dependency graph, verifier workflow, checks, hosted beta gates, and documentation closure.
---

# PRT-043 Channel Interaction Runtime Implementation Plan

## Phase state

стадия проработки протокола: фаза 2 выполнена

This companion turns PRT-043 from architectural protocol into an executable implementation plan.
It does not authorize coding by itself: pre-code gates in PRT-043 still must be resolved before implementation tasks start.

## Subagent operating model

Workspace:
- `.tasks/prt-043-channel-interaction-runtime/`

Required files already created:
- `000-index.md` — workspace navigation and rules;
- `001-task-packet-template.md` — template for implementation and verification task packets.

Rules:
- every subagent task starts from a dedicated task packet file in the workspace;
- every subagent writes a report file in the same workspace;
- task packets must be similar in discipline to MBB feature/protocol templates: goal, context, grounding, scope, non-goals, risks, acceptance, checks, and report format;
- every task packet must require an explicit context-readiness pass before edits: docs read, searches run, files inspected, existing seams/helpers/tests found, assumptions listed, and unresolved gates reported;
- a subagent must not edit code or canonical docs until it has formed and recorded task context in its report or notes;
- orchestrator must close agents that are no longer needed before launching new work;
- new work should prefer a new subagent rather than reusing stale context;
- full context fork must not be combined with model override;
- reports are evidence, not canonical Memory Bank truth;
- durable lessons/insights must be promoted to the owning Memory Bank before closure.

## Task packet requirements

Each task packet must include:
- task id and title;
- suggested agent type/model, for example `gpt-5.5` for architecture/package-boundary tasks, `gpt-5.3-codex` for code-heavy implementation, `gpt-5.4-mini` for bounded inventory/verification;
- read/write scope, with disjoint write ownership when tasks run in parallel;
- context docs to read before work;
- concrete code searches to run before editing;
- a `Context readiness checklist` requiring the subagent to verify repository status, gather missing context, inspect relevant seams/tests/helpers, and decide whether the task is ready or blocked;
- implementation steps and non-goals;
- rationale for why the task is sliced this way;
- relevant coding/documentation standards;
- risks, tricky points, and rollback/abort conditions;
- completion criteria;
- required local/hosted checks;
- exact report path and report format.

Task packets must cite relevant standards:
- `spec/project/feature-area-boundaries.md` for framework/product ownership;
- `spec/runtime/command-framework-contract.md` for command contract ownership;
- `spec/runtime/channel-runtime-contract.md` for canonical response/render ownership;
- `spec/operations/observability-and-incident-diagnostics.md` for logs/errors/redaction;
- `spec/operations/git-flow.md` and deployment docs for commit/push/deploy flow;
- `mbb/delivery-docs-guide.md`, `mbb/scenario-docs-guide.md`, and relevant templates for documentation discipline.

Context readiness is part of task completion.
If a subagent discovers missing docs, unclear ownership, absent tests/helpers, or a pre-code gate that affects its task, it must stop and report the blocker instead of guessing.

## Implementation dependency graph

Pre-code gates:
- `G-043-01`: command-framework implementation/export location decided;
- `G-043-02`: threading/delivery intent scope decided: channel-runtime now or product-local until second proof;
- `G-043-03`: Docoved first parity command set defined;
- `G-043-04`: SellerAgent first read-only/diagnostic subset defined;
- `G-043-05`: shared vs SellerAgent-only delivery fields classified;
- `G-043-06`: minimum channel-instance threading config shape defined.

Implementation tasks:
- `T-043-01`: platform package-boundary decision packet; depends on no other task; blocks code tasks.
- `T-043-02`: command-framework typed contracts and tests; depends on `T-043-01`.
- `T-043-03`: channel-runtime candidate intent/result contracts and tests; depends on `T-043-01` and `G-043-02`.
- `T-043-04`: platform observability/error/idempotency helper tests; depends on `T-043-02` and/or `T-043-03` depending on final package split.
- `T-043-05`: Docoved command/email/threading inventory; can run in parallel after `G-043-03` is drafted.
- `T-043-06`: SellerAgent command/delivery inventory; can run in parallel after `G-043-04` and `G-043-05` are drafted.
- `T-043-07`: Docoved adoption implementation; depends on platform package release or approved prerelease bridge plus `T-043-05`.
- `T-043-08`: SellerAgent adoption implementation; depends on platform package release or approved prerelease bridge plus `T-043-06`.
- `T-043-09`: cross-repo docs, scenario, release, and closure evidence; depends on at least one product adoption and all touched package checks.

Parallelism:
- inventories for Docoved and SellerAgent can run in parallel;
- command-framework contracts and channel-runtime intent/result contracts can run in parallel only if write scopes are disjoint;
- product adoption tasks should wait for the platform package version unless a documented prerelease bridge is approved;
- verifier tasks can run in parallel with non-overlapping final polish once implementation reports exist.

Do not create tasks for:
- framework DB/read-model tables;
- UI/admin screens;
- provider SDK sender extraction;
- mutation command expansion before read-only/diagnostic proof is stable.

## Verification by subagent

Every implementation task that changes code or canonical docs needs verification.

Verifier task packet input:
- original task packet;
- subagent implementation report;
- actual changed files/diff;
- relevant tests/check outputs;
- relevant Memory Bank docs.

Verifier responsibilities:
- check the implementation against the original task scope and non-goals;
- inspect actual code/docs, not only the report;
- confirm no product logic leaked into platform packages;
- confirm no framework DB/UI/provider sender scope was introduced;
- confirm checks/evidence match acceptance criteria;
- list defects as required fixes or accepted follow-ups;
- write a verifier report to `.tasks/prt-043-channel-interaction-runtime/T-043-XX-verification.md`.

Orchestrator responsibilities:
- read verifier report and implementation report;
- make final acceptance decision;
- patch or assign follow-up for any accepted defect;
- close subagents that are no longer needed.

## Testing and scenario plan

Framework local/package lane:
- package typecheck/build for touched packages;
- package `prepack` or pack dry-run when public package surface changes;
- tests for policy precedence, deny-over-allow, parse/result/failure envelopes, import boundaries, and redaction-safe observability helpers when added;
- tests for threading/delivery intent only if those types are added to the platform package.

Docoved local lane:
- Telegram/email command parser and dispatcher behavior;
- ordinary email question classified as `not_a_command`;
- unauthorized email sender and Telegram user denied safely;
- reply/threading fallback and required-target behavior;
- duplicate webhook/email handling idempotent or visibly suppressed;
- canonical response rendering parity across Telegram/email.

Docoved hosted beta lane:
- normal Telegram answer still works;
- normal email answer still works;
- authorized and unauthorized command behavior works in Telegram/email;
- beta email `ask@beta-mail.docoved.pro` replies as `Re:`;
- stable beta alias/readback confirms deployed target;
- evidence maps to Docoved scenario anchors such as `SCN-201`, `SCN-202`, `SCN-204`, and `SCN-211` where present.

SellerAgent local lane:
- privileged command gates preserve actor/capability distinctions;
- read-only/diagnostic subset adopted before mutation commands;
- Telegram menu/help projection remains derived, not authoritative;
- release-control mutation commands keep existing product permission gates;
- delivery outcome mapping does not replace product workflows.

SellerAgent hosted beta lane:
- `SCN-053`-anchored Telegram observed-user/employee verification remains valid where applicable;
- privileged command denial for external/unknown users still works;
- release readback/control commands respect actor policy if included in the adoption slice;
- hosted evidence includes stable alias/readback and traceable logs.

Do not run hosted deploys just to exercise CI. Hosted deploy happens only when hosted beta scenarios are ready.

## Documentation closure

Before closing any stage:
- update platform runtime specs if a candidate contract becomes stable;
- update product Memory Banks for Docoved/SellerAgent adoption details;
- update scenario docs and verification matrices touched by the adoption;
- promote durable lessons/insights from `.tasks/` into owning Memory Bank sections;
- record package versions, commit ids, CI statuses, deployment URLs/aliases, and hosted proof artifacts when relevant;
- leave no uncommitted or unpushed local tails.

## Report expectations

Implementation subagent report:
- summary;
- context readiness: docs read, searches run, files inspected, seams/helpers/tests found, assumptions/unknowns;
- files changed;
- decisions/deviations;
- checks run and results;
- risks/follow-ups;
- lessons/insights candidates.

Verifier subagent report:
- task verdict: accepted / needs fixes / blocked;
- scope compliance;
- code/doc findings;
- checks/evidence review;
- required fixes;
- optional follow-ups.

Orchestrator closeout report:
- tasks completed;
- subagent reports accepted;
- fixes applied;
- checks/evidence;
- docs promoted;
- open pre-code gates or follow-ups.
