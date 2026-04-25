---
file: .memory-bank/spec/runtime/channel-runtime-contract.md
description: 'Framework runtime contract for canonical response documents and minimal channel rendering primitives.'
purpose: Define the stable first-wave vocabulary for channel-neutral response documents so product channels can render the same answer semantics without copying Telegram/email-specific helpers into core logic.
version: 0.2.0
date: 2026-04-25
status: DRAFT
tags: [runtime, channel-runtime, contracts, rendering, framework]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md
  - .memory-bank/spec/runtime/command-framework-contract.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/mbb/principles.md
  - .memory-bank/mbb/delivery-docs-guide.md
history:
  - version: 0.2.0
    date: 2026-04-25
    changes: Added deferred-work semantics to clarify why commands, delivery orchestration, threading, HTML, DB, and UI are outside the first-wave contract but remain possible future extensions.
  - version: 0.1.0
    date: 2026-04-25
    changes: Added the normative first-wave channel-runtime contract stub required by PRT-042 review hardening.
---

# Channel Runtime Contract

## Scope

This document owns the stable framework vocabulary for first-wave channel-runtime work.

It defines:
- canonical response-document shape;
- public/operator/debug visibility semantics;
- citations and source references;
- stable response/run/trace reference slots;
- minimal render-target vocabulary;
- pure helper boundaries for markdown/plaintext rendering.

It does not define:
- product answer semantics;
- product knowledge-source selection;
- provider-specific Telegram, email, web, or SMS payloads;
- command dispatch, command registry, or command access policy;
- delivery orchestration, retry queues, threading, or provider send logic;
- DB tables, migrations, persistent delivery records, read models, or UI screens.

These exclusions are first-wave boundaries, not permanent bans.

Future work may add command adoption, delivery orchestration, threading, HTML rendering, persistence, or UI only after a product proof demonstrates repeated provider-neutral behavior. Until then, product adapters keep side effects and provider-specific behavior local.

## Ownership

`bot-platform` owns the shared contract and must keep it product-neutral.

Product repos own:
- mapping from product answer artifacts into `CanonicalResponseDocument`;
- channel adapters that render and deliver provider payloads;
- provider secrets and hosted runbooks;
- product-specific access checks and membership stores;
- product-local observability integrations.

The canonical response document is a runtime delivery contract. It is not shared persistence and is not a replacement for product source-of-truth artifacts.

## Canonical Response Document

The first-wave public model should stay small:
- `CanonicalResponseDocument`
- `CanonicalResponseSection`
- `CanonicalResponseBlock`
- `CanonicalCitation`
- `CanonicalSourceRef`
- `CanonicalResponseMetadata`
- `CanonicalResponseVisibility`
- `CanonicalResponseArtifactRef`

Required semantics:
- public answer content is represented as markdown-compatible text blocks;
- citations/source refs preserve grounding information without product-specific field names;
- operator-only metadata is separable from public content;
- debug-only artifact references are never rendered into public channels by default;
- `responseId`, `runId`, and `traceId` slots are available when upstream runtime has them;
- product-specific data lives under namespaced extensions rather than first-class framework fields.

Forbidden first-wave semantics:
- no Docoved-only field names such as `source_table` as framework primitives;
- no SellerAgent-only commerce/customer/deal fields as framework primitives;
- no provider payload fields such as Telegram `parse_mode`, email headers, or web component names;
- no implied persistence or delivery-status lifecycle.

## Visibility

The visibility vocabulary must support at least:
- `public` — safe for customer-facing channels;
- `operator` — safe for authenticated internal/operator surfaces;
- `debug` — diagnostic metadata and artifact references for trusted troubleshooting only.

Default rendering rule:
- channel renderers/adapters must render `public` content only unless product-local policy explicitly allows a broader visibility level.

First wave should prefer section-level visibility. Block-level visibility is allowed only if a first product proof shows section-level visibility cannot express the required behavior.

## Rendering

The shared runtime layer may expose minimal pure helpers only.

Allowed first-wave render vocabulary:
- `ChannelRenderTarget`
- `ChannelRenderedFormat`
- `renderChannelMarkdownToPlainText`
- `splitRenderedMessageParts` only if immediately required by a consumer proof.

Out of scope:
- universal `ChannelRenderer`;
- `ChannelRenderPolicy`;
- `RenderedChannelMessage`;
- `OutboundDeliveryPlan`;
- `OutboundDeliveryThreading`;
- framework-owned HTML renderer.

Product adapters remain responsible for provider-specific output:
- Telegram escaping and reply parameters;
- email HTML/plaintext body, `Message-ID`, `In-Reply-To`, and `References`;
- web component rendering;
- transport send attempts, retries, and provider errors.

## Markdown Subset

The canonical public text format is markdown-compatible text.

The first-wave subset covers:
- paragraphs;
- headings up to level 3;
- unordered lists;
- ordered lists;
- bold spans;
- inline code;
- fenced code blocks.

This is a compatibility subset, not a full CommonMark implementation.

## Commands

Commands are intentionally excluded from the first-wave channel-runtime contract.

Future command adoption must reuse [Command framework contract](command-framework-contract.md) rather than adding parallel `ChannelCommand*` primitives here.

Command results may later be represented as canonical response documents, but command parsing, dispatch, access policy, and handler ownership stay outside this first-wave spec.

## Reliability And Observability

Pure helpers must be deterministic and side-effect free.

Implementation must choose and document one helper failure style before code lands:
- return typed result envelopes; or
- throw deterministic validation errors only.

Product adapters own:
- transport failures;
- provider retries;
- structured product-local failure events;
- provider-specific observability tools.

Cross-boundary diagnostics may carry:
- `responseId`;
- `runId`;
- `traceId`;
- `channelRef`;
- `commandId` only for future command adoption;
- `attemptId`;
- `deliveryId`;
- `transportMessageRef`.

Generic helpers must not log:
- raw provider payloads;
- provider credentials or secrets;
- full answer bodies by default;
- customer-private or product-private extension payloads.

Retry ownership must be explicit in product adapters. Runtime retries, adapter retries, and provider retries must not stack implicitly for the same failure class.

## Verification

The first implementation must include:
- package/module typecheck or build proof;
- public-export import smoke;
- deterministic fixture for public/operator/debug visibility;
- deterministic fixture for markdown/plaintext helper if the helper exists;
- import-boundary proof showing no product, DB, or provider SDK imports;
- pack/publish dry-run if a new publishable package is created.

Product adoption must add product-local proofs:
- Docoved maps `DocovedAnswerArtifact` to `CanonicalResponseDocument`;
- the same Docoved canonical document renders to email and Telegram without changing answer/source semantics;
- SellerAgent adoption proves no Docoved dependency enters SellerAgent and no SellerAgent dependency enters the framework package.

## MBB Routing

This spec follows:
- [MBB principles](../../mbb/principles.md) for Single Source of Truth and ownership;
- [Delivery docs guide](../../mbb/delivery-docs-guide.md) for spec/protocol separation;
- [Indexing guide](../../mbb/indexing-guide.md) for navigation updates.

Routing rules:
- this file is the stable framework vocabulary owner;
- [PRT-042](../../plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md) owns implementation sequencing and closure criteria;
- product mappings belong in product-local Memory Banks;
- `.tasks/prt-042-channel-runtime-protocol-review/` reports are research evidence, not canonical contract truth.
