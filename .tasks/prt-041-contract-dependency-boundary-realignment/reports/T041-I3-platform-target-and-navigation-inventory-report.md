---
file: .tasks/prt-041-contract-dependency-boundary-realignment/reports/T041-I3-platform-target-and-navigation-inventory-report.md
description: Read-only inventory report for platform target packages and cross-repo Memory Bank navigation truth surfaces.
purpose: Support PRT-041 Phase 1 by mapping likely shared symbols to existing bot-platform package homes and identifying stale current entrypoint wording.
date: 2026-04-24
task: T041-I3
status: COMPLETE
---

# T041-I3 Platform Target And Navigation Inventory Report

## Executive Summary

Read-only inventory completed across `bot-platform`, `seller-agent`, and `docoved-agent`.

Key findings:

- Existing `bot-platform` packages are sufficient for the likely shared target classes found in the current dependency boundary problem. Prefer `@dd-bot-platform/api-contract` for schema/read-model/API envelope contracts and `@dd-bot-platform/core` for runtime helpers, pipeline registry, control-plane object vocabulary, governed-content lifecycle helpers, and source-processing helpers.
- Do not introduce a broad `@dd-bot-platform/shared` package for the current evidence set. The existing package split already provides narrower, better-aligned homes.
- Product-local Docoved imports from `@selleragent/api-contract` mix shared platform concepts, Docoved product contracts, SellerAgent product contracts, and temporary legacy bridge symbols. Implementation must classify at symbol level before moving anything.
- Current root/protocol/status entrypoints mostly distinguish closed adoption baselines from active `PRT-041`, but both product `plans/index.md` files still contain current normative wording that calls the closed adoption packets active next-wave/local planning start packets.
- `bot-platform/.memory-bank/plans/current-status-report.md` still contains non-history wording saying “protocol hardening is now landed in the active convergence packet” for `PRT-038`; surrounding lines correctly mark `PRT-038` closed, so this is a low-to-medium risk wording cleanup rather than a source-of-truth inversion.

## Exact Package And Docs Surfaces Inspected

Platform package surfaces:

| repo | surface | inspected content |
| --- | --- | --- |
| `bot-platform` | `packages/api-contract/package.json` | package identity, exports, version, dependencies |
| `bot-platform` | `packages/api-contract/src/index.ts` | public export root |
| `bot-platform` | `packages/api-contract/src/runtime.ts` | runtime usage schema |
| `bot-platform` | `packages/api-contract/src/semantic-eval.ts` | semantic evaluation contracts |
| `bot-platform` | `packages/api-contract/src/control-plane/**` | control-plane schema/read-model/envelope/vocabulary exports |
| `bot-platform` | `packages/api-contract/src/governed-content/**` | governed-content schema/read-model/envelope/vocabulary exports |
| `bot-platform` | `packages/core/package.json` | package identity, exports, version, dependencies |
| `bot-platform` | `packages/core/src/index.ts` | public export root |
| `bot-platform` | `packages/core/src/runtime/**` | kernel, provider-result, provider-stage, pipeline registry, execution result helpers |
| `bot-platform` | `packages/core/src/control-plane/**` | object vocabulary, refs, mutation envelopes, channel-binding helpers, observability helpers |
| `bot-platform` | `packages/core/src/governed-content/**` | governed-content vocabulary, lifecycle guards, idempotency, transitions, source-processing contracts/helpers |
| `bot-platform` | `packages/scenario-system/package.json` | package identity, exports, version, dependencies |
| `bot-platform` | `packages/scenario-system/src/**` | scenario catalog/types/artifact/fixture/semantic-eval exports |

Product package and dependency surfaces:

| repo | surface | inspected content |
| --- | --- | --- |
| `seller-agent` | `packages/*/package.json` | package names, current `@selleragent/*` ownership, platform dependency examples |
| `docoved-agent` | `packages/*/package.json` | misnamed `packages/api-contract`, `@selleragent/api-contract`, `@selleragent/shared`, `@selleragent/core` dependencies |
| `docoved-agent` | `apps/**`, `packages/**`, `scripts/**` TypeScript imports | symbol-level imports from `@selleragent/api-contract`, `@selleragent/shared`, and `@selleragent/core` |

Memory Bank entrypoints:

