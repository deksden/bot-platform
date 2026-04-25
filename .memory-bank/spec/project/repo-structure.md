---
file: .memory-bank/spec/project/repo-structure.md
description: 'Target repository structure for bot-platform as a framework monorepo.'
purpose: Use when placing new framework packages, docs, and support apps so bot-platform grows as a clean framework repo rather than a second mixed product monorepo.
version: 0.3.0
date: 2026-04-25
status: DRAFT
tags: [repo-structure, bot-platform, framework, monorepo]
parent: .memory-bank/spec/project/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/plans/protocols/index.md
history:
  - version: 0.3.0
    date: 2026-04-25
    changes: Added `packages/channel-runtime` as a framework package and documented the thin-seam placement rule from PRT-042.
  - version: 0.2.0
    date: 2026-04-20
    changes: Added the canonical package-naming policy for the split program: framework-owned packages use `@dd-bot-platform/*`, product scopes stay out of bot-platform, and package renaming should happen as each seam migrates rather than as one giant end-only rename.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial bot-platform repo-structure baseline created from PRT-036, the ownership matrix, and the current mixed-repo source layout.
---

# Repo Structure

## Goal

`bot-platform` is the framework repo created by `PRT-036`.
It is not a shared live product instance and it is not a new mixed monorepo.

It exists to own:
- reusable contracts;
- framework kernels;
- shared tooling and support packages;
- shared scenario and evidence mechanics;
- shared documentation standards.

It must not own:
- SellerAgent product truth;
- Docoved product truth;
- product DB topology, secrets, hosted runbooks, or product operator surfaces.

## Target shape

```text
apps/
  cli/                 # framework-facing developer and maintainer CLI
  workflow-host/       # optional framework host skeletons and shared workflow support only
  verification/        # optional framework verification and scenario support apps

packages/
  api-contract/        # framework namespaces, envelopes, contract catalog plumbing
  channel-runtime/     # canonical response-document contract and pure channel render helpers
  client-sdk/          # base transport and typed invoke shell
  core/                # framework kernel, shared runtime seams, command/auth/workflow framework code
  scenario-system/     # shared scenario taxonomy, evidence tooling, semantic-eval shell
  observability/       # logging, tracing, diagnostics helpers
  platform-config/     # typed env/config resolution and policy defaults
  prompt-catalog/      # shared prompt engine and reusable prompt assets
  shared/              # temporary only; should shrink, not grow

.memory-bank/
  spec/
  plans/
  guides/
  scenarios/
  mbb/
```

## What current source paths are expected to seed this repo

High-confidence first-wave candidates from the mixed source repo:
- `packages/observability/**`
- framework slices of `packages/platform-config/**`
- framework slices of `packages/api-contract/**`
- framework slices of `packages/client-sdk/**`
- framework slices of `packages/core/**`
- shared scenario/evidence slices of `packages/scenario-runner/**` extracted into `packages/scenario-system/**`
- canonical `mbb/**`

Likely later candidates after seam extraction:
- framework host glue from `apps/server/**`
- framework workflow helpers from `apps/workflow/**`
- generic utilities that can be extracted out of `packages/shared/**`

## Placement rules

1. Only framework-owned code lands here.
2. A package may move here only when its public API can be described without SellerAgent-specific or Docoved-specific business truth.
3. If code still needs product-specific domain truth, it stays in the product repo until a clean seam exists.
4. `shared` is not a target destination for new code.
5. Product runbooks, product docs, and product scenarios must not accumulate here "temporarily".

## Package naming policy

Canonical scope for this repo:

- framework-owned published or cross-repo packages use `@dd-bot-platform/*`.

This repo must not become the owner of packages named:

- `@selleragent/*`
- `@docoved-agent/*`
- `@sales-agent/*`

Migration rule:

- when a seam is promoted into `bot-platform`, rename it to the target framework scope as part of that migration wave whenever practical;
- do not wait for one giant final rename if a package is already clearly framework-owned and ready to move;
- any temporary mixed-repo package names that survive the split program must be retired by the end of `PRT-036`.

## Package ownership notes

### `api-contract`

Allowed here:
- `system.*`
- `auth.*`
- envelope and contract-catalog plumbing
- framework-owned `channels.*` vocabulary

Not allowed here as long-term product truth:
- SellerAgent product operation namespaces
- Docoved product operation namespaces

### `client-sdk`

Allowed here:
- base transport;
- invoke shell;
- envelope handling;
- shared client primitives.

Product-specific SDK layers belong in product repos.

### `core`

Allowed here:
- runtime kernel;
- provider adapters;
- prompt manager;
- shared workflow/auth/command framework seams;
- framework conversation and persistence abstractions.

Not allowed here:
- Seller customer/commerce/follow-up truth;
- Docoved grounded-answering product truth.

### `channel-runtime`

Allowed here:
- canonical response-document types;
- public/operator/debug visibility helpers;
- citation/source-ref types for channel-neutral delivery;
- minimal markdown/plaintext pure render helpers;
- type-level reuse or re-export of existing `core` and `api-contract` refs.

Not allowed here:
- command registry/dispatch/access policy;
- outbound delivery orchestration;
- provider SDKs or provider payload types;
- email/Telegram/web adapter behavior;
- product answer semantics;
- DB, migrations, read models, or UI screens.

Package-placement rule:
- keep this package as a thin seam;
- if a future addition would require product/provider/runtime side effects, open a follow-up protocol instead of broadening the package opportunistically.

### `scenario-system`

Allowed here:
- shared scenario taxonomy;
- evidence helpers;
- fixture and execution support;
- framework-safe semantic-eval transcript/provenance helpers.

Product suites should not remain in the framework repo.

## Immediate repo bootstrap obligations

To be considered a usable framework repo, `bot-platform` needs at minimum:
- a real `.memory-bank/index.md`;
- framework spec hubs;
- framework planning hubs;
- framework scenario hubs;
- canonical `mbb/**`;
- one framework status snapshot;
- one framework verification matrix.
