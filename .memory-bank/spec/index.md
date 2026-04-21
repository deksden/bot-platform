---
file: .memory-bank/spec/index.md
description: 'Spec hub для bot-platform: framework architecture, package contracts, scenario system и repo-level placement rules.'
purpose: Читать для понимания того, как должен быть устроен `bot-platform` как framework-only monorepo и какие нормативные docs обязаны жить именно здесь.
version: 0.13.0
date: 2026-04-21
status: DRAFT
c4_level: L1
tags: [spec, bot-platform, architecture, contracts, framework]
parent: .memory-bank/index.md
children:
  - architecture/index.md
  - architecture/boundaries.md
  - architecture/containers/index.md
  - project/index.md
  - project/repo-structure.md
  - project/feature-area-boundaries.md
  - runtime/index.md
  - engineering/index.md
  - engineering/delivery-standards.md
  - engineering/coding-style.md
  - security/index.md
  - security/auth-core.md
  - security/auth-and-access.md
  - client-api/index.md
  - client-api/api-namespace-registry.md
  - client-api/typed-client-api-and-sdk.md
  - scenarios/index.md
  - operations/index.md
history:
  - version: 0.13.0
    date: 2026-04-21
    changes: Linked the framework engineering packet (delivery-standards and coding-style) and the framework auth-and-access security contract in spec navigation and must-exist inventory (PRT-036 Wave 139).
  - version: 0.12.0
    date: 2026-04-21
    changes: Linked the landed framework operations packet (deployment architecture, operations runbook, production rollout runbook, hosted-beta acceptance contract) from spec/operations and must-exist inventory (PRT-036 Wave 135).
  - version: 0.11.0
    date: 2026-04-21
    changes: Linked the landed hosted-beta-execution-model packet from scenario hubs and the scenario section inventory (PRT-036 Wave 124).
  - version: 0.10.0
    date: 2026-04-21
    changes: Linked the landed framework scenario-system-and-evidence packet from the scenario section and must-exist inventory (PRT-036 Wave 121).
  - version: 0.9.0
    date: 2026-04-21
    changes: Linked the new runtime decision-explanation-envelope framework contract from the spec/runtime hubs and added it to the must-exist runtime inventory (PRT-036 Wave 112).
  - version: 0.8.0
    date: 2026-04-21
    changes: Linked the new runtime trace-artifact governance framework contract from the spec/runtime hubs and added it to the must-exist runtime inventory (PRT-036 Wave 111).
  - version: 0.7.0
    date: 2026-04-21
    changes: Linked the new runtime execution-traces and token-accounting framework contract from the spec and runtime hubs (PRT-036 Wave 110).
  - version: 0.6.0
    date: 2026-04-21
    changes: Added the API namespace registry to the client-api spec inventory as canonical framework namespace ownership guidance (PRT-036 wave 105).
  - version: 0.5.0
    date: 2026-04-21
    changes: Linked the runtime persistence-interface/store-boundary framework contract from the spec hub and updated the must-exist runtime doc inventory (PRT-036 Wave 104).
  - version: 0.4.0
    date: 2026-04-21
    changes: Added the new framework Security section with the first auth-core contract doc and linked it from the main spec hub.
  - version: 0.3.0
    date: 2026-04-21
    changes: Landed the next framework surface packet (PRT-036 waves 97-98): repo-local typed client API doc, workflow-host container doc, and architecture container index are now present and linked from the spec hubs.
  - version: 0.2.0
    date: 2026-04-21
    changes: Runtime section actualized after PRT-036 waves 91-92: repo-local execution kernel and pipeline-registry specs are now landed and linked from the runtime hub.
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

- [Architecture hub](architecture/index.md): glossary, system context, container map, domain map и dependency rules для framework repo, включая [containers index](architecture/containers/index.md) и [workflow host](architecture/containers/workflow-host.md).
- [Framework boundaries](architecture/boundaries.md): главный запретительный документ про то, что может и не может жить в `bot-platform`.
- [Project docs](project/index.md): repo shape, package catalog, feature-area ownership и naming/placement conventions.
- [Runtime docs](runtime/index.md): execution kernel, decision-explanation envelope, execution traces/token accounting, trace-artifact governance, pipeline registry/binding contract, persistence-interface/store-boundary contract, auth framework, command framework, workflow framework, prompt/config/observability seams и shared runtime contracts.
- [Engineering docs](engineering/index.md): framework delivery and coding standards, включая [delivery standards](engineering/delivery-standards.md) и [coding style](engineering/coding-style.md).
- [Security docs](security/index.md): framework-owned auth and access vocabulary, auth-flow primitives, and boundary contracts, включая [auth core](security/auth-core.md) и [auth and access](security/auth-and-access.md).
- [Client API docs](client-api/index.md): operation catalog, schemas, typed errors и client-sdk boundary, включая [API namespace registry](client-api/api-namespace-registry.md) и landed [typed client API and SDK](client-api/typed-client-api-and-sdk.md).
- [Scenario docs](scenarios/index.md): scenario taxonomy, evidence model, hosted verification classes и runner assumptions, включая [scenario system and evidence](scenarios/scenario-system-and-evidence.md) и [hosted beta execution model](scenarios/hosted-beta-execution-model.md).
- [Operations docs](operations/index.md): package publishing, deployment/runbook contracts, hosted-beta acceptance rules, mirrored process standards и framework-level release/verification rules.

## Must-exist docs immediately

Ниже список документов, без которых `bot-platform` будет слишком пустым и не пройдет Wave 1 как repo-local SSoT:

- `architecture/index.md`
- `architecture/boundaries.md`
- `architecture/platform-glossary.md`
- `architecture/system-context.md`
- `architecture/container-architecture.md`
- `architecture/containers/index.md`
- `architecture/containers/workflow-host.md`
- `architecture/dependency-and-placement-rules.md`
- `project/index.md`
- `project/repo-structure.md`
- `project/feature-area-boundaries.md`
- `runtime/index.md`
- `engineering/index.md`
- `engineering/delivery-standards.md`
- `engineering/coding-style.md`
- `runtime/agent-execution-kernel.md`
- `runtime/decision-explanation-envelope.md`
- `runtime/execution-traces-and-token-accounting.md`
- `runtime/pipeline-registry-and-binding-contract.md`
- `runtime/persistence-interface-and-store-boundary.md`
- `runtime/trace-artifact-governance.md`
- `security/index.md`
- `security/auth-core.md`
- `security/auth-and-access.md`
- `client-api/index.md`
- `client-api/api-namespace-registry.md`
- `client-api/typed-client-api-and-sdk.md`
- `scenarios/index.md`
- `scenarios/scenario-system-and-evidence.md`
- `runtime/scenario-system-framework-contract.md`
- `scenarios/hosted-beta-execution-model.md`
- `operations/index.md`
- `operations/deployment-architecture.md`
- `operations/runbook.md`
- `operations/production-rollout-runbook.md`
- `operations/hosted-beta-acceptance-contract.md`
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