| repo | entrypoints inspected |
| --- | --- |
| `bot-platform` | `.memory-bank/index.md`, `.memory-bank/plans/index.md`, `.memory-bank/plans/protocols/index.md`, `.memory-bank/plans/current-status-report.md` |
| `seller-agent` | `.memory-bank/index.md`, `.memory-bank/plans/index.md`, `.memory-bank/plans/protocols/index.md`, `.memory-bank/plans/current-status-report.md` |
| `docoved-agent` | `.memory-bank/index.md`, `.memory-bank/plans/index.md`, `.memory-bank/plans/protocols/index.md`, `.memory-bank/plans/current-status-report.md` |

Normative context read:

| repo | file |
| --- | --- |
| `bot-platform` | `.memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md` |
| `bot-platform` | `.memory-bank/spec/architecture/boundaries.md` |
| `bot-platform` | `.memory-bank/spec/project/feature-area-boundaries.md` |
| `bot-platform` | `.memory-bank/spec/project/three-layer-product-line-architecture.md` |

## Platform Target Map

| candidate shared target / symbol family | current evidence | existing platform home | classification | migration action | decision notes |
| --- | --- | --- | --- | --- | --- |
| Control-plane object vocabulary: user/principal/session/membership/workspace/product instance/channel/pipeline binding/execution run/trace artifact | `docoved-agent` imports `ChannelRecord`, `OperationsStatusSnapshot`, `OperatorAccessContext`, `WorkspaceMembership`, `ChannelSurfaceKind`, `ExecutionTraceRun`, `ExecutionTraceArtifact`, plus operation schemas around channels/access/diagnostics | `@dd-bot-platform/api-contract` already exports `ControlPlane*` schemas/read models and `@dd-bot-platform/core` already exports object interfaces, refs, and channel-binding helpers | `shared-platform-contract` | `move-to-bot-platform-api-contract` for schemas/read models; `move-to-bot-platform-core` for helper logic | Existing names differ from SellerAgent names, so Phase 2 should either adapt consumers to platform vocabulary or add narrow compatibility aliases with expiry. Avoid moving whole SellerAgent API contract upward. |
| Governed-content/import lifecycle: sources, source revisions, import runs, processing artifacts, import diagnostics/readbacks | `docoved-agent` imports `ImportRun`, `ImportRunStatus`, `SourceRevision`, `SourceRevisionReviewStatus`, `KnowledgeSource`, `toKnowledgeSourceRef`, `ops*Import*` schemas, import diagnostics schemas | `@dd-bot-platform/api-contract` already exports governed-content models/readbacks; `@dd-bot-platform/core` exports lifecycle guards, idempotency keys, transitions, source-processing contracts/helpers | `shared-platform-contract` and `shared-platform-helper` | `move-to-bot-platform-api-contract` and `move-to-bot-platform-core` | Good existing homes. `SourceRevisionReviewStatus` may be product-policy-specific if it encodes Docoved review semantics; classify before move. |
| Runtime usage/provider attempt/prompt metadata | `docoved-agent` imports `RuntimeUsage`, `RuntimeGenerationAttempt`, `RuntimeProviderAttempt`, `RuntimePromptMeta`, `RuntimeBackendKind`, `RuntimeModelPolicy`, `RuntimeProvider*` | `@dd-bot-platform/api-contract` has `RuntimeUsage`; `@dd-bot-platform/core` has provider-result/provider-stage abstractions, but not exact SellerAgent runtime-attempt schemas | mixed: `shared-platform-contract` for usage; `needs-design-decision` for attempt/prompt metadata | usage: `move-to-bot-platform-api-contract`; attempt metadata: defer or add narrow platform runtime contract | Exact attempt/metadata names may carry SellerAgent history/analysis semantics. Phase 2 should not blanket-move them without a decision record. |
| Runtime kernel and pipeline registry | `docoved-agent` imports `PipelineId`, `requirePipelineDefinition`, `DecisionEnvelope`, `DecisionTrace`, `Conversation`, `ConversationMessage` | `@dd-bot-platform/core` exports `PipelineId`, `PipelineDefinition`, `requirePipelineDefinition`, execution kernel primitives; `@dd-bot-platform/api-contract` does not currently own conversation/decision types | mixed: `shared-platform-helper`, `shared-platform-contract`, `needs-design-decision` | `move-to-bot-platform-core` for pipeline helpers; design decision for conversation/decision contracts | Pipeline registry has a clear existing home. Conversation/decision envelopes might need new platform interaction-substrate contracts, but Docoved answer semantics must stay product-local. |
| Operation catalog and operation schemas | `docoved-agent` imports `auth*Operation`, `channels*Operation`, `docovedAnswerOperation`, request/response schemas for import/diagnostics/channel mutations | `@dd-bot-platform/api-contract` owns shared API/schema envelope patterns but does not currently export these exact operation definitions | mixed: shared platform operations vs product operations | shared operations: `move-to-bot-platform-api-contract`; product operations: `keep-docoved-local` or `keep-selleragent-local` | `docovedAnswerOperation` is Docoved product behavior and should not move to platform. Auth/channel/import/diagnostics schemas are candidates for narrow platform operation contracts. |
| Error vocabulary | `docoved-agent` imports `PlatformErrorCode`; code also imports `OperationError` from local `@docoved-agent/core` | `@dd-bot-platform/core` already has `ControlPlaneMutationError`, governed-content error envelopes, and `PipelineRegistryError`; `@dd-bot-platform/api-contract` has error-envelope schemas for control-plane/governed-content | `shared-platform-contract` if generic; `needs-design-decision` if tied to old SellerAgent operation catalog | `move-to-bot-platform-api-contract` for generic error code/envelope; avoid broad shared helper | Need align error-code taxonomy with existing control-plane/governed-content errors rather than copying SellerAgent platform error names directly. |
| Secret crypto helpers | `docoved-agent` imports `decryptSecret`, `encryptSecret`, `SecretEnvelope` from `@selleragent/shared` | no exact existing `bot-platform` export found in inspected package surfaces | `shared-platform-helper` or `needs-design-decision` | `defer-new-protocol` or define a narrow future support package only if multiple consumers require it | This is the clearest gap. It should not force a broad `@dd-bot-platform/shared`; a future auth/security support package or product-local replacement is safer. |
| Generic utility helpers | `docoved-agent` imports `timestamp` and `parseYamlText` from `@selleragent/shared` | no exact existing `bot-platform` export found; YAML is a simple dependency-level utility | `temporary-legacy-bridge` or `replace-with-product-local-helper` | `replace-with-product-local-helper` unless multiple products require a governed helper | These are too small/generic to justify new shared package movement. Product-local helpers are likely cheapest. |
| Product contracts: Docoved answer/search/report/citation semantics | `docoved-agent` imports `DocovedAnswerResponse`, `DocovedSourceRow`, `RetrievedDocRef`, `docovedAnswerOperation` from `@selleragent/api-contract` | no platform home should own product answer semantics | `docoved-product-contract` | `keep-docoved-local`; possibly `rename-docoved-package` for `packages/api-contract` | Move to `@docoved-agent/api-contract` or Docoved-local package, not `bot-platform`. |
| Product contracts: SellerAgent business/auth/Telegram semantics | `docoved-agent` imports `BusinessProfile`, `BusinessProfileMediaRegistry`, `OperatorRole`, `Telegram*`, `IntegrationsUpsertTelegramBotInput`, `RuntimeProvider` | SellerAgent product packages own these unless narrowed as generic platform auth/channel concepts | `selleragent-product-contract` or `needs-design-decision` | keep SellerAgent-local, or replace with Docoved/platform vocabulary | Avoid pulling SellerAgent product terms upward. If Docoved still needs operator/Telegram roles, define Docoved-local or platform-neutral equivalents. |
| Scenario/eval system | Existing product packages already use `@dd-bot-platform/scenario-system` in SellerAgent `sa-judge` and platform exports scenario taxonomy/artifacts/fixtures/transcripts | `@dd-bot-platform/scenario-system` | `shared-platform-contract` / `shared-platform-helper` | already in correct platform package | No new target needed for PRT-041 import cleanup unless scenario symbols appear in later slices. |

