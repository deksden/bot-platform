---
file: .memory-bank/spec/operations/observability-and-incident-diagnostics.md
description: Framework observability and incident-diagnostics baseline for structured logs, correlation, retries, and trace-linked investigation flow.
purpose: Read before changing framework runtime or operator surfaces so logging, error handling, and incident diagnostics remain coherent across products and environments.
version: 1.6.0
date: 2026-04-22
status: ACTIVE
tags: [spec, operations, observability, logging, incidents, retries, diagnostics, framework]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/spec/operations/runbook.md
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
  - .memory-bank/spec/runtime/decision-explanation-envelope.md
  - .memory-bank/spec/engineering/coding-style.md
history:
  - version: 1.6.0
    date: 2026-04-22
    changes: Migrated into bot-platform as framework baseline and removed product/channel-specific incident procedures while preserving canonical observability rules.
  - version: 1.5.0
    date: 2026-04-19
    changes: Added continuity/readback rule prioritizing canonical trace/report artifacts over provider-local debug payloads.
  - version: 1.4.0
    date: 2026-04-17
    changes: Added explicit multi-provider observability requirements so config truth, execution truth, retries, failover, and cache evidence stay distinguishable.
  - version: 1.3.0
    date: 2026-04-06
    changes: Added no-silent-fallback visibility guidance and highlighted policy resolution and delivery-terminal mismatch as first-class anomalies.
  - version: 1.2.0
    date: 2026-04-05
    changes: Linked observability baseline to normalized execution traces and clarified that heavy prompt/context payloads belong in governed trace artifacts.
---

# Observability And Incident Diagnostics

## Purpose

Define the framework observability baseline:
- what to log;
- which errors are expected vs incident-worthy;
- where retries are allowed;
- how to investigate incidents using correlation identifiers and runtime traces.

## Layers of observability

### 1. Application logs

- structured JSON logs via a standard logger;
- primary sink is environment runtime logs;
- used for operational correlation and triage.

### 2. Error monitoring

- incident-monitoring sink for unexpected exceptions and anomaly messages;
- release/environment correlation for incident timelines.

### 3. Domain/runtime trace

- canonical execution lineage and timeline;
- run/step/attempt diagnostics;
- linked trace artifacts under governance rules;
- scenario and acceptance evidence anchors.

Rule:
- logs are for correlation and triage;
- execution traces are for explainability;
- heavy prompt/context payloads belong in governed trace artifacts, not routine logs.

## Logger baseline

### Required log shape

- `level`
- `event`
- `service`
- `env`
- `release`
- `request_id`
- `correlation_id`
- `route`
- `method`
- route/domain-specific keys as needed

### Required domain keys where applicable

- `conversation_id`
- `customer_id`
- `channel_kind`
- `channel_account_id`
- `transport_message_ref`
- `attempt_id`
- `task_id`
- `operation_id`
- `scenario_id`

## Correlation policy

### Request identifiers

- every HTTP/webhook request must have `request_id`;
- if caller provides `x-request-id` or `x-correlation-id`, reuse it;
- otherwise generate identifiers in the owning boundary.

### Response headers

Critical routes should return:
- `x-request-id`;
- `x-correlation-id`.

Unexpected-error responses may additionally return:
- `x-event-id` for incident-monitor correlation.

## Event naming policy

Event names are short `snake_case` identifiers.

Canonical baseline:
- `request_started`
- `request_completed`
- `request_failed`
- `operation_invoked`
- `operation_succeeded`
- `operation_failed`
- `channel_event_received`
- `channel_event_processed`
- `channel_event_failed`
- `channel_event_skipped`
- `retry_scheduled`
- `retry_exhausted`
- `runtime_turn_started`
- `runtime_stage_started`
- `runtime_attempt_completed`
- `runtime_attempt_validation_failed`
- `runtime_provider_retry_scheduled`
- `runtime_turn_slow`
- `runtime_turn_budget_exceeded`
- `job_scheduled`
- `job_started`
- `job_completed`
- `job_failed`
- `job_superseded`
- `delivery_plan_completed`
- `delivery_plan_failed`
- `delivery_step_suppressed`
- `policy_resolution_failed`
- `compat_fallback_used`
- `guardrail_blocked`
- `handoff_started`
- `handoff_released`

## Error classes

### Expected domain errors

