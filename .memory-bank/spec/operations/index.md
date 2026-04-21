---
file: .memory-bank/spec/operations/index.md
description: 'Framework operations spec hub for bot-platform.'
purpose: Hold framework-wide operational standards, release rules, and mirrored process standards.
version: 0.4.0
date: 2026-04-21
status: DRAFT
tags: [operations, bot-platform, standards]
parent: .memory-bank/spec/index.md
children:
  - deployment-architecture.md
  - runbook.md
  - production-rollout-runbook.md
  - hosted-beta-acceptance-contract.md
  - git-flow.md
  - private-registry-package-bridge.md
history:
  - version: 0.4.0
    date: 2026-04-21
    changes: Landed the framework operations packet for deployment architecture, runbook, production rollout, and hosted-beta acceptance in repo-local form and linked it from this hub.
  - version: 0.3.0
    date: 2026-04-20
    changes: Updated operations navigation for the real npm-based private package bridge under `@dd-bot-platform/*`.
  - version: 0.2.0
    date: 2026-04-20
    changes: Added the private-registry package bridge contract so extracted framework packages can become publish-ready without pulling product deployment truth into bot-platform.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework operations hub created during Memory Bank bootstrap.
---

# Operations Hub

This section is intentionally narrow.

It should contain only framework-wide operations truth such as:
- shared process standards;
- package release and verification rules;
- shared environment and verification references;
- framework deployment and hosted acceptance contracts.

It should not contain product deployment truth or product-only operator procedures.

## Initial doc

- [Deployment architecture](deployment-architecture.md): framework deployment lanes, deploy-truth checks, and compatibility gating.
- [Operations runbook](runbook.md): framework baseline for health checks, controlled drills, and incident-safe investigation.
- [Production rollout runbook](production-rollout-runbook.md): canonical beta-to-prod promotion sequence and rollout evidence contract.
- [Hosted beta acceptance contract](hosted-beta-acceptance-contract.md): mandatory preflight/layer/evidence rules for hosted acceptance.
- [Git flow](git-flow.md): mirrored shared process standard.
- [Private registry package bridge](private-registry-package-bridge.md): publish-ready seam rules for `@dd-bot-platform/*` packages consumed by product repos.
