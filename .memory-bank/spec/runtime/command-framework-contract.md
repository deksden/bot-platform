---
file: .memory-bank/spec/runtime/command-framework-contract.md
description: 'Framework runtime contract for the command framework: command envelope, parser and registry primitives, dispatch hooks, and shared diagnostics.'
purpose: Read when defining reusable command surfaces in `bot-platform` so framework command mechanics stay product-agnostic and do not absorb channel or product command truth.
version: 1.1.0
date: 2026-04-26
status: ACTIVE
c4_level: L2
tags: [runtime, commands, framework-contract, diagnostics, dispatch, bot-platform]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md
  - .memory-bank/plans/epics/framework-feature-registry.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
history:
  - version: 1.1.0
    date: 2026-04-26
    changes: Linked PRT-043 as the draft implementation follow-up for actor-aware command availability across product actors, channel kinds, and concrete channel instances.
  - version: 1.0.0
    date: 2026-04-22
    changes: Landed the repo-local framework command contract for command envelope, parser/registry/dispatch primitives, and shared diagnostics under PRT-036 Wave 158.
---

# Command Framework Contract

## Goal

Define the narrow command-framework slice that `bot-platform` owns:
- one reusable command envelope for structured command invocation;
- parser, registry, and dispatch primitives that products can plug into;
- shared diagnostics and error-shape expectations for command execution.

This contract is intentionally narrow.
It does not make `bot-platform` the owner of SellerAgent, Docoved, Telegram, or any other product command catalog.

The current draft implementation follow-up is [PRT-043 Channel Interaction Runtime](../../plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md). It extends this contract direction toward actor-aware command availability across system admins, workspace admins, employees/members, known external users, unknown external users, anonymous actors, channel kinds, and concrete channel instances without moving product command catalogs into the framework.

## Framework ownership boundary

`bot-platform` owns command mechanics:
- command envelope vocabulary;
- parser and normalization contracts;
- command registry metadata and dispatch hooks;
- shared diagnostics and error-shape expectations;
- server-authoritative command access hook points.

`bot-platform` does not own:
- concrete command names and business semantics;
- channel-specific command parsing quirks or message transport behavior;
- permission mapping policy or product capability ladders;
- read-model projections and side effects for concrete commands.

## Canonical command envelope

Framework primitive: `CommandEnvelope`.

Minimum concerns:
- `commandKey` or equivalent stable command identifier;
- normalized argument payload after parsing/validation;
- invocation source metadata;
- actor and scope context reference;
- correlation metadata for tracing and diagnostics.

Rule:
- framework code may define the envelope shape and lifecycle semantics;
- product repos remain free to decide which concrete command keys exist and what business meanings they carry.

## Parser and normalization primitives

Framework primitive: `CommandParser`.

Responsibilities:
- accept raw command input or an already structured invocation request;
- normalize input into the canonical command envelope;
- separate parse failure from later validation or permission failure;
- return machine-readable diagnostics when parsing cannot produce a valid envelope.

Framework rule:
- parser contracts must stay product-agnostic and transport-agnostic.

Framework non-rule:
- the framework must not freeze Telegram-only command tokenization, channel mention behavior, or product message conventions as shared truth.

## Registry primitives

Framework primitive: `CommandRegistry`.

Responsibilities:
- register command definitions or command handlers against stable keys;
- expose discoverable metadata needed for dispatch and diagnostics;
- support validation that a command key is known before business execution begins.

Recommended registry metadata:
- stable command key;
- argument contract or validator reference;
- dispatch handler binding;
- capability tags or execution hints safe at framework level.

Registry boundary:
- registry metadata may describe technical dispatch requirements;
- registry metadata must not become a hidden home for product permission policy or product UX copy.

## Dispatch primitives

Framework primitive: `CommandDispatcher`.

Responsibilities:
- receive a validated command envelope;
- resolve the appropriate registry entry;
- invoke the bound handler through one canonical dispatch path;
- return a normalized success or failure envelope suitable for tracing and diagnostics.

Dispatch rule:
- dispatch stays server-authoritative and traceable;
- products own the handler implementation and the resulting side effects.

## Diagnostics and error-shape expectations

Framework-owned command execution must distinguish at least these failure classes:
- `parse_error`
- `unknown_command`
- `validation_error`
- `access_denied`
- `dispatch_error`

Framework rule:
- command errors must be machine-readable, traceable, and stable enough for tooling;
- parse/validation/access/dispatch failures must not collapse into one opaque generic string.

Recommended diagnostic fields:
- command key when known;
- failure class or reason code;
- correlation id or trace ref;
- bounded human-readable summary;
- optional structured field-level validation details.

## Access and permission boundary

Framework owns only the access hook shape:
- a command dispatch path may request an allow/deny decision from the canonical auth/access layer;
- access failures must surface through the shared command error shape.

Products own:
- permission mapping;
- role and capability semantics;
- command visibility policy;
- read-model projections that explain why a product command is allowed or denied.

## Projection and help boundary

Framework registry metadata may support generic projection surfaces such as:
- listing registered commands;
- surfacing argument schemas;
- projecting generic diagnostics or handler state.

Products own:
- end-user help text;
- channel-specific rendering and affordances;
- product-specific command menus or operator experiences.

## Explicit product-owned exclusions

The following remain product-local even if they currently sit near shared command helpers:
- SellerAgent or Docoved command catalogs;
- Telegram command parsing and reply conventions;
- product permission ladders and command enablement flags;
- command side effects, repairs, reconcile flows, and read-model updates.

## Non-goals

- Define one product's command namespace as framework canon.
- Encode channel behavior as a shared parsing rule by accident.
- Move product command projections or permission logic into `bot-platform`.
- Create a shared command-control surface that bypasses product ownership.
