---
file: .memory-bank/plans/adr/ADR-002-public-npm-bridge-for-framework-packages.md
description: 'ADR-002: publish extracted framework-safe bot-platform packages as public scoped npm packages under `@dd-bot-platform`.'
purpose: Record the accepted operational deviation from the earlier private-registry assumption after npm refused restricted scoped publication for the current organization/package contour.
version: 1.0.0
date: 2026-04-20
status: ACTIVE
tags: [adr, dependency-bridge, npm, public-package, repo-split, bot-platform]
parent: .memory-bank/plans/adr/index.md
related_files:
  - .memory-bank/plans/adr/ADR-001-private-registry-bridge-for-product-repos.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
  - .memory-bank/spec/operations/private-registry-package-bridge.md
  - .memory-bank/guides/reference/npm-package-release-runbook.md
---

# ADR-002: Public npm Bridge For Framework Packages

## Status

Accepted on `2026-04-20`.

## Context

`ADR-001` selected private registry packages as the primary bridge from `bot-platform` into product repos.

During the first real publication attempt for:

- `@dd-bot-platform/api-contract`
- `@dd-bot-platform/scenario-system`

the npm publish operation failed with:

- `E402 Payment Required`
- message: `You must sign up for private packages`

This means the current npm organization/account contour does not allow the intended restricted/private scoped publication path.

The split program still needs a bridge that is:

- versioned;
- npm/Vercel/GitHub friendly;
- simple for product repos to consume;
- narrower and less operationally fragile than vendored mirrors.

## Decision

Publish extracted framework-safe packages from `bot-platform` as **public scoped npm packages** under:

- `@dd-bot-platform/*`

Policy:

- only framework-safe packages may be published;
- the publish set stays allowlisted and narrow;
- product repos still consume pinned versions through explicit PRs;
- vendored exceptions remain temporary and must be removed once the published package path is proven.

## What This Changes Relative To ADR-001

- The bridge remains versioned npm packages.
- The bridge is no longer private for the current accepted framework-safe slices.
- Product repos no longer need install-time npm auth just to consume `@dd-bot-platform/*`.
- Publish auth is still required for maintainers and release automation.

## Guardrails

This decision does **not** authorize broad public publication.

Allowed now:

- `@dd-bot-platform/api-contract`
- `@dd-bot-platform/scenario-system`

Still not allowed:

- mixed `core`;
- mixed `db`;
- workflow hosts with product runtime truth;
- SellerAgent- or Docoved-specific prompts, handlers, stores, admin shells, or migrations;
- any package not explicitly accepted into the publish allowlist.

## Consequences

Positive:

- product repo installs become simpler in local dev, GitHub Actions, and Vercel;
- the first bridge exercise can proceed immediately without extra private-registry procurement;
- vendored bridge retirement becomes operationally simpler.

Trade-offs:

- published framework code is publicly visible;
- the allowlist and boundary discipline become even more important;
- future package promotion must stay conservative.

## Follow-up Requirements

- update protocol and runbooks to stop assuming private npm consumption for the accepted framework-safe slices;
- keep the publish script allowlisted;
- record the first consumer cutover and vendored mirror retirement in the protocol;
- revisit whether any future package family truly requires a private registry instead of public scoped npm publication.
