# T03 Report: Verification, Testing, And Staged Rollout Plan

## Context and reading stance

This report treats `.memory-bank/plans/verification-matrix.md` as the current verification inventory and explicitly keeps the new shared-substrate rows honest:
- `shared-control-plane-substrate` is `design_hardened`, not implementation-closed;
- `shared-governed-content-and-import-substrate` is `design_hardened`, not implementation-closed.

Therefore, stronger closure than `partial` must come from real implementation evidence, runnable verification anchors where required, and linked consumer/product proof where adoption is claimed.

## Local verification baseline

Every implementation task under `PRT-038/039/040` should leave a local proof bundle before it can ask for verifier review.

Minimum baseline for every code task:
- run the current repo baseline command set, today at minimum `pnpm check`;
- run slice-specific code-quality checks for the touched area if they are narrower or stricter than the broad baseline;
- run at least one named verification path for the changed behavior, or record explicit `N/A` with reason;
- confirm observability/error-policy expectations for runtime-facing changes;
- record exactly what was run and whether the result was `green`, `failed`, or `N/A`.

What counts as a named local verification path:
- an existing unit/integration test suite covering the touched slice;
- a repo-local verification contract named in the verification matrix;
- a scenario anchor only when a runnable scenario already exists and is appropriate for the behavior being changed.

What local verification must additionally prove for risky change families:
- shared control-plane mutations: canonical validation path, stale-write protection, typed validation/conflict failures, and diagnostics for degraded or fallback states;
- shared import/governed-content flows: bundle honesty (`supported/degraded/unsupported`), idempotent retry behavior, typed activation conflicts, and rollback-friendly lineage;
- runtime/channel-facing changes: observability baseline with correlation identifiers, structured events, and bounded diagnostics behavior.

Local verification is necessary but never sufficient by itself for `implementation_proven` when the wave changes acceptance-critical behavior, protected surfaces, hosted runtime paths, or product adoption state.

## CI and workflow expectations

Every implementation task should define its CI expectation in the task closeout, not treat CI as an implicit follow-up.

Required CI/workflow expectation:
- the canonical `Verification` workflow, or its current successor, must be green for the pushed wave commit or merge commit;
- the closeout must capture commit SHA, workflow/run ids, and final status;
- if a signal is not applicable, the report must say `N/A` and why;
- if the wave changes installed dependencies or extracted package surfaces, verification must run against the actually installed/relinked surface, not only a lockfile diff.

CI is mandatory for every code wave, but CI does not replace:
- scenario maturity decisions;
- hosted beta proof for hosted-facing changes;
- security closure evidence for auth/exposure/data-surface changes;
- product-local adoption proof when claiming `adopted`.

## Scenario maturity recommendations

The current project should use scenarios selectively and honestly.

Rules:
- do not create scenario language where a normal local test or verification command is enough;
- do not treat a planned anchor as closure-ready evidence;
- do not mark a wave `implementation_proven` or `adopted` only because a protocol names a future scenario.

Scenario maturity recommendation by task family:

| Task family | Scenario expectation now | What is enough for stronger closure |
| --- | --- | --- |
| Pure contract/doc/code refactor with no behavioral change | usually no new scenario | local baseline + CI + honest `N/A` for scenario/hosted if truly unaffected |
| Behavior change covered by existing runnable repo-local anchor | reuse existing runnable anchor | local baseline + named anchor verdict + CI |
| Shared control-plane semantics (`memberships`, `sessions`, `channels`, diagnostics readback) | new runnable anchor needed before stronger-than-`partial` closure if no current runnable anchor exists | shared proof plus consumer/product-side verification path |
| Shared import/governed-content lifecycle, idempotency, rollback, honesty | new runnable anchor needed before stronger-than-`partial` closure if no current runnable anchor exists | local/shared proof plus at least one consumer-side retry/readback proof |
| Product-governed UI/screen adoption | scenario may remain product-local rather than platform-owned | product-local UI-doc/automation contract plus product proof |

