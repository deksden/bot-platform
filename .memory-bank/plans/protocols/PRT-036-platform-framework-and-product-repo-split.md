---
file: .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
description: Cross-epic architecture and migration protocol for splitting the current mixed repository into a framework-only `bot-platform` monorepo plus separate `selleragent` and `docoved-agent` product monorepos with independent deployment and Memory Bank ownership.
purpose: Reference when executing the repository split so framework code, product code, deployment boundaries, Memory Bank truth, and historical tails move in a controlled sequence instead of drifting through ad hoc folder moves.
version: 1.75.0
date: 2026-04-21
status: ACTIVE
epic: EP-022
tags: [protocol, architecture, repo-split, bot-platform, selleragent, docoved, monorepo, migration, ci-cd]
parent: .memory-bank/plans/protocols/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-030-architecture-boundary-simplification-and-ownership-convergence.md
  - .memory-bank/spec/project/agent-execution-platform-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/spec/security/auth-and-access.md
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/git-flow.md
  - .memory-bank/spec/operations/runbook.md
  - .memory-bank/spec/operations/production-rollout-runbook.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/plans/adr/ADR-001-private-registry-bridge-for-product-repos.md
  - .memory-bank/plans/adr/ADR-002-public-npm-bridge-for-framework-packages.md
  - .tasks/prt-036-protocol-review-2026-04-19/summary/PRT-036-review-synthesis.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-00-execution-pack-index.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-01-ownership-matrix.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-02-dependency-bridge-decision.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-03-repo-skeleton-pack.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-04-memory-bank-split-map.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-05-ops-split-plan.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-06-archive-and-history-policy.md
  - .tasks/prt-036-memory-bank-redesign-2026-04-19/summary/PRT-036-memory-bank-redesign-synthesis.md
  - .tasks/prt-036-boundary-contract-review-2026-04-19/summary/PRT-036-boundary-contract-review-synthesis.md
  - .tasks/prt-036-phase-1-protocol-review-2026-04-19/summary/PRT-036-phase-1-review-synthesis.md
  - .tasks/prt-036-phase-2-implementation-planning-2026-04-19/summary/PRT-036-phase-2-implementation-synthesis.md
  - .tasks/prt-036-phase-3-ops-runbook-refinement-2026-04-20/summary/PRT-036-phase-3-ops-synthesis.md
  - .tasks/prt-036-implementation-wave-01-2026-04-20/summary/PRT-036-implementation-wave-01-synthesis.md
  - .tasks/prt-036-implementation-wave-17-2026-04-20/summary/PRT-036-implementation-wave-17-synthesis.md
  - .tasks/prt-036-implementation-wave-18-2026-04-20/summary/PRT-036-implementation-wave-18-synthesis.md
  - .tasks/prt-036-implementation-wave-19-2026-04-20/summary/PRT-036-implementation-wave-19-synthesis.md
  - .tasks/prt-036-implementation-wave-21-2026-04-20/summary/PRT-036-implementation-wave-21-synthesis.md
  - .tasks/prt-036-implementation-wave-22-2026-04-20/summary/PRT-036-implementation-wave-22-synthesis.md
  - .tasks/prt-036-implementation-wave-23-2026-04-20/summary/PRT-036-implementation-wave-23-synthesis.md
  - .tasks/prt-036-implementation-wave-24-2026-04-20/summary/PRT-036-implementation-wave-24-synthesis.md
  - .tasks/prt-036-implementation-wave-25-2026-04-20/summary/PRT-036-implementation-wave-25-synthesis.md
  - .tasks/prt-036-implementation-wave-26-2026-04-20/summary/PRT-036-implementation-wave-26-synthesis.md
  - .tasks/prt-036-implementation-wave-27-2026-04-20/summary/PRT-036-implementation-wave-27-synthesis.md
  - .tasks/prt-036-implementation-wave-28-2026-04-20/summary/PRT-036-implementation-wave-28-synthesis.md
  - .tasks/prt-036-implementation-wave-29-2026-04-20/summary/PRT-036-implementation-wave-29-synthesis.md
  - .tasks/prt-036-implementation-wave-30-2026-04-20/summary/PRT-036-implementation-wave-30-synthesis.md
  - .tasks/prt-036-implementation-wave-31-2026-04-20/summary/PRT-036-implementation-wave-31-synthesis.md
  - .tasks/prt-036-implementation-wave-32-2026-04-20/summary/PRT-036-implementation-wave-32-synthesis.md
  - .tasks/prt-036-implementation-wave-33-2026-04-20/summary/PRT-036-implementation-wave-33-synthesis.md
  - .tasks/prt-036-implementation-wave-34-2026-04-20/summary/PRT-036-implementation-wave-34-synthesis.md
  - .tasks/prt-036-implementation-wave-35-2026-04-20/summary/PRT-036-implementation-wave-35-synthesis.md
  - .tasks/prt-036-implementation-wave-36-2026-04-20/summary/PRT-036-implementation-wave-36-synthesis.md
  - .tasks/prt-036-implementation-wave-37-2026-04-20/summary/PRT-036-implementation-wave-37-synthesis.md
  - .tasks/prt-036-implementation-wave-38-2026-04-20/summary/PRT-036-implementation-wave-38-synthesis.md
  - .tasks/prt-036-implementation-wave-39-2026-04-20/summary/PRT-036-implementation-wave-39-synthesis.md
  - .tasks/prt-036-implementation-wave-40-2026-04-20/summary/PRT-036-implementation-wave-40-synthesis.md
  - .tasks/prt-036-implementation-wave-41-2026-04-20/summary/PRT-036-implementation-wave-41-synthesis.md
  - .tasks/prt-036-implementation-wave-42-2026-04-20/summary/PRT-036-implementation-wave-42-synthesis.md
  - .tasks/prt-036-implementation-wave-43-2026-04-21/summary/PRT-036-implementation-wave-43-synthesis.md
  - .tasks/prt-036-implementation-wave-44-2026-04-21/summary/PRT-036-implementation-wave-44-synthesis.md
  - .tasks/prt-036-implementation-wave-54-2026-04-21/summary/PRT-036-implementation-wave-54-synthesis.md
  - .tasks/prt-036-implementation-wave-55-2026-04-21/summary/PRT-036-implementation-wave-55-synthesis.md
  - .tasks/prt-036-implementation-wave-56-2026-04-21/summary/PRT-036-implementation-wave-56-synthesis.md
  - .tasks/prt-036-implementation-wave-57-2026-04-21/summary/PRT-036-implementation-wave-57-synthesis.md
  - .tasks/prt-036-implementation-wave-58-2026-04-21/summary/PRT-036-implementation-wave-58-synthesis.md
  - .tasks/prt-036-implementation-wave-59-2026-04-21/summary/PRT-036-implementation-wave-59-synthesis.md
  - .tasks/prt-036-implementation-wave-60-2026-04-21/summary/PRT-036-implementation-wave-60-synthesis.md
  - .tasks/prt-036-implementation-wave-61-2026-04-21/summary/PRT-036-implementation-wave-61-synthesis.md
  - .tasks/prt-036-implementation-wave-62-2026-04-21/summary/PRT-036-implementation-wave-62-synthesis.md
  - .tasks/prt-036-implementation-wave-63-2026-04-21/summary/PRT-036-implementation-wave-63-synthesis.md
  - .tasks/prt-036-implementation-wave-64-2026-04-21/summary/PRT-036-implementation-wave-64-synthesis.md
  - .tasks/prt-036-implementation-wave-65-2026-04-21/summary/PRT-036-implementation-wave-65-synthesis.md
  - .tasks/prt-036-implementation-wave-66-2026-04-21/summary/PRT-036-implementation-wave-66-synthesis.md
  - .tasks/prt-036-implementation-wave-67-2026-04-21/summary/PRT-036-implementation-wave-67-synthesis.md
  - .tasks/prt-036-implementation-wave-69-2026-04-21/summary/PRT-036-implementation-wave-69-synthesis.md
  - .tasks/prt-036-implementation-wave-70-2026-04-21/summary/PRT-036-implementation-wave-70-synthesis.md
  - .tasks/prt-036-implementation-wave-71-2026-04-21/summary/PRT-036-implementation-wave-71-synthesis.md
  - .tasks/prt-036-implementation-wave-73-2026-04-21/summary/PRT-036-implementation-wave-73-synthesis.md
  - .tasks/prt-036-implementation-wave-74-2026-04-21/summary/PRT-036-implementation-wave-74-synthesis.md
  - .tasks/prt-036-implementation-wave-75-2026-04-21/summary/PRT-036-implementation-wave-75-synthesis.md
  - .tasks/prt-036-implementation-wave-76-2026-04-21/summary/PRT-036-implementation-wave-76-synthesis.md
  - .tasks/prt-036-implementation-wave-77-2026-04-21/summary/PRT-036-implementation-wave-77-synthesis.md
  - .tasks/prt-036-implementation-wave-79-2026-04-21/summary/PRT-036-implementation-wave-79-synthesis.md
  - .tasks/prt-036-implementation-wave-80-2026-04-21/summary/PRT-036-implementation-wave-80-synthesis.md
  - .tasks/prt-036-implementation-wave-81-2026-04-21/summary/PRT-036-implementation-wave-81-synthesis.md
  - .tasks/prt-036-implementation-wave-82-2026-04-21/summary/PRT-036-implementation-wave-82-synthesis.md
  - .tasks/prt-036-implementation-wave-83-2026-04-21/summary/PRT-036-implementation-wave-83-synthesis.md
  - .tasks/prt-036-implementation-wave-84-2026-04-21/summary/PRT-036-implementation-wave-84-synthesis.md
  - .tasks/prt-036-implementation-wave-85-2026-04-21/summary/PRT-036-implementation-wave-85-synthesis.md
  - .tasks/prt-036-implementation-wave-86-2026-04-21/summary/PRT-036-implementation-wave-86-synthesis.md
