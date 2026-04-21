---
file: .memory-bank/spec/scenarios/index.md
description: 'Scenario system spec hub for bot-platform.'
purpose: Hold framework scenario-system rules, evidence contracts, and hosted verification classes.
version: 0.3.0
date: 2026-04-21
status: ACTIVE
tags: [scenarios, specs, evidence, bot-platform]
parent: .memory-bank/spec/index.md
children:
  - scenario-system-and-evidence.md
  - hosted-beta-execution-model.md
history:
  - version: 0.3.0
    date: 2026-04-21
    changes: Landed the hosted-beta execution model packet and updated this hub to treat hosted-layer classification as active framework scenario truth (PRT-036 Wave 124).
  - version: 0.2.0
    date: 2026-04-21
    changes: Landed the repo-local scenario-system-and-evidence packet and updated this hub from placeholder wording to active framework scenario-spec navigation.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial placeholder scenario-system spec hub.
---

# Scenario Specs Hub

This section owns framework scenario-system specification truth:
- scenario taxonomy;
- evidence rules;
- hosted verification classes;
- shared runner assumptions;
- scenario authoring contracts.

## Current docs

- [Scenario system and evidence](scenario-system-and-evidence.md): canonical framework packet for scenario taxonomy, run/evidence artifacts, verification tiers, and hosted-layer semantics.
- [Hosted beta execution model](hosted-beta-execution-model.md): canonical framework packet for deterministic hosted layering across `beta_api`, `beta_ui`, and `beta_external_manual`.
