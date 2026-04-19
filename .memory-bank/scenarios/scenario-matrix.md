---
file: .memory-bank/scenarios/scenario-matrix.md
description: 'Initial framework scenario matrix for bot-platform.'
purpose: Map framework capability groups to shared scenario families before product-specific scenarios are migrated into their own repos.
version: 0.1.0
date: 2026-04-19
status: DRAFT
tags: [scenarios, matrix, bot-platform, framework]
parent: .memory-bank/scenarios/index.md
history:
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework scenario matrix created from the current mixed scenario pool and split ownership rules.
---

# Scenario Matrix

| framework_capability | likely_source_scenarios | target_status | note |
| --- | --- | --- | --- |
| typed API and SDK parity | `SCN-001` | framework-owned | shared client/contract verification |
| scenario auth bootstrap | `SCN-012` | framework-owned | shared auth/bootstrap scenario |
| UI contract integrity | `SCN-010` | framework-owned | reusable UI contract layer |
| hosted scenario methodology | `EP-011` scenario family | framework-owned | methodology and harness belong here |
| evaluation and judge contracts | `SCN-040`, `SCN-041`, evaluation scenario family | framework-owned | reusable evaluation contract layer |
| workflow host and replay framework | `SCN-116`, `SCN-118` and related replay framework checks | split | keep framework host checks here, move product replay behavior out |
| runtime kernel and provider governance | `SCN-025`, `SCN-027`, `SCN-028`, `SCN-175` | split | framework kernel checks stay here, Seller/Docoved behavior moves out |

## Rules

- A framework scenario verifies a reusable contract or framework capability.
- If a current scenario mixes framework truth and product behavior, split it into:
  - a framework contract scenario here;
  - a product integration or product e2e scenario in the owning repo.
- `XE-*` does not normally belong in `bot-platform`.
