# T-042-03 Publish Readiness Evidence

Date: 2026-04-25

## Local checks

- `pnpm build` — passed.
- `pnpm typecheck` — passed.
- `pnpm check` — passed.
- `pnpm changeset:status` — passed after adding a changeset for `@dd-bot-platform/channel-runtime`.
- `pnpm --filter @dd-bot-platform/channel-runtime pack --pack-destination /tmp/channel-runtime-pack` — passed; `prepack` rebuilt `dist` and emitted one tarball.
- Runtime export smoke via `node -e` against `packages/channel-runtime/dist` — passed for value exports.
- Type export smoke via `pnpm exec tsc --noEmit` against `packages/channel-runtime/src/index` — passed for type-only exports.
- `pnpm changeset:publish --dry-run` — passed; dry-run skipped already-published packages and would publish `@dd-bot-platform/channel-runtime@0.1.0`.

## Notable observations

- `pnpm changeset:publish --dry-run` runs package `prepack`, so publish readiness includes a fresh package build, not only stale `dist` inspection.
- The publish bridge now includes `@dd-bot-platform/channel-runtime` in the allowlist.

