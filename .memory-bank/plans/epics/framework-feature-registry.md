---
file: .memory-bank/plans/epics/framework-feature-registry.md
description: 'Initial framework feature registry for bot-platform.'
purpose: Define the first stable feature groups that bot-platform should own as framework capabilities.
version: 0.1.0
date: 2026-04-19
status: DRAFT
tags: [features, registry, bot-platform, framework]
parent: .memory-bank/plans/epics/index.md
history:
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework feature registry created from PRT-036 and the contract-boundary workstream.
---

# Framework Feature Registry

| feature_group | scope | primary_docs | target_repo_role |
| --- | --- | --- | --- |
| runtime kernel | execution kernel, pipelines, providers, prompt manager | runtime specs | framework owner |
| auth framework | principal/session/invite/membership vocabulary | security specs | framework owner |
| command framework | parser, registry, projection hooks, diagnostics | channels/command specs | framework owner |
| workflow framework | host/start/callback/S2S contracts | workflow specs | framework owner |
| client contract layer | operation catalog, envelopes, SDK base transport | client-api specs | framework owner |
| persistence interface layer | store boundaries, trace/workflow correlation vocabulary | persistence specs | framework owner |
| scenario system | scenario taxonomy, evidence, hosted classes, runner contracts | scenarios specs | framework owner |
| documentation standards | `mbb/**`, shared authoring standards, mirrored process rules | `mbb/**`, operations/guides | framework owner |

## Rule

If a feature group cannot be described without SellerAgent or Docoved product truth, it is not ready to live here yet.
