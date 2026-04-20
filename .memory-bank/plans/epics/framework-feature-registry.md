---
file: .memory-bank/plans/epics/framework-feature-registry.md
description: 'Framework feature registry for bot-platform: framework-only planning surface.'
purpose: Define stable framework feature groups with explicit scope, exclusions, ownership language, and primary-doc anchors under PRT-036.
version: 0.2.0
date: 2026-04-20
status: ACTIVE
tags: [features, registry, bot-platform, framework, planning]
parent: .memory-bank/plans/epics/index.md
history:
  - version: 0.2.0
    date: 2026-04-20
    changes: Actualized feature groups, aligned naming with framework feature-area boundaries, added explicit framework vs product exclusions (PRT-036), replaced placeholder primary-doc pointers with real repo-local doc anchors, and promoted the registry to active planning use.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework feature registry created from PRT-036 and the contract-boundary workstream.
---

# Framework Feature Registry

This registry is **framework-only**: it defines what `bot-platform` owns as reusable capability and contract truth.
It does not define SellerAgent or Docoved behavior.

Authority:
- `PRT-036` boundary rules: [PRT-036](../protocols/PRT-036-platform-framework-and-product-repo-split.md)
- Framework boundaries: [Framework boundaries](../../spec/architecture/boundaries.md)
- Framework feature-area map: [Feature area boundaries](../../spec/project/feature-area-boundaries.md)

## Summary

| feature_group | framework role | primary docs (current anchors) | status note |
| --- | --- | --- | --- |
| `runtime-kernel` | framework owner | [Runtime hub](../../spec/runtime/index.md) | defined; runtime seams are still mixed in source until extraction |
| `auth-framework` | framework owner (contracts + extension points) | [Runtime hub](../../spec/runtime/index.md) | defined; product repos own tables/migrations/authority projections |
| `command-framework` | framework owner (envelope + primitives) | [Runtime hub](../../spec/runtime/index.md) | defined; product repos own actual commands and permission mapping |
| `workflow-framework` | framework owner (contracts + helpers) | [Runtime hub](../../spec/runtime/index.md) | defined; product repos own workflow hosts and business steps |
| `client-contracts` | framework owner | [Client API hub](../../spec/client-api/index.md) | defined; product repos own product namespaces and operations |
| `persistence-interfaces` | framework owner (contracts only) | [Runtime hub](../../spec/runtime/index.md) | defined; product repos own concrete DB schema/migrations/runtime wiring |
| `scenario-system` | framework owner | [Scenario specs hub](../../spec/scenarios/index.md), [Scenarios hub](../../scenarios/index.md) | defined; product repos own product acceptance and e2e journeys |
| `support-packages` | framework owner (product-agnostic only) | [Repo structure](../../spec/project/repo-structure.md) | defined; package extraction is still pending |
| `documentation-and-mbb-standards` | upstream canonical (mirrored to product repos) | [MBB index](../../mbb/index.md), [Operations hub](../../spec/operations/index.md) | stable; governs cross-repo authoring discipline |

## Ownership rule

From `PRT-036`: a capability belongs to `bot-platform` only when it can be described **without product domain truth** and is **product-agnostic or multi-consumer**.
If a group still requires SellerAgent or Docoved truth, it must remain product-local until a seam exists.

## Feature groups

### `runtime-kernel`

Framework-owned scope:
- execution kernel and turn envelope contracts;
- provider adapter interfaces and governance;
- pipeline registry contracts;
- prompt manager contracts (as mechanism, not product prompt content).

Explicit exclusions (product-owned):
- product runtime policies and product prompts;
- product domain routing and product-specific orchestration.

Primary docs:
- [Runtime hub](../../spec/runtime/index.md)
- [Feature area boundaries](../../spec/project/feature-area-boundaries.md)

Not framework-owned yet (until extraction):
- the mixed-source code that currently co-locates product runtime behavior with the kernel remains product-local truth until the seam is extracted.

### `auth-framework`

Framework-owned scope:
- auth framework primitives, guards, sessions, adapters, and policy interfaces;
- principal/session/invite/membership vocabulary as framework contracts;
- extension points and test helpers.

Explicit exclusions (product-owned):
- concrete user tables and migrations;
- product membership semantics and authority projections;
- deploy-time wiring and secrets.

Primary docs:
- [Runtime hub](../../spec/runtime/index.md)
- [PRT-036](../protocols/PRT-036-platform-framework-and-product-repo-split.md)

Not framework-owned yet (until extraction):
- any mixed implementation that still depends on product DB/schema truth must remain in the product repo until contract-first seams are separated.

### `command-framework`

