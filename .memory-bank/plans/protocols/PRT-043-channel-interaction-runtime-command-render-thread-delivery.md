---
file: .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md
description: Framework protocol for channel interaction runtime: actor-aware command runtime, canonical response rendering, threading intent, and outbound delivery intent across Docoved and SellerAgent.
purpose: Define the next shared platform contract after PRT-042 so commands, canonical responses, reply/thread behavior, and outbound delivery semantics are configured consistently across Telegram, email, web, and future channels without moving product logic into bot-platform.
version: 1.0.0
date: 2026-04-26
status: CLOSED
epic: EP-022
tags: [protocol, channel-runtime, command-runtime, rendering, threading, delivery, docoved, selleragent]
parent: .memory-bank/plans/protocols/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md
  - .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md
  - .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-review-details.md
  - .memory-bank/spec/runtime/channel-runtime-contract.md
  - .memory-bank/spec/runtime/command-framework-contract.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/operations/observability-and-incident-diagnostics.md
  - .memory-bank/spec/operations/git-flow.md
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/mbb/principles.md
  - .memory-bank/mbb/delivery-docs-guide.md
  - .memory-bank/mbb/indexing-guide.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-channel-adapter-contract.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-channel-runtime-adoption.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-007-telegram-privileged-command-surface-bot-level-release-control-and-runtime-diagnostics.md
history:
  - version: 1.0.0
    date: 2026-04-26
    changes: Closed PRT-043 after platform package publication, Docoved adoption, SellerAgent adoption, CI/Vercel verification, and cross-repo clean-state proof.
  - version: 0.5.0
    date: 2026-04-26
    changes: Recorded platform implementation progress for T-043-02/T-043-03: core command-framework contracts and channel-runtime threading/delivery summary contracts landed with subagent reports, verification, and local checks.
  - version: 0.4.0
    date: 2026-04-26
    changes: Completed phase-2 implementation planning by linking the subagent execution companion, task workspace, task-packet discipline, dependency graph, verification-by-subagent rules, and local/hosted test lanes.
  - version: 0.3.0
    date: 2026-04-26
    changes: Completed phase-1 protocol review with subagent reports, added entity ownership matrix, boundary-step contracts, pre-code gates, MBB routing, lean scope guards, release/rollback gates, no-storage statement, and stronger product/scenario verification.
  - version: 0.2.0
    date: 2026-04-26
    changes: Completed phase-0 protocol hardening by adding policy precedence, actor/capability boundaries, command input normalization, safe failure rendering, config SSoT, migration compatibility, idempotency, anti-abuse, observability events, task graph, and deeper verification requirements.
  - version: 0.1.0
    date: 2026-04-26
    changes: Opened the follow-up protocol for actor-aware commands, canonical channel rendering, configurable threading intent, outbound delivery intent, logging-first diagnostics, and Docoved/SellerAgent adoption.
---

# Protocol: Channel Interaction Runtime

## Why this protocol exists

`PRT-042` proved the first shared channel-runtime seam:
- products can map answer artifacts into a `CanonicalResponseDocument`;
- public/operator/debug visibility can be represented without product field leakage;
- minimal pure rendering helpers can live in `@dd-bot-platform/channel-runtime`;
- Docoved can consume the published package without depending on SellerAgent.

The next drift risk is higher-level interaction behavior:
- commands are still shaped by Telegram-era code paths in product repos;
- email needs command parity without becoming a special channel exception;
- channels need a common way to receive canonical answers and render them for transport;
- reply/thread behavior should be configurable per concrete channel instance;
- outbound delivery outcomes need consistent correlation without introducing premature shared DB tables.

This protocol opens that follow-up work.

## Protocol elaboration state

стадия проработки протокола: фаза 0 выполнена

стадия проработки протокола: фаза 1 выполнена

стадия проработки протокола: фаза 2 выполнена

стадия реализации протокола: платформа T-043-02/T-043-03 выполнена

стадия реализации протокола: product adoption/release closeout выполнены

Phase 0 reviewed platform contracts/product lineage; phase 1 reviewed the protocol through focused subagent reports in `.tasks/prt-043-protocol-review-phase-1/`; phase 2 defined subagent-based implementation planning in [PRT-043 implementation plan](PRT-043-channel-interaction-runtime-implementation-plan.md).
The first platform implementation slice was executed through `.tasks/prt-043-channel-interaction-runtime/`:
- `T-043-02` landed command-framework typed contracts in `@dd-bot-platform/core`;
- `T-043-03` landed provider-neutral threading and delivery result-summary contracts in `@dd-bot-platform/channel-runtime`;
- orchestrator hardened command availability to default deny when command policy is missing;
- both tasks have implementation reports, verifier reports, and local typecheck/test evidence in the task workspace.

