---
file: '.memory-bank/mbb/architectural-approaches.md'
description: 'MBB rule: reusable architectural approaches for agent-friendly systems, clients, UI contracts, and automation surfaces.'
purpose: 'Read when defining project structure, client strategy, GUI documentation, or automation contracts so architectural approaches are documented consistently in Memory Bank.'
version: '1.0.0'
date: '2026-03-10'
status: 'ACTIVE'
c4_level: 'standard'
parent: '.memory-bank/mbb/index.md'
architecture: 'MBB Standards'
tags: [mbb, architecture, vertical-slices, client-sdk, cli, gui, tui, pom, data-testid]
---

# Architectural Approaches

Этот документ фиксирует повторно используемые архитектурные подходы, которые хорошо подходят для проектов, работающих с `dd-flow vNext`.

Это не mandatory blueprint для любого проекта. Это набор предпочтительных подходов, которые:
- дают агентам понятные ownership boundaries;
- упрощают grounding, planning, acceptance и поддержку документации;
- должны быть явно отражены в Memory Bank, если проект их использует.

## 1. Layers + vertical slices

Рекомендуемый подход:
- держать минимальные архитектурные слои;
- одновременно организовывать production-код вокруг feature areas / vertical slices;
- не смешивать “чисто слоёную” структуру с хаотичным feature-first layout без ownership.

### Когда подход особенно полезен
- продукт состоит из нескольких устойчивых областей;
- фичи обычно затрагивают 1-3 повторяющиеся feature areas;
- важно, чтобы агент быстро понимал, где лежит owning code и где проходят boundaries.

### Рекомендуемая модель
- `core/domain` хранит use-cases, state machines, policies и инварианты;
- `adapters` подключают DB/API/AI/browser/scheduler/infra;
- `typed contract + client` дают единый typed surface для вызова системы;
- `delivery surfaces` (`CLI`, `TUI`, `GUI`) остаются thin clients;
- production-код группируется по feature areas, а не только по слоям.

### Что важно зафиксировать в Memory Bank
- canonical feature areas;
- ownership boundaries;
- правила для `shared`;
- root composition points;
- связь docs ↔ code ownership.

### Рекомендуемые документы
- `project/layers-and-vertical-slices.md`
- `project/feature-area-boundaries.md`
- `project/repo-structure.md`

Основание:
- `feedback-360` использует именно такой подход:
  - `spec/project/layers-and-vertical-slices.md`
  - `spec/project/feature-area-boundaries.md`
  - `spec/engineering/architecture-guardrails.md`

## 2. Typed client SDK before GUI

Предпочтительный подход для клиентской части:
- сначала проектируетcя server API;
- поверх него делается typed client SDK;
- поверх SDK строится CLI/TUI reference client;
- и только затем richer GUI/web/native clients.

### Почему это хорошо
- логика клиента не дублируется по нескольким UI surfaces;
- CLI/TUI проще и быстрее тестировать агентом;
- GUI строится поверх уже проверенного typed contract;
- легче поддерживать thin-clients policy.

### Рекомендуемая модель
- `api-contract` или аналогичный слой описывает DTO/operations/errors;
- `client SDK` инкапсулирует transport и даёт typed operations;
- `CLI/TUI` используют только SDK и не содержат бизнес-правил;
- `GUI` использует тот же SDK или тот же operation surface, а не повторяет orchestration.

### Что важно зафиксировать в Memory Bank
- где находится typed client boundary;
- какие клиенты считаются reference clients;
- что GUI не должен обходить SDK и тащить бизнес-логику к себе;
- какие automation сценарии проходят сначала через CLI/TUI.

## 3. UI clients as documented interface surfaces

Если проект имеет governed UI surfaces, интерфейс должен быть описан не только кодом, но и набором контрактных документов.

Рекомендуемый подход:
- вести для каждого UI-клиента свой набор interface docs;
- описывать не только маршруты, но и сами surfaces:
  - список экранов;
  - переходы между ними;
  - структуру экранов;
  - ключевые данные;
  - действия;
  - states;
  - особенности механики.

Это правило одинаково применимо к GUI и TUI. Разница между ними должна быть не в терминологии, а в transport/detail layer automation.

