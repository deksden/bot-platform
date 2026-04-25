---
file: .tasks/prt-042-channel-runtime-implementation-plan/tasks/T-042-03-framework-verification-and-publish-readiness.md
description: Verification task for first-wave framework package/module readiness.
purpose: Prove build, import-boundary, fixture, and publish readiness before product adoption consumes the contract.
version: 0.1.0
date: 2026-04-25
status: PLANNED
tags: [task, prt-042, verification, publish]
parent: ../index.md
---

# Task T-042-03: Framework Verification And Publish Readiness

## Context to read

- Executor reports for `T-042-00`, `T-042-01`, and `T-042-02`.
- Actual changed package/module files.
- `package.json`
- `tsconfig.build.json`
- `scripts/publish-private-packages.mjs`
- `.memory-bank/spec/engineering/delivery-standards.md`
- `.memory-bank/spec/operations/git-flow.md`
- `.memory-bank/spec/operations/private-registry-package-bridge.md`
- `.memory-bank/spec/operations/deployment-architecture.md`

## Goal

Produce objective framework verification evidence before Docoved/SellerAgent adoption starts.

## Why this task exists

Product adoption should not depend on stale `dist`, unpublished assumptions, or a package that silently imports product/provider code.

## Write scope

- `.tasks/prt-042-channel-runtime-implementation-plan/verification/**`
- `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-03-framework-verification-and-publish-readiness.md`
- `scripts/publish-private-packages.mjs` only if a new publishable package exists and the task explicitly records the allowlist change.

## Do not touch

- Do not alter implementation code to make tests pass.
- Do not edit product repos.
- Do not publish to npm unless explicitly instructed later.

## Required research

- Verify root build graph includes the package/module.
- Verify public exports are importable from source or built artifacts according to repo practice.
- Verify publish allowlist and Changeset implications if a package was created.
- Verify whether remote CI evidence is actually required before pushing.

## Implementation rules

- Build before any dist-based check.
- Treat failed checks as evidence, not as something to hide.
- If a check is not applicable, record `N/A` with reason.

## Thin spots and risks

- `pnpm pack` may run `prepack` and mutate `dist`; record this explicitly.
- Publish allowlist can cause a package to look valid locally but fail release.
- No existing test runner is apparent; do not add a broad test framework unless implementation task already did.

## Verification gates

- `pnpm typecheck`
- `pnpm check`
- import-boundary search/proof
- public export import smoke
- deterministic fixture proof if implemented
- `pnpm changeset:status`
- `pnpm --filter <package> pack` or `pnpm changeset:publish --dry-run` equivalent when publishable package exists.
- GitHub CI evidence only when a pushed branch/PR is required.
- Vercel evidence is `N/A` for framework package-only work unless a hosted surface is affected.

## Definition of done

- Verification report records commands and results.
- Evidence files are saved under `verification/`.
- Any failed/skipped check has rationale and follow-up.
- Product adoption can cite exact framework evidence.

## Lessons learned / insights

- If verification reveals undocumented CI, Vercel, package, Changesets, or publish behavior, write it to `../lessons/NNN-lessons-learned.md`.
- If verification reveals a reusable release-readiness insight, write it to `../lessons/NNN-insights.md`.
- Do not write a diary; record only durable facts and recommendations with proposed Memory Bank destination.
- The report must state whether lessons/insights were created.

## Report format

Write `.tasks/prt-042-channel-runtime-implementation-plan/reports/T-042-03-framework-verification-and-publish-readiness.md` with:
- commands run;
- pass/fail table;
- evidence file paths;
- package publish readiness status;
- risks/blockers for product adoption.
