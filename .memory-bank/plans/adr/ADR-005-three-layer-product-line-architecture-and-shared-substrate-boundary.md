---
file: .memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md
description: 'ADR-005: adopt a three-layer product-line architecture so bot-platform owns both the framework substrate and the extracted cross-product shared substrate, while product repos keep their policy packs.'
purpose: Read when deciding whether a capability belongs in bot-platform, in the extracted shared substrate, or in a product repo after the repo split is complete.
version: 1.0.0
date: 2026-04-23
status: ACTIVE
tags: [adr, architecture, product-line, layering, shared-substrate, bot-platform]
parent: .memory-bank/plans/adr/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/spec/project/three-layer-product-line-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/guides/explanation/product-line-layering-and-split-rationale.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/project/docoved-platform-adoption-boundary.md
  - /Users/deksden/Documents/_Projects/sales-agent/.memory-bank/plans/protocols/PRT-034-docoved-burst-continuity-finalization-and-verification-repair.md
  - /Users/deksden/Documents/_Projects/sales-agent/.memory-bank/plans/protocols/PRT-035-docoved-semantic-folder-governance-indirect-references-temporal-defaults-and-duplicate-review.md
history:
  - version: 1.0.0
    date: 2026-04-23
    changes: Accepted the post-split three-layer product-line model so the next platform protocol can extract the shared cross-product substrate without dissolving SellerAgent and Docoved into mere configuration.
---

# ADR-005: Three-Layer Product-Line Architecture And Shared-Substrate Boundary

## Status

Accepted on `2026-04-23`.

## Context

`PRT-036` successfully split the mixed source into:
- `bot-platform` as the framework repo;
- `seller-agent` as the SellerAgent product repo;
- `docoved-agent` as the Docoved product repo.

That split solved repo ownership, but it did not yet solve the deeper architectural question revealed by the current code and Memory Bank truth:
- SellerAgent and Docoved still share a large part of the agent execution cycle;
- some runtime files are byte-identical across both products;
- SellerAgent currently embeds Docoved execution directly for mixed flows;
- Docoved still carries Seller-scoped dependencies and transition seams.

The naive two-layer model `platform + products` is therefore no longer sufficient.
It hides a real middle layer that already exists in behavior and code, but is not yet cleanly owned.

At the same time, the products are not reducible to configuration.
Their hard truths remain different:
- SellerAgent owns burst semantics, assist/review/takeover, customer memory, commerce, and business-profile publication;
- Docoved owns document grounding, source publication, active snapshots, semantic navigation, and knowledge-review semantics.

## Decision

### 1. The target operating model is three-layer, not two-layer

The accepted target model is:

1. platform substrate;
2. shared cross-product substrate;
3. product policy packs.

### 2. The shared middle layer remains platform-owned

The extracted shared middle layer is not a third product repo.
Its canonical owner is `bot-platform`, because it must expose stable reusable contracts to more than one product.

This layer currently splits into two related families:
- interaction substrate;
- governed-content and import substrate.

### 3. Product repos keep product truth as policy packs

SellerAgent and Docoved remain first-class product repos.
They are not “skins over config”.

They keep:
- product invariants;
- product object models;
- product-specific prompts, UI, and operational behavior;
- product-owned runbooks and acceptance overlays.

### 4. `sales-agent` becomes archive-only lineage, not an execution owner

The former mixed repo remains useful only as historical lineage for why decisions were made and how the split happened.

It is not an active owner for:
- new architecture truth;
- new shared capability development;
- new product delivery.

### 5. Product adoption protocols may start only after the platform kickoff gate is declared

The readiness gate for product-level protocols is owned by `bot-platform` and is defined in:
- `PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`

Product repos may start their own adoption protocols only after that gate is explicitly satisfied.

## Consequences

### Positive

- the real shared layer is named and can be extracted intentionally instead of remaining duplicated;
- framework concerns, shared cross-product behavior, and product invariants stop collapsing into the same bucket;
- SellerAgent and Docoved can evolve in parallel without reopening the repo-split question each time;
- `sales-agent` can be retired without losing lineage.

### Trade-offs

- `bot-platform` becomes responsible for more than the narrow execution kernel;
- the shared middle layer must be designed carefully so it does not silently absorb product truths;
- migration must keep both products fully functional while duplicate seams are retired.

## Rejected Alternatives

### Two layers only: `platform + products`

Rejected because it hides the already-real shared cross-product substrate and leaves duplication without a canonical owner.

### “The products differ mostly by configuration”

Rejected because configuration is only part of the difference.
Product invariants still define materially different behavior and acceptance rules.

### A separate new product for source processing

Rejected for now.
The first required step is a source-processing contract, not a premature extra product or service boundary.

### Keeping `sales-agent` as an active bridge owner

Rejected because it prolongs ambiguity and preserves legacy ownership instead of converging toward the split target state.

## Non-Decisions

This ADR does not yet fix:
- the final package layout for the shared middle layer;
- the final database and API placement of each shared object;
- the exact UI composition between platform primitives and product screens;
- the exact extraction order for every duplicated runtime file.
