# T-042-00 Framework Inventory And Placement

## Summary Decision

Recommend a new publishable package: `@dd-bot-platform/channel-runtime`.

Reasoning:
- the first-wave contract is a narrow, product-neutral seam for canonical response documents and pure render helpers;
- `packages/core` already owns execution-kernel and pipeline-binding machinery, so adding channel-render semantics there would blur kernel boundaries;
- `packages/api-contract` is a schema/vocabulary package, so putting runtime helpers there would mix schema ownership with executable helper behavior;
- the shared vocabulary already exists in `core`/`api-contract`, so the new package should reuse and re-export, not redefine.

Lessons/insights created:
- yes — `lessons/001-insights.md`

## Commands And Searches Run

Read-only inventory pass used these commands and paths:
- `sed -n '1,220p' .tasks/prt-042-channel-runtime-implementation-plan/tasks/T-042-00-framework-inventory-and-placement.md`
- `sed -n '1,240p' .memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `sed -n '1,220p' .memory-bank/spec/runtime/channel-runtime-contract.md`
- `sed -n '1,220p' .memory-bank/spec/runtime/command-framework-contract.md`
- `sed -n '1,220p' .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md`
- `sed -n '1,220p' .memory-bank/spec/project/repo-structure.md`
- `sed -n '1,220p' .memory-bank/spec/project/feature-area-boundaries.md`
- `sed -n '1,180p' .memory-bank/spec/engineering/coding-style.md`
- `sed -n '1,180p' .memory-bank/spec/engineering/delivery-standards.md`
- `sed -n '1,220p' .memory-bank/spec/operations/private-registry-package-bridge.md`
- `sed -n '1,220p' package.json`
- `sed -n '1,220p' pnpm-workspace.yaml`
- `sed -n '1,220p' tsconfig.build.json`
- `sed -n '1,260p' scripts/publish-private-packages.mjs`
- `sed -n '1,220p' packages/core/package.json`
- `sed -n '1,220p' packages/api-contract/package.json`
- `sed -n '1,220p' packages/scenario-system/package.json`
- `sed -n '1,220p' packages/core/src/index.ts`
- `sed -n '1,220p' packages/core/src/runtime/index.ts`
- `sed -n '1,420p' packages/core/src/runtime/kernel.ts`
- `sed -n '1,260p' packages/core/src/runtime/execution-result.ts`
- `sed -n '1,260p' packages/core/src/runtime/provider-result.ts`
- `sed -n '1,260p' packages/core/src/runtime/provider-stage.ts`
- `sed -n '1,260p' packages/core/src/runtime/pipeline-registry.ts`
- `sed -n '1,260p' packages/core/src/control-plane/capabilities.ts`
- `sed -n '1,260p' packages/core/src/control-plane/observability.ts`
- `sed -n '1,240p' packages/core/src/control-plane/channel-binding/status.ts`
- `sed -n '1,240p' packages/core/src/control-plane/channel-binding/validation.ts`
- `sed -n '1,220p' packages/core/src/control-plane/refs.ts`
- `sed -n '1,220p' packages/api-contract/src/index.ts`
- `sed -n '1,220p' packages/api-contract/src/runtime.ts`
- `sed -n '1,260p' packages/api-contract/src/control-plane/vocabulary.ts`
- `sed -n '1,260p' packages/api-contract/src/control-plane/models.ts`
- `sed -n '1,320p' packages/api-contract/src/control-plane/read-models.ts`
- `sed -n '1,220p' packages/api-contract/src/control-plane/index.ts`
- `sed -n '1,220p' packages/api-contract/src/governed-content/index.ts`
- `sed -n '1,220p' packages/core/src/control-plane/index.ts`
- `sed -n '1,220p' packages/core/src/governed-content/index.ts`
- `rg -n "channel|render|trace|execution|capabilit|result|command|pipeline" packages/core packages/api-contract packages/scenario-system -g '*.ts' -g '*.json'`
- `rg -n "channel|runtime|core|api-contract|package|publish|command|pipeline|render|trace|capability|result" .memory-bank/spec/project/repo-structure.md .memory-bank/spec/project/feature-area-boundaries.md .memory-bank/spec/engineering/coding-style.md .memory-bank/spec/engineering/delivery-standards.md .memory-bank/spec/runtime/command-framework-contract.md .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md .memory-bank/spec/runtime/index.md`
- `find packages -mindepth 2 -maxdepth 2 -name package.json | sort`

## Inventory Table

| Symbol or vocabulary | Current home | Classification | Inventory note |
| --- | --- | --- | --- |
| `CanonicalResponseDocument`, `CanonicalResponseSection`, `CanonicalResponseBlock`, `CanonicalCitation`, `CanonicalSourceRef`, `CanonicalResponseMetadata`, `CanonicalResponseVisibility`, `CanonicalResponseArtifactRef` | channel-runtime spec only | `new-channel-runtime` | These are the first-wave framework primitives that do not yet exist elsewhere and justify a dedicated seam package. |
| `ChannelRenderTarget`, `ChannelRenderedFormat`, `renderChannelMarkdownToPlainText`, `splitRenderedMessageParts` | channel-runtime spec only | `new-channel-runtime` | Small pure render helpers fit a thin package, not `core` kernel plumbing. |
| `public` / `operator` / `debug` visibility | channel-runtime spec only | `new-channel-runtime` | Visibility semantics are channel-runtime-specific and should stay in the new package contract. |
| `responseId`, `runId`, `traceId`, `channelRef`, `commandId`, `attemptId`, `deliveryId`, `transportMessageRef` | channel-runtime spec only | `new-channel-runtime` | Correlation slots are cross-boundary diagnostics for the new seam, not existing core vocabulary. |
| `ExecutionWorkflowFamily`, `ExecutionDeliveryMode`, `ExecutionMode`, `ExecutionSessionStatus`, `ExecutionTraceStatus` | `packages/core/src/runtime/kernel.ts` | `reuse` | Execution-state vocabulary already exists in `core`; channel-runtime should not redefine it. |
| `AgentProfile`, `ExecutionActorContext`, `ExecutionOwnershipContext`, `ExecutionChannelContext`, `ExecutionPipelineContext`, `ExecutionSubject`, `ExecutionContext`, `ExecutionRequest`, `ExecutionSession`, `ExecutionTrace`, `ResultIntent`, `ExecutionResult` | `packages/core/src/runtime/kernel.ts` | `reuse` | These are the closest existing runtime envelopes and should be reused or referenced. |
| `buildDefaultAgentProfile`, `resolveWorkflowFamilyForMode`, `buildExecutionRequest`, `buildExecutionSession`, `createResultIntent`, `createAgentExecutionKernel` | `packages/core/src/runtime/kernel.ts` | `reuse` | These are framework execution helpers; they are not channel-render helpers. |
| `deriveResultIntentStatusFromTraceStatus`, `deriveExecutionSessionStatus`, `createExecutionTrace`, `createTraceLinkedResultIntent`, `buildExecutionResultFromTrace` | `packages/core/src/runtime/execution-result.ts` | `reuse` | Result/trace derivation stays in the existing runtime package. |
| `RuntimeProviderUsage`, `RuntimeProviderMetadata`, `RuntimeProviderResultEnvelope`, `normalizeProviderResult`, `extractProviderMetadataFromError` | `packages/core/src/runtime/provider-result.ts` | `reuse` | Provider result normalization is adjacent but still distinct from channel-runtime rendering. |
| `RuntimeProviderExecutionStage`, `RuntimeStageHandlerMap`, `RuntimeProviderAdapterRegistry` | `packages/core/src/runtime/provider-stage.ts` | `reuse` | Stage dispatch is runtime-provider plumbing, not channel-runtime contract material. |
| `PipelineDefinition`, `PipelineRegistryError`, `validatePipelineBinding`, `listPipelineDefinitions`, `getPipelineDefinition`, `requirePipelineDefinition` | `packages/core/src/runtime/pipeline-registry.ts` | `reuse` | Pipeline registry and binding logic already live in `core` and should remain authoritative there. |
| `ControlPlaneCapabilityFamily`, `CONTROL_PLANE_CAPABILITY_FAMILIES` | `packages/core/src/control-plane/capabilities.ts` and `packages/api-contract/src/control-plane/vocabulary.ts` | `reuse` / `re-export` | Capability family vocabulary already exists and should be shared, not duplicated. |
| `ChannelRef`, `PipelineBindingRef`, `ExecutionRunRef`, `TraceArtifactRef`, `PipelineId`, `PolicyAssignmentRef`, `VersionToken` | `packages/core/src/control-plane/refs.ts` | `reuse` / `re-export` | These reference types should be imported or re-exported by the new package if needed. |
| `ControlPlaneObservabilityEventName`, `ControlPlaneObservabilityLevel`, `ControlPlaneObservabilityEvent`, `createControlPlaneObservabilityEvent` | `packages/core/src/control-plane/observability.ts` | `reuse` | Existing observability semantics already cover channel- and trace-adjacent diagnostics. |
| `ChannelBindingCapabilityConstraint`, `ChannelBindingCapabilityRequirements`, `ChannelBindingCapabilityAssessment`, `derivePipelineBindingStatus`, `assessChannelBindingCapabilities` | `packages/core/src/control-plane/channel-binding/status.ts` | `reuse` | Channel-binding capability assessment is already framework-owned and should not move into channel-runtime. |
| `ChannelBindingValidationInput`, `ValidatedChannelBinding`, `ChannelBindingValidationResult`, `validateChannelBindingWithRegistry`, `requireValidatedChannelBinding` | `packages/core/src/control-plane/channel-binding/validation.ts` | `reuse` | Binding validation is part of the existing channel/pipeline control plane seam. |
| `channelKindSchema`, `ChannelKind`, `pipelineBindingStatusSchema`, `PipelineBindingStatus`, `replyThreadLinkingFidelitySchema`, `executionRunStatusSchema`, `executionRunStepStatusSchema`, `traceArtifactKindSchema`, `traceArtifactRedactionStateSchema`, `controlPlaneSurfaceIdSchema` | `packages/api-contract/src/control-plane/vocabulary.ts` | `re-export` | These are the contract-side mirrors that the new package should reuse for typed surfaces. |
| `controlPlaneChannelCapabilityMatrixSchema`, `controlPlaneChannelSchema`, `controlPlaneExecutionRunSchema`, `controlPlaneExecutionRunBindingSnapshotSchema`, `controlPlaneTraceArtifactSchema` | `packages/api-contract/src/control-plane/models.ts` | `re-export` | These schema objects already describe the channel/pipeline control plane and can be composed by the new package. |
| `controlPlaneChannelReadModelSchema`, `controlPlaneExecutionRunReadModelSchema`, `controlPlaneTraceArtifactReadModelSchema`, `controlPlaneSurfaceListReadbackSchema`, `controlPlaneSurfaceDetailReadbackSchema` | `packages/api-contract/src/control-plane/read-models.ts` | `re-export` | These are useful as schema dependencies, but they do not define channel-runtime behavior. |
| `CommandEnvelope`, `CommandParser`, `CommandRegistry`, `CommandDispatcher`, `parse_error`, `unknown_command`, `validation_error`, `access_denied`, `dispatch_error` | command framework spec only | `defer` | Commands are explicitly outside the first-wave channel-runtime contract and must not be introduced as parallel `ChannelCommand*` primitives. |
| `Telegram` command parsing / reply conventions, product permission ladders, product command side effects | protocol/spec says product-owned | `product-owned` | Keep this outside the first-wave framework package; only the command-framework seam is shared later. |
| `DocovedAnswerArtifact`, SellerAgent answer artifacts, `telegram-*` generic helpers | protocol/spec says product-owned or deferred | `product-owned` / `defer` | These are adoption targets or product-local helpers, not new framework vocabulary. |

## Package Placement Recommendation

### Recommendation

Create `packages/channel-runtime` and publish it as `@dd-bot-platform/channel-runtime`.

Why this is the best placement:
- the contract is cross-repo by design, so a dedicated framework package makes the seam explicit for both product adopters;
- the first-wave surface is intentionally small and can remain types-plus-pure-helpers only;
- the package can re-export shared core/api-contract refs without taking ownership of core kernel or API schema responsibilities;
- it avoids turning `core` into a catch-all runtime package.

### Why not `core`

- `core` already owns execution kernel, pipeline registry, provider stages, channel binding, and control-plane primitives;
- adding canonical-response-document rendering there would blur the kernel boundary and make `core` less legible as execution infrastructure;
- the inventory shows no existing `core` submodule that already matches this seam without widening its scope.

### Why not `api-contract`

- `api-contract` is the schema/vocabulary mirror and read-model package;
- the first-wave contract needs small pure helpers as well as types;
- placing runtime helpers there risks exposing executable behavior through a package that should stay schema-first.

### Publish/Build Implications

Current repo posture means a new package is not “free”:
- `pnpm-workspace.yaml` already includes `packages/*`, so workspace discovery is fine;
- `tsconfig.build.json` must gain a new project reference for `packages/channel-runtime`;
- `scripts/publish-private-packages.mjs` must add `@dd-bot-platform/channel-runtime` to the publish allowlist;
- the package will need `package.json` metadata, `exports`, `files`, `prepack`, and `publishConfig.access: "public"` aligned with the existing bridge policy;
- Changesets/release workflow evidence will need the new package included once implementation exists.

### Rollback / Alternative If Decision Changes

If later proof shows the package is too small to justify a new publishable unit:
- collapse the first slice into a narrow `packages/core/src/channel-runtime/*` module group;
- keep channel-runtime helpers out of `api-contract`;
- preserve the existing reuse/re-export rule for `core` and `api-contract` symbols.

## Risks And Follow-Ups

- new package means new release bookkeeping, including build graph and publish allowlist updates;
- putting the slice in `core` would likely broaden `core` beyond kernel/plumbing responsibilities;
- putting it in `api-contract` would likely blur schema ownership with runtime helper ownership;
- command adoption must remain deferred until the command-framework contract is explicitly reconciled.

## Open Questions

- whether first-wave helpers should include `splitRenderedMessageParts` or stop at `renderChannelMarkdownToPlainText`;
- whether the first public surface should re-export selected `controlPlane*` schema symbols directly or keep those imports internal;
- whether a later command-adoption phase should become a separate protocol wave after the document/rendering proof.
