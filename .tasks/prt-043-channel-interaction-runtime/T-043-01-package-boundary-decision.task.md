# T-043-01 Package Boundary Decision

## Owner / model guidance
- Suggested model: `gpt-5.5`
- Parallelism: can run in parallel with Docoved/SellerAgent inventory tasks.
- Write scope: report only. Do not edit repo code/docs.

## Goal
Resolve the first pre-code gate for PRT-043: where command-framework typed contracts should live, whether threading/delivery intent belongs in `@dd-bot-platform/channel-runtime` now, and which existing refs/vocabularies must be reused.

This task exists because implementation code must not start until package boundaries are clear.

## Context to collect before work
Required docs:
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md`
- `.memory-bank/spec/project/feature-area-boundaries.md`
- `.memory-bank/spec/runtime/command-framework-contract.md`
- `.memory-bank/spec/runtime/channel-runtime-contract.md`
- `.memory-bank/spec/runtime/index.md`
- `.memory-bank/spec/operations/observability-and-incident-diagnostics.md`
- `.memory-bank/mbb/delivery-docs-guide.md`

Required code searches:
- `find packages -maxdepth 3 -type f -name package.json -print`
- `find packages -maxdepth 4 -type f -name '*.ts' | sort`
- `rg -n "CommandEnvelope|CommandRegistry|CommandDispatcher|CommandAvailability|CommandActor|ChannelRef|ExecutionRunRef|ReplyThreadLinkingFidelity|OutboundDelivery|ThreadingIntent|CanonicalResponseDocument" packages`
- inspect `packages/core/src/index.ts`
- inspect `packages/core/src/control-plane/**`
- inspect `packages/api-contract/src/control-plane/**`
- inspect `packages/channel-runtime/src/**`
- inspect root `package.json`, `pnpm-workspace.yaml`

## Context readiness checklist
Before making recommendations, the subagent must:
- inspect current branch/status;
- read all required docs;
- run all required searches;
- identify existing package exports and dependency directions;
- identify whether command-framework is code-backed or documentation-only today;
- identify existing control-plane refs/capability/observability vocabularies to reuse;
- list assumptions and unknowns;
- decide whether implementation is ready or blocked.

## What to do
- Recommend the package/module home for command-framework typed contracts.
- Recommend whether threading/delivery intent/result types should enter `channel-runtime` in first implementation or remain product-local for now.
- Define a lean first platform contract slice.
- Identify exact files likely to change in platform implementation.
- Identify tests/checks needed for the chosen boundary.
- Note any semver/release implications.

## What not to do
- Do not create or edit code.
- Do not propose moving product command catalogs into `bot-platform`.
- Do not propose framework DB/UI/provider senders.
- Do not introduce a new package unless dependency direction justifies it.

## Risks and thin points
- Avoid duplicate command framework inside `channel-runtime`.
- Avoid parallel vocabulary for refs/capabilities already in `core` / `api-contract`.
- Avoid overengineering delivery/threading beyond provider-neutral intent/result.

## Completion criteria
- Report answers all pre-code boundary questions.
- Report names recommended package/module and rejected alternatives.
- Report identifies blocking unknowns if any.

## Report format
Write `.tasks/prt-043-channel-interaction-runtime/T-043-01-report.md` with:
- summary recommendation;
- context readiness;
- package inventory;
- decision matrix;
- recommended implementation slice;
- files likely to change;
- tests/checks;
- semver/release notes;
- risks/follow-ups.
