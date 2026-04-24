---
file: .tasks/prt-041-contract-dependency-boundary-realignment/lessons/T041-I2-selleragent-shared-config-insights.md
description: Insights from T041-I2 SellerAgent shared/config read-only inventory.
date: 2026-04-24
status: COMPLETE
---

# T041-I2 SellerAgent Shared/Config Insights

1. `@selleragent/platform-config` is not present as a local SellerAgent workspace package in this checkout, even though SellerAgent manifests and lockfile consume `@selleragent/platform-config@0.2.0`. The only inspected source of truth available locally is the installed published package under `node_modules/.pnpm/@selleragent+platform-config@0.2.0`.

2. The current SellerAgent `packages/shared/src/index.ts` source barrel differs from installed/published `@selleragent/shared@0.2.0` declarations found in Docoved `node_modules`: Docoved's installed declaration exports `business-profile-media`, and the installed package contains `canonical-transcript.d.ts`, while current SellerAgent source barrel does not export those surfaces. Reconcile source/dist provenance before any new shared package publication.

3. Docoved's live `@selleragent/shared` dependency is narrower than the package name suggests: source imports are limited to `timestamp`, YAML parsing, and secret envelope encryption/decryption. This makes a small platform cutover feasible without migrating SellerAgent business-profile helpers.
