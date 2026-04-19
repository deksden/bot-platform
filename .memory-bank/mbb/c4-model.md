---
file: .memory-bank/mbb/c4-model.md
description: 'MBB Rule: C4 Model - применение к структурированию документации Memory Bank'
purpose: Изучить для понимания как C4 архитектурная модель адаптирована для организации технической документации
version: '6.0.0'
date: '2025-09-08'
status: ACTIVE
c4_level: 'standard'
tags: [c4-model, architecture, documentation-structure, levels]
parent: '.memory-bank/mbb/index.md'
architecture: 'V6.0 MBB Standards'
related_files:
  - .memory-bank/mbb/principles.md
  - .memory-bank/mbb/duo-files-guide.md
history:
  - version: 1.0.0
    date: 2025-01-06
    changes: Created C4 model documentation for MBB
---

# C4 Model для Memory Bank

## Концепция C4 в документации

**C4 Model** - это подход к структурированию архитектурной документации по четырем уровням абстракции. В Memory Bank мы адаптируем первые три уровня для организации технической документации.

### Адаптация C4 для документации
- **L1 System Level** - Высокоуровневое понимание всей системы
- **L2 Subsystem Level** - Детальное описание основных подсистем  
- **L3 Component Level** - Глубокое техническое описание компонентов
- **L4 Code Level** - Непосредственно исходный код (не документируется отдельно)

## L1: System Level Documentation

### Назначение
Обеспечить **высокоуровневое понимание системы AI-KOD в целом** для новых участников команды, stakeholders и архитекторов.

### Местоположение
```
.memory-bank/docs/
├── product.md        # Что это за система, для кого, какие проблемы решает
├── structure.md      # Файловая структура проекта с аннотациями  
├── architecture.md   # Системная архитектура, ключевые компоненты
└── interactions.md   # Как подсистемы взаимодействуют между собой
```

### Контент L1 файлов

#### product.md - Product Overview
```markdown
# AI-KOD Product Overview

## What is AI-KOD?
LLM Agent Workflow Orchestration System for automating complex development processes.

## Target Users
- 👨‍💻 Developers automating complex processes with AI
- 🤖 DevOps engineers implementing AI-driven CI/CD  
- 🏢 Development teams using agent-based automation
- 🚀 Startups scaling AI-powered workflows

## Problems Solved
- Complex multi-step process orchestration
- Parallel execution with fan-out/fan-in patterns  
- Real-time monitoring of agent execution
- Scalable distributed worker architecture
```

#### architecture.md - System Architecture
```markdown
# AI-KOD System Architecture

## High-Level Architecture
[System-level diagram showing major subsystems]

## Key Subsystems
- **API Server**: REST API with dependency injection
- **Orchestrator**: Workflow execution engine  
- **Workers**: Distributed agent execution
- **System**: Real-time monitoring UI
- **Shared Packages**: Common utilities and types

## Data Flow
[Diagram showing how data flows between subsystems]

## Technology Stack Overview
- Backend: Node.js + TypeScript + Redis
- Frontend: Next.js + React + SSE  
- Agents: Claude SDK integration
- Queue: BullMQ for job processing
```

#### interactions.md - Subsystem Interactions
```markdown  
# Subsystem Interactions

## API ↔ Orchestrator
- REST endpoints trigger workflow execution
- Event-driven status updates via WorkflowEventBus
- Shared state through Redis persistence

## Orchestrator ↔ Workers
- Job distribution via BullMQ queues
- Status reporting through Redis
- File-based isolation for execution

## System ↔ API  
- Real-time updates via Server-Sent Events
- WebSocket connections for live monitoring
- RESTful data fetching for historical data
```

### L1 Характеристики
- **Аудитория:** Новые члены команды, архитекторы, stakeholders
- **Глубина:** High-level concepts, no implementation details  
- **Диаграммы:** System context, container diagrams
- **Объем:** 200-400 строк на файл

## L2: Subsystem Level Documentation

### Назначение  
Детальное описание **границ, контрактов и внутренней архитектуры подсистем** для разработчиков, работающих с конкретными частями системы.

### Местоположение
```
.memory-bank/docs/
├── api/              # API Subsystem
│   ├── index.md      # Navigation index (deep)
│   ├── contract.md   # External interfaces, API boundaries
│   ├── patterns.md   # Architectural patterns used  
│   └── api.md        # Subsystem overview
├── orchestrator/     # Orchestrator Subsystem  
├── worker/          # Worker Subsystem
└── (packages)/      # Shared Packages (meta group)
```

