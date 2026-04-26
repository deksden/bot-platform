---
file: .memory-bank/guides/reference/npm-package-release-runbook.md
description: Practical runbook for versioning, verifying, publishing and post-release checking the `@dd-bot-platform/*` npm packages.
purpose: Read when preparing or executing a real npm release for the first publishable framework packages so maintainers can follow one short canonical checklist instead of reconstructing the process from workflow files, Changesets config, and protocol notes.
version: 1.3.0
date: 2026-04-20
status: ACTIVE
parent: .memory-bank/guides/reference/index.md
related_files:
  - .memory-bank/spec/operations/private-registry-package-bridge.md
  - .memory-bank/plans/adr/ADR-002-public-npm-bridge-for-framework-packages.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
  - .changeset/config.json
  - .github/workflows/release-packages.yml
  - scripts/publish-private-packages.mjs
history:
  - version: 1.3.0
    date: 2026-04-26
    changes: Added `@dd-bot-platform/channel-runtime` to the explicit runbook package set and pack/post-publish checklist after PRT-043 release readiness proved it is already controlled by the publish script allowlist.
  - version: 1.2.0
    date: 2026-04-22
    changes: Widened the allowed publish set to include `@dd-bot-platform/core` after the broader Wave 2 runtime-helper pack made the package a real framework seam rather than a bootstrap-only stub, and added package-cleanliness guidance for stale `dist` prevention before `pack`/publish.
  - version: 1.1.0
    date: 2026-04-20
    changes: Updated the runbook after npm rejected restricted scoped publication; the accepted bridge for the first framework-safe slices now uses public scoped npm packages under `@dd-bot-platform`.
---

# npm Package Release Runbook

## Use this runbook when

- releasing `@dd-bot-platform/api-contract`;
- releasing `@dd-bot-platform/channel-runtime`;
- releasing `@dd-bot-platform/core`;
- releasing `@dd-bot-platform/scenario-system`;
- confirming whether a merged framework package change is actually ready to go to npm.

## Canonical ownership

- Bridge policy owner: [.memory-bank/spec/operations/private-registry-package-bridge.md](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/private-registry-package-bridge.md)
- Protocol owner: [.memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md)
- CI workflow surface: [.github/workflows/release-packages.yml](/Users/deksden/Documents/_Projects/bot-platform/.github/workflows/release-packages.yml)
- Controlled publish script: [scripts/publish-private-packages.mjs](/Users/deksden/Documents/_Projects/bot-platform/scripts/publish-private-packages.mjs)

## Release decision

Apply SemVer from the framework package surface:

- `patch`: output corrections, packaging fixes, doc/provenance fixes, non-breaking schema/runtime helper corrections;
- `minor`: new contracts, new helper APIs, new reusable scenario/evidence capabilities without breaking existing consumers;
- `major`: removed or renamed exports, incompatible contract changes, changed defaults with consumer migration impact.

If both packages change together, bump each package according to its own consumer-visible surface.

## Allowed publish set

This runbook currently applies only to:

- `@dd-bot-platform/api-contract`
- `@dd-bot-platform/channel-runtime`
- `@dd-bot-platform/core`
- `@dd-bot-platform/scenario-system`

Do not widen publication beyond this allowlist until the owning protocol wave explicitly accepts new framework packages as publishable seams.

## Pre-release checklist

1. Confirm the target package set and exact intended versions.
2. Add or review the Changeset entries that justify those version bumps.
3. Run local checks in `/Users/deksden/Documents/_Projects/bot-platform`:
   - `pnpm install --frozen-lockfile`
   - `pnpm typecheck`
   - `pnpm build`
4. Run package artifact proof:
   - `pnpm --filter @dd-bot-platform/api-contract pack --pack-destination <tmp-dir>`
   - `pnpm --filter @dd-bot-platform/channel-runtime pack --pack-destination <tmp-dir>`
   - `pnpm --filter @dd-bot-platform/core pack --pack-destination <tmp-dir>`
   - `pnpm --filter @dd-bot-platform/scenario-system pack --pack-destination <tmp-dir>`
   - inspect `package/package.json` from each tarball
