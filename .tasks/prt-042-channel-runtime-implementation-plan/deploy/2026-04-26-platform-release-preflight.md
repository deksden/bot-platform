# PRT-042 platform release preflight — 2026-04-26

## Scope

Prepare `@dd-bot-platform/channel-runtime` for controlled publication before Docoved beta rollout.

## Findings

- Initial `pnpm install --frozen-lockfile` failed because `pnpm-lock.yaml` did not include the new `packages/channel-runtime` importer.
- The lockfile was regenerated with `pnpm install --no-frozen-lockfile` and then verified with frozen install.
- Changeset intent was materialized with `pnpm changeset:version`, producing `@dd-bot-platform/channel-runtime@0.2.0` and `packages/channel-runtime/CHANGELOG.md`.

## Local evidence

Passed:

- `pnpm install --frozen-lockfile`
- `pnpm typecheck`
- `pnpm build`
- `pnpm --filter @dd-bot-platform/channel-runtime pack --pack-destination /tmp/dd-channel-runtime-pack`
- packed manifest inspection confirms dependencies resolve to `@dd-bot-platform/api-contract@0.2.0` and `@dd-bot-platform/core@0.2.0`
- `pnpm changeset:publish --dry-run`

Expected after versioning:

- `pnpm changeset:status` reports changed packages without pending changesets; this is not the release workflow gate after `changeset version`.
- The release workflow gate is `pnpm changeset:publish --dry-run` on `main`.

## Next release steps

1. Commit and push versioned release state.
2. Merge into `main` through PR.
3. Wait for GitHub `Verification` and `Release Packages` readiness on `main`.
4. Run `Release Packages` with `publish=true`.
5. Verify `npm view @dd-bot-platform/channel-runtime@0.2.0 version`.
