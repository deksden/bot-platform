# T-043-06 SellerAgent Command / Delivery Inventory Report

## Summary
- SellerAgent already has the core seams needed for PRT-043-style command adoption: actor-aware Telegram command gating, derived menu projection, verified Telegram binding resolution, release readback/control, and reply-delivery summary models.
- The narrow first adoption subset should stay read-only: actor diagnostics, runtime/context readback, and release readback. Release-control mutations and model-policy mutation should wait for a later wave.
- Context readiness is **blocked for broad adoption / mutation work**, but **ready for a scoped read-only inventory/proof plan**.

## Context Readiness
- Repo status checked on both branches: `bot-platform` and `seller-agent` are clean on their current feature branches.
- Required docs read:
  - `bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md:1`
  - `bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md:1`
  - `bot-platform/.memory-bank/spec/runtime/command-framework-contract.md:26`
  - `bot-platform/.memory-bank/spec/runtime/channel-runtime-contract.md:31`
  - `bot-platform/.memory-bank/spec/project/feature-area-boundaries.md:26`
  - `bot-platform/.memory-bank/spec/operations/observability-and-incident-diagnostics.md:35`
  - `bot-platform/.memory-bank/spec/operations/deployment-architecture.md:26`
  - `bot-platform/.memory-bank/spec/operations/hosted-beta-acceptance-contract.md:22`
  - `seller-agent/.memory-bank/index.md:28`
  - `seller-agent/.memory-bank/plans/protocols/PRT-007-telegram-privileged-command-surface-bot-level-release-control-and-runtime-diagnostics.md:1`
  - `seller-agent/.memory-bank/scenarios/SCN-053-telegram-observed-user-capture-and-employee-verification-flow.md:1`
  - `seller-agent/.memory-bank/scenarios/SCN-168-channel-topology-and-release-assignment-resolution.md:1`
  - `seller-agent/.memory-bank/guides/reference/telegram-direct-bot-command-catalog.md:20`
  - `seller-agent/.memory-bank/guides/explanation/telegram-bot-integration-model.md:20`
  - `seller-agent/.memory-bank/spec/operations/production-rollout-runbook.md:31`
- Required searches run in `seller-agent` for command, actor, release, and delivery seams.
- No targeted tests were found for the Telegram command/projection seam; inventory is source- and docs-driven.

### Assumptions / Unknowns
- `seller-agent/.memory-bank/spec/scenarios/hosted-beta-execution-model.md` is not present; hosted-beta proof planning must currently rely on the production rollout runbook plus scenario matrices.
- Current SellerAgent actor modeling is still coarse (`external_customer`, `employee`, `system_admin`) and must be mapped to richer PRT-043 actor classes rather than assumed equivalent.
- `/use_model_policy` exists in SellerAgent, but it is adjacent to this task and should not be treated as part of the first release-control proof unless separately justified.

## Current SellerAgent Seams
- `packages/core/src/telegram-commands.ts:325` owns the command catalog and descriptions, including release readback/control and deep-debug commands.
- `packages/core/src/telegram-commands.ts:625` resolves Telegram command access from verified bindings, workspace role, and system-admin status.
- `packages/core/src/telegram-commands.ts:470` and `:524` derive allowed commands from actor/access policy; menu/help is projection, not authority.
- `packages/core/src/telegram-commands.ts:1248` / `:1266` load business-profile versions/releases and current release resolution.
- `packages/core/src/telegram-commands.ts:2243` / `:2285` render `/versions`, `/releases`, and `/current`.
- `packages/core/src/telegram-commands.ts:2487` / `:2598` / `:2705` implement `/use_release` preview and `/confirm use_release` mutation.
- `apps/server/src/telegram/command-projections.ts:77` derives command projection state and sync status from `resolveTelegramCommandAccess`.
- `apps/server/src/telegram/index.ts:1323` routes direct slash commands and passes in the Docoved surface and access context.
- `apps/server/src/channels/docoved-command-policy.ts:42` keeps Docoved command policy separate, with `allowDirectCommands` and `allowDebugCommands`.
- `packages/api-contract/src/operations.ts:1101` defines the Telegram actor-class schema and the Telegram integration / binding / release-assignment schemas.
- `packages/api-contract/src/conversations.ts:406` and `:469` define delivery outcome and delivery summary shapes.

## Command Classification

### Read-only diagnostics / readback
- `/start`, `/help`, `/whoami`, `/status`, `/context`, `/pipeline`, `/why`, `/inspect`
- `/versions`, `/releases`, `/current`
- Optional adjacent read-only diagnostics: `/policy_current`, `/policy_role`, `/policy_failure`, `/policy_fallbacks`

### Product workflow mutation
- `/new` is an operational session reset / fresh test session, not a release-control action.

