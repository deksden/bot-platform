---
file: '.memory-bank/mbb/index.md'
description: 'Memory Bank Bible (MBB) V6.0 - Комплексная система правил и стандартов документации AI-KOD'
purpose: 'Изучить для понимания полной системы правил и стандартов организации Memory Bank V6.0'
version: '6.0.0'
date: '2025-09-08'
status: 'ACTIVE'
c4_level: 'documentation'
parent: '.memory-bank/index.md'
architecture: 'V6.0 MBB Standards'
children:
  - principles.md
  - architectural-approaches.md
  - delivery-docs-guide.md
  - scenario-docs-guide.md
  - duo-files-guide.md
  - indexing-guide.md
  - frontmatter-standards.md
  - cross-references.md
  - c4-model.md
  - templates/
tags: [mbb, standards, documentation, bible, v6.0]
---

# 📜 Memory Bank Bible (MBB) V6.0

## 🎯 Что такое Memory Bank Bible

**Memory Bank Bible (MBB)** - это комплексная система правил и стандартов для организации, структурирования и поддержания документации AI-KOD системы.

**Основные принципы MBB V6.0:**
- **Single Source of Truth** - каждый документ отвечает за свою область
- **Tier-based Decomposition** - разделение больших файлов на логические модули  
- **Semantic Organization** - логическая структура папок и файлов
- **Cross-Reference Integrity** - поддержание актуальных связей между документами
- **Automated Validation** - проверка соответствия стандартам

## 📚 Структура MBB

### Core MBB Documentation

1. [Principles](principles.md): Главные принципы и философия организации документации. Читать для понимания основных правил работы с контентом.

2. [Architectural Approaches](architectural-approaches.md): Рекомендуемые agent-friendly подходы к структуре проекта, client SDK, GUI contracts, design systems и POM/test-id discipline. Читать при проектировании архитектуры и при оформлении соответствующих разделов Memory Bank.

3. [Delivery Docs Guide](delivery-docs-guide.md): Как разводить `ADR`, `epic`, `feature`, `spec`, `protocol` и другие delivery-oriented docs, чтобы документация помогала traceability и acceptance, а не дублировала сама себя.

4. [Scenario Docs Guide](scenario-docs-guide.md): Как оформлять `SCN-*` сценарии как executable verification contracts, отличать planned anchors от full contracts и строить domain overlays без потери канонического flat catalog.

5. [Duo Files Guide](duo-files-guide.md): Правила миграции из duo/ структуры в docs/ организацию. Читать при работе с legacy файлами и планировании миграции документации.

6. [Indexing Guide](indexing-guide.md): Стандарты создания навигационных индексов с аннотированными ссылками. Читать для создания index.md файлов с правильными parent-child связями.

7. [Frontmatter Standards](frontmatter-standards.md): Полные правила YAML метаданных включая required и optional поля. Читать для корректного оформления frontmatter в новых документах.

8. [Cross-References](cross-references.md): JSDoc ↔ Markdown интеграция с двунаправленными ссылками. Читать для настройки связей между кодом и документацией.

9. [C4 Model](c4-model.md): Применение C4 архитектурной модели к структуре документации. Читать для правильного назначения c4_level и архитектурного структурирования.

10. [Templates](templates/): Готовые шаблоны документации для разных типов файлов (component, subsystem, epic, feature, spec, protocol, scenario). Использовать для быстрого создания новых документов с правильной структурой MBB V6.0 и полным frontmatter.

## 🏗️ V6.0 Memory Bank Architecture