history:
  - version: 1.75.0
    date: 2026-04-21
    changes: Recorded waves 123-124: the eighth target-repo doc packet is now landed, with Docoved ADR docs (`ADR-005-ordinary-root-index-and-directory-backed-knowledge-slices` and `ADR-006-docoved-source-layer-and-semantic-projection-split`, plus ADR/plans hub linkage) migrated into `docoved-agent`, framework hosted-scenario docs (`hosted-beta-execution-model` plus scenarios/spec hub linkage) migrated into `bot-platform`, and Wave 1B remaining-next wording narrowed to still-unlanded doc families.
  - version: 1.74.0
    date: 2026-04-21
    changes: Recorded waves 120-121: the seventh target-repo doc packet is now landed, with Docoved protocol docs (`PRT-025-docoved-document-grounded-answering-and-knowledge-publication-foundation` and `PRT-027-docoved-kb-reglaments-production-knowledge-base-rollout`, plus protocol/plans hub linkage) migrated into `docoved-agent`, framework scenario-system docs (`scenario-system-and-evidence` plus scenarios/spec hub linkage) migrated into `bot-platform`, and Wave 1B remaining-next wording narrowed to still-unlanded doc families.
  - version: 1.73.0
    date: 2026-04-21
    changes: Recorded waves 117-118: the sixth target-repo doc packet is now landed, with Docoved runtime foundation docs (`document-grounded-answering-contract`, `research-then-answer-memory-bank-workflow`, and `docoved-agentic-search-and-verification-pipeline`) migrated into `docoved-agent`, framework ADR terminology docs (`ADR-004-workspace-product-instance-pipeline-and-environment-terminology` plus ADR index linkage) migrated into `bot-platform`, and Wave 1B remaining-next wording narrowed to still-unlanded doc families.
  - version: 1.72.0
    date: 2026-04-21
    changes: Recorded waves 114-115: the fifth target-repo doc packet is now landed, with Docoved guides/reference docs (`docoved-dv-admin-shell`, `docoved-local-regression-pack`, and `docoved-hosted-live-channel-acceptance-playbook`) migrated into `docoved-agent`, framework architecture-context docs (`platform-glossary`, `system-context`, `container-architecture`, and `dependency-and-placement-rules`) migrated into `bot-platform`, and Wave 1B status wording narrowed to still-unlanded doc families.
  - version: 1.71.0
    date: 2026-04-21
    changes: Recorded waves 107-112: the fourth target-repo doc packet is now landed, with Docoved channel-adapter plus Telegram/email channel-acceptance docs migrated into `docoved-agent`, framework execution-traces plus trace-artifact-governance plus decision-explanation-envelope docs migrated into `bot-platform`, and Wave 1B status wording advanced to the next still-unlanded doc families.
  - version: 1.70.0
    date: 2026-04-21
    changes: Folded a newly accepted implementation lesson back into the protocol: target-repo MBB references in subagent task files must use the real mirrored path `.memory-bank/mbb/**` rather than repo-root `mbb/**`, preventing repeat task-path drift during later waves.
  - version: 1.69.0
    date: 2026-04-21
    changes: Recorded waves 100-105: the third target-repo doc packet is now landed, with Docoved single-endpoint API + active-snapshot model + hosted bootstrap runbook migrated into `docoved-agent`, framework auth-core + persistence-interface + API-namespace registry migrated into `bot-platform`, and Wave 1B status wording advanced to the next still-unlanded doc tranche.
  - version: 1.68.0
    date: 2026-04-21
    changes: Recorded waves 94-99: the next target-repo doc tranche is now landed, with Docoved architecture-domain docs migrated into `docoved-agent`, typed-client plus workflow-host docs migrated into `bot-platform`, and cross-repo status/protocol sync updated so Wave 1B progress reflects both the first and second landed doc packets.
  - version: 1.67.0
    date: 2026-04-21
    changes: Recorded waves 87-93: the first repo-local doc-migration packets are now landed in the target repos, with Docoved answer-artifact/runbook/topology docs migrated into `docoved-agent`, execution-kernel and pipeline-registry runtime docs migrated into `bot-platform`, and cross-repo status/protocol sync updated to treat those packets as completed Wave 1B progress rather than pending migration intent.
  - version: 1.66.0
    date: 2026-04-21
    changes: Recorded waves 84-86: the post-consumer cleanup tail was reduced to type-only/local-compat bindings, those remaining `packages/core/src` imports are now cut over to `@docoved-agent/sa-docoved`, and the former local `docoved-citations.ts` implementation in `sales-agent` is now only a thin compatibility shim with verification green on `SCN-186`, `SCN-195`, `SCN-215`, plus `@sales-agent/core` typecheck/build.
  - version: 1.65.0
    date: 2026-04-21
    changes: Recorded waves 79-83: the stale post-SCN-215 tail was corrected, `docoved-answer-artifact.ts`, `research-workflow.ts`, and `simulated-response.ts` now all consume the published `@docoved-agent/sa-docoved@0.1.10` citation-resolution surface, `packages/core/src/index.ts` now re-exports that surface directly from the published package, and verification is green on `SCN-186`, `SCN-195`, `SCN-215`, plus `@sales-agent/core` typecheck/build.
  - version: 1.64.0
    date: 2026-04-21
    changes: Recorded waves 73-77: the first runtime extraction consumer in `memory-bank.ts` now uses the published Docoved seam, the broader citation-resolution helper contour is now really published as `@docoved-agent/sa-docoved@0.1.10`, and `SCN-215` now passes as the first downstream consumer of that broader published citation-resolution surface.
  - version: 1.63.0
    date: 2026-04-21
    changes: Recorded waves 69-71: the next bounded citation-helper consumers after `docoved-shared.ts` were selected as the two Docoved scripts, both scripts now consume the published `@docoved-agent/sa-docoved` seam, the reviewed-import dry-run reached real corpus processing before exposing an external missing-artifact blocker in `br-kb-reglaments`, and the remaining tail is now concentrated in runtime memory-bank plus the transitional compatibility export.
  - version: 1.62.0
    date: 2026-04-21
    changes: Recorded waves 64-67: the next bounded Docoved seam was reduced to `extractDocovedCitationNodes`, the owner-side citation-node extraction helper slice is now really published as `@docoved-agent/sa-docoved@0.1.9`, the first shared downstream consumer in `docoved-shared.ts` now uses the real published package with `SCN-179` plus `SCN-180` green, and sales-agent scenario verification should use the repo-root `pnpm scenario:run -- run <SCN-ID>` alias rather than relying on an unregistered root `pnpm exec sales-agent-scenarios ...` path.
  - version: 1.61.0
    date: 2026-04-21
    changes: Recorded waves 61-63: the next bounded Docoved seam was selected as the semantic-map export helper contour, the semantic-map/placement owner slice is now really published as `@docoved-agent/sa-docoved@0.1.8`, and bounded downstream consumers `SCN-205` plus `SCN-208` now use the real published package while `SCN-210` and `SCN-189` remain green after the bump.
  - version: 1.60.0
    date: 2026-04-21
    changes: Recorded waves 54-60: `refreshDocovedQualityReport` was selected as the next bounded mixed Docoved seam, published first as `@docoved-agent/sa-docoved@0.1.6`, the first `SCN-210` adoption attempt exposed a real `process.cwd()`-coupled owner-package runtime defect, and the corrected `@docoved-agent/sa-docoved@0.1.7` is now really published with `SCN-210`, `SCN-212`, `SCN-213`, and `SCN-189` green on the real published path.
  - version: 1.59.0
    date: 2026-04-21
    changes: Recorded waves 48-53: corrected `@docoved-agent/sa-docoved@0.1.5` is now really published through the protected-branch flow, the blocked `SCN-189` cutover is green on the real published package, and the remaining single-scenario multi-format consumers `SCN-190` through `SCN-193` are now also migrated in `sales-agent`.
  - version: 1.58.0
    date: 2026-04-21
    changes: Recorded waves 45-47: `SCN-189` was selected as the next bounded Docoved consumer, the first cutover attempt correctly exposed a real Markit runtime packaging defect in published `@docoved-agent/sa-docoved@0.1.4`, and the owner-side corrective package state is now prepared as release-ready `0.1.5` pending protected-branch publication before the consumer retry.
  - version: 1.57.0
    date: 2026-04-21
    changes: Recorded wave-44 completion: `sales-agent` now adopts the published `@docoved-agent/sa-docoved@0.1.4` ingest surface in `SCN-212`, while shared-helper and multi-format Docoved ingest consumers remain explicitly deferred to later bounded waves.
  - version: 1.56.0
    date: 2026-04-21
    changes: Recorded wave-43 completion: `sales-agent` now adopts the published `@docoved-agent/sa-docoved@0.1.4` ingest surface in `SCN-210`, while broader shared-helper Docoved consumer work remains intentionally separate.
  - version: 1.55.0
    date: 2026-04-20
    changes: Recorded wave-42 completion: `sales-agent` now adopts the published `@docoved-agent/sa-docoved@0.1.4` ingest/validate surface in `SCN-209`, while broader shared-helper and multi-format Docoved ingest consumers remain explicitly deferred to later bounded waves.
  - version: 1.54.0
    date: 2026-04-20
    changes: Recorded wave-41 completion: `@docoved-agent/sa-docoved@0.1.4` is now really published through the protected-branch GitHub release flow, so the next bounded wave can perform the first semver-backed ingest/validate consumer cutover in sales-agent.
  - version: 1.53.0
    date: 2026-04-20
    changes: Recorded wave-40 completion: the Docoved ingest/validate owner slice is now materialized into release-shaped repo state as `@docoved-agent/sa-docoved@0.1.4`, and detached tarball proof closes the local pre-publish gate before the next intentional publish wave.
  - version: 1.52.0
    date: 2026-04-20
    changes: Recorded wave-39 completion: `docoved-agent/packages/sa-docoved` now owns the bounded ingest/validate contour in repo state, while versioning, publication, and downstream sales-agent adoption remain intentionally separate later waves.
  - version: 1.51.0
    date: 2026-04-20
    changes: Recorded wave-38 completion: the next executable remaining Docoved seam was selected as the ingest/validate contour after code-backed review showed that `quality-refresh`, `semantic-map`, and `placement` remain blocked by `@sales-agent/core` coupling or mixed-repo path assumptions.
  - version: 1.50.0
    date: 2026-04-20
    changes: Recorded wave-37 completion: `sales-agent` now adopts the published `@docoved-agent/sa-docoved@0.1.3` report-type surface in `SCN-210`, `SCN-212`, and `SCN-213`, while the wider mixed Docoved helper tail remains explicitly deferred to later bounded waves.
  - version: 1.49.0
    date: 2026-04-20
    changes: Recorded wave-36 completion: `@docoved-agent/sa-docoved@0.1.3` is now really published through the protected-branch GitHub release flow, so the next bounded wave can perform the first semver-backed report-type consumer cutover in sales-agent.
  - version: 1.48.0
    date: 2026-04-20
    changes: Recorded wave-35 completion: the Docoved quality-report owner slice is now materialized into versioned repo state as `@docoved-agent/sa-docoved@0.1.3`, and detached tarball smoke proof closes the local pre-publish gate before the next intentional publish or semver-backed report-type consumer wave.
  - version: 1.47.0
    date: 2026-04-20
    changes: Recorded wave-34 completion: the narrow Docoved quality-report contract/helper slice now lives in `docoved-agent/packages/sa-docoved`, and the host/readback contract uses concrete `DocovedQualityReport` payloads while versioning and downstream semver adoption remain later waves.
  - version: 1.46.0
    date: 2026-04-20
    changes: Recorded wave-33 completion: `sales-agent` now consumes the published `@docoved-agent/sa-docoved@0.1.2` quality-refresh client in `SCN-212` and `SCN-213`, while `SCN-179` and `SCN-180` re-prove that the earlier Docoved host/publication seam still holds after the cutover.
  - version: 1.45.0
    date: 2026-04-20
    changes: Recorded wave-32 completion: the expanded Docoved seam is now materialized into versioned repo state as `@docoved-agent/sa-docoved@0.1.2`, and detached tarball smoke proof closes the local pre-publish gate before real npm publication and semver-backed downstream consumer work.
  - version: 1.44.0
    date: 2026-04-20
    changes: Recorded wave-31 completion: `docoved-agent/packages/sa-docoved` now owns the next bounded quality-refresh operational seam through typed lifecycle helpers plus `loadQualityRefreshJob(...)`, while broader `sales-agent` consumer cutover remains a later wave after versioning/publication.
  - version: 1.43.0
    date: 2026-04-20
    changes: Recorded wave-30 completion: bounded scout tasks were used to choose the next executable post-wave-29 move, confirming that the next best tranche is Docoved quality-refresh operational readbacks through `@docoved-agent/sa-docoved` rather than a premature attack on `@sales-agent/core` or `@sales-agent/db`.
  - version: 1.42.0
    date: 2026-04-20
    changes: Recorded wave-29 completion: target package naming is now canonically fixed across the framework repo, both product repos, and the mixed source repo: `@dd-bot-platform/*`, `@selleragent/*`, and `@docoved-agent/*` are the accepted target scopes, while `@sales-agent/*` remains transitional mixed-repo naming only.
  - version: 1.41.0
    date: 2026-04-20
    changes: Recorded wave-28 completion: `sales-agent` now consumes the first published product seams from npm (`@selleragent/core@0.1.1`, `@docoved-agent/sa-docoved@0.1.1`), the temporary workspace vendor bridge packages are removed, and targeted seam scenarios plus full build prove the new package path.
  - version: 1.40.0
    date: 2026-04-20
    changes: Recorded wave-27 completion: the first product release commits were promoted to `main`, real npm publish workflows succeeded for `@selleragent/core@0.1.1` and `@docoved-agent/sa-docoved@0.1.1`, and detached registry-consumption proof is now part of the accepted evidence.
  - version: 1.39.0
    date: 2026-04-20
    changes: Recorded wave-26 completion: `NPM_TOKEN` is now provisioned in both new product repositories, closing the npm publish-auth blocker for the first GitHub-hosted product-package publication waves.
  - version: 1.38.0
    date: 2026-04-20
    changes: Recorded wave-25 completion: both product repos now materialize their first accepted Changesets release intent into repo state (`@selleragent/core@0.1.1` and `@docoved-agent/sa-docoved@0.1.1`), and their bounded publish flows validate already-versioned release state instead of stale pending Changeset intent.
  - version: 1.37.0
    date: 2026-04-20
    changes: Recorded wave-24 completion: the first release-ready product packages now also pass detached tarball clean-install proof outside repo workspaces, closing the last local pre-publish gate before real npm publication and downstream bridge replacement waves.
  - version: 1.36.0
    date: 2026-04-20
    changes: Recorded wave-23 completion: `selleragent` now has the first release-ready product-package scaffold for `@selleragent/core` with Changesets, an allowlisted publish script, a release workflow, and local dry-run proof, while actual npm publication and downstream bridge replacement remain later waves.
  - version: 1.35.0
    date: 2026-04-20
    changes: Recorded wave-22 completion: `docoved-agent` now has the first release-ready product-package scaffold for `@docoved-agent/sa-docoved` with Changesets, an allowlisted publish script, a release workflow, and local dry-run proof, while actual npm publication and downstream bridge replacement remain later waves.
  - version: 1.34.0
    date: 2026-04-20
    changes: Recorded wave-21 completion: `docoved-agent/packages/sa-docoved` now owns the first runnable Docoved acceptance-host adapter slice, `sales-agent` proves that slice through a temporary vendored `@docoved-agent/sa-docoved` bridge plus `SCN-179`/`SCN-180`, the base host contract remains on version 1, and the next focus moves to bridge replacement and later host-hardening beyond temporary compat glue.
  - version: 1.33.0
    date: 2026-04-20
    changes: Recorded wave-20 completion: the DB-side follow-on is now closed, `packages/db` consumes the last moved SellerAgent media seam from `@selleragent/core` instead of `@selleragent/shared`, and the remaining shared package surface is explicitly limited to helper-tail/security utilities while the next focus moves to bridge replacement and the first runnable Docoved host slice.
  - version: 1.32.0
    date: 2026-04-20
    changes: Recorded wave-19 completion: `sales-agent` now uses a temporary vendored workspace bridge for `@selleragent/core`, the first non-DB `W09-MP-03` consumers import SellerAgent-owned root/git/media symbols from that bridge, `@selleragent/shared` is reduced to a compatibility shim for deferred consumers such as `packages/db`, and the next Docoved runnable host slice is explicitly scoped around `packages/sa-docoved` plus `SCN-179`/`SCN-180`.
  - version: 1.31.0
    date: 2026-04-20
    changes: Recorded wave-18 completion: `docoved-agent` was upgraded from a docs-only bootstrap into a buildable product code landing zone, `packages/sa-docoved` now owns the first acceptance-host contract skeleton, and both target product repos now have minimal runnable code contours before their real move packets.
  - version: 1.30.0
    date: 2026-04-20
    changes: Recorded wave-17 completion: target-repo readiness audits showed both product repos were still docs-only, `selleragent` was upgraded into the first buildable product code landing zone, and `packages/core` now owns the first SellerAgent business-profile root/git/media slice while the full `W09-MP-03` consumer rewrite remains a later wave.
  - version: 1.29.0
    date: 2026-04-20
    changes: Reconciled the canonical protocol text with the actual wave-16 result: the currently accepted bridge for framework-safe slices is public scoped npm under `@dd-bot-platform/*`, the first `sales-agent` consumer cutover is complete, and the next focus moved from bridge proof to later extraction/adoption waves.
  - version: 1.28.0
    date: 2026-04-20
    changes: Recorded wave-16 completion: the first framework packages were actually published to npm as `@dd-bot-platform/*`, ADR-002 captured the public scoped npm deviation after restricted publication failed, and the active consumer bridge in `sales-agent` moved from vendored semantic-eval mirrors to the published packages.
  - version: 1.27.0
    date: 2026-04-20
    changes: Recorded wave-15 completion: `bot-platform` now has the real npm scope `@dd-bot-platform`, Changesets-based release intent, an allowlisted publish script, and a release workflow aligned to the repo's current `main`-branch bootstrap state.
  - version: 1.26.0
    date: 2026-04-20
    changes: Converted the framework bridge from the temporary GitHub Packages assumption to the real npm scope `@dd-bot-platform`, added Changesets and a controlled release workflow in `bot-platform`, and recorded that future product cutovers must consume the published npm packages rather than vendor mirrors once install-auth contours are proven.
  - version: 1.25.0
    date: 2026-04-20
    changes: Completed the first publish-readiness tranche for the extracted framework bridge: `@bot-platform/api-contract` and `@bot-platform/scenario-system` now carry explicit private-registry publication metadata, tarball hygiene verification is documented, and repo-local operations truth now defines the package bridge needed to replace temporary vendored mirrors in later waves.
  - version: 1.24.0
    date: 2026-04-20
    changes: Continued staged consumer adoption after the `sa-judge` tranche: `scenario-runner` now uses one explicit temporary vendored mirror for the framework semantic-eval contract slice only, while keeping its local semantic judge runtime implementation, `executeSemanticJudge(...)` adapter, and `index.ts` export surface unchanged.
  - version: 1.23.0
    date: 2026-04-20
    changes: Started the first consumer-adoption tranche after framework extraction: `sa-judge` now uses one explicit temporary vendored mirror for the framework semantic-eval slice (`api-contract` semantic-eval/runtime leaf plus semantic judge runtime core), with local wrappers and explicit expiry/removal metadata while the private-registry bridge remains the target state.
  - version: 1.22.0
    date: 2026-04-20
    changes: Continued real execution of `W09-MP-01`: landed the minimal `bot-platform/packages/api-contract` semantic-eval slice (`semantic-eval` plus `runtimeUsage`), added the framework semantic judge runtime shell to `packages/scenario-system`, verified the framework boundary stays product-neutral, and recorded wave-11 adoption guidance to start consumer transition from `sa-judge`.
  - version: 1.21.0
    date: 2026-04-20
    changes: Started real execution of `W09-MP-01`: committed the `bot-platform` workspace bootstrap, landed the first framework-owned `packages/scenario-system` shell (neutral vocabulary, artifact/evidence helpers, provenance and transcript summary utilities), synced naming drift away from `scenario-runner`, and recorded wave-10 verification artifacts.
  - version: 1.20.0
    date: 2026-04-20
    changes: Recorded the completion of the first move-wave packetization tranche: drafted and accepted `W09-MP-01` framework scenario-shell extraction, `W09-MP-02` Docoved local host/publication baseline, and `W09-MP-03` SellerAgent business-profile shared-retirement as the first executable move order after target-doc conversion.
  - version: 1.19.0
    date: 2026-04-20
    changes: Recorded the first canonical target-doc conversion tranche: landed the shared scenario-system framework contract in `bot-platform`, the SellerAgent business-profile ownership contract in `selleragent`, and the Docoved acceptance/host contract in `docoved-agent`, shifting active focus to explicit move-wave packetization anchored to those docs.
  - version: 1.18.0
    date: 2026-04-20
    changes: Recorded the completion of implementation wave 07 final extraction design (`X-07..X-08`) for `packages/scenario-runner` and `packages/shared`, closing the `X-01..X-08` extraction-design backlog and moving protocol focus to canonical target docs plus source-move planning.
  - version: 1.17.0
    date: 2026-04-20
    changes: Recorded the completion of implementation wave 06 infrastructure-side extraction design (`X-04..X-06`) for `packages/db`, `apps/server`, and `apps/workflow`, leaving only `X-07..X-08` before the extraction-design backlog is complete.
  - version: 1.16.0
    date: 2026-04-20
    changes: Recorded the completion of implementation wave 05 first-tranche extraction design (`X-01..X-03`) for `packages/core`, `packages/api-contract`, and `packages/client-sdk`, and added an operational rule to use only locally supported subagent models during protocol execution.
  - version: 1.15.0
    date: 2026-04-20
    changes: Recorded the completion of implementation wave 04: TR-01 cross-repo traceability was assembled and verified, mixed-source replacement rules were made explicit, and accepted traceability-anchor lessons were folded into the shared MBB guidance.
  - version: 1.14.0
    date: 2026-04-20
    changes: Recorded the completion of implementation wave 03: framework, SellerAgent, and Docoved scenario/verification matrices were actualized against canonical feature registries, and accepted scenario-ownership lessons were folded back into the MBB scenario authoring rules.
  - version: 1.13.0
    date: 2026-04-20
    changes: Synced implementation wave 02 completion into the canonical target-repo protocol copy: feature registries were actualized, D-02 was closed through ADR-001, and accepted documentation lessons were folded back into Memory Bank rules.
  - version: 1.12.0
    date: 2026-04-20
    changes: Recorded the completion of implementation wave 01: repo rebind matrix, secret split/rotation plan, first execution packet register, main-agent verification verdicts, and the folding of accepted lessons back into the owning Memory Bank docs.
  - version: 1.11.0
    date: 2026-04-20
    changes: Added explicit repo-rebinding and secret-separation rules: governed repo/project rebind matrix, secret inventory and rotation/decommission policy, stage-closeout requirements, and stronger MBB routing for lessons learned and insights.
  - version: 1.10.0
    date: 2026-04-20
    changes: Added the phase-3 operational execution layer for PRT-036: git/worktree discipline, push and hosted-build policy, deploy/preflight and rollout gates, GitHub/Vercel green requirements, hosted scenario expectations, and mandatory lessons-learned/insights capture.
  - version: 1.9.0
    date: 2026-04-19
    changes: Added the implementation-oriented execution model for PRT-036: subagent task-file standard, delegation and verification workflow, parallel task graph, wave-specific verification stages, and a phase-2 completion mark.
  - version: 1.8.0
    date: 2026-04-19
    changes: Recorded the completion of phase-1 protocol review and linked the consolidated synthesis covering architecture, contracts, MBB governance, lean design, cleanup prerequisites, reliability, verification, UI, storage, and CI/CD gate requirements for the next protocol refinement pass.
  - version: 1.7.0
    date: 2026-04-19
    changes: Rebased the protocol onto the real post-bootstrap state: target repo Memory Banks and first-wave planning docs are already landed, and the next required wave now explicitly covers repo-local content migration, feature-model actualization, scenario refresh, and traceability.
  - version: 1.6.0
    date: 2026-04-19
    changes: Recorded the next Memory Bank fill wave in target repos: initial epic maps, feature registries, scenario matrices, and the canonical PRT-036 copy in bot-platform were added.
  - version: 1.5.0
    date: 2026-04-19
    changes: Recorded the first substantive Memory Bank fill wave in target repos: framework/product boundary docs, repo-structure docs, current-status snapshots, and verification matrices were added to bot-platform, selleragent, and docoved-agent.
  - version: 1.4.0
    date: 2026-04-19
    changes: Recorded Wave 1 Memory Bank bootstrap progress: real target `.memory-bank` skeletons were created in `bot-platform`, `selleragent`, and `docoved-agent`, with MBB packs and root/section hubs landed for continued protocol-driven migration.
  - version: 1.3.0
    date: 2026-04-19
    changes: Added a contract-boundary workstream to the protocol, including CB-01..CB-06 tasks for runtime, API/SDK, auth/commands, workflow, persistence, and contract-document backlog closure before mixed-package extraction.
  - version: 1.2.0
    date: 2026-04-19
    changes: Added a unified protocol task register that consolidates decision closure, review artifacts, Memory Bank redesign tasks, and mixed-package extraction design into one execution backlog.
  - version: 1.1.0
    date: 2026-04-19
    changes: Integrated the Memory Bank redesign wave into the protocol as an explicit execution task program covering MBB mirroring, target repo Memory Bank skeletons, current-source transition, and index/move-map planning.
  - version: 1.0.0
    date: 2026-04-19
    changes: Initial protocol for splitting the current mixed codebase into a framework-only platform repo and two product repos with explicit ownership, deployment, Memory Bank, and migration-wave boundaries.
