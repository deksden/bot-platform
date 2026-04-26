# T-043-08 SellerAgent Adoption

## Goal

Adopt the PRT-043 platform contracts in `/Users/deksden/Documents/_Projects/seller-agent` for the first safe SellerAgent slice:
- consume released or approved bridge version of `@dd-bot-platform/core` / `@dd-bot-platform/channel-runtime`;
- align read-only/diagnostic Telegram command access with platform command-framework types where useful;
- map SellerAgent delivery outcome summaries to channel-runtime delivery result summary without replacing product workflow state;
- document and verify locally; prepare hosted beta proof path.

## Context readiness checklist

Before edits, record context in the report:
- SellerAgent branch/status and git-flow docs;
- `.memory-bank/index.md`, PRT-007, command catalog docs, current status report;
- platform PRT-043 specs and reports;
- current package dependencies and lockfile state;
- existing `packages/core/src/telegram-commands.ts`, workflow delivery outcome files, proof scripts;
- searches for `TelegramCommandActorClass`, `commandAccessPolicy`, `actorClass`, `deliveryOutcome`, `/versions`, `/releases`, `/current`, `@dd-bot-platform`.

Do not guess. If adoption is blocked by missing package version, report exact blocker and viable bridge/release path.

## Scope

Allowed:
- add platform package dependency/version updates required for PRT-043;
- add small adapter/mapping helpers using `@dd-bot-platform/core` command types and `@dd-bot-platform/channel-runtime` delivery types;
- update tests/proofs/docs.

Non-goals:
- no mutation/release-control behavior rewrite;
- no product command catalog extraction into bot-platform;
- no provider sender/queue refactor;
- no broad SellerAgent runtime replacement.

## Output

Write report to `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/T-043-08-report.md` with context readiness, changed files, checks, blockers, and beta proof plan.