Final closure evidence is recorded in `.tasks/prt-043-channel-interaction-runtime/007-final-closeout.md`.
Closure includes:
- platform PR `deksden/bot-platform#2`, merge commit `7b0b82f`, publish workflow run `24952161247`, and npm packages `@dd-bot-platform/core@0.3.0` plus `@dd-bot-platform/channel-runtime@0.3.0`;
- Docoved PR `deksden/docoved-agent#14`, merge commit `8681c3b`, package-surface proof, channel-runtime adoption proof, and typecheck;
- SellerAgent PR `deksden/seller-agent#4`, merge commit `3ee2931`, core/server typecheck/build, and Vercel preview checks;
- documented exclusion of framework DB/read-model tables, framework UI/admin, provider SDK sender extraction, and broad mutation-command expansion from this protocol.

## Core decision

`bot-platform` owns shared interaction mechanics.

Product repos own product behavior.

Therefore:
- command parsing, dispatch envelope, registry primitives, failure classes, and diagnostics must reuse the existing [Command framework contract](../../spec/runtime/command-framework-contract.md);
- channel-runtime may add interaction-facing contracts only where they connect command results, canonical response documents, render intents, threading intents, and delivery intents;
- Docoved owns Docoved commands, grounded-answer semantics, knowledge-source binding, and provider credentials;
- SellerAgent owns SellerAgent commands, commerce/conversation semantics, release-control behavior, and provider credentials;
- Telegram, email, web, and future channel adapters render and deliver provider payloads from the same canonical result instead of deciding answer semantics.

No new framework-owned UI or DB tables are part of this protocol.
The platform slice also intentionally does not ship product command catalogs, provider senders, or hosted deploys; product adoption happened in Docoved and SellerAgent repos through package consumption and product-local wiring.

Phase 0 and phase 1 review found that the direction is sound, but implementation must be guarded by explicit ownership, policy precedence, safe failure rendering, config compatibility, idempotency, observability, and product adoption gates.
The accepted phase-1 findings are summarized in `.tasks/prt-043-protocol-review-phase-1/001-orchestrator-consolidated-review.md`.
This protocol still intentionally excludes framework DB tables, framework UI/admin, provider SDK senders, full universal HTML rendering, and product command catalogs in `bot-platform`.

## Target architecture

The intended flow is:

1. A channel adapter receives an inbound event.
2. The adapter resolves actor context, channel instance config, and transport refs.
3. The command parser may normalize a command into a framework `CommandEnvelope`.
4. The command dispatcher checks command availability for the actor, product, channel kind, and channel instance.
5. The product-owned handler executes business logic.
6. The handler returns a `CanonicalResponseDocument` or a typed command failure.
7. The channel adapter renders the canonical document for the transport.
8. The adapter applies `ThreadingIntent` and `OutboundDeliveryIntent`.
9. The adapter logs structured delivery outcome and preserves correlation identifiers.

The framework contract must make this flow typed and repeatable.
The product repos decide which handlers exist and what side effects they perform.

Detailed boundary-step contracts are kept in [PRT-043 review details](PRT-043-channel-interaction-runtime-review-details.md) so this protocol stays lean and below the MBB decomposition threshold.

## Interaction contract boundaries

The platform should expose contracts, not own every step implementation.

Entity ownership summary:
- command invocation, actor context, availability policy, availability decision, execution result, parser, registry, dispatch, and command failures belong to `command-framework`;
- canonical response document, visibility, citations/source refs, and existing pure rendering helpers belong to `channel-runtime`;
- threading and outbound delivery intent/result are candidate channel-runtime extensions only after the pre-code boundary gate proves they remain provider-neutral summary contracts;
- product repos own actor lookup, role/capability derivation, command catalog, handlers, persistence lookup for transport refs, provider retry behavior, and product-specific traces;
- adapters own provider syntax extraction, reply/header mapping, final provider payloads, and final send.

The detailed ownership matrix is in [PRT-043 review details](PRT-043-channel-interaction-runtime-review-details.md).

Product-owned implementations:
- actor lookup;
- role/capability derivation;
- command catalog and handlers;
- persistence lookup for transport refs;
- provider send/retry behavior;
- product-specific audit or trace artifacts.

Current code anchors:
- command framework: `packages/core/src/command-framework`;
- channel threading: `packages/channel-runtime/src/threading.ts`;
- channel delivery summary: `packages/channel-runtime/src/delivery.ts`.

Adapter-owned implementations:
- inbound event parsing;
- provider command syntax extraction;
- provider-specific reply/thread mapping;
- rendering to provider payloads;
- final transport send.

## Actor-aware command model

Commands must be configurable for different actor classes.

