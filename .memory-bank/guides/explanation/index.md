---
file: .memory-bank/guides/explanation/index.md
description: 'Explanation hub for bot-platform.'
purpose: Explain the framework ownership model, the post-split three-layer product-line architecture, and the rationale behind package and verification boundaries.
version: 1.0.0
date: 2026-04-23
status: ACTIVE
tags: [guides, explanation, bot-platform]
parent: .memory-bank/guides/index.md
children:
  - product-line-layering-and-split-rationale.md
history:
  - version: 1.0.0
    date: 2026-04-23
    changes: Activated the explanation hub with the first platform rationale guide for the post-split three-layer product-line model.
---

# Explanation

This section explains why the framework is shaped the way it is and how product repos should read those boundaries.

## Current guides

- [Product-line layering and split rationale](product-line-layering-and-split-rationale.md): explains why the post-split target is a three-layer model, why SellerAgent and Docoved are not reduced to configuration, and why `sales-agent` is now archive-only lineage.

## Planned explanation themes

- framework vs product ownership;
- package layering and dependency rules;
- hosted verification classes;
- why shared standards live in `bot-platform`.
