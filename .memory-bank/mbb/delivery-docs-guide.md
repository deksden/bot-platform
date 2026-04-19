---
file: '.memory-bank/mbb/delivery-docs-guide.md'
description: 'MBB guide: how to use epic, feature, spec, protocol, and scenario documents without duplication.'
purpose: 'Read when creating or updating delivery-oriented documentation so epic/feature/spec/protocol/scenario roles stay clear and useful.'
version: '1.2.0'
date: '2026-03-26'
status: 'ACTIVE'
c4_level: 'standard'
parent: '.memory-bank/mbb/index.md'
architecture: 'MBB Standards'
tags: [mbb, delivery, epic, feature, spec, protocol, scenario, traceability]
---

# Delivery Docs Guide

Этот guide фиксирует, как в Memory Bank разводить delivery-oriented документы, чтобы они помогали разработке и не дублировали друг друга.

## 1. Epic

`Epic` — это группа связанной доставляемой ценности.

Используй epic для:
- framing value area;
- slicing work into features;
- tracking progress at a high level;
- linking evidence-confirmed completion of features.

Не используй epic для:
- подробных implementation plans;
- API-level design;
- длинных execution logs;
- детальной технической аргументации по каждому шагу.

## 2. Feature

`Feature` — это минимальная unit of delivered value.

Используй feature для:
- user/system outcome;
- scope / non-goals;
- affected areas;
- grounding links;
- acceptance intent;
- high-level implementation plan;
- evidence and closure state.

Не используй feature для:
- полного technical design;
- длинного протокола реализации;
- хранения всех промежуточных решений.

## 3. Spec

`Spec` — это grounded implementation design.

Используй spec для:
- architecture/design decisions for implementation;
- migration plan;
- regression gates;
- risks and rollout;
- implementation grounding on current codebase.

Spec отвечает на вопрос:
- “Как именно это реализуем в текущем проекте?”

Spec не обязан быть conceptually subordinate одной feature.
Он может:
- обслуживать одну feature;
- описывать shared capability для нескольких features;
- фиксировать contract/design слой, который переживает конкретную delivery wave.

Не используй spec как:
- value-framing document;
- execution log;
- замену ADR для long-lived architectural rationale.

### Когда отдельный spec обязателен

Создавай отдельный spec, если изменение:
- меняет contract shape между слоями или surfaces;
- вводит migration / rollout / rollback semantics;
- затрагивает shared capability или cross-feature boundary;
- требует явных regression gates;
- имеет нетривиальные risks, security/data/auth implications;
- после grounding всё ещё содержит design ambiguity, которую нельзя безопасно держать только в feature.

Отдельный spec обычно не нужен, если:
- slice локален и укладывается в существующие patterns;
- design можно ясно описать прямо в feature без выделения отдельного normative layer;
- нет новой migration/contract semantics.

## 3a. ADR

`ADR` — это long-lived architectural decision record.

Используй ADR для:
- решений с несколькими реальными альтернативами и trade-offs;
- смены архитектурных boundaries, ownership model или platform approach;
- решений, которые будут влиять на несколько features/specs/waves;
- фиксации rationale, который команда иначе будет переоткрывать заново.

Не используй ADR для:
- локального implementation choice внутри одной feature;
- execution notes;
- текущего status tracking.

ADR отвечает на вопрос:
- “Почему проект выбрал именно этот архитектурный путь и какие альтернативы были отвергнуты?”

## 4. Protocol

`Protocol` — это curated execution document для cross-epic работы и длинных migration/refactoring waves.

Используй protocol для:
- implementation plans in execution;
- remediation cycles;
- cross-epic migration sequences;
- refactorings текущего кода, которые не укладываются в одну feature boundary;
- links to runs, evidence, and key decisions;
- фиксации того, что реально происходило, а не только что планировалось.

Protocol отвечает на вопрос:
- “Как ведём и закрываем cross-epic execution wave, и чем это подтверждено?”

Формат protocol обычно ближе к feature doc, чем к сырому журналу:
- goal;
- scope / non-goals;
- affected areas;
- preparation / execution gates;
- implementation plan;
- acceptance intent;
- closure state.

Но protocol не заменяет epic/feature:
- epic/feature остаются каноническими delivery docs;
- protocol временно держит execution contract для миграции или рефакторинга;
- после завершения работы protocol должен привести к обновлению `EP-*` / `FT-*`, статусов, deprecations и verification links.

### Runtime vs curated protocol layer

В `vNext` есть два связанных, но разных protocol слоя:

- runtime-published protocol summaries
  - отдельный generated evidence layer, если он нужен проекту
  - публикуются системой автоматически из runtime state
  - дают краткий curated trace по shaping / mini / acceptance / beta verification
- hand-authored delivery protocols
  - `.memory-bank/plans/protocols/PRT-XXX-[slug].md`
  - ведутся человеком/flow как curated implementation or remediation narrative

Правило:
- raw runtime state и полные workspace logs остаются в dd-flow storage;
- в Memory Bank публикуется только curated protocol/evidence layer.

## 5. Scenario

`Scenario` — это исполняемый platform/use-case verification contract.

Используй scenario для:
- canonical end-to-end или lifecycle verification;
- проверки platform capability в подготовленной среде;
- фиксации preconditions, phases, expected evidence и pass criteria;
- связи архитектурных решений с реальными reproducible rehearsal runs.