Minimum actor classes:
- `system_admin`;
- `workspace_admin`;
- `workspace_member`;
- `verified_employee`;
- `external_known_user`;
- `external_unknown_user`;
- `anonymous`;
- product-defined extensions through a namespaced extension field.

The exact role and membership resolution remains product-owned.
The framework owns only the command-availability contract and the stable actor-class vocabulary needed for cross-channel decisions.

Actor classes are coarse categories, not a replacement for product capabilities.

Resolution rule:
- product auth/membership code resolves the concrete actor;
- product policy maps that actor into one framework actor class plus optional product capability tags;
- the command runtime evaluates actor class and product capability tags through one typed policy decision;
- a product may deny a command even if the actor class is broadly allowed.

The actor class must be logged as bounded metadata.
Raw emails, Telegram usernames, message bodies, auth tokens, or provider payloads must not be logged by the framework helper.

Command availability must support:
- allow/deny by actor class;
- allow/deny by channel kind such as Telegram, email, web, CLI, or API;
- allow/deny by concrete channel instance, for example a specific Telegram bot or email address;
- product-level defaults;
- channel-instance overrides;
- explicit denial overriding broad allow rules;
- server-side enforcement independent of menu/help visibility.

Policy precedence:
1. hard framework safety denial, for example malformed command envelope or unsupported channel capability;
2. product command-specific explicit denial;
3. concrete channel-instance explicit denial;
4. concrete channel-instance explicit allow;
5. channel-kind policy;
6. product default policy;
7. framework default deny.

Rules:
- deny beats allow at the same specificity level;
- unknown actor class defaults to deny;
- missing channel instance config defaults to product default only if product config explicitly allows fallback;
- every fallback must emit a structured `compat_fallback_used` or policy-resolution diagnostic event.

Examples:
- a system admin can receive `/diagnostics` in Telegram and email;
- a workspace admin can use release or binding commands where the product allows them;
- a normal employee can use read-only commands;
- an external unknown user can be denied all commands or allowed only public-safe commands;
- a command can be visible in Telegram but disabled for email, or vice versa, if product config says so.

Command menu projection is not authority.
Menus/help are derived projections of the same server-side policy.

## Command input normalization

The platform must not canonize Telegram slash syntax as the only command grammar.

Command parsing should produce the same `CommandEnvelope` from channel-specific inputs:
- Telegram slash command, bot mention, or direct-bot text;
- email subject command, first-line command, or structured inbound marker when product enables it;
- web/API structured command request;
- CLI command invocation.

Channel adapters may own the first extraction step.
The command framework owns normalized parse results and parse failures.

Required parse outcomes:
- `not_a_command` — continue ordinary message flow;
- `parse_error` — command-like input could not be parsed;
- `unknown_command` — parsed command key is not registered for this product/runtime;
- `valid_command` — dispatch may proceed to policy evaluation.

Email command parsing must be conservative:
- ordinary user questions must not accidentally become commands;
- command recognition must be product-configurable per inbound address;
- parsing must not require special casing after dispatch.

Telegram command parsing must preserve existing provider behavior:
- bot mentions and direct-chat command formats remain adapter-owned;
- Telegram menu projection is derived from server-side policy, not the other way around.

## Command ownership boundaries

`bot-platform` owns:
- command envelope and invocation source vocabulary;
- parser/dispatcher/registry contracts;
- command availability policy shape;
- actor-class vocabulary and extension point;
- typed command failure classes;
- generic command diagnostics and correlation fields.

Product repos own:
- command names;
- handler implementations;
- argument semantics;
- permission mapping from memberships/roles into actor classes and capabilities;
- end-user help copy;
- provider menu synchronization such as Telegram command menus.

Channel adapters own:
- transport tokenization quirks;
- provider-specific reply syntax;
- provider-specific menu apply/readback calls;
- transport payload size limits and send mechanics.

Forbidden:
- adding `TelegramCommand*` as the shared platform abstraction;
- making email command behavior a separate product-only workaround when the behavior is actually channel-neutral;
- relying on hidden UI/menu visibility instead of server-side command authorization.

## Command result and failure model

Command execution must return a typed result, not throw opaque channel strings across boundaries.

Minimum result kinds:
- `success` with `CanonicalResponseDocument`;
- `not_a_command` when ordinary answer flow should continue;
- `parse_error`;
- `unknown_command`;
- `validation_error`;
- `access_denied`;
- `dispatch_error`;
- `unsupported_channel`;
- `rate_limited`.

User-facing failures should be renderable as `CanonicalResponseDocument` with public-safe wording.