## Docoved Import Inventory Summary

The symbol-level import scan found these active Docoved dependency groups:

| current package | importing surfaces | symbol families |
| --- | --- | --- |
| `@selleragent/api-contract` | `docoved-agent/apps/api/**`, `apps/server/**`, `packages/core/**`, `packages/db/**`, `packages/dv-admin/**`, `scripts/**` | control-plane channel/access operations, governed-content import/diagnostics schemas, execution traces, runtime usage/attempt metadata, conversation/message contracts, Docoved answer contracts, SellerAgent business/operator/Telegram contracts |
| `@selleragent/shared` | `docoved-agent/packages/core`, `packages/db`, `packages/dv-admin` | `timestamp`, `decryptSecret`, `encryptSecret`, `SecretEnvelope`, `parseYamlText` |
| `@selleragent/core` | `docoved-agent/packages/db/package.json` | package dependency `0.1.1`; no TypeScript import was found by the searched pattern |

Detailed structured inventory was also written to `inventory/platform-target-symbol-map.md`.

## Memory Bank Truth-Surface Table

Only current normative entrypoint wording is listed below. Historical `history:` lines were not treated as stale unless the current body also contradicted the closed/active state.

| repo | file | current wording | normative or historical | risk | recommended change |
| --- | --- | --- | --- | --- | --- |
| `bot-platform` | `.memory-bank/index.md` | Protocols hub names closed split/convergence protocols `PRT-036` / `PRT-038` and active dependency-boundary cleanup protocol `PRT-041`; reading order says `PRT-038` is a closed architecture/handoff baseline and `PRT-036` is closed split lineage. | normative | low | No change required. Wording distinguishes active vs closed correctly. |
| `bot-platform` | `.memory-bank/plans/index.md` | Immediate planning priorities say `PRT-038` is closed, active execution is `PRT-041`, and `PRT-039`/`PRT-040` are closed child packets. | normative | low | No change required. |
| `bot-platform` | `.memory-bank/plans/protocols/index.md` | Current protocol status says `PRT-038` closed, `PRT-039`/`PRT-040` closed, `PRT-041` active, and future work should open new protocols instead of extending `PRT-038` unless part of `PRT-041`. | normative | low | No change required. |
| `bot-platform` | `.memory-bank/plans/current-status-report.md` | Earlier body section says “protocol hardening is now landed in the active convergence packet” and then lists `PRT-038`/`PRT-039`/`PRT-040`; later sections correctly say downstream adoption packets are closed, no `PRT-038` blocker remains, and next work starts under `PRT-041`. | normative | medium | Replace “active convergence packet” with closed baseline wording, for example “closed convergence packet baseline,” while keeping the landed-hardening facts. |
| `seller-agent` | `.memory-bank/index.md` | Root describes closed adoption protocol `PRT-008`, upstream active `PRT-041`, and says `PRT-008` is baseline, not active execution. | normative | low | No change required. |
| `seller-agent` | `.memory-bank/plans/index.md` | Core entrypoints say “Active next-wave local protocol: PRT-008”; kickoff rule says “The current local planning start packet is: PRT-008” and still points upstream to `bot-platform PRT-038`. | normative | high | Reframe `PRT-008` as closed baseline; point dependency-boundary cleanup to upstream `PRT-041`; say new SellerAgent product work needs a new local protocol grounded in `PRT-008`, not reopening it. |
| `seller-agent` | `.memory-bank/plans/protocols/index.md` | Protocol hub says `PRT-008` is closed baseline and dependency-boundary cleanup aligns with upstream `PRT-041`. | normative | low | No change required. |
| `seller-agent` | `.memory-bank/plans/current-status-report.md` | Status says `PRT-008` no longer has open hosted blocker, follow-up should align with upstream `PRT-041`. One list still labels “planned PRT-008 governed-surface anchors,” but the surrounding status documents closure. | normative | low | Optional wording cleanup from “planned PRT-008” to “PRT-008 governed-surface anchors” to avoid implying future execution. Not blocking. |
| `docoved-agent` | `.memory-bank/index.md` | Root describes closed adoption protocol `PRT-038`, upstream active `PRT-041`, and says `PRT-038` is the closed local adoption baseline. | normative | low | No change required. |
| `docoved-agent` | `.memory-bank/plans/index.md` | Remaining protocol migration backlog says “Active next-wave local protocol is PRT-038”; kickoff rule says “The current local planning start packet is: PRT-038” and still points upstream to `bot-platform PRT-038`. | normative | high | Reframe local `PRT-038` as closed baseline; point dependency-boundary cleanup to upstream `PRT-041`; say new Docoved-local follow-up should be opened only if product-owned code/docs need changes. |
| `docoved-agent` | `.memory-bank/plans/protocols/index.md` | Protocol hub says local `PRT-038` is the closed self-contained Docoved adoption baseline and dependency cleanup aligns with upstream `PRT-041`. | normative | low | No change required. |
| `docoved-agent` | `.memory-bank/plans/current-status-report.md` | Status says bounded Wave 04/05 `PRT-038` follow-up line is closed and next work is aligned with upstream `PRT-041`. | normative | low | No change required. |

