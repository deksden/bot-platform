# T039-01 Report: Control-Plane Vocabulary

## Summary of implementation

Implemented the first shared control-plane vocabulary slice entirely under `packages/core/src/control-plane/**`.

Delivered:
- canonical shared object types for `User`, `Principal`, `Session`, `Membership`, `Workspace`, `ProductInstance`, `Channel`, `PipelineBinding`, `ExecutionRun`, and `TraceArtifact`;
- first-wave status/type vocabulary required by `PRT-039`, including:
  - `PipelineBindingStatus`: `unbound | bound | degraded | disabled | invalid`;
  - capability-family vocabulary for all `PRT-039` control-plane capability families;
  - shared channel kinds with extensibility and first-wave known kinds (`telegram`, `email`, `bitrix24_bot`);
  - trace-artifact redaction state vocabulary (`none | partial | full | blocked`);
- narrow typed validation/conflict primitives for future mutation helpers:
  - typed envelopes (`ok` success/failure shape),
  - typed validation/conflict error payloads,
  - helper constructors and type-guard,
  - typed runtime error wrapper class.

Implementation stayed lean and type-first, with no storage decisions, no API-contract DTO wiring, no runtime subtree edits, and no root-barrel integration.

## Mandatory grounding completed before coding

Read fully:
- task file `T039-01-control-plane-vocabulary.md`;
- `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`;
- `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`;
- `.memory-bank/spec/engineering/delivery-standards.md`;
- `.memory-bank/spec/engineering/coding-style.md`;
- `.memory-bank/spec/operations/git-flow.md`.

Inspected required code anchors:
- `packages/core/src/runtime/kernel.ts`;
- `packages/core/src/runtime/pipeline-registry.ts`;
- `packages/core/src/runtime/index.ts`;
- `packages/core/src/index.ts`.

Additional grounding used to reduce ambiguity on statuses/invariants:
- `.memory-bank/spec/security/auth-and-access.md`;
- `.memory-bank/spec/runtime/persistence-interface-and-store-boundary.md`;
- `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`;
- `.memory-bank/spec/runtime/trace-artifact-governance.md`.

## Files changed

Created:
- `packages/core/src/control-plane/refs.ts`
- `packages/core/src/control-plane/capabilities.ts`
- `packages/core/src/control-plane/models.ts`
- `packages/core/src/control-plane/mutation-envelopes.ts`
- `packages/core/src/control-plane/index.ts`

Also created execution artifacts required by task:
- `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-01-report.md`
- `.tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/002-insights.md`

## Commands run

Grounding and inspection:
- `sed -n '1,240p' .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T039-01-control-plane-vocabulary.md`
- `sed -n ... PRT-038 ...`
- `sed -n ... PRT-039 ...`
- `sed -n ... delivery-standards.md ...`
- `sed -n ... coding-style.md ...`
- `sed -n ... git-flow.md ...`
- `sed -n ... packages/core/src/runtime/kernel.ts ...`
- `sed -n ... packages/core/src/runtime/pipeline-registry.ts ...`
- `cat packages/core/src/runtime/index.ts`
- `cat packages/core/src/index.ts`

Required verification:
- `pnpm --filter @dd-bot-platform/core typecheck`
- `pnpm --filter @dd-bot-platform/core build`

## Check results

- `pnpm --filter @dd-bot-platform/core typecheck` -> **PASS**
- `pnpm --filter @dd-bot-platform/core build` -> **PASS**

Not run / N/A:
- `pnpm check` -> **N/A (optional broader check)**, skipped to keep this bounded task focused on package-local proof required by task.
- scenario/hosted/security/CI checks -> **N/A** for this slice (type-only vocabulary implementation, local-only execution, and those checks were not required by this task file).

## Remote actions status

- `git push`: **not performed (forbidden by task)**
- PR creation/update: **not performed (forbidden by task)**
- deploy/release/CI-closure actions: **not performed (forbidden by task)**

## Lessons learned / insights

Created:
- `.tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/002-insights.md`

Captured finding:
- keep shared vocabulary naming aligned with the existing runtime seam (`pipelineId`, `channelKind`) to avoid adapter drift and inconsistent mutation payloads in follow-up channel-binding work.

## Proposed MBB routing for accepted finding

- `spec` -> `.memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md`
- `spec` -> `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`

## Blockers / follow-up notes

No blockers in this bounded scope.

Out-of-scope follow-up intentionally deferred:
- root export/package integration (`packages/core/src/index.ts`) should be handled by the dedicated later task (`T039-04-control-plane-export-integration`), not in this task.