Rules:
- access denial must not reveal hidden command existence to external/unknown users unless product policy explicitly allows it;
- validation errors may include bounded field-level details only when safe for the actor class;
- dispatch errors should log incident-grade diagnostics but return safe user text;
- operator/debug details must stay in operator/debug visibility sections or trace artifacts;
- command results should carry `commandId`, `responseId`, `runId`, `traceId`, `channelRef`, and `transportMessageRef` where available.

## Canonical response and universal rendering

Universal rendering means the product/core emits one canonical response document, and each channel renders it for its transport.

It does not mean that the framework owns one universal provider renderer.

Target rule:
- command handlers and answer pipelines return `CanonicalResponseDocument`;
- public text remains markdown-compatible canonical content;
- citations/source refs remain channel-neutral;
- operator/debug content remains visibility-gated;
- channel adapters convert the document to provider payloads.

Channel rendering examples:
- Telegram renders compact markdown/plain text, applies escaping, splits long messages, and can attach reply parameters;
- email renders HTML and plaintext alternatives, sets subject/thread headers, and can include compact citations;
- web renders a view model or components;
- CLI renders plaintext or markdown.

The framework may provide pure helpers when they remove real duplication.
It must not absorb provider-specific HTML policies, Telegram parse modes, or product-specific source semantics unless two real consumers prove the shared shape.

Rendering side-effect rules:
- rendering must not change answer/source semantics;
- rendering must filter visibility before provider payload creation;
- rendering must degrade explicitly when a provider cannot represent a markdown construct;
- long-message splitting must preserve citation/readback coherence where possible;
- render failures must be typed and logged with correlation ids, not silently downgraded to partial content.

The framework may define render intents and result envelopes.
Adapters own final provider payloads.

## Threading intent

Threading is a channel-instance behavior setting.

The framework should expose a provider-neutral `ThreadingIntent` vocabulary:
- `reply_to_origin` — answer as a reply to the inbound client message;
- `continue_thread` — continue the current conversation/thread without necessarily replying to one message;
- `new_message` — send as a new outbound message;
- `none` — no threading behavior requested.

Concrete adapters map the intent:
- email maps `reply_to_origin` to `Re:`, `Message-ID`, `In-Reply-To`, and `References`;
- Telegram maps `reply_to_origin` to provider reply parameters;
- web maps it to conversation/thread identifiers;
- CLI/API may ignore or expose the intent in structured output.

Configuration must be per concrete channel instance.
Examples:
- Docoved beta email `ask@beta-mail.docoved.pro` replies to the inbound email by default;
- a specific Telegram bot can reply to the source message by default;
- another channel instance can disable reply-to-origin and send standalone messages.

The framework owns the intent vocabulary.
Product adapters own the transport mapping and persistence lookup needed to find provider message references.

Threading fallback rules:
- if `reply_to_origin` is requested but no valid provider target exists, the adapter must choose either configured fallback to `continue_thread`/`new_message` or a typed failure;
- fallback must be logged with reason code;
- missing/stale/deleted provider references must not block the core answer unless product config marks reply-to-origin as required;
- incoming reply metadata should be normalized into canonical conversation/message refs before answer generation when the product has conversation persistence.

Threading config should be part of channel-instance configuration, not a global product constant.

Minimum config shape:
- default outbound threading mode;
- whether fallback is allowed;
- whether reply-to-origin is required for this channel instance;
- provider-specific options under namespaced adapter config, not framework fields.

## Outbound delivery intent and outcome

Outbound delivery is useful, but this protocol should start lean.

First shared layer:
- `OutboundDeliveryIntent` describes what should be delivered;
- `OutboundDeliveryResult` describes what happened;
- `deliveryId`, `attemptId`, `responseId`, `runId`, `traceId`, `channelRef`, and `transportMessageRef` preserve correlation.

The first implementation should not introduce framework-owned queues, schedulers, retry stores, or provider senders.

Product adapters continue to own:
- provider SDK calls;
- retry mechanics;
- idempotency keys;
- provider-specific failures;
- delivery persistence if the product already has it.

Idempotency rules:
- every delivery intent should carry a stable idempotency key or enough correlation fields for the adapter to derive one;
- retries must not duplicate customer-visible sends unless the provider contract makes that unavoidable and the outcome is logged;
- command results and ordinary answers should share delivery correlation semantics;
- delivery retry ownership must be one layer deep for a given failure class to avoid runtime retry plus adapter retry plus provider retry amplification.

The shared contract should distinguish at least:
- `delivered`;
- `suppressed`;
- `failed`;
- `partial_failure`;
- `skipped`;
- `simulated`.

SellerAgent's existing delivery outcome vocabulary is useful migration input, not automatic platform truth.
Extraction is allowed only for provider-neutral concepts used by both Docoved and SellerAgent.

