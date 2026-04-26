# T-043-08 SellerAgent Adoption Report

## Context readiness (recorded before edits)

### Branch/status and git-flow docs
- SellerAgent repo: `/Users/deksden/Documents/_Projects/seller-agent`
- Branch/status snapshot: `feature/EP-022-wave-17-prt-008-beta-closure...origin/feature/EP-022-wave-17-prt-008-beta-closure` (clean)
- Git-flow doc read: `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/git-flow.md`

### Memory-bank, protocol, command catalog, current status
- Read: `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/index.md`
- Read: `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-007-telegram-privileged-command-surface-bot-level-release-control-and-runtime-diagnostics.md`
- Read: `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/reference/telegram-direct-bot-command-catalog.md`
- Read: `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/current-status-report.md`

### Platform PRT-043 specs/reports
- Read: `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
- Read: `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/T-043-01-report.md`
- Read: `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/T-043-06-report.md`
- Read: `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/006-platform-slice-closeout.md`
- Read task: `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/T-043-08-selleragent-adoption.task.md`

### Current dependencies and lockfile state
- Root manifest inspected: `/Users/deksden/Documents/_Projects/seller-agent/package.json`
- Lockfile inspected: `/Users/deksden/Documents/_Projects/seller-agent/pnpm-lock.yaml`
- Existing platform deps in SellerAgent lock are only `@dd-bot-platform/api-contract@0.2.0` and `@dd-bot-platform/scenario-system@0.2.0` (via `packages/sa-judge`)
- No existing `@dd-bot-platform/core` or `@dd-bot-platform/channel-runtime` dependency in SellerAgent workspace packages

### Existing implementation anchors inspected
- Telegram command runtime: `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-commands.ts`
- Telegram command projection sync: `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/command-projections.ts`
- Telegram ingress/fallback delivery handling: `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/index.ts`
- Delivery outcome/runtime summary files:
  - `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/conversations/reply-execution.ts`
  - `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/conversations/delivery-summary.ts`
  - `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/conversations/telegram-delivery.ts`
  - `/Users/deksden/Documents/_Projects/seller-agent/apps/workflow/workflows/reply-job.ts`
- Proof scripts inspected: `/Users/deksden/Documents/_Projects/seller-agent/scripts/verify-security.mjs`, `/Users/deksden/Documents/_Projects/seller-agent/scripts/verify-security-live.mjs`

### Required searches run
- `TelegramCommandActorClass`, `commandAccessPolicy`, `actorClass`, `deliveryOutcome`, `/versions`, `/releases`, `/current`, `@dd-bot-platform` across SellerAgent source and lockfile
- Confirmed read-only command subset and delivery outcome seams from T-043-06 inventory remain present

## Package release blocker and bridge path
- **Blocker (exact):** npm registry currently exposes only `0.2.0` for:
  - `@dd-bot-platform/core`
  - `@dd-bot-platform/channel-runtime`
- Verification command used:
  - `npm view @dd-bot-platform/core version versions --json`
  - `npm view @dd-bot-platform/channel-runtime version versions --json`
- PRT-043 command-framework and delivery/threading contracts were landed in bot-platform `0.3.0` code, but `0.3.0` is not yet published; direct package adoption in SellerAgent is blocked.

### Viable bridge/release path
1. Preferred: publish `@dd-bot-platform/core@0.3.0` and `@dd-bot-platform/channel-runtime@0.3.0` via bot-platform Changesets release flow, then pin these versions in SellerAgent.
2. Temporary local bridge (only for local proof if explicitly approved): pin both packages to the same bot-platform prerelease artifact/commit tarball and document as non-production bridge.

## Adoption execution decision
- Because package release blocker is active, full dependency adoption is blocked.
- Safe product-local prep that does not require unreleased package publication is still allowed and will be applied below.

## Changes made
- `seller-agent/packages/core/src/telegram-commands.ts`
  - Added `PlatformCommandActorType` plus `mapTelegramAccessToPlatformCommandActorType(...)` to bridge SellerAgent access profile into PRT-043 command-framework actor vocabulary.
  - Extended read-only diagnostic command output (`/help`, `/whoami`) with `Framework actor` line derived from the mapping helper.
- `seller-agent/packages/core/src/conversations/delivery-platform-compat.ts` (new)
  - Added safe product-local compatibility mapping for SellerAgent delivery outcomes/summaries to a channel-runtime-like terminal delivery summary shape:
    - `mapDeliveryOutcomeToPlatformDeliveryCompatSummary(...)`
    - `mapDeliverySummaryToPlatformDeliveryCompatSummary(...)`
  - Mapping is summary-only; no workflow/job state replacement.
- `seller-agent/packages/core/src/index.ts`
  - Exported the new command-actor and delivery-compat helpers.
- `seller-agent/apps/server/src/telegram/index.ts`
  - Added `platformDeliverySummary` into partial-delivery failure details via the new compat mapper.
  - Existing delivery behavior and terminal status logic are unchanged.

### Dependency decision for this task
- Did **not** add `@dd-bot-platform/core` / `@dd-bot-platform/channel-runtime` to SellerAgent yet, because required `0.3.0` contracts are not published in npm.
- No lockfile dependency update was made for blocked package adoption.

## Local checks
- `pnpm --filter @selleragent/core typecheck` ✅
- `pnpm --filter @selleragent/core build && pnpm --filter @selleragent/server typecheck` ✅
- Note: direct `@selleragent/server` typecheck before rebuilding `@selleragent/core` failed due stale `core/dist` export map; resolved by building `@selleragent/core` first.

## Hosted beta proof path (first safe slice)
- Keep first proof on read-only command subset only: `/start`, `/help`, `/whoami`, `/status`, `/context`, `/pipeline`, `/why`, `/inspect`, `/versions`, `/releases`, `/current`.
- Verify unverified vs verified actor separation and policy-derived command visibility.
- Verify release readback (`/current`) remains read-only and reflects integration-level assignment precedence.
- Keep `/use_release`, `/confirm`, `/use_model_policy`, and deep-debug mutation/operational expansion out of first proof.

## Notes
- `bot-platform/docoved-agent` was not touched.
- No commit will be created.
