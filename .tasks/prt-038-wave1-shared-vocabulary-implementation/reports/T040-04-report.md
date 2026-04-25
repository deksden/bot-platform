# T040-04 Report: Governed-Content API Read Models

## Summary of work

Implemented the first governed-content API-contract read-model slice entirely inside `packages/api-contract/src/governed-content/**`.

Delivered:
- package-local shared schemas/types for governed-content readback primitives;
- zod vocabulary schemas aligned with the accepted governed-content core statuses and first-wave surface ids;
- schemas and inferred types for `ConnectedSource`, `SourceRevision`, `ImportRun`, `ProcessingArtifact`, and derived `ImportReport`;
- envelope/readback schemas for `gc-sources`, `gc-source-detail`, `gc-imports`, `gc-import-detail`, and `gc-artifacts`;
- a package-local governed-content barrel for later root export integration.

No product-local review UX, activation command DTOs, transport clients, package-root export wiring, or `packages/core/**` changes were added.

## Mandatory grounding completed before coding

Read fully:
- task file `T040-04-governed-content-api-read-models.md`;
- `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`;
- `.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`;
- `.memory-bank/spec/client-api/typed-client-api-and-sdk.md`;
- `.memory-bank/spec/runtime/workflow-framework-contract.md`;
- `.memory-bank/spec/engineering/delivery-standards.md`;
- `.memory-bank/spec/engineering/coding-style.md`;
- `.memory-bank/spec/operations/git-flow.md`.

Inspected accepted neighboring results:
- `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-02-report.md`;
- `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-03-report.md`.

Inspected required code anchors:
- `packages/api-contract/src/control-plane/shared.ts`;
- `packages/api-contract/src/control-plane/models.ts`;
- `packages/api-contract/src/control-plane/read-models.ts`;
- `packages/core/src/governed-content/vocabulary/statuses.ts`;
- `packages/core/src/governed-content/vocabulary/objects.ts`;
- `packages/core/src/governed-content/vocabulary/errors.ts`;
- `packages/core/src/governed-content/source-processing/contracts.ts`;
- `packages/core/src/governed-content/source-processing/classification.ts`;
- `packages/core/src/governed-content/import-lifecycle/status-transitions.ts`;
- `packages/core/src/governed-content/import-lifecycle/conflict-guards.ts`.

Confirmed implementation edits stayed inside:
- `packages/api-contract/src/governed-content/**`.

## Files changed

Created:
- `packages/api-contract/src/governed-content/shared.ts`
- `packages/api-contract/src/governed-content/vocabulary.ts`
- `packages/api-contract/src/governed-content/models.ts`
- `packages/api-contract/src/governed-content/read-models.ts`
- `packages/api-contract/src/governed-content/index.ts`

Created required execution artifact:
- `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-04-report.md`

## Commands run

