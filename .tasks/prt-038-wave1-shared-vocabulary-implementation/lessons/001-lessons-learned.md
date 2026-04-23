---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/001-lessons-learned.md
description: 'Initial operational lesson captured at PRT-038 wave-1 start.'
purpose: 'Record a reusable execution truth discovered at protocol start so later waves do not assume a git-flow state that the repo has not yet actually activated.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
tags: [lessons-learned, git-flow, ops, prt-038]
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
---

# Lesson 001

## Reusable truth

`bot-platform` documentation now treats `develop` as the target normal promotion branch, but the current repo state still does not have a real local `develop` branch.

For active execution before `develop` activation:
- do not assume `feature/* -> develop` can be followed literally inside the local repo;
- treat the current feature branch as a temporary implementation lane;
- avoid implying beta/promotion semantics from branch naming alone;
- keep subagents local-only unless the main agent explicitly performs the next git-flow transition.

## Why it matters

Without this clarification, subagent tasks could attempt to branch from or compare against a non-existent local `develop`, which would create avoidable confusion and invalid execution instructions.

## Proposed owning SSoT

- `.memory-bank/spec/operations/git-flow.md`
- `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
