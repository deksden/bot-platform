---
file: .memory-bank/spec/client-api/index.md
description: 'Client API hub for bot-platform: typed operation contract and SDK boundary.'
purpose: Hold canonical API namespace, operation envelopes, typed errors, and SDK base-layer contracts for framework consumers.
version: 0.2.0
date: 2026-04-21
status: DRAFT
tags: [client-api, sdk, contracts, bot-platform]
parent: .memory-bank/spec/index.md
children:
  - typed-client-api-and-sdk.md
history:
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

- [Typed client API and SDK](typed-client-api-and-sdk.md): defines operation contract, grouping rules, SDK responsibilities, transport model, and client-boundary non-goals.

## Planned docs

- API namespace registry;
- operation envelopes and errors;
- HTTP execution contract;
- SDK base transport contract;
- product extension rules.

It should stay framework-owned even when SellerAgent and Docoved expose product-specific namespaces.
