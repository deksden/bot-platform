---
file: .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
description: 'Repo-local framework runtime contract for normalized execution trace layers, trace artifacts, and token accounting boundaries.'
purpose: Read when implementing or reviewing framework observability surfaces so run/step/attempt lineage and usage accounting remain reusable across workflow families without product-specific report contracts.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
c4_level: L2
tags: [runtime, traces, observability, token-accounting, artifacts, bot-platform]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
  - .memory-bank/spec/architecture/boundaries.md
  - /Users/deksden/Documents/_Projects/sales-agent/packages/api-contract/src/runtime.ts
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Initial repo-local framework execution trace and token-accounting contract landed under PRT-036 Wave 110.
---

# Execution Traces And Token Accounting

## Goal

Define framework-owned observability truth for:
- execution lineage across run, step, and attempt layers;
- trace-linked artifacts for prompts, context, and backend exchanges;
- normalized token usage accounting without canonical billing logic.

## Framework ownership boundary

`bot-platform` owns shared runtime trace vocabulary and boundary rules.

`bot-platform` does not own:
- product-specific explainability report formats;
- product-specific operator dashboard payloads;
- product billing/invoice semantics.

Product surfaces may project from this trace model, but cannot redefine the canonical meaning of trace lifecycle or token usage fields.

## Canonical trace layers

### `ExecutionTrace` (run/session level)

One logical execution run.

Required concerns:
- identity and workflow family/pipeline reference;
- execution status and lifecycle timestamps;
- channel/integration context reference;
- run-level summary and references to steps/artifacts.

### `ExecutionStepTrace` (semantic step level)

One semantic execution stage inside a run.

Required concerns:
- semantic step key (for example: analyze/retrieve/synthesize/verify);
- requested role/policy reference;
- step status and attempt count;
- fallback/retry summary;
- step-level output and artifact references.

### `ExecutionAttemptTrace` (concrete attempt level)

One concrete backend execution attempt.

Required concerns:
- target/backend identity;
- retry and failover ordinals;
- latency and finish reason;
- failure classification when applicable;
- token usage payload;
- prompt/context/request/response artifact references.

## Trace artifacts

Large prompt/context/backend payloads should not be forced inline into high-level trace rows.

Recommended pattern:
1. run/step/attempt rows keep concise summary and references;
2. heavy payloads are stored as linked `TraceArtifact` records.

`TraceArtifact` should include:
- artifact identity;
- run/step/attempt linkage;
- artifact kind;
- redaction status;
- storage pointer or bounded inline payload.

Framework canonical artifact kinds include:
- rendered prompt;
- packed context snapshot;
- retrieved evidence payload;
- normalized backend request payload;
- normalized backend response payload;
- human-readable derived explainability render.

Derived explainability renders are allowed as trace-linked artifacts only when canonical trace truth remains the source of record.

## Token accounting model

### Required usage fields

Each attempt should support:
- `inputTokens`
- `outputTokens`
- `cacheReadTokens`
- `cacheWriteTokens`
- `totalTokens` (when provided by backend)

These fields are runtime observability/accounting truth.

### Optional usage classification

To preserve future policy flexibility without freezing billing:
- `contextWindowClass` (example: `standard`, `extended`, `large_context`, `unknown`);
- `providerUsageClass` (normalized provider bucket when needed).

Classification fields are metadata and not billing outputs.

## Cost and billing boundary

Canonical rule:
- runtime traces capture usage evidence;
- pricing/billing is a separate policy/reporting layer.

Rationale:
- provider pricing can be plan-specific and non-linear;
- cached token economics can vary by provider and contract;
- some execution engines do not expose a meaningful token-to-cost mapping.

Therefore this framework contract must not require cost calculation at trace-write time.

## Compatibility and continuity

Existing trace consumers may depend on prior structures (for example transitional `DecisionTrace`-based consumers).

Migration rule:
- new trace layers may be introduced behind compatibility bridges;
- existing diagnostics/replay/evaluation consumers must retain reconstructible continuity fields during migration.

Continuity expectations include:
- provider/model provenance;
- retry/failover evidence;
- validation/outcome signals;
- execution profile and timing summary.

## Access, redaction, and retention

Prompt/context artifacts can contain sensitive data.

Framework contract requires:
- explicit access boundary definition;
- explicit redaction status per artifact;
- retention and deletion policy for heavy artifacts;
- ability to disable or bound heavy artifact capture without disabling core run/step/attempt tracing.

## Relationship to replay and evaluation

Replay/evaluation flows should reuse this lineage vocabulary where possible.

Boundary rule:
- evaluation backends may differ from live-runtime providers;
- trace schema must allow backend-type differences without collapsing semantic meaning.

## Non-goals

- canonical billing, invoicing, or chargeback formulas;
- replacing logs/incidents/scenario evidence with trace rows only;
- standardizing product-specific report/document formats as framework contracts.