The first shared result should be summary-level.
Per-step delivery plans remain product-local unless both products prove the same multi-step provider-neutral structure.

Storage boundary:
- transport-ref lookup, idempotency state, provider delivery records, and effective-config snapshots are product-local persistence concerns;
- this protocol does not introduce framework storage artifacts for those concerns;
- if a product captures a config snapshot during dispatch, it must document the snapshot owner in the product Memory Bank rather than implying a shared platform store.

## Configuration source of truth and compatibility

Channel interaction behavior must have one effective configuration path.

Required effective config inputs:
- product instance;
- workspace or tenant where applicable;
- channel kind;
- concrete channel ref;
- channel transport config summary;
- pipeline binding;
- command policy;
- threading policy;
- delivery policy;
- product capability mapping.

Compatibility rules:
- existing Docoved/SellerAgent `commandAccessPolicy` fields may be read as legacy inputs during migration;
- `commandAccessPolicy` is migration input only unless a product Memory Bank explicitly declares it the canonical writable authority for that product;
- legacy fields must be mapped to the new effective policy through an explicit compatibility adapter;
- compatibility fallback must be logged;
- no second editable command-policy authority may be introduced without migration plan;
- after adoption, docs must state which field/config object is canonical.

Config failure rules:
- invalid command policy disables command dispatch for the affected channel instance;
- invalid threading policy falls back only if configured fallback is allowed;
- invalid delivery policy suppresses send only when safe; otherwise it fails loudly with typed diagnostics.
- effective config readback should include enough version/snapshot information for investigation, but that snapshot remains product-local unless a later storage protocol says otherwise.

## Logging-first diagnostics

This protocol does not create DB/read-model tables.

Default diagnostics path:
- structured logs;
- runtime trace refs;
- response/delivery correlation ids;
- product-local artifacts where the product already has governed trace storage.

Framework-owned tables or read models require a later protocol and a proven use case:
- replaying delivery;
- operator audit with queryable history;
- long-term delivery lifecycle inspection;
- legal/compliance-grade audit;
- shared UI that cannot operate from logs/traces/product-local state.

Until then:
- logs are for triage and correlation;
- traces/artifacts are for explainability;
- product persistence remains product-owned.

Required structured events, diagnostic fields, and redaction checklist are maintained in [PRT-043 review details](PRT-043-channel-interaction-runtime-review-details.md).

Incident-monitoring rule:
- product adapters may capture unexpected exceptions or exhausted retries in product-local tools such as Sentry;
- framework helpers must not depend on a specific incident-monitoring provider;
- incident events must carry safe correlation ids so logs, traces, and product-local monitors can be joined during investigation.

## Anti-abuse and external-user controls

Command support for external or unknown users creates an abuse surface.

Required hooks:
- product-local rate limit decision before dispatch;
- command policy support for denying external unknown and anonymous actors by default;
- bounded error messages that do not reveal private command catalogs;
- structured event when a rate limit or abuse guard blocks execution;
- no provider menu/help projection for unknown users unless product explicitly enables public commands.

Anti-abuse implementation stays product-owned.
The framework owns hook shape and result vocabulary only if both products need the same contract.

## UI/Admin stance

No framework UI/admin surface is part of this protocol.

The contracts should not block a future UI, but the protocol must not add:
- shared admin screens;
- POM objects;
- framework read-model tables;
- channel command management UI;
- delivery inspection UI.

If a real operator workflow later requires shared UI, it must open a separate UI protocol with scenario anchors and MBB UI documentation.

Current scope adds no UI docs, POM objects, screen contracts, or stable `data-testid` requirements.
If UI is later introduced, the owning repo must create a separate UI protocol with screen contracts, POM mapping, stable selectors/test ids, scenario anchors, and explicit accessibility/UX acceptance.

## Storage and migration stance

This protocol introduces no DB schema migrations, backup steps, restore procedures, framework queues, framework delivery tables, or shared read models.

If storage/read-model work later enters scope, it requires a separate storage protocol that:
- cites the persistence interface and store-boundary spec;
- names schema, migration, index, transaction, idempotency, backup, and rollback responsibilities;
- explains beta/prod rollout safety;
- defines read-model ownership and retention;
- updates product and platform Memory Banks before implementation.

## Product adoption: Docoved

Docoved adoption should prove:
- Telegram and email command execution use the same command runtime contract;
- command availability respects actor class, channel kind, channel instance config, and product policy;
- command results return canonical response documents;
- email channel can process commands without special command-only plumbing;
- beta email `ask@beta-mail.docoved.pro` answers as `Re:` when configured to reply to origin;
- Telegram replies can be configured to reply to the inbound message;
- hosted beta verification covers both normal answers and command answers.

