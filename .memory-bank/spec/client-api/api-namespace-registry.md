---
file: .memory-bank/spec/client-api/api-namespace-registry.md
description: Framework API namespace registry and ownership model for operation IDs and typed client groupings.
purpose: Keep canonical framework truth for which namespace families are framework-owned vs product-owned after the repo split.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
spec: SPEC-006
tags: [spec, client-api, namespace, ownership, bot-platform]
parent: .memory-bank/spec/client-api/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/client-api/typed-client-api-and-sdk.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: First bot-platform-local API namespace registry landed for PRT-036 wave 105.
---

# SPEC-005: API Namespace Registry

## Goal

Define canonical namespace ownership for framework client APIs so operation IDs, SDK groups, and split-era repo boundaries stay aligned.

## What an API namespace is

In `bot-platform`, an API namespace is the first segment of an operation ID:
- `namespace.action` (example: `runtime.listProviders`);
- the same namespace must appear as a typed client group in SDK surfaces (`client.runtime.*`);
- namespace ownership is architectural, not transport-specific.

## Namespace ownership registry (target truth)

### Framework-owned namespace families

- `system.*`: platform/system diagnostics and platform health contracts.
- `auth.*`: shared authentication, sessions, access, and invite/trust-policy contracts.
- `runtime.*`: shared execution-kernel and provider/policy contracts.
- `ops.*`: framework-level operational controls for shared platform lifecycle.
- `followups.*`: shared follow-up workflow contracts used by platform evaluation/automation flows.
- `curation.*`: shared curation and fit/rotation evidence contracts.
- `evaluations.*`: shared evaluation run/check-result contracts.

These families are framework namespace roots and must remain product-agnostic in contract shape.

### Product-owned namespace families

- `businessProfiles.*`
- `integrations.*`
- `channels.*`
- `customers.*`
- `commerce.*`
- `conversations.*`
- product-branded roots such as `docoved.*`

These families are product truth and do not become framework-owned merely because they currently exist in mixed-source packages.

## Alignment rules

1. Every operation ID must follow `namespace.action`.
2. Every namespace root must map to exactly one ownership class: framework or product.
3. Every namespace with public typed access must expose one matching SDK client group (`client.<namespaceRoot>`).
4. Framework namespaces may not embed product branding in the root segment.
5. Product namespaces may depend on framework contracts, but framework namespaces may not depend on product-only semantics.
6. Transitional package names (for example `@sales-agent/*`) are migration artifacts and not namespace ownership signals.

## Product extension rules

1. New product capabilities should land under a product-owned root (`<productNamespace>.*`), not under framework roots.
2. New framework-shared capabilities must be justified as multi-product and placed under a framework-owned root.
3. If a product capability later becomes shared, promote it through an explicit split/migration decision; do not silently reclassify ownership by folder placement.
4. Keep operation IDs stable during ownership migrations; introduce aliases/deprecations only when compatibility requires them.

## Transitional state note (current mixed source)

Current mixed-source code in `sales-agent` shows a single catalog containing both framework and product families.
This is expected during PRT-036 migration and is not target-state ownership.

Observed drift that must be treated as transitional:
- operation catalog includes both `runtime.docovedAnswer` and `docoved.answer`;
- SDK groups in `packages/client-sdk/src/index.ts` are mostly namespace-aligned, but product roots are still exposed from the same mixed package surface as framework roots.

Post-split target:
- framework-owned namespaces live in `bot-platform` contracts/SDK layers;
- product-owned namespaces live in product repos and import framework contracts as needed.

## Current-code grounding used

- `packages/api-contract/src/operations.ts` currently defines 157 operation IDs spanning 14 roots:
  `system`, `auth`, `runtime`, `ops`, `followups`, `curation`, `evaluations`, `businessProfiles`, `integrations`, `channels`, `customers`, `commerce`, `conversations`, `docoved`.
- `packages/client-sdk/src/index.ts` exposes matching top-level client groups:
  `system`, `auth`, `businessProfiles`, `integrations`, `channels`, `customers`, `commerce`, `conversations`, `runtime`, `ops`, `followups`, `curation`, `evaluations`.

This document converts that mixed evidence into explicit framework ownership policy for the split.
