---
file: .memory-bank/spec/runtime/trace-artifact-governance.md
description: 'Framework runtime governance for trace artifacts: capture policy, redaction, retention classes, access boundaries, and environment behavior.'
purpose: Read when implementing or reviewing runtime trace persistence so prompt/context diagnostics stay replay-useful without creating uncontrolled sensitive-data storage.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
c4_level: L2
tags: [runtime, traces, artifacts, governance, redaction, retention, access, bot-platform]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
  - .memory-bank/spec/architecture/boundaries.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Initial repo-local framework trace artifact governance baseline under PRT-036 Wave 111.
---

# Trace Artifact Governance

## Goal

Define one framework-wide policy for capturing, storing, redacting, retaining, and reading trace artifacts so diagnostics remain actionable and security boundaries remain explicit.

## Scope of governance

This spec governs reusable runtime rules for:
- artifact kinds and capture triggers;
- summary vs heavy payload storage behavior;
- redaction states and blocked-content handling;
- access tiers and audit expectations;
- retention classes and environment-driven capture posture.

This spec does not define product runbooks, product-specific report formats, or product deployment operations.

## Canonical artifact kinds

Framework-recognized kinds:
- `rendered_prompt`
- `packed_context`
- `retrieved_evidence`
- `backend_request`
- `backend_response`
- `normalized_tool_input`
- `normalized_tool_output`
- `verification_bundle`
- `human_readable_report`

Rule:
- every attempt must be explainable through stored summary trace evidence;
- not every attempt must persist every artifact kind in full payload form.

## Capture policy

Baseline policy:
- always persist summary metadata required for explainability and lineage;
- persist heavy artifacts selectively, not by default for every successful production attempt.

Allowed capture triggers:
- execution failure;
- validation failure;
- retry/fallback/failover event;
- replay/evaluation/judge run;
- explicit debug sampling;
- time-bounded incident mode.

## Storage classes

### Inline-small

Use for compact payloads safe for top-level trace rows:
- short normalized fragments;
- small evidence manifests;
- bounded summaries.

### Linked-heavy

Use for large or sensitive payloads:
- full rendered prompts;
- packed context snapshots;
- provider request/response bodies;
- large evidence or verification bundles.

Rule:
- heavy payloads must be referenced through governed artifact records or storage refs, not embedded everywhere in top-level rows.

## Redaction policy

Each artifact must carry a redaction state:
- `none`
- `partial`
- `full`
- `blocked`

Each redacted/blocked artifact must include a machine-readable reason (for example `pii`, `secret`, `operator_only`, `security_policy`).

Blocked-content rule:
- if source payload is blocked from persistence, derived projections (including human-readable reports) must not reintroduce blocked content.

## Access and audit boundaries

Minimum framework access model:
- standard operator diagnostics may read summary trace rows;
- heavy artifacts require elevated role-based access;
- raw prompt/context access must be auditable;
- default operator/chat surfaces must not dump raw heavy artifacts automatically.

Audit expectation:
- artifact reads at elevated tiers must be attributable to actor, scope, and timestamp.

## Retention classes

Retention must be explicit by class, not implicit forever-storage.

Framework classes:
- trace summaries: follow runtime baseline retention policy;
- heavy artifacts for routine successful runs: short bounded TTL;
- heavy artifacts for failures/incidents/evaluation: longer bounded TTL;
- evidence-linked artifacts required for governed evaluation history: retained per evaluation history policy.

Exact durations are operational configuration, but class assignment is mandatory.

## Environment behavior

Capture posture must be policy-driven and environment-aware:
- local/dev: broader capture allowed for debugging;
- staging/beta: bounded richer capture for verification;
- production: summary-first with selective heavy capture.

Handlers must not hard-code ad hoc logging decisions as a substitute for policy.

## Security rules

Never persist in reusable raw form:
- API keys;
- auth cookies/session tokens;
- secret-bearing callback URLs;
- unbounded attachment blobs copied into trace storage without policy justification.

If backend payloads contain secrets:
- redact before persistence; or
- block full persistence and store only governed summary metadata.

## Relationship to execution traces and evaluation

Trace artifact governance complements execution-trace contracts:
- execution traces define lineage vocabulary (run/step/attempt);
- this spec defines artifact safety and storage controls over that lineage.

Evaluation and replay may justify richer artifact capture, but redaction/access/retention policy remains mandatory in all environments.

## Non-goals

- billing or cost model standardization;
- permanent archival of every raw prompt forever;
- unrestricted operator access to raw prompt/context payloads;
- product-specific explainability or operator report workflows.

## Review checklist

- Are summary artifacts sufficient to explain each attempt?
- Are heavy payloads captured only under explicit policy triggers?
- Is redaction state + reason present for each governed artifact?
- Are blocked payloads prevented from leaking via derived reports?
- Are elevated artifact reads access-controlled and auditable?
- Is retention class assigned for each heavy artifact?
- Are environment-specific capture defaults policy-driven?