---

# Protocol: Platform Framework And Product Repo Split

## Purpose

This protocol turns the repository-split direction into an execution-grade migration contract.

The target state is no longer "one growing mixed repo with multiple product lines inside it".
The target state is:
- one framework monorepo: `bot-platform`;
- one SellerAgent product monorepo: `selleragent`;
- one Docoved product monorepo: `docoved-agent`.

This protocol exists so the split is performed as a boundary cleanup program, not as a sequence of accidental folder moves.

## Scope of this cycle

### In scope

- define the canonical repository topology for `bot-platform`, `selleragent`, and `docoved-agent`;
- define what counts as framework code versus product code;
- define where auth/users, Telegram slash-command surfaces, workflows, DB ownership, and deployment ownership live after the split;
- map the current mixed repository into target-repo ownership buckets;
- define the required Memory Bank split and documentation obligations for each resulting repo;
- define the migration waves, verification gates, and archival handling for historical tails such as legacy SellerAgent Python code and non-Memory-Bank documentation.

### Out of scope

- a big-bang code move in one step;
- introducing a shared live control-plane instance used by both products;
- forcing both products onto one shared database or one shared workflow deployment;
- inventing a generic framework abstraction for product-specific logic that only one product actually needs;
- immediate publication/versioning mechanics for every future internal package before the boundary map is accepted.

## Inputs

- Existing architecture and boundary SSoT:
  - [.memory-bank/spec/project/agent-execution-platform-architecture.md](../../spec/project/agent-execution-platform-architecture.md)
  - [.memory-bank/spec/project/feature-area-boundaries.md](../../spec/project/feature-area-boundaries.md)
  - [.memory-bank/spec/project/repo-structure.md](../../spec/project/repo-structure.md)
- Prior architecture cleanup protocol:
  - [PRT-030](PRT-030-architecture-boundary-simplification-and-ownership-convergence.md)
- Security and deployment references:
  - [.memory-bank/spec/security/auth-and-access.md](../../spec/security/auth-and-access.md)
  - [.memory-bank/spec/operations/deployment-architecture.md](../../spec/operations/deployment-architecture.md)
- Current source repository inventory:
  - `apps/server`
  - `apps/web`
  - `apps/workflow`
  - `packages/api-contract`
  - `packages/client-sdk`
  - `packages/core`
  - `packages/db`
  - `packages/dv-admin`
  - `packages/observability`
  - `packages/platform-config`
  - `packages/prompt-catalog`
  - `packages/sa-admin`
  - `packages/sa-docoved`
  - `packages/sa-judge`
  - `packages/scenario-runner`
  - `packages/shared`
  - `packages/ui-contract`

## Open questions / required research

- Package publication strategy is now closed for the migration bridge:
  - accepted current bridge for framework-safe slices: public scoped npm packages from `bot-platform` under `@dd-bot-platform/*`;
  - allowed backup only: narrow vendoring / temporary mirrors with explicit expiry;
  - rejected as primary bridge: git subtree/submodule-like dependency model.
- The exact split of current `packages/api-contract` and `packages/client-sdk` needs a contract inventory, because part of their surface is truly framework-level while part is product-specific.
- The exact extraction line inside `packages/core` still needs a code-level owner map, especially around runtime, channels, and workflow-family helpers.
- The exact split of `packages/scenario-runner` needs a scenario inventory:
  - scenario engine and generic evidence tooling may become platform-level;
  - SellerAgent and Docoved scenario suites should become product-local.
- Operational naming is now provisionally closed for this migration wave:
  - target product repo is currently `selleragent`;
  - any future rename back to `sales-agent` is a separate follow-up and is not allowed to block the split program.

> This protocol is allowed to fix repository boundaries first and leave later package-family promotion mechanics for a narrow decision.
> It is not allowed to postpone the boundary map itself.

## Security / rollout impact

- Exposure decision: `mixed`
- RLS / grants / auth impact: auth and user models become framework-defined in `bot-platform`, but concrete persistence, product memberships, sessions, and grants remain product-local in `selleragent` and `docoved-agent`.
- Rollback / containment note: the current mixed repository remains the migration source until each target repo reaches bounded parity; no destructive source cleanup should happen before the corresponding target repo has a minimal runnable contour.
- Hosted verification gate: each product repo must prove its own deploy path and environment isolation on its own hosted contour before old mixed deployment assumptions are retired.

## Execution summary

1. Treat `bot-platform` as a framework monorepo, not as a shared live product instance.
2. Treat `selleragent` and `docoved-agent` as separate product monorepos with their own DB truth, deployments, secrets, CI/CD, and Memory Banks.
3. Extract shared mechanisms upward into `bot-platform` only when they are truly product-agnostic or already needed by both products.
4. Split workflow into framework plus product hosts:
   - workflow framework in `bot-platform`;
   - concrete workflow deployments in each product repo.
5. Archive and remove historical tails from the active mainline early so the migration is not blocked by dead code ownership.

## Current state baseline

As of 2026-04-19, the split program is no longer at "blank target repo" stage.

Already landed:
- real target repos exist in `_Projects`:
  - `bot-platform`
  - `selleragent`
  - `docoved-agent`
- target `.memory-bank/**` roots and section hubs exist in all three repos;
- canonical `mbb/**` upstream exists in `bot-platform`, with mirrored packs in both product repos;
- first-wave repo-local planning/navigation docs are landed:
  - root indexes
  - repo-structure docs
  - boundary docs
  - current-status reports
  - verification matrices
  - epic maps
  - feature registries
  - scenario matrices
- `bot-platform` already contains a canonical target-repo copy of `PRT-036`.

Implication:
- the protocol must now drive controlled content migration and repo-local truth actualization;
- the next blocker is no longer "create Memory Bank skeletons";
- the next blocker is "fill those Memory Banks with correct repo-owned truth and bind features to scenarios before code extraction".

Review status:
- stage of plan elaboration: phase 1 completed;
- consolidated phase-1 review synthesis is recorded in `.tasks/prt-036-phase-1-protocol-review-2026-04-19/summary/PRT-036-phase-1-review-synthesis.md`;
- stage of plan elaboration: phase 2 completed;
- consolidated phase-2 implementation synthesis is recorded in `.tasks/prt-036-phase-2-implementation-planning-2026-04-19/summary/PRT-036-phase-2-implementation-synthesis.md`;
- stage of plan elaboration: phase 3 completed;
- consolidated phase-3 ops/runbook synthesis is recorded in `.tasks/prt-036-phase-3-ops-runbook-refinement-2026-04-20/summary/PRT-036-phase-3-ops-synthesis.md`;
- implementation stage: wave 01 completed;
- consolidated implementation-wave-01 synthesis is recorded in `.tasks/prt-036-implementation-wave-01-2026-04-20/summary/PRT-036-implementation-wave-01-synthesis.md`;
- implementation stage: wave 02 completed;
- D-02 is canonically closed through [ADR-001](../adr/ADR-001-private-registry-bridge-for-product-repos.md) and the later accepted operational deviation in [ADR-002](../adr/ADR-002-public-npm-bridge-for-framework-packages.md);
- implementation stage: wave 03 completed;
- accepted scenario-ownership lessons were folded into `.memory-bank/mbb/scenario-docs-guide.md`;
- implementation stage: wave 10 completed;
- the first executable `W09-MP-01` tranche now exists in `bot-platform/packages/scenario-system`;
- wave-10 synthesis is recorded in `.tasks/prt-036-implementation-wave-10-2026-04-20/summary/PRT-036-implementation-wave-10-synthesis.md`;
- implementation stage: wave 11 completed;
- the next executable `W09-MP-01` tranche now exists in `bot-platform/packages/api-contract` plus `packages/scenario-system/src/semantic-eval/judge-runtime.ts`;
- wave-11 synthesis is recorded in `.tasks/prt-036-implementation-wave-11-2026-04-20/summary/PRT-036-implementation-wave-11-synthesis.md`;
- implementation stage: wave 12 completed;
- the first consumer-adoption tranche is now landed in `sales-agent/packages/sa-judge` through an explicit temporary vendored mirror under `src/vendor/bot-platform/`;
- wave-12 synthesis is recorded in `.tasks/prt-036-implementation-wave-12-2026-04-20/summary/PRT-036-implementation-wave-12-synthesis.md`;
- implementation stage: wave 13 completed;
- the first `scenario-runner` consumer-adoption tranche is now landed through an explicit temporary vendored semantic-eval contract mirror under `packages/scenario-runner/src/vendor/bot-platform/`;
- wave-13 synthesis is recorded in `.tasks/prt-036-implementation-wave-13-2026-04-20/summary/PRT-036-implementation-wave-13-synthesis.md`;
- implementation stage: wave 14 completed;
- the first publish-readiness tranche for the framework bridge is now landed in `bot-platform`:
  - `@dd-bot-platform/api-contract` and `@dd-bot-platform/scenario-system` now carry explicit publication metadata;
  - tarball hygiene and packed-manifest verification are now part of repo-local bridge operations truth;
- wave-14 synthesis is recorded in `.tasks/prt-036-implementation-wave-14-2026-04-20/summary/PRT-036-implementation-wave-14-synthesis.md`;
- implementation stage: wave 15 completed;
- the framework bridge is now aligned to the real npm publication path:
  - framework package scope: `@dd-bot-platform/*`
  - registry target: npm
  - release discipline: Changesets plus a controlled allowlisted publish script
- wave-15 synthesis is recorded in `.tasks/prt-036-implementation-wave-15-2026-04-20/summary/PRT-036-implementation-wave-15-synthesis.md`;
- implementation stage: wave 16 completed;
- the first end-to-end published bridge exercise is now proven:
  - `@dd-bot-platform/api-contract@0.2.0` and `@dd-bot-platform/scenario-system@0.2.0` are published in npm;
  - the active consumer bridge in `sales-agent` no longer uses vendored semantic-eval mirrors in `sa-judge` or `scenario-runner`;
  - ADR-002 records the accepted public scoped npm deviation after restricted publication failed with `E402`;
- wave-16 synthesis is recorded in `.tasks/prt-036-implementation-wave-16-2026-04-20/summary/PRT-036-implementation-wave-16-synthesis.md`;
- implementation stage: wave 17 completed;
- target-repo bootstrap is now unblocked for the first SellerAgent slice:
  - readiness audits confirmed both `selleragent` and `docoved-agent` were still docs-only target repos;
  - `selleragent` now has a minimal pnpm/typescript workspace plus `packages/core` as the first product-owned landing package;
  - the first SellerAgent business-profile root/git/media slice is landed in that package;
- wave-17 synthesis is recorded in `.tasks/prt-036-implementation-wave-17-2026-04-20/summary/PRT-036-implementation-wave-17-synthesis.md`;
- implementation stage: wave 18 completed;
- target-repo bootstrap is now also unblocked for the first Docoved slice:
  - `docoved-agent` now has a minimal pnpm/typescript workspace plus `packages/sa-docoved` as the first product-owned landing package;
  - the first Docoved acceptance-host contract skeleton is landed in that package;
- wave-18 synthesis is recorded in `.tasks/prt-036-implementation-wave-18-2026-04-20/summary/PRT-036-implementation-wave-18-synthesis.md`;
- implementation stage: wave 19 completed;
- the first real SellerAgent consumer cutover tranche is now proven:
  - `sales-agent` contains a temporary vendored workspace bridge package `@selleragent/core` whose source of truth remains `selleragent/packages/core`;
  - first non-DB `W09-MP-03` consumers now import the moved SellerAgent root/git/media surface from `@selleragent/core`;
  - `@selleragent/shared` now acts as a compatibility shim for the deferred DB/helper-tail contour instead of remaining an ungoverned second owner of the moved surface;
  - targeted local scenario proof for the cutover is green (`SCN-038`, `SCN-042`, `SCN-091`);
- wave-19 synthesis is recorded in `.tasks/prt-036-implementation-wave-19-2026-04-20/summary/PRT-036-implementation-wave-19-synthesis.md`;
- implementation stage: wave 20 completed;
- the DB-side `W09-MP-03` follow-on is now closed:
  - `packages/db` now consumes the remaining moved SellerAgent media seam (`resolveBusinessProfileMediaScope`) from `@selleragent/core`;
  - no moved root/git/media imports remain in DB from `@selleragent/shared`;
  - the remaining `@selleragent/shared` surface is explicitly helper-tail/security-only for now;
  - targeted local scenario proof remains green (`SCN-038`, `SCN-042`, `SCN-091`);
- wave-20 synthesis is recorded in `.tasks/prt-036-implementation-wave-20-2026-04-20/summary/PRT-036-implementation-wave-20-synthesis.md`;
- implementation stage: wave 21 completed;
- the first runnable Docoved host slice is now proven:
  - `docoved-agent/packages/sa-docoved` contains the first real local acceptance-host adapter implementation;
  - `sales-agent` uses a temporary vendored workspace bridge for `@docoved-agent/sa-docoved`;
  - `SCN-179` and `SCN-180` now start through the Docoved seam helper rather than the old direct mixed harness;
  - the base host contract remains at `DOCOVED_ACCEPTANCE_HOST_CONTRACT_VERSION = 1`, while temporary compat readback is isolated to one seam helper for this wave;
- wave-21 synthesis is recorded in `.tasks/prt-036-implementation-wave-21-2026-04-20/summary/PRT-036-implementation-wave-21-synthesis.md`;
- implementation stage: wave 22 completed;
- the first Docoved product-package release-readiness slice is now proven:
  - `@docoved-agent/sa-docoved` now carries publish-ready npm metadata;
  - `docoved-agent` now has Changesets, an allowlisted publish script, and a release workflow for that package;
  - local pack and publish dry-run proof are green without performing a real publication;
- wave-22 synthesis is recorded in `.tasks/prt-036-implementation-wave-22-2026-04-20/summary/PRT-036-implementation-wave-22-synthesis.md`;
- implementation stage: wave 23 completed;
- the first SellerAgent product-package release-readiness slice is now proven:
  - `@selleragent/core` now carries publish-ready npm metadata;
  - `selleragent` now has Changesets, an allowlisted publish script, and a release workflow for that package;
  - local pack and publish dry-run proof are green without performing a real publication;
- wave-23 synthesis is recorded in `.tasks/prt-036-implementation-wave-23-2026-04-20/summary/PRT-036-implementation-wave-23-synthesis.md`;
- implementation stage: wave 24 completed;
- the first detached clean-install proof for product packages is now proven:
  - tarballs for `@docoved-agent/sa-docoved` and `@selleragent/core` install successfully into a fresh temp project outside repo workspaces;
  - bounded import/runtime assertions are green for both packages;
  - the protocol now has local proof not only of pack/publish dry-run readiness, but also of consumer-style detached installation before the first real npm publications;
- wave-24 synthesis is recorded in `.tasks/prt-036-implementation-wave-24-2026-04-20/summary/PRT-036-implementation-wave-24-synthesis.md`;
- implementation stage: wave 25 completed;
- both product-package release flows now require already-versioned repo state before publication:
  - `selleragent` materialized `@selleragent/core@0.1.1` into repo state and consumed its pending release intent;
  - `docoved-agent` materialized `@docoved-agent/sa-docoved@0.1.1` into repo state and consumed its pending release intent;
  - both bounded publish scripts now refuse to publish while unreleased `.changeset/*.md` files still exist;
  - both release workflows now validate publishable versioned state through dry-run publish instead of treating pending Changeset intent as the final gate;
- wave-25 synthesis is recorded in `.tasks/prt-036-implementation-wave-25-2026-04-20/summary/PRT-036-implementation-wave-25-synthesis.md`;
- implementation stage: wave 26 completed;
- product-repo npm publish auth is now provisioned:
  - `NPM_TOKEN` exists in `deksden/seller-agent`;
  - `NPM_TOKEN` exists in `deksden/docoved-agent`;
- wave-26 synthesis is recorded in `.tasks/prt-036-implementation-wave-26-2026-04-20/summary/PRT-036-implementation-wave-26-synthesis.md`;
- implementation stage: wave 27 completed;
- the first real product npm publication tranche is now proven:
  - `seller-agent` PR #1 and `docoved-agent` PR #1 were merged to `main`;
  - `@selleragent/core@0.1.1` was published from `seller-agent`;
  - `@docoved-agent/sa-docoved@0.1.1` was published from `docoved-agent`;
  - registry readback and detached install proof are green for both packages;
- wave-27 synthesis is recorded in `.tasks/prt-036-implementation-wave-27-2026-04-20/summary/PRT-036-implementation-wave-27-synthesis.md`;
- implementation stage: wave 28 completed;
- the first downstream product-package cutover is now proven in `sales-agent`:
  - temporary workspace vendor bridge packages for SellerAgent and Docoved are removed;
  - `sales-agent` now resolves the first product seams through published npm packages:
    - `@selleragent/core@0.1.1`
    - `@docoved-agent/sa-docoved@0.1.1`
  - `pnpm build` and targeted seam scenarios are green:
    - `SCN-038`
    - `SCN-042`
    - `SCN-091`
    - `SCN-179`
    - `SCN-180`
- wave-28 synthesis is recorded in `.tasks/prt-036-implementation-wave-28-2026-04-20/summary/PRT-036-implementation-wave-28-synthesis.md`;
- implementation stage: wave 29 completed;
- target package naming is now fixed across all participating repos:
  - framework target scope: `@dd-bot-platform/*`
  - SellerAgent target scope: `@selleragent/*`
  - Docoved target scope: `@docoved-agent/*`
  - `@sales-agent/*` is transitional mixed-repo naming only and must be retired by protocol closeout;
