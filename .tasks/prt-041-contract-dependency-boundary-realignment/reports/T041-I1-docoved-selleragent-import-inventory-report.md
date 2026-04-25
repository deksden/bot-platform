# T041-I1 Docoved SellerAgent Import Inventory Report

Date: 2026-04-24
Executor: Codex
Task file: `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/tasks/T041-I1-docoved-selleragent-import-inventory.md`
Write scope honored: only files under `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/` were written.

## Executive Summary

Docoved still has a broad SellerAgent namespace dependency surface. The highest-impact issue is not only imports: `/Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/package.json` declares the Docoved-local package as `@selleragent/api-contract`, so many imports that look product-external are actually workspace links to Docoved-owned code with a misleading SellerAgent identity. This is a package identity correction first, followed by symbol splitting.

The current `@selleragent/api-contract` symbol surface contains three categories mixed together:

- Shared platform contracts that should move to `@dd-bot-platform/api-contract`: auth, membership, workspace/channel/product-instance/source bindings, import-run envelopes, execution traces, runtime provider/model policy, and platform error contracts.
- Docoved product contracts that should become `@docoved-agent/api-contract`: `DocovedAnswerResponse`, `DocovedSourceRow`, `docovedAnswerOperation`, and Docoved-specific answer/retrieval shapes.
- SellerAgent product contracts or mixed seams that block mechanical migration: `BusinessProfile`, `BusinessProfileMediaRegistry`, Telegram integration policy types, conversation envelopes with SellerAgent assist/handoff lineage, and `OperationsStatusSnapshot` if it includes product integration overlays.

`@selleragent/shared@0.2.0` is consumed for runtime helpers (`timestamp`, `encryptSecret`, `decryptSecret`, `parseYamlText`) and the `SecretEnvelope` type. These are not SellerAgent product semantics in the Docoved usage and should either move to `@dd-bot-platform/core` or be replaced by direct product-local helpers where too small to justify platform ownership.

`@selleragent/core@0.1.1` appears only in `packages/db/package.json` and `pnpm-lock.yaml`; no source import was found. Treat it as `dead-or-retirable` pending a package graph proof in an implementation slice.

The reusable inventory is also written to `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/inventory/docoved-selleragent-imports.md`.

## Exact Files And Manifests Inspected

- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/architecture/boundaries.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/project/docoved-platform-adoption-boundary.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/package.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/pnpm-workspace.yaml`
- `/Users/deksden/Documents/_Projects/docoved-agent/pnpm-lock.yaml`
- `/Users/deksden/Documents/_Projects/docoved-agent/tsconfig.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/tsconfig.base.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/tsconfig.build.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/apps/api/package.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/apps/api/tsconfig.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/apps/workflow/package.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/apps/workflow/tsconfig.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/package.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/tsconfig.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/index.ts`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/docoved-platform.ts`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/operations.ts`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/runtime.ts`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/conversations.ts`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/package.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/tsconfig.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/db/package.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/db/tsconfig.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/dv-admin/package.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/dv-admin/tsconfig.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/prompt-catalog/package.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/prompt-catalog/tsconfig.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/sa-docoved/package.json`
- `/Users/deksden/Documents/_Projects/docoved-agent/packages/sa-docoved/tsconfig.json`
- Published installed package metadata used only to understand imported helper/core surfaces: `/Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+shared@0.2.0/node_modules/@selleragent/shared/package.json`, `/Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+shared@0.2.0/node_modules/@selleragent/shared/dist/index.d.ts`, `/Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+core@0.1.1/node_modules/@selleragent/core/package.json`, `/Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+core@0.1.1/node_modules/@selleragent/core/dist/index.d.ts`

## Exact Commands And Searches Used

```sh
pwd
```

```sh
sed -n '1,240p' /Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/tasks/T041-I1-docoved-selleragent-import-inventory.md
```

```sh
find /Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment -maxdepth 3 -type f | sort
```

```sh
sed -n '1,260p' /Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md
```

```sh
sed -n '1,260p' /Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/architecture/boundaries.md
```

```sh
sed -n '1,260p' /Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md
```

```sh
sed -n '1,260p' /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/project/docoved-platform-adoption-boundary.md
```

```sh
rg -n "@selleragent/" /Users/deksden/Documents/_Projects/docoved-agent --glob '!node_modules/**' --glob '!.git/**'
```

