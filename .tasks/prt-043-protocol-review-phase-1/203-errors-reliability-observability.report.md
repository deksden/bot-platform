# Task 103 Report: Errors, Reliability, Observability

## Summary verdict

PRT-043 is directionally strong on typed command failures, logging-first diagnostics, redaction, and avoiding framework-owned queues/DB/UI. It already cites the right owners: command failures reuse `.memory-bank/spec/runtime/command-framework-contract.md` sections "Diagnostics and error-shape expectations" and "Access and permission boundary"; rendering/threading/delivery stay in `.memory-bank/spec/runtime/channel-runtime-contract.md` section "Reliability And Observability"; incident policy follows `.memory-bank/spec/operations/observability-and-incident-diagnostics.md`.

The protocol is not implementation-ready for reliability without a hardening pass. The biggest gaps are: delivery idempotency is still too advisory; retry and duplicate-event behavior is under-specified; config/menu policy races lack snapshot/version semantics; render/thread/delivery failures are not elevated into a complete interaction failure taxonomy; and the required event names in PRT-043 do not align with the current control-plane observability vocabulary in `packages/core/src/control-plane/observability.ts` and `packages/api-contract/src/control-plane/vocabulary.ts`.

Recommended verdict: approve the protocol direction, but require a patch before Phase 1 code tasks. The patch should add exact failure classes, idempotency/dedup rules, policy/config snapshot rules, product-local incident-monitoring hooks, and an event vocabulary alignment decision.

## Error/reliability gaps

1. **Failure taxonomy is incomplete beyond command dispatch.**
   - `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md` section "Command result and failure model" covers `not_a_command`, `parse_error`, `unknown_command`, `validation_error`, `access_denied`, `dispatch_error`, `unsupported_channel`, and `rate_limited`.
   - `.memory-bank/spec/runtime/command-framework-contract.md` section "Diagnostics and error-shape expectations" requires command execution to distinguish at least `parse_error`, `unknown_command`, `validation_error`, `access_denied`, and `dispatch_error`.
   - PRT-043 sections "Canonical response and universal rendering", "Threading intent", and "Outbound delivery intent and outcome" mention typed/logged failures, but they do not define stable failure classes for `render_error`, `render_degraded`, `threading_resolution_failed`, `threading_fallback_used`, `delivery_provider_transient`, `delivery_provider_permanent`, `delivery_idempotency_conflict`, `delivery_duplicate_suppressed`, or `config_resolution_failed`.
   - Patch direction: add a separate `ChannelInteractionFailureClass` / `reason_code` table so command failures do not become overloaded with rendering/threading/delivery failures.

2. **Dispatch errors are described as "incident-grade" too broadly.**
   - PRT-043 section "Command result and failure model" says dispatch errors should log incident-grade diagnostics.
   - `.memory-bank/spec/operations/observability-and-incident-diagnostics.md` sections "Error classes" and "Crash policy" distinguish expected domain errors, external transient errors, recoverable runtime errors, slow-path anomalies, and unexpected/invariant errors.
   - Patch direction: replace broad "incident-grade" wording with a severity matrix: validation/access/unknown are expected `info`/`warn`; provider transient failures are `error` with bounded retry; retry exhaustion, impossible state, serialization corruption, and post-send finalization failure are incident-monitor candidates.

3. **Idempotency is necessary but not enforceable as written.**
   - PRT-043 section "Outbound delivery intent and outcome" says every delivery intent should carry a stable idempotency key "or enough correlation fields for the adapter to derive one."
   - That is weaker than `.memory-bank/spec/operations/observability-and-incident-diagnostics.md` section "Retry policy", which allows retries only when the operation is idempotent, guarded by an idempotency key, or represented as a new attempt entity.
   - SellerAgent already has product-local lifecycle guards and terminal delivery readback in `/Users/deksden/Documents/_Projects/seller-agent/apps/workflow/workflows/reply-job.ts` around workflow delivery handling and recovery, and delivery outcome schemas in `/Users/deksden/Documents/_Projects/seller-agent/packages/api-contract/src/conversations.ts` section defining `conversationReplyDeliveryExecutionOutcomeSchema`.
   - Patch direction: require `OutboundDeliveryIntent.idempotencyKey` unless a product-specific provider idempotency primitive is documented. If derived, define the derivation inputs and scope explicitly: product instance, channel ref, response id, command id/run id, transport target, and delivery purpose. Log only a hash or bounded key fingerprint.

