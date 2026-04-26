# T-043-06 SellerAgent Command / Delivery Inventory

## Owner / model guidance
- Suggested model: `gpt-5.4-mini`
- Parallelism: can run in parallel with platform package-boundary and Docoved inventory tasks.
- Write scope: report only. Do not edit repo code/docs.

## Goal
Inventory SellerAgent command, actor/access, Telegram menu, release-control, and delivery outcome seams needed for PRT-043 adoption. Define the minimum first SellerAgent adoption subset.

## Context to collect before work
Required docs in `bot-platform`:
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md`

Required docs in `/Users/deksden/Documents/_Projects/seller-agent`:
- `.memory-bank/index.md`
- `.memory-bank/plans/protocols/PRT-007-telegram-privileged-command-surface-bot-level-release-control-and-runtime-diagnostics.md`
- `.memory-bank/scenarios/SCN-053-telegram-observed-user-capture-and-employee-verification-flow.md`
- relevant deployment/ops docs if adoption affects beta proof.

Required code searches in `/Users/deksden/Documents/_Projects/seller-agent`:
- `rg -n "TelegramCommand|commandAccessPolicy|allowDirectCommands|allowDebugCommands|syncTelegramCommands|actorClass|system_admin|employee|external_customer|/use_release|release-control|ConversationReplyDelivery|deliveryOutcome|reply_to|thread" packages apps .memory-bank`
- inspect `packages/core/src/telegram-commands.ts` if present;
- inspect `apps/server/src/telegram/index.ts`;
- inspect `apps/server/src/channels/docoved-command-policy.ts` if present;
- inspect `packages/api-contract/src/operations.ts`;
- inspect `packages/api-contract/src/conversations.ts`.

## Context readiness checklist
Before recommendations, the subagent must:
- inspect branch/status for `seller-agent` and `bot-platform`;
- read required docs;
- run required searches;
- identify existing command catalog, actor resolver, menu projection, release-control commands, and delivery summary models;
- identify existing tests/proofs/scenarios that can be reused;
- list assumptions and unknowns;
- decide whether SellerAgent adoption is ready or blocked.

## What to do
- Classify SellerAgent commands into read-only diagnostics/readback, release-control mutation, product workflow mutation, and debug-only.
- Recommend the minimum first adoption subset.
- Map existing actor/access concepts to PRT-043 actor classes/capability tags.
- Identify delivery outcome fields that are shared candidates versus SellerAgent-only.
- Identify likely files to change in SellerAgent adoption.
- Identify local and hosted beta checks required.

## What not to do
- Do not edit files.
- Do not move SellerAgent command catalog or release-control semantics into platform.
- Do not include mutation/release-control commands in first proof unless justified.
- Do not assume UI/admin migration is part of PRT-043.

## Risks and thin points
- Telegram menu projection must remain derived, not authoritative.
- Release-control commands must preserve product permission gates and confirmation flow.
- Existing delivery workflows must not be replaced by generic platform orchestration.

## Completion criteria
- Report identifies command subset, actor mapping, delivery field classification, files, checks, and blockers.

## Report format
Write `.tasks/prt-043-channel-interaction-runtime/T-043-06-report.md` with:
- summary;
- context readiness;
- current SellerAgent seams;
- command classification and first subset;
- actor/capability mapping;
- delivery field classification;
- likely files to change;
- tests/local proofs;
- hosted beta proof plan;
- blockers/follow-ups.
