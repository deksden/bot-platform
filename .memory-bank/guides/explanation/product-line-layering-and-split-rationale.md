---
file: .memory-bank/guides/explanation/product-line-layering-and-split-rationale.md
description: 'Conceptual explanation of why the split evolves into a three-layer product line, why SellerAgent and Docoved are not just configuration variants, and why sales-agent is now archive-only lineage.'
purpose: Use when new maintainers or agents need the reasoning behind the post-split architecture before starting platform extraction or product adoption work.
version: 0.1.0
date: 2026-04-23
status: ACTIVE
tags: [guides, explanation, product-line, layering, split, bot-platform]
parent: .memory-bank/guides/explanation/index.md
related_files:
  - .memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md
  - .memory-bank/spec/project/three-layer-product-line-architecture.md
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/selleragent-split-rationale-and-platform-adoption.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/guides/explanation/docoved-split-rationale-and-platform-adoption.md
history:
  - version: 0.1.0
    date: 2026-04-23
    changes: Added the conceptual rationale for the post-split three-layer architecture so product and platform agents can start from the same mental model instead of re-deriving it from mixed lineage.
---

# Product-Line Layering And Split Rationale

## What the repo split solved

`PRT-036` solved the repository problem:
- framework truth moved toward `bot-platform`;
- SellerAgent and Docoved gained their own product repos;
- ownership stopped being anchored in one mixed monorepo.

That was necessary, but not sufficient.
The split alone does not answer which common behavior still deserves a shared owner.

## Where the current intuition is right

The current framing is directionally correct:
- Docoved's memory-bank and source model really is a more governed and more complex form of media or content library;
- SellerAgent really does carry more advanced dialogue and operator-control behavior;
- the agent cycle in both products already looks very similar.

This is exactly why a shared middle layer is worth extracting.

## Where that framing needs one correction

The correction is that the products are not reducible to configuration alone.

Configuration explains:
- which channels are connected;
- which sources are attached;
- which defaults or policies are active.

It does not explain the product invariants.

SellerAgent still has product truths that are not just knobs:
- burst semantics;
- draft review and takeover;
- customer memory writes;
- commerce and deal progression;
- business-profile publication.

Docoved also has product truths that are not just knobs:
- grounded answering;
- active snapshot selection;
- semantic navigation;
- duplicate and conflict review;
- temporal interpretation defaults.

So the right model is not “same engine, different config”.
It is “shared substrate plus different policy packs”.

## Why the shared middle layer is real

The shared layer is not a theoretical future.
It is already visible in the current system:
- duplicated runtime files;
- identical pipeline catalogs;
- shared execution-trace and workflow patterns;
- similar channel-bound entry, report, and artifact semantics.

Leaving that layer unnamed would only keep duplication hidden inside product repos.

## Why the shared layer lives in `bot-platform`

The shared layer belongs in `bot-platform` because it must expose reusable contracts to multiple products.

If it lived in one product repo, the other product would again depend on product-owned truth.
That would recreate the same ambiguity the split was meant to remove.

## Why `sales-agent` is now archive-only

At this point `sales-agent` is useful only for lineage:
- where a decision came from;
- how a split was executed;
- what temporary compatibility seams existed.

It should not remain:
- an active owner of new shared features;
- a place where new product behavior is designed;
- a hidden bridge that keeps delaying cleanup.

The right role is an archive of historical protocols and evidence.

## Why bot-mediated import should be workflow-backed

The planned move toward “give the bot a file or folder and let it import into the product knowledge base” is a strong direction.

But it should be implemented as:
- a workflow-backed import run;
- with processing artifacts;
- with a report and review surface;
- with explicit activation semantics.

It should not become:
- heavy free-form admin editing in chat;
- a bypass around source governance and review.

## Why source processing starts as a contract, not as a separate product

A separate source-processing product would be premature.
The immediate need is smaller and cleaner:
- define one contract that turns raw files or folders into a canonical extraction bundle.

Once that contract has more than one serious consumer, it can later be extracted into a separate service if operations really justify it.

## Practical reading rule

For future work:
1. read `ADR-005` for the stable decision;
2. read `spec/project/three-layer-product-line-architecture.md` for the normative placement rules;
3. use `PRT-038` as the active execution contract;
4. then enter the SellerAgent or Docoved adoption docs before opening product-level protocols.
