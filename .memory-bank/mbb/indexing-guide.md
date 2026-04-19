---
file: .memory-bank/mbb/indexing-guide.md
description: 'MBB Rule: Indexing Guide - shallow vs deep индексы, аннотированные ссылки, навигационные паттерны'
purpose: Изучить для понимания как правильно структурировать навигацию по Memory Bank
version: '6.0.0'
date: '2025-09-08'
status: ACTIVE
c4_level: 'standard'
tags: [indexing, navigation, shallow-index, deep-index, annotations]
parent: '.memory-bank/mbb/index.md'
architecture: 'V6.0 MBB Standards'
related_files:
  - .memory-bank/mbb/duo-files-guide.md
  - .memory-bank/mbb/frontmatter-standards.md
history:
  - version: 1.0.0
    date: 2025-01-06
    changes: Created indexing guide for MBB
---

# Indexing Guide

## Концепция индексирования

**Индексные файлы** - это навигационные файлы `index.md`, которые обеспечивают быстрое понимание содержимого папок и помогают агентам эффективно находить нужную информацию.

### Принципы индексирования
- **Аннотированные ссылки** - каждая ссылка содержит описание содержимого
- **Логическая группировка** - связанные концепции группируются вместе
- **Актуальность** - индексы обновляются при изменении содержимого папок
- **Машиночитаемость** - структура понятна как людям, так и ИИ-агентам

> 📌 **Группировки в скобках:** каталоги вида `(packages)/`, `(archive)/`, `(legacy)/` используются как логические группы. Они не вводят новый контейнер и должны явно описывать свою роль в `index.md` (например, «meta-группа shared packages»). Документы внутри таких групп обязаны ссылаться на контейнеры, которым служат.

## Типы индексов

### Shallow Index (Поверхностный индекс)

**Описывает только файлы текущей папки без вложенных папок.**

```yaml
# frontmatter
index_type: shallow
```

**Пример shallow индекса:**
```markdown
# API Subsystem

## Components
- [API Overview](api.md): Общий обзор API подсистемы и её роли в системе
- [Route Factories](route-factories.md): Фабрики для создания API routes с dependency injection
- [Error Handling](error-handling.md): Централизованная обработка ошибок в API endpoints

## Configuration
- [API Config](api-config.md): Конфигурация API сервера и middleware setup
- [Rate Limiting](rate-limiting.md): Настройка лимитов для защиты API от abuse
```

**Когда использовать:**
- Папки с 3-7 файлами
- Простая структура без глубокой вложенности  
- Все файлы на одном уровне абстракции

### Deep Index (Глубокий индекс)  

**Описывает файлы на несколько уровней вниз от текущей папки.**

```yaml
# frontmatter  
index_type: deep
```

**Пример deep индекса:**
```markdown
# Orchestrator Subsystem

## Overview
- [Orchestrator](orchestrator.md): V7 Event-driven orchestration architecture overview

## Core Components

### State Management
- [State Management](state-management/state.md): Centralized workflow state management
- [State Implementation](state-management/state-implementation.md): StateCoreService and LockManager details
- [Lock Manager](state-management/lock-manager.md): Distributed locking for concurrent operations

### Navigation System  
- [Navigation Engine](navigation/navigation.md): NavigationEngineV2 with strategy pattern architecture
- [Navigation Strategies](navigation/navigation-strategies.md): 7 navigation strategies for different workflow patterns
- [WCALL Implementation](navigation/wcall.md): Workflow call mechanism for subworkflow execution

### Event-driven Architecture
- [Event Bus](event-bus/event-bus.md): WorkflowEventBus integration for V7 architecture
- [Event Handlers](event-bus/event-handlers.md): Priority-based event processing system
```

**Когда использовать:**
- Сложные папки с >5 подпапками
- Многоуровневая иерархия файлов
- Нужен обзор всей "ветки" документации

### Hybrid Index (Гибридный индекс)

**Комбинирует shallow и deep подходы для разных секций.**

