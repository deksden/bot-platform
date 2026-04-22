---
file: .memory-bank/spec/scenarios/hosted-beta-execution-model.md
description: Framework-owned hosted beta execution model for deterministic scenario verification layering.
purpose: Define how framework scenarios classify and layer hosted verification (`beta_api`, `beta_ui`, `beta_external_manual`) without mixing in product deployment or runbook ownership.
version: 0.1.0
date: 2026-04-21
status: ACTIVE
tags: [spec, scenarios, hosted-beta, execution-model, framework, verification]
parent: .memory-bank/spec/scenarios/index.md
related_files:
  - .memory-bank/spec/scenarios/scenario-system-and-evidence.md
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
target_audience: [developers, ai-agents]
automation_ready: true
history:
  - version: 0.1.0
    date: 2026-04-21
    changes: Landed the hosted beta execution packet in bot-platform as repo-local framework scenario truth under PRT-036 Wave 124.
---

# Hosted Beta Execution Model

## Goal

Keep hosted scenario verification deterministic and layered:
- avoid collapsing deploy/env/bootstrap/business proof into one browser flow;
- push most hosted acceptance into reproducible API/read-model checks;
- keep browser automation as a governed thin proof layer over already proven hosted state.

## Ownership boundary

This document defines framework-level hosted verification classes and layering policy.
It does not make `bot-platform` the owner of product deployment runbooks, product bootstrap scripts, product route maps, or product channel operations.

## Hosted execution classes

### 1. `beta_api`

Use when the scenario can prove capability on deployed beta through deterministic server-side contracts:
- typed client/API calls;
- explicit hosted bootstrap/session artifacts;
- protected operations and read-model checks;
- timeline, trace, and evidence assertions.

Default preference:
- hosted verification should start at `beta_api`.

### 2. `beta_ui`

Use only when hosted UI contract proof is required.

`beta_ui` assumes:
- hosted preflight and bootstrap are already validated;
- seed/context is already prepared;
- browser automation proves only governed UI contracts and bounded user actions.

Typical proof:
- protected page render;
- governed selector presence;
- bounded form/action flow;
- panel/interaction visibility for an already prepared state.

### 3. `beta_external_manual`

Use only when an external system or human channel cannot be safely automated:
- live third-party transport/channel;
- provider callbacks not safely simulated;
- device/channel behavior requiring manual hosted evidence.

Rule:
- this class is an exception path, not a default hosted strategy.

## Layered hosted model

Hosted scenarios should be designed as up to four layers:

1. `Hosted preflight`
   - deployment pair identity
   - alias/environment parity
   - baseline bootstrap readiness
   - external readiness when required
2. `Hosted bootstrap`
   - scenario token/session
   - storage-state or equivalent auth evidence
   - seeded actor/context
3. `Canonical hosted assertions`
   - protected API checks
   - read-model checks
   - timeline/trace/task proof
4. `UI/browser proof` (only if needed)
   - governed selectors and stable POM mappings
   - bounded user-facing interaction checks

Determinism requirement:
- most signal should come from layers 1-3;
- layer 4 augments canonical proof and should stay thin.

## Design rules

### Browser-thin rule

If hosted capability can be proven without browser automation, do not use browser automation.

### Canonical-after-UI rule

When a scenario performs meaningful UI actions, verdict confirmation should still include canonical server-side evidence whenever technically feasible.

### No-hidden-state rule

Hosted runs must not depend on undocumented cookie residue, untracked manual setup, or implicit local state.

### Stable-bootstrap rule

Hosted UI verification should use an explicit first-class bootstrap/session path, not ad hoc per-scenario login hacks.

## Profile vocabulary

Framework scenario profile language:
- `runnable_local`
- `beta_api`
- `beta_ui`
- `beta_external_manual`
- `mixed`

`mixed` is reserved for scenarios intentionally combining more than one hosted class.

## Alignment with scenario-system contract

This model extends, and does not replace:
- framework scenario taxonomy/evidence semantics from [Scenario system and evidence](scenario-system-and-evidence.md);
- runtime framework ownership boundaries from [Scenario system framework contract](../runtime/scenario-system-framework-contract.md).

Hosted-layer classification does not redefine tier membership or product-local scenario ownership.

## Migration direction

When uplifting hosted scenarios to this model:
1. extract preflight into explicit reusable checks;
2. move business/canonical assertions into `beta_api`;
3. retain `beta_ui` only for true UI contract proof;
4. keep `beta_external_manual` for unavoidable external channel evidence.