4. **Retry ownership is named but not bounded enough.**
   - PRT-043 section "Outbound delivery intent and outcome" correctly says retry ownership must be one layer deep.
   - It does not define default max attempts, backoff, terminal exhaustion event, retryable vs non-retryable delivery classes, or provider-attempt vs platform-attempt counters.
   - `.memory-bank/spec/operations/observability-and-incident-diagnostics.md` section "Retry policy" sets default max attempts to `3`, exponential backoff with jitter, and terminal traceable state.
   - Patch direction: add delivery retry rules by class: validation/config/access/render errors are not retryable; provider timeout/5xx/rate limit can retry with `attempt_id`, `retry_ordinal`, and idempotency key; provider 4xx/auth failures fail terminally unless product config explicitly marks them recoverable.

5. **Inbound deduplication is missing.**
   - PRT-043 mentions idempotency for outbound delivery, but not repeated inbound webhook deliveries or duplicate email inbound events.
   - Docoved requires canonical conversation ingress and reply-link normalization in `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-channel-adapter-contract.md` sections "Internal operation", "Source-binding rule", and "Reply-link rule"; these depend on stable transport refs.
   - Patch direction: add `InboundInteractionIdentity` guidance: provider update id/message id/email `Message-ID` plus channel ref and product instance ref. Repeated inbound events must be processed once or logged as `channel_event_skipped` / `duplicate_event_suppressed` with correlation to the original canonical message.

6. **Config failures need exact safe/unsafe behavior.**
   - PRT-043 section "Configuration source of truth and compatibility" says invalid delivery policy suppresses send only when safe; otherwise it fails loudly.
   - "Safe" is not defined. This is risky because suppressing a customer-visible send can hide a generated answer, while sending under an invalid policy can leak content.
   - Patch direction: define safe suppression as requiring no provider send attempted, a user/operator-visible terminal result where applicable, and a structured `policy_resolution_failed` or `outbound_delivery_failed` event. If any content may already have been sent, suppressing finalization is not safe; record partial failure.

## Observability gaps

1. **PRT-043 event names do not currently exist in the control-plane event schemas.**
   - PRT-043 section "Logging-first diagnostics" requires `command_input_received`, `command_parse_completed`, `command_policy_evaluated`, `command_dispatch_started`, `command_dispatch_completed`, `command_dispatch_failed`, `channel_render_completed`, `channel_render_failed`, `threading_intent_resolved`, `threading_intent_failed`, `outbound_delivery_started`, `outbound_delivery_completed`, `outbound_delivery_failed`, `compat_fallback_used`, and `rate_limit_triggered`.
   - `packages/core/src/control-plane/observability.ts` and `packages/api-contract/src/control-plane/vocabulary.ts` currently allow only membership/session/channel-binding/policy-assignment/diagnostics/trace/fallback events.
   - `.memory-bank/spec/operations/observability-and-incident-diagnostics.md` section "Event naming policy" includes baseline events such as `channel_event_received`, `channel_event_processed`, `channel_event_failed`, `channel_event_skipped`, `retry_scheduled`, `retry_exhausted`, `delivery_plan_completed`, `delivery_plan_failed`, `policy_resolution_failed`, and `compat_fallback_used`, but not most PRT-043-specific command/render/thread events.
   - Patch direction: state whether PRT-043 events are product-local runtime log events outside the control-plane API schemas, or extend the shared vocabulary. Do not leave them in-between.

