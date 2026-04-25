# T-042-01 Framework Contract Package Or Module Report

## Changed Files

- `packages/channel-runtime/package.json`
- `packages/channel-runtime/tsconfig.json`
- `packages/channel-runtime/src/index.ts`
- `packages/channel-runtime/src/document.ts`
- `packages/channel-runtime/src/render.ts`
- `packages/channel-runtime/src/errors.ts`
- `packages/channel-runtime/src/channel-runtime.spec.ts`
- `tsconfig.build.json`

## Package / Module Placement Used

Implemented the first-wave framework contract as a new workspace package: `packages/channel-runtime`, published as `@dd-bot-platform/channel-runtime`.

The package is wired into the root TypeScript build graph via `tsconfig.build.json`.

## Exported Public API

Public exports from `@dd-bot-platform/channel-runtime`:

- canonical document types:
  - `CanonicalResponseDocument`
  - `CanonicalResponseSection`
  - `CanonicalResponseBlock`
  - `CanonicalCitation`
  - `CanonicalSourceRef`
  - `CanonicalResponseMetadata`
  - `CanonicalResponseTimingSummary`
  - `CanonicalResponseVisibility`
  - `CanonicalResponseArtifactRef`
- render vocabulary:
  - `ChannelRenderTarget`
  - `ChannelRenderedFormat`
  - `SplitRenderedMessagePartsOptions`
- pure helpers:
  - `isVisibilityAllowed`
  - `filterCanonicalResponseDocumentByVisibility`
  - `renderChannelMarkdownToPlainText`
  - `splitRenderedMessageParts`
- validation error:
  - `ChannelRuntimeValidationError`
- reused framework types re-exported by type:
  - `RuntimeUsage` from `@dd-bot-platform/api-contract`
  - `ChannelRef`, `ExecutionRunRef`, `IsoTimestamp` from `@dd-bot-platform/core`

## Checks Run And Results

- `pnpm install --ignore-scripts` — passed; used only to refresh workspace links for the new package.
- `pnpm --filter @dd-bot-platform/channel-runtime typecheck` — passed.
- `pnpm --filter @dd-bot-platform/channel-runtime build` — passed.
- `pnpm typecheck` — passed.
- `pnpm check` — passed.
- `node --test packages/channel-runtime/dist/channel-runtime.spec.js` — passed (4/4 tests).
- `node -e "const pkg=require('./packages/channel-runtime/dist'); ..."` — passed public export/import smoke.

## Skipped Checks With Rationale

- Pack/publish dry-run was skipped. The task guidance preferred leaving publish readiness and allowlist work to `T-042-03`, and this implementation did not change `scripts/publish-private-packages.mjs`.

## Remaining Risks

- `ChannelRenderTarget` is intentionally narrow and future consumers may require a more explicit target taxonomy once product proofs land.
- `renderChannelMarkdownToPlainText` implements only the documented first-wave subset; richer markdown semantics remain intentionally unsupported.
- Publish allowlist and release bridge wiring for `@dd-bot-platform/channel-runtime` remain pending follow-up work in `T-042-03`.
- Another agent already has an untracked file at `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-02-framework-docs-and-mbb-routing.md`; it was not modified.

## Lessons / Insights

- No new lessons or insights files were created in this task.