- wave-29 synthesis is recorded in `.tasks/prt-036-implementation-wave-29-2026-04-20/summary/PRT-036-implementation-wave-29-synthesis.md`;
- implementation stage: wave 30 completed;
- bounded scout tasks were used to choose the next executable migration packet after waves 27-29:
  - remaining mixed-ownership hotspots are concentrated in `@sales-agent/core`, `@sales-agent/db`, `@sales-agent/sa-docoved`, and `@sales-agent/scenario-runner`;
  - there is no clean standalone SellerAgent-owned `@sales-agent/*` package left to extract next as a low-risk tranche;
  - the next best bounded packet is Docoved quality-refresh operational readbacks via `@docoved-agent/sa-docoved`, starting with `SCN-212` and `SCN-213`;
- wave-30 synthesis is recorded in `.tasks/prt-036-implementation-wave-30-2026-04-20/summary/PRT-036-implementation-wave-30-synthesis.md`;
- implementation stage: wave 31 completed;
- the next bounded Docoved quality-refresh seam is now landed in the owning product package:
  - `@docoved-agent/sa-docoved` exports typed quality-refresh lifecycle helpers;
  - the legacy in-process host adapter now implements `readbacks.loadQualityRefreshJob(...)`;
  - the contract version remains at `1`;
- wave-31 synthesis is recorded in `.tasks/prt-036-implementation-wave-31-2026-04-20/summary/PRT-036-implementation-wave-31-synthesis.md`;
- implementation stage: wave 32 completed;
- the expanded Docoved seam is now materialized into versioned repo state and detached-proofed:
  - `@docoved-agent/sa-docoved` now sits at repo version `0.1.2`;
  - the exact packed tarball passes detached smoke install outside repo workspaces;
  - the local pre-publish gate is closed for this package version;
- wave-32 synthesis is recorded in `.tasks/prt-036-implementation-wave-32-2026-04-20/summary/PRT-036-implementation-wave-32-synthesis.md`;
- implementation stage: wave 33 completed;
- `sales-agent` now consumes the published Docoved seam for the accepted quality-refresh orchestration slice:
  - `@docoved-agent/sa-docoved@0.1.2` is installed in `scenario-runner`;
  - `SCN-212` now drives the manifest-backed quality-refresh lifecycle through the published typed client;
  - `SCN-213` now drives the snapshot-backed quality-refresh lifecycle through the published typed client while keeping local fixture/snapshot setup in `sales-agent`;
  - `SCN-179` and `SCN-180` re-confirm the earlier wave-21 Docoved host/publication/answer seam after the cutover;
  - remaining `@sales-agent/sa-docoved` usage is now explicitly a later helper-tail wave rather than a hidden assumption;
- wave-33 synthesis is recorded in `.tasks/prt-036-implementation-wave-33-2026-04-20/summary/PRT-036-implementation-wave-33-synthesis.md`;
- implementation stage: wave 34 completed;
- the next bounded Docoved helper-tail move is now landed in the owning product package:
  - `docoved-agent/packages/sa-docoved` now owns the Docoved quality-report contract/helper slice;
  - quality-refresh job summaries and aggregate readbacks now carry concrete `DocovedQualityReport` payloads rather than `unknown`;
  - the move remained narrower than a full quality-refresh engine or ingest/publication migration;
- wave-34 synthesis is recorded in `.tasks/prt-036-implementation-wave-34-2026-04-20/summary/PRT-036-implementation-wave-34-synthesis.md`;
- implementation stage: wave 35 completed;
- the updated Docoved owner slice is now materialized into release-shaped repo state:
  - `@docoved-agent/sa-docoved` now sits at repo version `0.1.3`;
  - the exact packed tarball passes detached smoke install outside repo workspaces;
  - the local pre-publish gate is closed for this package version;
- wave-35 synthesis is recorded in `.tasks/prt-036-implementation-wave-35-2026-04-20/summary/PRT-036-implementation-wave-35-synthesis.md`;
- implementation stage: wave 36 completed;
- the updated Docoved owner slice is now really published and available for semver-backed downstream adoption:
  - `@docoved-agent/sa-docoved@0.1.3` is published to npm;
  - the protected-branch readiness workflow is green on the release commit;
  - the GitHub-hosted publish workflow is green for that same version;
- wave-36 synthesis is recorded in `.tasks/prt-036-implementation-wave-36-2026-04-20/summary/PRT-036-implementation-wave-36-synthesis.md`;
- implementation stage: wave 37 completed;
- the first semver-backed downstream report-type consumers now use the published Docoved package:
  - `scenario-runner` resolves `@docoved-agent/sa-docoved@0.1.3`;
  - `SCN-210`, `SCN-212`, and `SCN-213` now import `DocovedQualityReport` from the published package;
  - the broader mixed `@sales-agent/sa-docoved` helper tail remains intentionally deferred;
- wave-37 synthesis is recorded in `.tasks/prt-036-implementation-wave-37-2026-04-20/summary/PRT-036-implementation-wave-37-synthesis.md`;
- implementation stage: wave 38 completed;
- the next executable remaining Docoved seam is now explicitly chosen:
  - `quality-refresh`, `semantic-map`, and `placement` stay deferred because they are still core-coupled;
  - the next practical owner-slice wave is the Docoved ingest/validate contour;
- wave-38 synthesis is recorded in `.tasks/prt-036-implementation-wave-38-2026-04-20/summary/PRT-036-implementation-wave-38-synthesis.md`;
- implementation stage: wave 39 completed;
- the next practical Docoved owner slice now lives in target repo state:
  - `docoved-agent/packages/sa-docoved` now contains the ingest/validate contour and its required helper files;
  - versioning, publish, and downstream consumer adoption remain intentionally separate later waves;
- wave-39 synthesis is recorded in `.tasks/prt-036-implementation-wave-39-2026-04-20/summary/PRT-036-implementation-wave-39-synthesis.md`;
- implementation stage: wave 40 completed;
- the new Docoved owner slice is now materialized into release-shaped package state:
  - `@docoved-agent/sa-docoved` now sits at repo version `0.1.4`;
  - the exact packed tarball passes detached smoke install outside repo workspaces;
  - the local pre-publish gate is closed for this package version;
- wave-40 synthesis is recorded in `.tasks/prt-036-implementation-wave-40-2026-04-20/summary/PRT-036-implementation-wave-40-synthesis.md`;
- implementation stage: wave 41 completed;
- the updated Docoved owner slice is now really published and available for semver-backed downstream adoption:
  - `@docoved-agent/sa-docoved@0.1.4` is published to npm;
  - the protected-branch readiness workflow is green on the release commit;
  - the GitHub-hosted publish workflow is green for that same version;
- wave-41 synthesis is recorded in `.tasks/prt-036-implementation-wave-41-2026-04-20/summary/PRT-036-implementation-wave-41-synthesis.md`;
- implementation stage: wave 42 completed;
- the first semver-backed downstream ingest/validate consumer now uses the published Docoved package:
  - `scenario-runner` resolves `@docoved-agent/sa-docoved@0.1.4`;
  - `SCN-209` now imports ingest/validate surface from the published package;
  - `SCN-213` re-proves the earlier published-package Docoved seam after the dependency bump;
  - the broader mixed `@sales-agent/sa-docoved` helper tail remains intentionally deferred;
- wave-42 synthesis is recorded in `.tasks/prt-036-implementation-wave-42-2026-04-20/summary/PRT-036-implementation-wave-42-synthesis.md`;
- implementation stage: wave 43 completed;
- the next bounded downstream ingest consumer now uses the published Docoved package:
  - `SCN-210` now imports `ingestMarkdownDocument` from the published package;
  - `SCN-209` and `SCN-213` re-prove the already-landed semver path after the cutover;
- wave-43 synthesis is recorded in `.tasks/prt-036-implementation-wave-43-2026-04-21/summary/PRT-036-implementation-wave-43-synthesis.md`;
- implementation stage: wave 44 completed;
- the next bounded downstream workflow-backed ingest consumer now uses the published Docoved package:
  - `SCN-212` now imports `ingestMarkdownDocument` from the published package;
  - `SCN-209` and `SCN-213` remain green as canaries after the cutover;
  - the broader mixed `@sales-agent/sa-docoved` helper tail remains intentionally deferred;
- wave-44 synthesis is recorded in `.tasks/prt-036-implementation-wave-44-2026-04-21/summary/PRT-036-implementation-wave-44-synthesis.md`;
- implementation stage: wave 45 completed;
- the next bounded remaining Docoved consumer family is now explicitly chosen:
  - `SCN-189` is the next bounded single-scenario consumer;
  - shared-helper `docoved-shared.ts` remains a later dedicated wave;
- wave-45 synthesis is recorded in `.tasks/prt-036-implementation-wave-45-2026-04-21/summary/PRT-036-implementation-wave-45-synthesis.md`;
- implementation stage: wave 46 completed as blocked discovery;
- the first `SCN-189` cutover attempt correctly surfaced an owner-side package defect instead of being merged as a broken consumer move:
  - `@docoved-agent/sa-docoved@0.1.4` fails Markit-backed DOCX ingest from installed npm layout;
  - `SCN-209` and `SCN-213` stayed green, so the defect is scoped to the owner package runtime path, not the already-landed semver seam in general;
- wave-46 synthesis is recorded in `.tasks/prt-036-implementation-wave-46-2026-04-21/summary/PRT-036-implementation-wave-46-synthesis.md`;
- implementation stage: wave 47 completed;
- the owner-side corrective release-prep wave is now closed in `docoved-agent`:
  - `packages/sa-docoved` now declares direct `markit-ai` runtime ownership;
  - Markit CLI resolution no longer assumes package-local `.bin/markit` and instead derives `dist/main.js` from the exported `markit-ai` module entry;
  - repo version is now materialized as `@docoved-agent/sa-docoved@0.1.5`;
  - detached clean-install DOCX ingest smoke is green for the exact packed `0.1.5` artifact;
- wave-47 synthesis is recorded in `.tasks/prt-036-implementation-wave-47-2026-04-21/summary/PRT-036-implementation-wave-47-synthesis.md`;
- implementation stage: wave 48 completed;
- corrected Docoved package is now really published:
  - PR `#5` merged the versioned release commit to `docoved-agent/main`;
  - `Release Packages` readiness and publish workflow both succeeded on the merge commit path;
  - `npm view @docoved-agent/sa-docoved version` now returns `0.1.5`;
- wave-48 synthesis is recorded in `.tasks/prt-036-implementation-wave-48-2026-04-21/summary/PRT-036-implementation-wave-48-synthesis.md`;
- implementation stage: wave 49 completed;
- the previously blocked bounded consumer retry is now closed:
  - `SCN-189` now passes on real published `@docoved-agent/sa-docoved@0.1.5`;
- wave-49 synthesis is recorded in `.tasks/prt-036-implementation-wave-49-2026-04-21/summary/PRT-036-implementation-wave-49-synthesis.md`;
- implementation stage: waves 50-53 completed;
- the remaining single-scenario multi-format consumer tail is now migrated:
  - `SCN-190` now imports from the published package;
  - `SCN-191` now imports from the published package;
  - `SCN-192` now imports from the published package;
  - `SCN-193` now imports from the published package;
  - repeated `SCN-189` canary reruns remain green through this tranche;
- wave-50 through wave-53 syntheses are recorded in their respective `.tasks/prt-036-implementation-wave-5x-2026-04-21/summary/*` files;
- implementation stage: wave 54 completed;
- the next bounded mixed Docoved seam is now explicitly chosen after the single-scenario multi-format consumer tranche:
  - `refreshDocovedQualityReport` is the next best executable owner slice;
  - `docoved-shared.ts`, `SCN-205`, and `SCN-208` remain intentionally deferred as wider shared-helper/runtime-coupled contours;
- wave-54 synthesis is recorded in `.tasks/prt-036-implementation-wave-54-2026-04-21/summary/PRT-036-implementation-wave-54-synthesis.md`;
- implementation stage: wave 55 completed;
- the next bounded quality-refresh owner slice now lives in target repo state:
  - `docoved-agent/packages/sa-docoved` now owns the bounded `refreshDocovedQualityReport` + `quality-engine` slice in repo state;
  - broader helper-tail and core-coupled contours remain deferred;
- wave-55 synthesis is recorded in `.tasks/prt-036-implementation-wave-55-2026-04-21/summary/PRT-036-implementation-wave-55-synthesis.md`;
- implementation stage: wave 56 completed;
- the new quality-refresh owner slice is now materialized into release-shaped package state:
  - `@docoved-agent/sa-docoved` now sits at repo version `0.1.6`;
  - local release-prep checks are green for that version;
- wave-56 synthesis is recorded in `.tasks/prt-036-implementation-wave-56-2026-04-21/summary/PRT-036-implementation-wave-56-synthesis.md`;
- implementation stage: wave 57 completed as blocked discovery;
- the first bounded `SCN-210` cutover attempt correctly surfaced an owner-side runtime defect instead of being accepted as a broken consumer move:
  - published `@docoved-agent/sa-docoved@0.1.6` depended on a `process.cwd()`-coupled loader for `createMemoryBankResearchService`;
  - the failure is scoped to the owner-package runtime bridge, not to the already-landed published Docoved seam in general;
- wave-57 synthesis is recorded in `.tasks/prt-036-implementation-wave-57-2026-04-21/summary/PRT-036-implementation-wave-57-synthesis.md`;
- implementation stage: wave 58 completed;
- the runtime failure is now concretely diagnosed:
  - the broken assumption was filesystem/module resolution via `process.cwd()` under `pnpm --filter`, not a missing `@sales-agent/core` export;
  - later waves must prefer explicit dependency input over hidden root-path probing for temporary cross-repo bridges;
- wave-58 synthesis is recorded in `.tasks/prt-036-implementation-wave-58-2026-04-21/summary/PRT-036-implementation-wave-58-synthesis.md`;
- implementation stage: wave 59 completed;
- the owner-side corrective release-prep wave is now closed in `docoved-agent`:
  - `refreshDocovedQualityReport` now supports explicit `createMemoryBankResearchService` injection while preserving the legacy fallback loader for non-migrated callers;
  - repo version is now materialized as `@docoved-agent/sa-docoved@0.1.7`;
  - local release-prep checks are green for the exact versioned state;
- wave-59 synthesis is recorded in `.tasks/prt-036-implementation-wave-59-2026-04-21/summary/PRT-036-implementation-wave-59-synthesis.md`;
- implementation stage: wave 60 completed;
- the corrected quality-refresh seam is now really published and consumed through the real npm path:
  - PR `#7` merged the versioned release commit to `docoved-agent/main`;
  - `Release Packages` readiness and publish workflow both succeeded on the merge commit path for `0.1.7`;
  - `npm view @docoved-agent/sa-docoved version` now returns `0.1.7`;
  - `SCN-210` now passes on real published `@docoved-agent/sa-docoved@0.1.7` with explicit injection from `@sales-agent/core`;
  - `SCN-212`, `SCN-213`, and `SCN-189` remain green as canaries after the dependency bump;
- wave-60 synthesis is recorded in `.tasks/prt-036-implementation-wave-60-2026-04-21/summary/PRT-036-implementation-wave-60-synthesis.md`;
- implementation stage: wave 61 completed;
- the next bounded post-quality-refresh Docoved seam is now explicitly chosen:
  - the semantic-map export helper contour is the next best executable wave;
  - `SCN-205` is the primary consumer because it proves the shared semantic-map builder path directly;
  - `SCN-208` is the immediate canary because it uses the same builder through placement planning;
- wave-61 synthesis is recorded in `.tasks/prt-036-implementation-wave-61-2026-04-21/summary/PRT-036-implementation-wave-61-synthesis.md`;
- implementation stage: wave 62 completed;
- the semantic-map / placement owner slice now lives in target repo state and release-shaped package state:
  - `docoved-agent/packages/sa-docoved` now owns `buildDocovedSemanticMapFromFilesystem`, `exportSemanticMapArtifact`, and `planDocumentPlacement`;
  - the helper slice supports explicit `buildSemanticMapFromFilesystem` injection while preserving a local fallback loader for non-migrated callers;
  - repo version is now materialized as `@docoved-agent/sa-docoved@0.1.8`;
- wave-62 synthesis is recorded in `.tasks/prt-036-implementation-wave-62-2026-04-21/summary/PRT-036-implementation-wave-62-synthesis.md`;
- implementation stage: wave 63 completed;
- the semantic-map / placement helper slice is now really published and consumed through the real npm path:
  - PR `#8` merged the versioned release commit to `docoved-agent/main`;
  - `Release Packages` readiness and publish workflow both succeeded on the merge commit path for `0.1.8`;
  - `npm view @docoved-agent/sa-docoved version` now returns `0.1.8`;
  - `SCN-205` now uses the published semantic-map helper surface from `@docoved-agent/sa-docoved@0.1.8`;
  - `SCN-208` now uses the published placement surface from `@docoved-agent/sa-docoved@0.1.8`;
  - `SCN-210` and `SCN-189` remain green as canaries after the dependency bump;
- wave-63 synthesis is recorded in `.tasks/prt-036-implementation-wave-63-2026-04-21/summary/PRT-036-implementation-wave-63-synthesis.md`;
- implementation stage: wave 64 completed;
- the next bounded remaining Docoved seam is now explicitly reduced to the raw citation-node extraction contour:
  - `extractDocovedCitationNodes` was selected instead of a premature whole-file migration of `docoved-shared.ts`;
  - the first shared consumer target is `packages/scenario-runner/src/scenarios/docoved-shared.ts`;
  - broader scripts/runtime citation-resolution helpers remain intentionally deferred;
