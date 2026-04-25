---
file: .tasks/prt-042-channel-runtime-implementation-plan/tasks/T-042-05-selleragent-adoption-readiness.md
description: SellerAgent readiness task for future PRT-042 adoption.
purpose: Identify SellerAgent adoption path and blockers without forcing premature code changes.
version: 0.1.0
date: 2026-04-25
status: PLANNED
tags: [task, prt-042, selleragent, adoption]
parent: ../index.md
---

# Task T-042-05: SellerAgent Adoption Readiness

## Context to read

- Framework reports for `T-042-00..03`.
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/index.md`
- SellerAgent channel/conversation/assist docs and package manifests.
- `.memory-bank/spec/runtime/channel-runtime-contract.md`
- `.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `.memory-bank/spec/operations/git-flow.md`
- `.memory-bank/spec/engineering/delivery-standards.md`

## Goal

Produce a SellerAgent adoption-readiness report and Memory Bank routing recommendation without making unnecessary product code changes.

## Why this task exists

SellerAgent is the second-product proof candidate, but first-wave stability should come from Docoved before broader extraction is declared stable.

## Write scope

- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/**` only if routing docs need a minimal note.
- `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-05-selleragent-adoption-readiness.md`
- `.tasks/prt-042-channel-runtime-implementation-plan/inventory/T-042-05-selleragent-adoption-readiness.md`

## Do not touch

- Do not edit SellerAgent runtime code unless explicitly opened by a later task.
- Do not pull Docoved dependencies into SellerAgent.
- Do not restate the framework contract as SellerAgent-owned truth.

## Required research

- Locate current SellerAgent conversation/assist answer artifacts.
- Locate Telegram-named or channel-specific helpers that may later map to canonical response documents.
- Identify product-owned command handlers and why they should remain local.
- Identify whether any immediate adoption blocker exists.
- Locate SellerAgent product-local deployment/scenario docs only to classify future hosted needs; do not plan hosted deploy for readiness-only work.

## Implementation rules

- Keep SellerAgent product truth local.
- Use upstream `bot-platform` as the contract owner.
- Treat old `sales-agent` references as lineage only.

## Thin spots and risks

- SellerAgent may not need code changes in first wave.
- Over-eager adoption could create cross-product coupling before Docoved proof is accepted.

## Verification gates

- Read-only inventory by default.
- If docs are edited, run markdown local link check and `git diff --check`.

## Definition of done

- Adoption readiness and blockers are documented.
- Any SellerAgent Memory Bank routing update is minimal and points upstream.
- No product code changes are made without a follow-up task.

## Lessons learned / insights

- If SellerAgent readiness reveals undocumented adoption, package, channel, command, or product-ops constraints, write them to `../lessons/NNN-lessons-learned.md`.
- If readiness reveals a reusable second-consumer insight, write it to `../lessons/NNN-insights.md`.
- Do not write a diary; record only durable facts and recommendations with proposed Memory Bank destination.
- The report must state whether lessons/insights were created.

## Report format

Write `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-05-selleragent-adoption-readiness.md` with:
- searched paths;
- adoption candidates;
- blockers;
- docs changed or recommended;
- follow-up task proposal.
