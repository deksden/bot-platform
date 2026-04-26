# T-043-05 Docoved Command / Email / Threading Inventory

## Owner / model guidance
- Suggested model: `gpt-5.4-mini`
- Parallelism: can run in parallel with platform package-boundary and SellerAgent inventory tasks.
- Write scope: report only. Do not edit repo code/docs.

## Goal
Inventory Docoved command, email, Telegram, rendering, and threading seams needed for PRT-043 adoption. Define the minimum Docoved first parity command set and identify implementation risks.

## Context to collect before work
Required docs in `bot-platform`:
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md`

Required docs in `/Users/deksden/Documents/_Projects/docoved-agent`:
- `.memory-bank/index.md`
- `.memory-bank/spec/operations/docoved-channel-adapter-contract.md`
- `.memory-bank/spec/runtime/docoved-channel-runtime-adoption.md`
- relevant scenario index/docs around `SCN-201`, `SCN-202`, `SCN-204`, `SCN-211` if present.

Required code searches in `/Users/deksden/Documents/_Projects/docoved-agent`:
- `rg -n "commandAccessPolicy|TelegramCommand|resolveTelegramCommand|direct command|/sources|/help|sources|Message-ID|In-Reply-To|References|reply_to_message|ask@beta-mail|CanonicalResponseDocument|channel-runtime" scripts src apps packages .memory-bank`
- inspect `scripts/_support/docoved-telegram-command-runtime.ts` if present;
- inspect `scripts/docoved-direct-command-proof.ts` if present;
- inspect `scripts/docoved-beta-telegram-commands.ts` if present;
- inspect email runtime/proof scripts found by search.

## Context readiness checklist
Before recommendations, the subagent must:
- inspect branch/status for `docoved-agent` and `bot-platform`;
- read required docs;
- run required searches;
- identify existing Telegram command path, email command/thread path, and canonical rendering path;
- identify existing tests/proofs/scripts that can be reused;
- list assumptions and unknowns;
- decide whether Docoved adoption is ready or blocked.

## What to do
- Identify current Docoved command surfaces and policy fields.
- Recommend the first parity command set for email/Telegram.
- Identify ordinary-email-not-command safeguards needed.
- Identify unauthorized sender/user denial paths.
- Identify threading requirements for `ask@beta-mail.docoved.pro` and Telegram replies.
- Identify exact files likely to change in Docoved adoption.
- Identify local and beta checks/proofs required.

## What not to do
- Do not edit files.
- Do not move Docoved business logic into platform.
- Do not suggest mutation commands for the first proof unless already unavoidable.
- Do not assume scenario ids exist without checking.

## Risks and thin points
- Email command parsing must not steal ordinary legal/document questions.
- `commandAccessPolicy` must not become a second writable authority unless Docoved declares it canonical.
- Threading fallback must not silently break `Re:` behavior.

## Completion criteria
- Report identifies minimum command set, files, checks, risks, and blockers.

## Report format
Write `.tasks/prt-043-channel-interaction-runtime/T-043-05-report.md` with:
- summary;
- context readiness;
- current Docoved seams;
- first parity command recommendation;
- threading/rendering/email risks;
- likely files to change;
- tests/local proofs;
- hosted beta proof plan;
- blockers/follow-ups.