```markdown
# Memory Bank

## L1: System Level (Shallow)
- [Product](product.md): AI-KOD product overview and target users
- [Architecture](architecture.md): High-level system architecture

## L2: Subsystems (Deep)

### API Subsystem
- [API Overview](api/api.md): REST API architecture and design principles  
- [DI Container](api/architecture/dependency-injection.md): Dependency injection setup
- [Route Factories](api/architecture/route-factories.md): Dynamic route creation patterns

### Orchestrator Subsystem  
- [Orchestrator](orchestrator/orchestrator.md): Event-driven workflow orchestration
- [State Management](orchestrator/state-management/state.md): Centralized state operations
- [Navigation](orchestrator/navigation/navigation.md): Workflow routing strategies
```

## Структура индексного файла

### Frontmatter для индексов

```yaml
---
file: .memory-bank/docs/orchestrator/index.md
description: Navigation index for Orchestrator subsystem components and documentation
purpose: Use to quickly find relevant orchestrator documentation and understand system structure
version: 1.0.0
date: 2025-01-06
status: ACTIVE
c4_level: L2
index_type: deep  # shallow | deep | hybrid
coverage_depth: 2  # How many levels down this index covers
tags: [index, orchestrator, navigation, subsystem]
parent: .memory-bank/docs/index.md
related_files:
  - .memory-bank/docs/orchestrator/orchestrator.md
history:
  - version: 1.0.0
    date: 2025-01-06
    changes: Created deep index for orchestrator subsystem
---
```

### Основные секции

#### 1. Overview секция
```markdown
# Subsystem/Component Name

## Overview
Brief description of what this subsystem/component does and its role in the larger system.

Key characteristics:
- Responsibility 1
- Responsibility 2  
- Responsibility 3
```

#### 2. Navigation секция
```markdown
## Core Components
- [Component 1](component1.md): Description and when to read this
- [Component 2](component2.md): Description and when to read this

## Implementation Details
- [Implementation 1](impl/impl1.md): Detailed implementation of specific feature
- [Implementation 2](impl/impl2.md): Technical details for advanced users

## Additional Resources
- [Troubleshooting](troubleshooting.md): Common issues and their solutions
- [Performance](performance.md): Performance optimization guidelines
```

## Аннотированные ссылки в индексах

### Формат аннотаций

**Стандартная структура:**
```markdown
- [File Display Name](path/to/file.md): Content description and reading purpose
```

**Компоненты аннотации:**
1. **Display Name** - человеко-читаемое название
2. **File Path** - относительный путь к файлу  
3. **Content Description** - что содержит файл (1 предложение)
4. **Reading Purpose** - для чего читать (1 предложение)

### Примеры качественных аннотаций

**✅ Хорошие аннотации:**
```markdown
- [State Management](state-management/state.md): Centralized workflow state management with Redis-backed persistence. Read to understand how task and step states are managed across the system.

- [Navigation Strategies](navigation/strategies.md): Complete documentation of 7 navigation strategies used by NavigationEngineV2. Essential for understanding workflow routing and implementing custom navigation logic.

- [Event Bus Integration](event-bus/event-bus.md): V7 WorkflowEventBus architecture with priority-based handlers. Read to understand event-driven communication between system components.
```

**❌ Плохие аннотации:**
```markdown
- [State file](state.md): About state management
- [Navigation](navigation.md): Navigation documentation  
- [Events](events.md): Event stuff
```

### Специальные паттерны аннотаций

#### Для архитектурных файлов
```markdown
- [Component Architecture](component-architecture.md): V7 architecture patterns and design decisions. Read for deep technical understanding of component design.
```

#### Для API документации  
```markdown
- [Component API](component-api.md): Complete API reference with parameters and examples. Use as reference when integrating with this component.
```

#### Для troubleshooting
```markdown
- [Component Troubleshooting](component-troubleshooting.md): Common issues, diagnostic steps, and solutions. Consult when experiencing problems with this component.
```

#### Для examples
```markdown
- [Component Examples](component-examples.md): Practical code examples and use cases. Read to see real-world implementation patterns.
```

