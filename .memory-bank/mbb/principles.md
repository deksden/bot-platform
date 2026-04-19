---
file: '.memory-bank/mbb/principles.md'
description: 'MBB Rule: Principles V6.0 - Основные принципы организации Memory Bank Bible с Tier System'
purpose: 'Применить MBB принципы для правильной организации и структурирования документации V6.0'
version: '6.0.0'
date: '2025-09-08'
status: 'ACTIVE'
c4_level: 'standard'
architecture: 'MBB V6.0 Core Principles & Tier System'
parent: '.memory-bank/mbb/index.md'
architecture: 'V6.0 MBB Standards'
children:
  - c4-model.md
  - duo-files-guide.md
  - frontmatter-standards.md
tags: [mbb, principles, tier-system, organization, v6.0]
---

# Принципы организации Memory Bank

## Основополагающие принципы

### 1. Single Source of Truth (SSOT)

**Каждая концепция документирована в единственном месте.**

✅ **Правильно:**
```
.memory-bank/docs/orchestrator/state-management/state.md
→ Единственный источник информации о StateManager
```

❌ **Неправильно:**
```
docs/state-management.md + docs/orchestrator.md (дублирование информации о StateManager)
```

**Преимущества SSOT:**
- Исключает противоречия в документации
- Упрощает поддержание актуальности
- Улучшает поиск информации агентами

### 2. Atomic Concepts (Атомарность концепций)

**Один файл = одна концепция.**

**Принцип декомпозиции:**
- Tier 1: ≤250 строк - остается цельным
- Tier 2: 250-800 строк - саммари + 1-2 детализации  
- Tier 3: >800 строк - обязательная декомпозиция

**Пример атомарной декомпозиции:**
```
ai-kod-observability-v5.md (1646 строк) →

docs/orchestrator/observability/
├── observability.md              # 200 строк - саммари + ссылки
├── observability-architecture.md # 400 строк - архитектура V7
├── observability-services.md     # 400 строк - сервисы и API
├── observability-monitoring.md   # 300 строк - метрики
└── observability-debugging.md    # 296 строк - debugging features
```

### 3. C4 Model Structure
Организация документации следует C4: System → Container → Component → Code. При этом каталоги именуются по смыслу (без букв L1/L2). Для логических группировок, не являющихся подсистемами, используем нотацию `()`.

#### L1 — System Level
```
docs/
├── product.md
├── structure.md
├── architecture.md
└── interactions.md
```

#### L2 — Container Level
```
docs/
├── orchestrator/
├── api/
├── worker/
└── (packages)/
```

- Директории без скобок описывают контейнер с собственным контрактом и границами.
- Директории в скобках обозначают логические группы (meta-группы). Они не добавляют новый контейнер, а всего лишь группируют документы (например, shared packages). Индексы внутри таких директорий обязаны явно говорить, что это группировка, и ссылаться на соответствующие контейнеры.

Каждый контейнер содержит `index.md` (навигация), при необходимости `contract.md`, `architecture.md` и ссылки на составляющие компоненты.

#### L3 — Component Level
```
docs/orchestrator/
├── state-management/
├── navigation/
├── validation/
├── observability/
└── event-flow/
```

L3 индекс описывает компонент, его контракт, связи и ссылки на детали (duo pattern). Для логических кластеров на L3 допускается подкаталог `(archive)/`, `(legacy)/` и т.п. — подчёркивает, что это не самостоятельный компонент, а grouping.

### 4. Duo Files Pattern

**Саммари + детальные файлы для сложных концепций.**

**Структура duo файла:**
```
component/
├── index.md                 # Навигация (если много файлов)
├── component.md            # Саммари с аннотированными ссылками
├── component-architecture.md # Архитектурные детали
├── component-implementation.md # Детали реализации
└── component-examples.md    # Примеры использования
```

**Правила саммари файла:**
- 150-250 строк максимум
- Основные концепции и тезисы
- Аннотированные ссылки на детальные файлы
- Не повторяет детали, а ссылается на них

