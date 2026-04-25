---
file: .tasks/prt-042-channel-runtime-implementation-plan/lessons/003-standalone-product-package-consumption-blocker.md
description: Lesson from Docoved adoption about standalone product repos and unpublished framework package consumption.
purpose: Preserve a reusable cross-repo package-consumption rule for future framework adoption packets.
version: 0.1.0
date: 2026-04-25
status: DRAFT
tags: [lesson, prt-042, package-consumption, cross-repo, adoption]
parent: ../index.md
related_files:
  - ../reports/T-042-04-docoved-adoption-packet.md
  - ../../../.memory-bank/spec/operations/private-registry-package-bridge.md
  - ../../../.memory-bank/spec/engineering/delivery-standards.md
history:
  - version: 0.1.0
    date: 2026-04-25
    changes: Captured the Docoved adoption blocker that sibling-path dependencies are unsafe for standalone product repos consuming unpublished framework packages.
---

# Standalone Product Package Consumption Blocker

## Context

T-042-04 evaluated whether `docoved-agent` could safely adopt the new `@dd-bot-platform/channel-runtime` package directly during the first local mapping proof.

## Observed fact

- `docoved-agent` is a standalone product repo rather than a shared pnpm workspace with `bot-platform`.
- The framework package exists only as a local publish-ready workspace package inside the sibling `bot-platform` repo.
- Committing a dependency such as `file:../bot-platform/packages/channel-runtime` or another sibling-path bridge would make the product repo non-portable for ordinary clones and CI.

## Why it matters

A product-local adoption packet may be able to prove mapping semantics without immediate direct package consumption, but it must not hide that the real package-integration step still needs a safe distribution path.

## Future recommendation

- Treat standalone product adoption of a new framework package as blocked until one of these exists:
  - published package availability on the intended registry; or
  - an explicitly sanctioned cross-repo bridge documented as safe for local development and CI.
- Do not commit sibling-path dependencies as a substitute for publish or a supported bridge.

## Proposed MBB destination

- `.memory-bank/spec/operations/private-registry-package-bridge.md`
- `.memory-bank/spec/engineering/delivery-standards.md`
