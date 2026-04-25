---
file: .tasks/prt-041-contract-dependency-boundary-realignment/reports/T041-S1-docoved-package-identity-cutover-report.md
description: Implementation report for the Docoved package identity and SellerAgent dependency retirement slice under PRT-041.
purpose: Record the code/package/doc changes that removed Docoved's accidental dependency on SellerAgent package namespaces.
date: 2026-04-24
status: COMPLETE
---

# T041-S1 Docoved Package Identity Cutover Report

## Summary

Implemented the highest-priority `PRT-041` slice in `/Users/deksden/Documents/_Projects/docoved-agent`.

Docoved no longer depends on these SellerAgent package namespaces in source, package manifests, or lockfile:
- `@selleragent/api-contract`
- `@selleragent/shared`
- `@selleragent/core`

The local Docoved API contract package now has an honest package identity:
- from `@selleragent/api-contract`
- to `@docoved-agent/api-contract`

## Implementation

Changed Docoved code/package graph:
- updated imports in `apps/api`, `packages/core`, `packages/db`, `packages/dv-admin`, scripts, and legacy source folders from `@selleragent/api-contract` to `@docoved-agent/api-contract`;
- renamed `packages/api-contract/package.json` package identity and repository metadata to Docoved ownership;
- updated dependent package manifests to consume `@docoved-agent/api-contract`;
- removed unused `@selleragent/core` from `packages/db`;
- removed `@selleragent/shared` from `packages/core`, `packages/db`, and `packages/dv-admin`;
- added `packages/core/src/runtime/time.ts` for the timestamp helper that Docoved used from `@selleragent/shared`;
- added `packages/db/src/secret-envelope.ts` preserving the AES-256-GCM envelope behavior that Docoved used from `@selleragent/shared`;
- replaced `dv-admin` YAML parsing with direct `yaml` dependency usage;
- refreshed `pnpm-lock.yaml` and local workspace symlinks with `pnpm install`.

Changed Docoved Memory Bank:
- added closed local protocol `PRT-039-docoved-package-identity-and-selleragent-dependency-retirement.md`;
- updated root/plans/protocol/status surfaces so the local cleanup is discoverable and no longer framed as pending.

## Verification

Commands run in `/Users/deksden/Documents/_Projects/docoved-agent`:
- `pnpm install --lockfile-only` — pass;
- `pnpm install` — pass, refreshed workspace symlinks after package rename;
- `pnpm --filter @docoved-agent/api-contract typecheck` — pass;
- `pnpm --filter @docoved-agent/core typecheck` — pass;
- `pnpm --filter @docoved-agent/db typecheck` — pass;
- `pnpm --filter @docoved-agent/dv-admin typecheck` — pass;
- `pnpm --filter @docoved-agent/api typecheck` — pass;
- `pnpm typecheck` — pass;
- `pnpm check` — pass;
- `pnpm docoved:verify:local:prt-038` — pass, 17/17 proofs;
- `rg "@selleragent/(api-contract|shared|core)" apps packages scripts package.json pnpm-lock.yaml --glob '!node_modules' --glob '!dist'` — no matches.

Hosted gates were skipped intentionally: this slice changed package identity/import resolution and local helper placement, not hosted runtime behavior.

## Retained Decisions

Not moved in this slice:
- the full Docoved API contract surface, because it mixes platform-like vocabulary with Docoved product contracts and legacy SellerAgent-shaped terms;
- conversation/Telegram/operations-status/business-profile derived types, because they need symbol-level design decisions before any platform extraction;
- SellerAgent `packages/shared` internals, because after Docoved cutover they are not cross-product dependencies.

## Outcome

`PRT-041` main dependency-boundary defect is closed for Docoved. Remaining shared-contract extraction questions are design/future-protocol material rather than active accidental package dependency.