Examples:
- validation failures;
- auth/forbidden/not-found;
- invalid transitions;
- incompatible relation checks.

Policy:
- typed error contract;
- `info` or `warn` log;
- no incident alert by default.

### External transient errors

Examples:
- upstream timeout;
- provider 5xx;
- temporary network reset;
- rate limit.

Policy:
- `error` log;
- bounded retry only when operation is idempotent or attempt-based;
- incident alert on exhaustion or anomaly, not necessarily first failure.

### Recoverable runtime errors

Examples:
- retryable task failure;
- stale lock/conflict with safe re-run;
- scheduling collision.

Policy:
- record in state/attempt lineage;
- log with traceable identifiers;
- surface in diagnostics.

### Slow-path anomalies

Examples:
- turn exceeds warning/error budget;
- provider sub-retries inflate one successful stage;
- response job is generated but not dispatched;
- completion is reported without governed delivery verdict.

Policy:
- structured `warn` or `error` with domain identifiers;
- explicit anomaly event;
- incident-monitor message when thresholds are crossed;
- preserve canonical DB/trace evidence so review does not rely only on transient logs.

### Unexpected/invariant errors

Examples:
- unhandled exception;
- impossible state;
- serialization corruption;
- broken contract assumptions.

Policy:
- `error` log;
- incident capture;
- request/job fails;
- no silent fallback.

## No-silent-fallback visibility rule

Fallback behavior that changes execution, policy resolution, lifecycle state, or delivery semantics must never disappear silently.

Required behavior:
- explicit structured event when compatibility fallback is used;
- explicit structured event when required policy/config resolution fails;
- correlation identifiers linking fallback/failure to request/job/conversation context;
- no hidden downgrade from failure to success.

## Retry policy

Retries are allowed only when:
- operation is idempotent; or
- guarded by idempotency key; or
- explicitly represented as a new attempt entity.

### Baseline policy

- default max attempts: `3`;
- exponential backoff with jitter;
- exhaustion produces traceable terminal event/state.

### Not retryable by default

- validation errors;
- auth errors;
- forbidden/not-found;
- non-idempotent mutations without protection.

## Crash policy

### API boundary

- catches unexpected exceptions;
- logs one structured failure in the owning boundary;
- captures incident event;
- returns a safe typed response.

### Background/jobs

- failure must be visible in job or attempt state, not only logs;
- workflow-backed jobs should record `queued/running/completed/failed/superseded`.

### UI/client surfaces

- user-facing friendly error states;
- no raw stack traces or secret-bearing payloads in UI;
- boundary-level incident capture where configured.

## Redaction and privacy

Never log:
- passwords;
- tokens;
- service-role keys;
- auth headers;
- cookies;
- secret-bearing URLs;
- full prompt payloads;
- chain-of-thought/reasoning text.

If user content exists canonically in persistence, logs should prefer bounded metadata (`message_length`, `attachment_count`) unless explicit policy allows a short preview.

## Runtime and async visibility baseline

Incident-grade evidence for provider-governed execution should preserve:
- effective runtime role/policy key;
- execution stage;
- provider kind and model target where available;
- canonical failure category;
- retry ordinal;
- provider-attempt count;
- same-target retry vs cross-target failover;
- cache status where applicable.

Operational rule:
- configuration truth and execution truth must stay distinguishable in diagnostics;
- a readback showing only configured targets is not proof of what actually executed.

## Controlled error drill

Framework surfaces should expose a governed controlled-error probe in each hosted lane.

Expected drill behavior:
- explicit failure status;
- machine-readable error envelope;
- request/correlation identifiers;
- incident event identifier when monitoring is configured.

## Investigation path

For a live incident:
1. capture `request_id` and/or `conversation_id`;
2. inspect structured logs by those identifiers;
3. inspect canonical runtime lineage and linked artifacts;
4. inspect incident-monitor event when present;
5. confirm state-mutation outcome in canonical persistence.

## Verification requirements

Baseline observability is accepted when:
- request correlation fields are visible on critical routes;
- controlled error drill works in local and hosted verification lanes;
- runtime and async paths leave traceable structured events;
- scenario/evidence artifacts can link to investigation anchors.

## Non-goals

- replacing execution traces with logs only;
- replacing logs with traces only;
- encoding product-specific runbooks into framework observability canon.