2. **Required field names mix log shape and TypeScript API shape.**
   - PRT-043 section "Logging-first diagnostics" lists snake_case fields such as `request_id`, `workspace_ref`, and `delivery_id`.
   - Existing control-plane code uses camelCase fields such as `requestId`, `workspaceRef`, and `traceArtifactRef` in `packages/core/src/control-plane/observability.ts` and `packages/api-contract/src/control-plane/observability.ts`.
   - `.memory-bank/spec/operations/observability-and-incident-diagnostics.md` section "Logger baseline" uses snake_case for emitted JSON logs.
   - Patch direction: add a casing rule: TypeScript contract fields may be camelCase, emitted structured logs use snake_case, and any serializer must map between them deterministically.

3. **Incident-monitoring hooks are missing.**
   - The task asks whether the protocol mentions incident-monitoring/Sentry-style product-local hooks without forcing platform coupling.
   - `.memory-bank/spec/operations/observability-and-incident-diagnostics.md` sections "Layers of observability", "Crash policy", and "Controlled error drill" require incident-monitor capture for unexpected exceptions/anomaly messages and optional event ids.
   - PRT-043 section "Logging-first diagnostics" mentions logs, traces, and product-local artifacts, but not incident-monitor hooks or `incident_event_id`.
   - Patch direction: add a paragraph: products may attach Sentry-style incident monitors at product boundaries; platform contracts may carry optional `incident_event_id`/`incident_ref`; bot-platform must not import or require a concrete monitoring SDK.

4. **Fallback event requirements are too vague for schema validation.**
   - `packages/api-contract/src/control-plane/observability.ts` requires `compat_fallback_used` events to include `details.fallbackKind`.
   - PRT-043 sections "Actor-aware command model", "Threading intent", and "Configuration source of truth and compatibility" say fallback must be logged, but do not require `fallbackKind`, `from`, `to`, `reason_code`, `required`, `configured`, or `safety_verdict`.
   - Patch direction: define required fallback details for command policy, legacy config, threading fallback, and delivery suppression. Use `fallbackKind` consistently to match the existing schema.

5. **Missing operational fields for incident reconstruction.**
   - PRT-043 lists core correlation fields, but incident investigation also needs: `effective_config_ref` or `config_version`, `policy_version`, `policy_decision`, `provider_kind`, `provider_error_category`, `retry_ordinal`, `max_attempts`, `idempotency_key_hash`, `requested_threading_mode`, `effective_threading_mode`, and duplicate-event identity.
   - `.memory-bank/spec/operations/observability-and-incident-diagnostics.md` section "Runtime and async visibility baseline" requires configuration truth and execution truth to stay distinguishable.
   - Patch direction: add these as required where applicable, while keeping raw provider payloads, full command args, full email bodies, Telegram messages, tokens, headers, cookies, and full response bodies forbidden as PRT-043 already states.

## Race/concurrency risks

1. **Command menu policy drift.**
   - PRT-043 section "Actor-aware command model" correctly says command menu projection is not authority and menus/help derive from server-side policy.
   - Remaining race: a provider menu can stay stale after policy changes, causing users to see commands that the server will deny or miss commands that are now allowed.
   - Patch direction: add menu projection version/readback guidance. Denial remains server-authoritative, but stale menu detection should log `command_menu_projection_stale` or a product-local equivalent with policy version and channel ref.

2. **Config update during dispatch.**
   - PRT-043 section "Configuration source of truth and compatibility" defines effective config inputs but not when the effective config snapshot is captured.
   - Race: command policy, threading mode, or delivery policy can change between parse, policy evaluation, render, and send.
   - Patch direction: require the adapter/dispatcher to capture an immutable effective-config snapshot or version/fingerprint at dispatch start. The same snapshot governs parse/policy/render/thread/delivery for that invocation unless a product explicitly aborts on stale config. Log configured truth and executed truth separately.

3. **Repeated webhook delivery and email duplicate inbound events.**
   - PRT-043 section "Command input normalization" is conservative about email parsing but does not define duplicate inbound handling.
   - Docoved's adapter contract requires inbound email to become a canonical conversation turn and allows email thread recovery from stored transport refs in `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-channel-adapter-contract.md` section "Source-binding rule".
   - Patch direction: require inbound idempotency before command dispatch or answer generation. Duplicate provider events should not re-run command side effects or cause duplicate outbound delivery.

