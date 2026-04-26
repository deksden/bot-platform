# T-043-01 Package Boundary Decision Report

## Summary recommendation

Recommended boundary:

- Materialize command-framework typed contracts in `@dd-bot-platform/core`, under a new command-framework-owned module such as `packages/core/src/command-framework/`, exported from `packages/core/src/index.ts`.
- Keep `@dd-bot-platform/channel-runtime` as the home for channel-adjacent canonical response, render, threading intent/resolution, and outbound delivery intent/result summary types.
- Do not put command parser/registry/dispatcher/availability contracts in `@dd-bot-platform/channel-runtime`.
- Do not create a new `@dd-bot-platform/command-framework` package for the first implementation slice; current dependency direction does not require it.
- Tie command success to canonical responses through generics or a channel-runtime bridge type, not by making `@dd-bot-platform/core` depend on `@dd-bot-platform/channel-runtime`.

Implementation readiness verdict:

- Ready for platform contract implementation after this decision is accepted: `T-043-02` command contracts in `core` and `T-043-03` channel intent/result contracts in `channel-runtime`.
- Still blocked for product adoption until product-specific gates are resolved: Docoved first parity command set, SellerAgent first read-only/diagnostic subset, and product-local effective config/write authority details.

## Context readiness

Repository status:

- Current branch: `feature/EP-022-prt-043-channel-interaction-runtime`.
- `git status --short --branch` was clean before report writing.
- Write scope honored: no code or canonical docs were edited; only this report is written.

Required docs read:

- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md`
- `.memory-bank/spec/project/feature-area-boundaries.md`
- `.memory-bank/spec/runtime/command-framework-contract.md`
- `.memory-bank/spec/runtime/channel-runtime-contract.md`
- `.memory-bank/spec/runtime/index.md`
- `.memory-bank/spec/operations/observability-and-incident-diagnostics.md`
- `.memory-bank/mbb/delivery-docs-guide.md`

Required searches run:

- `find packages -maxdepth 3 -type f -name package.json -print`
- `find packages -maxdepth 4 -type f -name '*.ts' | sort`
- `rg -n "CommandEnvelope|CommandRegistry|CommandDispatcher|CommandAvailability|CommandActor|ChannelRef|ExecutionRunRef|ReplyThreadLinkingFidelity|OutboundDelivery|ThreadingIntent|CanonicalResponseDocument" packages`

Required files inspected:

- `package.json`
- `pnpm-workspace.yaml`
- `packages/core/package.json`
- `packages/api-contract/package.json`
- `packages/channel-runtime/package.json`
- `packages/scenario-system/package.json`
- `packages/core/src/index.ts`
- `packages/core/src/control-plane/**`
- `packages/api-contract/src/control-plane/**`
- `packages/channel-runtime/src/**`

Existing package exports and dependency directions:

- `@dd-bot-platform/core` has no package dependencies and exports `./runtime`, `./control-plane`, and `./governed-content`.
- `@dd-bot-platform/api-contract` depends only on `zod` and exports schema/read-model surfaces, including control-plane schemas.
- `@dd-bot-platform/channel-runtime` depends on `@dd-bot-platform/api-contract` and `@dd-bot-platform/core`; it re-exports `RuntimeUsage`, `ChannelRef`, `ExecutionRunRef`, and `IsoTimestamp`.
- `@dd-bot-platform/scenario-system` depends on `@dd-bot-platform/api-contract` and is not a suitable home for runtime command contracts.
- `tsconfig.build.json` references `api-contract`, `channel-runtime`, `core`, and `scenario-system`; existing project references already allow `channel-runtime -> core/api-contract`.

Command-framework code-backed status:

- `CommandEnvelope`, `CommandRegistry`, `CommandDispatcher`, `CommandAvailability`, and `CommandActor` do not exist in package source today.
- Command-framework is documentation-backed today by `.memory-bank/spec/runtime/command-framework-contract.md` and PRT-043 planning docs.
- Package source contains only adjacent command mentions: `supportsOperatorCommands`, `commandId` metadata in `CanonicalResponseMetadata`, and scenario semantic-eval event text.

Existing refs/capability/observability vocabulary to reuse:

- Refs in `@dd-bot-platform/core`: `WorkspaceRef`, `ProductInstanceRef`, `ChannelRef`, `PipelineBindingRef`, `ExecutionRunRef`, `TraceArtifactRef`, `PrincipalRef`, `PolicyAssignmentRef`, `PipelineId`, `IsoTimestamp`.
- Channel vocabulary in `@dd-bot-platform/core`: `ChannelKind`, `KnownChannelKind`, `ChannelCapabilityMatrix`, `ReplyThreadLinkingFidelity`, `PipelineBindingStatus`.
- Capability vocabulary in `@dd-bot-platform/core` and `api-contract`: `ControlPlaneCapabilityFamily` and `CONTROL_PLANE_CAPABILITY_FAMILIES`.
- Observability vocabulary in `@dd-bot-platform/core` and `api-contract`: `ControlPlaneObservabilityEvent`, `compat_fallback_used`, correlation fields, operation ids, safe details object.
- Channel-runtime response vocabulary: `CanonicalResponseDocument`, `CanonicalResponseMetadata`, visibility sections, citations/source refs, artifacts, render targets/formats, markdown/plaintext helpers.

Assumptions:

- Public exported type additions require Changesets version bumps for every touched publishable package.
- Source files are canonical; `dist/` artifacts are present locally but not tracked by git.
- The first platform slice should be type/pure-helper only, not a provider sender, DB store, queue, UI, or product command catalog.
- Product repos will adapt their own actor lookup, command catalogs, persistence lookups, and provider send/retry behavior.

Unknowns:

- Exact Docoved first parity command set is not defined in this repo.
- Exact SellerAgent first read-only/diagnostic subset is not defined in this repo.
- Product-local canonical writable command-policy authority is not defined here.
- Exact product idempotency-key derivation and stored transport-reference lookup remain product-local.
- Whether API/Zod schemas for command contracts are required in `@dd-bot-platform/api-contract` is not proven for the first implementation slice.

Ready/blocked decision:

- Ready: package/module boundary for command-framework typed contracts.
- Ready: first platform threading/delivery intent/result scope, if kept provider-neutral and summary-only.
- Blocked: product adoption implementation until product inventories/config authorities are completed.
- Blocked: any DB/read-model/UI/provider-sender work; no evidence justifies those scopes.

## Package inventory

| Package | Current role | Dependencies | Relevant existing exports | Boundary implication |
| --- | --- | --- | --- | --- |
| `@dd-bot-platform/core` | Framework-safe execution/control-plane/governed-content contracts and helpers | none | `runtime`, `control-plane`, `governed-content`; refs, channel kinds, capability families, observability helper | Best first home for command-framework typed contracts because it can reuse refs without creating cycles. |
| `@dd-bot-platform/api-contract` | Zod-backed API/control-plane/governed-content/read-model schemas | `zod` | control-plane schemas, runtime usage schema, read envelopes | Not first home for dispatch/registry/error classes; add schemas later only if a serialized API surface is proven. |
| `@dd-bot-platform/channel-runtime` | Canonical response document and pure channel render helpers | `core`, `api-contract` | `CanonicalResponseDocument`, visibility filtering, render helpers, channel runtime error | Best home for threading/delivery intent/result summary types; wrong home for command parser/dispatch/availability. |
| `@dd-bot-platform/scenario-system` | Scenario and semantic-eval primitives | `api-contract`, `@openai/codex-sdk` | scenario artifacts, fixtures, semantic-eval runtime | Not part of this runtime boundary. |

Notable source facts:

- `packages/channel-runtime/src/document.ts` already imports `ChannelRef`, `ExecutionRunRef`, and `IsoTimestamp` from `core` and `RuntimeUsage` from `api-contract`.
- `packages/channel-runtime/src/document.ts` already has response correlation slots: `responseId`, `runId`, `traceId`, `channelRef`, `commandId`, `attemptId`, `deliveryId`, `transportMessageRef`.
- `packages/core/src/control-plane/models.ts` already has channel capability fields for `supportsOperatorCommands` and `replyThreadLinkingFidelity`.
- `packages/core/src/control-plane/observability.ts` already provides a safe event envelope pattern but not PRT-043 command/thread/delivery event names.

## Decision matrix

### Command-framework typed contracts

| Option | Recommendation | Rationale | Rejected/accepted trade-off |
| --- | --- | --- | --- |
| Add `packages/core/src/command-framework/` and export from `@dd-bot-platform/core` | Accept | Aligns with `command-framework` ownership, keeps zero-dependency package, reuses control-plane refs/capabilities, avoids new package. | Success payload must be generic or bridged so `core` does not import `channel-runtime`. |
| Put command contracts in `@dd-bot-platform/channel-runtime` | Reject | Violates channel-runtime boundary; risks duplicate `ChannelCommand*` abstractions and command dispatch/access policy leakage. | Channel-runtime may reference command ids or bridge result-to-document types only. |
| Put command contracts in `@dd-bot-platform/api-contract` | Reject for first slice | API schemas are useful only when a serialized API surface is proven; registry/dispatcher/errors are runtime contracts, not schema-first API contracts. | Add Zod schemas later if product/API consumers need validation across process boundaries. |
| Create `@dd-bot-platform/command-framework` now | Reject for first slice | No current dependency cycle requires it, and the task forbids new packages unless dependency direction justifies one. | Revisit if command contracts must version independently or cannot stay generic without cycles. |
| Keep command contracts product-local | Reject | PRT-043 requires cross-product command mechanics; product-local copies would duplicate policy/result/failure vocabulary. | Product command catalogs and handlers stay product-local. |

### Threading/delivery intent and result types

| Option | Recommendation | Rationale | Rejected/accepted trade-off |
| --- | --- | --- | --- |
| Add provider-neutral summary types to `@dd-bot-platform/channel-runtime` now | Accept | Threading and delivery are channel-adjacent, already share response/correlation slots, and can serve Docoved/SellerAgent without provider senders. | Must be limited to intent/resolution/result summaries; no queues, retries, storage, or provider payloads. |
| Keep all threading/delivery types product-local until a second proof | Reject for intent/result vocabulary only | PRT-043 already identifies cross-channel Docoved and SellerAgent needs; keeping even summary vocabulary local would prolong drift. | Product-local remains correct for provider mapping, persistence lookup, retry, and delivery records. |
| Put threading/delivery runtime types in `core` control-plane | Reject | `core` owns capability/readback vocabulary like `ReplyThreadLinkingFidelity`; runtime outbound intent/result belongs next to canonical response/rendering. | Reuse `ReplyThreadLinkingFidelity` as capability input, not as a replacement for `ThreadingIntent`. |

## Recommended implementation slice

### `@dd-bot-platform/core` command-framework slice

Add a new command-framework module with only product-agnostic contracts and deterministic pure helpers:

- `CommandInvocationSource`
  - Reuse `WorkspaceRef`, `ProductInstanceRef`, `ChannelRef`, `ChannelKind`, `PipelineBindingRef`, `ExecutionRunRef`, `TraceArtifactRef`, `PrincipalRef`, and `IsoTimestamp`.
  - Include request/correlation ids and transport refs as nullable strings.
- `CommandActorClass`
  - Minimum vocabulary: `system_admin`, `workspace_admin`, `workspace_member`, `verified_employee`, `external_known_user`, `external_unknown_user`, `anonymous`, plus namespaced extensions.
- `CommandActorContext`
  - Actor class, optional safe `PrincipalRef`, workspace/product refs, product capability tags as strings or existing `ControlPlaneCapabilityFamily` where appropriate.
- `CommandEnvelope<TArgs = Record<string, unknown>>`
  - `commandKey`, normalized args, invocation source, actor context, scope/correlation refs.
- `CommandParseResult<TArgs>`
  - `not_a_command`, `parse_error`, `unknown_command`, `valid_command`.
- `CommandDefinition<TArgs, TResult>`
  - Stable key, optional argument validator hook, safe metadata, handler binding.
- `CommandRegistry<TDefinition>`
  - Register/resolve/list definitions without product catalog ownership.
- `CommandAvailabilityPolicy` and `CommandAvailabilityDecision`
  - Actor class, channel kind, channel instance, product default, explicit allow/deny, reason codes.
  - Include policy precedence/deny-over-allow helper if small and deterministic.
- `CommandExecutionResult<TSuccessPayload = unknown>`
  - `success`, `not_a_command`, `parse_error`, `unknown_command`, `validation_error`, `access_denied`, `dispatch_error`, `unsupported_channel`, `rate_limited`.
  - Carry bounded diagnostics and correlation refs.
- Command error classes or factory helpers
  - Machine-readable and safe for framework-level tests; no raw args/provider payloads in defaults.
- Command observability constants/helpers
  - If implemented, use safe event names from PRT-043 review details and the same shape principles as control-plane observability.

Key constraint:

- `core` must not import `@dd-bot-platform/channel-runtime`. If a command handler returns a canonical response, consumers can use `CommandExecutionResult<CanonicalResponseDocument>`.

### `@dd-bot-platform/channel-runtime` interaction slice

Add provider-neutral channel-adjacent types:

- `ThreadingMode`
  - `reply_to_origin`, `continue_thread`, `new_message`, `none`.
- `ThreadingIntent`
  - Requested mode, response/correlation refs, optional fallback policy summary, optional namespaced extensions.
- `ThreadingResolution`
  - `resolved`, `fallback_used`, `ignored`, `failed`; requested/effective mode, bounded reason code, transport target ref summary, no provider headers or SDK objects.
- `ChannelInstanceThreadingPolicy`
  - Default mode, fallback allowed, reply-to-origin required flag, optional namespaced adapter config ref/summary.
- `OutboundDeliveryStatus`
  - `delivered`, `suppressed`, `failed`, `partial_failure`, `skipped`, `simulated`.
- `OutboundDeliveryIntent`
  - `deliveryId`, `attemptId`, `responseId`, `runId`, `traceId`, `channelRef`, `transportMessageRef`, `idempotencyKey`, visibility/render format summary, optional `ThreadingIntent`.
- `OutboundDeliveryResult`
  - Same correlation refs plus status, bounded reason code, safe provider/transport message ref summary, timing summary, extensions.

Key constraints:

- No provider SDK sender.
- No framework retry loop.
- No framework queue/scheduler.
- No framework delivery table/read model.
- No email headers, Telegram reply parameter objects, or provider payloads as first-class framework fields.

### Shared-vs-product-local delivery field classification

Shared first slice:

- `deliveryId`
- `attemptId`
- `responseId`
- `runId`
- `traceId`
- `channelRef`
- `transportMessageRef`
- `idempotencyKey`
- `status`
- `reasonCode`
- `occurredAt` / timing summary
- safe `extensions`

Product-local:

- Provider SDK request/response payloads.
- Provider retry policy and retry history beyond summary counts/reason.
- Stored provider delivery records.
- Delivery plan steps.
- Product workflow states.
- SellerAgent-specific delivery outcome subtypes that are not proven for Docoved.
- Email `Message-ID`/`References` and Telegram reply parameter objects.

## Files likely to change

Command-framework implementation:

- `packages/core/src/command-framework/index.ts`
- `packages/core/src/command-framework/actor.ts`
- `packages/core/src/command-framework/envelope.ts`
- `packages/core/src/command-framework/parser.ts`
- `packages/core/src/command-framework/registry.ts`
- `packages/core/src/command-framework/availability.ts`
- `packages/core/src/command-framework/dispatcher.ts`
- `packages/core/src/command-framework/results.ts`
- `packages/core/src/command-framework/observability.ts`
- `packages/core/src/command-framework/command-framework.spec.ts`
- `packages/core/src/index.ts`
- `packages/core/package.json`
- `packages/core/CHANGELOG.md`

Channel-runtime interaction contracts:

- `packages/channel-runtime/src/threading.ts`
- `packages/channel-runtime/src/delivery.ts`
- `packages/channel-runtime/src/index.ts`
- `packages/channel-runtime/src/channel-runtime.spec.ts` or new focused specs
- `packages/channel-runtime/package.json`
- `packages/channel-runtime/CHANGELOG.md`

Optional later API schema surface, only if required by a consumer:

- `packages/api-contract/src/command-framework/*`
- `packages/api-contract/src/channel-runtime/*`
- `packages/api-contract/src/index.ts`
- `packages/api-contract/package.json`
- `packages/api-contract/CHANGELOG.md`

Canonical docs likely to change during implementation closure, not in this task:

- `.memory-bank/spec/runtime/command-framework-contract.md`
- `.memory-bank/spec/runtime/channel-runtime-contract.md`
- `.memory-bank/spec/runtime/index.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`

## Tests/checks

Required framework checks:

- `pnpm --filter @dd-bot-platform/core typecheck`
- `pnpm --filter @dd-bot-platform/channel-runtime typecheck`
- `pnpm build`
- `pnpm --filter @dd-bot-platform/core prepack`
- `pnpm --filter @dd-bot-platform/channel-runtime prepack`
- `pnpm changeset:status`

Command-framework tests:

- Public export/import smoke for `@dd-bot-platform/core`.
- Parse result union covers `not_a_command`, `parse_error`, `unknown_command`, `valid_command`.
- Availability policy covers actor classes, channel kinds, channel instance overrides, explicit deny over allow, and default deny.
- Decisions include bounded reason codes and required correlation refs.
- Execution result union covers `success`, `validation_error`, `access_denied`, `dispatch_error`, `unsupported_channel`, and `rate_limited`.
- Safe failure shaping does not include raw args, full provider messages, tokens, or full response bodies.
- Import-boundary proof: no product imports and no `@dd-bot-platform/channel-runtime` import inside `core`.

Channel-runtime tests:

- Public export/import smoke for `@dd-bot-platform/channel-runtime`.
- Threading intent serialization for all modes.
- Threading fallback/result shape for resolved, fallback, ignored, and failed cases.
- Delivery intent/result serialization for all first-slice statuses.
- Correlation fields round trip with existing `ChannelRef` and `ExecutionRunRef`.
- Type-level or runtime proof that provider payload/header/retry/storage fields are not required.
- Existing visibility/render helper tests remain green.

Review checks:

- Verify no product command catalogs moved into `bot-platform`.
- Verify no framework UI/admin/provider sender/DB/read-model scope was introduced.
- Verify `ReplyThreadLinkingFidelity` remains a channel capability/readback vocabulary and is not confused with `ThreadingIntent`.
- Verify `CommandExecutionResult<CanonicalResponseDocument>` works from a consumer package without a `core -> channel-runtime` dependency.

## Semver/release notes

- Adding exported command-framework public types to `@dd-bot-platform/core` is a minor release.
- Adding exported threading/delivery public types to `@dd-bot-platform/channel-runtime` is a minor release.
- If `@dd-bot-platform/api-contract` schemas are added later, that package also needs a minor release.
- Changesets should be created before package release and changelogs updated via the existing Changesets flow.
- Product repos should consume pinned released package versions, not sibling-path source bridges, unless a temporary proof bridge is explicitly documented.
- No package publish should happen until typecheck/build/prepack and import-boundary proof pass.

## Risks/follow-ups

Risks:

- A `core` command success type that imports `CanonicalResponseDocument` would create the wrong dependency direction; keep success payload generic.
- A `channel-runtime` command module would duplicate command-framework ownership; keep dispatch/access/registry out of channel-runtime.
- Threading/delivery types can grow into orchestration; keep first slice summary-only and provider-neutral.
- Actor classes can be mistaken for product permissions; products still own membership/capability mapping and final deny decisions.
- Observability helpers can accidentally log raw command args or provider payloads; defaults must be redaction-safe.

Follow-ups:

- Define Docoved first parity command set before Docoved adoption implementation.
- Define SellerAgent first read-only/diagnostic command subset before SellerAgent adoption implementation.
- Confirm product-local canonical writable command-policy authority and legacy compatibility adapter per product.
- Decide whether any command/thread/delivery API schemas are needed in `@dd-bot-platform/api-contract` after first source-level consumers exist.
- Promote accepted boundary decisions into canonical Memory Bank docs during implementation closure.