### Complete Structure
```
.memory-bank/
├── docs/                    # 📚 Main Documentation (MBB Tier 1-3)
│   ├── index.md            # Master documentation index
│   ├── api/                # API Layer Documentation
│   │   ├── di-container/   # Dependency Injection
│   │   ├── route-factories/ # Route management
│   │   └── services/       # API services
│   ├── orchestrator/       # Core Orchestrator Components
│   │   ├── state-management/ # StateManager & LockManager
│   │   ├── navigation/     # NavigationEngineV2
│   │   ├── validation/     # ValidationService
│   │   ├── observability/ # ObservabilityService
│   │   ├── event-bus/     # WorkflowEventBus
│   │   └── workflow-engine/ # WorkflowEngine
│   ├── worker/            # Worker System Documentation
│   │   ├── execution/     # ExecutionWorkerV4
│   │   └── configuration/ # Worker configuration
│   ├── (packages)/        # Shared packages (meta group)
│   │   ├── common/        # Common utilities
│   │   ├── workflow/      # Workflow helpers
│   │   ├── config/        # Runtime configuration
│   │   └── redis/         # Redis operations
│   ├── agents/            # Agent system
│   └── services/          # Core services
├── mbb/                   # 📜 Memory Bank Bible Rules
│   ├── index.md          # This file - MBB overview
│   ├── principles.md     # Core MBB principles
│   ├── frontmatter-standards.md
│   ├── cross-references.md
│   └── templates/        # Documentation templates
├── tech/                  # 🔧 Technical Stack Documentation
│   ├── infrastructure/   # ADR files for infrastructure
│   ├── dependencies/     # Dependency documentation
│   ├── tooling/         # Development tools
│   ├── standards/       # Technical standards
│   └── deployment/      # Deployment processes
├── epics/                # 🎭 User Stories & Features
│   ├── EP-001/ to EP-008/ # User epics
│   └── TE-001/ to TE-003/ # Technical epics
├── tests-docs/           # 🧪 Test Documentation
│   ├── strategy/         # Testing strategies
│   ├── unit/            # Unit test documentation
│   ├── e2e/             # E2E test documentation
│   └── helpers/         # Test utilities
├── commands/             # 💬 Custom Commands
│   ├── mb-index.md      # Index generation
│   ├── mb-validate.md   # Validation commands
│   └── mb-cleanup.md    # Cleanup utilities
├── templates/            # 📋 Documentation Templates
│   ├── index.md         # Templates navigation & usage guide
│   ├── component.md     # Component documentation template 
│   ├── subsystem.md     # Subsystem index template
│   ├── epic.md         # Epic documentation template
│   └── feature.md      # Feature documentation template
└── archive/              # 🗄️ Legacy & Historical Documentation
    ├── legacy-v5/       # Legacy V5 files (бывшая структура duo/)
    ├── operations/      # Refactoring operations
    └── legacy/          # Historical versions
```

> **Обозначение скобок.** Каталоги, записанные в круглых скобках `(<name>)/`, используются для смысловых группировок (meta folders). Они помогают собирать несколько пакетов или подпроектов вместе, но **не** представляют самостоятельный контейнер или уровень C4. Такая запись даёт ближайшему индексу чёткий контекст и не ломает иерархию `parent/child` в других разделах.

## Философия документации