4. **Parallel delivery retries.**
   - PRT-043 section "Outbound delivery intent and outcome" says retries must not duplicate sends, but does not require single-flight, locking, terminal readback, or conflict behavior.
   - SellerAgent already models lifecycle guards and terminal recovery in `/Users/deksden/Documents/_Projects/seller-agent/apps/workflow/workflows/reply-job.ts` workflow error path, which is a useful product-local pattern.
   - Patch direction: require adapters to perform terminal-result readback before send, acquire product-local single-flight/lock where available, and treat concurrent attempts with the same idempotency key as `delivery_duplicate_suppressed` or `delivery_idempotency_conflict`, not as independent sends.

5. **Post-send finalization failure.**
   - SellerAgent explicitly handles delivered-but-finalization-failed as failed delivery in `/Users/deksden/Documents/_Projects/seller-agent/apps/workflow/workflows/reply-job.ts` via the post-send finalization enrichment path.
   - PRT-043 does not call out this class, but it is important for incident diagnostics: customer-visible delivery may have happened even if persistence/finalization failed.
   - Patch direction: add `delivery_finalization_failed_after_send` as a terminal anomaly with incident-monitor eligibility, no automatic resend unless product-local proof says it is safe.

## Suggested exact patch direction

1. **Patch PRT-043 section "Command result and failure model".**
   - Keep command result kinds as-is.
   - Add a second interaction failure taxonomy: `render_error`, `render_degraded`, `threading_resolution_failed`, `threading_fallback_used`, `delivery_provider_transient`, `delivery_provider_permanent`, `delivery_retry_exhausted`, `delivery_duplicate_suppressed`, `delivery_idempotency_conflict`, `delivery_finalization_failed_after_send`, `config_resolution_failed`, and `policy_resolution_failed`.
   - For each class, define default log level, retryability, user-facing behavior, and whether incident-monitor capture is expected.

2. **Patch PRT-043 section "Outbound delivery intent and outcome".**
   - Make `idempotencyKey` mandatory or require a documented provider/product derivation.
   - Add `idempotencyKeyHash`, `retryOrdinal`, `maxAttempts`, `providerAttemptCount`, `terminalReadbackRef`, and `deliveryOutcomeKind` as diagnostic fields.
   - Require terminal readback/single-flight behavior for parallel attempts and repeated retries.
   - Add explicit handling for post-send finalization failure and partial failure.

3. **Patch PRT-043 section "Configuration source of truth and compatibility".**
   - Add `effectiveConfigVersion` / `effectivePolicyVersion` / `effectiveConfigHash` guidance.
   - State that one invocation uses one effective snapshot across policy evaluation, render, threading, and delivery.
   - Define safe vs unsafe delivery suppression.

4. **Patch PRT-043 section "Threading intent".**
   - Define `ThreadingResolution` fields: requested mode, effective mode, fallback used, fallback kind, fallback reason code, provider target ref state, required vs optional, and user-visible impact.
   - Require `compat_fallback_used` or `threading_intent_failed` details to include `fallbackKind` where fallback occurs.

5. **Patch PRT-043 section "Logging-first diagnostics".**
   - Decide event ownership: either product-local runtime events or shared control-plane events.
   - Align with `.memory-bank/spec/operations/observability-and-incident-diagnostics.md` baseline names by adding or mapping `channel_event_*`, `retry_scheduled`, `retry_exhausted`, `policy_resolution_failed`, `delivery_plan_completed`, and `delivery_plan_failed`.
   - If shared, update the plan to include changes to `packages/core/src/control-plane/observability.ts`, `packages/api-contract/src/control-plane/vocabulary.ts`, and schema tests. If product-local, explicitly say these PRT events are not accepted by the control-plane API schemas.
   - Add optional product-local `incident_event_id` / `incident_ref` without coupling bot-platform to Sentry or another SDK.

6. **Patch PRT-043 verification matrix.**
   - Add tests for duplicate inbound provider event suppression, duplicate email `Message-ID` handling, config update during dispatch, stale menu projection, parallel delivery retry with same idempotency key, retry exhaustion, post-send finalization failure, fallback event schema details, and redaction of raw command args/email bodies/Telegram messages/provider headers.

