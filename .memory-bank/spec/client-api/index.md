---
file: .memory-bank/spec/client-api/index.md
description: 'Client API hub for bot-platform: typed operation contract and SDK boundary.'
purpose: Hold canonical API namespace, operation envelopes, typed errors, and SDK base-layer contracts for framework consumers.
version: 0.3.0
date: 2026-04-21
status: DRAFT
tags: [client-api, sdk, contracts, bot-platform]
parent: .memory-bank/spec/index.md
children:
  - api-namespace-registry.md
  - typed-client-api-and-sdk.md
history:
  - version: 0.3.0
    date: 2026-04-21
    changes: Added the API namespace registry as canonical framework ownership truth for operation roots and SDK grouping alignment (PRT-036 wave 105).
  - version: 0.2.0
    date: 2026-04-21
    changes: Landed the first repo-local typed client API and SDK contract doc (PRT-036 wave 97) and linked it as canonical client-api surface in bot-platform.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial client API hub for bot-platform.
---

# Client API Hub

This section is the canonical home for framework-owned client boundary contracts.

## Current docs

- [API namespace registry](api-namespace-registry.md): defines what an API namespace is, which namespace families are framework-owned vs product-owned, and how operation IDs must align with typed client groupings during and after split migration.
- [Typed client API and SDK](typed-client-api-and-sdk.md): defines operation contract, grouping rules, SDK responsibilities, transport model, and client-boundary non-goals.

## Planned docs

- operation envelopes and errors;
- HTTP execution contract;
- SDK base transport contract;
- product extension rules.

It should stay framework-owned even when SellerAgent and Docoved expose product-specific namespaces.
