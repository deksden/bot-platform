# T-043-09 Release And Closure Report

## Context Readiness
- Read the npm release runbook: `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/guides/reference/npm-package-release-runbook.md`
- Read the release workflow: `/Users/deksden/Documents/_Projects/bot-platform/.github/workflows/release-packages.yml`
- Read the publish script: `/Users/deksden/Documents/_Projects/bot-platform/scripts/publish-private-packages.mjs`
- Read the PRT-043 docs: `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md`, `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/006-platform-slice-closeout.md`
- Checked current package versions in the workspace and on npm; all four publishable packages are still `0.2.0` locally and in the registry.
- Checked branch/PR/main status: current branch is `feature/EP-022-prt-043-channel-interaction-runtime`, it is 6 commits ahead of `origin/main`, 0 behind, and has no associated PR.
- Ran `pnpm changeset status`; it fails with `Some packages have been changed but no changesets were found.`

## Release Facts
- Current local package versions:
  - `@dd-bot-platform/api-contract` `0.2.0`
  - `@dd-bot-platform/channel-runtime` `0.2.0`
  - `@dd-bot-platform/core` `0.2.0`
  - `@dd-bot-platform/scenario-system` `0.2.0`
- Current npm registry versions:
  - `@dd-bot-platform/api-contract` `0.2.0`
  - `@dd-bot-platform/channel-runtime` `0.2.0`
  - `@dd-bot-platform/core` `0.2.0`
  - `@dd-bot-platform/scenario-system` `0.2.0`
- Current release automation posture:
  - `Release Packages` runs on pushes to `main` and on manual `workflow_dispatch`.
  - The publish job uses `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`.
  - The workflow validates versioned state with `pnpm changeset:publish --dry-run` before publish.
- Current allowed publish set is aligned across the source of truth files:
  - `scripts/publish-private-packages.mjs`
  - `.changeset/README.md`
  - `.memory-bank/spec/operations/private-registry-package-bridge.md`

## Stale-Docs Check
- The controlled script allowlist is **not stale**: `channel-runtime` is already present in `scripts/publish-private-packages.mjs` alongside `api-contract`, `core`, and `scenario-system`.
- The runbook explicit package checklist was stale because it did not list `@dd-bot-platform/channel-runtime`; the orchestrator updated it in `.memory-bank/guides/reference/npm-package-release-runbook.md`.
- Earlier PRT-042 evidence that said `channel-runtime` was absent from the publish allowlist is stale relative to the current repo state and should not be used as release authority.

## Branch And Merge Gate
- This branch is not publish-ready as-is because it is not merged to `main`.
- The runbook says package release readiness and manual publication run from `main` until a `develop` branch is activated.
- The current release workflow only validates/publishes from `main`, so merge to `main` is part of the required path before publish.

## Changeset Gate
- Initial `pnpm changeset status` failed before versioning.
- Orchestrator then ran `pnpm changeset:version`, materializing:
  - `@dd-bot-platform/core@0.3.0`
  - `@dd-bot-platform/channel-runtime@0.3.0`
- Release readiness after versioning:
  - `pnpm install --frozen-lockfile` ✅
  - `pnpm build` ✅
  - `pnpm changeset:publish --dry-run` ✅
  - dry-run packed `core@0.3.0` and `channel-runtime@0.3.0`; skipped already-published `api-contract@0.2.0` and `scenario-system@0.2.0`.

## Conclusion
- Release closure is **blocked for publish** until the versioned branch is merged to `main` and the publish workflow runs.
- The correct path is:
  1. commit the versioned state on the feature branch;
  2. open PR to `main`;
  3. wait for `Verification` and `Release Packages` readiness on the PR/main path;
  4. merge to `main`;
  5. publish through the workflow with `publish=true` and `NPM_TOKEN`;
  6. verify `npm view @dd-bot-platform/core version` and `npm view @dd-bot-platform/channel-runtime version` return `0.3.0`.
