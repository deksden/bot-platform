---
file: .memory-bank/plans/current-status-report.md
description: 'Current status snapshot for bot-platform bootstrap under PRT-036.'
purpose: Give maintainers a short answer to what is already landed in bot-platform and what remains before framework extraction starts.
version: 0.4.0
date: 2026-04-20
status: DRAFT
tags: [status, bot-platform, prt-036, migration]
parent: .memory-bank/plans/index.md
history:
  - version: 0.4.0
    date: 2026-04-20
    changes: Switched the framework release target to npm scope `@dd-bot-platform`, added Changesets/release-workflow scaffolding, and established the first concrete private npm release runbook for extracted packages.
  - version: 0.3.0
    date: 2026-04-20
    changes: Recorded the first publish-readiness tranche for extracted framework packages: package metadata is now aligned with the private-registry bridge and the operational bridge contract is documented in repo-local operations specs.
  - version: 0.2.0
    date: 2026-04-20
    changes: Refreshed the bootstrap snapshot to match the actual repo state: framework epic/feature docs, scenario matrix, verification matrix, and the canonical PRT-036 copy are already landed, but remain draft and still need truth actualization.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework status snapshot created during the first real Memory Bank bootstrap wave.
---

# Current Status Report

## State

`bot-platform` now has a real `.memory-bank/**` skeleton and canonical `mbb/**`.
This closes the earlier "target Memory Bank does not exist" blocker from `PRT-036`.

## Already landed

- root Memory Bank hubs
- spec/plans/guides/scenarios section hubs
- canonical `mbb/**`
- mirrored `git-flow.md`
- private-registry package bridge operations spec
- npm package release runbook
- initial architecture, project, and planning skeleton docs
- framework epic map and feature registry
- framework scenario matrix and verification matrix
- canonical `PRT-036` copy in `bot-platform`
- first publish-ready framework package metadata for:
  - `@dd-bot-platform/api-contract`
  - `@dd-bot-platform/scenario-system`
- Changesets/release workflow scaffolding for the first publishable framework packages

## Not landed yet

- migrated framework specs from the mixed source repo
- framework contract docs from the `CB-*` workstream
- moved framework ADRs and follow-up child protocols beyond `PRT-036`
- actual framework scenario catalog behind the current matrix
- actual framework code extraction
- product-repo install auth contour proof for consuming published framework packages

## Current blockers before code extraction

- dependency bridge decision
- broader namespace split for `client-sdk` and later framework packages
- `packages/core` seam extraction map
- workflow host split design
- persistence interface vs product store split

## Immediate next document wave

1. land framework contract docs:
   - runtime kernel
   - API namespace registry
   - auth core
   - workflow host
   - persistence interface
2. prove local/GitHub Actions/Vercel install auth for consuming `@dd-bot-platform/*`
3. replace vendored consumer mirrors with published private-registry packages once auth/install contours are ready
4. land framework planning docs:
   - follow-up split child protocols and ADR decisions after `PRT-036`
5. start moving clearly framework-owned source docs into this repo