```sh
find /Users/deksden/Documents/_Projects/docoved-agent -name package.json -not -path '*/node_modules/*' -print | sort
```

```sh
find /Users/deksden/Documents/_Projects/docoved-agent -name 'tsconfig*.json' -not -path '*/node_modules/*' -print | sort
```

```sh
ls -la /Users/deksden/Documents/_Projects/docoved-agent && test -f /Users/deksden/Documents/_Projects/docoved-agent/pnpm-workspace.yaml && sed -n '1,220p' /Users/deksden/Documents/_Projects/docoved-agent/pnpm-workspace.yaml
```

```sh
for f in $(find /Users/deksden/Documents/_Projects/docoved-agent -path '*/.vercel/*' -prune -o -name package.json -print | sort); do printf '\n### %s\n' "$f"; sed -n '1,220p' "$f"; done
```

```sh
for f in $(find /Users/deksden/Documents/_Projects/docoved-agent -name 'tsconfig*.json' -not -path '*/node_modules/*' -not -path '*/.vercel/*' -print | sort); do printf '\n### %s\n' "$f"; sed -n '1,220p' "$f"; done
```

```sh
rg -n "^export|@selleragent/|from './|from \"./" /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/package.json --glob '!node_modules/**'
```

```sh
sed -n '1,180p' /Users/deksden/Documents/_Projects/docoved-agent/pnpm-lock.yaml && sed -n '960,990p' /Users/deksden/Documents/_Projects/docoved-agent/pnpm-lock.yaml && sed -n '4240,4265p' /Users/deksden/Documents/_Projects/docoved-agent/pnpm-lock.yaml
```

```sh
node <<'NODE'
const fs = require('fs');
const path = require('path');
const root = '/Users/deksden/Documents/_Projects/docoved-agent';
const skip = new Set(['node_modules','.git','dist','.vercel']);
function walk(dir, out=[]) {
  for (const ent of fs.readdirSync(dir,{withFileTypes:true})) {
    if (skip.has(ent.name)) continue;
    const p=path.join(dir,ent.name);
    if (ent.isDirectory()) walk(p,out);
    else if (/\.(ts|tsx)$/.test(ent.name)) out.push(p);
  }
  return out;
}
function parse(spec) {
  const typeOnly = /^type\s+/.test(spec.trim());
  spec = spec.trim().replace(/^type\s+/, '').trim();
  const m = spec.match(/\{([\s\S]*)\}/);
  if (m) return { typeOnly, symbols: m[1].split(',').map(s=>s.trim()).filter(Boolean).map(s=>s.replace(/^type\s+/, 'type ')) };
  return { typeOnly, symbols: [spec] };
}
const rows=[];
for (const file of walk(root)) {
  const text=fs.readFileSync(file,'utf8');
  const re=/import\s+([^;]+?)\s+from\s+['"](@selleragent\/[^'"]+)['"];?/g;
  let m;
  while ((m=re.exec(text))) {
    const {typeOnly,symbols}=parse(m[1]);
    rows.push({file:path.relative(root,file), pkg:m[2], kind:typeOnly?'type-only':'runtime', symbols:symbols.join('; ')});
  }
}
rows.sort((a,b)=>a.file.localeCompare(b.file)||a.pkg.localeCompare(b.pkg));
for (const r of rows) console.log(`${r.file}\t${r.pkg}\t${r.kind}\t${r.symbols}`);
NODE
```

```sh
find /Users/deksden/Documents/_Projects/docoved-agent -maxdepth 3 -type d -not -path '*/node_modules/*' -not -path '*/.git/*' | sort
```

```sh
rg -n "@selleragent/core|@selleragent/shared|@selleragent/api-contract|@selleragent/" /Users/deksden/Documents/_Projects/docoved-agent/package.json /Users/deksden/Documents/_Projects/docoved-agent/apps /Users/deksden/Documents/_Projects/docoved-agent/packages /Users/deksden/Documents/_Projects/docoved-agent/scripts /Users/deksden/Documents/_Projects/docoved-agent/tsconfig*.json /Users/deksden/Documents/_Projects/docoved-agent/pnpm-workspace.yaml /Users/deksden/Documents/_Projects/docoved-agent/pnpm-lock.yaml --glob '!node_modules/**' --glob '!dist/**' --glob '!.vercel/**'
```

