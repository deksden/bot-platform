---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/012-insights.md
description: 'Reusable verifier insight from T040-V1 governed-content runnable-local proof.'
purpose: 'Prevent stale dist-based verifier runs when package builds and `node --test` are executed around the same shared-contract slice.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
tags: [insight, verification, node-test, dist, build-order]
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
---

# Insight 012

## Reusable truth

When a verifier relies on compiled `dist` specs, the package build must finish before `node --test` starts.

If the dist-based test command races the build, Node can execute stale compiled artifacts and report failures that no longer match the current source tree.

## Why it matters

This wave proves shared governed-content contracts through compiled package output rather than a source-time harness.
Sequencing the build ahead of the dist test is therefore part of verifier correctness, not just a convenience.

## Proposed owning SSoT

- `spec`: `.memory-bank/spec/engineering/delivery-standards.md`
- `protocol`: `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
