# T-042-04 Docoved Adoption Packet Report

Date: 2026-04-25
Task: `.tasks/prt-042-channel-runtime-implementation-plan/tasks/T-042-04-docoved-adoption-packet.md`

## Changed Docoved Files

- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/index.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/index.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-channel-runtime-adoption.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/scripts/docoved-channel-runtime-adoption-proof.ts`

## Mapping Summary

- Docoved keeps product ownership of the mapping from `DocovedAnswerArtifact` to the upstream `CanonicalResponseDocument` contract.
- The local adoption doc routes readers to upstream `PRT-042` and records the minimal first-wave mapping:
  - `answer_text` -> public `answer` markdown block
  - `source_table` -> public `sources` markdown block plus citations/source refs
  - `verification_summary` -> `metadata.public.verificationSummary`
  - `answer_status` -> `metadata.public.answerStatus`
  - Docoved-only fields (`source_node_id`, raw `locator`, `published_artifact_path`, `claim_labels`) stay under `extensions.docoved`
- The implementation proof stays product-local and does not modify hosted adapters. `scripts/docoved-channel-runtime-adoption-proof.ts` builds a grounded `DocovedAnswerArtifact`, maps it into a framework-contract-compatible canonical document fixture, and verifies that current email/Telegram renderers preserve the same answer text and grounded source identity.
- Direct committed consumption of `@dd-bot-platform/channel-runtime` was intentionally not added. In a standalone product repo, a sibling-path dependency to `../bot-platform/...` would be an unsafe workaround. Actual package integration remains blocked until publish or a sanctioned safe bridge exists.

## Channel Behavior Impact

- No email adapter logic changed.
- No Telegram adapter logic changed.
- No email threading logic changed for `Re:`, `Message-ID`, `In-Reply-To`, or `References`.
- No command behavior changed.
- Current channel behavior already remains thin over one Docoved answer artifact:
  - `packages/core/src/runtime/research-workflow.ts` renders from the same answer artifact
  - `apps/api/src/docoved-email-webhook-routes.ts` sends email from that artifact
  - `apps/api/src/docoved-telegram-webhook-routes.ts` sends Telegram from that artifact

## Checks / Proofs Run

- `pnpm exec tsx scripts/docoved-channel-runtime-adoption-proof.ts` — passed.
- `pnpm typecheck` — passed.
- `pnpm check` — passed.

Proof result:
- local mapping fixture produced `grounded_answer`
- canonical document fixture contained `answer` and `sources` public sections
- current email and Telegram renderers preserved the same answer text and grounded source title/locator
- compact source-readback renderers preserved the same final source identity

## Hosted Beta Evidence

- Hosted beta verification: `N/A`

Rationale:
- this task made no hosted adapter change
- this task made no email threading/header change
- this task made no Telegram formatting/helper change
- this task stayed at product-local docs plus local mapping proof

Existing hosted product docs/runbooks already identified for future adapter-changing work:
- Docoved git flow: `.memory-bank/spec/operations/git-flow.md`
- hosted topology: `.memory-bank/spec/operations/docoved-hosted-deployment-topology.md`
- contour/bootstrap runbooks: `.memory-bank/spec/operations/docoved-contour-runbook.md`, `.memory-bank/spec/operations/docoved-hosted-bootstrap-runbook.md`
- beta email contract: `.memory-bank/spec/operations/docoved-email-channel-binding-and-hosted-acceptance.md`
- beta Telegram contract: `.memory-bank/spec/operations/docoved-telegram-channel-binding-and-hosted-acceptance.md`
- scenario hub: `.memory-bank/scenarios/index.md`

## Risks / Follow-Ups

- Blocker: actual direct package adoption of `@dd-bot-platform/channel-runtime` in `docoved-agent` still requires a safe distribution path. Do not commit a sibling-path dependency as a workaround.
- Follow-up once the package is publish-consumable: replace the local fixture-only canonical document shape with a direct import from `@dd-bot-platform/channel-runtime`.
- If a later slice switches live adapters to direct canonical-document rendering, rerun beta Telegram proof, beta email proof, and explicit email threading proof.

## Lessons / Insights Status

- Created one durable lesson file: `.tasks/prt-042-channel-runtime-implementation-plan/lessons/003-standalone-product-package-consumption-blocker.md`.
- No new insight file was needed for this task.
