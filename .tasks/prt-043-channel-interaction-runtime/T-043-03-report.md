# T-043-03 Report — Channel threading and delivery intent/result types

## Summary

Implemented provider-neutral threading and delivery contracts in `@dd-bot-platform/channel-runtime` with pure helpers and deterministic tests:
- added threading config/intent vocabulary with fallback handling;
- added outbound delivery intent/result-summary vocabulary with terminal status classification;
- exported new surface from package public index;
- extended tests for threading fallback and delivery terminal classification behavior.

## Context readiness

### Repository and git state
- In-scope repository: `/Users/deksden/Documents/_Projects/bot-platform`.
- Branch: `feature/EP-022-prt-043-channel-interaction-runtime`.
- Pre-work status (before edits): untracked task files only in `.tasks/prt-043-channel-interaction-runtime/`.

### Docs read
- `.memory-bank/index.md`
- `.memory-bank/spec/runtime/channel-runtime-contract.md`
- `.memory-bank/spec/runtime/command-framework-contract.md`
- `.memory-bank/spec/project/feature-area-boundaries.md`
- `.memory-bank/spec/operations/observability-and-incident-diagnostics.md`
- `.tasks/prt-043-channel-interaction-runtime/001-task-packet-template.md`

### Files inspected
- `packages/channel-runtime/src/document.ts`
- `packages/channel-runtime/src/render.ts`
- `packages/channel-runtime/src/errors.ts`
- `packages/channel-runtime/src/index.ts`
- `packages/channel-runtime/src/channel-runtime.spec.ts`
- `packages/core/src/control-plane/models.ts`
- `packages/core/src/control-plane/refs.ts`
- `packages/core/src/runtime/kernel.ts`

### Searches run
- `rg -n "replyThread" packages/channel-runtime/src packages/core/src`
- `rg -n "thread" packages/channel-runtime/src packages/core/src`
- `rg -n "delivery" packages/channel-runtime/src packages/core/src`
- `rg -n "attemptId" packages/channel-runtime/src packages/core/src`
- `rg -n "transportMessageRef" packages/channel-runtime/src packages/core/src`
- `rg -n "ChannelCapabilityMatrix" packages/channel-runtime/src packages/core/src`

### Existing seams/helpers/tests found
- Existing `channel-runtime` package already owns pure document and rendering helpers only.
- `CanonicalResponseMetadata` already contains `attemptId`/`transportMessageRef` slots.
- `core` has transport capability vocabulary (`ChannelCapabilityMatrix.replyThreadLinkingFidelity`) and shared `ChannelRef`.
- Existing tests are deterministic node tests in `channel-runtime.spec.ts`, suitable for extension.

### Assumptions and blockers
- Assumption: `channel-runtime` should stay pure and type-focused; no provider send logic or runtime side effects.
- Assumption: terminal delivery statuses for this task are exactly `delivered | suppressed | failed`.
- Blockers: none found; no doc contradictions requiring stop.

## Files changed
- `packages/channel-runtime/src/threading.ts` (new)
- `packages/channel-runtime/src/delivery.ts` (new)
- `packages/channel-runtime/src/index.ts`
- `packages/channel-runtime/src/channel-runtime.spec.ts`

## Implementation notes and deviations
- Added `OutboundThreadingMode` with required modes: `reply_to_inbound`, `new_thread`, `none`.
- Added `OutboundThreadingConfig` + `InboundThreadingContext` + `OutboundThreadingIntent`.
- Added pure helper `createDefaultThreadingIntent(config, inboundContext)`:
  - keeps `reply_to_inbound` when inbound message ref exists and reply is supported;
  - falls back to configurable `new_thread` or `none` when inbound target missing/unsupported.
- Added `OutboundDeliveryIntent` and `OutboundDeliveryResultSummary` with:
  - `channelRef`, target slots, document/format refs, threading intent, correlation refs;
  - terminal `status`, `attemptId`, `transportMessageRef`, diagnostics summary.
- Added pure helpers:
  - `classifyOutboundDeliveryTerminalState` (`success | suppressed | failure`);
  - `isOutboundDeliveryTerminalSuccess`.
- Exported new contracts/helpers from package public index.
- Post-verification fix: removed optional inline `document` from `OutboundDeliveryIntent` after verifier feedback, keeping the delivery seam reference-only as requested by the task packet.

## Checks run and results
- `pnpm -C packages/channel-runtime build` ✅
- `node --test packages/channel-runtime/dist/channel-runtime.spec.js` ✅
  - 10 passed, 0 failed.
- Post-verification rerun by orchestrator:
  - `pnpm --filter @dd-bot-platform/core typecheck` ✅
  - `pnpm --filter @dd-bot-platform/channel-runtime typecheck` ✅
  - `node --test packages/core/dist/command-framework.spec.js packages/channel-runtime/dist/channel-runtime.spec.js` ✅
    - 18 passed, 0 failed after final command default-deny hardening.

## Risks and follow-ups
- `OutboundDeliveryTarget` is intentionally generic; product adapters may later require stricter target subtypes.
- `supportsReplyToInbound` is optional in inbound context; adapters should set it explicitly when capability is known to avoid ambiguity.

## Lessons learned / insights candidates
- `channel-runtime` can extend safely with provider-neutral interaction contracts while preserving thin-seam package boundaries and deterministic pure-helper tests.