Detailed structured navigation inventory was also written to `inventory/product-navigation-truth-surface-map.md`.

## Blockers And Design Decisions

Blocking or design-sensitive items before implementation:

- `docoved-agent/packages/api-contract/package.json` still declares `name: "@selleragent/api-contract"`; package rename/cutover must be staged separately from symbol movement because consumers may rely on workspace resolution.
- `@selleragent/api-contract` contains both shared-looking platform contracts and product contracts. Moving or re-exporting at package level would violate the PRT-041 symbol-level classification rule.
- Conversation, decision-envelope, runtime-attempt, and prompt-metadata contracts need a design decision before platform extraction because exact current SellerAgent names may embed product semantics even though interaction-substrate equivalents belong in `bot-platform`.
- Secret crypto helpers from `@selleragent/shared` have no exact existing platform home. Do not create broad `@dd-bot-platform/shared` by default; either replace product-locally or open a narrow future security/support package decision if multiple product consumers require it.
- Product operation definitions such as `docovedAnswerOperation` should move to a Docoved-owned package, not platform. Shared control-plane/auth/channel/import/diagnostic operations can target `@dd-bot-platform/api-contract`.

## Recommended Phase 2/5 Implementation Slices

Recommended Phase 2 platform-first slices:

1. Export/adapt shared control-plane read models and operation schema contracts from `@dd-bot-platform/api-contract`; use existing `ControlPlane*` vocabulary where possible instead of preserving `ChannelRecord`/SellerAgent names indefinitely.
2. Export/adapt governed-content/import read models and operation schema contracts from `@dd-bot-platform/api-contract`; keep source revision review semantics under design review if they encode product policy.
3. Add or align runtime interaction substrate contracts for conversation/decision/execution-trace carriers only after a decision record; use `@dd-bot-platform/core` for runtime helpers and `@dd-bot-platform/api-contract` for schemas.
4. Replace Docoved imports of `timestamp`, `parseYamlText`, and simple generic helpers with product-local helpers unless a narrow reusable platform helper package is explicitly approved.
5. Decide the secret-envelope/crypto owner separately; candidate targets are Docoved-local replacement, SellerAgent-local retention, or a future narrow platform security/support package.