Current gap callout from the verification matrix:
- `shared-control-plane-substrate` has no dedicated landed framework scenario family yet, so protocol hardening alone should not be upgraded to implementation closure;
- `shared-governed-content-and-import-substrate` also has no dedicated landed framework scenario family yet, so platform-only local proof is not enough for stronger closure.

Practical recommendation:
- use repo-local verification commands and existing anchors for implementation waves now;
- create new full scenario contracts only for acceptance-critical shared capabilities that currently have only planned or hub-level anchors;
- keep hosted overlays explicit overlays, not substitutes for the primary local acceptance family.

## Hosted, beta, and staged verification map

Hosted proof is required only when the change touches hosted reality or protected/runtime surfaces where preview drift is possible.

| Change family | Preview | Staging/Beta | Production |
| --- | --- | --- | --- |
| Pure internal refactor or doc-only wave | optional smoke only | usually `N/A` | no special rollout proof beyond normal promotion path |
| Hosted operator/admin UI | useful smoke, not acceptance | mandatory hosted preflight + `beta_api` or read-model proof + thin `beta_ui` proof | minimal post-promotion verification only |
| Protected auth/session surfaces | insufficient as acceptance | mandatory staged verification evidence before promotion | governed rollout with stop conditions and rollback inputs |
| Membership/session/channel authorization semantics | insufficient as acceptance | mandatory hosted or explicit `N/A` verdict if truly not exposed yet | production promotion only after compatibility and security readiness proof |
| Webhook/provider/external integration behavior | useful smoke | mandatory beta proof; `beta_external_manual` only when deterministic API proof is impossible | minimal safe verification after promotion |
| Runtime-facing ingest/import surfaces | useful smoke/integration sanity | mandatory if touching hosted ingress, protected source/import UI, or live workflow wiring | production checks stay narrow and non-destructive |

Hosted verification must follow the same framework contract:
- preflight target surfaces;
- verify deployment pair/group integrity;
- prove environment identity;
- prove auth/session bootstrap;
- confirm external readiness where needed.

Hosted evidence should prefer:
1. `beta_api` or protected read-model proof for business truth.
2. `beta_ui` as a confirmatory layer for user-facing/operator-facing flows.
3. `beta_external_manual` only for truly external nondeterministic systems.

Hard rules:
- preview is not beta unless a documented exception proves environment identity and missing-beta constraints;
- browser proof must not be the only evidence layer when protected API/read-model proof is technically possible;
- a task should not demand hosted proof if the touched change is not actually hosted-facing, runtime-facing, or protected-surface-facing.

## Security and rollout-sensitive change map

The following changes require explicit security and staged-rollout notes in the task and closeout:
- persisted session changes;
- membership model or membership mutation changes;
- channel authorization or protected-shell exposure changes;
- auth/login/bootstrap/session bootstrap changes;
- RLS, grants, exposure, retention, or redaction changes;
- governed artifact visibility changes;
- activation/cutover or rollback-path changes for governed content;
- schema/storage migrations where compatibility or rollback safety matters.

For those changes, the implementation task must document:
- exposure/RLS/grants/access or retention decision;
- additive compatibility path;
- rollback inputs and containment plan;
- hosted verification expectation or explicit `N/A`;
- any required backup or governed safety artifact before promotion.

Rollout staging guidance:
- `preview`: smoke and integration sanity only;
- `beta/staging`: primary acceptance lane for hosted/protected/runtime verification;
- `production`: promote only after beta acceptance is green, compatibility proof exists, required security/readiness checks are green, and rollback inputs are prepared.

Production deploy checks should follow the runbook sequence:
1. confirm authenticated operator context;
2. run rollout preflight for target surfaces and dependencies;
3. run change-class security/readiness verification;
4. confirm compatibility for affected write/read paths;
5. capture or confirm backup/safety artifacts for risky waves;
6. promote;
7. inspect rollout record;
8. run minimal post-promotion verification;
9. archive evidence bundle.

Stop conditions:
- invalid operator/auth context;
- unreachable target surfaces;
- missing compatibility proof;
- failed security/readiness verification;
- failed post-promotion verification.

## What every implementation task should leave for verifier review