- wave-64 synthesis is recorded in `.tasks/prt-036-implementation-wave-64-2026-04-21/summary/PRT-036-implementation-wave-64-synthesis.md`;
- implementation stage: wave 65 completed;
- the citation-node extraction owner slice now lives in target repo state and release-shaped package state:
  - `docoved-agent/packages/sa-docoved` now owns `DocovedCitationNodeKind`, `DocovedCitationNode`, and `extractDocovedCitationNodes`;
  - repo version is now materialized as `@docoved-agent/sa-docoved@0.1.9`;
- wave-65 synthesis is recorded in `.tasks/prt-036-implementation-wave-65-2026-04-21/summary/PRT-036-implementation-wave-65-synthesis.md`;
- implementation stage: wave 66 completed;
- the citation-node extraction seam is now really published through the protected branch flow:
  - PR `#9` merged the versioned release commit to `docoved-agent/main`;
  - `Release Packages` readiness and publish workflow both succeeded on the merge commit path for `0.1.9`;
  - `npm view @docoved-agent/sa-docoved version` now returns `0.1.9`;
- wave-66 synthesis is recorded in `.tasks/prt-036-implementation-wave-66-2026-04-21/summary/PRT-036-implementation-wave-66-synthesis.md`;
- implementation stage: wave 67 completed;
- the first shared downstream consumer now uses the real published citation helper seam:
  - `packages/scenario-runner/src/scenarios/docoved-shared.ts` now consumes `extractDocovedCitationNodes`, `ingestMarkdownDocument`, and `validateIngestManifest` from `@docoved-agent/sa-docoved@0.1.9`;
  - `packages/scenario-runner` no longer depends on workspace `@sales-agent/sa-docoved`;
  - `SCN-179` and `SCN-180` are green on the cutover;
  - for sales-agent bounded scenario verification, the canonical repo-root command remains `pnpm scenario:run -- run <SCN-ID>`;
- wave-67 synthesis is recorded in `.tasks/prt-036-implementation-wave-67-2026-04-21/summary/PRT-036-implementation-wave-67-synthesis.md`;
- implementation stage: wave 69 completed;
- the next bounded citation-helper consumers after the first shared cutover are now explicitly selected:
  - `scripts/docoved-import-reviewed-corpus-snapshot.ts` comes before `scripts/docoved-corpus-acceptance.ts`;
  - `packages/core/src/runtime/memory-bank.ts` remains intentionally deferred as the broader runtime contour;
- wave-69 synthesis is recorded in `.tasks/prt-036-implementation-wave-69-2026-04-21/summary/PRT-036-implementation-wave-69-synthesis.md`;
- implementation stage: wave 70 completed;
- the first script consumer now uses the real published citation helper seam:
  - `scripts/docoved-import-reviewed-corpus-snapshot.ts` now consumes `extractDocovedCitationNodes` from `@docoved-agent/sa-docoved`;
  - the stronger beta dry-run reaches real corpus processing and currently fails only on an external missing-artifact blocker in `br-kb-reglaments`;
- wave-70 synthesis is recorded in `.tasks/prt-036-implementation-wave-70-2026-04-21/summary/PRT-036-implementation-wave-70-synthesis.md`;
- implementation stage: wave 71 completed;
- the second script consumer now also uses the real published citation helper seam:
  - `scripts/docoved-corpus-acceptance.ts` now consumes `extractDocovedCitationNodes` from `@docoved-agent/sa-docoved` while keeping `DEFAULT_ANTHROPIC_*` on `@sales-agent/core`;
  - the script help path is green on the updated import;
- wave-71 synthesis is recorded in `.tasks/prt-036-implementation-wave-71-2026-04-21/summary/PRT-036-implementation-wave-71-synthesis.md`;
- implementation stage: wave 73 completed;
- the first runtime extraction consumer now uses the real published citation helper seam:
  - `packages/core/src/runtime/memory-bank.ts` now consumes `extractDocovedCitationNodes` from `@docoved-agent/sa-docoved`;
  - `@sales-agent/core` typecheck, `SCN-179`, and `SCN-180` are green on the cutover;
- wave-73 synthesis is recorded in `.tasks/prt-036-implementation-wave-73-2026-04-21/summary/PRT-036-implementation-wave-73-synthesis.md`;
- implementation stage: wave 74 completed;
- the next bounded owner-side seam is now explicitly selected as the broader citation-resolution helper contour:
  - `DocovedLocatorSource`, resolved source-ref types, locator rendering, and source-ref builders move next;
  - `SCN-215` is the first downstream consumer target after the owner move;
- wave-74 synthesis is recorded in `.tasks/prt-036-implementation-wave-74-2026-04-21/summary/PRT-036-implementation-wave-74-synthesis.md`;
- implementation stage: wave 75 completed;
- the broader citation-resolution owner slice now lives in target repo state and release-shaped package state:
  - `docoved-agent/packages/sa-docoved` now owns the citation-resolution helper contour;
  - repo version is now materialized as `@docoved-agent/sa-docoved@0.1.10`;
- wave-75 synthesis is recorded in `.tasks/prt-036-implementation-wave-75-2026-04-21/summary/PRT-036-implementation-wave-75-synthesis.md`;
- implementation stage: wave 76 completed;
- the broader citation-resolution seam is now really published through the protected branch flow:
  - PR `#10` merged the versioned release commit to `docoved-agent/main`;
  - `Release Packages` readiness and publish workflow both succeeded on the merge commit path for `0.1.10`;
  - `npm view @docoved-agent/sa-docoved version` now returns `0.1.10`;
- wave-76 synthesis is recorded in `.tasks/prt-036-implementation-wave-76-2026-04-21/summary/PRT-036-implementation-wave-76-synthesis.md`;
- implementation stage: wave 77 completed;
- the first downstream consumer now uses the broader published citation-resolution seam:
  - `SCN-215` now consumes `createDocovedResolvedSourceRef` and `createDocovedDocumentLevelSourceRef` from `@docoved-agent/sa-docoved@0.1.10`;
  - `SCN-215` is green on the cutover;
- wave-77 synthesis is recorded in `.tasks/prt-036-implementation-wave-77-2026-04-21/summary/PRT-036-implementation-wave-77-synthesis.md`;
- implementation stage: wave 79 completed;
- bounded scout verification corrected the stale post-`SCN-215` tail:
  - `docoved-answer-artifact.ts` was already cut over in the live checkout by the time the scout closed;
  - the next bounded runtime consumer was confirmed as `research-workflow.ts`, with `SCN-186` and `SCN-195` selected as the primary anchors;
- wave-79 synthesis is recorded in `.tasks/prt-036-implementation-wave-79-2026-04-21/summary/PRT-036-implementation-wave-79-synthesis.md`;
- implementation stage: wave 80 completed;
- the Docoved answer-artifact runtime path now uses the broader published citation-resolution seam:
  - `packages/core/src/runtime/docoved-answer-artifact.ts` now consumes citation-resolution helpers from `@docoved-agent/sa-docoved@0.1.10`;
  - `packages/core` now explicitly depends on `@docoved-agent/sa-docoved@0.1.10`;
  - `SCN-186` and `SCN-215` are green on the cutover;
- wave-80 synthesis is recorded in `.tasks/prt-036-implementation-wave-80-2026-04-21/summary/PRT-036-implementation-wave-80-synthesis.md`;
- implementation stage: wave 81 completed;
- the live Docoved workflow fallback now uses the broader published citation-resolution seam:
  - `packages/core/src/runtime/research-workflow.ts` now consumes `buildDocovedResolvedSourceRefs` and `DocovedResolvedSourceRef` from `@docoved-agent/sa-docoved@0.1.10`;
  - `SCN-186` and `SCN-195` are green on the cutover;
- wave-81 synthesis is recorded in `.tasks/prt-036-implementation-wave-81-2026-04-21/summary/PRT-036-implementation-wave-81-synthesis.md`;
- implementation stage: wave 82 completed;
- the remaining scenario-side simulated fallback now also uses the broader published citation-resolution seam:
  - `packages/core/src/runtime/providers/simulated-response.ts` now consumes `buildDocovedResolvedSourceRefs` from `@docoved-agent/sa-docoved@0.1.10`;
  - `SCN-186` and `SCN-195` are green on the cutover;
- wave-82 synthesis is recorded in `.tasks/prt-036-implementation-wave-82-2026-04-21/summary/PRT-036-implementation-wave-82-synthesis.md`;
- implementation stage: wave 83 completed;
- the transitional compatibility export for the broader citation-resolution seam is now also routed to the published package:
  - `packages/core/src/index.ts` now re-exports `buildDocovedDocumentMachineLocator`, `buildDocovedResolvedSourceRefs`, `createDocovedDocumentLevelSourceRef`, and `createDocovedResolvedSourceRef` from `@docoved-agent/sa-docoved@0.1.10`;
  - `@sales-agent/core` `typecheck` and `build`, plus `SCN-215`, are green on the cutover;
- wave-83 synthesis is recorded in `.tasks/prt-036-implementation-wave-83-2026-04-21/summary/PRT-036-implementation-wave-83-synthesis.md`;
- the next protocol revision pass must focus on:
  - choosing the next bounded local cleanup tail after the completed citation-resolution consumer waves;
  - planning the later helper-tail/security retirement contour for `@selleragent/shared` separately from the completed moved-symbol cleanup;
  - progressively renaming or retiring the remaining transitional `@sales-agent/*` packages as their seams migrate;
  - reliability, migration, verification, and CI/CD gates for later code-moving waves.

## Key decisions / deviations

- Decision: `bot-platform` is a framework/product-support repo, not a multi-tenant shared runtime serving both SellerAgent and Docoved as one live instance.
- Decision: auth/users live in `bot-platform` only as framework contracts, helpers, guards, and lifecycle patterns; each product owns its own actual user/auth tables and runtime authority data.
- Decision: Telegram slash commands and comparable system-command mechanics live in `bot-platform` as a command framework plus command contract vocabulary; product-specific commands, handlers, and enablement policies live in product repos.
- Decision: workflow core belongs in `bot-platform`, but concrete workflow hosts and workflow deployments remain product-local.
- Decision: the current dependency bridge from `bot-platform` into product repos is public scoped npm for accepted framework-safe slices under `@dd-bot-platform/*`; vendoring is allowed only as a narrow, time-boxed exception.
- Decision: DB ownership is product-local by default; framework repos do not own product tables.
- Decision: CI/CD is product-local by default; Vercel configuration should become simpler by giving each product repo its own deploy lifecycle.
- Decision: if a feature is needed by both SellerAgent and Docoved, it graduates into `bot-platform` only after its boundary is clear enough to be framework code rather than one product's accidental abstraction.
- Decision: legacy SellerAgent Python is retained only in git history, not as live source.

## Implementation Operating Model

This protocol is now also the implementation contract for the split program, not only its planning frame.

Implementation rule:
- broad code movement must be driven by bounded execution slices;
- bounded execution slices may be delegated to subagents only through explicit task files under `.tasks/**`;
- every delegated slice must be verification-ready, not just "apparently done".

### Delegation packet rule

Each delegated slice must have:
- one task file in `.tasks/<wave>/tasks/`;
- one output report in `.tasks/<wave>/reports/`;
- one clear primary write scope;
- one explicit done definition;
- one explicit verification contour.

Do not delegate by chat summary alone.

### Subagent launch rule

Before launching a worker or verifier subagent, the main agent must ensure that the selected model/provider is actually available in the local execution environment.

Operational rule:
- prefer a known-good locally supported model when one is already established for the workspace;
- if provider support is uncertain, omit the override or choose the most conservative supported default;
- treat subagent launch failures as operational lessons and record them in the active wave workspace when they reveal a reusable protocol risk.

### Task-file standard

Task files must reuse MBB/delivery discipline rather than inventing a separate document type.

Every implementation-phase task file must include:
- `Purpose`
- `Task type`
- `Scope of this task`
- `Context to gather before analysis`
- `Questions to answer`
- `Required output`
- `Constraints and design logic`
- `What to avoid`
- `Done criteria`
- `Verification expectations`
- `Report format`

Target-repo MBB reference rule:
- when a task points workers at mirrored MBB standards inside `bot-platform`, `selleragent`, or `docoved-agent`, use the actual mirrored path `.memory-bank/mbb/**`;
- do not point workers at repo-root `mbb/**` unless that repo truly contains such a root-level path.

Task type must be one of:
- `implementation`
- `research`
- `verification`
- `documentation-only`

Task-file rule:
- if the task does not have explicit scope, context, done criteria, and verification expectations, it is not implementation-ready and must be treated as a research/planning slice first.

### Mandatory grounding before execution

Before making edits or normative claims, a subagent must:
- read the task file in full;
- read every mandatory context file referenced by the task;
- inspect the directly affected code/doc surfaces;
- preserve or state material assumptions;
- stop for a narrowing/research pass if unresolved ambiguity can change:
  - contract shape;
  - ownership boundary;
  - rollout model;
  - acceptance contour.

### Task hygiene and anti-drift rules

A subagent must not:
- silently expand scope beyond the task boundary;
- edit unrelated files;
- modify other subagent reports;
- rewrite the governing protocol unless explicitly assigned;
- use destructive git actions;
- mark work complete without a verification-ready report.

Adjacent issues may be reported as follow-up items, but not silently absorbed into the task.

## Git And Worktree Discipline

This protocol must execute inside the project's existing git-flow rather than inventing a repo-split-specific branch model.

### Branching baseline

Until the split is complete, the source-repo canonical rules remain:
- `feature/*` branches start from `develop`;
- `hotfix/*` branches start from `main` only for true production repair;
- direct pushes to `develop` and `main` are forbidden;
- merges to protected branches happen through PRs, with merge commits as the normal path.

Practical rule for this protocol:
- docs-only and research waves may stay local until review-ready;
- executable waves that need protected-branch evidence must flow through `feature/* -> develop`;
- any later production promotion follows `develop -> main`, not cherry-picks from feature branches.

### Worktree rule

Every active implementation stream in this protocol should use:
- its own feature branch;
- its own git worktree when parallel work is active;
- a bounded ownership area that does not overlap another live stream unless the protocol explicitly sequences that overlap.

The repo split must not be run as several unrelated waves inside one shared dirty worktree.

### Commit rule

Commits should be made:
- after a bounded slice reaches a coherent local checkpoint;
- before handoff to a verifier or another subagent;
- before opening or updating a PR for a protected-branch merge.

Do not:
- batch unrelated slices into one commit;
- leave substantial delegated work uncommitted when another slice depends on it;
- rewrite history on protected branches.

## Push, CI, And Hosted Build Policy

This protocol must distinguish local iteration, GitHub verification, and hosted deployment triggers.

### Push rule

Push when at least one of the following is true:
- the slice is ready for PR review;
- GitHub checks are needed as part of the wave-closure evidence;
- a hosted preview or beta/prod deployment is intentionally required for the next verification stage;
- the work must be shared across worktrees or repos as an approved dependency slice.

Do not push just to "save progress" if the push would trigger irrelevant hosted build churn or remote noise.

### GitHub CI rule

For this source repo, the minimum remote checks to inspect are:
- `Verification`
- `Release Packages`

Interpretation rule:
- `Verification` is the main protected-branch health signal;
- `Release Packages` on push to `develop` is release-readiness validation, not proof that a hosted environment already runs the change.

Wave-closure rule:
- if a wave is pushed for remote verification, the relevant GitHub checks must end green before the wave is considered closure-ready;
- if a check is intentionally not relevant, record `N/A` with reason in the evidence rather than omitting it;
- if CI fails, the protocol requires fixing the issue or explicitly re-scoping the wave before promotion continues.

### Hosted build rule

Hosted builds are not run by default just because code changed.

Operational policy:
- do not merge/push into a branch mapped to a hosted environment unless the slice is actually ready for hosted verification or deployment progression;
- do not use Vercel builds as a substitute for local build/typecheck discipline;
- docs-only, planning-only, and purely local refactor waves should usually stop before hosted build triggers.

Preview builds may be used for targeted review when the wave truly needs preview evidence, but preview is not a substitute for beta acceptance.

## Local Verification Baseline

Every executable wave must plan the smallest honest local gate before any deploy-facing action.

Default source-repo baseline for code waves:
- `pnpm build`
- `pnpm audit:no-console`
- `pnpm verify:security` when DB/auth/data surfaces are touched
- relevant `typecheck`, package-local tests, and scenario checks for the changed slice
- `pnpm scenario:tier:premerge` or a narrower justified equivalent when the wave targets the protected-branch verification contour

Convenience rule:
- `pnpm verify:premerge` is the canonical combined pre-merge baseline when its full scope is appropriate for the wave.

Closure rule:
- red local checks are not carried forward into PR, beta, or prod stages as "known issues";
- the protocol must explicitly budget repair work for problems discovered by lint/build/typecheck/tests/scenarios.

## Deployment And Hosted Verification Policy

Hosted deployment work in this protocol must follow the project's existing operations docs, not ad hoc branch folklore.

### Beta trigger rule

Deploy or merge toward `develop` when both are true:
- the wave passed its required local verification class;
- there is an actual need to run hosted beta proof for the scoped scenarios or runtime surfaces.

Do not treat beta deployment as a routine heartbeat step for every wave.

### Beta deploy truth rule

For hosted beta acceptance, proof must come from the actual stable beta surface:
- verify the aliased deployment pair for the affected surface;
- verify environment identity through the live beta alias and health/readback checks;
- record deployment ids/URLs or alias evidence;
- then run the hosted scenario pack.

Do not accept as sufficient proof:
- a green package workflow alone;
- a preview URL;
- branch intention without alias verification.

### Hosted scenario rule

