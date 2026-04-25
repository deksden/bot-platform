---
file: .tasks/prt-042-channel-runtime-implementation-plan/tasks/T-042-02-framework-docs-and-mbb-routing.md
description: Documentation task for PRT-042 framework docs and Memory Bank routing.
purpose: Keep protocol, runtime spec, and indexes aligned with the implemented first-wave channel-runtime surface.
version: 0.1.0
date: 2026-04-25
status: PLANNED
tags: [task, prt-042, docs, mbb]
parent: ../index.md
---

# Task T-042-02: Framework Docs And MBB Routing

## Context to read

- `.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `.memory-bank/spec/runtime/channel-runtime-contract.md`
- `.memory-bank/spec/runtime/index.md`
- `.memory-bank/spec/index.md`
- `.memory-bank/plans/index.md`
- `.memory-bank/index.md`
- `.memory-bank/mbb/principles.md`
- `.memory-bank/mbb/delivery-docs-guide.md`
- `.memory-bank/mbb/indexing-guide.md`
- `.memory-bank/mbb/templates/protocol.md`
- `.memory-bank/mbb/templates/feature.md`
- `.memory-bank/spec/operations/git-flow.md`
- `.memory-bank/spec/operations/hosted-beta-acceptance-contract.md`
- `T-042-00` inventory report.

## Goal

Update Memory Bank documentation so framework truth, implementation state, task evidence, and product adoption routing remain discoverable and non-duplicative.

## Why this task exists

MBB requires the stable vocabulary to live in specs, execution sequencing to live in protocols, and transient task evidence to stay outside canonical truth.

## Write scope

- `bot-platform/.memory-bank/**` docs directly related to PRT-042.
- `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-02-framework-docs-and-mbb-routing.md`

## Do not touch

- Do not edit code.
- Do not edit product repos.
- Do not restate product-local mapping details as framework truth.
- Do not promote raw subagent reports into canonical docs without synthesis.

## Required research

- Confirm all local markdown links resolve.
- Confirm indexes route from root -> plans/spec -> PRT-042/channel-runtime contract.
- Confirm related files distinguish normative framework docs from product adoption/lineage links.

## Implementation rules

- Follow MBB Single Source of Truth.
- Keep specs normative and protocols procedural.
- Keep `.tasks/**` as evidence only.
- Update version/history when changing Memory Bank docs.

## Thin spots and risks

- Duplicating the contract between protocol and spec can cause drift.
- Absolute cross-repo links are acceptable only when deliberately framed as product adoption or lineage.

## Verification gates

- Local markdown link check for changed docs.
- `git diff --check`.

## Definition of done

- Runtime spec and protocol agree on scope.
- Indexes route readers correctly.
- Product adoption obligations are named without becoming framework truth.
- Report records changed docs and checks.

## Lessons learned / insights

- If docs routing reveals stale, contradictory, or missing Memory Bank/ops guidance, write it to `../lessons/NNN-lessons-learned.md`.
- If docs work reveals a reusable documentation-pattern insight, write it to `../lessons/NNN-insights.md`.
- Do not write a diary; record only durable facts and recommendations with proposed Memory Bank destination.
- The report must state whether lessons/insights were created.

## Report format

Write `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-02-framework-docs-and-mbb-routing.md` with:
- changed docs;
- routing decisions;
- links checked;
- unresolved documentation follow-ups.
