---
file: .memory-bank/scenarios/index.md
description: 'Framework scenarios hub for bot-platform.'
purpose: Use as the repo-local navigation hub for framework-owned verification scenarios, contract checks, and shared evidence rules.
version: 0.1.0
date: 2026-04-19
status: DRAFT
tags: [scenarios, bot-platform, framework, verification]
parent: .memory-bank/index.md
children:
  - by-epic/index.md
  - contracts/index.md
  - hosted/index.md
history:
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework scenarios hub created during the PRT-036 Memory Bank bootstrap.
---

# Scenarios Hub

`bot-platform` owns only framework scenarios.

This hub is for:
- framework contract verification;
- shared scenario-system behavior;
- shared hosted verification patterns;
- evidence formats that product repos consume but do not own.

It is not for:
- SellerAgent product journeys;
- Docoved product acceptance;
- product-local rollout checklists.

## Initial sections

- [By epic](by-epic/index.md): framework scenarios grouped by platform epic or feature family.
- [Contract scenarios](contracts/index.md): API, auth, workflow, runtime, and persistence contract verification.
- [Hosted scenarios](hosted/index.md): shared hosted verification patterns and framework acceptance anchors.

## First wave outcome

This hub exists now so future scenario migration can land into a stable framework-owned structure instead of a mixed source repo.
