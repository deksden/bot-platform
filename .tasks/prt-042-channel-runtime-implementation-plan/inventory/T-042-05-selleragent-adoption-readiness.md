# T-042-05 SellerAgent Adoption Readiness

## Summary Decision

SellerAgent does not need a Memory Bank routing note or runtime code change for this readiness task.

Reasoning:
- SellerAgent already treats `runtime`, `ui`, and `spec` truth as repo-local, with `shadow-assist`, assist surfaces, and Telegram integration guidance owned in the product repo.
- The current SellerAgent adoption boundary explicitly says day-to-day implementation starts from the local packet and revisits `bot-platform` only when syncing shared contracts or upstream rationale.
- The product code surfaces already keep Telegram command handling, Telegram markdown rendering, Telegram command projection, and `sa-admin` control-plane handlers local.
- No evidence showed a readiness-only blocker that would require a hosted deploy or a SellerAgent routing patch.

## Commands And Searches Run

Read-only inventory pass used these commands and paths:
- `sed -n '1,220p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/index.md`
- `sed -n '1,240p' /Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/channel-runtime-contract.md`
- `sed -n '1,260p' /Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `sed -n '1,220p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/index.md`
- `sed -n '1,220p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/runtime/index.md`
- `sed -n '1,220p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/runtime/shadow-assist-and-message-review.md`
- `sed -n '1,220p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/assist-panel-contract.md`
- `sed -n '1,240p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/telegram-bot-integration-model.md`
- `sed -n '1,260p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/reference/telegram-direct-bot-command-catalog.md`
- `sed -n '1,260p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/deployment-architecture.md`
- `sed -n '1,240p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/production-rollout-runbook.md`
- `sed -n '1,260p' /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md`
- `rg -n --hidden --glob '!**/node_modules/**' --glob '!**/.git/**' -S "conversation|assist|channel|telegram|command|handler|router|policy" /Users/deksden/Documents/_Projects/seller-agent/apps /Users/deksden/Documents/_Projects/seller-agent/packages /Users/deksden/Documents/_Projects/seller-agent/.memory-bank`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/runtime/index.md`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/runtime/shadow-assist-and-message-review.md`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/assist-panel-contract.md`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/telegram-bot-integration-model.md`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/reference/telegram-direct-bot-command-catalog.md`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/deployment-architecture.md`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/production-rollout-runbook.md`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/index.md`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/packages/core/src/index.ts`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-markdown.ts`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-commands.ts`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/index.ts`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/command-projections.ts`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/integration-operations.ts`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/apps/server/src/channels/docoved-command-policy.ts`
- `nl -ba /Users/deksden/Documents/_Projects/seller-agent/packages/sa-admin/src/cli.ts`

## Inventory Table

| Surface | Location | Classification | Readiness note |
| --- | --- | --- | --- |
| Runtime truth | `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/runtime/index.md:24` | product-owned | SellerAgent already owns live burst semantics plus shadow-assist / takeover meaning locally. |
| Assist behavior | `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/runtime/shadow-assist-and-message-review.md:32` | product-owned | Drafts, reviews, takeover, and operator handoff are explicitly product truth and must stay local. |
| Assist UI | `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/assist-panel-contract.md:28` | product-owned | Assist surfaces are governed product UI, not a framework surface. |
| Telegram integration model | `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/telegram-bot-integration-model.md:24` | product-owned | Repo-local bot declarations, command policy, and business-account lifecycle already live in SellerAgent docs. |
| Telegram direct-bot catalog | `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/reference/telegram-direct-bot-command-catalog.md:1` | product-owned | Command tiers and visibility are SellerAgent-local operator truth. |
| Deployment truth | `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/deployment-architecture.md:43` | product-owned | `beta`/`prod` hosted truth is product-local; hosted readiness remains separate from this readiness task. |
| Rollout truth | `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/production-rollout-runbook.md:38` | product-owned | `pnpm verify:security:live` and rollout promotion are separate gates, but not required for a read-only readiness inventory. |
| Adoption boundary | `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md:84` | product-owned boundary | Day-to-day SellerAgent implementation starts from the local packet; upstream is only revisited for shared-contract sync. |
| Shared contract owner | `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/channel-runtime-contract.md:1` | upstream framework contract | `bot-platform` remains the contract owner for canonical response documents and minimal rendering helpers. |
| Telegram markdown helper | `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-markdown.ts:66` | product helper | Transport rendering is Telegram-specific and currently handled inside SellerAgent code. |
| Telegram command seam | `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-commands.ts:805` | product helper | Direct-command parsing/dispatch is still SellerAgent-local and mixes seller plus Docoved command surfaces. |
| Command export surface | `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/index.ts:162` | product helper export | Telegram markdown and Telegram command helpers are exported from SellerAgent core, so no adoption note is required yet. |
| Telegram message handler | `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/index.ts:1344` | product-owned | Server ingress delegates to the local direct-command handler and then continues SellerAgent conversation processing. |
| Telegram command projection | `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/command-projections.ts:77` | product-owned | Command projection sync is local server behavior and controls `setMyCommands` / `deleteMyCommands`. |
| Telegram integration ops | `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/integration-operations.ts:582` | product-owned | Telegram webhook and command sync stay in SellerAgent server operations. |
| Docoved channel surface resolver | `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/channels/docoved-command-policy.ts:1` | product-owned | Channel policy is product-local and is only a surface selector for the Telegram command seam. |
| `sa-admin` command handlers | `/Users/deksden/Documents/_Projects/seller-agent/packages/sa-admin/src/cli.ts:1869` | product-owned | Conversation, Telegram, channels, reconcile, rollout, and auth handlers stay local because they mutate SellerAgent state and ops truth. |

## Adoption Candidates

- No immediate SellerAgent adoption candidate requires a Memory Bank routing update.
- The only framework-owned seam in the read set is the upstream channel-runtime contract in `bot-platform`; SellerAgent is currently using local Telegram helpers and local command handlers instead.
- If SellerAgent later adopts the canonical response-document seam, the likely follow-up would be a product mapping task, not a routing patch.

## Blockers

- No immediate adoption blocker was found for this readiness task.
- I found no evidence that readiness-only work needs a hosted deploy or beta promotion.
- The docs already classify hosted readiness and rollout promotion as separate gates from read-only inventory work.

## Docs Changed Or Recommended

- No docs were changed.
- No SellerAgent Memory Bank routing note is needed right now.
- No new lessons or insights file is required from this inventory.

## Follow-Up Proposal

- If a later task wants actual SellerAgent adoption of the shared channel-runtime seam, start with a product mapping task that:
  - maps SellerAgent conversation/assist artifacts to the framework canonical response document model;
  - keeps product command handlers local;
  - proves no Docoved dependency leaks into SellerAgent runtime code;
  - adds beta evidence only if the task crosses from readiness into implementation.