```sh
rg -n "paths|@selleragent|references|exports|name\": \"@selleragent|name\": \"@docoved-agent" /Users/deksden/Documents/_Projects/docoved-agent/package.json /Users/deksden/Documents/_Projects/docoved-agent/pnpm-workspace.yaml /Users/deksden/Documents/_Projects/docoved-agent/tsconfig*.json /Users/deksden/Documents/_Projects/docoved-agent/apps/*/package.json /Users/deksden/Documents/_Projects/docoved-agent/apps/*/tsconfig.json /Users/deksden/Documents/_Projects/docoved-agent/packages/*/package.json /Users/deksden/Documents/_Projects/docoved-agent/packages/*/tsconfig.json
```

```sh
rg -n "export \*|export \{|export type|export const|export function|export interface" /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/index.ts /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/docoved-platform.ts /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/runtime.ts /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/control-plane.ts /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/auth.ts /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/docoved.ts /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/conversations.ts 2>/dev/null
```

```sh
sed -n '1,120p' /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/index.ts
sed -n '470,620p' /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/index.ts
sed -n '670,940p' /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/index.ts
sed -n '940,1325p' /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/index.ts
sed -n '1320,1660p' /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/index.ts
```

```sh
sed -n '1,140p' /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/docoved.ts && sed -n '1,140p' /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/docoved-platform.ts
```

Note: this command confirmed `src/docoved.ts` does not exist, while Docoved-specific exports are in `runtime.ts`, `operations.ts`, and `docoved-platform.ts`.

```sh
sed -n '1,180p' /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src/operations.ts
```

```sh
rg -n "PlatformErrorCode|platformErrorCode|runtimeDefaultVerifierConfig|operatorRoleSchema|telegramCommandActorClass|ChannelRecord|KnowledgeSource|ProductInstance|PipelineId|BusinessProfile|DocovedAnswerResponse|DocovedSourceRow|ExecutionTraceRun|ExecutionTraceArtifact|ExecutionAttemptTrace|RuntimeGenerationAttempt|RuntimePromptMeta|RuntimeProviderAttempt|RuntimeUsage|ImportRun|SourceRevision" /Users/deksden/Documents/_Projects/docoved-agent/packages/api-contract/src
```

```sh
find /Users/deksden/Documents/_Projects/docoved-agent -path '*/node_modules/@selleragent/*' -maxdepth 8 -print
find /Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm -maxdepth 2 -type d -name '@selleragent+*' -print 2>/dev/null
find /Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm -maxdepth 3 -path '*@selleragent*' -print 2>/dev/null
```

```sh
sed -n '1,180p' /Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+shared@0.2.0/node_modules/@selleragent/shared/package.json
sed -n '1,220p' /Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+shared@0.2.0/node_modules/@selleragent/shared/dist/index.d.ts
sed -n '1,180p' /Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+core@0.1.1/node_modules/@selleragent/core/package.json
sed -n '1,220p' /Users/deksden/Documents/_Projects/docoved-agent/node_modules/.pnpm/@selleragent+core@0.1.1/node_modules/@selleragent/core/dist/index.d.ts
```

```sh
rg -n "from ['\"]@selleragent/core|require\(['\"]@selleragent/core|@selleragent/core" /Users/deksden/Documents/_Projects/docoved-agent/package.json /Users/deksden/Documents/_Projects/docoved-agent/apps /Users/deksden/Documents/_Projects/docoved-agent/packages /Users/deksden/Documents/_Projects/docoved-agent/scripts /Users/deksden/Documents/_Projects/docoved-agent/pnpm-lock.yaml --glob '!node_modules/**' --glob '!dist/**' --glob '!.vercel/**'
```

