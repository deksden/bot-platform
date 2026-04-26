# Task 104: Testing, Scenarios, Quality Gates Review

## Goal
Review PRT-043 testing and verification plan: local tests, package checks, scenario anchors, hosted beta checks, CI/build/lint/typecheck expectations, and whether planned tests use existing infrastructure.

## Files to inspect
Primary:
- `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`

Required context:
- `.memory-bank/plans/verification-matrix.md`
- `.memory-bank/spec/scenarios/hosted-beta-execution-model.md` if present
- `.memory-bank/spec/operations/hosted-beta-acceptance-contract.md` if present
- `.memory-bank/spec/engineering/coding-style.md` if present
- `.memory-bank/spec/engineering/delivery-standards.md` if present
- `packages/channel-runtime/src/channel-runtime.spec.ts`
- `package.json`
- `pnpm-workspace.yaml`

Product scenario context:
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/scenarios/index.md` if present
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/scenarios/SCN-053-telegram-observed-user-capture-and-employee-verification-flow.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-007-telegram-privileged-command-surface-bot-level-release-control-and-runtime-diagnostics.md`

## Questions to answer
1. Are tests specific enough for each changed subsystem?
2. Are there missing scenarios: unauthorized email sender, ordinary email not command, repeated webhook, duplicate delivery, policy fallback, menu projection drift?
3. Does protocol distinguish local checks vs hosted beta checks vs CI/package release checks?
4. Does it reference existing test helpers/fixtures where available?
5. Are lint/typecheck/build/package dry-run checks planned appropriately?
6. Are hosted beta checks planned only when needed, not wastefully?
7. Are acceptance criteria strong enough to catch the kind of issues that previously slipped through?
8. What exact documentation changes are needed?

## Constraints
- Do not edit files.
- If a referenced file is absent, report that as a documentation risk rather than guessing.

## Report
Write your report to:
- `.tasks/prt-043-protocol-review-phase-1/204-testing-scenarios-quality.report.md`

Report format:
- Summary verdict
- Missing/weak tests
- Missing scenario anchors
- Quality gate improvements
- Suggested exact patch direction
