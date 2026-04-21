---
file: .memory-bank/spec/architecture/dependency-and-placement-rules.md
description: 'Canonical dependency and placement rules for bot-platform framework containers and cross-repo boundaries.'
purpose: Read during framework refactors and new package/module placement so ownership stays canonical and product semantics do not re-enter framework code.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
c4_level: L2
tags: [architecture, dependencies, placement, ownership, bot-platform]
parent: .memory-bank/spec/architecture/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/architecture/container-architecture.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Landed the repo-local framework dependency and placement packet in bot-platform with explicit cross-repo ownership constraints (PRT-036 Wave 115).
---

# Dependency And Placement Rules

## Core rule

New framework logic must go to its canonical framework owner, not to the nearest convenient adapter or temporary seam.

## Placement precedence algorithm

When multiple rules seem to apply, use this order:

1. choose the semantic owner in the framework feature-area map;
2. if the shape crosses a boundary, place only the cross-boundary contract in `packages/api-contract`;
3. if code is truly cross-cutting and product-neutral, place it in a support package;
4. then choose the specific module/path inside that owner container.

Tie-breakers:
- owner semantics win over import convenience;
- DTO ownership does not transfer domain behavior ownership;
- temporary compatibility seams do not become canonical owners.

## Quick placement matrix

If the change is about:
- execution-kernel behavior -> `packages/core` (target extraction owner)
- contract/envelope/namespace shape -> `packages/api-contract`
- typed client invocation layer -> `packages/client-sdk` (target extraction owner)
- shared scenario/evidence mechanisms -> `packages/scenario-system`
- durable orchestration host mechanics -> `apps/workflow-host`
- persistence interface boundary rules or reusable repository contracts -> framework runtime contract surfaces and matching owner package seams
- platform-wide logging/config/prompt primitives -> support packages (`observability`, `platform-config`, `prompt-catalog`)
- product domain behavior -> keep it in product repos (not `bot-platform`)

## Import rules

Allowed framework import direction:
- apps may import framework packages through published/stable interfaces;
- `packages/core` may use `packages/api-contract` and product-neutral support packages;
- `packages/scenario-system` may use `packages/api-contract` and product-neutral support packages;
- support packages must not import product scopes.

Forbidden import direction:
- framework packages importing product-owned packages/scopes;
- `packages/api-contract` importing runtime behavior from `packages/core`;
- store-row or adapter-internal types exported as framework-wide contract truth.

## Runtime-call rules

Keep runtime communication boundaries explicit:
- surface apps invoke canonical package contracts;
- orchestration hosts call coarse framework commands/contracts rather than private adapter internals;
- channel or provider specifics remain adapter concerns around canonical framework runtime contracts.

## Forbidden patterns

### 1. Product semantics in framework owners

Do not embed one product's lifecycle/status vocabulary as framework default behavior.

### 2. Multiple canonical paths for one framework concern

Do not keep parallel "equivalent" implementations for one framework semantic contract.

### 3. Compatibility seam drift

Do not let temporary compatibility paths become permanent owners for new logic.

### 4. Naming as fake architecture

Folder labels such as `support`, `helpers`, or `bridge` do not justify cross-owner code placement.

### 5. Namespace dual truth

Use one canonical framework package namespace model.
Compatibility aliases may exist during migration, but canonical ownership cannot depend on dual namespace truth.

## Cross-repo boundary rules

- Product repos may consume framework contracts/packages; framework repo must not depend on product runtime packages.
- Framework docs can reference product repos only as consumers, examples, or migration context, not as framework owners.
- Product deployment topology, secrets, and runbooks are outside framework documentation scope.

## Refactoring direction

When code violates these rules:

1. identify canonical framework owner;
2. move semantics there;
3. leave adapters as thin wrappers/invokers;
4. remove duplicate local semantics;
5. verify behavior parity through scenario/contract checks.
