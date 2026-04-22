---
file: .memory-bank/plans/adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md
description: 'ADR-004: canonical framework terminology for workspace, product instance, pipeline, channel, and environment so tenancy, product ownership, and deployment lanes stay unambiguous.'
purpose: Keep platform control-plane and runtime docs aligned on stable multi-product terms that do not collapse tenant, product, transport, and environment semantics.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
tags: [adr, terminology, workspace, product-instance, pipeline, channel, environment, bot-platform]
parent: .memory-bank/plans/adr/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
  - .memory-bank/spec/architecture/platform-glossary.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Migrated ADR-004 into bot-platform as repo-local framework planning truth; preserved the decision semantics and reframed examples/links to stay framework-owned.
---

# ADR-004: Workspace, Product Instance, Pipeline, Channel, And Environment Terminology

## Status

Accepted on `2026-04-10` in the mixed source, now adopted as repo-local framework ADR truth on `2026-04-21`.

## Context

The split program needs one canonical top-level vocabulary that survives multiple products and multiple deployment lanes.

Without that vocabulary, documents and contracts can drift into conflicting meanings, for example:
- tenant identity mixed with deployment stage;
- product identity mixed with execution mode;
- transport integration identifiers treated as ownership anchors.

This ADR defines stable terms for framework planning and architecture docs.
It does not claim that all runtime code paths are already extracted.

## Decision

### 1. `workspace` means tenant/client organization

`workspace` is the canonical tenancy boundary.

It owns:
- organization identity;
- memberships and trust policy;
- installed product instances;
- channel registrations;
- audit scope.

It is not:
- a deployment stage;
- a branch;
- a Vercel project;
- one publication revision.

### 2. `product instance` means one installed product inside a workspace

`product instance` is the canonical installed-product entity within a workspace.

It owns:
- product kind;
- product-scoped defaults and policies;
- bindings to product data;
- bindings to channels used by that product.

Product names (for example SellerAgent or Docoved) are examples of product kinds, not framework-required defaults.

### 3. `pipeline` means execution mode inside a product, not product identity

`pipeline` describes a workflow family or execution mode.

It is not a tenancy entity and does not replace `product instance`.

Consequences:
- one product instance may expose multiple pipelines;
- each channel binds to exactly one entry pipeline;
- pipeline selection happens inside product-instance context.

### 4. `channel` means communication surface bound through a product instance

`channel` is the control-plane representation of one communication surface.

A channel:
- belongs to a workspace;
- is connected to one product instance;
- declares one entry pipeline;
- carries transport configuration, audience policy, and channel-scoped overrides.

Transport identifiers (`integrationKey` and similar) remain compatibility anchors only, not tenancy or product ownership anchors.

### 5. `environment` / `stage` means deployment lane, not tenant identity

`local`, `preview`, `beta`, and `prod` are deployment environments.

They define:
- physical deployment contour;
- databases/domains/secrets;
- active code and data revisions.

They do not define separate workspaces.

### 6. Logical product data identity survives across environments

Logical product data identity does not change because the stage changes.

What may differ by environment:
- physical materialization;
- active revision/publication;
- rollout timing.

Example:
- the same logical knowledge source can point to a different active revision in `beta` and `prod` while keeping one logical identity.

## Consequences

### Positive

- tenant and deployment semantics stop collapsing into one term;
- channel bindings can stay transport-agnostic and product-aware;
- product-specific entities no longer need to masquerade as universal ownership anchors;
- stage promotion can be modeled as revision movement, not tenant migration.

### Trade-offs

- temporary compatibility bridges are needed for legacy naming and IDs;
- some docs/contracts will remain transitional during migration waves;
- control-plane read models need explicit ownership modeling.

## Rejected Alternatives

### `beta` and `prod` as separate workspaces

Rejected because it mixes tenant boundary and deployment lane, and treats release promotion as tenant migration.

### `pipeline` as product identity

Rejected because products can expose multiple execution modes and pipeline should not own channels or product data.

### Product-specific objects as universal ownership anchors

Rejected because framework terminology must remain valid across products, not one product's domain model.

## Non-Decisions

This ADR does not fix:
- full `product instance` data model shape;
- exact table/API migration sequencing;
- cross-channel reply-thread continuity policy;
- product-owned publication mechanics beyond terminology constraints.
