---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/002-insights.md
description: 'Reusable naming insight from T039-01 control-plane vocabulary implementation.'
purpose: 'Prevent drift between shared control-plane vocabulary and the existing pipeline-registry seam.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
tags: [insight, control-plane, pipeline-binding, naming]
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
---

# Insight 002

## Reusable truth

When defining shared control-plane vocabulary around channel binding, keep `pipelineId` and `channelKind` as canonical names in core contracts to match `packages/core/src/runtime/pipeline-registry.ts`.

Using alternate names such as `pipelineRef` at the shared contract layer creates avoidable adapter code and increases the risk of mismatched validation/conflict payloads in later channel-binding helpers.

## Why it matters

The first wave depends on reusing the existing `pipeline-registry` seam rather than creating a parallel abstraction. Consistent naming keeps `T039-02`/`T039-03` implementation narrower and lowers cross-surface drift risk.

## Proposed owning SSoT

- `spec`: `.memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md`
- `spec`: `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`
