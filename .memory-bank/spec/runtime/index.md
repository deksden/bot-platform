---
file: .memory-bank/spec/runtime/index.md
description: 'Runtime hub for bot-platform.'
purpose: Hold framework runtime contracts for kernels, providers, pipelines, prompts, workflow, auth, command, and shared scenario-system layers.
version: 0.3.0
date: 2026-04-21
status: DRAFT
tags: [runtime, bot-platform, contracts]
parent: .memory-bank/spec/index.md
children:
  - agent-execution-kernel.md
  - pipeline-registry-and-binding-contract.md
  - scenario-system-framework-contract.md
target_audience: [developers, ai-agents]
automation_ready: true
history:
  - version: 0.3.0
    date: 2026-04-21
    changes: Added repo-local runtime framework docs for execution kernel and pipeline registry/binding contract (PRT-036 waves 91-92 migration packet).
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

- [Agent execution kernel](agent-execution-kernel.md): defines the shared kernel contracts, workflow-family boundary, capability model, execution split, and trace requirements.
- [Pipeline registry and binding contract](pipeline-registry-and-binding-contract.md): defines canonical pipeline definitions, channel binding validation, ownership boundaries, and pipeline defaults.
- [Scenario system framework contract](scenario-system-framework-contract.md): defines the lean framework-owned scenario vocabulary, evidence contracts, semantic-eval rules, and product-owned exclusions.
