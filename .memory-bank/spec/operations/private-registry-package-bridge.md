---
file: .memory-bank/spec/operations/private-registry-package-bridge.md
description: Operational contract for preparing and publishing framework-safe bot-platform packages through the approved private registry bridge.
purpose: Read before replacing vendored product mirrors with published framework packages so package metadata, auth expectations, verification, and scope boundaries stay aligned with ADR-001.
version: 1.0.0
date: 2026-04-20
status: ACTIVE
tags: [spec, operations, package-registry, bot-platform, prt-036]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/plans/adr/ADR-001-private-registry-bridge-for-product-repos.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
  - /Users/deksden/Documents/_Projects/bot-platform/packages/api-contract/package.json
  - /Users/deksden/Documents/_Projects/bot-platform/packages/scenario-system/package.json
---

# Private Registry Package Bridge

## Purpose

`bot-platform` is the framework repo in `PRT-036`.
When product repos stop using temporary vendored mirrors, they must consume extracted framework packages through the ADR-approved private registry bridge.

This document defines the minimum operational truth for that bridge.

## Current bridge posture

- Primary bridge: published private-registry packages from `bot-platform`.
- Temporary exception: explicit narrow vendored mirrors with owner, upstream provenance, and removal trigger.
- Not allowed as the primary bridge:
  - subtree/submodule dependency flows;
  - hidden mixed-repo runtime coupling;
  - publishing mixed product-owned seams as if they were framework packages.

## Registry target

Current default registry target for `@bot-platform/*` publish-ready packages:
- GitHub Packages at `https://npm.pkg.github.com`

Why:
- the repo remote is GitHub-hosted;
- the bridge is intended to stay private while the split is in flight;
- the same registry model can be authenticated from local development, GitHub Actions, and Vercel.

If the registry target changes later, update this document and the package manifests in the same wave.

## What counts as publish-ready

A framework package is publish-ready only when all of the following are true:

- the exported surface is describable without product-local truth;
- the package has stable manifest metadata:
  - `name`
  - `description`
  - `version`
  - `exports`
  - `files`
  - `repository`
  - `homepage`
  - `publishConfig`
  - `license`
- package lifecycle hooks protect pack/publish hygiene:
  - `prepack` must build the package-local dist output before packing/publishing
  - `publishConfig.access` must keep the package on the restricted/private path
- package tarball hygiene is checked:
  - no accidental product files
  - no unnecessary build residue such as `.tsbuildinfo`
- package-local `typecheck` and `build` pass
- `pnpm publish --dry-run --no-git-checks` is reviewed for the package before first real publish

Publish-ready does not mean "full release automation is already built".
It only means the seam is shaped and documented well enough to become a deliberate private package instead of a vendored exception.

## What must stay out of scope

Do not publish:

- mixed `core` as one broad package;
- mixed `db`;
- workflow hosts with product runtime truth;
- SellerAgent- or Docoved-specific prompts, handlers, stores, admin shells, or migrations;
- package groups that still need vendored narrowing before their API boundary stabilizes.

## Auth and install policy

The registry bridge must be supportable in every owning contour:

- Local development:
  - maintainers need registry auth capable of installing and publishing `@bot-platform/*`;
  - do not rely on an undocumented global npm state;
  - use repo-local or explicitly provisioned auth instructions when product repos start consuming published packages.
- GitHub Actions:
  - workflows that install or publish `@bot-platform/*` must use explicit registry auth secrets/tokens;
  - package publish is not considered healthy until the workflow can authenticate non-interactively.
- Vercel:
  - product repos that consume `@bot-platform/*` must receive install-time registry auth in their Vercel project settings before vendored mirrors are removed;
  - do not switch a product repo from vendored to published packages until the hosted install path is proven.

Secret ownership remains repo-local:
- `bot-platform` owns publish credentials for framework package publication;
- each product repo owns the install credentials/config required for its own CI and Vercel contour.

## Version consumption policy

- Product repos consume published framework packages through deliberate pinned versions.
- Version bumps happen by explicit PRs in the consuming repo.
- Rollback happens first by reverting the consumed package version, not by emergency source copying.
- Vendored exceptions must be removed once the same seam is proven through the private registry bridge.

## Verification baseline

For the first publish-ready tranche, run at least:

- `pnpm typecheck`
- `pnpm build`
- `pnpm --filter @bot-platform/api-contract pack --pack-destination <tmp-dir>`
- `pnpm --filter @bot-platform/scenario-system pack --pack-destination <tmp-dir>`
- inspect the packed `package/package.json` for each tarball
- `pnpm --filter @bot-platform/api-contract publish --dry-run --no-git-checks`
- `pnpm --filter @bot-platform/scenario-system publish --dry-run --no-git-checks`

Packed-manifest inspection is required because internal workspace dependencies must be validated in the packed artifact form that consumers/installers will actually see.

Add stronger release automation only when the repo is ready to perform repeated real publishes.

## Documentation obligations

When a vendored mirror is replaced by a published package:

- update the owning protocol wave summary;
- update the vendored metadata/removal note in the consuming repo;
- capture any auth/install lessons learned in the active wave artifacts;
- fold durable lessons back into the owning Memory Bank section by MBB routing rules.
