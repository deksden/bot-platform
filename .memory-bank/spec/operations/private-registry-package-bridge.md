---
file: .memory-bank/spec/operations/private-registry-package-bridge.md
description: Operational contract for preparing and publishing framework-safe bot-platform packages through the approved private registry bridge.
purpose: Read before replacing vendored product mirrors with published framework packages so package metadata, auth expectations, verification, and scope boundaries stay aligned with ADR-001.
version: 1.1.0
date: 2026-04-20
status: ACTIVE
tags: [spec, operations, package-registry, bot-platform, prt-036]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/plans/adr/ADR-001-private-registry-bridge-for-product-repos.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
  - .memory-bank/guides/reference/npm-package-release-runbook.md
  - .changeset/config.json
  - .github/workflows/release-packages.yml
  - scripts/publish-private-packages.mjs
  - /Users/deksden/Documents/_Projects/bot-platform/packages/api-contract/package.json
  - /Users/deksden/Documents/_Projects/bot-platform/packages/scenario-system/package.json
history:
  - version: 1.1.0
    date: 2026-04-20
    changes: Replaced the temporary GitHub Packages assumption with the real npm target under `@dd-bot-platform`, added Changesets/release-workflow expectations, and clarified token/install guidance for product repos and Vercel.
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

Current default registry target for publish-ready framework packages:
- npm registry at `https://registry.npmjs.org`
- framework scope: `@dd-bot-platform`

Why:
- the user already established the owning npm organization for the framework packages;
- the same registry model is already familiar from the existing `selleragent` release path;
- npm-based install auth is easier to reuse across local development, GitHub Actions, and Vercel than a second GitHub Packages-specific contour.

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
- Changesets and the release workflow recognize the package as part of the controlled publish set

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
  - maintainers need registry auth capable of installing and publishing `@dd-bot-platform/*`;
  - do not rely on an undocumented global npm state;
  - use repo-local or explicitly provisioned auth instructions when product repos start consuming published packages;
  - use `NPM_TOKEN` or the equivalent local publish/install token routed through an isolated npm userconfig.
- GitHub Actions:
  - workflows that install or publish `@dd-bot-platform/*` must use explicit registry auth secrets/tokens;
  - package publish is not considered healthy until the workflow can authenticate non-interactively.
- Vercel:
  - product repos that consume `@dd-bot-platform/*` must receive install-time registry auth in their Vercel project settings before vendored mirrors are removed;
  - do not switch a product repo from vendored to published packages until the hosted install path is proven.

Secret ownership remains repo-local:
- `bot-platform` owns publish credentials for framework package publication;
- each product repo owns the install credentials/config required for its own CI and Vercel contour.

Recommended consumer install contour for product repos:

```ini
@dd-bot-platform:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
always-auth=true
```

## Version consumption policy

- Product repos consume published framework packages through deliberate pinned versions.
- Version bumps happen by explicit PRs in the consuming repo.
- Rollback happens first by reverting the consumed package version, not by emergency source copying.
- Vendored exceptions must be removed once the same seam is proven through the private registry bridge.
- `bot-platform` uses Changesets plus a controlled publish allowlist to keep that versioning explicit and auditable.

## Verification baseline

For the first publish-ready tranche, run at least:

- `pnpm typecheck`
- `pnpm build`
- `pnpm --filter @dd-bot-platform/api-contract pack --pack-destination <tmp-dir>`
- `pnpm --filter @dd-bot-platform/scenario-system pack --pack-destination <tmp-dir>`
- inspect the packed `package/package.json` for each tarball
- `pnpm changeset status`
- `pnpm changeset:publish --dry-run`
- `pnpm --filter @dd-bot-platform/api-contract publish --dry-run --no-git-checks`
- `pnpm --filter @dd-bot-platform/scenario-system publish --dry-run --no-git-checks`

Packed-manifest inspection is required because internal workspace dependencies must be validated in the packed artifact form that consumers/installers will actually see.

The current standard release automation for this repo is:

- Changesets for release intent and version propagation
- `scripts/publish-private-packages.mjs` for allowlisted publication only
- `.github/workflows/release-packages.yml` for release-readiness validation on `main` and controlled manual publish while the repo still operates without an active `develop` branch

## Documentation obligations

When a vendored mirror is replaced by a published package:

- update the owning protocol wave summary;
- update the vendored metadata/removal note in the consuming repo;
- capture any auth/install lessons learned in the active wave artifacts;
- fold durable lessons back into the owning Memory Bank section by MBB routing rules.