When beta acceptance is required, the protocol must plan:
- hosted preflight first;
- bootstrap/session path second;
- `beta_api` assertions as the default business-truth layer;
- `beta_ui` as a thin UI proof layer when needed;
- `beta_external_manual` only where a true external system or live channel is unavoidable.

Hosted scenario planning should explicitly name which scenario set is expected on deploy and why.

### Migration and backup gate

For auth, DB, workflow-host, storage/provider, or webhook-sensitive waves, the protocol must explicitly decide:
- whether the wave is schema- or migration-dependent;
- whether backward compatibility or a migration-first path is being used;
- whether dangerous-migration backup requirements apply;
- which rollback or containment note must be captured before promotion.

For SellerAgent-contour hosted rollouts in the current source repo, this means aligning with:
- schema compatibility gate from the operations runbook;
- dangerous migration backup gate and freeze/drain rules where relevant;
- `sa-admin rollout` / rollout evidence flow for production promotion.

### Prod promotion rule

Production promotion is a separate governed step, not an automatic consequence of beta success.

If the protocol wave is later promoted:
- promotion must follow the source project's `develop -> main` PR path;
- beta acceptance must already be green for the in-scope hosted scenarios;
- production rollout must use the production rollout runbook and keep post-release proof narrow, non-destructive, and separately recorded.

## Lessons Learned And Insights Discipline

This protocol must capture reusable non-obvious findings during research, implementation, verification, deployment, and documentation work.

### Run-folder artifact rule

Each active protocol run folder should keep a `lessons/` area with monotonic zero-padded files such as:
- `lessons/001-lessons-learned.md`
- `lessons/002-lessons-learned.md`
- `lessons/003-insights.md`

### Trigger rule

Create or extend the next numbered lesson/insight artifact when execution reveals:
- a missing or incorrect runbook step;
- a code constraint that was not documented but materially affects future work;
- a documentation claim that proved false or incomplete;
- a reusable deployment, verification, migration, or tooling insight;
- a non-obvious failure mode that required investigation.

### Content rule

These artifacts must:
- avoid diary/history style;
- avoid raw log dumping;
- state the reusable truth, when it matters, and what action follows;
- name the owning SSoT that should absorb the knowledge if it is long-lived.

This follows the MBB principle that reusable knowledge should end up in the correct owning runbook/spec/guide/protocol rather than living only in transient notes.

### Closeout rule

Lessons/insights files are execution artifacts, not the final SSoT.

Before protocol closeout:
- accepted long-lived lessons must be folded into the owning Memory Bank document;
- the run-folder artifact remains as evidence/routing support, not as the sole home of that knowledge.

Stage-closeout rule:
- every stage that produced accepted lessons/insights must include an explicit `MBB routing decision`;
- the closeout note must say which Memory Bank document absorbed each accepted finding, or why the finding was intentionally deferred;
- "captured only in lessons file" is not an acceptable final state for long-lived knowledge.

### MBB routing rule

When folding accepted findings back into Memory Bank, route them by MBB ownership:
- `spec` when the finding changes design truth, boundaries, contracts, invariants, or data ownership;
- `scenario` when the finding changes verification logic, scenario expectations, evidence paths, or acceptance contours;
- `runbook` when the finding changes operational procedure, deploy order, migration handling, rollback, or diagnostics;
- `guide` when the finding changes a user/operator task path;
- `ADR` when the finding establishes or corrects a long-lived architectural decision;
- `mbb` when the finding changes the documentation rules themselves.

The executor or verifier who records the finding must propose this routing in the lesson/insight artifact.

### Mandatory subagent instruction

Every worker and verifier subagent launched under this protocol must be told explicitly:
- which git-flow and runbook documents to read before starting;
- whether the task is allowed to trigger pushes, PRs, preview deploys, beta deploys, or prod promotion;
- which local checks, scenario layers, and hosted checks belong to the task;
- that they must create or extend the next numbered lesson/insight file when they uncover a reusable non-obvious finding;
- that they must propose the owning Memory Bank destination for each accepted finding using the `spec / scenario / runbook / guide / ADR / mbb` routing model;
- that they must not leave such findings only in chat or only inside their executor/verifier report.

## Subagent Verification Workflow

Every delegated implementation slice must be independently reviewed.

### Roles

- `executor subagent`
  - performs the bounded task;
  - writes the executor report;
  - records checks/evidence or explicit `N/A` notes.
- `verifier subagent`
  - reads the task file, executor report, and actual changed files;
  - applies the review checklist;
  - returns a bounded verdict.
- `main agent`
  - decides integration, escalation, and protocol impact;
  - owns cross-slice and cross-repo decisions.

### Verifier inputs

The verifier must read, at minimum:
- the source task file;
- the executor report;
- the actual changed files/diff;
- the relevant standards referenced by the task;
- any checks/evidence artifacts claimed in the executor report.

### Verifier verdicts

Verifier must return one of:
- `PASS`
- `PARTIAL`
- `FAIL`
- `DRIFT`
- `LOW-CONFIDENCE`

Meaning:
- `PASS`
  - task requirements are met and checks/evidence are sufficient.
- `PARTIAL`
  - the main slice is complete, but a bounded follow-up remains.
- `FAIL`
  - required outputs or checks are materially missing or broken.
- `DRIFT`
  - work escaped the task boundary or violated explicit constraints.
- `LOW-CONFIDENCE`
  - the result may be directionally correct, but the verifier cannot confirm it with sufficient evidence.

### Mandatory review checklist

Verifier review must cover:
- task alignment against `Done criteria`;
- report-to-repo integrity;
- code/doc quality for the touched slice;
- scenario/contract/evidence expectations;
- security / rollout / exposure impact where relevant;
- hosted or CI evidence where relevant.

No claimed check may be omitted silently:
- if a check was not run or cannot be run, the report must say `N/A` with a reason.

## Execution Graph And Parallel Lanes

The split program is not purely sequential.
It should run through bounded parallel lanes with an explicit critical path.

### Critical path before broad code extraction

The following must be closed before Wave 2 broad code movement:
1. `D-02` and `R-036-02` dependency bridge decision
2. canonicalization of `CB-*` contract docs
3. `FM-01..FM-03`
4. `SCN-MIG-01..SCN-MIG-03` and `TR-01`
5. acceptance of the relevant `X-*` extraction design tasks

### Parallel lanes

Recommended bounded lanes:
- `Platform lane`
  - `bot-platform` contract docs, framework feature model, framework scenario-system baseline, framework doc migration, framework extraction design.
- `SellerAgent lane`
  - SellerAgent product overlays, feature/scenario/doc migration, product extraction design.
- `Docoved lane`
  - Docoved product overlays, feature/scenario/doc migration, product extraction design.
- `Source-transition lane`
  - `sales-agent` migration stubs, source routing, archive/move checklists.
- `Ops lane`
  - Vercel/Supabase/CI ownership plan, deploy-cutover checklist, hosted proof model.

### Task sizing rule

Implementation tasks must stay subagent-friendly:
- one bounded concern per task;
- one primary write scope per task;
- avoid mixing docs migration and code migration in one slice;
- avoid giant tasks like "migrate all SellerAgent docs" or "split all mixed packages".

### Local-only tasks

The following should remain main-agent owned unless there is a narrow supporting subtask:
- final bridge decision and package-consumption strategy;
- final canonical contract acceptance;
- broad mixed-package moves;
- cross-repo CI/CD and secrets decisions;
- final hosted cutover and rollback decisions.

## Verification Model By Wave Type

This protocol now distinguishes verification classes by wave type.

### `doc wave`

Used for:
- docs migration;
- protocol refinement;
- index/stub/router work;
- traceability-only updates.

Required verification:
- doc consistency and link integrity where touched;
- frontmatter/index consistency where touched;
- explicit note that runtime/code/deploy checks are `N/A`, when true.

Hosted proof:
- not required by default.

### `local-only code wave`

Used for:
- internal refactors;
- bounded support-package cleanup;
- local tooling changes;
- implementation slices that do not affect hosted/runtime-facing behavior.

Required verification:
- build/typecheck/static-policy checks for the touched slice;
- relevant local tests or contract checks;
- relevant local scenario smoke where applicable.

Hosted proof:
- not required unless the change implicitly affects hosted/runtime-facing behavior.

### `framework extraction wave`

Used for:
- framework-owned `bot-platform` extraction or publishable seam work.

Required verification:
- build/typecheck/static-policy checks;
- framework contract tests;
- repo-local regression pack;
- updated ownership and evidence docs.

Hosted proof:
- required if the extracted seam materially changes hosted contracts consumed by a product contour.

### `product cutover wave`

Used for:
- real SellerAgent or Docoved product-surface transfer to target repo ownership.

Required verification:
- build/typecheck/static-policy checks;
- relevant product scenario pack;
- contract checks for touched seams;
- hosted beta acceptance.

Hosted proof:
- mandatory.

### `migration-sensitive wave`

Used for:
- DB ownership changes;
- workflow-host split/cutover;
- storage/provider rewiring;
- auth/session cutover;
- channel or webhook migration.

Required verification:
- build/typecheck/static-policy checks;
- contract checks;
- split migration smoke;
- relevant scenario pack;
- rollout and rollback notes;
- migration/backward-compatibility decision record;
- backup/preflight evidence where the runbook requires it;
- hosted beta acceptance.

Hosted proof:
- mandatory.

## Verification Stages

Verification is staged, not flat.

### `local`

Required for every wave.
Must cover the smallest honest contour for the touched slice.

### `pre-merge`

Required for every executable wave merged to a protected branch.
Must include the repo-local pre-merge gate and relevant scenario or contract coverage.

### `beta`

Required for:
- externally-facing waves;
- runtime/auth/channel/provider waves;
- migration-sensitive waves;
- product cutover waves.

Hosted acceptance must be:
- `beta_api` first where possible;
- `beta_ui` as thin supplementary proof;
- `beta_external_manual` only for true external/live-channel flows.

### `prod-safe smoke`

Required only after promotion to `main` for hosted-impact waves.
Must stay narrow and non-destructive.

## Evidence Contract

Every implementation wave must record:
- task/wave class;
- commit or PR linkage;
- local checks run and outcome;
- scenario or contract evidence where relevant;
- explicit `N/A` reasons for non-applicable checks.

Hosted-required waves must additionally record:
- target environment(s);
- deployment or alias reference;
- environment identity proof;
- hosted verdict by layer;
- GitHub workflow ids/status for the pushed commit or merge commit;
- Vercel deployment status and stable-alias proof where applicable;
- rollback / containment note where relevant.

Migration-sensitive waves must additionally record:
- split migration smoke evidence;
- compatibility-window note;
- migration authority note;
- backup/preflight evidence when applicable;
- rollback or recovery note.

## Target repository topology

### `bot-platform`

Role:
- framework monorepo;
- reusable contracts, kernels, support packages, and tooling;
- no shared product data;
- no shared live product deployment.

Expected contents:
- platform execution/kernel abstractions;
- auth/access framework;
- command framework;
- workflow framework;
- framework-level contracts and SDK helpers;
- observability/config/prompt support packages;
- scenario/evidence framework pieces that are not product-specific;
- documentation and Memory Bank for platform truth only.

### `selleragent`

Role:
- SellerAgent product monorepo;
- owns SellerAgent web app, bot, server surfaces, workflows, DB, deploys, and runbooks.

Expected contents:
- SellerAgent product surfaces;
- SellerAgent product DB schema and repositories;
- SellerAgent-specific runtime policies, prompts, domains, and workflows;
- SellerAgent product Memory Bank, specs, features, and operational runbooks;
- archived non-Memory-Bank SellerAgent docs where still needed.

### `docoved-agent`

Role:
- Docoved product monorepo;
- owns Docoved runtime, knowledge publication/product surfaces, workflows, DB, deploys, and runbooks.

Expected contents:
- Docoved product surfaces and operators;
- Docoved ingest/publication/runtime code;
- Docoved product DB schema and repositories;
- Docoved product Memory Bank, specs, features, and hosted runbooks.

## Boundary rules

### Framework versus product

Move code to `bot-platform` only when both conditions hold:
1. the mechanism is product-agnostic or has at least two real product consumers;
2. the framework API can be described without SellerAgent-specific or Docoved-specific domain truth.

Otherwise the code remains product-local.

### Auth and users

`bot-platform` owns:
- auth framework primitives;
- user/account abstractions;
- guards, sessions, adapters, and policy interfaces;
- test helpers and extension points.

Product repos own:
- concrete tables;
- concrete migrations;
- product membership semantics;
- product authority projections;
- deploy-time auth wiring and secrets.

### System commands

`bot-platform` owns:
- command envelope shape;
- parser/registry primitives;
- command execution hooks;
- common diagnostics patterns.

Product repos own:
- actual commands;
- channel/product enablement;
- permission mapping;
- command side effects and read models.

### Workflow

`bot-platform` owns:
- workflow framework;
- durable-step conventions;
- resumability/retry helpers;
- common workflow instrumentation;
- generic workflow test harnesses.

Product repos own:
- workflow hosts;
- workflow deployment units;
- workflow storage bindings;
- workflow commands and business steps.

### Data and deployment

There is no shared live `bot-platform` DB or workflow service by default.

Each product repo owns:
- database;
- migrations;
- secrets;
- Vercel projects;
- runtime workers;
- hosted acceptance;
- rollback procedures.

## Repository Rebinding And Secret Separation Policy

The split is not complete when code moves.
It is complete only when runtime ownership, deploy ownership, and secret ownership are rebound to the correct repo.

### Rebinding rule

Every live integration currently attached to the mixed repo must be classified as one of:
- `move to bot-platform`
- `move to selleragent`
- `move to docoved-agent`
- `retire with the mixed repo`

This classification must be captured in a governed rebind matrix before the corresponding cutover wave starts.

### Required rebind matrix

The protocol must maintain an explicit `repo rebind and deploy ownership matrix` covering, at minimum:
- integration or hosted surface name;
- current repo / current owner;
- target repo / target owner;
- provider:
  - GitHub
  - Vercel
  - Supabase
  - Telegram
  - other runtime provider when relevant;
- environment:
  - local
  - preview
  - beta
  - prod;
- current project/account identifier;
- target project/account identifier;
- branch mapping or production-branch rule;
- domains / aliases / webhook endpoints when relevant;
- required secret family;
- cutover action;
- prerequisites;
- verification proof;
- rollback path;
- source-side decommission action.

The protocol must not rely on "we will remember how this is wired later".

### GitHub and hosting rebind scope

For repo/hosting ownership, the matrix must explicitly cover:
- GitHub repository ownership of each active product contour;
- branch protection and protected-branch CI expectations;
- Vercel project linkage per target repo;
- production-branch mapping for each hosted project;
- domain and alias ownership;
- hosted workflow projects and their environment-specific aliases.

### Supabase and data-platform scope

For persistence ownership, the matrix must explicitly cover:
- which Supabase project/account belongs to `selleragent`;
- which Supabase project/account belongs to `docoved-agent`;
- whether any mixed-repo operational access still exists temporarily;
- when and how temporary mixed-repo access is revoked;
- which migration or reconcile path proves the target contour is authoritative.

### Secret inventory rule

The protocol must keep a `secret inventory and split matrix` for all live environments touched by the split.

Each secret entry must record:
- secret name or canonical alias;
- secret class:
  - framework configuration
  - product runtime secret
  - deploy/infrastructure credential
  - provider credential
  - backup/crypto material
  - operator-only local secret;
- owning repo;
- owning product contour;
- owning environment(s);
- consumer surfaces;
- whether duplication is allowed or forbidden;
- whether rotation is required at cutover;
- target storage location;
- source-side decommission rule;
- verification proof after migration.

### Secret ownership rules

Default rule:
- `bot-platform` may define secret contracts and configuration interfaces;
- live product secrets belong to product repos, not to `bot-platform`.

Therefore:
- SellerAgent runtime secrets must end up under `selleragent`-owned projects and inventories;
- Docoved runtime secrets must end up under `docoved-agent`-owned projects and inventories;
- no long-lived shared live secret should remain jointly owned across both products unless a protocol-level exception is documented and justified.
- during split waves, avoid silent cross-contour fallback from generic env names into another product contour's credential inventory;
- if temporary aliasing remains, the wave must record explicit proof that the intended product-local credential path won at runtime.

### Rotation and decommission rule

Secret migration is not just copy/paste.

For each secret family the cutover plan must state one of:
- `copy only`
- `copy and rotate`
- `re-issue new credential`
- `retire`

Rotation or re-issue is required when:
- the secret was previously exposed to a broader mixed-repo contour than the future owner;
- the provider supports safe re-issuance and the old credential should not remain valid;
- the secret protected a contour that is changing repo/operator ownership.

After target verification is green:
- remove, disable, or revoke the source-side secret from the non-owning repo/project/inventory;
- record the decommission proof;
- treat lingering source-side access as an incomplete split.

### Stage closeout gate for rebinds

No deploy-cutover stage is complete until:
- the rebind matrix entries for the in-scope surfaces are filled;
- target repo/project ownership is live and verified;
- required secrets exist in the new owner location;
- required rotations/re-issues are complete;
- source-side secrets and obsolete project bindings are removed, disabled, or explicitly time-boxed as transition exceptions;
- the closeout evidence names what still remains transitional, if anything.

## Current repository decomposition map

### Primary candidates for `bot-platform`

- `packages/observability`
- `packages/platform-config`
- framework-level slices of `packages/prompt-catalog`
- framework-level slices of `packages/api-contract`
- framework-level slices of `packages/client-sdk`
- framework-level slices of `packages/core`
  - execution-kernel abstractions
  - shared channel/runtime framework seams
  - auth/access framework pieces
  - command framework pieces
  - workflow framework pieces
- framework/evidence slices of `packages/scenario-runner`
- `packages/ui-contract` if it remains truly cross-product
- extracted generic utilities from `packages/shared`, followed by shrink/removal of `shared`

