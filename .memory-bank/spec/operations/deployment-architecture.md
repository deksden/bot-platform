---
file: .memory-bank/spec/operations/deployment-architecture.md
description: Framework deployment architecture contract for bot-platform.
purpose: Define environment, alias, topology, and rollout-truth rules for framework-owned surfaces without embedding product-specific deployment truth.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
tags: [spec, operations, deployment, framework, environments, rollout]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/spec/architecture/system-context.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/spec/scenarios/hosted-beta-execution-model.md
  - .memory-bank/plans/adr/ADR-003-deterministic-hosted-scenarios-and-browser-automation.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Migrated the operations deployment architecture packet into bot-platform as framework-owned repo-local truth and removed product-specific topology details.
---

# Deployment Architecture

## Purpose

Define canonical framework deployment rules for shared platform surfaces.

This document is intentionally product-neutral and applies to framework-owned deployables, verification lanes, and shared release evidence contracts.

## Ownership boundary

`bot-platform` owns:
- framework environment vocabulary and rollout lane semantics;
- deploy-truth verification rules for shared framework surfaces;
- split-surface integrity rules for hosted verification flows;
- release evidence requirements for framework rollout decisions.

`bot-platform` does not own:
- SellerAgent or Docoved domain names, project ids, secrets, or operator runbooks;
- product-specific provider/bootstrap/channel topology.

## Environment lane model

Canonical lane model:
- `local`
- `preview`
- `beta`
- `prod`

Meaning:
- lanes are deployment projections, not tenant or product identity;
- the same logical framework contract can exist in multiple lanes with different active revisions;
- `beta` and `prod` must be treated as independent rollout surfaces with explicit promotion evidence.

## Topology model for framework surfaces

Framework deployments may expose multiple cooperating surfaces (for example API, workflow-host, verification shell).

Operational rule:
- if a verification flow depends on more than one surface, acceptance requires a compatible deployed pair/group, not isolated green checks.

Minimum integrity checks:
1. each required surface resolves through intended stable lane alias or canonical lane endpoint;
2. each required surface reports healthy runtime identity;
3. release metadata (commit/ref/timestamp) is compatible across the required surfaces for the target verification scope.

## Deploy truth vs branch/release truth

Canonical rule:
- branch mapping, CI success, or package publication is not deploy truth by itself.

Deploy truth requires:
1. live lane endpoint readback (`/health` or equivalent runtime identity endpoint);
2. deployment metadata for the actual target surface;
3. matching release evidence for the feature/contract under verification.

Implication:
- rollout closure must be based on lane reality, not control-plane intent only.

## Schema and contract compatibility gate

If a framework change affects persistence, auth, or contract envelopes used by hosted paths:
1. define compatibility path before rollout;
2. apply additive/backward-compatible sequencing first;
3. verify affected write/read path in the target lane;
4. only then allow promotion and acceptance closure.

Insufficient proof:
- build success only;
- deployment job success only;
- health endpoint without contract-path verification.

## Hosted verification readiness gate

Before hosted framework acceptance (`beta_api`, `beta_ui`, `beta_external_manual`):
1. confirm target lane identity (`beta` vs `preview`);
2. confirm surface-pair/group integrity for required framework endpoints;
3. confirm auth/session/bootstrap path for protected verification;
4. confirm required external dependencies for the scenario class;
5. record deployment and environment evidence references.

If any gate item is missing, hosted acceptance is not started.

## Evidence contract for deployment decisions

Minimum evidence for framework rollout and acceptance decisions:
- target lane and endpoint/alias references;
- deployment metadata reference (commit/ref/time);
- runtime identity proof for required surfaces;
- compatibility proof for affected contract or schema paths;
- final verification outcome reference.

This evidence must be archivable from scenario/rollout artifacts without relying on chat-only context.