Docoved migration details to resolve:
- decide the minimum command set for parity, likely diagnostics/source/help-style commands before mutation commands;
- map existing Telegram `commandAccessPolicy` into effective command availability;
- define how email command input is recognized without intercepting ordinary legal/document questions;
- preserve knowledge-source binding and conversation context before command dispatch;
- ensure command denial for unauthorized email senders and Telegram users is public-safe;
- prove ordinary email questions are classified as `not_a_command` and continue normal answer flow;
- prove repeated webhook/email delivery is idempotent or visibly suppressed;
- prove policy fallback emits diagnostics;
- treat Telegram command menu projection as derived from server policy and verify menu drift does not grant authority;
- record beta proofs for both authorized and unauthorized actors.

Docoved must keep local:
- grounded-answer semantics;
- knowledge-source binding;
- Docoved command catalog and handlers;
- email and Telegram provider credentials;
- hosted beta runbooks and proofs.

Docoved Memory Bank must route readers to this protocol for platform interaction contracts and to Docoved specs for product behavior.

## Product adoption: SellerAgent

SellerAgent adoption should prove:
- existing Telegram privileged command behavior can map to the shared command runtime contract;
- actor-class policy covers system admin, workspace admin, employee/member, external known user, and external unknown user cases;
- command results can be represented as canonical response documents where the result is user-facing text;
- existing SellerAgent delivery outcome concepts are either product-local or cleanly mapped to shared delivery result vocabulary;
- beta SellerAgent verification still proves privileged command gating and does not regress release-control or diagnostics commands.

SellerAgent migration details to resolve:
- inventory command families from the Telegram privileged command protocol;
- classify commands as read-only diagnostics, release-control mutation, product workflow mutation, or debug-only;
- adopt read-only diagnostics/readback commands as the minimum first proof slice before touching mutation or release-control commands;
- map existing actor/access resolver output into framework actor classes plus product capabilities;
- preserve server-authoritative checks for release-control commands;
- verify command naming consistency between code and planning prose before publishing product docs;
- keep existing UI/admin surfaces as product-owned surfaces, not platform UI.

SellerAgent must keep local:
- command catalog and business semantics;
- release-control command handlers;
- commerce/customer/conversation logic;
- existing product UI/admin behavior;
- product-specific delivery persistence and workflows.

SellerAgent Memory Bank must document the adoption and explain which former Telegram-shaped concepts now map to platform contracts.

## Package strategy

Preferred first implementation:
- evolve `@dd-bot-platform/channel-runtime` for interaction-adjacent response, render, threading, and delivery intent contracts;
- implement command-framework code/types in the existing framework command area or a clearly named package only if current package boundaries require it;
- avoid a new package unless import boundaries prove that `channel-runtime` and command-framework contracts must remain separately versioned.

Hard rule:
- do not duplicate command contracts inside channel-runtime if they already belong to the command framework.

Acceptable shape:
- command framework owns `CommandEnvelope`, `CommandRegistry`, `CommandDispatcher`, command availability, and command failures;
- channel-runtime owns `CanonicalResponseDocument`, render target vocabulary, and response metadata;
- channel-runtime may own threading intent and delivery intent/result only after the Phase 1 boundary gate confirms they are provider-neutral summary contracts and do not include threading state, provider senders, retries, or delivery orchestration;
- channel-runtime may reference command identifiers and command result documents, but not own command dispatch.

Semver and release rules:
- adding public exported types requires package version bump and changelog/history note;
- changing existing exported type semantics requires explicit migration note in product adoption docs;
- product repos must pin the released package version, not a sibling-path bridge, unless a documented bridge is approved for local proof only;
- no package release should happen before import-boundary and typecheck proof pass.

Open package-boundary decision after phase 0:
- if command runtime is still documentation-only in code, materialize it in the command-framework-owned package/module rather than hiding it inside channel-runtime;
- if no command-framework package exists yet, choose between `@dd-bot-platform/core` command exports and a new small package based on dependency direction, not naming taste.

Pre-code gates:
- choose the command-framework implementation/export location;
- decide whether threading/delivery intent types belong in channel-runtime now or stay product-local until a second proof;
- define the exact Docoved first parity command set;
- define the SellerAgent first read-only/diagnostic adoption subset;
- classify which delivery result fields are shared versus SellerAgent-only;
- define the minimum channel-instance threading config shape.

Code must not start until these gates are resolved in this protocol or in task packets linked from this protocol.

## Implementation phases

Detailed implementation execution rules, subagent task packet format, required context-readiness pass, dependency graph, verification-by-subagent workflow, and local/hosted test lanes are defined in [PRT-043 implementation plan](PRT-043-channel-interaction-runtime-implementation-plan.md).

### Completed planning phases