### Primary candidates for `selleragent`

- `apps/web` as SellerAgent web/control surface unless a route subset is explicitly Docoved-owned
- SellerAgent product server and ingress slices extracted from `apps/server`
- SellerAgent workflow host extracted from `apps/workflow`
- `packages/sa-admin`
- `packages/sa-judge`
- SellerAgent domains now living inside `packages/core`, especially:
  - `customers`
  - `commerce`
  - seller memory/handoff/follow-up logic
  - seller reply/runtime policies
- SellerAgent DB slices now living inside `packages/db`
- SellerAgent prompts and product-local operations/docs currently mixed into root materials

### Primary candidates for `docoved-agent`

- Docoved product server and ingress slices extracted from `apps/server`
- Docoved workflow host extracted from `apps/workflow`
- `packages/sa-docoved`
- `packages/dv-admin`
- Docoved runtime and publication slices inside `packages/core`
- Docoved DB slices inside `packages/db`, including:
  - `docoved-ingest-store`
  - `docoved-projection-store`
  - `docoved-snapshot-store`
  - `docoved-quality-job-store`
- Docoved hosted runbooks and acceptance tooling

### Archive, drop, or relocate

- legacy SellerAgent Python:
  - archived in git history;
  - removed from active mainline;
  - future home only if intentionally imported into the SellerAgent product archive.
- non-Memory-Bank root markdown documents:
  - inventory individually;
  - relocate into the owning product repo or archive folder;
  - do not leave them as mixed-root truth after the split.
- `packages/shared`:
  - transitional only;
  - should shrink through extraction rather than being copied wholesale into a new repo.

## Memory Bank split rules

Each resulting repo must own its own `.memory-bank`.

### `bot-platform/.memory-bank`

Owns:
- platform specs;
- framework boundaries;
- package contracts;
- framework features;
- platform runbooks;
- framework release notes and migration notes.

Must not own:
- SellerAgent product truth;
- Docoved product truth;
- product-specific operator runbooks.

### `selleragent/.memory-bank`

Owns:
- SellerAgent specs;
- SellerAgent product features;
- SellerAgent runbooks;
- SellerAgent deployment topology;
- SellerAgent CI/CD and operational guides;
- SellerAgent legacy/archive notes if still relevant.

### `docoved-agent/.memory-bank`

Owns:
- Docoved specs;
- Docoved product features;
- Docoved runbooks;
- Docoved deployment topology;
- Docoved operational knowledge publication guidance.

Protocol follow-up rule:
- once this split starts landing, the temporary cross-repo truth captured here must be decomposed into repo-local specs and features inside each owning repo.

## Memory Bank redesign task program

This protocol now treats Memory Bank redesign as a first-class Wave 1 workstream.

Goal:
- make each target repo immediately usable as a repo-local documentation home;
- stop the current `sales-agent/.memory-bank` from remaining a mixed multi-owner SSoT;
- move MBB and indexing rules into a stable, repeatable operating model across all three repos.

### MB-01: Shared MBB and standards pack

Primary output:
- define the canonical `mbb/` and shared-standards distribution policy for all three repos.

Task:
- `bot-platform` becomes the canonical upstream for `.memory-bank/mbb/**`;
- `selleragent` and `docoved-agent` receive exact mirrors of the full `.memory-bank/mbb/**` subtree;
- `git-flow.md` is the only non-MBB doc approved for exact mirroring as the initial shared standards extension;
- adjacent standards docs are classified as either:
  - platform-canonical reference docs;
  - or split into a platform standard plus repo-local overlays.

Deliverables:
- `MBB pack plan`
- mirror/sync policy
- whitelist of exact mirrors vs split standards

### MB-02: `bot-platform` Memory Bank skeleton

Primary output:
- create the initial framework-only Memory Bank shape for `bot-platform`.

Task:
- define repo-local root/index structure for:
  - `.memory-bank/index.md`
  - `.memory-bank/spec/index.md`
  - `.memory-bank/plans/index.md`
  - `.memory-bank/guides/index.md`
  - `.memory-bank/mbb/index.md`
- keep platform-only truth in this repo:
  - architecture
  - project/repo structure
  - client API and SDK contracts
  - scenario system
  - framework protocols
  - canonical MBB
- explicitly exclude SellerAgent and Docoved product truth.

Must-have docs:
- architecture hub
- project/repo structure docs
- runtime/framework contract docs
- planning hubs
- shared guides/reference standards
- canonical `mbb/`

### MB-03: `selleragent` Memory Bank skeleton

Primary output:
- create the initial product-local Memory Bank shape for `selleragent`.

Task:
- define repo-local root/index structure for:
  - `.memory-bank/index.md`
  - `.memory-bank/spec/index.md`
  - `.memory-bank/plans/index.md`
  - `.memory-bank/guides/index.md`
  - `.memory-bank/scenarios/index.md`
  - `.memory-bank/mbb/index.md`
- keep SellerAgent-owned truth only:
  - customers
  - commerce
  - seller runtime semantics
  - seller operations/security/ui
  - business-profile/operator guides
  - seller plans/protocols/scenarios
- treat `mbb/` as a read-only mirror from `bot-platform`.

Must-have docs:
- seller root/index set
- product domain specs
- seller rollout/deploy/security runbooks
- seller guides
- seller scenario hub

### MB-04: `docoved-agent` Memory Bank skeleton

Primary output:
- create the initial product-local Memory Bank shape for `docoved-agent`.

Task:
- define repo-local root/index structure for:
  - `.memory-bank/index.md`
  - `.memory-bank/spec/index.md`
  - `.memory-bank/plans/index.md`
  - `.memory-bank/guides/index.md`
  - `.memory-bank/scenarios/index.md`
  - `.memory-bank/mbb/index.md`
- keep Docoved-owned truth only:
  - Docoved architecture domains
  - Docoved runtime and grounded-answering contracts
  - Docoved operations/runbooks
  - Docoved guides/reference docs
  - `EP-023`, `PRT-025..035`, Docoved scenarios
- treat `mbb/` as a read-only mirror from `bot-platform`.

Must-have docs:
- docoved root/index set
- product architecture/runtime/operations hubs
- product planning hubs
- product guide hubs
- scenario hub

### MB-05: current `sales-agent` Memory Bank transition

Primary output:
- redefine the current repo Memory Bank as a migration-only surface.

Task:
- rewrite `.memory-bank/index.md` into a transitional routing hub;
- stop allowing new mixed-repo SSoT content here after target repo skeletons exist;
- convert mixed top-level hubs into migration stubs over time:
  - `spec/index.md`
  - `plans/index.md`
  - `scenarios/index.md`
  - `guides/index.md`
- convert especially misleading mixed hubs early:
  - `spec/runtime/index.md`
  - `spec/operations/index.md`
  - `plans/protocols/index.md`
  - `plans/adr/index.md`
- leave only:
  - migration stubs
  - archive/history-only pointers
  - `.tasks/**` workbench materials

Stub standard:
- `status: DEPRECATED`
- `migration_role: transition-stub`
- `owner_repo`
- `canonical_doc`
- `replaced_on`
- `remove_by_wave: 6`

### MB-06: Memory Bank move map and index creation plan

Primary output:
- a practical move map for `.memory-bank/**` and required target indexes.

Task:
- define which target indexes must exist before any branch moves:
  - root indexes
  - section hubs
  - second-level hubs where needed
- classify current source hubs into:
  - move mostly intact
  - split
  - retire
  - replace with transition stub
- define branch-by-branch move destinations across:
  - `spec/**`
  - `plans/**`
  - `scenarios/**`
  - `guides/**`
  - `mbb/**`
- sequence the documentation migration:
  1. create target root and section hubs
  2. move canonical MBB and establish mirrors
  3. move clear single-owner branches
  4. move plan/protocol/ADR families
  5. move guides
  6. create repo-local scenario hubs and move scenarios
  7. split mixed docs and retire source hubs

### Memory Bank execution order

This documentation workstream should execute in this order:

1. `MB-01` shared MBB/standards pack
2. `MB-02` `bot-platform` skeleton
3. `MB-03` `selleragent` skeleton
4. `MB-04` `docoved-agent` skeleton
5. `MB-06` move map and target index creation plan
6. `MB-05` current-source transition and stub strategy

Reason:
- target repo skeletons and MBB mirrors must exist before source-repo stubbing begins;
- the move map depends on stable target index packs;
- current-source transition should follow, not precede, the existence of destination docs.

## Unified protocol task register

This section is the execution backlog for `PRT-036`.

Rule:
- these tasks are planning/protocol tasks first;
- they must be closed in protocol/doc form before broad code movement starts;
- implementation wave work may begin only after the required prerequisite tasks for that wave are accepted.

### Decision-closure tasks

#### D-01: SellerAgent target repo identity

Goal:
- lock the long-term target repo identity for SellerAgent.

Output:
- one naming decision for:
  - `selleragent`
  - or retained `sales-agent`
- bootstrap location agreed in `_Projects`
- repo role statement aligned with this protocol

Status:
- provisionally closed for the migration program:
  - repo initialized as `selleragent`
  - target Memory Bank already landed there
  - future rename, if any, is a separate repo-identity follow-up and not a current blocker

#### D-02: Dependency bridge strategy

Goal:
- choose the interim consumption model between `bot-platform` and product repos.

Output:
- one approved bridge strategy:
  - workspace-only during extraction;
  - versioned npm package bridge;
  - git/subtree bridge;
  - or another repeatable mechanism
- decision constraints:
  - release friction
  - CI/CD complexity
  - rollback behavior
  - local developer workflow

Status:
- accepted:
  - canonical decision direction is recorded in `R-036-02`
  - long-lived framework ADR path is [ADR-001](../adr/ADR-001-private-registry-bridge-for-product-repos.md) with the current accepted bridge deviation recorded in [ADR-002](../adr/ADR-002-public-npm-bridge-for-framework-packages.md)
  - public scoped npm under `@dd-bot-platform/*` is the currently accepted bridge for framework-safe slices
  - vendoring is backup-only with explicit expiry
  - subtree/submodule-style bridges are not the primary path

#### D-03: Product boundary confirmations

Goal:
- close the remaining ambiguous product/framework calls before extraction design starts.

Output:
- explicit decisions for:
  - Docoved publication/knowledge surfaces
  - shared vs product-local operator surfaces
  - `ui-contract` ownership conditions
  - scenario/evidence framework vs product scenario suites

Status:
- materially advanced by `CB-01..CB-06` and the boundary review pack, but still needs conversion into accepted target-repo contract docs before mixed package extraction

### Review-artifact tasks

#### R-036-01: Ownership matrix

Goal:
- create the canonical `path -> target_repo -> action` matrix for source inventory.

Must cover:
- `apps/**`
- `packages/**`
- `.memory-bank/**`
- root docs outside Memory Bank
- archive-only zones

Status:
- planning artifact exists in `.tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-01-ownership-matrix.md`
- still needs final normalization into repo-owned migration checklists

#### R-036-02: Dependency bridge decision

Goal:
- document and approve how target repos consume `bot-platform` during migration.

Must cover:
- package publication or bridging mode
- versioning expectations
- local development flow
- CI implications
- rollback path

Status:
- accepted for the migration program:
  - decision synthesized in `.tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-02-dependency-bridge-decision.md`
  - canonical long-lived ADR recorded as [ADR-001](../adr/ADR-001-private-registry-bridge-for-product-repos.md), superseded operationally by [ADR-002](../adr/ADR-002-public-npm-bridge-for-framework-packages.md)

#### R-036-03: Repo skeleton pack

Goal:
- define minimum viable repo skeletons for:
  - `bot-platform`
  - `selleragent`
  - `docoved-agent`

Must cover:
- root structure
- baseline README
- Memory Bank skeleton
- minimal app/package placeholders
- ownership statement

Status:
- substantially complete at Memory Bank/bootstrap level
- target repos and their documentation skeletons now physically exist

#### R-036-04: Memory Bank split map

Goal:
- classify current `.memory-bank/**` into:
  - platform truth
  - seller truth
  - docoved truth
  - migration/archive only

Status:
- completed as planning pack in `.tasks/prt-036-memory-bank-redesign-2026-04-19/`
- now needs conversion into actual source-doc migration batches

#### R-036-05: Ops split plan

Goal:
- define hosted/runtime separation across target repos.

Must cover:
- GitHub repository and branch-protection rebind plan
- Vercel project mapping
- domains and aliases
- environment variables and secrets
- Supabase/project ownership
- secret inventory, rotation, and source-side decommission policy
- deploy/cutover/reconnect order
- rollback path for repo/project rebind mistakes

Status:
- research artifact exists
- implementation planning still pending

#### R-036-06: Archive and history policy

Goal:
- define how legacy and non-active materials are retained without blocking the split.

Must cover:
- history-preserving move method
- archive-only rules
- root-doc inventory
- generated/binary/demo handling
- `.tasks/` retention policy

Status:
- research artifact exists
- policy still needs conversion into concrete move/delete checklists per repo

### Memory Bank redesign tasks

These tasks are mandatory Wave 1 sub-workstreams and are detailed in the section above:
- `MB-01` Shared MBB and standards pack
- `MB-02` `bot-platform` Memory Bank skeleton
- `MB-03` `selleragent` Memory Bank skeleton
- `MB-04` `docoved-agent` Memory Bank skeleton
- `MB-05` current `sales-agent` Memory Bank transition
- `MB-06` Memory Bank move map and index creation plan

Execution note:
- `MB-01..MB-06` close the documentation topology before repo-local SSOT migration begins.

Progress snapshot:
- `MB-01..MB-04` are substantially complete:
  - target repo Memory Bank roots exist
  - `mbb/**` mirrors exist
  - section hubs exist
- `MB-06` exists as planning guidance and initial target-index rollout;
- `MB-05` is only partially complete:
  - root transition note landed in current `sales-agent/.memory-bank/index.md`
  - broader hub-level transition stubbing still remains

### Contract-boundary tasks

These tasks convert the repo split from a topology plan into a contract-safe migration program.
They must close before broad mixed-package extraction starts.

#### CB-01: Runtime and domain boundary contracts

Goal:
- define the normative split between framework runtime kernel and product domain/runtime truth.

Must cover:
- `packages/core` runtime kernel
- conversation kernel vs product orchestration
- SellerAgent runtime domains
- Docoved grounded-answering runtime
- mixed seam inventory inside `packages/core`

#### CB-02: API and SDK namespace contracts

Goal:
- define the target namespace ownership and package layering for `api-contract` and `client-sdk`.

Must cover:
- framework namespaces
- SellerAgent namespaces
- Docoved namespaces
- operation envelopes
- SDK base transport vs product SDK layers

#### CB-03: Auth, users, roles, and command contracts

Goal:
- separate framework auth/users/command vocabulary from product-local authority and command policy.

Must cover:
- principal/session/invite/membership/token classes
- access decision semantics
- Telegram command parser/registry/projection hooks
- product-local role/capability policy
- product-local command surfaces

#### CB-04: Workflow host and callback contracts

Goal:
- separate workflow framework contracts from product workflow families and callback implementations.

Must cover:
- host routes
- start contract
- callback contract
- health/manifest contract
- S2S auth contract
- product workflow family registries

#### CB-05: Persistence, store, and schema contracts

Goal:
- define framework-facing persistence interfaces and product-local concrete store ownership.

Must cover:
- persistence interface limits
- product-local stores and tables
- migration ownership split
- trace/workflow correlation vocabulary
- risky mixed store inventory

#### CB-06: Contract-doc writing pack

Goal:
- define the concrete Memory Bank document set needed to support the split safely.

Must cover:
- doc title/path
- owner repo
- doc type
- purpose
- dependencies
- priority and writing order

Progress snapshot:
- planning-level closure achieved through the boundary review pack in `.tasks/prt-036-boundary-contract-review-2026-04-19/`
- next step is to convert this pack into canonical docs under `bot-platform/.memory-bank/spec/**` plus product overlays under `selleragent` and `docoved-agent`

### Feature-model actualization tasks

These tasks turn the freshly bootstrapped target Memory Banks into usable repo-local planning systems.
They should complete before broad scenario migration and before any mixed code package is split on the basis of stale feature definitions.

#### FM-01: `bot-platform` framework feature model actualization

Goal:
- restate framework features and epics in the language of the new `bot-platform` repo rather than the mixed-source repo.

Must cover:
- framework epics and feature buckets
- framework-owned verification surfaces
- platform package families and support lanes
- deprecated mixed-source feature definitions that should not be copied forward

#### FM-02: `selleragent` feature model actualization

Goal:
- restate SellerAgent features in product-owned terms and stop carrying forward stale mixed phrasing.

Must cover:
- customer/runtime/commerce/operator feature families
- product web/bot/server/workflow surfaces
- SellerAgent operational and rollout features
- SellerAgent-only overlays that depend on framework contracts

#### FM-03: `docoved-agent` feature model actualization

Goal:
- restate Docoved features in product-owned terms around ingest, publication, retrieval, grounded answering, and hosted operations.

Must cover:
- Docoved product epic map
- Docoved ingest/publication/runtime families
- Docoved operator and hosted-delivery surfaces
- Docoved-only overlays that depend on framework contracts

### Source-doc migration tasks

These tasks convert the current mixed-repo documentation into repo-owned canonical documentation.
They must follow the ownership map and contract pack, not precede them.

#### DOC-MOVE-01: `bot-platform` canonical doc migration pack

Goal:
- move framework-owned source docs from the mixed repo into canonical `bot-platform` locations.

Current progress:
- first runtime packet is landed:
  - `spec/runtime/agent-execution-kernel.md`
  - `spec/runtime/pipeline-registry-and-binding-contract.md`
