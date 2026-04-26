# T-043-02 Report — Command framework typed contracts in core

## Summary
Implemented a new product-neutral command framework surface in `@dd-bot-platform/core` under `packages/core/src/command-framework/` and exported it from `packages/core/src/index.ts`.
The slice includes typed contracts and pure helpers for actor/context, envelope, parser results, registry, availability policy, and dispatch envelopes with deterministic tests.

## Context readiness

### Repository and status evidence (before edits)
- Repository in scope: `/Users/deksden/Documents/_Projects/bot-platform`.
- Branch: `feature/EP-022-prt-043-channel-interaction-runtime`.
- Observed status before coding included parallel/unrelated changes outside this task scope; they were not reverted or modified.

### Docs read
- `.memory-bank/index.md`
- `.memory-bank/spec/runtime/command-framework-contract.md`
- `.memory-bank/spec/project/feature-area-boundaries.md`
- `.memory-bank/spec/operations/observability-and-incident-diagnostics.md`
- `.tasks/prt-043-channel-interaction-runtime/001-task-packet-template.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md`
- `.tasks/prt-043-channel-interaction-runtime/T-043-01-report.md` (dependency decision confirmation)

### Required searches run
- `rg -n "Command|access_denied|Capability|Actor|ChannelRef|ResultIntent" packages/core/src .memory-bank/spec/runtime .memory-bank/spec/project`

### Files/patterns inspected
- `packages/core/src/index.ts`
- `packages/core/src/runtime/index.ts`
- `packages/core/src/runtime/kernel.ts`
- `packages/core/src/runtime/pipeline-registry.ts`
- `packages/core/src/control-plane/index.ts`
- `packages/core/src/control-plane/refs.ts`
- `packages/core/src/control-plane/capabilities.ts`
- `packages/core/src/control-plane/models.ts`
- `packages/core/src/control-plane/mutation-envelopes.ts`
- `packages/core/src/control-plane/channel-binding/verifier.spec.ts`
- `packages/core/src/control-plane/observability.spec.ts`
- `packages/core/src/governed-content/governed-content.verifier.spec.ts`
- `packages/core/package.json`, root `package.json`, `packages/core/tsconfig.json`

### Assumptions and blockers (pre-code)
Assumptions:
- First slice must remain contract/helper only (no product catalog, no DB/UI/provider sender scope).
- Existing package style is TypeScript compile plus deterministic Node tests in `*.spec.ts`.
- External product policy denials should be pluggable via dispatcher input without moving policy ownership into core.

Blockers:
- None found. Specs and prior boundary decision were consistent with task scope, so implementation proceeded.

## Files changed
- `packages/core/src/command-framework/contracts.ts`
- `packages/core/src/command-framework/index.ts`
- `packages/core/src/command-framework.spec.ts`
- `packages/core/src/index.ts`

## Implementation notes
- Added actor vocabulary with required types: `system_admin`, `workspace_admin`, `employee`, `known_external`, `unknown_external`, `anonymous` (+ extension string support).
- Added command envelope contracts with stable `commandKey`, `rawInput`, `normalizedArgs`, actor/channel context, ownership scope, and correlation metadata.
- Added parser result contracts and helpers for `parsed`, `not_a_command`, and `failed`, with parse diagnostics separated from later dispatch failures.
- Added registry contracts/helpers:
  - `createCommandRegistry`
  - `listCommandDefinitions`
  - `getCommandDefinition`
  - `requireCommandDefinition`
  - duplicate-key rejection via `CommandRegistryError`.
- Added availability policy model and evaluator:
  - actor-type allow/deny
  - channel-kind allow/deny
  - concrete channelRef allow/deny
  - deny precedence over allow
  - post-orchestrator hardening: missing command policy denies by default (`default_deny`) to match the main PRT-043 safety rule.
- Added normalized dispatch contracts/helpers:
  - failure classes: `parse_error`, `unknown_command`, `validation_error`, `access_denied`, `dispatch_error`
  - dispatch path enforces parse/registry/availability checks before invoking handler
  - generic payload result support for product-defined payloads
  - thrown handler errors mapped to safe `dispatch_error` public summary (`Command handler failed.`) with no raw secret/stack leakage.
- Exported new command framework surface from `packages/core/src/index.ts`.

## Deterministic tests added
`packages/core/src/command-framework.spec.ts` covers:
- duplicate command key rejection;
- unknown command dispatch -> `unknown_command`;
- deny-over-allow precedence for actor/channel kind/channelRef;
- actor-type allow policy success;
- handler success normalized envelope;
- thrown handler error -> safe `dispatch_error` public summary (no leaked secret/stack terms);
- `not_a_command` dispatch skip envelope.

## Checks run and results
- `pnpm --filter @dd-bot-platform/core typecheck` ✅
- `pnpm --filter @dd-bot-platform/core build` ✅
- `node --test packages/core/dist/command-framework.spec.js` ✅ (7 passed, 0 failed)

## Deviations
- Added explicit `not_a_command` skipped dispatch variant in addition to required failure classes; this preserves parser/dispatch separation and avoids forcing non-command input into failure semantics.

## Risks and follow-ups
- Future product adapters should supply `resolveAvailabilityPolicy` for product-owned deny overlays, while keeping command catalogs/permissions product-local.
- If API-level serialization becomes required, Zod/API-contract schemas for these command envelopes may be added later in a dedicated task.

## Lessons learned / insights candidates
- Reusing existing control-plane refs and channel vocab in core avoided introducing parallel runtime identifiers.
- A thin generic dispatcher contract is enough to enforce policy/registry order without coupling core to channel-runtime or product handlers.
