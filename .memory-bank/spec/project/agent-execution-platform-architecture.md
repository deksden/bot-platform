---
file: .memory-bank/spec/project/agent-execution-platform-architecture.md
description: 'High-level framework project architecture for bot-platform as an agent-execution platform monorepo.'
purpose: Read when aligning project-level architecture direction, system planes, and framework-vs-product ownership boundaries without duplicating container-level architecture docs.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
c4_level: L1
tags: [project-architecture, bot-platform, framework, execution-kernel, planes]
parent: .memory-bank/spec/project/index.md
related_files:
  - .memory-bank/spec/architecture/index.md
  - .memory-bank/spec/architecture/platform-glossary.md
  - .memory-bank/spec/architecture/system-context.md
  - .memory-bank/spec/architecture/container-architecture.md
  - .memory-bank/spec/architecture/dependency-and-placement-rules.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/index.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
history:
  - version: 0.1.0
    date: 2026-04-22
    changes: Migrated the top-level agent-execution architecture framing into bot-platform as framework-only project architecture guidance under PRT-036 Wave 145.
---

# Agent Execution Platform Architecture

## Position in the spec system

Этот документ фиксирует project-level целевое направление для `bot-platform`.
Детальные top-down границы, vocabulary, контейнеры и dependency rules остаются каноникой в `spec/architecture/*`.

Практическое правило:
- этот файл отвечает на вопрос "какое framework целевое состояние мы строим";
- `spec/architecture/*` отвечает на вопрос "как именно разложены архитектурные границы и контейнеры";
- `spec/runtime/*` фиксирует исполняемые runtime contracts.

## Goal

Определить минимально достаточную framework architecture, в которой:
- единый execution kernel обслуживает разные workflow family;
- control/evaluation остаются first-class framework concerns;
- transport and product behavior подключаются через contracts, а не вшиваются в kernel;
- эволюция происходит через seam extraction, без big-bang rewrite.

## Architectural style

Target style:
- modular monolith;
- explicit internal boundaries;
- shared typed contracts;
- controlled worker/orchestration seams for background and long-running execution.

Non-goals:
- premature microservice split;
- parallel runtime truth for each product;
- product-owned deployment and operator overlays inside framework docs.

## Canonical vocabulary reminder

Канонические определения терминов живут в `spec/architecture/platform-glossary.md`.
Для project-level framing здесь важны:
- `workspace` как tenancy boundary;
- `product instance` как product-local installation within workspace;
- `pipeline` как execution mode selected via framework contracts;
- `channel` как communication surface bound through configuration and pipeline binding;
- `environment` как deployment contour, а не business tenancy identity.

## System planes

### 1. Execution Plane

Owns:
- execution request/session contracts;
- workflow-family orchestration and capability selection;
- decision generation, verification, and result intent production;
- workflow-scoped execution traces.

Does not own:
- product-specific business rules;
- transport-specific delivery behavior as primary truth.

### 2. Control Plane

Owns:
- framework management surfaces and operator actions;
- config-management and diagnostics projections;
- pipeline/channel-binding administration contracts;
- model-policy and knowledge-source governance surfaces.

Does not own:
- reply-generation business logic.

### 3. Evaluation Plane

Owns:
- replay/compare/score workflows;
- suite/case and judge-runtime orchestration;
- candidate configuration comparison against shared runtime truth.

Rule:
- evaluation reuses framework execution contracts instead of creating a separate answer-generation architecture.

### 4. Platform Plane

Owns shared infrastructure contracts:
- identity and access primitives;
- model orchestration and provider registry seams;
- token/error accounting;
- trace artifacts and observability policy;
- queue/outbox/worker and durable workflow-host seams.

## Boundary invariants

- One framework execution kernel remains canonical for answer-generation flow composition.
- Delivery and transport adaptation stay outside kernel internals and consume framework intents/contracts.
- Model policy remains declarative; failover/retry logic remains engine-owned.
- Traceability is mandatory at run/step/attempt granularity with governed artifact policy.
- Migration steps preserve runtime continuity and avoid product-truth leakage into framework ownership.

## Relationship to product repos

`bot-platform` owns framework contracts and reusable runtime behavior.
Product repos own product-domain semantics, channel operations specifics, and deployment/runbook truth.

Framework docs may reference product integration points only as boundary contracts, not as product SSoT.

## Current-to-target pressure

Эта архитектурная рамка нужна из-за повторяющихся давлений:
- oversized runtime composition in mixed code paths;
- blurred boundaries between execution, control, and delivery concerns;
- weak separation between framework seams and product-specific behavior.

## Migration rule

Каждый migration wave toward this architecture должен сохранять:
- existing runtime continuity for already-shipped flows;
- compatibility of tracing/evidence surfaces;
- contract-level interoperability across control/evaluation/runtime layers.