### Рекомендуемая структура UI docs
- `ui/index.md` — хаб UI документации;
- `ui/screen-registry.md` — канонический список экранов/ids/routes;
- `ui/screens/` — screen-level contracts;
- `ui/navigation.md` или аналог — основные переходы и сценарии движения;
- `ui/design-system/` — visual language, components, interaction rules;
- `ui/pom/` — automation-facing mapping.

### Что должен описывать screen spec
- `screen_id`
- route / surface id
- actors / roles
- purpose
- displayed information
- sections / panes / widgets
- actions
- visible feedback from actions
- key states
- permissions / visibility rules
- links на owning implementation paths и automation docs

### Visible feedback semantics

Screen spec должен явно описывать, как пользователь видит результат действия:
- переход на другой экран;
- открытие/закрытие modal surface;
- обновление details/sections;
- disabled state;
- spinner/loading state;
- error/success/info feedback.

Это часть governed contract, а не “косметическая” деталь.

Основание:
- `feedback-360` использует screen specs как first-class contracts:
  - `spec/ui/screens/index.md`

## 4. Design systems as documented assets

Если проект делает GUI не ad-hoc, а осмысленно, design system тоже должен быть отражён в Memory Bank.

Это может включать:
- visual language;
- typography/color/motion principles;
- reusable UI primitives;
- interaction conventions;
- state styles;
- accessibility/testability decisions.

### Что важно зафиксировать
- где лежит design-system contract;
- какие решения считаются canonical;
- как это связано с экранными surface docs;
- когда требуется обновлять design-system docs.

## 5. POM mapping and stable interaction ids

Для automation рекомендуется first-class подход:
- page objects / POM;
- stable interaction ids;
- mapping экранов к automation surfaces.

### Рекомендуемая модель
- каждый governed screen имеет `screen_id` и root selector scope;
- существует POM mapping, который связывает:
  - screen spec;
  - page object;
  - stable ids / selectors;
  - high-level automation actions;
- проект ведёт реестр automation-facing ids для governed surfaces.

### GUI and TUI under one contract language

- Для GUI stable ids обычно выражаются через DOM `data-testid`.
- Для TUI stable ids должны выражаться через screen/panel/node/action/modal/field ids.

Это одна и та же контрактная сущность уровня документации: **stable interaction ids**.

### TUI POM

Для TUI POM нужно понимать как **screen API**:
- сценарии и automation не должны опираться на raw key choreography и поиск строк по ANSI;
- они должны работать через screen objects и stable ids governed surfaces.

### Что важно зафиксировать в Memory Bank
- `ui/pom/index.md`
- POM conventions;
- root selectors;
- screen ↔ POM mapping;
- правила именования stable interaction ids;
- для GUI: соглашения по `data-testid`;
- для TUI: соглашения по screen/panel/node/action/modal/field ids;
- обязанность обновлять POM/docs/id registry при изменении governed screens.

Основание:
- `feedback-360` использует отдельный `ui/pom/` слой и screen-level contracts.

## 6. Documentation update rule

Если проект использует любой из подходов выше, Memory Bank обязан явно это отражать.

### Обязательные update triggers
Обновляйте соответствующие разделы Memory Bank, если:
- меняются feature areas / ownership boundaries;
- появляется новый typed client boundary или меняется роль клиентов;
- появляется новый GUI client или меняется структура интерфейсов;
- меняются screen specs, navigation, interaction rules;
- меняется design-system contract;
- меняются POM mappings или stable interaction id conventions.

### Operational rule
- planning должен учитывать эти документы как часть grounding;
- delivery plans должны включать обновление таких разделов, если изменения их затрагивают;
- `mb-sync` может проверять наличие и связность этих документов там, где проект декларирует соответствующий подход.

## 7. Recommended documentation checklist

Если проект использует перечисленные подходы, желательно иметь в Memory Bank:

- `project/layers-and-vertical-slices.md`
- `project/feature-area-boundaries.md`
- `project/repo-structure.md`
- `client-api/` или operation catalog
- `ui/screen-registry.md`
- `ui/screens/`
- `ui/design-system/`
- `ui/pom/`

Не все документы обязательны для любого проекта. Но если проект реально использует подход, отсутствие соответствующего раздела считается documentation gap.
