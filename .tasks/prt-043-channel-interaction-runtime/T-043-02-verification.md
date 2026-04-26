# T-043-02 Verification — Command framework typed contracts in core

## Verdict
- accepted after orchestrator hardening

## Scope compliance
- The implementation stays in `packages/core` and exports through `packages/core/src/index.ts`.
- I found no product catalog, DB, UI, provider SDK, transport sender, or `channel-runtime` code added to this slice.
- The new surface is product-neutral and matches the core/framework boundary described in the task packet and memory-bank specs.

## Findings
- none

## Context readiness evidence
- Repo/status checked in `/Users/deksden/Documents/_Projects/bot-platform`; unrelated worktree changes remain outside this task scope.
- Read:
  - `.tasks/prt-043-channel-interaction-runtime/T-043-02-command-framework-contracts.task.md`
  - `.tasks/prt-043-channel-interaction-runtime/T-043-02-report.md`
  - `.memory-bank/index.md`
  - `.memory-bank/spec/runtime/command-framework-contract.md`
  - `.memory-bank/spec/project/feature-area-boundaries.md`
  - `.memory-bank/spec/operations/observability-and-incident-diagnostics.md`
  - `.tasks/prt-043-channel-interaction-runtime/001-task-packet-template.md`
- Inspected:
  - `packages/core/src/index.ts`
  - `packages/core/src/runtime/index.ts`
  - `packages/core/src/control-plane/index.ts`
  - `packages/core/src/control-plane/refs.ts`
  - `packages/core/src/control-plane/capabilities.ts`
  - `packages/core/src/control-plane/models.ts`
  - `packages/core/src/control-plane/mutation-envelopes.ts`
  - `packages/core/src/command-framework/contracts.ts`
  - `packages/core/src/command-framework/index.ts`
  - `packages/core/src/command-framework.spec.ts`
- Searches run:
  - `rg -n "Command|access_denied|Capability|Actor|ChannelRef|ResultIntent" packages/core/src .memory-bank/spec/runtime .memory-bank/spec/project`
  - focused `rg` checks across `packages/core/src`, `packages/channel-runtime/src`, and the runtime/project specs for product/channel/provider leaks.
- Diff reviewed:
  - `git diff -- packages/core/src`
  - `git status --short packages/core packages/channel-runtime .tasks/prt-043-channel-interaction-runtime`

## Checks and evidence reviewed
- Verified the command framework lives under `packages/core/src/command-framework/`.
- Verified the actor vocabulary includes `system_admin`, `workspace_admin`, `employee`, `known_external`, `unknown_external`, and `anonymous`.
- Verified the envelope, parser result, registry, availability, and dispatch contracts are present and product-neutral.
- Verified dispatcher ordering: registry lookup and availability checks occur before handler invocation.
- Verified post-orchestrator hardening: missing availability policy denies by default, while product external policy is optional and evaluated only when supplied.
- Verified failure classes include `parse_error`, `unknown_command`, `validation_error`, `access_denied`, and `dispatch_error`.
- Verified handler error handling returns a safe public summary and does not surface raw secret text or stack text in the public summary.
- Verified deterministic tests cover the requested cases and `not_a_command` is handled as a skipped parse outcome.
- Ran:
  - `pnpm --filter @dd-bot-platform/core typecheck`
  - `pnpm --filter @dd-bot-platform/core build`
  - `node --test packages/core/dist/command-framework.spec.js`
- Result: all checks passed; the Node test suite reported 7 passing tests and 0 failures.

## Required fixes
- none

## Optional follow-ups
- Keep any product-specific command catalogs and availability overlays outside `@dd-bot-platform/core`.
- If later tasks need API serialization, add schemas in a dedicated slice rather than expanding this contract surface opportunistically.