- next framework surface packet is landed:
  - `spec/client-api/typed-client-api-and-sdk.md`
  - `spec/architecture/containers/index.md`
  - `spec/architecture/containers/workflow-host.md`
- framework contract packet is landed:
  - `spec/security/auth-core.md`
  - `spec/runtime/persistence-interface-and-store-boundary.md`
  - `spec/client-api/api-namespace-registry.md`
- framework runtime-governance packet is landed:
  - `spec/runtime/execution-traces-and-token-accounting.md`
  - `spec/runtime/trace-artifact-governance.md`
  - `spec/runtime/decision-explanation-envelope.md`
- framework architecture-context packet is landed:
  - `spec/architecture/platform-glossary.md`
  - `spec/architecture/system-context.md`
  - `spec/architecture/container-architecture.md`
  - `spec/architecture/dependency-and-placement-rules.md`
- framework ADR packet is landed:
  - `plans/adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md`
  - `plans/adr/index.md`
- framework scenario-system packet is landed:
  - `spec/scenarios/scenario-system-and-evidence.md`
  - `spec/scenarios/index.md`
  - `spec/index.md`
- framework hosted-scenario packet is landed:
  - `spec/scenarios/hosted-beta-execution-model.md`
  - `spec/scenarios/index.md`
  - `spec/index.md`
- remaining backlog is the still-unlanded framework project/spec/scenario/protocol/ADR families beyond the eight landed packets.

Must cover:
- framework project/architecture/runtime/client-api/scenario docs
- framework-owned protocols and ADR overlays
- contract docs produced from `CB-01..CB-06`
- upstream `mbb/**` maintenance and indexing

#### DOC-MOVE-02: `selleragent` canonical doc migration pack

Goal:
- move SellerAgent-owned source docs into `selleragent/.memory-bank/**` and normalize them around the new product repo.

Must cover:
- SellerAgent product/domain/runtime/operations docs
- SellerAgent guides and runbooks
- SellerAgent plans/protocols/features
- source-doc families that should become product-local stubs in the mixed repo after migration

#### DOC-MOVE-03: `docoved-agent` canonical doc migration pack

Goal:
- move Docoved-owned source docs into `docoved-agent/.memory-bank/**` and normalize them around the new product repo.

Current progress:
- first runtime/operations packet is landed:
  - `spec/runtime/docoved-answer-artifact-contract.md`
  - `spec/operations/docoved-contour-runbook.md`
  - `spec/operations/docoved-hosted-deployment-topology.md`
- first architecture-domain packet is landed:
  - `spec/architecture/domains/index.md`
  - `spec/architecture/domains/docoved-knowledge-lifecycle.md`
  - `spec/architecture/domains/docoved-agentic-ingest-and-knowledge-projection-model.md`
- runtime/operations packet is landed:
  - `spec/runtime/docoved-single-endpoint-api-contract.md`
  - `spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md`
  - `spec/operations/docoved-hosted-bootstrap-runbook.md`
- operations channel packet is landed:
  - `spec/operations/docoved-channel-adapter-contract.md`
  - `spec/operations/docoved-telegram-channel-binding-and-hosted-acceptance.md`
  - `spec/operations/docoved-email-channel-binding-and-hosted-acceptance.md`
- guides/reference packet is landed:
  - `guides/reference/docoved-dv-admin-shell.md`
  - `guides/reference/docoved-local-regression-pack.md`
  - `guides/reference/docoved-hosted-live-channel-acceptance-playbook.md`
- runtime foundation packet is landed:
  - `spec/runtime/document-grounded-answering-contract.md`
  - `spec/runtime/research-then-answer-memory-bank-workflow.md`
  - `spec/runtime/docoved-agentic-search-and-verification-pipeline.md`
- protocol/plans packet is landed:
  - `plans/protocols/PRT-025-docoved-document-grounded-answering-and-knowledge-publication-foundation.md`
  - `plans/protocols/PRT-027-docoved-kb-reglaments-production-knowledge-base-rollout.md`
  - `plans/protocols/index.md`
  - `plans/index.md`
- ADR/plans packet is landed:
  - `plans/adr/ADR-005-ordinary-root-index-and-directory-backed-knowledge-slices.md`
  - `plans/adr/ADR-006-docoved-source-layer-and-semantic-projection-split.md`
  - `plans/adr/index.md`
  - `plans/index.md`
- remaining backlog is the broader Docoved architecture/runtime/operations/plans/guides/reference families beyond the eight landed packets.

Must cover:
- Docoved architecture/runtime/operations docs
- `EP-023`, `ADR-005..006`, and remaining `PRT-026`, `PRT-028..035`
- remaining Docoved guides/reference docs not yet landed in repo-local form
- Docoved source-doc families that should become product-local stubs in the mixed repo after migration

### Scenario and traceability tasks

These tasks align scenario ownership with the re-baselined feature model in each target repo.
The goal is to stop treating legacy scenario catalogs as mixed-repo baggage.

#### SCN-MIG-01: framework scenario-system baseline

Goal:
- define which scenario-system docs and evidence rules belong to `bot-platform` versus product repos.

Must cover:
- scenario engine and evidence vocabulary
- generic hosted verification rules
- platform versus product acceptance ownership

#### SCN-MIG-02: `selleragent` scenario matrix rewrite

Goal:
- bind SellerAgent scenario ownership to the new SellerAgent feature registry.

Must cover:
- SellerAgent `SCN-*` and `XE-*` ownership
- feature-to-scenario mapping
- stale or duplicate scenario retirement candidates
- hosted versus local verification overlays

#### SCN-MIG-03: `docoved-agent` scenario matrix rewrite

Goal:
- bind Docoved scenario ownership to the new Docoved feature registry.

Must cover:
- Docoved `SCN-179..220` families
- feature-to-scenario mapping
- stale or duplicate scenario retirement candidates
- hosted versus local verification overlays

#### TR-01: Cross-repo traceability matrix

Goal:
- create an explicit `feature -> spec/protocol -> scenario` traceability map across the three target repos.

Must cover:
- framework traceability anchors in `bot-platform`
- SellerAgent traceability anchors
- Docoved traceability anchors
- replacement of mixed-source planning references with target-repo canonical links

### Mixed-package extraction design tasks

These tasks remain planning/design tasks until ownership, bridge, and Memory Bank prerequisites are closed.

#### X-01: `packages/core` extraction seam map

Goal:
- separate framework kernel/runtime surfaces from SellerAgent and Docoved business truth.

#### X-02: `packages/api-contract` split design

Goal:
- define framework contracts vs product contracts and target package layout.

#### X-03: `packages/client-sdk` split design

Goal:
- define framework SDK surface vs product SDK clients.

#### X-04: `packages/db` ownership split

Goal:
- define product-local persistence boundaries and any framework-facing interfaces without creating a shared product DB.

#### X-05: `apps/server` composition-root split

Goal:
- define separate SellerAgent and Docoved server roots and framework bootstrap seams.

#### X-06: `apps/workflow` host split

Goal:
- define workflow framework vs product workflow hosts/deployments.

#### X-07: `packages/scenario-runner` split

Goal:
- separate generic scenario/evidence tooling from product scenario suites.

#### X-08: `packages/shared` shrink-and-retire plan

Goal:
- eliminate `shared` as a mixed dumping ground by extracting generic utilities or relocating product code to owning repos.

### Execution dependency order

Planning dependencies:
1. `D-01..D-03`
2. `R-036-01..R-036-06`
3. `MB-01..MB-06`
4. `CB-01..CB-06`
5. `FM-01..FM-03`
6. `DOC-MOVE-01..DOC-MOVE-03`
7. `SCN-MIG-01..SCN-MIG-03` and `TR-01`
8. `X-01..X-08`
9. migration wave implementation planning

Current execution note:
- steps `1..4` are materially advanced, with Memory Bank bootstrap already landed and contract-boundary research packs already written;
- steps `5..7` are materially advanced, with feature/scenario actualization and `TR-01` now completed;
- step `8` is now complete through the accepted `X-01..X-08` design tranches;
- first canonical target-doc anchors are now landed for the shared scenario-system, SellerAgent business-profile ownership, and Docoved acceptance host ownership;
- first explicit move-wave packets are now drafted for framework shell extraction, Docoved local host/publication baseline, and SellerAgent business-profile shared-retirement;
- the active protocol focus is now continued Wave `1B` repo-local doc migration plus later bounded code-move packets, with the first through fourth framework/Docoved target-repo doc packets already landed;
- mixed-package code movement must still not outrun repo-local doc/feature/scenario truth.

Implementation gating rule:
- do not start broad source moves for mixed packages until:
  - the corresponding `CB-*` contract tasks and `X-*` design tasks are accepted;
  - target repo feature registries are re-baselined;
  - scenario ownership is rebound to those target repo feature registries;
  - the moved code will have canonical repo-local documentation waiting for it.

## Migration waves

### Wave 0: Historical-tail isolation

Goal:
- remove dead-code ownership ambiguity before major extraction.

Includes:
- archive legacy SellerAgent Python into git history;
- remove it from active mainline;
- identify non-Memory-Bank docs and decide:
  - SellerAgent-owned;
  - Docoved-owned;
  - platform-owned;
  - archive-only.

Status note:
- the legacy SellerAgent Python archival/removal step is already executed in git history.

### Wave 1: Ownership matrix and repo skeletons

Goal:
- turn this protocol into explicit repo-local placeholders.

Deliverables:
- `path -> target repo -> action` matrix;
- initial `README` and `.memory-bank` skeleton in `bot-platform`;
- initial `.memory-bank` skeleton in `docoved-agent`;
- initial `.memory-bank` skeleton in the SellerAgent target repo;
- first repo-local spec and feature stubs derived from this protocol.

Required sub-workstreams:
- Memory Bank redesign task program `MB-01..MB-06`;
- MBB mirror/bootstrap policy;
- source-repo transition/stub plan for the current mixed Memory Bank.

Progress snapshot:
- target `.memory-bank` skeletons are now physically bootstrapped in:
  - `bot-platform`
  - `selleragent`
  - `docoved-agent`
- canonical/mirrored `mbb/**` packs have been landed in those target repos;
- root and section hubs now exist for `spec`, `plans`, `guides`, and repo-local scenario navigation;
- first substantive docs are now landed in target repos:
  - framework/product boundary baselines
  - target repo-structure docs
  - repo-local current-status reports
  - repo-local verification matrices
- first planning and scenario ownership docs are now landed in target repos:
  - epic maps
  - feature registries
  - scenario matrices
- `bot-platform` now also contains the canonical target-repo copy of `PRT-036`;
- this closes the "target repo Memory Bank does not yet exist" blocker and shifts Wave 1 focus toward feature/epic/scenario population and source-repo transition routing.

Residual work before Wave 1 can be considered fully closed:
- convert current mixed `sales-agent/.memory-bank/**` hubs into explicit transition stubs where needed;
- migrate first canonical source-doc families into their target repos;
- replace placeholder-level feature/scenario structure with repo-local actualized content.

### Wave 1B: Repo-local truth population and traceability

Goal:
- turn the bootstrapped target Memory Banks into real repo-local SSoT before code extraction accelerates.

Deliverables:
- actualized feature/epic models in all three target repos;
- canonical migration of first source-doc families into each target repo;
- refreshed scenario matrices tied to repo-local feature registries;
- explicit `feature -> docs -> scenarios` traceability;
- source-repo transition routing updated to point at target-repo canonical truth.

Required sub-workstreams:
- `FM-01..FM-03`
- `DOC-MOVE-01..DOC-MOVE-03`
- `SCN-MIG-01..SCN-MIG-03`
- `TR-01`
- remaining `MB-05` transition stubs

Exit condition:
- no major target repo is still relying on placeholder-only planning structure for its core features;
- the next code migration wave can name the canonical spec/feature/scenario anchor for each moved family.

Current status:
- actualized feature registries are landed in all target repos;
- scenario ownership and verification matrices are rebound to those registries;
- `TR-01` explicit cross-repo traceability is complete for the current split stage;
- remaining work in Wave 1B is deeper repo-local doc migration beyond the first seven landed packets in `docoved-agent` and the first seven landed packets in `bot-platform`, so broad hub anchors can later be replaced with detailed child specs.

### Wave 2: Extract `bot-platform` framework core

Goal:
- move reusable framework code out of the mixed source repo first.

Expected outcome:
- framework packages compile without product data ownership;
- product repos can consume framework code without inheriting each other's business domains.

Current status:
- first extraction-design tranche is complete for:
  - `X-01` `packages/core`
  - `X-02` `packages/api-contract`
  - `X-03` `packages/client-sdk`
- infrastructure-side design tranche is also complete for:
  - `X-04` `packages/db`
  - `X-05` `apps/server`
  - `X-06` `apps/workflow`
- final design tranche is also complete for:
  - `X-07` `packages/scenario-runner`
  - `X-08` `packages/shared`

Current extraction-design baseline:
- package/runtime/data/host/scenario/shared seams are now mapped for `core`, `api-contract`, `client-sdk`, `db`, `server`, `workflow`, `scenario-runner`, and `shared`;
- the extraction-design backlog `X-01..X-08` is complete;
- broad source movement still remains gated on converting accepted design conclusions into canonical target-repo docs and move plans;
- no new long-lived mixed replacement buckets should be introduced for scenarios or utilities during extraction.

### Wave 3: Land SellerAgent product repo

Goal:
- establish SellerAgent as an independently deployable monorepo.

Expected outcome:
- SellerAgent web app, server, workflows, and DB own one repo and one deployment chain;
- SellerAgent Memory Bank becomes product SSoT.

### Wave 4: Land Docoved product repo

Goal:
- establish Docoved as an independently deployable monorepo.

Expected outcome:
- Docoved runtime, ingest/publication, workflows, and operators own one repo and one deployment chain;
- Docoved Memory Bank becomes product SSoT.

### Wave 5: CI/CD and deploy separation

Goal:
- remove multi-product release coupling from one source repo.

Expected outcome:
- GitHub repo integrations and protected-branch CI are rebound to the owning repos;
- separate Vercel project configuration per product;
- separate environment variables and secrets per repo;
- source-side shared or obsolete secrets are rotated/decommissioned from the mixed contour;
- simpler release management without repo-level deployment gymnastics.

### Wave 6: Mixed-source retirement

Goal:
- retire the current mixed-repo role once all three target repos have minimal parity and documentation coverage.

Expected outcome:
- no active product development depends on the old mixed layout;
- residual source either migrates, archives, or is intentionally deleted.

## Acceptance gates

- A target repo is not considered established until it has:
  - a runnable minimal contour;
  - a committed `.memory-bank/index.md`;
  - at least one repo-local architecture/spec boundary doc;
  - a documented deployment/readme baseline;
  - a repo-local verification baseline and CI gate for its protected branches.
- A framework package is not considered extracted until:
  - it no longer imports product-local domain truth;
  - its public contract is documented in `bot-platform`;
  - at least one consuming product repo can build against it;
  - the extraction wave has declared and satisfied its verification class.
- A source path is not considered fully migrated until:
  - the owning target repo is explicit;
  - the old path is either removed or marked transitional with a planned deletion step.
- Every implementation wave must declare one verification class:
  - `doc wave`
  - `local-only code wave`
  - `framework extraction wave`
  - `product cutover wave`
  - `migration-sensitive wave`
- No delegated implementation slice is considered complete until:
  - its executor report exists;
  - its verifier verdict is recorded;
  - its required checks/evidence are either present or explicitly marked `N/A` with reason.
- No deploy-facing wave is considered complete until:
  - the git-flow path used by the wave is explicit;
  - the required local checks are green;
  - the relevant GitHub checks are green or explicitly `N/A`;
  - the relevant Vercel/hosted readiness proof is green or explicitly `N/A`;
  - any required hosted scenario pack has a recorded verdict.
- No migration-sensitive or production-facing wave is considered complete until:
  - schema compatibility path is explicit;
  - backup/preflight obligations are either satisfied or explicitly `N/A`;
  - rollout/rollback evidence is recorded.
- No repo-rebind or secret-split wave is considered complete until:
  - the rebind matrix entries for the in-scope integrations are explicit;
  - secret inventory ownership and target locations are explicit;
  - required rotations/decommissions are complete or explicitly time-boxed as transition exceptions;
  - rollback and decommission evidence is recorded.
- No protocol run is considered operationally closed until:
  - reusable lessons learned / insights have been captured when needed;
  - accepted long-lived findings have been folded into the owning SSoT before closeout.

## Outcome

- Result: `follow_up_needed`
- Follow-up needed:
  - finalize dependency bridge strategy between `bot-platform` and product repos;
  - convert phase-1 and phase-2 findings into the next normative revision of the protocol task register and gates;
  - complete Wave `1B` repo-local truth population and source-doc migration;
  - perform package-by-package extraction planning for `api-contract`, `client-sdk`, `core`, `db`, and `scenario-runner`;
  - convert current mixed-repo hubs into durable transition stubs as target-repo canonical docs take over.

## Memory Bank impact

- Added a durable cross-epic protocol for the three-repo split strategy.
- Established the canonical decision that `bot-platform` is a framework repo rather than a shared live product instance.
- Established the rule that auth/users and workflow are framework-defined but product-bound in concrete data and deployment.
- Recorded the requirement that future product truth must move into repo-local Memory Banks rather than remaining mixed in this source repo.
- Recorded that target repo Memory Banks now exist and that the next mandatory protocol phase is repo-local truth population, feature/scenario actualization, and transition routing rather than raw bootstrap.
- Recorded the phase-2 implementation model for subagent task files, verification workflow, execution lanes, and wave-specific verification stages.
- Recorded the phase-3 operational execution model: git/worktree discipline, CI/Vercel trigger policy, deploy/preflight gates, hosted verification expectations, and lessons-learned/insights handling for protocol-driven execution.
