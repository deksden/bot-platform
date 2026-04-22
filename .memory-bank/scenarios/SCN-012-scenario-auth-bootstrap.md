---
file: .memory-bank/scenarios/SCN-012-scenario-auth-bootstrap.md
description: SCN-012 - verifies deterministic framework auth bootstrap for scenario and hosted verification through governed storage-state and short-lived token helpers.
purpose: Use as the framework auth-bootstrap contract anchor so `bot-platform` owns reusable bootstrap/session mechanics without pulling product login policy into the framework repo.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
scenario: SCN-012
kind: capability
execution_status: planned
tags: [scenario, scn, bot-platform, auth, bootstrap, hosted]
parent: .memory-bank/scenarios/index.md
related_files:
  - .memory-bank/spec/security/auth-core.md
  - .memory-bank/spec/security/auth-and-access.md
  - .memory-bank/spec/scenarios/hosted-beta-execution-model.md
  - .memory-bank/plans/verification-matrix.md
---

# SCN-012 Scenario Auth Bootstrap

## Goal

Prove that framework-owned auth bootstrap remains deterministic and bounded:
- scenario automation can obtain governed authenticated state without mailbox-driven login;
- hosted verification can exchange a short-lived bootstrap helper into a normal protected session;
- bootstrap helpers stay explicitly restricted to allowed non-production contours.

## Kind

- `capability`

## Covered Features

- Primary: `auth-framework`
- Secondary: `scenario-system`

## Execution Profile

- Execution modes: `local`, later `mixed` (`beta_api` issuance/exchange plus `beta_ui` protected-surface proof)
- Automation level: scenario or auth-bootstrap harness
- Acceptance level: framework bootstrap/access anchor
- Beta gate: required before shared hosted auth-bootstrap claims closure

## Preconditions

- one framework-owned bootstrap helper contract exists for a scenario actor or operator principal without product role semantics;
- storage-state and short-lived token artifacts are explicitly environment-gated;
- one protected completion path can exchange issued bootstrap evidence into a normal authenticated session;
- bootstrap policy can prove production-style contours reject the helper path.

## Hosted Preflight

- hosted proof must keep framework hosted contours explicit: `beta_api` for issuance/exchange and `beta_ui` only for bounded protected-surface confirmation;
- the run must prove it targets the stable beta deployment pair rather than a preview alias;
- hosted evidence must show the bootstrap path is still governed by environment policy rather than treated as ordinary login.

## Phases

1. Issue automated bootstrap state
   - What happens: one framework bootstrap helper issues storage-state or equivalent authenticated state for a controlled scenario actor.
   - Expected intermediate outcome: automation can enter a protected surface without manual mailbox or inbox interaction.

2. Issue short-lived hosted helper token
   - What happens: one short-lived bootstrap helper is minted and exchanged through the canonical completion path.
   - Expected intermediate outcome: the helper becomes a normal authenticated session instead of a special long-lived bypass.

3. Verify restriction boundary
   - What happens: the same helper path is checked against production-style policy.
   - Expected intermediate outcome: the bootstrap path fails closed outside the explicitly allowed verification contours.

## Expected Evidence

- Run ids / flow refs: scenario or bootstrap run id, actor key, exchange request id
- Key artifacts: storage-state manifest or equivalent bootstrap artifact, short-lived token issuance manifest, exchange result snapshot
- Reports / screenshots / logs: framework scenario report and optional bounded protected-surface proof for hosted confirmation
- Acceptance outputs: proof that deterministic auth bootstrap exists, is auditable, and remains non-production by policy

## Pass Criteria

- automation can obtain governed authenticated state through the framework bootstrap helper;
- the short-lived hosted helper exchanges into a normal protected session and does not become a permanent bypass path;
- production-style policy rejects the bootstrap path;
- the contract stays framework-only and does not depend on product role ladders, membership tables, or product-specific login UX.

## Supported Environments

- `local`
- later `mixed`

## Related Decisions / Docs

- Security: [Auth core](../spec/security/auth-core.md)
- Security: [Auth and access](../spec/security/auth-and-access.md)
- Scenario model: [Hosted beta execution model](../spec/scenarios/hosted-beta-execution-model.md)

## Notes

- This scenario owns only reusable bootstrap/session mechanics.
- Trust policy content, product membership semantics, and product operator-login acceptance remain product-owned.
