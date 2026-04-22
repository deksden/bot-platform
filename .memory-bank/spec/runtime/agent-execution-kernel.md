---
file: .memory-bank/spec/runtime/agent-execution-kernel.md
description: 'Repo-local runtime spec for the shared execution kernel: execution requests, sessions, workflow families, capability modules, result intents, and the split between decision generation, state application, and delivery.'
purpose: Read when implementing or reviewing the framework execution kernel in `bot-platform` and when mapping runtime code onto reusable execution contracts.
version: 1.8.0
date: 2026-04-21
status: ACTIVE
c4_level: L2
tags: [runtime, execution-kernel, workflows, capabilities, result-intents, bot-platform]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/spec/architecture/container-architecture.md
  - .memory-bank/spec/architecture/dependency-and-placement-rules.md
history:
  - version: 1.8.0
    date: 2026-04-21
    changes: Migrated as repo-local framework runtime kernel spec into `bot-platform` under PRT-036 Wave 91 with bot-platform ownership positioning and index linkage.
  - version: 1.7.0
    date: 2026-04-05
    changes: Clarified that execution requests are selected through channel-bound pipeline binding, that model resolution flows through the generalized policy system, and that kernel executions must emit normalized run/step/attempt traces.
  - version: 1.6.0
    date: 2026-04-05
    changes: Clarified the first persistence decision for `ExecutionSession`: the generic kernel session remains lightweight by default, while reply-job and replay-job tables stay as the durable orchestration anchors for the current long-running flows.
  - version: 1.5.0
    date: 2026-04-05
    changes: Recorded Wave 3D: the first non-seller `research_then_answer` workflow is now implemented on top of the kernel, with runnable Memory Bank research over progressive-disclosure docs.
  - version: 1.4.0
    date: 2026-04-05
    changes: Recorded Wave 3C: `draft_review` now exists as a real workflow module for draft generation and review orchestration, leaving `research_then_answer` as the next workflow-family delivery target.
  - version: 1.3.0
    date: 2026-04-05
    changes: Recorded Wave 3B: the first extracted workflow family module now exists for seller reply orchestration, while draft/review remains a later separation step.
  - version: 1.2.0
    date: 2026-04-05
    changes: Recorded the first code landing for the kernel skeleton: execution contracts and workflow-family dispatch now exist in `packages/core/src/runtime/kernel.ts`, with seller/draft conversation entrypoints routed through this seam.
  - version: 1.1.0
    date: 2026-04-04
    changes: Added the recommended Wave 3 implementation order for the kernel: skeleton first, then seller, then draft/review, then research-then-answer.
  - version: 1.0.0
    date: 2026-04-04
    changes: Initial execution-kernel target spec created.
---

# Agent Execution Kernel

## Goal

Создать общий runtime center, который обслуживает несколько workflow families и не зависит от конкретного канала или seller-only pipeline shape.

## Core contracts

### `AgentProfile`

Defines:
- workflow family or pipeline family
- allowed capabilities
- policy pack
- delivery expectations
- actor/access constraints

Examples:
- `seller_conversation`
- `memory_bank_research_assistant`
- `draft_review_assistant`

### `ExecutionRequest`

Canonical input to the kernel:
- actor/context identity
- channel or integration context
- conversation or task-session reference
- source interaction/message
- selected pipeline / workflow family
- pipeline arguments
- execution mode
- policy/model context

Selection rule:
- the kernel should not decide from raw transport details which workflow to run;
- that decision comes from channel-bound pipeline configuration or an equivalent internal caller-owned binding.

### `ExecutionSession`

Captures the lifecycle of one execution:
- state
- attempts
- traces
- produced artifacts
- produced intents
- supersession/failure/completion reason

Current persistence decision:
- `ExecutionSession` is the canonical execution vocabulary, but not every session needs a dedicated durable store yet;
- seller async reply and replay flows continue to use their existing job records as the persistence anchor;
- a shared durable kernel-session store is deferred until multiple workflow families truly need the same resumable persistence model.

### `ExecutionResult`

Canonical output from the kernel:
- decision/result payload
- generated artifacts
- validation/verifier output
- result intents
- traces

### `ResultIntent`

Normalized post-execution effects, for example:
- `send_message`
- `send_email`
- `create_artifact`
- `schedule_task`
- `handoff_request`
- `update_state`

## Capability modules

`CapabilityModule` is a reusable execution ability with a clear contract and policy boundary.

