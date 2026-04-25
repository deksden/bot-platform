---
file: .tasks/prt-041-contract-dependency-boundary-realignment/reports/T041-I2-selleragent-shared-config-inventory-report.md
description: Read-only SellerAgent shared/platform-config export and consumer inventory for PRT-041 T041-I2.
date: 2026-04-24
status: COMPLETE
task: .tasks/prt-041-contract-dependency-boundary-realignment/tasks/T041-I2-selleragent-shared-config-inventory.md
---

# T041-I2 SellerAgent Shared/Config Inventory Report

## Executive summary

SellerAgent `packages/shared` is a mixed bucket. The exports with real current multi-product consumers are small and product-agnostic: `timestamp`, `parseYamlText`, and `encryptSecret`/`decryptSecret`/`SecretEnvelope`. Those should move to `bot-platform` in small platform support/core slices because Docoved currently imports them from `@selleragent/shared@0.2.0`.

Most remaining `@selleragent/shared` exports are SellerAgent product policy helpers for business-profile projects, media scoping, provisioning policy, and SellerAgent CLI/admin file workflows. They should stay SellerAgent-local or be split into a SellerAgent-owned package with a clearer name. They do not have Docoved consumers in source.

`@selleragent/platform-config` is not present as a local SellerAgent workspace package in this checkout, despite being referenced by manifests and lockfile. It is installed as a published dependency at `0.2.0`. Its only observed source consumers are SellerAgent `apps/server` and `packages/sa-admin`, both using `resolvePlatformConfig`. The package exposes platform-shaped invite policy/email config, but the defaults include SellerAgent-specific email identity (`invite@selleragent.pro`). This should not be moved wholesale. Split the generic invite policy/env parsing contract to `bot-platform` only after defining product override rules; keep product default branding local.

No product code, package manifests, lockfiles, or source files were edited. Only this report, the companion inventory, and one lessons note were written under the PRT-041 task folder.

## Exact files and manifests inspected

### Task and boundary docs

| path | purpose |
| --- | --- |
| `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/tasks/T041-I2-selleragent-shared-config-inventory.md` | Task contract and report requirements. |
| `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md` | Classification schema, migration actions, package ownership matrix. |
| `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/feature-area-boundaries.md` | Platform feature-area ownership and non-owner list. |
| `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md` | Three-layer product/platform placement rules. |
| `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md` | SellerAgent product-local invariants and adoption boundary. |

### SellerAgent package graph and exports

| path | notes |
| --- | --- |
| `/Users/deksden/Documents/_Projects/seller-agent/package.json` | Root scripts/package manager. |
| `/Users/deksden/Documents/_Projects/seller-agent/pnpm-workspace.yaml` | Workspace includes `apps/*` and `packages/*`. |
| `/Users/deksden/Documents/_Projects/seller-agent/pnpm-lock.yaml` | `@selleragent/platform-config@0.2.0` external dependency; `@selleragent/shared` workspace links. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/shared/package.json` | `@selleragent/shared@0.2.0`; depends on `@selleragent/platform-config@0.2.0` and `yaml`. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/shared/src/index.ts` | Public source barrel. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/shared/src/business-profile-project.ts` | Business-profile/YAML/file/env helpers. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/shared/src/business-profile-media.ts` | Business-profile media scope helpers, not exported by source barrel. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/shared/src/provisioning-policy.ts` | Provisioning policy exports. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/shared/src/secrets.ts` | AES-GCM secret envelope helpers. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/shared/dist/index.d.ts` | Built declaration differs from source tree by omitting `business-profile-media` barrel export. |
| `/Users/deksden/Documents/_Projects/seller-agent/node_modules/.pnpm/@selleragent+platform-config@0.2.0/node_modules/@selleragent/platform-config/package.json` | Installed published platform-config manifest. |
| `/Users/deksden/Documents/_Projects/seller-agent/node_modules/.pnpm/@selleragent+platform-config@0.2.0/node_modules/@selleragent/platform-config/dist/index.d.ts` | Installed platform-config API surface. |
| `/Users/deksden/Documents/_Projects/seller-agent/node_modules/.pnpm/@selleragent+platform-config@0.2.0/node_modules/@selleragent/platform-config/dist/index.js` | Installed platform-config behavior/defaults. |
| `/Users/deksden/Documents/_Projects/seller-agent/apps/cli/package.json` | Consumes shared and platform-config. |
| `/Users/deksden/Documents/_Projects/seller-agent/apps/server/package.json` | Consumes shared and platform-config. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/core/package.json` | Consumes shared. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/db/package.json` | Consumes shared. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/sa-admin/package.json` | Consumes shared and platform-config. |
| `/Users/deksden/Documents/_Projects/seller-agent/packages/sa-judge/package.json` | Consumes shared. |

