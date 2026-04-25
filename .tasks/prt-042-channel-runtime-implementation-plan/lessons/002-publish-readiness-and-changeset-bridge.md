---
file: .tasks/prt-042-channel-runtime-implementation-plan/lessons/002-publish-readiness-and-changeset-bridge.md
description: Lesson from PRT-042 publish-readiness verification about Changesets and package allowlist coupling.
purpose: Preserve reusable release-readiness guidance for future publishable framework packages.
version: 0.1.0
date: 2026-04-25
status: DRAFT
tags: [lesson, prt-042, changesets, publish-readiness]
parent: ../index.md
related_files:
  - ../reports/T-042-03-framework-verification-and-publish-readiness.md
  - ../../../../.memory-bank/spec/operations/private-registry-package-bridge.md
  - ../../../../.memory-bank/spec/engineering/delivery-standards.md
history:
  - version: 0.1.0
    date: 2026-04-25
    changes: Captured publish-readiness coupling between package allowlist, Changesets, and dry-run publish.
---

# Publish Readiness And Changeset Bridge

## Context

T-042-03 verified publish readiness for the newly added `@dd-bot-platform/channel-runtime` package.

## Observed fact

- A newly added publishable workspace package must be added to `scripts/publish-private-packages.mjs`; otherwise the local release bridge will silently skip it even if the package manifest is public.
- `pnpm changeset:status` enforces release intent for any changed publishable package. For a new package, add a changeset before treating the branch as release-ready.
- `pnpm changeset:publish --dry-run` executes package `prepack`, so it validates the package build path and tarball contents, not just the existing `dist/` tree.

## Why it matters

Publish-ready status depends on manifest, build graph, Changesets, and the repo-local allowlist all agreeing. A package can build locally and still be absent from release flow if the allowlist and Changeset are not updated.

## Future recommendation

- Treat publish allowlist update, Changeset entry, package pack, and dry-run publish as one readiness bundle for new publishable framework packages.
- Keep `.changeset/README.md` aligned with the allowlisted package set.

## Proposed MBB destination

- `.memory-bank/spec/operations/private-registry-package-bridge.md`
- `.memory-bank/spec/engineering/delivery-standards.md`
