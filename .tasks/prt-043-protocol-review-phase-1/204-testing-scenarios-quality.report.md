# PRT-043 Testing, Scenarios, Quality Gates Review

## Summary verdict

PRT-043 is directionally strong, but it is not yet specific enough for phase-1 verification. The protocol names the right classes of checks, yet the current verification matrix still reads like a policy outline rather than an executable test plan, and it does not pin the new behavior to enough concrete scenario ids or existing helper surfaces.

## Missing / weak tests

- The only current `channel-runtime` tests are the four pure-helper cases in `/Users/deksden/Documents/_Projects/bot-platform/packages/channel-runtime/src/channel-runtime.spec.ts:53-115`: visibility filtering, markdown-to-plain-text rendering, message splitting, and invalid `maxLength`.
- That leaves the phase-1 promises in `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md:653-670` uncovered for:
  - actor/channel allow-deny precedence;
  - safe command failure envelopes;
  - threading intent and fallback shapes;
  - delivery idempotency/correlation fields;
  - redaction-safe observability event construction.
- The protocol’s own quality gap list already admits the missing behavior: policy precedence, channel-neutral command parsing, reply-thread fallback, duplicate-send constraints, and anti-abuse hooks are all called out in `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md:90-100`, but there are no tests yet that exercise those cases.
- I did not find adjacent `*.spec.ts` or `*.test.ts` coverage around the existing product helpers that the protocol should be reusing:
  - `/Users/deksden/Documents/_Projects/docoved-agent/scripts/_support/docoved-telegram-command-runtime.ts:12-39,41-68,147-306`
  - `/Users/deksden/Documents/_Projects/docoved-agent/scripts/_support/docoved-in-process-acceptance-harness.ts:20-40`
  - `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-commands.ts:39-68,168-317`
  - `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/telegram/control-plane-support.ts:19-115`

## Missing scenario anchors

- The verification matrix is still generic for `command-framework`: `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/verification-matrix.md:64-75` points that row at `scenarios/contracts/index.md` and the scenario matrix, but it does not name a concrete scenario doc the way `runtime-kernel` does.
- The protocol’s Docoved adoption section is still too vague at `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md:526-543`. It says to “update Docoved Memory Bank and hosted beta scenarios,” but it does not explicitly anchor the work to the repo-local scenarios that already exist in Docoved:
  - `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/scenarios/index.md:83-95` includes `SCN-201`, `SCN-202`, `SCN-203`, `SCN-204`, and `SCN-211`.
- SellerAgent has a concrete capability anchor already, but the protocol does not cite it:
  - `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/scenarios/SCN-053-telegram-observed-user-capture-and-employee-verification-flow.md:23-30,80-108` covers observed-user capture, verification, revocation, and stable rebind by Telegram `user_id`.
- The specific edge cases you asked about are still missing as explicit scenario coverage in the protocol:
  - unauthorized email sender;
  - ordinary email that is not a command;
  - repeated webhook replay;
  - duplicate delivery / send idempotency;
  - policy fallback;
  - menu projection drift.
- `SCN-211` is the closest existing Docoved anchor for command-policy/projection behavior, but the protocol does not currently tie its verification bullets to that id or to any new dedicated idempotency/fallback scenario.

## Quality gate improvements

- Split the checks into three clearly labeled lanes, because the protocol currently blends them:
  - local framework/package checks;
  - product-local checks;
  - hosted beta checks.
- The repo only exposes build/typecheck gates today:
  - root scripts in `/Users/deksden/Documents/_Projects/bot-platform/package.json:6-14`;
  - package publish gate in `/Users/deksden/Documents/_Projects/bot-platform/packages/channel-runtime/package.json:38-42` via `prepack`.
  There is no lint script or test runner wired at root, so the protocol should not imply those exist unless they are added.
- For release-package validation, `prepack` is the current concrete publish gate for `@dd-bot-platform/channel-runtime`, so the protocol should say “build/typecheck plus package prepack or pack dry-run” rather than just “CI/package checks.”
- Hosted beta checks should stay limited to cases that actually need live lane proof:
  - `Re:` / thread-header behavior;
  - webhook delivery / reply-target behavior;
  - live command authorization and denial;
  - delivery logs/correlation on the deployed beta lane.
  Everything else should remain local and deterministic.
- The host-layer rules already exist in `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/scenarios/hosted-beta-execution-model.md:1-54` and `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/hosted-beta-acceptance-contract.md:1-54,75-107`; the protocol should explicitly name `beta_api` versus `beta_ui` rather than saying “hosted beta verification” generically.

## Suggested exact patch direction

- In `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md:718-757`, replace the current high-level verification matrix with a mapping like:
  - framework local: policy precedence, parse/result/failure envelopes, threading/delivery serialization, redaction-safe observability;
  - Docoved local: Telegram/email parser behavior, ordinary-email-not-command, unauthorized sender denial, reply-thread fallback;
  - Docoved hosted beta: `SCN-201`, `SCN-202`, `SCN-204`, and `SCN-211`;
  - SellerAgent local: role/capability projection and menu drift against `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/telegram-commands.ts:211-317`;
  - SellerAgent hosted beta: `SCN-053` plus the command-policy/release-control regressions.
- In `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md:526-543`, add explicit bullets for:
  - ordinary email questions must not become commands;
  - repeated webhook / duplicate delivery must be idempotent or visibly suppressed;
  - policy fallback must be observable;
  - menu projection must be treated as derived, not authoritative.
- In `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md:653-670`, tighten phase-1 exit criteria so they require concrete tests for:
  - allow/deny precedence across actor, channel kind, and channel instance;
  - `not_a_command`, `access_denied`, `rate_limited`, and `unsupported_channel` result kinds;
  - `ThreadingIntent` fallback/required-target behavior;
  - `OutboundDeliveryIntent` / `OutboundDeliveryResult` correlation and idempotency fields.
- If the intent is to add linting, introduce the script first; otherwise keep the phase-1 gate to build/typecheck plus the package publish dry-run that already exists.