Verifier review should validate closure discipline, not repeat blind implementation work.

Each completed task should hand the verifier:
- task identifier and short statement of intended behavior change;
- touched code/doc surfaces;
- local commands executed and results;
- named verification row, scenario anchor, or explicit `N/A` justification;
- CI workflow ids/status tied to a specific commit;
- hosted evidence expectation and current status (`green` or `N/A`);
- security/exposure/retention decision when applicable;
- rollback/compatibility notes when applicable;
- product-local adoption links when claiming `adopted`;
- documentation sync confirmation for verification/scenario/status/product-local surfaces.

## Verifier-subagent checklist

The verifier subagent should check the following in order:

1. Contract alignment
- The task result matches the owning `PRT-*` scope and does not claim a stronger closure state than the evidence supports.

2. Local proof
- The current repo baseline was run, today at minimum `pnpm check`.
- Slice-specific verification exists for the changed behavior, or the `N/A` reason is credible.

3. CI proof
- Canonical CI gate is green for the referenced commit.
- Run ids and statuses are present and traceable.

4. Scenario honesty
- Existing runnable anchors were used when relevant.
- Planned anchors were not presented as runnable closure evidence.
- Shared-substrate rows remain honest if dedicated scenarios are still missing.

5. Hosted proof
- Hosted proof exists for hosted/protected/runtime-facing changes.
- Preflight covered deployment identity, compatibility, auth bootstrap, and dependency readiness.
- Preview was not silently treated as beta.

6. Security and rollout safety
- Auth/access/exposure changes include explicit decision records.
- Compatibility path is additive and rollback inputs are named.
- Risky deploy changes include staged rollout notes and stop conditions.

7. Product adoption boundary
- Platform proof is not misrepresented as product adoption proof.
- Claims of `adopted` or stronger link to product-local protocol/evidence.
- Governed UI changes are mirrored into product-local UI-doc/automation surfaces.

8. Documentation sync
- Relevant protocol/status/verification/scenario surfaces were updated together when required.

## Verifier report contract

The verifier report should be short and explicit. Recommended fields:
- `task`
- `scope_checked`
- `local_verification`
- `ci_verification`
- `scenario_status`
- `hosted_status`
- `security_rollout_status`
- `doc_sync_status`
- `closure_recommendation`
- `blockers_or_followups`

Allowed closure recommendations:
- `pass`
- `pass_with_followups`
- `partial_only`
- `blocked`

`partial_only` should be used when:
- the implementation is real, but runnable scenario or hosted/product proof is still missing;
- the task tries to close on planned anchors only;
- the shared-platform wave is implemented but consumer/product adoption proof is not yet linked.

## Explicit do / avoid guidance

Do:
- require a real local baseline for every code task;
- name the verification row, scenario anchor, or `N/A` rationale explicitly;
- treat hosted beta as mandatory only for hosted/protected/runtime-facing changes;
- prefer deterministic API/read-model evidence over browser-only assertions;
- require product-local proof before calling a shared wave `adopted`;
- record security, exposure, compatibility, and rollback notes for risky changes.

Avoid:
- closing implementation tasks with only local proof when the change affects hosted reality, protected surfaces, or product adoption;
- treating `design_hardened` protocol rows as implementation proof;
- pretending a planned scenario anchor is a runnable acceptance contract;
- collapsing unit/integration verification into scenario language;
- treating preview as beta by default;
- requiring the same heavy hosted/scenario contour for every low-risk task;
- collapsing platform-local proof into product-repo adoption proof.

## Recommended protocol insertions for implementation work

For the current `PRT-038/039/040` implementation packet, the lean default should be:
- every code task: local baseline + named verification path + CI proof;
- behavior-changing shared-substrate task: local baseline + CI + honest scenario/verification anchor status;
- hosted/protected/runtime-facing task: add staged beta proof;
- auth/exposure/migration/rollback-sensitive task: add explicit security and rollout notes;
- any task claiming `implementation_proven` or `adopted`: verifier must reject closure if the required hosted, scenario, or product-local proof is absent.