**Пример аннотированной ссылки:**
```markdown
## Архитектура

StateManager реализует централизованное управление состоянием workflows.

**Детализация:**
- [State Architecture](state-architecture.md): V7 архитектура с atomic операциями и distributed locking
- [State Implementation](state-implementation.md): StateCoreService и LockManagerService реализация
- [State API](state-api.md): Публичные методы и их использование
```

**Иерархичность:** детальный файл имеет право выступать саммари для под-концепции. Если внутри подробной статьи появляются самостоятельные темы, создавайте для них новый duo-слой: текущий файл становится их кратким обзором, а детали уносятся в дочерние документы. Это обеспечивает бесконечно вложенную, но предсказуемую структуру без дублирования.

### 5. Information Hierarchy (Иерархия информации)

**Градуальное раскрытие сложности.**

#### Уровень 1: Quick Start
- Product overview
- System architecture diagram
- Key concepts glossary

#### Уровень 2: Working Knowledge  
- Subsystem contracts
- API documentation
- Common patterns

#### Уровень 3: Deep Dive
- Component internals
- Implementation details  
- Performance considerations

#### Уровень 4: Maintenance
- Troubleshooting guides
- Monitoring and alerting
- Operational procedures

### 6. Audience & Automation Metadata
- Указывайте `target_audience` (например, `[developers, ai-agents]`) для каждого документа.
- Материалы, пригодные для автоматизации или машинного потребления, помечайте `automation_ready: true`.
- Для логических группировок используйте каталоги в скобках (`(packages)/`, `(archive)/`) и описывайте их роль в индексе.

### 7. Content Quality Standards

#### Стиль написания
- **Активный залог:** "StateManager updates task status" vs "Task status is updated"
- **Конкретность:** "Redis lock expires in 30 seconds" vs "Lock expires after timeout"  
- **Примеры:** Каждая абстрактная концепция иллюстрируется примером

#### Структура текста
- **Заголовки:** Четкие, отражающие содержание секции
- **Списки:** Предпочтительнее сплошного текста
- **Диаграммы:** Для сложных взаимосвязей
- **Код:** Актуальные примеры с комментариями

#### Актуальность
- **Версионирование:** Каждый файл имеет версию в frontmatter
- **История изменений:** 3-5 последних обновлений в history
- **Статус:** ACTIVE/DRAFT/DEPRECATED в frontmatter

### 8. Architectural approaches must be explicit

Если проект использует выраженные архитектурные подходы, которые влияют на grounding, planning, code organization, UI automation или client strategy, Memory Bank обязан фиксировать их явно.

Типовые примеры:
- layers + vertical slices / feature areas;
- typed client SDK как обязательная граница между сервером и CLI/TUI/GUI;
- screen-level GUI contracts;
- design-system contracts;
- POM mapping и `data-testid` registry.

Правило:
- такие подходы не должны оставаться неформальным знанием команды;
- если подход влияет на структуру проекта, ownership, delivery, acceptance или automation, он должен быть описан в Memory Bank как отдельный архитектурный документ или набор связанных документов;
- при изменении этих подходов соответствующие разделы Memory Bank должны обновляться вместе с кодом.

### 9. Documentation Operating Model must be explicit

Memory Bank должен явно показывать, какой тип документа отвечает за какой тип знания.

Минимальная operating model:
- `ADR` — long-lived architectural decision и rationale;
- `spec` — normative design / contract / implementation design;
- `epic` — delivery framing для value area;
- `feature` — minimal delivered value slice;
- `protocol` — curated execution and evidence trace для implementation/remediation wave;
- `scenario` — executable verification contract;
- `runbook` — operational procedure;
- `guides` — user-facing documentation по Diataxis.

Правило:
- один тип документа не должен silently брать на себя роль другого;
- implementation log не размазывается по feature/spec/epic без явного owning document;
- user-facing guides не дублируют internal design или delivery traceability.

### 10. Documentation must be self-improving

Memory Bank должен улучшаться в ходе работы, а не только описывать уже известное состояние.