- Phase 0: discovery/protocol hardening completed on 2026-04-26.
- Phase 1: subagent review completed on 2026-04-26; reports live in `.tasks/prt-043-protocol-review-phase-1/`.
- Phase 2: implementation/subagent planning completed on 2026-04-26; task workspace lives in `.tasks/prt-043-channel-interaction-runtime/`.

## Task graph for implementation planning

The implementation task graph is maintained in [PRT-043 implementation plan](PRT-043-channel-interaction-runtime-implementation-plan.md), with phase-1 review detail in [PRT-043 review details](PRT-043-channel-interaction-runtime-review-details.md).

Implementation must begin with the package-boundary decision and must not start DB/read-model, UI/admin, provider-sender extraction, or mutation-command expansion tasks in the first proof slice.

### Phase 1: platform contracts

Tasks:
- add or materialize typed command runtime contracts where the existing command framework is currently documentation-only;
- add actor-aware command availability policy types;
- add command input normalization and result/failure types;
- add threading intent types;
- add threading resolution/fallback result types;
- add outbound delivery intent/result types;
- extend canonical response metadata only where necessary for correlation;
- add deterministic tests for actor/channel allow-deny behavior and render/thread/delivery intent shapes.

Exit criteria:
- platform package typecheck/build passes;
- no product imports enter platform packages;
- tests cover system admin, workspace admin, employee/member, external known user, external unknown user, and denied anonymous scenarios;
- tests cover policy precedence and deny-over-allow behavior;
- tests cover safe command failure result shapes;
- tests cover idempotency/correlation fields on delivery intent/result;
- docs cite the owning specs and this protocol.

### Phase 2: Docoved adoption

Tasks:
- map existing Docoved command support to shared command runtime contracts;
- remove Telegram-only command assumptions from paths that should be channel-neutral;
- make email command handling use the same command dispatcher path;
- implement channel-instance threading behavior for email and Telegram;
- render command responses from canonical documents;
- update Docoved Memory Bank and hosted beta scenarios.

Exit criteria:
- Docoved local checks pass;
- beta Telegram command/runtime proof passes;
- beta email command/runtime proof passes;
- beta email reply proof confirms `Re:` behavior for `ask@beta-mail.docoved.pro`;
- no Docoved product logic moved into `bot-platform`.

### Phase 3: SellerAgent adoption

Tasks:
- map SellerAgent command catalogs to shared command runtime contracts;
- preserve existing privileged command gates while replacing Telegram-shaped shared assumptions;
- map user-facing command results to canonical response documents where applicable;
- align delivery result vocabulary without replacing SellerAgent product workflows;
- update SellerAgent Memory Bank and beta verification.

Exit criteria:
- SellerAgent local checks pass;
- beta privileged command scenarios pass;
- beta delivery/diagnostics behavior does not regress;
- SellerAgent command handlers remain product-owned.

### Phase 4: closure

Tasks:
- promote useful lessons/insights into the correct Memory Bank sections;
- close product adoption notes;
- record package versions and deployment evidence;
- leave no uncommitted/unpushed local tails.

Exit criteria:
- `bot-platform`, `docoved-agent`, and `seller-agent` Memory Banks point to the correct SSoT;
- CI/package checks are green where releases were pushed;
- beta evidence is linked from product repos;
- this protocol is marked `CLOSED` only after both product adoption waves are complete or explicitly split into follow-up protocols.

Closure result:
- platform release completed through `@dd-bot-platform/core@0.3.0` and `@dd-bot-platform/channel-runtime@0.3.0`;
- Docoved adoption completed through PR `deksden/docoved-agent#14`;
- SellerAgent adoption completed through PR `deksden/seller-agent#4`;
- no deferred DB/UI/provider-sender scope was pulled into this protocol.

## Verification matrix

Verification is split into framework local/package, Docoved local, Docoved hosted beta, SellerAgent local, and SellerAgent hosted beta lanes.

Minimum acceptance:
- framework checks cover policy precedence, parse/result/failure envelopes, import boundaries, and package build/typecheck/prepack where applicable;
- Docoved checks cover Telegram/email command parity, ordinary-email-not-command behavior, unauthorized sender/user denial, reply threading, duplicate delivery/idempotency, and beta `ask@beta-mail.docoved.pro` reply behavior;
- SellerAgent checks preserve privileged command gates, menu projection as derived state, release-control safety, and `SCN-053`-anchored Telegram actor verification where applicable;
- hosted checks run only when live lane proof is needed and must include stable alias/readback verification.

The detailed verification lane checklist and verifier-agent workflow are in [PRT-043 implementation plan](PRT-043-channel-interaction-runtime-implementation-plan.md) and [PRT-043 review details](PRT-043-channel-interaction-runtime-review-details.md).

