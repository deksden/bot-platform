# Task 106: Docoved and SellerAgent Adoption / Side Effects Review

## Goal
Review cross-repo adoption implications for Docoved and SellerAgent: command parity, channel config, threading behavior, product ownership, migration from legacy fields, beta proof scope, and side effects in product behavior.

## Files to inspect
Primary:
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`

Docoved context:
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-channel-adapter-contract.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-channel-runtime-adoption.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/scripts/_support/docoved-telegram-command-runtime.ts` if present
- `/Users/deksden/Documents/_Projects/docoved-agent/scripts/docoved-direct-command-proof.ts` if present
- `/Users/deksden/Documents/_Projects/docoved-agent/scripts/docoved-beta-telegram-commands.ts` if present

SellerAgent context:
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-007-telegram-privileged-command-surface-bot-level-release-control-and-runtime-diagnostics.md`
- `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/index.ts`
- `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/channels/docoved-command-policy.ts` if present
- `/Users/deksden/Documents/_Projects/seller-agent/packages/api-contract/src/operations.ts`
- `/Users/deksden/Documents/_Projects/seller-agent/packages/api-contract/src/conversations.ts`

## Questions to answer
1. Does Docoved adoption cover email commands, Telegram commands, normal answer flow, reply-threading, unauthorized actors, and ordinary email questions?
2. Does SellerAgent adoption avoid breaking existing privileged command behavior and release-control command safety?
3. Are existing legacy fields like `commandAccessPolicy` handled safely without introducing a second authority?
4. Are side effects covered: command menu sync, channel config drift, beta bot/address specifics, external users, product-specific capabilities?
5. Are product Memory Bank updates specified enough?
6. Does the protocol identify minimum adoption subsets to avoid taking on risky mutation commands too early?
7. What exact documentation changes are needed?

## Constraints
- Do not edit files.
- Do not assume product implementation details not present in code/docs; mark uncertainty clearly.

## Report
Write your report to:
- `.tasks/prt-043-protocol-review-phase-1/206-product-adoption-side-effects.report.md`

Report format:
- Summary verdict
- Docoved adoption findings
- SellerAgent adoption findings
- Cross-product side effects
- Suggested exact patch direction