Scenario отвечает на вопрос:
- “Как именно доказываем, что система/flow/capability реально работает в целевом use case?”

Scenario **не** заменяет unit/integration/e2e tests:
- тесты проверяют код и контракты;
- scenario проверяет платформу или lifecycle block как operational flow с evidence.

## 6. Practical separation rule

Если документ отвечает на вопрос:
- “Почему выбран такой архитектурный путь?” -> `ADR`
- “Зачем и что доставляем?” -> `feature`
- “Как реализуем?” -> `spec`
- “Что реально происходило?” -> `protocol`
- “Как воспроизводимо проверяем платформу / lifecycle block / canonical use case?” -> `scenario`
- “Как связанная группа features доставляет ценность?” -> `epic`

## 6a. Source-of-truth rule by document type

- `ADR`
  - SSoT for: architectural decision and rationale
  - must not store: delivery progress, run logs, temporary closure notes
- `Epic`
  - SSoT for: value area, feature map, high-level delivery framing
  - must not store: technical design and long execution history
- `Feature`
  - SSoT for: delivered outcome, scope, grounding, acceptance intent, closure state
  - must not store: full technical design for large changes or raw implementation log
- `Spec`
  - SSoT for: normative design, migration, risks, regression gates
  - must not store: high-level product framing or factual run-by-run execution history
- `Protocol`
  - SSoT for: curated execution/evidence trace of a wave
  - must not store: raw logs or duplicated normative design that belongs in spec
- `Scenario`
  - SSoT for: executable verification contract
  - must not store: raw runner output or ad hoc implementation notes
- `Runbook`
  - SSoT for: operational procedure and incident/deploy steps
  - must not store: product framing or feature planning
- `Guide`
  - SSoT for: user-facing usage knowledge in Diataxis form
  - must not store: internal delivery traceability or implementation-only details

## 6b. Where implementation planning and implementation log live

Не вводи отдельный обязательный doc type только ради слов "implementation plan".

Правило:
- delivery-level implementation plan живёт в `feature`;
- technical migration/implementation plan живёт в `spec`;
- cross-epic or remediation execution plan живёт в `protocol`;
- factual implementation/evidence log тоже живёт в `protocol`, а не в отдельном обязательном `implementation report`.

Допустимо:
- использовать термин "implementation report" как человекочитаемое название конкретного protocol-like summary;
- делать epic-level closure summary, если она ссылается на канонический protocol/evidence layer и не создаёт второй competing log.

## 7. Minimal traceability rule

Для delivery docs нужно поддерживать как минимум такую цепочку:

`epic -> feature -> spec -> runs / evidence -> closure state`

Если хотя бы одно из этих звеньев не связано, deliverable knowledge становится неполным.

Для platform verification нужно поддерживать как минимум такую цепочку:

`ADR / capability -> scenario -> evidence -> verdict / follow-up`

Если scenario не связан с capability или evidence, платформа теряет проверяемость.

Для operational delivery дополнительно желательно поддерживать цепочку:

`feature/spec -> scenario -> beta acceptance / CI / deploy evidence -> protocol / closure state`

## 8. Writing guidance

## 8a. Security-sensitive delivery rule

Если изменение затрагивает:
- database schema;
- auth/session storage;
- storage/provider secrets;
- exposed API/data surfaces;

то feature/protocol doc должен явно содержать:
- security/access/data-exposure impact;
- expected verification path;
- hosted follow-up, если live security state меняется не только локально.

## 8b. Ambiguity-sensitive design rule

Если feature/protocol/spec затрагивает:
- contract shape;
- fallback semantics;
- rollout behavior;
- ownership boundaries;
- acceptance-critical runtime behavior;

и после grounding остаются нетривиальные неясности, документ должен:
- явно перечислить open questions;
- зафиксировать required research before implementation;
- не выдавать implementation plan за fully settled design.

Практическое правило:
- сначала narrowing/research;
- потом coding;
- не наоборот.

### Good feature docs
- short and outcome-oriented
- clear acceptance intent
- clear non-goals
- obvious links to spec and evidence

### Bad feature docs
- превращаются в mini-PRD
- дублируют spec word-for-word
- содержат execution logs вместо delivery framing
- не показывают, как будет подтверждён результат

### Good scenario docs
- описывают проверяемый use case, а не внутреннюю реализацию раннера;
- фиксируют preconditions и expected evidence;
- содержат phases, которые можно реально исполнить;
- связывают scenario с capability/lifecycle block, который он валидирует.

### Bad scenario docs
- являются просто пересказом test file;
- не описывают evidence;
- завязаны на случайные локальные предположения;
- не объясняют, что именно считается pass/fail.

### Good epic docs
- short framing
- feature map
- evidence-based progress

### Bad epic docs
- roadmap theatre
- KPI theatre
- long prose with no traceability to real features

## 9. Template guidance rule

Короткие рекомендации по заполнению допустимо держать прямо в шаблонах через blockquote notes.

Используй inline notes в шаблоне, когда:
- нужно быстро предотвратить типичную ошибку заполнения;
- guidance относится к конкретной секции.

Используй отдельный guide, когда:
- нужно объяснить различия между типами документов;
- guidance относится ко всему lifecycle;
- есть риск распухания шаблонов от методологии.