## Operations and git-flow

Implementation must follow repository-local git-flow and deployment rules.

Before coding:
- inspect current branch and uncommitted changes in each repo;
- do not mix unrelated tails into protocol commits;
- create work branches/worktrees only if the repo runbook requires it.

During implementation:
- commit documentation, platform contracts, Docoved adoption, and SellerAgent adoption as separate meaningful commits;
- push only when a commit is ready for CI/review/deploy;
- do not trigger hosted builds just to “see what happens”;
- deploy beta only when hosted beta scenarios are ready to run.

Before closure:
- verify GitHub/CI checks where pushes were made;
- verify Vercel/hosting checks where deployments were made;
- verify stable hosted aliases/readbacks before accepting hosted beta/prod evidence;
- record beta evidence in product Memory Banks;
- ensure no uncommitted or unpushed tails remain.

## Release, deploy, and rollback sequence

When package or hosted adoption is part of a PRT-043 wave, use this order:
1. local framework/package checks;
2. package-boundary decision and version bump when public exports change;
3. package `prepack` or pack dry-run;
4. commit, push, and wait for CI/package readiness;
5. publish/release platform package only after readiness is green;
6. update products by pinned released version, then run product-local checks;
7. deploy beta only when hosted scenarios are ready;
8. verify hosted status, stable alias/readback, and live proof artifacts;
9. promote to main/prod only after product Memory Bank evidence is updated.

Rollback rule:
- consumer rollback starts by reverting the pinned package version or hosted alias/config assignment;
- do not rollback by copying source code between repos;
- if a hosted provider send/config change caused customer-visible effects, record the rollback lesson in the owning product runbook and Memory Bank.

## Lessons learned and insights

During implementation, record durable lessons and insights when:
- documentation is missing, misleading, or contradicted by code;
- product behavior reveals a platform contract gap;
- a provider constraint affects the generic model;
- a test catches a scenario not documented in MBB;
- debugging requires non-obvious knowledge worth preserving.
- release, deployment, package publish, rollback, or hosted-alias behavior reveals a runbook gap.

Use `.tasks/prt-043-channel-interaction-runtime/` for temporary task artifacts.

File naming:
- `NNN-lessons-learned.md`;
- `NNN-insights.md`;
- task reports named by task id.

End-of-stage rule:
- promote accepted lessons into the owning Memory Bank section;
- release/deploy/rollback lessons must be promoted into the owning runbook or operations spec;
- do not leave important knowledge only in `.tasks/`.

## Memory Bank documentation rules

This protocol follows the MBB Single Source of Truth model.

Routing:
- stable command envelope, parser, registry, dispatch, availability, and failure contracts belong in `spec/runtime/command-framework-contract.md`;
- stable canonical response, visibility, rendering vocabulary, and any accepted thread/delivery intent vocabulary belong in `spec/runtime/channel-runtime-contract.md`;
- sequencing, task graph, review evidence, and closure criteria belong in this protocol;
- Docoved adoption details belong in Docoved Memory Bank;
- SellerAgent adoption details belong in SellerAgent Memory Bank;
- `.tasks/prt-043-protocol-review-phase-1/` reports are review evidence, not canonical contract truth.

Documentation updates required by implementation:
- update runtime specs when a candidate contract becomes stable;
- update `plans/index.md` and `plans/protocols/index.md` when protocol phase/status changes;
- update product indexes and scenario docs when Docoved or SellerAgent adoption starts;
- document the canonical writable command-policy authority in each product repo before deprecating legacy fields.

## Non-goals

- No shared UI/admin implementation.
- No framework-owned DB/read-model tables.
- No DB migrations, backups, restore workflows, framework queues, or framework delivery-status storage in this protocol.
- No product command catalog migration into `bot-platform`.
- No provider SDK senders in platform packages.
- No universal renderer that hides provider-specific constraints.
- No Telegram-shaped abstraction presented as channel-neutral.
- No weakening of server-side authorization in favor of command menu visibility.

## Pre-code open gates

1. Should actor-class vocabulary live in command-framework package/types or in shared control-plane vocabulary?
2. Does `@dd-bot-platform/channel-runtime` remain the only published package touched, or should command-framework get its own package surface?
3. Which Docoved commands are required for first email/Telegram parity proof?
4. Which SellerAgent command subset is the minimum beta proof: diagnostics/readback only, or release-control too?
5. Which delivery outcome fields are genuinely shared versus SellerAgent-specific?
6. What exact channel-instance config shape should represent default threading behavior?

These gates remain open after phase 1 review.
They must be resolved before implementation code starts, either by updating this protocol or by linking approved task packets from `.tasks/prt-043-channel-interaction-runtime/`.