Grounding and inspection:
- `pwd && rg --files .tasks/prt-038-wave1-shared-vocabulary-implementation && rg -n "^#|^##|write scope|anchors|Allowed|Checks|Lessons|MBB|governed-content|api-contract|core" .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-04-governed-content-api-read-models.md`
- `git status --short`
- `sed -n '1,260p' .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-04-governed-content-api-read-models.md`
- `sed -n '1,220p' .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-02-report.md`
- `sed -n '1,220p' .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-03-report.md`
- `sed -n '1,260p' .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `sed -n '1,220p' packages/api-contract/src/control-plane/shared.ts`
- `sed -n '1,260p' packages/api-contract/src/control-plane/models.ts`
- `sed -n '1,420p' packages/api-contract/src/control-plane/read-models.ts`
- `sed -n '1,260p' packages/core/src/governed-content/vocabulary/statuses.ts`
- `sed -n '1,320p' packages/core/src/governed-content/vocabulary/objects.ts`
- `sed -n '1,320p' packages/core/src/governed-content/vocabulary/errors.ts`
- `sed -n '1,320p' packages/core/src/governed-content/source-processing/contracts.ts`
- `sed -n '1,320p' packages/core/src/governed-content/source-processing/classification.ts`
- `sed -n '1,360p' packages/core/src/governed-content/import-lifecycle/status-transitions.ts`
- `sed -n '1,360p' packages/core/src/governed-content/import-lifecycle/conflict-guards.ts`
- `sed -n '1,260p' packages/core/src/governed-content/import-lifecycle/idempotency-keys.ts`
- `rg -n "ImportReport|gc-sources|gc-source-detail|gc-imports|gc-import-detail|gc-artifacts|surface|read model|next-action|next action|artifact" .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `sed -n '1,260p' .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `sed -n '1,240p' .memory-bank/spec/client-api/typed-client-api-and-sdk.md`
- `sed -n '1,240p' .memory-bank/spec/runtime/workflow-framework-contract.md`
- `sed -n '1,220p' .memory-bank/spec/engineering/delivery-standards.md`
- `sed -n '1,220p' .memory-bank/spec/engineering/coding-style.md && sed -n '1,220p' .memory-bank/spec/operations/git-flow.md`
- `rg --files packages/api-contract/src`
- `find packages/api-contract/src -maxdepth 3 -type d | sort`
- `cat packages/api-contract/package.json`
- `sed -n '1,260p' packages/api-contract/src/control-plane/vocabulary.ts`
- `sed -n '1,200p' packages/api-contract/src/control-plane/index.ts`
- `sed -n '1,200p' packages/api-contract/src/index.ts`
- `sed -n '1,220p' packages/api-contract/src/runtime.ts`
- `sed -n '1,240p' .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-05-governed-content-export-integration.md`
- `rg -n "governed-content" packages/api-contract packages/core -g '!dist'`
- `sed -n '300,460p' .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `cat packages/api-contract/tsconfig.json`
- `cat tsconfig.base.json`
- `sed -n '1,200p' packages/core/src/governed-content/index.ts`
- `find packages/core/src/governed-content -maxdepth 2 -type f | sort`
- `sed -n '1,200p' packages/core/src/governed-content/vocabulary/index.ts`
- `rg -n "ConnectedSource|ImportReport|gc-source-detail|ProcessingArtifact" -g '!dist'`
- `sed -n '1,220p' .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-03-report.md`
- `find packages/api-contract/src/governed-content -type f | sort`
- `rg -n "console\\.|product|approval|activation command|review flow|screen|route" packages/api-contract/src/governed-content`
- `git status --short -- packages/api-contract/src/governed-content .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-04-report.md`

Required verification:
- `pnpm --filter @dd-bot-platform/api-contract typecheck`
- `pnpm --filter @dd-bot-platform/api-contract build`

## Check results

- `pnpm --filter @dd-bot-platform/api-contract typecheck` -> **PASS**
- `pnpm --filter @dd-bot-platform/api-contract build` -> **PASS**

Additional local scope scan:
- `rg -n "console\\.|product|approval|activation command|review flow|screen|route" packages/api-contract/src/governed-content` -> **PASS** (no matches)

## Not run / N/A

- `pnpm check` -> **N/A** (optional broader check; required package-local checks passed).
- Scenario checks -> **N/A** (schema/type contract-only slice; no runnable scenario anchor required by task).
- Hosted/beta/prod checks -> **N/A** (local-only API-contract schema task; no hosted surface deployed).
- Security-specific checks -> **N/A** (no auth, storage, RLS, migration, or runtime exposure changes).
- CI/GitHub checks -> **N/A** (remote actions are forbidden by this task).

## Remote actions status

None performed.

- `git push`: **not performed** (forbidden).
- PR creation/update: **not performed** (forbidden).
- Hosted deploy/release actions: **not performed** (forbidden).

## Lessons learned / insights

none

## Proposed MBB routing for accepted findings

none

## Blockers / scope gaps

No blockers within the declared write scope.

Root export integration is intentionally deferred to the follow-up export-integration task.
