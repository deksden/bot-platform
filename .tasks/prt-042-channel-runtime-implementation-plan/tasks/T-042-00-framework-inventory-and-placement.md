---
file: .tasks/prt-042-channel-runtime-implementation-plan/tasks/T-042-00-framework-inventory-and-placement.md
description: Read-only inventory task for PRT-042 framework vocabulary reuse and package placement.
purpose: Decide whether first-wave channel-runtime belongs in a new package or an existing framework package before implementation starts.
version: 0.1.0
date: 2026-04-25
status: PLANNED
tags: [task, prt-042, inventory, package-placement]
parent: ../index.md
---

# Task T-042-00: Framework Inventory And Placement

## Context to read

- `.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `.memory-bank/spec/runtime/channel-runtime-contract.md`
- `.memory-bank/spec/runtime/command-framework-contract.md`
- `.memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md`
- `.memory-bank/spec/project/repo-structure.md`
- `.memory-bank/spec/project/feature-area-boundaries.md`
- `.memory-bank/spec/engineering/coding-style.md`
- `.memory-bank/spec/engineering/delivery-standards.md`
- `.memory-bank/spec/operations/git-flow.md`
- `.memory-bank/spec/operations/private-registry-package-bridge.md`
- `package.json`
- `pnpm-workspace.yaml`
- `tsconfig.build.json`
- `packages/*/package.json`
- `packages/*/src/**/*.ts`
- `scripts/publish-private-packages.mjs`

## Goal

Produce read-only inventory evidence and a package placement recommendation for the first-wave channel-runtime contract.

## Why this task exists

PRT-042 must not create a duplicate vocabulary or an unnecessary package. This task grounds implementation in the actual framework packages before any code is written.

## Write scope

- `.tasks/prt-042-channel-runtime-implementation-plan/inventory/T-042-00-framework-inventory-and-placement.md`
- `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-00-framework-inventory-and-placement.md`

## Do not touch

- Do not edit `packages/**`.
- Do not edit `.memory-bank/**`.
- Do not edit product repos.
- Do not run package publishing.

## Required research

- Search existing framework exports for channel, render, trace, execution, capability, result, command, and pipeline vocabulary.
- Inspect package names, exports, build graph, and publish allowlist.
- Identify whether `@dd-bot-platform/channel-runtime` is justified or whether `core`/`api-contract` should host the first slice.
- Record risks for package publication and product consumption.

## Implementation rules

- Classify every relevant symbol as `reuse`, `re-export`, `new-channel-runtime`, `product-owned`, or `defer`.
- Treat `sales-agent` as lineage only.
- Do not infer product semantics from framework package names.

## Thin spots and risks

- A new package creates publish/build/Changeset obligations.
- Extending `core` could blur kernel versus channel-runtime boundaries.
- Extending `api-contract` could expose runtime helpers through an API schema package accidentally.

## Verification gates

- No code changes.
- Inventory report includes exact searched paths and commands.
- Recommendation includes rollback/alternative if package decision changes.

## Definition of done

- Inventory report exists.
- Placement recommendation is explicit.
- Existing vocabulary reuse list is explicit.
- Blockers/open questions are listed.

## Lessons learned / insights

- If the inventory reveals undocumented package, publish, build, git-flow, or vocabulary constraints, write them to `../lessons/NNN-lessons-learned.md`.
- If the inventory reveals a reusable architectural observation, write it to `../lessons/NNN-insights.md`.
- Do not write a diary; record only durable facts and recommendations with proposed Memory Bank destination.
- The report must state whether lessons/insights were created.

## Report format

Write `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-00-framework-inventory-and-placement.md` with:
- summary decision;
- commands/searches run;
- symbol/vocabulary table;
- package placement recommendation;
- risks and follow-ups.