### Структура L2 подсистемы

#### index.md - Navigation Index
```markdown
# API Subsystem

## Subsystem Overview
- [API Architecture](api.md): REST API design and core principles
- [API Contract](contract.md): External interfaces and API boundaries  
- [Architectural Patterns](patterns.md): DI Container, Factory Pattern, middleware

## Core Components
- [Dependency Injection](di-container/container.md): Service container and lifecycle management
- [Route Factories](route-factories/factories.md): Dynamic route creation with DI integration
- [Error Handling](error-handling.md): Centralized error processing middleware

## Configuration & Deployment  
- [API Configuration](api-config.md): Environment setup and service configuration
- [Middleware Setup](middleware.md): Authentication, rate limiting, CORS setup
```

#### contract.md - Subsystem Contract
```markdown
# API Subsystem Contract

## External Interfaces

### REST API Endpoints
- `POST /api/workflows/{id}/run` - Trigger workflow execution
- `GET /api/tasks/{id}` - Get task status and results  
- `GET /api/tasks/{id}/stream` - Real-time task updates via SSE

### Events Published  
- `WorkflowStarted` - When workflow execution begins
- `TaskCompleted` - When individual task completes
- `WorkflowCompleted` - When entire workflow finishes

### Events Consumed
- `StepCompleted` - From Workers via WorkflowEventBus
- `StepFailed` - Error notifications from execution

## Dependencies
- **Orchestrator**: Workflow execution requests
- **Redis**: State persistence and caching
- **BullMQ**: Job queue management

## Service Level Agreements  
- API Response Time: <200ms for 95% of requests
- Availability: 99.9% uptime requirement
- Rate Limiting: 1000 requests/minute per client
```

#### patterns.md - Architectural Patterns
```markdown
# API Subsystem Patterns

## Dependency Injection Pattern
- **Problem:** Service instantiation and lifecycle management  
- **Solution:** DI Container with factory-based service creation
- **Benefits:** Testability, modularity, configuration flexibility

## Factory Pattern for Routes
- **Problem:** Dynamic route creation with varying middleware  
- **Solution:** Route factories with dependency injection
- **Benefits:** Consistent middleware application, easy testing

## Middleware Chain Pattern
- **Problem:** Cross-cutting concerns (auth, logging, validation)
- **Solution:** Composable middleware chain with standardized interface
- **Benefits:** Reusability, separation of concerns, configurability
```

### L2 Характеристики
- **Аудитория:** Разработчики, работающие с подсистемой
- **Глубина:** Architectural patterns, interfaces, contracts
- **Диаграммы:** Component diagrams, sequence diagrams
- **Объем:** 300-600 строк на файл

## L3: Component Level Documentation

### Назначение
Глубокое техническое описание **отдельных компонентов** с деталями реализации, API reference и примерами использования.

### Местоположение
```
.memory-bank/docs/orchestrator/
├── state-management/     # State Management Component
│   ├── state.md         # Component overview  
│   ├── state-architecture.md  # V7 architecture details
│   ├── state-implementation.md # Code-level details  
│   └── state-api.md     # API reference
├── navigation/          # Navigation Component
│   ├── navigation.md    # Component overview
│   ├── navigation-strategies.md # Strategy pattern details
│   └── navigation-examples.md   # Usage examples  
└── event-bus/          # Event Bus Component
    ├── event-bus.md     # Component overview
    ├── event-handlers.md # Handler implementation
    └── event-flow.md    # Event flow patterns
```

### Структура L3 компонента

#### Component Overview (component.md)
```markdown  
# State Management Component

## Purpose
Centralized workflow state management with atomic operations and distributed locking.

## Key Responsibilities  
- Task and step status tracking
- Atomic state updates with Redis persistence  
- Distributed locking for concurrent operations
- State consistency across multiple workers

## Architecture Overview
[Component diagram showing StateCoreService, LockManager, Redis integration]

## Quick Start
```typescript
const stateService = container.get<IStateCoreService>('StateCoreService');
await stateService.updateTaskStatus(taskId, TaskStatus.COMPLETED);
const task = await stateService.getTask(taskId);
```

## Detailed Documentation
- [State Architecture](state-architecture.md): V7 atomic operations and event-driven integration  
- [State Implementation](state-implementation.md): StateCoreService and LockManager implementation details
- [State API Reference](state-api.md): Complete method documentation with examples
```