Recommended Phase 5 product cutover/navigation slices:

1. Rename or replace `docoved-agent/packages/api-contract` so Docoved no longer publishes/depends on a package named `@selleragent/api-contract` for local product contracts.
2. Move Docoved product contracts such as `DocovedAnswerResponse`, `DocovedSourceRow`, and `docovedAnswerOperation` into `@docoved-agent/api-contract` or another Docoved-owned package.
3. Cut Docoved shared-looking imports from `@selleragent/api-contract` to platform exports after platform package version/workspace availability is established.
4. Retain temporary compatibility re-exports only with expiry conditions and explicit deprecation notes.
5. Sync the stale product `plans/index.md` wording so product Memory Banks remain self-contained while pointing dependency-boundary cleanup to upstream `PRT-041`.

## Skipped Checks With Rationale

| skipped check | rationale |
| --- | --- |
| dependency install / lockfile update | Forbidden by task; inventory is read-only. |
| build, typecheck, test, hosted, CI, publish gates | Forbidden/not applicable; task verification gate allows search commands only. |
| source edits in product/platform packages | Forbidden by task write scope. |
| Memory Bank doc edits | Forbidden by task write scope; stale wording is reported only. |
| full semantic parse of every SellerAgent API-contract export | Not required for this inventory; symbol-level Docoved imports and existing bot-platform target exports were enough to classify candidate homes. |

## Exact Commands And Searches Used

All commands were run read-only except final report/inventory/lesson writes under `.tasks/prt-041-contract-dependency-boundary-realignment/`.
The report, inventory companions, and lesson note were written with `apply_patch` to allowed paths only.