Examples we actually need:
- `memory-bank-search`
- `document-read`
- `customer-memory-read`
- `commerce-quote`
- `media-library-browse`
- `review-message`
- `handoff-request`
- `email-compose`

Not every capability is a raw tool call.
Some are domain actions or structured generators.

Capability modules are attached to workflows through explicit contracts.
They are not a license to turn the kernel into an unbounded tool-runtime.

## Workflow families

Initial workflow families:

### `seller_conversation`
- optimized for live conversation and commerce-aware reply generation;
- can emit outbound delivery intents and handoff actions.

### `draft_review`
- optimized for operator-owned or hybrid assist flows;
- can emit draft/review artifacts instead of direct delivery.

### `research_then_answer`
- optimized for progressive-disclosure research, evidence collection and knowledge synthesis;
- can emit cited answers, artifacts, or drafts depending on the surface.

Workflow families are the execution-side meaning behind `pipelineId`.
The control plane binds one channel to one workflow family plus workflow-specific arguments.

## Execution split

The kernel must preserve three distinct stages:

1. `execution decides`
   - analyze
   - retrieve/research
   - synthesize
   - verify

2. `application commits`
   - save state
   - save messages/artifacts
   - append domain events
   - enqueue follow-up effects

3. `delivery sends`
   - materialize transport-specific dispatch
   - record sent/skipped/failed steps

This split is mandatory because current code smells largely come from mixing these three responsibilities.

## Policy and backend resolution

The kernel does not hardcode model/provider choice per stage.

Expected flow:
1. workflow decides which semantic step is running;
2. step asks for a role key or equivalent policy key;
3. execution engine resolves the effective target through channel -> pipeline -> system policy precedence;
4. backend-specific execution happens through the appropriate engine such as `llm_api` or `codex_cli`.

This keeps workflow logic focused on behavior while model retry/failover remains in the execution engine.

## Trace contract

Every kernel execution must be inspectable through normalized traces.

Minimum trace layers:
- execution run
- execution step
- execution attempt
- linked artifacts for prompts, context and backend payloads where needed

The kernel owns the semantic structure of those traces even if storage is implemented incrementally behind compatibility bridges.

## Compatibility rule

The new kernel does not replace existing runtime guarantees.
It must preserve:
- traceability;
- governed provider/model routing;
- verifier visibility;
- reply/replay continuity;
- compatibility with existing seller scenarios during migration.

Compatibility anchor:
- current `integration`, `integrationKey`, `channelKind` and `channelThreadRef` terminology may remain in code while the control-plane abstraction evolves toward `Channel`.

## Current implementation status

Wave 3A is now landed as the thinnest viable kernel skeleton:
- code-level contracts live in `packages/core/src/runtime/kernel.ts`;
- workflow-family dispatch is explicit for `seller_conversation` and `draft_review`;
- the current seller runtime still owns execution semantics behind compatibility handlers.

This means the kernel boundary exists, but workflow internals are not yet fully extracted.

Wave 3B improves that state:
- seller reply orchestration now has its own workflow module in `packages/core/src/runtime/seller-workflow.ts`;
- shared stage infrastructure still lives in the runtime service;
- `draft_review` was still awaiting its own extraction wave.

Wave 3C completes that next step:
- `packages/core/src/runtime/draft-review-workflow.ts` now owns draft decision and review orchestration;
- runtime dispatch distinguishes `seller_conversation` and `draft_review` in concrete code paths, not only in kernel vocabulary;
- the remaining workflow-family delivery in this sequence is `research_then_answer`.

Wave 3D now closes that sequence:
- `packages/core/src/runtime/research-workflow.ts` implements the first non-seller workflow family;
- `packages/core/src/runtime/memory-bank.ts` provides the reusable progressive-disclosure research layer;
- the kernel is now proven against seller, draft/review and memory-bank research families in runnable code.

What still remains after that proof:
- explicit channel-bound pipeline configuration as the primary control-plane entrypoint;
- generalized dynamic-role model policy beyond the current fixed profile roles;
- normalized run/step/attempt execution traces and token accounting.

## Recommended implementation order

To keep iteration size reasonable, the kernel should land in this order:

1. `kernel skeleton`
   - minimal execution entrypoint and workflow-family dispatch
2. `seller_conversation`
   - first extracted workflow family
3. `draft_review`
   - operator-assist path extracted from seller branches
4. `research_then_answer`
   - first non-seller workflow proving the architecture
