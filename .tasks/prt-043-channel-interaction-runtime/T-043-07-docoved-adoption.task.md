# T-043-07 Docoved Adoption

## Goal

Adopt the PRT-043 platform contracts in `/Users/deksden/Documents/_Projects/docoved-agent` for the first safe Docoved slice:
- consume released or approved bridge version of `@dd-bot-platform/core` / `@dd-bot-platform/channel-runtime`;
- align Docoved command handling with platform command-framework types where it removes drift without moving product command catalog out of Docoved;
- align email/Telegram reply threading with channel-runtime threading intent/result summary contracts;
- document and verify locally; prepare hosted beta proof path.

## Context readiness checklist

Before edits, record context in the report:
- Docoved branch/status and git-flow docs;
- `.memory-bank/index.md` and relevant runtime/ops/scenario docs in Docoved;
- platform PRT-043 specs and reports;
- current package dependencies and lockfile state;
- existing Telegram command files, email route files, channel-runtime mapping files, and proof scripts;
- searches for `commandAccessPolicy`, `allowDirectCommands`, `Message-ID`, `In-Reply-To`, `reply_to_message`, `CanonicalResponseDocument`, `@dd-bot-platform`.

Do not guess. If product adoption is blocked by missing published package version, report the exact blocker and viable bridge/release path.

## Scope

Allowed:
- add platform package dependency/version updates required for PRT-043;
- add small adapter/mapping helpers using `@dd-bot-platform/core` command types and `@dd-bot-platform/channel-runtime` threading/delivery types;
- update tests/proofs/scripts if needed;
- update Docoved Memory Bank.

Non-goals:
- no product command catalog extraction into bot-platform;
- no DB migrations unless already required and documented;
- no provider sender refactor beyond typed intent/result mapping;
- no unrelated Docoved behavior changes.

## Output

Write report to `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-043-channel-interaction-runtime/T-043-07-report.md` with context readiness, changed files, checks, blockers, and beta proof plan.
