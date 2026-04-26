---
task_id: T-043-02-verification
title: Verify command framework implementation
suggested_agent: explorer / gpt-5.4-mini
status: READY
write_scope:
  - .tasks/prt-043-channel-interaction-runtime/T-043-02-verification.md
---

# T-043-02 Verification

## Goal

Verify the implementation of `T-043-02` against the task packet, report, actual code, and protocol boundaries.

## Required context readiness

Before judging, read and record:
- `.tasks/prt-043-channel-interaction-runtime/T-043-02-command-framework-contracts.task.md`;
- `.tasks/prt-043-channel-interaction-runtime/T-043-02-report.md`;
- `.memory-bank/spec/runtime/command-framework-contract.md`;
- `.memory-bank/spec/project/feature-area-boundaries.md`;
- `packages/core/src/command-framework/contracts.ts`;
- `packages/core/src/command-framework/index.ts`;
- `packages/core/src/command-framework.spec.ts`;
- `packages/core/src/index.ts`.

Also inspect `git diff -- packages/core/src` and run focused searches for product/channel/provider leaks.

## Review focus

Check:
- command framework lives in core, not channel-runtime;
- no product catalog, DB, UI, provider SDK, or transport sender slipped in;
- actor types cover required categories;
- availability supports actor type, channel kind, channel ref, deny-over-allow;
- dispatcher does not call handler before registry/access/validation;
- failure classes match the protocol;
- thrown handler errors do not leak raw secret/stack as public summary;
- tests cover the requested cases;
- code is lean and does not create unused abstractions.

## Output

Write `.tasks/prt-043-channel-interaction-runtime/T-043-02-verification.md` with:
- verdict: accepted / needs fixes / blocked;
- scope compliance;
- findings with severity;
- checks/evidence reviewed;
- required fixes;
- optional follow-ups.
