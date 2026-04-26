---
file: .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md
description: Companion details for PRT-043 phase-1 review: boundary step contracts, entity ownership matrix, observability event checklist, and verification lanes.
purpose: Keep PRT-043 lean while preserving phase-1 review details needed before implementation task packets are opened.
version: 1.0.0
date: 2026-04-26
status: CLOSED
tags: [protocol-detail, channel-runtime, command-runtime, review, verification]
parent: .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md
related_files:
  - .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md
  - .memory-bank/spec/runtime/command-framework-contract.md
  - .memory-bank/spec/runtime/channel-runtime-contract.md
  - .tasks/prt-043-protocol-review-phase-1/001-orchestrator-consolidated-review.md
history:
  - version: 1.0.0
    date: 2026-04-26
    changes: Closed companion review details with parent PRT-043; implementation and final evidence live in the implementation plan and task workspace.
  - version: 0.1.0
    date: 2026-04-26
    changes: Extracted detailed phase-1 review tables from PRT-043 to keep the main protocol below the MBB decomposition threshold.
---

# PRT-043 Channel Interaction Runtime Review Details

This companion file is not the canonical protocol.
It is closed with PRT-043 and remains as phase-1 review detail evidence.

Canonical sequencing and scope remain in:
- [PRT-043 Channel Interaction Runtime](PRT-043-channel-interaction-runtime-command-render-thread-delivery.md)

## Boundary step contracts

| Step | Input | Output | Owner | Failure/result | Required event | Side effects |
| --- | --- | --- | --- | --- | --- | --- |
| Receive inbound event | Provider webhook/API/CLI input | Normalized inbound context | Product adapter | provider validation failure | `channel_event_received` / `channel_event_failed` | Provider read only |
| Extract command candidate | Inbound context and channel config | Raw command candidate or ordinary message | Product adapter | `not_a_command` | `command_input_received` | None |
| Normalize command | Raw command candidate | `CommandEnvelope` or parse result | Command framework | `not_a_command`, `parse_error`, `unknown_command` | `command_parse_completed` | None |
| Resolve actor and policy | Envelope, actor context, effective config | `CommandAvailabilityDecision` | Product auth plus command framework policy contract | `access_denied`, `unsupported_channel`, `rate_limited` | `command_policy_evaluated` | Product-local auth/rate-limit read |
| Dispatch handler | Valid envelope and policy decision | `CommandExecutionResult` | Product handler through command framework dispatch path | `validation_error`, `dispatch_error`, `success` | `command_dispatch_started` / `command_dispatch_completed` / `command_dispatch_failed` | Product-owned side effects only |
| Build canonical response | Product result or safe failure | `CanonicalResponseDocument` | Product mapper using channel-runtime document contract | safe public/operator/debug document | command dispatch/render events | None unless product records artifacts |
| Render for channel | Canonical document and render target | Provider payload draft | Product adapter, pure helpers where shared | render failure or degraded render | `channel_render_completed` / `channel_render_failed` | None |
| Resolve threading | `ThreadingIntent`, inbound refs, product lookup | `ThreadingResolution` | Product adapter | typed fallback or failure | `threading_intent_resolved` / `threading_intent_failed` | Product-local lookup |
| Deliver outbound | Payload draft, threading resolution, idempotency key | `OutboundDeliveryResult` summary | Product adapter/provider | delivered, suppressed, failed, partial_failure, skipped, simulated | `outbound_delivery_started` / `outbound_delivery_completed` / `outbound_delivery_failed` | Provider send |

Rules:
- `not_a_command` returns to ordinary product answer flow, not command dispatch.
- User-facing failures become safe `CanonicalResponseDocument` only when feedback is required.
- `ThreadingIntent` must be resolved before final provider send.
- `OutboundDeliveryIntent` must carry or derive an idempotency key before any transport call.
- Product adapters may log provider-specific details only after applying product redaction policy.

## Entity ownership matrix

| Entity | Owning feature area | Stable spec owner | Implementation package/module candidate | Product-owned inputs | Adapter-owned inputs |
| --- | --- | --- | --- | --- | --- |
| `CommandInvocationSource` | `command-framework` | `command-framework-contract.md` | command-framework-owned module, not hidden in channel-runtime | workspace/product/channel refs, actor lookup refs | provider message refs, request refs |
| `CommandActorContext` | `command-framework` with auth/control-plane vocabulary reuse | `command-framework-contract.md` and control-plane vocabulary | command-framework-owned module | memberships, roles, product capability tags | transport identity evidence |
| `CommandAvailabilityPolicy` | `command-framework` | `command-framework-contract.md` | command-framework-owned module | product defaults, command-specific rules | channel-kind/instance config input |
| `CommandAvailabilityDecision` | `command-framework` | `command-framework-contract.md` | command-framework-owned module | product capability mapping | channel capability facts |
| `CommandExecutionResult` | `command-framework` result bridge | `command-framework-contract.md`; success payload uses `channel-runtime-contract.md` | command-framework-owned type referencing canonical response types | handler result and safe failures | none |
| `CanonicalResponseDocument` | `channel-runtime` | `channel-runtime-contract.md` | `@dd-bot-platform/channel-runtime` | product answer/command result mapping | render target only |
| `ThreadingIntent` / `ThreadingResolution` | candidate `channel-runtime` extension | promote to `channel-runtime-contract.md` only after Phase 1 boundary gate | channel-runtime-adjacent type if provider-neutral | channel-instance threading policy, product conversation lookup | provider reply/header refs |
| `OutboundDeliveryIntent` / `OutboundDeliveryResult` | candidate `channel-runtime` extension | promote to `channel-runtime-contract.md` only after Phase 1 boundary gate | channel-runtime-adjacent type if summary-only/provider-neutral | delivery policy, idempotency/correlation refs | provider send outcome |