### "What vs How"
- **docs/** - документирует ЧТО сделано в системе (техническая документация)
- **epics/** - документирует КАК ИМЕННО реализовано (пользовательские истории и фичи)

### Связь концепций
```
Epic/Feature → implements → Component (docs/)
Component → tested by → Tests (tests-docs/)
Component → built with → Technologies (tech/)
```

## Навигация по MBB

### Основные правила
- **[Принципы организации](principles.md)** - C4 модель, атомарность, Single Source of Truth
- **[Duo файлы](duo-files-guide.md)** - Правила декомпозиции и именования файлов
- **[Индексирование](indexing-guide.md)** - Shallow vs Deep индексы, аннотированные ссылки
- **[Frontmatter стандарты](frontmatter-standards.md)** - Обязательные поля и форматирование
- **[Кросс-ссылки](cross-references.md)** - JSDoc ← → Markdown связи
- **[C4 модель](c4-model.md)** - Применение C4 к структурированию документации

### Шаблоны и инструменты
- **[Шаблоны файлов](templates/)** - Готовые шаблоны для разных типов документов (component, subsystem, epic, feature) с правильным frontmatter и структурой
- **[Delivery Docs Guide](delivery-docs-guide.md)** - Как различать `epic`, `feature`, `spec` и `protocol`, чтобы delivery docs сохраняли traceability и не дублировали друг друга.
- **[Scenario Docs Guide](scenario-docs-guide.md)** - Как оформлять `SCN-*` сценарии как executable verification contracts с evidence-first outcome.
- **[Template Catalog](../templates/index.md)** - Практические инструкции и промпты для агентов (duo-файлы, implementation plans, researcher-отчёты)
- **[Команды обслуживания](./../commands/)** - Custom slash commands для поддержки MBB

### MBB V6.0 Templates Collection (NEW 2025-09-08)
- **[component.md](templates/component.md)** - Шаблон для компонентной документации с c4_level: component  
- **[subsystem.md](templates/subsystem.md)** - Шаблон для subsystem index файлов с c4_level: container
- **[epic.md](templates/epic.md)** - Короткий delivery-oriented шаблон эпика: value frame, feature map, progress, evidence.
- **[feature.md](templates/feature.md)** - Шаблон feature как minimal delivery unit: grounding, acceptance intent, evidence, closure state.
- **[spec.md](templates/spec.md)** - Шаблон SPEC как grounded implementation design: target design, migration, regression gates.
- **[protocol.md](templates/protocol.md)** - Шаблон protocol для фактического следа delivery/remediation цикла с links на runs и evidence.
- **[scenario.md](templates/scenario.md)** - Шаблон `SCN-*` сценария для platform/lifecycle/golden verification с phases, evidence и pass criteria.

## Качественная документация

### Принципы написания
- **Просто и ясно** - без усложнений и многословности
- **Лаконично** - все важные факты включены, лишнее убрано
- **Логично** - информация организована концептуально
- **Актуально** - только актуальные версии, устаревшее в архив

### Стиль изложения
- Активный залог предпочтительнее пассивного
- Конкретные примеры вместо абстрактных описаний  
- Аннотированные ссылки с объяснением "зачем читать"
- Структурированные списки вместо сплошного текста

## Процесс сопровождения

### Регулярные задачи
1. **Обновление индексов** - при добавлении новых файлов
2. **Проверка кросс-ссылок** - валидация работоспособности ссылок
3. **Архивация устаревшего** - перенос неактуальных файлов в archive/
4. **Валидация frontmatter** - проверка соответствия стандартам

### Автоматизация
- Custom команды для обслуживания (`/mb-index`, `/mb-validate`, etc.)
- Pre-commit hooks для проверки frontmatter
- CI валидация структуры Memory Bank

## Критерии качества Memory Bank

### Структурные показатели
- ✅ Все файлы имеют корректный frontmatter
- ✅ Все индексы актуальны и содержат аннотации
- ✅ Кросс-ссылки работают в обе стороны
- ✅ Нет orphan файлов без ссылок

### Содержательные показатели  
- ✅ Каждая концепция имеет единственный источник правды
- ✅ Duo файлы декомпозированы по размеру (<800 строк)
- ✅ Эпики покрывают всю функциональность системы
- ✅ Технологический стек полностью документирован

### Операционные показатели
- ✅ Архив организован и проиндексирован
- ✅ Custom команды функционируют корректно
- ✅ Агенты находят нужную информацию быстро

## Использование агентами

### Онбординг процесс
1. Читать **главный индекс** (.memory-bank/index.md)
2. Изучать **Memory Bank Bible** (этот файл)
3. Использовать **аннотированные ссылки** для навигации
4. Применять **custom команды** для обслуживания

### Best practices
- Всегда начинать с индексов перед поиском конкретной информации
- Использовать description и purpose из frontmatter для быстрой оценки релевантности
- Следовать аннотированным ссылкам для углубления в тему
- Применять /mb-find-orphans для поиска потерявшихся файлов

---

**Memory Bank Bible создан для обеспечения консистентности, полноты и актуальности базы знаний проекта AI-KOD. Следование этим принципам критически важно для эффективной работы как людей, так и ИИ-агентов с документацией проекта.**
