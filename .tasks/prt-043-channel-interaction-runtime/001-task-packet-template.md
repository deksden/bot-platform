# Task Packet Template

## Task id
`T-043-XX`

## Owner / model guidance
- Suggested agent type/model:
- Parallelism:
- Write scope:

## Goal
Explain the delivered outcome and why this task exists in PRT-043.

## Context to collect before work
Required docs:
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md`
- relevant runtime/product/ops docs for the task

Required code searches:
- list exact `rg` queries or files to inspect before editing

## Context readiness checklist
Before making any code or canonical documentation changes, the subagent must:
- state which repository/repositories are in scope;
- inspect current branch/status for each in-scope repo;
- read all required docs listed above and any nested/nearby `AGENTS.md` if editing under a new subtree;
- run the required code/doc searches from this packet;
- identify existing implementation seams, tests, helpers, fixtures, and product-owned boundaries that must be reused;
- list assumptions and unknowns that may affect design or scope;
- stop and report if a pre-code gate or ownership ambiguity is unresolved.

The subagent report must include a `Context readiness` section summarizing:
- docs read;
- searches run;
- key files inspected;
- existing seams/helpers/tests found;
- assumptions/unknowns;
- decision that the task is ready for implementation or blocked.

## What to do
- Step 1
- Step 2
- Step 3

## What not to do
- Do not change unrelated files.
- Do not move product command catalogs into `bot-platform`.
- Do not introduce framework DB/UI/provider sender scope.
- Do not bypass package-boundary decisions or product ownership rules.

## Risks and thin points
- access/security:
- idempotency/retries:
- product compatibility:
- observability/redaction:

## Completion criteria
- code/docs changed:
- tests/checks run:
- evidence produced:
- Memory Bank updates:

## Report format
Write `.tasks/prt-043-channel-interaction-runtime/T-043-XX-report.md` with:
- summary;
- files changed;
- decisions/deviations;
- checks run and results;
- risks/follow-ups;
- lessons/insights candidates.
