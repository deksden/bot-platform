# T-042-05 SellerAgent Adoption Readiness Report

## Outcome

Completed a read-only SellerAgent adoption-readiness review for the channel-runtime seam.

Decision: SellerAgent does not need a Memory Bank routing note, runtime code change, or hosted deploy for this readiness-only task.

## What Was Learned

- SellerAgent runtime truth is already localized in `.memory-bank/spec/runtime/**`, especially the shadow-assist / takeover contract.
- SellerAgent UI assist semantics are already localized in `.memory-bank/spec/ui/assist-panel-contract.md`.
- SellerAgent Telegram integration and direct-command guidance are already localized in `.memory-bank/guides/**`.
- Product-owned Telegram helpers and command handlers remain in SellerAgent code; the shared framework seam is not yet required for this repo.
- No immediate adoption blocker surfaced beyond the normal future need to map SellerAgent artifacts into the upstream framework contract if adoption becomes a later implementation task.

## Searched Paths

- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/index.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/index.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/runtime/index.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/runtime/shadow-assist-and-message-review.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/assist-panel-contract.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/telegram-bot-integration-model.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/reference/telegram-direct-bot-command-catalog.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/deployment-architecture.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/production-rollout-runbook.md`
- `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/index.ts`
- `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-markdown.ts`
- `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-commands.ts`
- `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/channels/docoved-command-policy.ts`
- `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/index.ts`
- `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/command-projections.ts`
- `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/integration-operations.ts`
- `/Users/deksden/Documents/_Projects/seller-agent/packages/sa-admin/src/cli.ts`

## Adoption Candidates

- `packages/core/src/telegram-markdown.ts` is a Telegram-named helper set, but it remains a product-local transport renderer and is not an adoption blocker by itself.
- `packages/core/src/telegram-commands.ts` is the main Telegram-named command seam; it mixes seller-facing and Docoved-facing direct-chat behavior, so it should stay local until a future product-mapping task proves the split.
- `apps/server/src/telegram/command-projections.ts` and `apps/server/src/telegram/integration-operations.ts` are product-owned command-projection / command-sync surfaces, not framework adoption targets.
- `apps/server/src/channels/docoved-command-policy.ts` is a product-local channel surface resolver that only selects the command surface and policy mode.
- `packages/sa-admin/src/cli.ts` owns SellerAgent command handlers for conversations, Telegram, channels, reconcile, rollout, and auth; those handlers should remain local.

## Blockers

- No immediate blocker for readiness-only work.
- No evidence showed that hosted deploy is needed for this review.
- The SellerAgent docs already treat hosted readiness and rollout promotion as separate gates from documentation inventory.

## Docs Changed Or Recommended

- No SellerAgent docs were changed.
- No seller-agent routing note is needed because the repo-local adoption boundary already points implementation back to the local packet and only revisits upstream for shared-contract sync.
- No lessons or insights file was needed for this task.

## Follow-Up Task Proposal

- If SellerAgent later adopts the upstream channel-runtime contract, follow with a product mapping task that:
  - maps SellerAgent conversation / assist artifacts into the canonical response-document seam;
  - keeps command execution and command projection local;
  - validates any future hosted proof only when the task crosses from readiness to implementation.

## Verification

- Read-only inventory only.
- No docs or code files were modified outside the task packet.
- No markdown link check or diff check was necessary because this task did not edit SellerAgent runtime/doc code.
