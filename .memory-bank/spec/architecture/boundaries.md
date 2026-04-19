---
file: .memory-bank/spec/architecture/boundaries.md
description: 'Framework/product boundary baseline for bot-platform.'
purpose: Define what may live in bot-platform and what must remain product-local.
version: 0.1.0
date: 2026-04-19
status: DRAFT
tags: [architecture, boundaries, bot-platform, framework]
parent: .memory-bank/spec/architecture/index.md
---

# Framework Boundaries

`bot-platform` owns:
- framework kernels;
- shared contracts;
- shared SDK and API base layers;
- auth, command, workflow, scenario, and persistence framework contracts;
- shared documentation standards.

`bot-platform` does not own:
- SellerAgent product truth;
- Docoved product truth;
- product databases, secrets, deployments, or operator runbooks.

Promotion rule:
- code or docs move into `bot-platform` only when they are product-agnostic or already have multiple real product consumers.
