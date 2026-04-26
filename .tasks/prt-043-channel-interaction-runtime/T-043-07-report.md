# T-043-07 Report — Docoved adoption (PRT-043)

## Summary
- `PRT-043` full Docoved adoption is **blocked by package release state**: npm exposes only `@dd-bot-platform/core@0.2.0` and `@dd-bot-platform/channel-runtime@0.2.0`, while required command-framework and threading/delivery exports are in `0.3.0` code line.
- Safe product-local work was completed: added explicit Docoved package-surface blocker proof, pinned direct `@dd-bot-platform/core` dependency, and updated Docoved adoption docs/proof metadata without changing live runtime behavior.

## Context readiness (recorded before edits)

### 1) Docoved branch/status and git-flow docs
- Repo: `/Users/deksden/Documents/_Projects/docoved-agent`
- Branch/status before edits: `main...origin/main`, clean short status output.
- Git-flow source read: `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/git-flow.md` (feature work should run from `feature/*` branched from `develop`; direct protected-branch push disallowed).
- PRT workspace flow note read: `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/002-git-flow-start.md`.

### 2) Docoved memory-bank and relevant runtime/ops/scenario docs
- Read:
  - `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/index.md`
  - `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-channel-runtime-adoption.md`
  - `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-channel-adapter-contract.md`
  - `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-email-channel-binding-and-hosted-acceptance.md`
  - `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-acceptance-scenarios-and-host-contract.md`
  - `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/scenarios/index.md`

### 3) Platform PRT-043 specs and reports
- Read:
  - `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
  - `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`
  - `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md`
  - `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/command-framework-contract.md`
  - `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/channel-runtime-contract.md`
  - `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/003-pre-code-gate-decision.md`
  - `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/T-043-01-report.md`
  - `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/T-043-02-report.md`
  - `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/T-043-03-report.md`
  - `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/T-043-05-report.md`

### 4) Current dependencies and lockfile state (before edits)
- Root `docoved-agent/package.json` initially had direct dependency only:
  - `@dd-bot-platform/channel-runtime: 0.2.0`
- `pnpm-lock.yaml` already contained transitive entries:
  - `@dd-bot-platform/core@0.2.0`
  - `@dd-bot-platform/channel-runtime@0.2.0`
- Installed package surface inspection showed:
  - `core@0.2.0` exports runtime-only symbols; no command-framework exports.
  - `channel-runtime@0.2.0` exports canonical document/render helpers only; no threading/delivery exports.

### 5) Existing command/email/channel-runtime/proof files inspected
- Telegram command/runtime:
  - `/Users/deksden/Documents/_Projects/docoved-agent/apps/server/src/channels/docoved-command-policy.ts`
  - `/Users/deksden/Documents/_Projects/docoved-agent/apps/server/src/telegram/command-projections.ts`
  - `/Users/deksden/Documents/_Projects/docoved-agent/scripts/_support/docoved-telegram-command-runtime.ts`
- Email and Telegram routes:
  - `/Users/deksden/Documents/_Projects/docoved-agent/apps/api/src/docoved-email-webhook-routes.ts`
  - `/Users/deksden/Documents/_Projects/docoved-agent/apps/api/src/docoved-telegram-webhook-routes.ts`
- Channel-runtime mapping proof:
  - `/Users/deksden/Documents/_Projects/docoved-agent/scripts/docoved-channel-runtime-adoption-proof.ts`

### 6) Required searches run in docoved-agent
- `rg -n "commandAccessPolicy|allowDirectCommands|Message-ID|In-Reply-To|reply_to_message|CanonicalResponseDocument|@dd-bot-platform"`
- Results confirmed:
  - command policy + projection seams exist;
  - email route preserves `Message-ID`/`In-Reply-To`/`References`;
  - Telegram route sends reply params but has no shared PRT-043 threading intent types;
  - only `CanonicalResponseDocument` usage is in local proof script;
  - no `@dd-bot-platform/core` imports existed pre-edit.

## Blocker and bridge/release path

### Exact blocker (confirmed)
- `npm view` on 2026-04-26 returned only `0.2.0` for both packages:
  - `@dd-bot-platform/core`: latest `0.2.0`
  - `@dd-bot-platform/channel-runtime`: latest `0.2.0`
  - `@dd-bot-platform/channel-runtime@0.3.0` -> `E404`
- `bot-platform` source has required contracts at `0.3.0`:
  - `/Users/deksden/Documents/_Projects/bot-platform/packages/core/package.json`
  - `/Users/deksden/Documents/_Projects/bot-platform/packages/channel-runtime/package.json`
  - commit with these contracts: `d744e06`.
- Therefore Docoved cannot yet adopt published command-framework + threading/delivery contracts directly by semver.

### Viable bridge/release path
1. **Preferred release path**: publish `@dd-bot-platform/core@0.3.0` and `@dd-bot-platform/channel-runtime@0.3.0` from `bot-platform` commit `d744e06` (or later equivalent) via normal package release workflow.
2. **Temporary bridge path (only if explicitly approved)**: consume immutable tarball artifacts built from the same commit, pin exact checksums in `docoved-agent/pnpm-lock.yaml`, then replace with published semver once npm release is available.

## Safe product-local changes completed
- Updated `/Users/deksden/Documents/_Projects/docoved-agent/package.json`
  - added direct pin `@dd-bot-platform/core: 0.2.0`
  - added script `docoved:proof:prt043-package-surface`
- Updated `/Users/deksden/Documents/_Projects/docoved-agent/pnpm-lock.yaml`
  - lock sync after dependency pin.
- Added `/Users/deksden/Documents/_Projects/docoved-agent/scripts/docoved-prt043-package-surface-proof.ts`
  - deterministic proof of required PRT-043 export surface and explicit blocker/bridge output.
- Updated `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-channel-runtime-adoption.md`
  - added explicit PRT-043 package-surface gate with blocker + release/bridge path.
- Updated `/Users/deksden/Documents/_Projects/docoved-agent/scripts/docoved-channel-runtime-adoption-proof.ts`
  - clarified that current proof scope is PRT-042 mapping and that PRT-043 exports require `0.3.0+`.

## Checks run
- `pnpm install --lockfile-only` in `docoved-agent` ✅
- `pnpm install` in `docoved-agent` ✅
- `pnpm docoved:proof:prt043-package-surface` ❌ (expected blocker output; exits 1 until 0.3.0 contracts are available/pinned via approved bridge)
- `pnpm tsx scripts/docoved-channel-runtime-adoption-proof.ts` ✅ (PRT-042 canonical mapping proof remains green)

## Scope compliance / non-goals
- No edits in `bot-platform/seller-agent`.
- No rollback/revert of unrelated changes.
- No commit performed.
- No DB/provider sender refactor or product command catalog extraction was done.

## Hosted beta proof plan after unblock
- Keep first Docoved parity scope read-only (`/help`, `/sources`, `/status`, `/report`) per pre-code gate.
- After package unblock, wire command availability/dispatch types from `@dd-bot-platform/core` and threading/delivery intent/result types from `@dd-bot-platform/channel-runtime`.
- Re-run local proofs first, then hosted beta lane:
  - `pnpm docoved:preflight:beta --json`
  - `pnpm docoved:verify:beta:corpus`
  - `pnpm docoved:packet:beta:scn201`
  - `pnpm docoved:packet:beta:scn202`
  - threaded email proof for `Re:` + `Message-ID`/`In-Reply-To`/`References`
  - Telegram reply-link/runtime proof with real chat evidence.