Если агент или разработчик обнаружил:
- ambiguity в contract или acceptance;
- recurring failure в rollout/verification;
- missing runbook step;
- неясную ownership boundary;
- knowledge gap, который тормозит следующий цикл;

то он должен обновить owning SSoT:
- `spec` — если проблема в design/contract;
- `scenario` — если проблема в verification contract или evidence path;
- `runbook` — если проблема в operational procedure;
- `guide` — если проблема в user-facing usage path;
- `ADR` — если вскрыто долгоживущее архитектурное решение;
- `MBB` — если проблема в самих правилах документации.

Не рекомендуется:
- складывать такие знания в общий `lessons-learned` dump;
- оставлять process knowledge только в PR comments, chats или raw logs.

### 11. Verification model must be layered

Memory Bank должен различать уровни проверки, а не смешивать их в одно слово "tests".

Минимальные verification layers:
- unit — локальная логика, инварианты и pure/domain behavior;
- integration — boundary interaction между модулями, adapters, DB/API surfaces;
- contract — typed API, schema, UI contract, test-id, stable interface checks;
- e2e / automation — controlled user or operator flow;
- scenario — capability / lifecycle / golden-path verification с evidence;
- hosted acceptance — `beta_api`, `beta_ui`, `beta_external_manual` или `mixed`;
- runbook checks — deploy truth, incident drill, rollback and production-safety checks.

Правило:
- scenario не заменяет unit/integration/contract tests;
- hosted acceptance не заменяет scenario contract;
- feature closure должна явно понимать, какие verification layers для неё являются обязательными.

### 12. Guides must follow Diataxis

Потребительская документация в `guides/` ведётся по Diataxis:
- `tutorials` — onboarding к первому успешному результату;
- `how-to` — task-oriented procedural guides;
- `reference` — точные stable contracts и справочники;
- `explanation` — why/how model, ограничения и side effects.

Правило:
- `guides/` не дублируют `spec/`, `plans/` и `scenarios/`;
- если документ отвечает на вопрос "как устроено и почему", это обычно `explanation`, а не `reference`;
- если документ отвечает на вопрос "как выполнить задачу", это `how-to`, а не internal runbook для команды разработки.

## Применение принципов

### При создании новой документации

1. **Определить уровень C4:** L1/L2/L3?
2. **Выбрать местоположение:** Какая подсистема/компонент?
3. **Проверить SSOT:** Не дублируется ли концепция?
4. **Оценить размер:** Нужна ли декомпозиция?
5. **Создать связи:** Кросс-ссылки с кодом и смежными концепциями

### При рефакторинге существующей документации

1. **Audit размера:** >800 строк → декомпозиция
2. **Проверка дублирования:** Консолидировать дубликаты
3. **Обновление ссылок:** Актуализировать кросс-ссылки
4. **Архивация устаревшего:** Перенести неактуальное в archive/
5. **Валидация качества:** Соответствие style guide

### Антипаттерны (чего избегать)

❌ **Монолитные файлы:** >1000 строк без декомпозиции
❌ **Дублирование:** Одна концепция в нескольких местах
❌ **Orphan файлы:** Документы без ссылок из индексов
❌ **Устаревшая информация:** Документы с неактуальными версиями
❌ **Broken links:** Ссылки на несуществующие файлы
❌ **Неконсистентный frontmatter:** Отсутствие обязательных полей

## Валидация принципов

### Автоматические проверки
- Размер файлов (<800 строк)
- Наличие frontmatter полей
- Работоспособность кросс-ссылок
- Отсутствие orphan файлов

### Manual review процесс  
- Соответствие C4 структуре
- Качество аннотированных ссылок
- Актуальность версий
- Консистентность стиля

### Метрики качества
- **Coverage:** % концепций с документацией
- **Freshness:** Средний возраст документов
- **Consistency:** % файлов с корректным frontmatter
- **Accessibility:** Время поиска информации агентами

---

**Эти принципы обеспечивают высокое качество, поддерживаемость и эффективность Memory Bank как для человеков, так и для ИИ-агентов.**
