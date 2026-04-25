---
file: .tasks/prt-042-channel-runtime-implementation-plan/tasks/T-042-04-docoved-adoption-packet.md
description: Product adoption task for Docoved channel-runtime mapping and channel adapter proof.
purpose: Adopt the framework canonical response document in Docoved without changing answer/source semantics or provider behavior.
version: 0.1.0
date: 2026-04-25
status: PLANNED
tags: [task, prt-042, docoved, adoption]
parent: ../index.md
---

# Task T-042-04: Docoved Adoption Packet

## Context to read

- Framework reports for `T-042-00..03`.
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/index.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-answer-artifact-contract.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-channel-adapter-contract.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md`
- Docoved package manifests and existing email/Telegram adapter code.
- `.memory-bank/spec/runtime/channel-runtime-contract.md`
- `.memory-bank/spec/engineering/delivery-standards.md`
- `.memory-bank/spec/operations/git-flow.md`
- `.memory-bank/spec/operations/deployment-architecture.md`
- `.memory-bank/spec/operations/hosted-beta-acceptance-contract.md`
- `.memory-bank/spec/scenarios/hosted-beta-execution-model.md`

## Goal

Create Docoved product-local adoption docs and implementation proof for mapping `DocovedAnswerArtifact` into `CanonicalResponseDocument`.

## Why this task exists

Docoved is the first real consumer proof: the same canonical answer document must feed email and Telegram without changing grounding/source semantics.

## Write scope

- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/**` adoption docs and indexes needed for this task.
- `/Users/deksden/Documents/_Projects/docoved-agent/**` code/tests directly required for mapping/rendering proof.
- `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-04-docoved-adoption-packet.md`

## Do not touch

- Do not move Docoved source-of-truth answer semantics into `bot-platform`.
- Do not change hosted provider secrets or beta/prod environment configuration.
- Do not change command behavior.
- Do not edit SellerAgent.
- Do not add DB migrations unless a separate product-local protocol is opened.

## Required research

- Locate `DocovedAnswerArtifact` definition and current answer rendering paths.
- Locate email adapter behavior for `Re:`, `Message-ID`, `In-Reply-To`, and `References`.
- Locate Telegram render/markdown helpers.
- Locate existing Docoved local/beta verification commands.
- Locate Docoved product-local git-flow, deployment, beta, provider, backup/migration, and scenario runbooks before hosted verification is planned.
- Identify what Sales Agent legacy code is lineage only and what remains useful migration input.

## Implementation rules

- Product mapping stays in Docoved.
- Channel adapters render/deliver; they do not decide answer/source semantics.
- Preserve current beta Telegram/email behavior unless the change is explicitly documented.
- Keep framework dependency product-neutral.
- Document product adoption locally and link upstream `bot-platform` `PRT-042`.

## Thin spots and risks

- Email threading behavior is operationally important for `ask@beta-mail.docoved.pro`.
- Telegram markdown escaping may differ from email HTML/text needs.
- Existing tests may not cover channel semantic drift; add focused fixture if adjacent test practice exists.

## Verification gates

- Docoved `pnpm typecheck` or repo equivalent.
- Docoved `pnpm check` or repo equivalent.
- Local mapping/rendering fixture.
- Beta Telegram proof if Telegram adapter behavior changes.
- Beta email proof if email adapter behavior changes.
- Email `Re:`/threading proof when email adapter is touched.
- Do not trigger hosted deploys unless a beta scenario needs real beta lane proof.
- If Docoved DB/storage/schema changes appear necessary, stop and record a blocker instead of implementing them in this task.

## Definition of done

- Docoved Memory Bank routes readers to upstream `PRT-042`.
- Mapping exists and is covered by a local proof.
- Email and Telegram render the same canonical document without answer/source drift.
- Hosted beta requirements are run or explicitly marked `N/A` with reason.

## Lessons learned / insights

- If Docoved adoption reveals undocumented product ops, email/Telegram provider, hosted beta, scenario, package-consumption, or runbook constraints, write them to `../lessons/NNN-lessons-learned.md`.
- If adoption reveals a reusable product-channel design insight, write it to `../lessons/NNN-insights.md`.
- Do not write a diary; record only durable facts and recommendations with proposed Memory Bank destination.
- The report must state whether lessons/insights were created.

## Report format

Write `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-04-docoved-adoption-packet.md` with:
- changed Docoved files;
- mapping summary;
- channel behavior impact;
- checks/proofs run;
- hosted beta evidence or `N/A` rationale;
- risks/follow-ups.
