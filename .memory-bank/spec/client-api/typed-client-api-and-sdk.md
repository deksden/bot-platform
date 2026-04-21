---
file: .memory-bank/spec/client-api/typed-client-api-and-sdk.md
description: Typed client API and SDK - framework contract for operation-first platform access and thin clients.
purpose: Reference when implementing or reviewing the shared operation contract and SDK layer used by framework tooling and product consumers of `bot-platform`.
version: 1.2.0
date: 2026-04-21
status: ACTIVE
spec: SPEC-004
tags: [spec, client-api, sdk, contracts, operations, bot-platform]
parent: .memory-bank/spec/client-api/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/plans/epics/framework-feature-registry.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
history:
  - version: 1.2.0
    date: 2026-04-21
    changes: Migrated into bot-platform as the repo-local framework client contract doc under PRT-036 wave 97, with ownership framing and local index linkage.
  - version: 1.1.0
    date: 2026-03-21
    changes: Established the mixed-repo typed client API and SDK baseline.
---

# SPEC-004: Typed Client API And SDK

## Goal

Зафиксировать contract-first слой framework-платформы, чтобы:
- все внешние surfaces работали через единый набор операций;
- `client-sdk` был стандартным способом обращения к framework contracts;
- CLI, web, scenarios и internal tooling не дублировали transport/auth/error logic.

## Grounding

### Docs / SSoT

- [Framework boundaries](../architecture/boundaries.md) - базовые правила framework vs product ownership.
- [Repo structure](../project/repo-structure.md) - размещение `packages/api-contract` и `packages/client-sdk`.
- [Framework feature registry](../../plans/epics/framework-feature-registry.md) - owning feature-group framing for `client-contracts`.
- [PRT-036](../../plans/protocols/PRT-036-platform-framework-and-product-repo-split.md) - migration protocol and ownership rule.

### Code grounding

- `packages/api-contract` хранит operation definitions, DTO schemas and typed errors.
- `packages/client-sdk` реализует вызов этих операций через transport adapters.
- framework tooling и product repos используют SDK, а не runtime internals напрямую.

## Current state

До этой миграции repo-local framework doc для typed client boundary отсутствовал в `bot-platform`.  
Без единого контракта высок риск:
- thin clients будут обходить backend по-разному;
- SDK surface станет неустойчивым между продуктами;
- CLI/web/scenario tooling начнут расходиться по поведению.

## Target design

### Operation contract

Каждая операция должна иметь:
- stable `operationId`;
- typed request schema;
- typed response schema;
- typed error catalog;
- context expectations;
- ownership by feature area, not by transport.

### Operation grouping

Группируем операции по feature areas:
- `auth.*`
- `customers.*`
- `conversations.*`
- `commerce.*`
- `runtime.*`
- `ops.*`
- `scenarios.*`

Не группируем по transport types вроде `http.*` или `cli.*`.

### SDK responsibilities

`client-sdk` обязан:
- валидировать input/output по схемам;
- инкапсулировать transport;
- обрабатывать typed errors;
- внедрять auth/session/actor context через явные hooks;
- оставаться thin client, без доменных правил.

### Transport model

MVP baseline:
- `http` transport for deployed surfaces;
- optional `in-proc` transport for local tooling/tests if it materially simplifies scenarios;
- same operation shapes regardless of transport.

### Framework consumers

Через `client-sdk` должны работать:
- framework internal tooling and debug flows;
- reference CLI surfaces in framework and product repos;
- shared scenario/evaluation tooling;
- product-specific adapters in SellerAgent/Docoved через единый typed contract.

Rule:
- framework owns shared operation and SDK contract shape;
- products own their namespaces and operation implementations;
- any publishable operator/admin workflows stay product-owned, while shared invocation contract stays framework-owned.

## Non-goals

- Реализовать все domain operations заранее.
- Переносить business logic в SDK.
- Жестко привязывать contract to one framework/router implementation.

## Risks

- Risk: SDK начнет расти как второй application layer.  
  Mitigation: держать SDK transport- and contract-oriented only.

- Risk: clients начнут добавлять ad hoc обходные вызовы.  
  Mitigation: считать contract/SDK единственным supported client boundary.

## Migration / implementation plan

1. Зафиксировать operation definition shape.
2. Определить first-wave operation groups.
3. Реализовать typed client baseline.
4. Подключить CLI/playground/scenario tooling через SDK.
5. Добавить contract-facing regression checks.

## Regression gates

- Unit: schema validation, typed errors, transport adapters.
- Integration: same operation works through SDK across surfaces.
- Acceptance impact: shared framework scenarios and client-boundary contract checks.

## Docs impact

- Update framework feature registry references when operation grouping changes.
- Keep scenario and runtime docs aligned with the client boundary.

## Rollback / abort criteria

- Если SDK содержит feature-specific business rules, design has drifted.
- Если клиенты регулярно требуют custom calls вне operation catalog для типовых задач, contract baseline требует ревизии.
