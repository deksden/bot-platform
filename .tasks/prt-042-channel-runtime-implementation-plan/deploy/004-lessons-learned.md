# 004 — Lessons learned: lockfile and post-version release gate

## Useful future rule

When a new workspace package is added, `pnpm-lock.yaml` must be part of the implementation commit even if `pnpm typecheck`, `pnpm build`, package-local `pack`, and dry-run publish were run successfully.

## Why it matters

GitHub CI uses `pnpm install --frozen-lockfile`; a missing workspace importer in `pnpm-lock.yaml` fails before TypeScript/build checks can start.

## Release nuance

For Changesets-based package publication in this repo, `pnpm changeset:status` is useful before materializing versions. After `pnpm changeset:version`, the practical release-readiness gate becomes `pnpm changeset:publish --dry-run` on a clean, versioned tree.
