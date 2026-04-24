---
file: .tasks/prt-038-wave2-control-plane-diagnostics-proof/tasks/T041-V2-control-plane-diagnostics-readback-verifier.md
description: 'Bounded verifier task for the second shared control-plane proof slice: execution-run and trace-artifact readback.'
purpose: 'Read before editing so the next platform-owned verifier slice proves bounded control-plane diagnostics and trace readback honestly, without mixing in product dashboards, hosted proof, or consumer-side adoption claims.'
version: 0.2.0
date: 2026-04-24
status: COMPLETED
parent: .tasks/prt-038-wave2-control-plane-diagnostics-proof/index.md
task_type: verifier
protocol: PRT-038 / PRT-039
report_file: .tasks/prt-038-wave2-control-plane-diagnostics-proof/reports/T041-V2-report.md
verification_class: runnable local framework verifier slice
git_flow_path: 'Temporary local wave path: feature/EP-022-prt-038-wave1.'
remote_triggers: 'Forbidden for this task: no push, PR updates, hosted deploys, or release actions.'
lessons_dir: .tasks/prt-038-wave2-control-plane-diagnostics-proof/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md
  - .memory-bank/spec/operations/observability-and-incident-diagnostics.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
  - packages/api-contract/src/control-plane/read-models.ts
  - packages/api-contract/src/control-plane/models.ts
write_scope:
  - packages/api-contract/src/control-plane/read-models.spec.ts
  - .tasks/prt-038-wave2-control-plane-diagnostics-proof/index.md
  - .tasks/prt-038-wave2-control-plane-diagnostics-proof/tasks/T041-V2-control-plane-diagnostics-readback-verifier.md
  - .tasks/prt-038-wave2-control-plane-diagnostics-proof/reports/T041-V2-report.md
  - .tasks/prt-038-wave2-control-plane-diagnostics-proof/lessons/**
no_touch:
  - packages/core/**
  - .memory-bank/**
  - packages/api-contract/src/governed-content/**
---

# Task T041-V2: Control-Plane Diagnostics Readback Verifier

## Purpose

Add one honest, runnable-local verifier slice for shared control-plane diagnostics/readback.

This slice should prove only framework-owned bounded execution-run and trace-artifact readback semantics:
- representative execution-run read models parse successfully;
- representative trace-artifact read models parse successfully;
- list-surface readbacks for `cp-runs` and `cp-trace-artifacts` parse successfully;
- bounded invalid shapes fail explicitly.

## Scope / non-goals

### In scope

- extend `packages/api-contract/src/control-plane/read-models.spec.ts` with focused coverage for:
  - `controlPlaneExecutionRunReadModelSchema`
  - `controlPlaneTraceArtifactReadModelSchema`
  - `controlPlaneSurfaceListReadbackSchema` for `cp-runs` and `cp-trace-artifacts`
- keep fixtures representative of the shared framework contract, not product overlays;
- run the narrow package build and the compiled `node:test` proof path;
- record a report in the required path.

### Non-goals

- do not add hosted proof;
- do not add product dashboard semantics or product-owned drilldown behavior;
- do not change public production code unless a spec fix is genuinely required for the existing contract;
- do not edit Memory Bank surfaces in this task; docs sync is a later serialized step.

## Context (SSoT links and exact inspection anchors)

Read fully before editing:
- this task file
- `PRT-039`
- `control-plane-configuration-and-observability-surfaces.md`
- `observability-and-incident-diagnostics.md`
- `execution-traces-and-token-accounting.md`
- `trace-artifact-governance.md`
- `packages/api-contract/src/control-plane/models.ts`
- `packages/api-contract/src/control-plane/read-models.ts`
- the existing `packages/api-contract/src/control-plane/read-models.spec.ts`

## Design guidance

- stay bounded to schema/readback proof;
- keep payloads framework-owned and generic;
- prefer explicit bounded invalid cases over broad synthetic fixture packs;
- do not imply that this verifier proves product adoption or hosted readiness.

## Deliverables

- updated verifier spec in:
  - `/Users/deksden/Documents/_Projects/bot-platform/packages/api-contract/src/control-plane/read-models.spec.ts`
- report in:
  - `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave2-control-plane-diagnostics-proof/reports/T041-V2-report.md`

## Verification plan

Run:
- `pnpm --filter @dd-bot-platform/api-contract build`
- `node --test packages/api-contract/dist/control-plane/**/*.spec.js`
- `pnpm check`

Record explicit `N/A` for hosted, CI, package-release, and product-adoption proof.

## Lessons learned / insights handling

If a reusable non-obvious finding appears:
- write the next numbered `lessons/*-lessons-learned.md` or `lessons/*-insights.md`
- name the owning Memory Bank destination

Otherwise state `none` in the report.

## Definition of done

This task is complete only if:
- execution-run and trace-artifact readback have real runnable-local schema proof;
- the package-local build and compiled `node:test` path pass;
- `pnpm check` passes;
- the report is complete and saved to the required path.

## Closeout note

Completed on `2026-04-24` with the required local proof, report, and later serialized Memory Bank sync through `SCN-178`.