```sh
node <<'NODE'
const fs=require('fs'); const path=require('path'); const root='/Users/deksden/Documents/_Projects/docoved-agent'; const skip=new Set(['node_modules','.git','dist','.vercel']);
function walk(d,o=[]){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(skip.has(e.name))continue; const p=path.join(d,e.name); if(e.isDirectory())walk(p,o); else if(/\.(ts|tsx)$/.test(e.name))o.push(p)} return o}
function parse(spec){let top=/^type\s+/.test(spec.trim()); spec=spec.trim().replace(/^type\s+/,'').trim(); let m=spec.match(/\{([\s\S]*)\}/); let syms=m?m[1].split(',').map(s=>s.trim()).filter(Boolean):[spec]; return syms.map(s=>({sym:s.replace(/^type\s+/,''), kind:(top||s.startsWith('type '))?'type-only':'runtime'}));}
const agg=new Map();
for(const file of walk(root)){const text=fs.readFileSync(file,'utf8'); const re=/import\s+([^;]+?)\s+from\s+['"](@selleragent\/[^'"]+)['"];?/g; let m; while((m=re.exec(text))){for(const {sym,kind} of parse(m[1])){const k=m[2]+'|'+sym; if(!agg.has(k))agg.set(k,{pkg:m[2],sym,kinds:new Set(),paths:new Set()}); const r=agg.get(k); r.kinds.add(kind); r.paths.add(path.relative(root,file));}}}
for(const r of [...agg.values()].sort((a,b)=>a.pkg.localeCompare(b.pkg)||a.sym.localeCompare(b.sym))) console.log(JSON.stringify({symbol:r.sym,pkg:r.pkg,kind:[...r.kinds].sort().join('+'),paths:[...r.paths].sort()}));
NODE
```

## Inventory Table

The full structured table is in `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/inventory/docoved-selleragent-imports.md`. The table below repeats the decision-relevant rows.