```sh
sed -n '1,240p' /Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/tasks/T041-I3-platform-target-and-navigation-inventory.md
pwd && rg --files -g '.memory-bank/**' -g 'package.json' -g 'tsconfig*.json' -g 'pnpm-workspace.yaml'
find /Users/deksden/Documents/_Projects -maxdepth 2 -type d -name .memory-bank -print
find /Users/deksden/Documents/_Projects/bot-platform/packages -maxdepth 3 -type f \( -name package.json -o -name 'index.ts' -o -name 'index.tsx' -o -name '*.ts' \) | sort
sed -n '1,260p' .memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md
sed -n '1,220p' .memory-bank/spec/architecture/boundaries.md
sed -n '1,220p' .memory-bank/spec/project/feature-area-boundaries.md
sed -n '1,240p' .memory-bank/spec/project/three-layer-product-line-architecture.md
for f in packages/api-contract/package.json packages/api-contract/src/index.ts packages/api-contract/src/runtime.ts packages/api-contract/src/semantic-eval.ts packages/core/package.json packages/core/src/index.ts packages/scenario-system/package.json packages/scenario-system/src/index.ts packages/scenario-system/src/types.ts packages/scenario-system/src/artifacts.ts packages/scenario-system/src/fixtures.ts; do printf '\n--- %s ---\n' "$f"; sed -n '1,220p' "$f"; done
rg -n "seller-agent|docoved-agent|PRT-041|T041|@selleragent|@dd-bot-platform|sales-agent|PRT-038|PRT-039|PRT-040|PRT-008|closed|active" /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank -g '*.md'
find /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank -maxdepth 4 -type f \( -name 'index.md' -o -name 'current-status-report.md' -o -name '*protocol*hub*.md' \) -print | sort
rg -n "^(export (const|type|interface|class|function|\*)|export \{)" packages/api-contract/src packages/core/src packages/scenario-system/src
rg -n "from ['\"]@selleragent/(api-contract|shared|core)['\"]|import\(['\"]@selleragent/(api-contract|shared|core)['\"]\)" /Users/deksden/Documents/_Projects/docoved-agent /Users/deksden/Documents/_Projects/seller-agent -g '*.ts' -g '*.tsx' -g '*.mts' -g '*.cts' -g 'package.json'
for f in /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/index.md /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/plans/index.md /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/plans/protocols/index.md /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/plans/current-status-report.md; do printf '\n--- %s ---\n' "$f"; sed -n '1,220p' "$f"; done
rg -n -U "import(?: type)? \{[\s\S]*?\} from ['\"]@selleragent/(api-contract|shared|core)['\"]|import(?: type)? [^;]+ from ['\"]@selleragent/(api-contract|shared|core)['\"]" /Users/deksden/Documents/_Projects/docoved-agent -g '*.ts' -g '*.tsx'
find /Users/deksden/Documents/_Projects/{seller-agent,docoved-agent}/packages -maxdepth 2 -name package.json -print -exec sed -n '1,120p' {} \;
for f in /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/index.md /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/plans/index.md /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/plans/protocols/index.md /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/plans/current-status-report.md; do printf '\n--- %s ---\n' "$f"; rg -n "PRT-0(08|36|37|38|39|40|41)|active|closed|baseline|archive-only|sales-agent|dependency-boundary|handoff|adoption" "$f"; done
node <<'NODE'
const fs = require('fs');
const cp = require('child_process');
const files = cp.execFileSync('rg',['--files','/Users/deksden/Documents/_Projects/docoved-agent'],{encoding:'utf8'}).trim().split('\n').filter(f=>/\.(ts|tsx|mts|cts)$/.test(f));
const rows=[];
for(const f of files){
 const lines=fs.readFileSync(f,'utf8').split(/\n/);
 for(let i=0;i<lines.length;i++){
  if(!lines[i].trim().startsWith('import')) continue;
  let block=lines[i]; let j=i;
  while(!block.includes(';') && j+1<lines.length){ j++; block+='\n'+lines[j]; }
  i=j;
  const pkg=(block.match(/from ['"](@selleragent\/(?:api-contract|shared|core))['"]/)||[])[1];
  if(!pkg) continue;
  let syms=[];
  const br=block.match(/import\s+(?:type\s+)?\{([\s\S]*?)\}\s+from/);
  if(br) syms=br[1].split(',').map(x=>x.trim()).filter(Boolean).map(x=>x.replace(/^type\s+/,'').split(/\s+as\s+/)[0].trim());
  else syms=[block.replace(/import\s+(?:type\s+)?/,'').replace(/\s+from[\s\S]*/,'').trim()];
  rows.push({pkg,file:f.replace('/Users/deksden/Documents/_Projects/docoved-agent/',''),line:i+1,syms});
 }
}
for(const r of rows.sort((a,b)=>(a.pkg+a.file).localeCompare(b.pkg+b.file))){
 console.log(`${r.pkg} | ${r.file}:${r.line} | ${r.syms.join(', ')}`);
}
NODE
find packages/api-contract/src packages/core/src -type f | sort
for f in packages/api-contract/src/control-plane/*.ts packages/api-contract/src/governed-content/*.ts; do printf '\n--- %s ---\n' "$f"; rg -n "^(export (const|type|interface|function)|export \*)" "$f"; done
for f in packages/core/src/control-plane/*.ts packages/core/src/control-plane/channel-binding/*.ts packages/core/src/governed-content/**/*.ts packages/core/src/runtime/*.ts; do printf '\n--- %s ---\n' "$f"; rg -n "^(export (const|type|interface|function|class)|export \*)" "$f"; done
for f in /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/index.md /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/plans/index.md /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/plans/protocols/index.md /Users/deksden/Documents/_Projects/{bot-platform,seller-agent,docoved-agent}/.memory-bank/plans/current-status-report.md; do printf '\n--- %s ---\n' "$f"; sed -n '1,110p' "$f"; done
node <<'NODE'
const fs=require('fs'), cp=require('child_process');
function exportsIn(root){
 const files=cp.execFileSync('find',[root,'-type','f','-name','*.ts'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
 const syms=[];
 for(const f of files){
  const lines=fs.readFileSync(f,'utf8').split(/\n/);
  for(let i=0;i<lines.length;i++){
   const m=lines[i].match(/^export\s+(?:declare\s+)?(?:const|type|interface|class|function)\s+([A-Za-z0-9_]+)/);
   if(m) syms.push(`${m[1]} | ${f.replace('/Users/deksden/Documents/_Projects/bot-platform/','')}:${i+1}`);
  }
 }
 return syms.sort();
}
console.log(exportsIn('/Users/deksden/Documents/_Projects/bot-platform/packages/api-contract/src').join('\n'));
console.log('\n-- CORE --');
console.log(exportsIn('/Users/deksden/Documents/_Projects/bot-platform/packages/core/src').join('\n'));
NODE
sed -n '1,160p' .memory-bank/plans/index.md && sed -n '1,180p' .memory-bank/plans/protocols/index.md && sed -n '1,180p' .memory-bank/plans/current-status-report.md
sed -n '1,150p' .memory-bank/plans/index.md && sed -n '1,170p' .memory-bank/plans/protocols/index.md && sed -n '1,180p' .memory-bank/plans/current-status-report.md
sed -n '1,150p' .memory-bank/plans/index.md && sed -n '1,180p' .memory-bank/plans/protocols/index.md && sed -n '1,180p' .memory-bank/plans/current-status-report.md
rg -n "Active next-wave local protocol|Next protocol kickoff rule|current local planning start packet|closed adoption|closed baseline|PRT-008|PRT-041|PRT-038" .memory-bank/index.md .memory-bank/plans/index.md .memory-bank/plans/protocols/index.md .memory-bank/plans/current-status-report.md
rg -n "Active next-wave local protocol|Next protocol kickoff rule|current local planning start packet|closed adoption|closed baseline|PRT-038|PRT-041" .memory-bank/index.md .memory-bank/plans/index.md .memory-bank/plans/protocols/index.md .memory-bank/plans/current-status-report.md
rg -n "PRT-038|PRT-039|PRT-040|PRT-041|closed|active|dependency-boundary|Immediate planning priorities" .memory-bank/index.md .memory-bank/plans/index.md .memory-bank/plans/protocols/index.md .memory-bank/plans/current-status-report.md
find /Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment -maxdepth 2 -type d -print | sort
git status --short
for f in .tasks/prt-041-contract-dependency-boundary-realignment/reports/T041-I3-platform-target-and-navigation-inventory-report.md .tasks/prt-041-contract-dependency-boundary-realignment/inventory/platform-target-symbol-map.md .tasks/prt-041-contract-dependency-boundary-realignment/inventory/product-navigation-truth-surface-map.md .tasks/prt-041-contract-dependency-boundary-realignment/lessons/T041-I3-platform-target-and-navigation-insights.md; do printf '\n--- %s ---\n' "$f"; sed -n '1,60p' "$f"; done
rg -n "Executive Summary|Exact Commands|seller-agent.*plans/index|docoved-agent.*plans/index|@dd-bot-platform/shared|Skipped Checks" .tasks/prt-041-contract-dependency-boundary-realignment/reports/T041-I3-platform-target-and-navigation-inventory-report.md
```
