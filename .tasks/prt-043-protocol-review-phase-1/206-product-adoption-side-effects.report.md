# PRT-043 Product Adoption / Side Effects Review

## Summary Verdict
- Directionally correct, but not yet fully closed for implementation.
- The protocol covers the right adoption surfaces, but it still leaves a real migration hazard around command-policy authority and a couple of proof-slice boundaries that should be pinned before coding.

## Docoved Adoption Findings
- Yes: the protocol explicitly covers Telegram + email command parity, canonical response documents, normal answer flow, reply-threading, unauthorized actors, and ordinary email-question safety in `PRT-043:526-543`.
- Threading is also handled at the right level: per-channel-instance `reply_to_origin` behavior, fallback, and missing/stale reply-target handling are spelled out in `PRT-043:329-366`.
- The gap is proof scope, not intent: the current Docoved runtime adoption note still says hosted beta verification is `N/A` because no command/threading behavior changed yet (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-channel-runtime-adoption.md:103-114`), so `PRT-043` needs explicit beta proof cases for ordinary email-question non-command classification and unauthorized sender denial.
- The Docoved beta tooling already treats command policy and command sync as an operational side effect: it previews `allowDirectCommands`, `allowDebugCommands`, and `commandAccessPolicy`, then resyncs observed users and Telegram commands (`/Users/deksden/Documents/_Projects/docoved-agent/scripts/docoved-beta-telegram-commands.ts:412-651`).

## SellerAgent Adoption Findings
- Yes: the protocol preserves current privileged-command safety by requiring existing gates to survive adoption and by keeping release-control regression-free (`PRT-043:554-569`, `PRT-043:746-757`).
- The current SellerAgent command surface is already capability-based: Telegram command availability is derived from actor class + workspace role + debug policy, and release-control commands stay behind preview/confirm flows (`/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-commands.ts:147-208`, `:2487-2533`, `:2598-2665`).
- The current schema still exposes multiple writable knobs that can drift: `channel.commandAccessPolicy` exists on the channel record while Telegram integration flags still include `allowDirectCommands` and `allowDebugCommands` (`/Users/deksden/Documents/_Projects/seller-agent/packages/api-contract/src/operations.ts:1588-1618`, `:1149-1174`).
- That makes the protocol’s compatibility rule essential, not optional: legacy `commandAccessPolicy` must be treated as migration input only, or SellerAgent will have two editable command-policy authorities in practice (`PRT-043:422-427`).

## Cross-Product Side Effects
- Command menu sync is a real behavioral side effect, not just presentation. `PRT-043` correctly says menu/help projection is not authority (`PRT-043:260-271`), and the Docoved beta tool demonstrates why: policy changes can trigger command resync plus snapshot verification (`/Users/deksden/Documents/_Projects/docoved-agent/scripts/docoved-beta-telegram-commands.ts:443-651`).
- Channel config drift is covered conceptually by the compatibility rules, but the protocol should say more explicitly that one writable source is canonical and all others are compatibility reads (`PRT-043:406-427`).
- External/unknown-user handling is covered well: the protocol requires default denial, bounded error messages, and no menu projection for unknown users unless public commands are explicitly enabled (`PRT-043:499-511`).
- Beta-specific bindings are mentioned, but should be called out as proof targets, not assumed defaults: Docoved names `docoved-beta-main` and `ask@beta-mail.docoved.pro` in its adoption note (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-channel-runtime-adoption.md:89-114`).
- SellerAgent’s command catalog remains product-owned, and the shared protocol should not try to absorb those menus into platform code (`/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-commands.ts:168-220`).

## Suggested Exact Patch Direction
- In `PRT-043` under `Configuration source of truth and compatibility`, add one sentence that `commandAccessPolicy` is legacy migration input only, and name exactly one canonical writable authority per product.
- In `PRT-043` under `Product adoption: Docoved`, add explicit first-slice acceptance for ordinary email-question non-command classification and unauthorized sender denial.
- In `PRT-043` under `Product adoption: SellerAgent`, split the proof order into read-only diagnostics/readback first, then release-control mutation; do not take the mutation commands into the minimum proof slice.
- In `PRT-043:810-817`, resolve the open questions that still matter here: first Docoved parity commands, minimum SellerAgent beta subset, shared vs SellerAgent-only delivery fields, and the exact threading config shape.
- Update the product Memory Bank docs the protocol already names: `FT-015-10`, `FT-016-05`, `EP-015`, `EP-016`, `auth-and-access.md`, `telegram-channel-architecture.md`, `business-profile-publish-runbook.md`, and the relevant scenario/verification docs.
- Add one explicit SellerAgent adoption note somewhere in the SellerAgent Memory Bank that normalizes command naming, especially `/use_release` in code versus the `/use-release` spelling used in planning prose (`/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-commands.ts:2487-2533`).