| symbol/package | import kind | importing path | current owner | proposed target | classification | migration action | compatibility rule | verification gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `@selleragent/api-contract` local workspace package identity | package manifest / export map | `packages/api-contract/package.json` declares `name: "@selleragent/api-contract"`; export map publishes `.` from `dist/index.*` | Docoved repo owns local code but package identity claims SellerAgent | split into `@docoved-agent/api-contract` plus selected `@dd-bot-platform/api-contract` moves | `temporary-legacy-bridge` | `rename-docoved-package` | temporary alias/re-export for one migration window only | package graph search plus implementation typecheck |
| `@selleragent/api-contract` workspace dependency | manifest / lockfile / source imports | `apps/api`, `packages/core`, `packages/db`, `packages/dv-admin`, scripts, and historical task notes | mixed shared, Docoved, SellerAgent symbols | `@dd-bot-platform/api-contract` and `@docoved-agent/api-contract` | `temporary-legacy-bridge` | `rename-docoved-package` | platform exports first, product cutover second, remove alias last | `rg "@selleragent/api-contract"` reaches zero outside documented shim |
| Auth and membership operations/types | runtime and type-only | `apps/api/src/docoved-operator-access-routes.ts`; `packages/db/src/auth-store.ts`; `scripts/_support/docoved-telegram-command-runtime.ts` | shared control-plane contract | `@dd-bot-platform/api-contract` | `shared-platform-contract` | `move-to-bot-platform-api-contract` | bridge allowed for one window | route/db/script typecheck |
| Channel, pipeline, product-instance, knowledge-source operations/types | runtime and type-only | `apps/api/src/docoved-channel-binding.ts`; `apps/server/src/channels/docoved-command-policy.ts`; `apps/api/src/docoved-operator-control-plane-routes.ts`; `packages/db/src/control-plane-store.ts`; `packages/db/src/execution-trace-store.ts`; `packages/dv-admin/src/cli.ts` | shared control-plane/source-binding substrate | `@dd-bot-platform/api-contract` | `shared-platform-contract` | `move-to-bot-platform-api-contract` | temporary bridge until both products adopt platform channel/source contracts | route/db/CLI typecheck |
| Import-run, source-revision, import diagnostics operations/types | runtime and type-only | `apps/api/src/docoved-operator-import-routes.ts`; `apps/api/src/docoved-operator-diagnostics-routes.ts`; `packages/db/src/docoved-import-store.ts`; `packages/dv-admin/src/imports.ts`; `packages/dv-admin/src/diagnostics.ts`; proof scripts | shared governed import lifecycle envelope with Docoved policy nearby | `@dd-bot-platform/api-contract` for generic lifecycle; `@docoved-agent/api-contract` for Docoved review/activation policy | `shared-platform-contract` | `move-to-bot-platform-api-contract` | compatibility bridge must document field ownership | import route/store/admin proof typecheck |
| Conversation and message types | type-only | `packages/core/src/runtime/*`; `packages/db/src/conversation-store.ts` | shared interaction substrate mixed with SellerAgent assist/handoff lineage | `@dd-bot-platform/api-contract` only after envelope decision | `needs-design-decision` | `defer-new-protocol` | do not promote product-specific fields by accident | ADR/spec decision plus compile |
| Execution trace, decision trace, runtime diagnostics types/schemas | runtime and type-only | `packages/core/src/runtime/*`; `packages/db/src/execution-trace-store.ts`; `apps/api/src/docoved-operator-diagnostics-routes.ts`; `packages/dv-admin/src/diagnostics.ts`; proof scripts | shared runtime/trace substrate | `@dd-bot-platform/api-contract` | `shared-platform-contract` | `move-to-bot-platform-api-contract` | temporary bridge until platform trace package lands | runtime/db/diagnostics typecheck |
| Runtime provider/model policy/generation usage types and `runtimeDefaultVerifierConfig` | runtime and type-only | `packages/core/src/runtime/analysis.ts`; `packages/core/src/runtime/memory-bank.ts`; `packages/core/src/runtime/research-workflow.ts`; `scripts/_support/docoved-live-runtime.ts`; `packages/db/src/auth-store.ts`; `packages/db/src/control-plane-store.ts` | shared runtime/control-plane contract | `@dd-bot-platform/api-contract` | `shared-platform-contract` | `move-to-bot-platform-api-contract` | preserve defaults or split Docoved override local | runtime/db typecheck and config parity check |
| Docoved answer contract symbols: `DocovedAnswerResponse`, `DocovedSourceRow`, `docovedAnswerOperation`, `RetrievedDocRef` | runtime and type-only | `apps/api/src/docoved-answer-service.ts`; `apps/api/src/docoved-public.ts`; `packages/core/src/runtime/docoved-answer-artifact.ts`; `packages/core/src/runtime/docoved-execution-trace.ts`; `packages/core/src/runtime/docoved-search-report.ts`; `packages/core/src/runtime/research-workflow.ts` | Docoved product contract | `@docoved-agent/api-contract` | `docoved-product-contract` | `rename-docoved-package` | no platform move except shared envelope extraction | public answer route/core typecheck |
| `PlatformErrorCode` | type-only | `apps/api/src/*`; `packages/core/src/errors.ts`; proof scripts; historical `.tasks` notes | shared API error vocabulary | `@dd-bot-platform/api-contract` | `shared-platform-contract` | `move-to-bot-platform-api-contract` | alias acceptable for one migration window | route/script typecheck |
| `BusinessProfile`, `BusinessProfileMediaRegistry` | type-only | `packages/db/src/auth-store.ts`; `packages/core/src/runtime/kernel.ts` | SellerAgent product semantics | Docoved-local replacement or shared neutral media envelope | `selleragent-product-contract` | `replace-with-product-local-helper` | no platform promotion of SellerAgent product terms | targeted compile and `rg "BusinessProfile"` review |
| Telegram integration types: `IntegrationsUpsertTelegramBotInput`, `TelegramBotIntegration`, `TelegramCommandActorClass`, `TelegramEmployeeBinding`, `TelegramObservedUser` | type-only | `packages/db/src/auth-store.ts`; `scripts/_support/docoved-telegram-command-runtime.ts` | mixed transport mechanics and product command policy | `@dd-bot-platform/api-contract` for transport envelope; Docoved local for command policy | `needs-design-decision` | `defer-new-protocol` | split transport primitives from product policy first | design record plus db/script typecheck |
| `OperationsStatusSnapshot` | type-only | `apps/server/src/telegram/integration-operations.ts`; `packages/db/src/auth-store.ts` | operations/control-plane status with possible product overlay | `@dd-bot-platform/api-contract` base plus local overlay if needed | `needs-design-decision` | `defer-new-protocol` | define product overlay boundary first | spec decision plus typecheck |
| `timestamp` from `@selleragent/shared` | runtime | `packages/core/src/runtime/kernel.ts`; `packages/core/src/runtime/research-workflow.ts` | generic helper currently in SellerAgent package | `@dd-bot-platform/core` | `shared-platform-helper` | `move-to-bot-platform-core` | temporary re-export acceptable | core typecheck and `rg "@selleragent/shared"` |
| `encryptSecret`, `decryptSecret`, `SecretEnvelope` from `@selleragent/shared` | runtime and type-only | `packages/db/src/auth-store.ts` | generic secret envelope helper | `@dd-bot-platform/core` or future security helper package | `shared-platform-helper` | `move-to-bot-platform-core` | do not fork encryption envelope format | db typecheck plus compatibility fixture |
| `parseYamlText` from `@selleragent/shared` | runtime | `packages/dv-admin/src/cli.ts` | generic YAML helper | `@dd-bot-platform/core` or direct Docoved `yaml` dependency | `shared-platform-helper` | `move-to-bot-platform-core` | direct replacement acceptable if platform helper is too small | `dv-admin` typecheck |
| `@selleragent/core@0.1.1` | manifest / lockfile only | `packages/db/package.json`; `pnpm-lock.yaml` | SellerAgent product runtime package | delete from Docoved | `dead-or-retirable` | `delete-after-proof` | no bridge unless a generated/runtime import is discovered | `rg "@selleragent/core"` and package graph check |

