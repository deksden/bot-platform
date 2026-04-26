# T-043-05 Docoved Command / Email / Threading Inventory

## Summary
- Context readiness is complete: I inspected both repo statuses, read the required protocol/spec docs, ran the required Docoved searches, and inspected the live command/email/threading seams.
- Verdict: **blocked for implementation**, but **ready for handoff planning**; the inventory is sufficient to define the first parity slice, yet the live Docoved code still lacks the shared command-dispatch seam for email and the Telegram inbound reply-link normalization needed for full parity.

## Context Readiness
- Repo status: `bot-platform` is on `feature/EP-022-prt-043-channel-interaction-runtime`; `docoved-agent` is on `main...origin/main`.
- Repo-local instructions: no nested `AGENTS.md` files were found in either repo tree.
- Required docs read:
  - `bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
  - `bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`
  - `bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md`
  - `bot-platform/.memory-bank/spec/runtime/command-framework-contract.md`
  - `bot-platform/.memory-bank/spec/runtime/channel-runtime-contract.md`
  - `docoved-agent/.memory-bank/index.md`
  - `docoved-agent/.memory-bank/spec/operations/docoved-channel-adapter-contract.md`
  - `docoved-agent/.memory-bank/spec/runtime/docoved-channel-runtime-adoption.md`
  - `docoved-agent/.memory-bank/spec/runtime/docoved-acceptance-scenarios-and-host-contract.md`
  - `docoved-agent/.memory-bank/scenarios/index.md`
  - `docoved-agent/.memory-bank/scenarios/scenario-matrix.md`
  - `docoved-agent/.memory-bank/guides/reference/docoved-hosted-live-channel-acceptance-playbook.md`
  - `docoved-agent/.memory-bank/spec/operations/docoved-email-channel-binding-and-hosted-acceptance.md`
- Required searches completed in `docoved-agent` for command policy, Telegram commands, reply/thread metadata, `ask@beta-mail.docoved.pro`, `CanonicalResponseDocument`, and `channel-runtime`.

## Current Docoved Seams
- Command-policy seam exists, but it is still product-local and legacy-shaped: `docoved-agent/apps/server/src/channels/docoved-command-policy.ts:10-68` maps `commandAccessPolicy` into a docoved Telegram surface and hardcodes `allowDebugCommands: true`.
- Telegram command catalog/projection seam exists: `docoved-agent/scripts/_support/docoved-telegram-command-runtime.ts:17-260` defines the Docoved surface, actor classes, capabilities, and command lists; `docoved-agent/apps/server/src/telegram/command-projections.ts` consumes that same catalog for menu sync.
- Live Telegram answer webhook still does not parse commands; it treats inbound text as an answer question and only uses reply parameters on outbound send: `docoved-agent/apps/api/src/docoved-telegram-webhook-routes.ts:417-520`.
- Live email webhook already carries the threading seam the protocol wants: it preserves `Message-ID` / `In-Reply-To` / `References`, resolves reply targets, and sends `Re:` from `ask@beta-mail.docoved.pro`: `docoved-agent/apps/api/src/docoved-email-webhook-routes.ts:547-685`.
- Email-channel binding docs already require the same mailbox for inbound, `From`, and `Reply-To`, and call out `SCN-202` as the hosted beta readiness gate: `docoved-agent/.memory-bank/spec/operations/docoved-email-channel-binding-and-hosted-acceptance.md:73-102`.
- Channel-runtime adoption is already documented locally in Docoved: the mapping guide says Docoved owns the `DocovedAnswerArtifact -> CanonicalResponseDocument` mapping and that the current email/Telegram renderers stay thin over the same artifact.
- Scenario coverage is partially landed: `SCN-201` and `SCN-204` exist as flat docs, while `SCN-202` and `SCN-211` are only anchored in the hub/matrix and are not yet flat scenario docs.

## First Parity Command Set
- Recommended minimum parity set: `/help`, `/sources`, `/status`, `/report`.
- Adjacent read-only diagnostics to phase in next: `/whoami`, then `/inspect` and `/context` if the first proof needs them.
- Rationale:
  - `help` is the safest discovery/deny path.
  - `sources` matches the existing compact explainability surface.
  - `status` gives lightweight runtime/readback parity.
  - `report` is already exercised by the current proof scripts and is the best bridge to canonical diagnostics.
- Do **not** start with mutation or release-control commands; the protocol itself says the first parity slice should stay diagnostics/source/help-style.

## Threading / Rendering / Email Risks
- Email command recognition is still absent in the live webhook; today every verified inbound email is routed straight into `docoved_answer`, so ordinary email questions are not yet protected by a command parser/dispatcher boundary.
- Telegram reply-link ingestion is still incomplete: the live webhook sends outbound replies with `reply_parameters`, but the inbound message path does not normalize `reply_to_message` into canonical message lineage yet.
- `commandAccessPolicy` remains a legacy migration input unless the product memory bank explicitly declares it canonical writable authority; the current `allowDebugCommands: true` default makes it easy for policy drift to become a second authority.
- The `channel-runtime` contract explicitly excludes commands in first-wave scope, so any implementation must keep command dispatch in the command-framework seam and avoid creating parallel `ChannelCommand*` ownership.
- `SCN-202` email proof depends on `ask@beta-mail.docoved.pro` being the inbound, `From`, and `Reply-To` address with `Re:` threading preserved; that is already documented, but it remains an acceptance gate rather than a generalized command solution.

## Likely Files To Change
- `docoved-agent/apps/api/src/docoved-email-webhook-routes.ts`
- `docoved-agent/apps/api/src/docoved-telegram-webhook-routes.ts`
- `docoved-agent/apps/server/src/channels/docoved-command-policy.ts`
- `docoved-agent/apps/server/src/telegram/command-projections.ts`
- `docoved-agent/scripts/_support/docoved-telegram-command-runtime.ts`
- `docoved-agent/scripts/docoved-beta-telegram-commands.ts`
- `docoved-agent/scripts/docoved-beta-telegram-command-proof.ts`
- `docoved-agent/scripts/docoved-direct-command-proof.ts`
- `docoved-agent/scripts/docoved-beta-email-runtime-proof.ts`
- `docoved-agent/scripts/docoved-scn202-live-email.ts`
- likely doc updates in `docoved-agent/.memory-bank/scenarios/index.md` and `docoved-agent/.memory-bank/scenarios/scenario-matrix.md` if the SCN-202/SCN-211 anchors need promotion.

## Checks / Proofs
- Local/package proofs to keep around for the next phase:
  - `pnpm docoved:verify:local`
  - command proof scripts in `docoved-agent/scripts/docoved-direct-command-proof.ts` and `docoved-agent/scripts/docoved-beta-telegram-command-proof.ts`
  - email runtime proof scripts in `docoved-agent/scripts/docoved-beta-email-runtime-proof.ts` and `docoved-agent/scripts/docoved-scn202-live-email.ts`
- Hosted beta proofs required by the current Docoved docs:
  - `pnpm docoved:preflight:beta --json`
  - `pnpm docoved:verify:beta:corpus`
  - `pnpm docoved:bundle:beta`
  - `pnpm docoved:packet:beta:scn201`
  - `pnpm docoved:packet:beta:scn202`
  - `pnpm docoved:sync:beta:telegram --inspect`
  - `pnpm docoved:sync:beta:telegram-commands --status`
  - `pnpm docoved:inspect:beta:email`
  - `pnpm docoved:probe:beta:telegram --chat-id <chat-id> --text "..."` when a real tester chat id is available

## Hosted Beta Plan
- Telegram lane: prove the final live command/runtime behavior only after the command dispatcher exists in the live path; keep menu sync derived from policy, not authoritative.
- Email lane: keep the `ask@beta-mail.docoved.pro` reply/thread contract as the acceptance proof and add command handling only when the same normalized command path exists for email.
- Archive the final beta evidence only after the local proofs, the hosted corpus preflight, and the live lane reruns all agree.

## Assumptions / Unknowns
- I assumed the first parity set should stay read-only and start with `/help`, `/sources`, `/status`, and `/report`; `/whoami`, `/inspect`, and `/context` look like the next diagnostics slice.
- It is still unknown whether `commandAccessPolicy` is meant to remain only migration input or become canonical writable authority for Docoved.
- It is still unknown whether SCN-202 and SCN-211 should stay hub-only anchors or be promoted into flat scenario docs before implementation closes.
- It is still unknown whether email command parsing should enter through the same dispatcher immediately or be bridged product-locally until the framework seam lands.

## Blockers / Follow-ups
- Blocker 1: no live email command parser/dispatcher path exists yet in `apps/api/src/docoved-email-webhook-routes.ts`.
- Blocker 2: Telegram inbound reply-link normalization is missing from `apps/api/src/docoved-telegram-webhook-routes.ts`.
- Blocker 3: the exact first parity command set still needs a decision packet before implementation starts.
- Blocker 4: the command-framework implementation/export location and threading/delivery intent ownership gates from PRT-043 are still open.
