---
file: .memory-bank/spec/runtime/workflow-framework-contract.md
description: 'Framework runtime contract for the workflow framework: protected host/start/callback surfaces, lifecycle vocabulary, durability expectations, and internal auth boundaries.'
purpose: Read when designing workflow-framework seams in `bot-platform` so shared workflow mechanics remain reusable without turning product workflow hosts or business workflows into framework truth.
version: 1.0.0
date: 2026-04-22
status: ACTIVE
c4_level: L2
tags: [runtime, workflow, framework-contract, durability, callbacks, bot-platform]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/spec/architecture/containers/workflow-host.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
history:
  - version: 1.0.0
    date: 2026-04-22
    changes: Landed the repo-local workflow framework contract for protected host/start/callback vocabulary, internal auth expectations, and durability/lifecycle rules under PRT-036 Wave 158.
---

# Workflow Framework Contract

## Goal

Define the narrow workflow-framework slice that `bot-platform` owns:
- protected workflow-host vocabulary and route classes;
- start, callback, status, health, and manifest contracts;
- lifecycle, durability, retry, and resume expectations shared across workflow families;
- internal auth rules for server-to-server workflow interactions.

This contract is intentionally narrow.
It does not make `bot-platform` the owner of product workflow hosts, workflow deployments, or product workflow-family registries.

## Framework ownership boundary

`bot-platform` owns reusable workflow mechanics:
- host/start/callback/status vocabulary;
- internal or S2S auth expectations for protected workflow surfaces;
- lifecycle and durability rules shared across workflow families;
- common instrumentation and traceability expectations.

`bot-platform` does not own:
- product workflow hosts and deployment units;
- workflow storage bindings and product persistence topology;
- business workflow families, business steps, or callback payload semantics;
- product replay content, result materialization, and product-facing workflow APIs.

## Canonical workflow host surfaces

Framework vocabulary should distinguish these protected surfaces:
- `workflow start`
- `workflow callback`
- `workflow status`
- `workflow health`
- `workflow manifest`

Rule:
- these are protected internal contracts, not accidental second public APIs;
- the canonical server boundary remains the public ingress surface even when it delegates work to the workflow host.

## Start contract

Framework primitive: `WorkflowStartRequest`.

Minimum concerns:
- workflow family or workflow contract reference;
- input payload or payload reference;
- correlation or idempotency key;
- actor/scope context reference when relevant;
- requested execution mode or policy hints safe at framework level.

Framework expectations:
- start is accepted through one protected internal contract;
- idempotency must be explicit for retried or repeated submissions;
- acceptance should produce a stable workflow run identifier and initial lifecycle state.

## Callback contract

Framework primitive: `WorkflowCallback`.

Responsibilities:
- report progress, completion, failure, or resumable waiting state back into the canonical workflow run;
- remain idempotent under retry or duplicate delivery;
- preserve correlation with the originating run and durable-step state.

Framework rule:
- callback mechanics are shared framework truth;
- callback payload meaning for a concrete business step remains product-owned.

## Status, health, and manifest surfaces

Framework status/readback must support:
- workflow run identity;
- current lifecycle state;
- retry/resume summary;
- trace or artifact linkage needed for diagnostics.

Framework health/manifest surfaces may expose:
- host readiness and version identity;
- supported workflow-family registrations at a framework-safe level;
- protected topology metadata needed for hosted verification.

Rule:
- health and manifest surfaces should help prove the host contour is real without leaking product workflow internals.

## Internal auth and S2S expectations

Workflow-host surfaces are protected by default.

Framework rules:
- `workflow start`, `workflow callback`, `workflow status`, `workflow health`, and `workflow manifest` must require explicit internal or S2S auth unless a narrower documented exception exists;
- callbacks must not rely on unauthenticated public URLs as the normal contract;
- secrets, signed callback tokens, or equivalent internal trust material must be scoped and auditable.

Anti-patterns:
- exposing a second public workflow API because internal auth was inconvenient;
- letting callback endpoints become secretless public ingress;
- using product browser sessions as a substitute for internal workflow auth.

## Lifecycle, durability, retry, and resume expectations

Framework workflow runs must have explicit lifecycle semantics.

Minimum lifecycle concerns:
- accepted or queued;
- running;
- waiting on callback or durable-step completion;
- retrying or resumed;
- completed;
- failed;
- canceled when supported.

Framework durability rules:
- workflow progress must survive normal host restarts or process replacement at the contract level;
- retry behavior must preserve idempotency and explicit attempt accounting;
- resume behavior must make prior durable state and correlation visible to diagnostics.

Framework non-rule:
- this contract does not require one shared persistence implementation today;
- products still own the concrete storage model that satisfies these durability expectations.

## Diagnostics and traceability

Workflow framework surfaces must be inspectable through canonical diagnostics:
- stable workflow run ids;
- request and callback correlation ids;
- lifecycle status snapshots;
- trace or artifact references when available.

Framework rule:
- protected workflow execution must remain observable without inventing a product-specific operator UI as the only evidence path.

## Explicit product-owned exclusions

The following remain product-local:
- SellerAgent or Docoved workflow-family registries;
- workflow hosts deployed as product apps or workers;
- workflow storage tables and migration ownership;
- business-step payload contracts and callback semantics;
- product result materialization and downstream delivery behavior.

## Non-goals

- Define one product workflow family as framework canon.
- Create a public second API surface for workflow operations.
- Move workflow deployment/runbook ownership into `bot-platform`.
- Freeze product callback payloads or business-step schemas as shared framework truth.