## Blockers And Design Decisions

1. Conversation envelope split blocks a blind platform move. `Conversation`, `ConversationMessage`, and `ConversationEvent` are shared-looking, but the exported `conversations.ts` surface also includes assist, handoff, reply job, and other SellerAgent lineage terms. A design record should define the neutral interaction envelope before implementation.
2. Telegram integration types require a transport-vs-policy split. Bot transport, webhook, employee binding, and actor classification may be shared, but Docoved command policy is product-local. Do not move all Telegram symbols together without a boundary decision.
3. `OperationsStatusSnapshot` needs ownership review. It may be a shared operations status base, but current usage around Telegram integration status suggests possible product overlay fields.
4. `BusinessProfile` and `BusinessProfileMediaRegistry` are SellerAgent product contracts currently referenced by Docoved. They should not move to platform as-is; Docoved needs a local replacement or neutral media envelope.
5. Package identity correction must precede clean source migration. Because Docoved-local `packages/api-contract` is named `@selleragent/api-contract`, import scans alone overstate true external dependency while package ownership remains misleading.
6. The lockfile/node_modules contain both workspace-linked `@selleragent/api-contract` usage and an installed published `@selleragent/api-contract@0.11.0` entry. Implementation should verify why the published entry remains before assuming the workspace package is the only resolver.

## Recommended Phase 2/3 Implementation Slices

1. Phase 2 slice A: Rename Docoved-local package identity from `@selleragent/api-contract` to `@docoved-agent/api-contract` and add a documented temporary compatibility alias/re-export only if needed. Keep behavior unchanged.
2. Phase 2 slice B: Move shared error/auth/membership/workspace/channel/product-instance/source-binding contracts to `@dd-bot-platform/api-contract`, then cut Docoved imports from the compatibility alias to the platform package.
3. Phase 2 slice C: Move import-run/source-revision/processing diagnostics envelopes to `@dd-bot-platform/api-contract`; keep Docoved activation/review policy and answer contracts in `@docoved-agent/api-contract`.
4. Phase 2 slice D: Move runtime provider/model policy, execution trace, decision trace, and runtime diagnostics contracts to `@dd-bot-platform/api-contract` with parity checks for `runtimeDefaultVerifierConfig`.
5. Phase 2 slice E: Replace `@selleragent/shared` helper imports with `@dd-bot-platform/core` helpers or direct Docoved-local helpers for very small utilities. Preserve secret envelope compatibility.
6. Phase 2 slice F: Remove unused `@selleragent/core@0.1.1` from `packages/db` after a package graph proof.
7. Phase 3 slice A: Resolve conversation envelope design and migrate neutral conversation carriers to platform while leaving SellerAgent assist/handoff policy local.
8. Phase 3 slice B: Resolve Telegram integration and operations status overlay design; move only transport/control-plane base contracts to platform.
9. Phase 3 slice C: Replace `BusinessProfile` references in Docoved with Docoved-owned or neutral media/source terms, then verify no SellerAgent product contracts remain.

## Skipped Checks With Rationale

- No builds, typechecks, tests, dependency installs, lockfile updates, package publishes, hosted checks, or CI gates were run because the task explicitly says read-only search commands only and forbids install/lockfile updates.
- Generated `.vercel` package manifests and `node_modules` package manifests were excluded from workspace ownership conclusions because they are generated/installed artifacts. Installed package metadata was read only to identify the exported surfaces of `@selleragent/shared` and `@selleragent/core`.
- No Docoved product source, package manifests, TypeScript configs, or lockfiles were edited.

