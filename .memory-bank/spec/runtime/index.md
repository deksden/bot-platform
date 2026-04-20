---
file: .memory-bank/spec/runtime/index.md
description: 'Runtime hub for bot-platform.'
purpose: Hold framework runtime contracts for kernels, providers, pipelines, prompts, workflow, auth, command, and shared scenario-system layers.
version: 0.2.0
date: 2026-04-20
status: DRAFT
tags: [runtime, bot-platform, contracts]
parent: .memory-bank/spec/index.md
children:
  - scenario-system-framework-contract.md
target_audience: [developers, ai-agents]
automation_ready: true
history:
  - version: 0.2.0
    date: 2026-04-20
    changes: Added the first canonical scenario-system runtime contract and made the runtime hub explicitly own shared scenario-system framework rules.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial runtime hub for bot-platform.
---

# Runtime Hub

This section is reserved for framework runtime contracts:
- execution kernel;
- provider adapters;
- pipeline registry;
- prompt manager and prompt contracts;
- conversation kernel abstractions;
- workflow framework;
- auth and command framework seams;
- shared scenario-system framework contracts.

Product runtime overlays stay out of this repo.

## Current runtime docs

- [Scenario system framework contract](scenario-system-framework-contract.md): defines the lean framework-owned scenario vocabulary, evidence contracts, semantic-eval rules, and product-owned exclusions.