5. Run release readiness proof:
   - `pnpm changeset status`
   - `pnpm changeset:publish --dry-run`
6. Check repo-wide GitHub readiness:
   - `Verification` equivalent checks for the commit must be green
   - `Release Packages` readiness validation must be green for the same commit
7. Decide whether product-consumer hosted checks apply:
   - `N/A` when no consuming repo changed yet
   - required before removing vendored mirrors or switching product repos to the published packages

## Canonical release flow

Current bootstrap rule:

- until `develop` is activated in `bot-platform`, package release readiness and manual publication run from `main`

Release flow for the current repo state:

1. Merge the release-ready code to `main`.
2. Confirm the merge commit has green `Release Packages` readiness validation.
3. Run the `Release Packages` workflow with `publish=true`.
4. Verify the published registry state.
5. Record resulting versions in the active protocol/worklog if the release closes a migration wave.

## Preferred publish path

Use the GitHub workflow when available:

1. Open `Release Packages`.
2. Run it with `publish=true`.
3. Wait for the `publish` job to complete successfully.
4. Confirm the workflow used the intended commit SHA.

This is the preferred operational path because it keeps package publication tied to repository automation and avoids ad hoc local auth state.

## Maintainer fallback publish path

Use this only when the workflow path is unavailable or intentionally bypassed by maintainers.

1. Ensure `NPM_TOKEN` or equivalent publish credential is available locally.
2. Avoid relying on a stale global `~/.npmrc`.
3. Use an isolated temporary npm userconfig for the publish command.
4. Publish only from a clean worktree.
5. Publish only through:
   - `pnpm changeset:publish`
   - never `npm publish` directly from package folders outside the controlled script
6. Immediately verify the registry result with `npm view`.

Important rule:

- do not publish from a dirty worktree;
- do not silently publish packages outside the allowlist;
- do not skip the post-publish verification step.

Maintainer lesson:

- do not assume `pnpm pack --json` is machine-clean when package `prepack` hooks print lifecycle logs; prefer discovering the produced tarball from the pack destination and then inspecting the packed manifest directly.
- when a package deleted or renamed exported source files in the same wave, clean `dist/` before trusting the tarball contents; stale compiled files can survive and leak into `pack` output.

## Post-publish verification

For each released package:

1. Check the registry version:
   - `npm view @dd-bot-platform/api-contract version`
   - `npm view @dd-bot-platform/channel-runtime version`
   - `npm view @dd-bot-platform/core version`
   - `npm view @dd-bot-platform/scenario-system version`
2. Check dist-tags if needed:
   - `npm dist-tag ls @dd-bot-platform/api-contract`
3. Verify installability from a clean temp project.
4. For `@dd-bot-platform/scenario-system`, verify the published artifact resolves its dependency on `@dd-bot-platform/api-contract` correctly.
5. Push release tags if they were created locally:
   - `git push origin --tags`

## Minimal release evidence

Capture these facts in the final worklog or handoff:

- commit SHA released;
- package names and versions released;
- whether the publish path was GitHub workflow or maintainer fallback;
- `Release Packages` result;
- `npm view` confirmation for each package;
- confirmation that clean install/import proof succeeded;
- whether release tags were pushed.

## Anti-patterns

Do not treat these as a valid release:

- publishing mixed framework slices just because they compile;
- publishing without a Changeset-backed release intent;
- relying on a stale personal `~/.npmrc` without isolating auth state;
- bypassing the controlled allowlist in `publish-private-packages.mjs`;
- assuming `pnpm pack` alone proves the final published dependency graph without packed-manifest inspection;
- removing vendored consumer mirrors before the published package path is proven in CI and hosted consumer verification.