Reuse rule:
- workspace, product, channel, run, trace, capability, and observability refs must reuse existing `core` / `api-contract` / control-plane vocabulary where it exists.
- New public types are allowed only for missing provider-neutral concepts proven by Docoved and SellerAgent needs.
- No command-framework public type may be newly owned by `@dd-bot-platform/channel-runtime`; channel-runtime may reference or re-export only when dependency direction is documented.

## Observability checklist

Required structured events:
- `command_input_received`
- `command_parse_completed`
- `command_policy_evaluated`
- `command_dispatch_started`
- `command_dispatch_completed`
- `command_dispatch_failed`
- `channel_render_completed`
- `channel_render_failed`
- `threading_intent_resolved`
- `threading_intent_failed`
- `outbound_delivery_started`
- `outbound_delivery_completed`
- `outbound_delivery_failed`
- `compat_fallback_used`
- `rate_limit_triggered`

Required diagnostic fields where applicable:
- `request_id`
- `correlation_id`
- `workspace_ref`
- `product_instance_ref`
- `channel_ref`
- `channel_kind`
- `actor_class`
- `principal_ref` when safe and available
- `command_key` when safe to expose
- `command_result_kind`
- `response_id`
- `run_id`
- `trace_id`
- `delivery_id`
- `attempt_id`
- `transport_message_ref`
- bounded reason code

Redaction rules:
- do not log full command arguments by default;
- do not log full email bodies or Telegram messages;
- do not log provider tokens, headers, cookies, or secret-bearing URLs;
- do not log full canonical response bodies;
- log lengths/counts/hashes only when needed for triage.

## Verification lanes

Framework local/package checks:
- typecheck/build for touched packages;
- package `prepack` or pack dry-run for publishable packages;
- unit tests for command availability policy;
- unit tests for policy precedence and fallback diagnostics;
- unit tests for command parse/result/failure envelopes;
- unit tests for `not_a_command`, `access_denied`, `rate_limited`, and `unsupported_channel` result kinds;
- unit tests for threading intent and delivery result serialization if those types are added;
- unit tests for redaction-safe observability event construction if helper code is added;
- import-boundary proof: no product imports in platform packages;
- docs/index validation by review.

Docoved local checks:
- command parser/dispatcher tests for Telegram and email inputs;
- tests proving ordinary email questions are not misclassified as commands;
- unauthorized actor tests for email sender and Telegram user;
- repeated webhook/email duplicate tests proving idempotency or visible suppression;
- policy fallback diagnostics tests;
- render tests proving identical canonical command result semantics across Telegram/email;
- email threading tests for `Re:` / `Message-ID` / `In-Reply-To` / `References`;
- Telegram reply parameter tests where feasible.

Docoved hosted beta checks:
- normal Telegram answer still works;
- normal email answer still works;
- Telegram command answer works for authorized actor and denies unauthorized actor;
- email command answer works for authorized actor and denies unauthorized actor;
- beta email answer is sent as reply from `ask@beta-mail.docoved.pro`;
- ordinary beta email question is not misclassified as a command;
- hosted checks route to Docoved scenario anchors such as `SCN-201`, `SCN-202`, `SCN-204`, and command-policy/projection anchor `SCN-211` where those docs are present;
- stable beta alias/readback verifies the deployed target before hosted proof is accepted;
- structured logs contain correlation ids and no secrets/full raw payloads.

SellerAgent local checks:
- privileged command gates preserve system-admin/workspace-admin/member/external distinctions;
- release-control mutation commands remain server-authoritative and require the existing product permission gate;
- Telegram menu/help projection remains derived from server policy;
- menu projection drift cannot grant command authority;
- delivery outcome mapping tests preserve existing semantics;
- no regression in release-control command handlers.

SellerAgent hosted beta checks:
- existing Telegram privileged command scenarios pass;
- route hosted proof to `SCN-053` for Telegram observed-user/employee verification and privileged-command safety where applicable;
- release readback/control commands respect actor policy;
- external/unknown users cannot access privileged commands;
- delivery diagnostics remain traceable.

## Implementation task graph

Dependency graph:
- `T-043-01 platform package boundary decision` blocks all code tasks.
- `T-043-02 command contract types` depends on `T-043-01`.
- `T-043-03 channel intent/result types` depends on `T-043-01`.
- `T-043-04 policy resolution tests` depends on `T-043-02`.
- `T-043-05 render/thread/delivery tests` depends on `T-043-03`.
- `T-043-06 Docoved command inventory` can run in parallel after protocol approval.
- `T-043-07 SellerAgent command inventory` can run in parallel after protocol approval.
- `T-043-08 Docoved adoption` depends on `T-043-02`, `T-043-03`, `T-043-04`, `T-043-05`, and `T-043-06`.
- `T-043-09 SellerAgent adoption` depends on `T-043-02`, `T-043-03`, `T-043-04`, `T-043-05`, and `T-043-07`.
- `T-043-10 cross-repo docs and release` depends on platform contracts and at least one product adoption.

Parallel opportunities:
- Docoved and SellerAgent inventories can run in parallel.
- Command contract types and channel intent/result types can run in parallel only if write scopes are separated.
- Product adoption waves should not run in parallel until the platform package version is fixed, unless each product pins the same local prerelease explicitly.

Do not start:
- DB/read-model task.
- UI/admin task.
- Provider sender extraction.
- Mutation-command expansion before read-only/diagnostic command proof is stable.
