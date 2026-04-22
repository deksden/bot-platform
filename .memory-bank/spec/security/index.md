---
file: .memory-bank/spec/security/index.md
description: 'Security hub for bot-platform: framework-owned auth and access contracts.'
purpose: Hold canonical framework security contracts that product repos can reuse without importing product-specific trust policy.
version: 0.2.0
date: 2026-04-21
status: ACTIVE
tags: [security, auth, access, contracts, bot-platform]
parent: .memory-bank/spec/index.md
children:
  - auth-core.md
  - auth-and-access.md
history:
  - version: 0.2.0
    date: 2026-04-21
    changes: Added the framework auth-and-access contract and updated section navigation to distinguish reusable auth mechanics from product overlay policy.
  - version: 0.1.0
    date: 2026-04-21
    changes: Established the first framework security section with an auth-core contract that separates reusable auth primitives from product-owned policy overlays.
---

# Security Hub

This section stores framework-owned security contracts for `bot-platform`.

## Current docs

- [Auth core](auth-core.md): defines principal/session/access-check primitives, browser and CLI auth-attempt patterns, and framework/product ownership boundaries.
- [Auth and access](auth-and-access.md): defines shared auth/login/session/access mechanics and explicit boundaries for product-specific trust-policy overlays.

## Scope

This section is for:
- reusable auth vocabulary and contracts;
- typed auth operation-family expectations shared across clients;
- framework boundaries between auth mechanics and product trust policy.

This section is not for:
- product membership policy details;
- product provisioning runbooks;
- product environment and deployment security truth.
