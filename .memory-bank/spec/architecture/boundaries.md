---
file: .memory-bank/spec/architecture/boundaries.md
description: 'Framework/product boundary baseline for bot-platform.'
purpose: Define what may live in bot-platform and what must remain product-local.
version: 0.3.0
date: 2026-04-21
status: ACTIVE
tags: [architecture, boundaries, bot-platform, framework]
parent: .memory-bank/spec/architecture/index.md
history:
  - version: 0.3.0
    date: 2026-04-21
    changes: Promoted the framework/product boundary baseline to active landed architecture status after the first framework architecture/container migration packets under PRT-036.
  - version: 0.2.0
    date: 2026-04-20
    changes: Added the package-scope ownership rule so framework boundaries also govern naming: framework packages use `@dd-bot-platform/*`, while product scopes remain product-local.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework/product boundary baseline for bot-platform.
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

Package-scope rule:
- framework-owned packages use `@dd-bot-platform/*`;
- SellerAgent-owned packages use `@selleragent/*`;
- Docoved-owned packages use `@docoved-agent/*`;
- any remaining `@sales-agent/*` packages are transitional mixed-repo names only and do not represent framework ownership.
