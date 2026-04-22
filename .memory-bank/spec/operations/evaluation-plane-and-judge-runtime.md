---
file: .memory-bank/spec/operations/evaluation-plane-and-judge-runtime.md
description: Framework operations and runtime contract for replay, compare, scorecards, suites/cases, and pluggable judge backends around the shared execution kernel.
purpose: Read when evolving replay and judge systems so evaluation remains a first-class framework plane instead of becoming product-specific tooling drift.
version: 1.3.0
date: 2026-04-22
status: ACTIVE
tags: [spec, operations, evaluation, replay, judge, compare, scorecards, framework]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/decision-explanation-envelope.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md
  - .memory-bank/spec/scenarios/scenario-system-and-evidence.md
  - .memory-bank/plans/epics/framework-feature-registry.md
history:
  - version: 1.3.0
    date: 2026-04-22
    changes: Migrated into bot-platform as framework-owned evaluation-plane truth and generalized judge/runtime framing away from product-specific naming.
  - version: 1.2.0
    date: 2026-04-05
    changes: Linked evaluation to backend-kind-aware policy and normalized execution lineage so replay and judge diagnostics stay consistent.
  - version: 1.1.0
    date: 2026-04-05
    changes: Clarified continuity contract around canonical transcript snapshots and persisted decision-lineage fields consumed by replay/judge tooling.
  - version: 1.0.0
    date: 2026-04-04
    changes: Initial evaluation-plane target spec created.
---

# Evaluation Plane And Judge Runtime

## Goal

Define evaluation as a distinct framework plane that reuses the same execution-kernel truth to improve:
- prompts;
- configuration candidates;
- model-policy strategies;
- workflow behavior quality.

## Evaluation domain objects

- `EvalCase`
- `EvalSuite`
- `ReplayRun`
- `JudgeRun`
- `CompareRun`
- `Scorecard`
- `CandidateConfig`
- `TranscriptSnapshot`

## Architectural rule

Evaluation does not own a second answer-generation architecture.

It reuses the shared execution kernel in replay mode and layers:
- candidate overrides;
- comparison logic;
- judge backend execution;
- score aggregation.

## Judge backend model

Judge backends are pluggable evaluation backends, not live-runtime capability definitions.

Examples:
- local Codex CLI judge worker;
- API-backed LLM judge;
- heuristic/rule judge;
- human-review queue.

Rule:
- backend kind differences must remain explicit;
- judge execution is evaluation-plane behavior, not a hidden live-runtime side path.

## Control-plane relationship

Framework management surfaces should treat evaluation as first-class control-plane area:
- inspect evaluation runs;
- compare candidates;
- read scorecards;
- review evidence and lineage.

Product overlays may add domain-specific workflows, but the framework evaluation object model remains canonical.

## Invariants

- transcript lineage and evaluation history stay explicit;
- replay and compare stay compatible with canonical transcript truth;
- evaluation outputs preserve provenance to config versions and execution traces;
- evaluation attempts remain explainable through run/step/attempt lineage vocabulary.

## Continuity contract during refactors

Compatibility is anchored to:
- persisted transcript and conversation truth;
- persisted decision-lineage fields already consumed by replay/judge tooling;
- evaluation run history and case/suite provenance.

Refactors may change internal module boundaries, but must preserve canonical field meaning for replay and diagnostics.

Continuity expectations include:
- run identity and source references (`traceId`, `conversationId`, `sourceMessageId` where used);
- execution mode/status profile (`mode`, `status`, `generationMode`);
- provider/model and prompt provenance (`provider`, `modelId`, `promptId`, `promptVersion`, `promptHash`);
- outcome and fallback diagnostics (`validationIssues`, `fallbackApplied`, `fallbackKind`, `fallbackStage`, `fallbackSummary`);
- timing/usage summary (`latencyMs`, usage payload);
- decision summary fields (`selectedStrategyId`, `executionProfile`, `reviewOutput`, `actionOutcomes`).

## Ownership boundary

`bot-platform` owns:
- evaluation-plane object vocabulary and lifecycle semantics;
- judge-backend abstraction rules;
- continuity requirements across replay/compare/judge refactors.

`bot-platform` does not own:
- product-specific score interpretation policies;
- product-specific operator playbooks for adjudication.

## Non-goals

- forcing one judge implementation for every product;
- freezing internal service/module structure byte-for-byte;
- mixing live product operator procedures into framework evaluation contracts.

## Migration / implementation plan

1. Stabilize evaluation object vocabulary and typed contracts.
2. Route replay through shared execution-kernel lineage where applicable.
3. Keep judge backend kind explicit and auditable in diagnostics.
4. Preserve replay/judge continuity fields while internals evolve.
5. Expose scorecard and compare readbacks through first-party control-plane surfaces.

## Regression gates

- Replay parity: canonical transcript snapshots replay through the framework kernel path.
- Judge explainability: every judge verdict is traceable to run lineage and candidate config.
- Continuity: refactors retain field meaning consumed by replay/judge/explorer tooling.
- Control-plane diagnostics: operators can inspect run, candidate, and score provenance without DB-only spelunking.