## Логическая группировка

### Группировка по функциональности

```markdown
## Core Functionality
- [Main Feature](main.md): Primary functionality description
- [Secondary Feature](secondary.md): Supporting functionality description

## Configuration & Setup
- [Configuration](config.md): Setup and configuration options  
- [Environment](environment.md): Environment-specific settings

## Advanced Features
- [Advanced Feature 1](advanced1.md): Complex functionality for power users
- [Advanced Feature 2](advanced2.md): Optional advanced capabilities
```

### Группировка по аудитории

```markdown
## Quick Start (New Users)
- [Getting Started](getting-started.md): Basic setup and first steps
- [Common Patterns](patterns.md): Typical usage patterns

## Reference (Regular Users)  
- [API Reference](api-reference.md): Complete API documentation
- [Configuration Guide](configuration.md): Detailed configuration options

## Advanced (Power Users)
- [Internals](internals.md): Internal architecture and implementation
- [Customization](customization.md): Extension and customization options
```

### Группировка по lifecycle

```markdown
## Development
- [Development Setup](dev-setup.md): Local development environment
- [Testing Guide](testing.md): How to test this component

## Deployment
- [Deployment Guide](deployment.md): Production deployment steps
- [Configuration](config.md): Production configuration

## Operations  
- [Monitoring](monitoring.md): Monitoring and alerting setup
- [Troubleshooting](troubleshooting.md): Operational issue resolution
```

## Индексы для разных уровней C4

### L1 System Level Index
```markdown
# AI-KOD System

## System Overview
- [Product Description](product.md): What AI-KOD is and who it's for
- [System Architecture](architecture.md): High-level system architecture and components
- [Subsystem Interactions](interactions.md): How major subsystems communicate

## Getting Started
- [Quick Start](quick-start.md): Basic setup and first workflow execution
- [Key Concepts](concepts.md): Fundamental concepts and terminology
```

### L2 Subsystem Level Index  
```markdown
# API Subsystem

## Subsystem Overview
- [API Architecture](api.md): REST API design and architecture patterns
- [API Contract](contract.md): External interfaces and API boundaries

## Core Components
- [Dependency Injection](di-container/container.md): Service container and dependency management
- [Route Factories](route-factories/factories.md): Dynamic route creation and middleware
- [Error Handling](error-handling.md): Centralized error processing
```

### L3 Component Level Index
```markdown
# State Management Component

## Component Overview  
- [State Management](state.md): Centralized workflow state management overview
- [State Architecture](state-architecture.md): V7 atomic operations architecture

## Implementation
- [StateCoreService](state-implementation.md): Core state management service implementation  
- [LockManagerService](lock-manager.md): Distributed locking for concurrent operations
- [State API](state-api.md): Public methods and usage patterns
```

## Поддержание индексов

### Автоматизация обновлений

**Custom command для обновления:**
```markdown
# /mb-index command
1. Scan folder structure
2. Read frontmatter from each file  
3. Generate annotated links from description + purpose
4. Group by logical categories
5. Update index.md with proper frontmatter
```

### Валидация индексов

**Проверки качества:**
- [ ] Все файлы в папке упомянуты в индексе
- [ ] Все ссылки работают (нет broken links)  
- [ ] Аннотации содержат описание И цель чтения
- [ ] Логическая группировка осмысленна
- [ ] Frontmatter содержит index_type

**Метрики качества:**
- Coverage: % файлов, упомянутых в индексах
- Link health: % рабочих ссылок
- Annotation quality: % ссылок с полными аннотациями
- Freshness: Средний возраст индексов

### Обновление при изменениях

**Triggers для обновления индексов:**
- Добавление новых файлов в папку
- Изменение описания в frontmatter
- Перемещение файлов между папками
- Архивация устаревших файлов

---

**Качественные индексы - это фундамент эффективной навигации по Memory Bank. Они превращают файловую систему в структурированную базу знаний, доступную как для людей, так и для ИИ-агентов.**