### Docoved consumers checked

| path | notes |
| --- | --- |
| `/Users/deksden/Documents/_Projects/docoved-agent/package.json` | Root scripts/package manager. |
| `/Users/deksden/Documents/_Projects/docoved-agent/pnpm-workspace.yaml` | Workspace includes `apps/*` and `packages/*`. |
| `/Users/deksden/Documents/_Projects/docoved-agent/pnpm-lock.yaml` | Published `@selleragent/shared@0.2.0` dependency in core/db/dv-admin; no platform-config source import. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/package.json` | Depends on `@selleragent/shared@0.2.0`. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/db/package.json` | Depends on `@selleragent/shared@0.2.0`. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/dv-admin/package.json` | Depends on `@selleragent/shared@0.2.0`. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/src/runtime/kernel.ts` | Imports `timestamp`. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/src/runtime/research-workflow.ts` | Imports `timestamp`. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/db/src/auth-store.ts` | Imports `encryptSecret`, `decryptSecret`, `SecretEnvelope`. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/dv-admin/src/cli.ts` | Imports `parseYamlText`. |
| `/Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+shared@0.2.0/node_modules/@selleragent/shared/dist/index.d.ts` | Installed published shared API surface includes `business-profile-media` export. |
| `/Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+shared@0.2.0/node_modules/@selleragent/shared/dist/canonical-transcript.d.ts` | Stale installed file not exported by current source barrel. |

## Export and consumer table

| symbol/export group | current package | import kind | consumer paths | proposed target | classification | migration action | compatibility rule | verification gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `timestamp` | `@selleragent/shared` | Runtime named import | SellerAgent: `packages/core/src/**`, `packages/db/src/conversation-side-effect-store.ts`, `packages/db/src/customer-memory-store.ts`; Docoved: `packages/core/src/runtime/kernel.ts`, `packages/core/src/runtime/research-workflow.ts` | `@dd-bot-platform/core` support/runtime helper, or future platform support package | `shared-platform-helper` | `move-to-bot-platform-core` | Export from platform first; optionally leave `@selleragent/shared` compatibility re-export for one migration window; Docoved cuts over first because it is the cross-product consumer. | `rg -n "import \{ timestamp \} from '@selleragent/shared'" seller-agent docoved-agent`; then product typecheck after implementation slice. |
| `parseYamlText` | `@selleragent/shared` | Runtime named import | SellerAgent: `apps/cli/src/profile-project.ts`, `apps/server/src/business/profile-repo.ts`, `apps/server/src/business/publish.ts`, `packages/db/src/index.ts`, `packages/sa-admin/src/cli.ts`, `packages/sa-admin/src/project.ts`; Docoved: `packages/dv-admin/src/cli.ts` | `@dd-bot-platform/core` support config/YAML helper, or future platform support package | `shared-platform-helper` | `move-to-bot-platform-core` | Platform exports parser first; product compatibility re-export may remain temporarily because many SellerAgent files import it through the same barrel. | `rg -n "parseYamlText" seller-agent docoved-agent -g '!node_modules' -g '!dist'`; typecheck after cutover. |
| `stringifyYaml` | `@selleragent/shared` | Runtime named import | SellerAgent-only in `apps/cli/src/profile-project.ts`, `apps/server/src/internal-tooling/scenario-routes.ts`, `packages/db/src/index.ts`, `packages/sa-admin/src/*`, `packages/sa-judge/src/*` | Keep SellerAgent-local for now; can be paired with `parseYamlText` later only if Docoved or platform writers need identical formatting | `selleragent-product-contract` | `keep-selleragent-local` | No platform export unless a second product imports YAML stringify semantics or a support package deliberately standardizes YAML formatting. | `rg -n "stringifyYaml" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `loadYamlFile` | `@selleragent/shared` | Runtime named import | SellerAgent-only in `apps/cli/src/profile-project.ts`, `apps/server/src/operation-families/evaluations-explorer.ts`, `packages/sa-admin/src/*`, `packages/sa-judge/src/*` | SellerAgent-local helper, possibly renamed under a SellerAgent business-profile/admin utility package | `selleragent-product-contract` | `keep-selleragent-local` | Keep under SellerAgent; do not promote without non-SellerAgent consumer. | `rg -n "loadYamlFile" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `listFilesRecursively` | `@selleragent/shared` | Runtime named import | SellerAgent-only in `apps/cli/src/profile-project.ts`, `packages/sa-admin/src/project.ts`, `packages/sa-judge/src/assets.ts`, `packages/sa-judge/src/compare.ts`; Docoved has a separate local function in `apps/api/src/docoved-ingest-execution.ts` but no import | Potential platform file helper only if normalized with Docoved import/source-processing needs; otherwise SellerAgent-local | `needs-design-decision` | `defer-new-protocol` | Do not move as-is. If reused, define a source-processing filesystem helper contract in platform and compare behavior with Docoved local implementation. | Search both import and local definitions: `rg -n "listFilesRecursively" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `readProjectFile`, `readProjectFileWithOptions`, `BusinessProfileProjectFile`, `BusinessProfileProjectTextFile`, `BusinessProfileProjectBinaryFile` | `@selleragent/shared` | Runtime/type named import | SellerAgent-only in `apps/cli/src/profile-project.ts`, `apps/server/src/business/profile-repo.ts`, `packages/sa-admin/src/project.ts` | SellerAgent business-profile package | `selleragent-product-contract` | `keep-selleragent-local` | Keep local because file object shape is tied to SellerAgent business-profile bundle semantics and media upload flow. | `rg -n "readProjectFile|BusinessProfileProjectFile" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `writeProjectFiles` | `@selleragent/shared` | Runtime named import | SellerAgent-only in `apps/cli/src/profile-project.ts`, `apps/server/src/internal-tooling/scenario-routes.ts`, `packages/sa-admin/src/project.ts` | SellerAgent business-profile/scenario tooling package | `selleragent-product-contract` | `keep-selleragent-local` | Keep local; writes product project files and should not become platform behavior without source-processing design. | `rg -n "writeProjectFiles" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `normalizeDeclarationEnvironments`, `declarationTargetsEnvironment`, `normalizeEnvValue` | `@selleragent/shared` | Runtime named import | SellerAgent-only in `apps/cli/src/profile-project.ts`, `packages/db/src/index.ts`, `packages/sa-admin/src/project.ts`; `normalizeEnvValue` is exported but no direct source import observed outside defining module | SellerAgent business-profile declaration helper | `selleragent-product-contract` | `keep-selleragent-local` | Keep local because current semantics are business-profile declaration targeting, not generic platform environments. | `rg -n "normalizeDeclarationEnvironments|declarationTargetsEnvironment|normalizeEnvValue" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `loadEnvFileToMap`, `applyResolvedEnv` | `@selleragent/shared` | Runtime named import | SellerAgent-only in `apps/cli/src/profile-project.ts`, `packages/sa-admin/src/context.ts` | SellerAgent CLI/admin support | `selleragent-product-contract` | `keep-selleragent-local` | Keep local; includes SellerAgent CLI env loading and `OPENAI_API_KEY2` alias behavior. | `rg -n "loadEnvFileToMap|applyResolvedEnv" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `BusinessProfileProjectError`, `BusinessProfileRootResolution`, `BusinessProfileGitMetadata`, `detectBusinessProfileRoot`, `resolveBusinessProfileGitMetadata` | Currently implemented in `@selleragent/shared`, but active consumers import from `@selleragent/core` | Runtime/type imports from `@selleragent/core`, not `@selleragent/shared` | SellerAgent `apps/cli/src/profile-project.ts`, `packages/sa-admin/src/project.ts`; no Docoved `@selleragent/shared` import | SellerAgent core/business-profile ownership | `selleragent-product-contract` | `keep-selleragent-local` | Do not platformize; active import path is already SellerAgent core. If shared barrel still exports these, treat as compatibility residue. | `rg -n "BusinessProfileProjectError|detectBusinessProfileRoot|resolveBusinessProfileGitMetadata" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `BusinessProfileBundleFile`, `BusinessProfileMediaAssetKind`, `BusinessProfileMediaFolderRegistryEntry`, `BusinessProfileMediaAssetRegistryEntry`, `BusinessProfileMediaRegistrySnapshot`, `BusinessProfileMediaScopeResult`, `normalizeBundleFiles`, `resolveBusinessProfileMediaScope` | `@selleragent/shared/src/business-profile-media.ts`; installed published `@selleragent/shared@0.2.0` exports it, current source barrel does not | No direct `@selleragent/shared` source import observed; active SellerAgent consumers import `resolveBusinessProfileMediaScope` from `@selleragent/core` | SellerAgent business-profile media/admin flows; Docoved uses `BusinessProfileMediaRegistry` types from the still-misnamed api-contract, not shared | SellerAgent business-profile media package | `selleragent-product-contract` | `keep-selleragent-local` | Do not move to platform; media semantics are business-profile publication/authoring. Resolve source/dist export drift before any package publication. | `rg -n "resolveBusinessProfileMediaScope|normalizeBundleFiles|BusinessProfileMedia" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `ProvisioningActionClass`, `ProvisioningActionKind`, `ProvisioningPolicyEntry`, `classifyProvisioningAction`, `provisioningEntryForEnvironment`, `provisioningPolicyForEnvironment`, `assertProvisioningActionAllowed` | `@selleragent/shared` | Runtime/type named import | SellerAgent-only: `apps/cli/src/admin-auth.ts`, `packages/sa-admin/src/provisioning.ts`; no Docoved source import | SellerAgent admin/bootstrap policy unless redesigned as generic platform provisioning envelope | `selleragent-product-contract` | `keep-selleragent-local` | Keep local. The action names include `business_profile_apply` and `scenario_demo_seed`, so this is not a pure platform policy contract. | `rg -n "ProvisioningPolicyEntry|provisioningPolicyForEnvironment|assertProvisioningActionAllowed|classifyProvisioningAction" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `SecretAlgorithm`, `SecretEnvelope`, `encryptSecret`, `decryptSecret` | `@selleragent/shared` | Runtime/type named import | SellerAgent: `packages/db/src/index.ts`; Docoved: `packages/db/src/auth-store.ts` | `@dd-bot-platform/core` security/support helper, or future platform support package | `shared-platform-helper` | `move-to-bot-platform-core` | Platform exports first. Preserve exact envelope wire shape and algorithm string; `@selleragent/shared` compatibility re-export may stay until both products cut over. | `rg -n "encryptSecret|decryptSecret|SecretEnvelope|SecretAlgorithm" seller-agent docoved-agent -g '!node_modules' -g '!dist'`; add cross-product round-trip test in implementation slice. |
| `createRunId` | `@selleragent/shared` | Export only; no source consumer observed in SellerAgent or Docoved | None found outside export definition | None unless future platform run-id contract needs it | `dead-or-retirable` | `delete-after-proof` | Do not move. Prove no published consumer or keep deprecated compatibility only if package semver requires. | `rg -n "createRunId" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |
| `PlatformInvitePolicyConfig`, `PlatformInviteEmailConfig`, `PlatformConfig`, `DEFAULT_PLATFORM_INVITE_POLICY`, `resolvePlatformConfig` | `@selleragent/platform-config@0.2.0` published dependency, not local workspace package | Runtime/type named import; only `resolvePlatformConfig` imported in source | SellerAgent: `apps/server/src/server-composition/bootstrap-support.ts`, `packages/sa-admin/src/cli.ts`; no Docoved source import | Split: generic invite policy/env parsing to `@dd-bot-platform/core` or future platform config support package; product default email identity stays SellerAgent-local | `needs-design-decision` | `defer-new-protocol` | Do not move wholesale. Record defaults/override contract first because installed default `fromEmail` is `invite@selleragent.pro`. | `rg -n "@selleragent/platform-config|resolvePlatformConfig|DEFAULT_PLATFORM_INVITE_POLICY" seller-agent docoved-agent -g '!node_modules' -g '!dist'`; inspect installed package `dist/index.d.ts`/`dist/index.js`. |
| Installed-only `canonical-transcript.d.ts` / `buildCanonicalConversationTranscript` residue | Published `@selleragent/shared@0.2.0` installed in Docoved node_modules | No source import observed | None found; SellerAgent has local `buildCanonicalConversationTranscript` implementation in `packages/sa-admin/src/conversations.ts` | None until source/publish drift is explained | `temporary-legacy-bridge` | `delete-after-proof` | Treat as stale published residue; do not migrate unless a hidden external consumer is found. | `rg -n "canonical-transcript|buildCanonicalConversationTranscript|CanonicalConversationBundle" seller-agent docoved-agent -g '!node_modules' -g '!dist'`. |

## Explicit keep/split/move decisions

| decision | exports | rationale | status |
| --- | --- | --- | --- |
| Move to platform support/core | `timestamp`; `parseYamlText`; `SecretAlgorithm`, `SecretEnvelope`, `encryptSecret`, `decryptSecret` | These are product-agnostic and have real SellerAgent plus Docoved source consumers. | Final for Phase 2 implementation planning. |
| Keep SellerAgent-local | Business-profile project, file, env, media, provisioning, YAML stringify/file-load helpers | Current consumers are SellerAgent-only and semantics tie to business-profile authoring, provisioning, scenarios, or admin workflows. | Final unless a later source-processing/platform-support design proves cross-product use. |
| Split before moving | `@selleragent/platform-config` | Package name and config surface are platform-shaped, but current consumers are SellerAgent-only and defaults include SellerAgent branding. | Deferred design decision. |
| Delete or leave deprecated after proof | `createRunId`; installed-only `canonical-transcript` residue | No active source consumers found in SellerAgent/Docoved. | Needs external/published consumer proof before deletion. |
| Defer design | `listFilesRecursively` | SellerAgent imports it; Docoved independently implements a similarly named local helper in ingest execution, suggesting possible platform source-processing overlap but not enough to move the current helper as-is. | Deferred to governed-content/source-processing slice. |

## Current Docoved consumer references that are urgent for cutover

| Docoved path | current import | urgency |
| --- | --- | --- |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/src/runtime/kernel.ts` | `timestamp` from `@selleragent/shared` | High: runtime core should not depend on SellerAgent helper namespace. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/src/runtime/research-workflow.ts` | `timestamp` from `@selleragent/shared` | High: runtime workflow should cut over with kernel. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/db/src/auth-store.ts` | `encryptSecret`, `decryptSecret`, `SecretEnvelope` from `@selleragent/shared` | High: auth secret envelope is cross-product security substrate. Preserve wire compatibility. |
| `/Users/deksden/Documents/_Projects/docoved-agent/packages/dv-admin/src/cli.ts` | `parseYamlText` from `@selleragent/shared` | Medium: admin CLI dependency is small but blocks removing `@selleragent/shared` from `packages/dv-admin`. |

## Blockers and design decisions

1. `@selleragent/platform-config` source is absent from the SellerAgent workspace. The package can be inspected only as installed/published `0.2.0` under `node_modules/.pnpm`. Any implementation slice must first decide where the canonical source now lives or recreate it in the owning repo.
2. `@selleragent/platform-config` needs a product-branding/defaults decision before migration. Invite policy limits are generic, but invite email defaults are SellerAgent-specific.
3. `@selleragent/shared` source and installed/published declaration surfaces differ. Current SellerAgent source barrel omits `business-profile-media`, while the installed Docoved `@selleragent/shared@0.2.0` declaration exports it and also contains an installed-only `canonical-transcript` declaration file. This should block publishing until source/dist provenance is reconciled.
4. `listFilesRecursively` has possible shared source-processing value, but Docoved currently owns an ingest-specific local implementation. Moving SellerAgent's version without designing source-processing semantics risks flattening product import behavior.
5. Business-profile/media/provisioning helpers must not be moved as generic platform helpers because the boundary docs explicitly keep SellerAgent business-profile authoring/publication, scenario/demo seeding, commerce, customer memory, and operator workflow semantics product-local.

## Recommended Phase 2/4 implementation slices

### Phase 2: platform extraction and Docoved cutover blockers

1. Add platform support/core `timestamp` and YAML parse helper exports in `bot-platform`, then cut Docoved `packages/core` and `packages/dv-admin` imports from `@selleragent/shared` to `@dd-bot-platform/*`.
2. Add platform security secret envelope helpers preserving the exact `aes-256-gcm` envelope shape, then cut Docoved `packages/db/src/auth-store.ts` and SellerAgent DB consumers to the platform export.
3. Remove `@selleragent/shared` from Docoved `packages/core`, `packages/db`, and `packages/dv-admin` manifests only after the symbol cutover is complete and typecheck passes.

### Phase 4: SellerAgent cleanup and compatibility retirement

1. Rename or split SellerAgent business-profile/admin helpers out of ambiguous `@selleragent/shared` into a clearer SellerAgent-owned package or internal module.
2. Decide `@selleragent/platform-config` ownership: move only generic invite policy/env parsing to platform and keep product-branded defaults in SellerAgent.
3. Reconcile source/dist drift for `business-profile-media` and installed-only `canonical-transcript` before the next publish.
4. After external consumer proof, delete unused `createRunId` or retain it as a documented deprecated compatibility export for one semver window.

## Skipped checks with rationale

| skipped check | rationale |
| --- | --- |
| Builds/typechecks/tests | Task explicitly requires read-only search commands only and no CI/hosted/build/package gates. |
| Dependency install or lockfile update | Explicitly forbidden by task. Existing `node_modules` and lockfiles were inspected read-only. |
| Product source edits | Explicitly forbidden by task. |
| Manifest edits | Explicitly forbidden by task. |
| Hosted verification | Not applicable to a read-only inventory. |
| External npm registry lookup | Not needed for current workspace evidence; installed lockfile artifacts were sufficient to identify the published package surfaces present in the repos. |

## Exact commands and searches used

```sh
sed -n '1,240p' /Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/tasks/T041-I2-selleragent-shared-config-inventory.md
sed -n '1,260p' /Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md
sed -n '1,220p' /Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/feature-area-boundaries.md
sed -n '1,260p' /Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md
sed -n '1,260p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md
pwd && rg --files -g 'package.json' -g 'pnpm-workspace.yaml' -g 'yarn.lock' -g 'package-lock.json' -g 'pnpm-lock.yaml' -g 'tsconfig*.json'
find packages/shared packages/platform-config -maxdepth 3 -type f | sort
rg -n "@selleragent/(shared|platform-config)|@selleragent/shared|@selleragent/platform-config" /Users/deksden/Documents/_Projects/seller-agent /Users/deksden/Documents/_Projects/docoved-agent -g '!node_modules' -g '!dist' -g '!build' -g '!coverage'
rg -n "export |export\*|module\.exports|exports" packages/shared packages/platform-config
sed -n '1,220p' packages/shared/package.json
sed -n '1,460p' packages/shared/src/index.ts
sed -n '1,460p' packages/shared/src/business-profile-project.ts
sed -n '1,360p' packages/shared/src/business-profile-media.ts
sed -n '1,180p' packages/shared/src/provisioning-policy.ts
sed -n '1,120p' packages/shared/src/secrets.ts
sed -n '1,160p' pnpm-workspace.yaml && sed -n '1,140p' package.json
rg -n "platform-config|@selleragent/shared" package.json pnpm-workspace.yaml packages/*/package.json apps/*/package.json pnpm-lock.yaml
for file in $(rg -l "@selleragent/shared" /Users/deksden/Documents/_Projects/seller-agent /Users/deksden/Documents/_Projects/docoved-agent -g '!node_modules' -g '!dist' -g '!build' -g '!coverage'); do printf '\n## %s\n' "$file"; rg -n -C 3 "@selleragent/shared" "$file"; done
for file in $(rg -l "@selleragent/platform-config" /Users/deksden/Documents/_Projects/seller-agent /Users/deksden/Documents/_Projects/docoved-agent -g '!node_modules' -g '!dist' -g '!build' -g '!coverage'); do printf '\n## %s\n' "$file"; rg -n -C 3 "@selleragent/platform-config" "$file"; done
find node_modules/.pnpm -path '*@selleragent+platform-config*' -maxdepth 4 -type f | sort | head -50
find node_modules/.pnpm -path '*@selleragent+platform-config*' -maxdepth 6 -type f | sort
find /Users/deksden/Documents/_Projects/seller-agent -path '*@selleragent*platform-config*' -print | sort | head -100
rg -n "resolvePlatformConfig|PlatformConfig|platform config|PLATFORM" /Users/deksden/Documents/_Projects/seller-agent /Users/deksden/Documents/_Projects/docoved-agent -g '!node_modules' -g '!dist' -g '!build' -g '!coverage'
rg -n "BusinessProfile|Provisioning|SecretEnvelope|encryptSecret|decryptSecret|createRunId|timestamp|parseYamlText|stringifyYaml|loadYamlFile|listFilesRecursively|writeProjectFiles|loadEnvFileToMap|applyResolvedEnv|readProjectFile|normalizeDeclaration|declarationTargets|resolveBusinessProfileMediaScope|normalizeBundleFiles" /Users/deksden/Documents/_Projects/docoved-agent /Users/deksden/Documents/_Projects/seller-agent -g '!node_modules' -g '!dist' -g '!build' -g '!coverage'
find /Users/deksden/Documents/_Projects/docoved-agent -path '*@selleragent*shared*' -print | sort | head -80
sed -n '1,220p' node_modules/.pnpm/@selleragent+platform-config@0.2.0/node_modules/@selleragent/platform-config/package.json && sed -n '1,260p' node_modules/.pnpm/@selleragent+platform-config@0.2.0/node_modules/@selleragent/platform-config/dist/index.d.ts && sed -n '1,260p' node_modules/.pnpm/@selleragent+platform-config@0.2.0/node_modules/@selleragent/platform-config/dist/index.js
sed -n '1,260p' node_modules/.pnpm/@selleragent+shared@0.2.0/node_modules/@selleragent/shared/dist/index.d.ts && sed -n '1,220p' node_modules/.pnpm/@selleragent+shared@0.2.0/node_modules/@selleragent/shared/dist/canonical-transcript.d.ts
sed -n '1,220p' packages/shared/dist/index.d.ts && ls packages/shared/dist
for f in packages/core/package.json packages/db/package.json packages/dv-admin/package.json apps/api/package.json package.json pnpm-workspace.yaml; do echo "## $f"; sed -n '1,120p' "$f"; done
node <<'NODE'
const fs = require('fs');
const cp = require('child_process');
for (const repo of ['/Users/deksden/Documents/_Projects/seller-agent','/Users/deksden/Documents/_Projects/docoved-agent']) {
  const files = cp.execFileSync('rg',['-l','@selleragent/shared|@selleragent/platform-config',repo,'-g','!node_modules','-g','!dist','-g','!build','-g','!coverage'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
  console.log('REPO', repo);
  for (const file of files) {
    if (!file.endsWith('.ts') && !file.endsWith('.tsx') && !file.endsWith('.js') && !file.endsWith('.mjs')) continue;
    const text = fs.readFileSync(file,'utf8');
    const re = /import\s+\{([\s\S]*?)\}\s+from\s+['"](@selleragent\/(?:shared|platform-config))['"]/g;
    let m;
    while ((m = re.exec(text))) {
      const specs = m[1].split(',').map(s=>s.trim().replace(/^type\s+/, 'type ')).filter(Boolean).join(', ');
      console.log(`${file}\n  ${m[2]}: ${specs}`);
    }
  }
}
NODE
rg -n "\bcreateRunId\b|\btimestamp\b|\bdecryptSecret\b|\bencryptSecret\b|\bSecretEnvelope\b|\bparseYamlText\b|\bstringifyYaml\b|\bloadYamlFile\b|\blistFilesRecursively\b|\bwriteProjectFiles\b|\bloadEnvFileToMap\b|\bapplyResolvedEnv\b|\breadProjectFile\b|\breadProjectFileWithOptions\b|\bnormalizeDeclarationEnvironments\b|\bdeclarationTargetsEnvironment\b|\bprovisioningPolicyForEnvironment\b|\bassertProvisioningActionAllowed\b|\bProvisioningPolicyEntry\b|\bresolvePlatformConfig\b|\bDEFAULT_PLATFORM_INVITE_POLICY\b" /Users/deksden/Documents/_Projects/seller-agent /Users/deksden/Documents/_Projects/docoved-agent -g '!node_modules' -g '!dist' -g '!build' -g '!coverage'
rg -n "resolveBusinessProfileMediaScope|normalizeBundleFiles|BusinessProfileMedia|BusinessProfileBundleFile|BusinessProfileProjectError|BusinessProfileRootResolution|BusinessProfileGitMetadata|detectBusinessProfileRoot|resolveBusinessProfileGitMetadata" /Users/deksden/Documents/_Projects/seller-agent /Users/deksden/Documents/_Projects/docoved-agent -g '!node_modules' -g '!dist' -g '!build' -g '!coverage'
rg -n "@selleragent/platform-config" /Users/deksden/Documents/_Projects/docoved-agent -g '!node_modules' -g '!dist' -g '!build' -g '!coverage'
rg -n "canonical-transcript|buildCanonicalConversationTranscript|CanonicalConversationBundle" /Users/deksden/Documents/_Projects/seller-agent /Users/deksden/Documents/_Projects/docoved-agent -g '!node_modules' -g '!dist' -g '!build' -g '!coverage'
ls -la /Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment && find /Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment -maxdepth 2 -type d | sort
```