### Release-control mutation
- `/use_release`
- `/confirm use_release`
- `/use_model_policy`
- `/confirm use_model_policy`

### Debug-only
- `/last`, `/trace`, `/analysis`, `/decision`, `/artifacts`, `/integration`

### Minimum first SellerAgent adoption subset
- First proof should use only the read-only surface: `/start`, `/help`, `/whoami`, `/status`, `/context`, `/pipeline`, `/why`, `/inspect`, `/versions`, `/releases`, `/current`.
- Keep `/use_release`, `/confirm`, `/use_model_policy`, and `/new` out of the first proof unless a later gate explicitly needs them.
- If a broader diagnostic proof is desired, add `/policy_*` next; keep deep-debug commands out until the read-only subset is stable.

## Actor / Capability Mapping
- Current SellerAgent `external_customer` is the closest match to PRT-043 `external_unknown_user` for unverified Telegram direct chat.
- Verified Telegram bindings plus workspace roles map to `verified_employee` / `workspace_admin` / `system_admin` rather than remaining in a single `employee` bucket.
- Existing SellerAgent capability strata already separate:
  - diagnostics readback
  - release readback
  - release assignment
  - model-policy readback / assignment
  - deep debug
- `allowDebugCommands` is still a transport-level switch, not a substitute for capability-aware actor classes.
- Telegram menu projection remains derived from server policy; it should not grant authority.

## Delivery Field Classification

### Shared-candidate fields
- `ConversationReplyDeliveryExecutionOutcome` and `ConversationReplyDeliverySummary` are good cross-channel candidates because they summarize delivery verdict, counts, timing, and bounded reasons.
- Candidate shared fields include: `kind` / `verdict`, `planId`, `totalSteps`, `sentSteps`, `suppressedSteps`, `failedSteps`, `pendingSteps`, `lastDispatchAt`, `reason`, `reasonCode`, `sentStepCount`, `simulated`, and `supersededByMessageId`.
- `OutboundDispatch` fields such as `channelKind`, `deliveryStatus`, `planId`, `stepId`, `sequence`, `stepType`, `transportMessageRef`, and `reason` also look provider-neutral enough to remain shared.

### SellerAgent-only / product-owned fields
- Job and conversation records such as `businessProfileSlug`, `integrationKey`, `channelAccountId`, `channelThreadRef`, `traceId`, `generatedMessageId`, `attemptCount`, `lastError`, and the job timestamps should stay product-owned.
- `replyToMessageId`, `transportReplyToMessageRef`, and `transportReferenceMessageRefs` remain product conversation/threading details for now, even though they are strong candidates for later threading-intent abstraction.
- The current `conversationReplyJobSummary` / `conversationReplyBurstSummary` shapes are product records, not framework-shared contracts.

## Likely Files To Change
- `packages/core/src/telegram-commands.ts`
- `apps/server/src/telegram/command-projections.ts`
- `apps/server/src/telegram/index.ts`
- `apps/server/src/channels/docoved-command-policy.ts`
- `packages/api-contract/src/operations.ts`
- `packages/api-contract/src/conversations.ts`
- Possible support follow-ups:
  - `packages/core/src/system/handlers.ts`
  - `apps/server/src/business/operation-handlers.ts`

## Tests / Local Proofs
- No targeted unit tests were found for the Telegram command/projection seam.
- If implementation starts, the first local checks should be:
  - `pnpm typecheck` or `pnpm check` in `seller-agent`
  - focused command-projection proof for `/help`, `/whoami`, `/status`, `/current`
  - release readback proof against a local Telegram integration
  - observed-user/binding proof for verified versus unverified actor behavior
  - `pnpm verify:security` and `pnpm verify:security:live` when release/security boundaries are touched
- `SCN-053` is the best local operator/auth anchor; `SCN-168` is the best local release-assignment anchor.

## Hosted Beta Proof Plan
- Use the stable beta pair only; do not count preview aliases as acceptance evidence.
- Prove that:
  - unverified users stay on the public-safe surface;
  - verified employees get the read-only diagnostics/readback subset;
  - `/current` reflects explicit integration assignment over profile default;
  - menu projection stays derived and never widens authority.
- Add `/use_release` / `/confirm` only in a second proof after the read-only subset is stable and the release-control gate is explicitly approved.
- Keep delivery/thread evidence tied to real Telegram reply behavior and traceable delivery summaries.

## Blockers / Follow-ups
- Broad SellerAgent adoption is blocked until the shared PRT-043 contracts stop being just draft guidance and the implementation gates are resolved.
- The missing SellerAgent hosted-beta execution doc should be added or intentionally retired before claiming a final beta-proof path.
- After the read-only wave is accepted, decide whether `/policy_*`, `/new`, and release-control mutation commands belong in the next SellerAgent slice or stay separate.
