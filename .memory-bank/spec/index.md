---
file: .memory-bank/spec/index.md
description: 'Spec hub для bot-platform: framework architecture, package contracts, scenario system и repo-level placement rules.'
purpose: Читать для понимания того, как должен быть устроен `bot-platform` как framework-only monorepo и какие нормативные docs обязаны жить именно здесь.
version: 0.1.0
date: 2026-04-19
status: DRAFT
c4_level: L1
tags: [spec, bot-platform, architecture, contracts, framework]
parent: .memory-bank/index.md
children:
  - architecture/index.md
  - architecture/boundaries.md
  - project/index.md
  - project/repo-structure.md
  - project/feature-area-boundaries.md
  - runtime/index.md
  - client-api/index.md
  - scenarios/index.md
  - operations/index.md
history:
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial draft spec hub for the future bot-platform Memory Bank under PRT-036.
---

# Specs Hub

Этот раздел хранит нормативные документы `bot-platform`.
Он отвечает за framework truth, а не за product overlays.

## Что сюда входит

- top-down architecture и vocabulary;
- framework vs product boundaries;
- repo structure, package ownership и placement rules;
- runtime/framework contracts;
- typed client API и SDK boundary;
- shared scenario/evidence model;
- shared operations/process standards, если они действительно platform-wide.

## Что сюда не входит

- SellerAgent и Docoved product domains;
- product DB schemas, deployments, secrets и environment truth;
- product operator runbooks;
- product-specific acceptance checklists и hosted overlays.

## Current spec sections

- [Architecture hub](architecture/index.md): glossary, system context, container map, domain map и dependency rules для framework repo.
- [Framework boundaries](architecture/boundaries.md): главный запретительный документ про то, что может и не может жить в `bot-platform`.
- [Project docs](project/index.md): repo shape, package catalog, feature-area ownership и naming/placement conventions.
- [Runtime docs](runtime/index.md): execution kernel, auth framework, command framework, workflow framework, prompt/config/observability seams и shared runtime contracts.
- [Client API docs](client-api/index.md): operation catalog, schemas, typed errors и client-sdk boundary.
- [Scenario docs](scenarios/index.md): scenario taxonomy, evidence model, hosted verification classes и runner assumptions.
- [Operations docs](operations/index.md): package publishing, mirrored process standards и framework-level release/verification rules.

## Must-exist docs immediately

Ниже список документов, без которых `bot-platform` будет слишком пустым и не пройдет Wave 1 как repo-local SSoT:

- `architecture/index.md`
- `architecture/boundaries.md`
- `architecture/platform-glossary.md`
- `architecture/system-context.md`
- `architecture/container-architecture.md`
- `architecture/dependency-and-placement-rules.md`
- `project/index.md`
- `project/repo-structure.md`
- `project/feature-area-boundaries.md`
- `runtime/index.md`
- `client-api/index.md`
- `client-api/typed-client-api-and-sdk.md`
- `scenarios/index.md`
- `runtime/scenario-system-framework-contract.md`
- `scenarios/hosted-beta-execution-model.md`
- `operations/index.md`
- `operations/git-flow.md`

## Section design notes

### `architecture/`

Остается главным top-down entrypoint.
Сюда переезжает большая часть текущих:
- `spec/architecture/**` кроме Docoved-owned domain docs;
- `spec/project/agent-execution-platform-architecture.md` как high-level framework direction;
- rules про `core -> api-contract -> client-sdk -> surfaces/adapters`.

### `project/`

Нужен для repo-local shape.
Даже если часть текущих документов переедет почти без изменений, здесь должна появиться `bot-platform`-specific версия:
- без product-owned packages;
- без product deploy truth;
- с отдельным описанием framework packages и `apps/cli`.

### `runtime/`

Сюда входит только shared framework runtime:
- execution kernel;
- auth framework;
- command framework;
- workflow framework;
- trace/evidence contracts;
- prompt/config/observability seams, если они описывают framework behavior.

SellerAgent/Docoved runtime semantics не должны закрепляться здесь как canonical truth.

### `operations/`

Раздел нужен, но должен быть узким.
Он хранит только framework-wide process truth:
- `git-flow.md` как mirrored standard;
- package publishing and release boundaries;
- shared hosted verification model, если это именно framework standard.

Product deployment architecture сюда не переносится.
