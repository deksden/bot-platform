---
file: .memory-bank/plans/verification-matrix.md
description: 'Framework verification matrix for bot-platform.'
purpose: Track the relationship between framework capability groups, required contract docs, and scenario coverage.
version: 0.1.0
date: 2026-04-19
status: DRAFT
tags: [verification, matrix, scenarios, bot-platform]
parent: .memory-bank/plans/index.md
history:
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework verification matrix created during Memory Bank bootstrap.
---

# Verification Matrix

| capability_group | primary_docs | target_scenario_family | current_state |
| --- | --- | --- | --- |
| runtime kernel | `spec/runtime/index.md` | framework contract scenarios | planned |
| auth framework | future `spec/security/auth-core-contract.md` | framework auth scenarios | planned |
| command framework | future `spec/channels/telegram-command-framework-contract.md` | command contract scenarios | planned |
| workflow framework | future `spec/workflow/workflow-host-contract.md` | workflow contract scenarios | planned |
| client contracts | `spec/client-api/index.md` | API/SDK contract scenarios | planned |
| persistence interfaces | future `spec/persistence/persistence-interface-contract.md` | persistence contract scenarios | planned |
| scenario system | `spec/scenarios/index.md` | hosted and evidence scenarios | planned |

## Reading rule

This matrix is intentionally capability-first.
It should later evolve into:
- `capability -> contract docs -> scenario ids -> evidence location`.
