---
file: .memory-bank/plans/adr/ADR-001-private-registry-bridge-for-product-repos.md
description: 'ADR-001: use private registry packages as the primary dependency bridge from bot-platform into product repos during the split.'
purpose: Record the long-lived decision for how selleragent and docoved-agent consume extracted framework packages while repository split waves are in flight.
version: 1.1.0
date: 2026-04-20
status: SUPERSEDED
tags: [adr, dependency-bridge, package-registry, repo-split, bot-platform, selleragent, docoved]
parent: .memory-bank/plans/adr/index.md
related_files:
  - .memory-bank/plans/adr/ADR-002-public-npm-bridge-for-framework-packages.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/repo-structure.md
  - /Users/deksden/Documents/_Projects/sales-agent/.tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-02-dependency-bridge-decision.md
history:
  - version: 1.1.0
    date: 2026-04-20
    changes: Superseded by ADR-002 after npm rejected restricted scoped publication for the first framework-safe packages; the long-lived bridge remains versioned npm packages, but the accepted operational path for the first publishable slices is now public scoped npm.
---

# ADR-001: Private Registry Bridge For Product Repos

## Status

Superseded on `2026-04-20` by [ADR-002](ADR-002-public-npm-bridge-for-framework-packages.md).

## Context

`PRT-036` splits the current mixed source into:
- framework repo: `bot-platform`;
- product repo: `selleragent`;
- product repo: `docoved-agent`.

During the split, product repos still need a repeatable way to consume extracted framework code without:
- cloning extra source trees inside CI/CD;
- wiring git subtree/submodule-like bridges into Vercel deploys;
- keeping the mixed monorepo as a hidden runtime dependency.

The bridge must work for:
- local installs;
- GitHub Actions;
- Vercel builds;
- deliberate upgrades and rollbacks.

## Decision

Use **private registry packages** as the primary dependency bridge from `bot-platform` into `selleragent` and `docoved-agent`.

Policy:
- `bot-platform` publishes only extracted, framework-safe packages;
- product repos consume those packages through pinned versions;
- version bumps happen through explicit PRs in the consuming repo;
- rollback happens by reverting the package version first.

## What This Means

### Allowed as the standard bridge

- versioned internal packages from `bot-platform`;
- registry authentication in local development, GitHub Actions, and Vercel;
- semver or tightly pinned upgrade flow controlled by product repos.

### Allowed only as a temporary exception

`vendoring shim / temporary mirrors` may be used only when all of the following are true:
- the seam is needed now to unblock a migration wave;
- the seam is still too unstable to publish;
- the mirrored slice is small and isolated;
- the mirror has an explicit owner and expiry condition.

Any vendored bridge must declare:
- upstream source repo/path and commit;
- intended replacement package;
- removal trigger.

### Not accepted as the primary bridge

- git subtree / submodule-like dependency bridges;
- “stay in the mixed monorepo until the end” as a dependency model.

## Guardrails

Only publish a package when it can be described without product-local truth.

Do not publish early:
- mixed `packages/core` as one package;
- mixed `packages/db`;
- mixed workflow hosts;
- SellerAgent- or Docoved-specific prompts, stores, handlers, runtime services, or migration truth.

Publish first when ready:
- framework-safe `api-contract` slices;
- framework-safe `client-sdk` base transport;
- `observability`;
- framework-safe `platform-config`;
- small framework kernels from `core`;
- reusable workflow or command primitives after extraction.

## Consequences

Positive:
- repo-local CI/CD and Vercel builds stay simple;
- release control becomes explicit and auditable;
- rollback becomes a version-management action instead of source surgery.

Trade-offs:
- registry auth must be provisioned and maintained in every owning contour;
- publication discipline matters, because a bad boundary becomes harder to unwind after release.

## Follow-up Requirements

- define registry auth and install policy for local dev, GitHub Actions, and Vercel;
- keep product repos pinned to deliberate package versions;
- document any vendored exception with expiry;
- retire vendored exceptions once the seam stabilizes and a publishable package exists.
