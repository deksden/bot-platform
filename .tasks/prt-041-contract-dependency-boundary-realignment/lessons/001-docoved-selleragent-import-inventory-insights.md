# 001 Docoved SellerAgent Import Inventory Insights

Date: 2026-04-24
Task: `T041-I1-docoved-selleragent-import-inventory`

1. Docoved's `packages/api-contract` package is Docoved-local code but still declares `name: "@selleragent/api-contract"`. This makes source imports look like external SellerAgent dependencies even when they resolve to a workspace package. Future migration tasks should treat this first as a package identity correction, then split shared vs product-owned symbols.

2. `@selleragent/core@0.1.1` is declared by Docoved `packages/db` and present in the lockfile, but no source import was found in `apps`, `packages`, or `scripts`. This is likely a stale dependency, not an active runtime boundary, but implementation should still prove the package graph before deleting it.

3. The installed `@selleragent/shared@0.2.0` package exports both generic helpers (`timestamp`, `createRunId`) and SellerAgent business-profile/provisioning surfaces. Docoved currently imports only generic helper/secrets/YAML symbols, so migration should avoid moving the entire shared package upward and should extract only the consumed generic helpers.

4. Docoved's local api-contract export surface mixes Docoved-specific answer/import concepts with shared platform contracts and old SellerAgent business-profile/commerce/customer concepts. Import cleanup should not be implemented as a one-to-one package rename; it needs symbol-level extraction and product-local replacement decisions.