Framework-owned scope:
- command envelope shape;
- parser/registry primitives;
- command execution hooks;
- common diagnostics patterns.

Explicit exclusions (product-owned):
- actual command implementations and business side effects;
- channel/product enablement logic;
- permission mapping and read-model projections.

Primary docs:
- [Runtime hub](../../spec/runtime/index.md)
- [PRT-036](../protocols/PRT-036-platform-framework-and-product-repo-split.md)

Not framework-owned yet (until extraction):
- any command implementation that encodes product truth remains product-local; only the framework primitives graduate here.

### `workflow-framework`

Framework-owned scope:
- workflow framework contracts (host/start/callback vocabulary and S2S auth vocabulary);
- durable-step conventions, resumability/retry helpers, and common instrumentation;
- generic workflow test harness patterns.

Explicit exclusions (product-owned):
- workflow hosts and deployment units;
- workflow storage bindings;
- business steps and product workflow families.

Primary docs:
- [Runtime hub](../../spec/runtime/index.md)
- [PRT-036](../protocols/PRT-036-platform-framework-and-product-repo-split.md)

Not framework-owned yet (until extraction):
- any workflow code coupled to product deployment/runtime wiring remains product-local until a clean host contract is extracted.

### `client-contracts`

Framework-owned scope:
- API namespace registry and operation catalog plumbing;
- success/error envelopes;
- base transport and invocation shell contracts;
- product extension rules (how products add namespaces without breaking the shared client contract).

Explicit exclusions (product-owned):
- SellerAgent operation namespaces;
- Docoved operation namespaces;
- product-specific client SDK layers.

Primary docs:
- [Client API hub](../../spec/client-api/index.md)
- [Repo structure](../../spec/project/repo-structure.md)

Not framework-owned yet (until extraction):
- any mixed operation catalogs that still embed product namespaces are not framework truth; only the shared envelope/transport layer is.

### `persistence-interfaces`

Framework-owned scope:
- framework-facing persistence contracts and interfaces;
- trace/workflow correlation vocabulary;
- store boundary rules (what must remain product-local).

Explicit exclusions (product-owned):
- concrete DB schema and migrations;
- product store topology and runtime bindings;
- backup/rollback procedures.

Primary docs:
- [Runtime hub](../../spec/runtime/index.md)
- [PRT-036](../protocols/PRT-036-platform-framework-and-product-repo-split.md)

Not framework-owned yet (until extraction):
- do not migrate product DB truth into `bot-platform`; only contract interfaces and cross-product correlation vocabulary belong here.

### `scenario-system`

Framework-owned scope:
- scenario taxonomy and authoring contracts;
- evidence rules and hosted verification classes;
- shared runner assumptions (as a framework contract surface).

Explicit exclusions (product-owned):
- SellerAgent product journeys and e2e acceptance;
- Docoved product acceptance and hosted delivery checklists.

Primary docs:
- [Scenario specs hub](../../spec/scenarios/index.md)
- [Scenarios hub](../../scenarios/index.md)
- [Scenario matrix](../../scenarios/scenario-matrix.md)

Not framework-owned yet (until extraction):
- mixed scenarios must be split into framework contract checks here and product integration/e2e scenarios in the owning product repo.

### `support-packages`

Framework-owned scope:
- observability helpers (logging/tracing/diagnostics primitives);
- typed config/env resolution helpers and policy defaults (framework-level);
- shared prompt infrastructure (mechanisms and shared assets only);
- other support packages that stay product-agnostic.

Explicit exclusions (product-owned):
- product env truth (actual secret values, deploy config, provider accounts);
- product dashboards, runbooks, and hosted operational truth.

Primary docs:
- [Repo structure](../../spec/project/repo-structure.md)
- [Feature area boundaries](../../spec/project/feature-area-boundaries.md)

Not framework-owned yet (candidates / gated):
- `packages/ui-contract` is framework-owned only if it remains truly cross-product; otherwise it stays product-local, and only minimal conventions may be upstreamed as contracts.

### `documentation-and-mbb-standards`

Framework-owned scope:
- canonical `mbb/**` authoring standards (upstream in `bot-platform`, mirrored in product repos);
- shared process standards that are explicitly approved for mirroring (example: `git-flow.md`);
- cross-repo documentation discipline for feature/spec/protocol/scenario docs.

Explicit exclusions (product-owned):
- product operator runbooks and product deployment topology;
- product release notes and acceptance overlays.

Primary docs:
- [MBB index](../../mbb/index.md)
- [Operations hub](../../spec/operations/index.md)
- [Git flow](../../spec/operations/git-flow.md)

## Rule

If a feature group cannot be described without SellerAgent or Docoved product truth, it is not ready to live here yet.