#### Implementation Details (component-implementation.md)  
```markdown
# State Management Implementation

## StateCoreService Implementation

### Core Methods
```typescript
class StateCoreService implements IStateCoreService {
  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<void> {
    // 1. Acquire distributed lock
    const lock = await this.lockManager.acquireLock(`task:${taskId}`);
    
    try {
      // 2. Read current state  
      const task = await this.redis.getTask(taskId);
      
      // 3. Validate state transition
      this.validateStatusTransition(task.status, status);
      
      // 4. Update atomically
      await this.redis.updateTask(taskId, { status, updatedAt: Date.now() });
      
      // 5. Emit state change event
      this.eventBus.emit('TaskStatusUpdated', { taskId, status });
      
    } finally {
      // 6. Release lock
      await this.lockManager.releaseLock(lock);
    }
  }
}
```

### Error Handling Strategy
- **Lock Timeout:** 30 second timeout with exponential backoff retry
- **State Validation:** Prevents invalid status transitions  
- **Redis Failures:** Circuit breaker with fallback to in-memory cache
```

### L3 Характеристики
- **Аудитория:** Разработчики, модифицирующие компонент
- **Глубина:** Implementation details, algorithms, API reference
- **Диаграммы:** Class diagrams, sequence diagrams, data flow
- **Объем:** 400-800 строк на файл (с декомпозицией если больше)

## Переходы между уровнями C4

### Navigation Flow

#### Top-Down Navigation (System → Components)
```
1. docs/product.md (L1)
   ↓ "Learn about system architecture"
2. docs/architecture.md (L1)  
   ↓ "Understand orchestrator subsystem"
3. docs/orchestrator/orchestrator.md (L2)
   ↓ "Deep dive into state management" 
4. docs/orchestrator/state-management/state.md (L3)
```

#### Bottom-Up Navigation (Components → System)
```
1. docs/orchestrator/state-management/state.md (L3)
   ↑ "Understand broader orchestrator context"
2. docs/orchestrator/orchestrator.md (L2)
   ↑ "See how orchestrator fits in system"  
3. docs/architecture.md (L1)
   ↑ "System-wide architectural context"
```

### Cross-Level References

#### L1 → L2 References  
```markdown
## Major Subsystems
- **Orchestrator** ([details](orchestrator/orchestrator.md)): Event-driven workflow execution engine
- **API Server** ([details](api/api.md)): REST API with dependency injection architecture
```

#### L2 → L3 References
```markdown  
## Core Components
- **State Management** ([details](state-management/state.md)): Atomic state operations with Redis
- **Navigation Engine** ([details](navigation/navigation.md)): Strategy-based workflow routing
```

#### L3 → L2/L1 References
```markdown
## Context
This component is part of the **Orchestrator** subsystem ([overview](../orchestrator.md))
within the broader **AI-KOD system** ([architecture](../../architecture.md)).
```

## Frontmatter для C4 уровней

### L1 System Level
```yaml
c4_level: L1
tags: [system, architecture, overview, product]  
target_audience: [architects, stakeholders, new-team-members]
```

### L2 Subsystem Level  
```yaml
c4_level: L2
tags: [subsystem, contracts, boundaries, integration]
target_audience: [developers, subsystem-owners, integrators]
```

### L3 Component Level
```yaml  
c4_level: L3
tags: [component, implementation, api-reference, detailed]
target_audience: [developers, maintainers, contributors]
```

## Валидация C4 структуры

### Проверки структуры
- [ ] L1 файлы покрывают system-wide концепции
- [ ] L2 подсистемы имеют четкие границы и контракты  
- [ ] L3 компоненты детально документированы
- [ ] Навигация между уровнями работает
- [ ] Нет пропущенных уровней в иерархии

### Метрики качества C4
- **Coverage:** % компонентов с документацией на всех уровнях
- **Navigation:** % файлов с корректными cross-level ссылками  
- **Depth Consistency:** Соответствие глубины документации заявленному C4 уровню
- **Audience Alignment:** Соответствие контента целевой аудитории уровня

---

**C4 модель превращает хаотичную техническую документацию в структурированную архитектурную систему знаний с ясной иерархией и навигацией между уровнями абстракции.**
