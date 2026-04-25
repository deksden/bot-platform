---
file: .memory-bank/spec/architecture/boundaries.md
description: 'Framework/product boundary baseline for bot-platform.'
purpose: Define what may live in bot-platform and what must remain product-local.
version: 0.5.0
date: 2026-04-23
status: ACTIVE
tags: [architecture, boundaries, bot-platform, framework]
parent: .memory-bank/spec/architecture/index.md
history:
  - version: 0.5.0
    date: 2026-04-24
    changes: Added the PRT-041 package-identity and package-graph proof rule after the Docoved/SellerAgent dependency-boundary cleanup.
  - version: 0.4.0
    date: 2026-04-23
    changes: Extended the framework boundary baseline for the post-split three-layer model by naming the extracted shared control-plane and governed-content substrates as platform-owned areas while keeping product invariants local.
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
- shared control-plane substrate contracts;
- shared governed-content and workflow-backed import substrate contracts;
- shared documentation standards.

`bot-platform` does not own:
- SellerAgent product truth;
- Docoved product truth;
- product databases, secrets, deployments, or operator runbooks.

Promotion rule:
- code or docs move into `bot-platform` only when they are product-agnostic or already have multiple real product consumers.

Three-layer rule:
- `bot-platform` owns both the platform substrate and the extracted shared cross-product substrate;
- SellerAgent and Docoved keep their product policy packs and product invariants locally;
- product configuration alone is not a valid reason to erase product-local ownership.

Package-scope rule:
- framework-owned packages use `@dd-bot-platform/*`;
- SellerAgent-owned packages use `@selleragent/*`;
- Docoved-owned packages use `@docoved-agent/*`;
- any remaining `@sales-agent/*` packages are transitional mixed-repo names only and do not represent framework ownership.

Package-identity proof rule:
- source imports, package `name`, manifests, exports, TypeScript resolution, workspace lockfile, and local workspace symlinks must tell the same ownership story;
- a product-local package publishing under another product scope is a boundary defect even if local code compiles;
- after a workspace package rename, refresh both lockfile and local `node_modules` links before accepting typecheck results;
- manifest-only dependencies with no source imports should be classified separately from runtime bridges and removed when package graph proof is green.
