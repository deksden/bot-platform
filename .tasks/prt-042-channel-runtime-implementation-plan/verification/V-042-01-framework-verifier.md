# V-042-01 Framework Verifier Evidence

## Command Results

| Command | Result | Notes |
| --- | --- | --- |
| `pnpm typecheck` | Pass | Root TypeScript build graph compiles successfully. |
| `pnpm check` | Pass | Alias to `pnpm build`; completed successfully. |
| `pnpm changeset:status` | Pass | Reports `@dd-bot-platform/channel-runtime` as a minor bump. |
| `pnpm --filter @dd-bot-platform/channel-runtime pack --pack-destination <temp-dir>` | Pass | Tarball contains only `dist/**` plus `package.json`; `prepack` rebuilt the package first. |
| `node --test packages/channel-runtime/dist/channel-runtime.spec.js` | Pass | 4 tests passed. |
| `node -e "const pkg=require('./packages/channel-runtime/dist'); ..."` | Pass | Public runtime exports resolved from built artifacts. |
| `pnpm changeset:publish --dry-run` | Pass | Would publish `@dd-bot-platform/channel-runtime@0.1.0`; already-published packages were skipped. |
| `git diff --check` | Pass | No whitespace or patch-format issues. |
| `rg -n -P "^import .*from '(?!(@dd-bot-platform/api-contract|@dd-bot-platform/core|node:|\\./))" packages/channel-runtime/src` | Pass | No unexpected imports found. |
| `rg -n -P "^import .*from '.*(product|provider|telegram|email|supabase|prisma|db|sql)" packages/channel-runtime/src` | Pass | No product/provider/DB imports found. |

## Pack Evidence

- Tarball path reported by `pnpm pack`: `/tmp/channel-runtime-pack-062zRn/dd-bot-platform-channel-runtime-0.1.0.tgz`
- Packed manifest contents:
  - `name: @dd-bot-platform/channel-runtime`
  - `version: 0.1.0`
  - `main: dist/index.js`
  - `types: dist/index.d.ts`
  - `exports` exposes only the package root entry point
  - `publishConfig.access: public`
  - runtime dependencies remain framework-local: `@dd-bot-platform/api-contract` and `@dd-bot-platform/core`

## Boundary Evidence

- Source imports in `packages/channel-runtime/src` are limited to:
  - `@dd-bot-platform/api-contract`
  - `@dd-bot-platform/core`
  - `node:assert/strict`
  - `node:test`
  - local package files
- No provider, product, DB, migration, or external transport SDK imports were present in the package source.

## Notes

- The pack step exercised `prepack`, so the tarball evidence reflects a fresh package build rather than stale `dist` output.
- `git status --short` returned clean after pack/publish dry-run work, so no generated artifacts remained in the workspace.
