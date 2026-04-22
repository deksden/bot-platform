---
file: .memory-bank/mbb/cross-references.md
description: 'MBB Rule: Cross-References - JSDoc теги, Markdown ссылки, двусторонняя связность'
purpose: Изучить для понимания как создать двусторонние ссылки между кодом и документацией  
version: '6.1.0'
date: '2026-04-20'
status: ACTIVE
c4_level: 'standard'
tags: [cross-references, jsdoc, markdown, code-documentation, bidirectional-links]
parent: '.memory-bank/mbb/index.md'
architecture: 'V6.0 MBB Standards'
related_files:
  - .memory-bank/mbb/frontmatter-standards.md
  - .memory-bank/tech/standards/jsdoc-standards.md
history:
  - version: 6.1.0
    date: 2026-04-20
    changes: Added split-bootstrap hygiene rules for copied docs: stale repo-name detection, internal-link validation, and explicit transition-stub wording when a target doc family is not migrated yet.
  - version: 1.0.0
    date: 2025-01-06
    changes: Created cross-references guide for MBB
---

# Cross-references Guide

## Концепция кросс-ссылок

**Кросс-ссылки** - это двусторонние связи между кодом и документацией, которые обеспечивают:
- **Навигацию** от кода к архитектурной документации
- **Трассировку** от документации к реализации
- **Синхронность** между техническими решениями и их описанием

### Принципы кросс-ссылочной системы
- **Двусторонность** - ссылки работают в обе стороны: код ↔ документация
- **Актуальность** - ссылки обновляются при рефакторинге  
- **Специфичность** - ссылки ведут на конкретные секции, а не на общие файлы
- **Контекстность** - ссылки содержат аннотации о цели перехода

## Split / bootstrap hygiene for copied docs

Если Memory Bank или его шаблоны копируются в новый repo во время split/bootstrap:
- проверь, не остались ли в тексте старые repo-name / product-name ссылки;
- проверь, что каждая внутренняя markdown-ссылка действительно существует в новом repo;
- если owning doc family ещё не перенесён, не оставляй битую ссылку:
  - либо замени её на существующий repo-local hub;
  - либо явно пометь место как transition / bootstrap-level reference.

Правило:
- “документ существует, но ведёт в никуда” считается дефектом документации, а не допустимым временным состоянием;
- copy artifacts не должны маскироваться под актуальную repo-local truth.

## JSDoc теги для кода → документация

### Стандартные JSDoc теги

#### @docs тег - основная архитектурная документация

```typescript
/**
 * @fileoverview StateCoreService - Centralized state management  
 * @version 5.2.0
 * 
 * @docs {@link .memory-bank/docs/orchestrator/state-management/state.md} Main architecture documentation
 * @docs {@link .memory-bank/docs/orchestrator/state-management/state-architecture.md} V7 architectural patterns  
 * @see {@link .memory-bank/docs/orchestrator/state-management/state-implementation.md} Implementation details
 * @see {@link .memory-bank/epics/EP-001/FT-001-04/ft-001-04.md} Feature specification
 */
export class StateCoreService implements IStateCoreService {
  // Implementation...
}
```

**Правила @docs тега:**
- Ссылается на **основную архитектурную документацию** компонента
- Максимум 2-3 @docs ссылки на файл  
- Описание после ссылки объясняет **тип документации**

#### @see тег - дополнительная и смежная документация

```typescript
/**
 * Update task status atomically with distributed lock
 * 
 * @param taskId - Task identifier  
 * @param status - New task status
 * @returns Promise resolving when update completed
 * 
 * @docs {@link .memory-bank/docs/orchestrator/state-management/contract.md} State operations & locks contract
 * @see {@link .memory-bank/docs/tests-docs/index.md} Testing hub (unit/integration/e2e/smoke)
 * @see {@link .memory-bank/docs/orchestrator/navigation/index.md} Related navigation state updates
 */
async updateTaskStatus(taskId: string, status: TaskStatus): Promise<void> {
  // Implementation details...
}
```

**Правила @see тега:**
- Ссылается на **смежную документацию**, тесты, примеры
- Может быть 3-5 @see ссылок на метод/класс
- Описание объясняет **связь с текущим кодом**

### Форматирование JSDoc ссылок

#### Стандартный формат ссылок

```typescript
@docs {@link path/to/file.md} Brief description of what documentation contains
@see {@link path/to/file.md} Explanation of relevance to current code
```

#### Примеры правильного форматирования

**✅ Правильно:**
```typescript
/**
 * @docs {@link .memory-bank/docs/orchestrator/navigation/navigation.md} NavigationEngineV2 architecture overview
 * @see {@link .memory-bank/docs/orchestrator/navigation/strategies.md} Strategy pattern implementation details
 * @see {@link .memory-bank/epics/EP-001/FT-001-03/ft-001-03.md} Navigation feature requirements
 */
export class NavigationEngineV2 {
  // ...
}
```

**❌ Неправильно:**
```typescript
/**
 * @docs {@link navigation.md} About navigation  // Неполный путь + плохое описание
 * @see {@link some-file.md} See this file     // Неинформативное описание
 * @see navigation-file                        // Не ссылка вообще
 */
```

#### Специфичность ссылок

**Ссылки на конкретные секции (предпочтительно):**
```typescript
/**
 * @docs {@link .memory-bank/docs/orchestrator/state-management/state.md#atomic-operations} Atomic operations section
 * @see {@link .memory-bank/docs/orchestrator/state-management/state-api.md#updateTaskStatus} API method documentation
 */
```

**Ссылки на файлы целиком (допустимо):**
```typescript
/**
 * @docs {@link .memory-bank/docs/orchestrator/state-management/state.md} Complete state management documentation
 */
```

### JSDoc теги для разных типов кода

#### Сервисы и основные классы

```typescript
/**
 * @fileoverview WorkflowOrchestrator - Central workflow coordination service
 * @version 5.2.0
 * 
 * @docs {@link .memory-bank/docs/orchestrator/index.md} Orchestrator overview
 * @docs {@link .memory-bank/docs/orchestrator/architecture-v7.md} V7 event-driven architecture  
 * @see {@link .memory-bank/docs/orchestrator/event-bus/index.md} Event bus integration
 * @see {@link .memory-bank/archive/epics/EP-001/index.md} Workflow orchestration epic (архив)
 * @see {@link .memory-bank/docs/tests-docs/index.md} Testing documentation
 */
export class WorkflowOrchestrator {
  // ...
}
```

#### Утилитарные функции

```typescript
/**
 * Calculate string similarity using Levenshtein distance
 * 
 * @param str1 - First string to compare
 * @param str2 - Second string to compare  
 * @returns Similarity score between 0 and 1
 * 
 * @docs {@link .memory-bank/docs/(packages)/common/string-utils.md} String utilities documentation
 * @see {@link .memory-bank/docs/orchestrator/navigation/suggestions.md} Usage in navigation suggestions
 */
export function calculateStringSimilarity(str1: string, str2: string): number {
  // ...
}
```

#### Интерфейсы и типы

```typescript
/**
 * Core interface for state management operations
 * 
 * @docs {@link .memory-bank/docs/orchestrator/state-management/state-api.md} Complete API reference
 * @see {@link .memory-bank/docs/orchestrator/state-management/state-architecture.md} Architecture context
 */
export interface IStateCoreService {
  updateTaskStatus(taskId: string, status: TaskStatus): Promise<void>;
  getTask(taskId: string): Promise<Task | null>;
  // ...
}
```

## Markdown ссылки документация → код

### Ссылки на implementation files в frontmatter

```yaml
implementation_files:
  - apps/server/src/domain/repositories/task.repository.ts
  - apps/server/src/services/state/lock-manager.service.ts
  - apps/server/src/services/v7/event-orchestrator.ts
```

### Ссылки внутри документации

#### Секция Implementation

```markdown
## Implementation

Core service: [TaskRepository](../../../apps/server/src/domain/repositories/task.repository.ts:224)

Key methods:
- [`updateStatus()`](../../../apps/server/src/domain/repositories/task.repository.ts:409) - Atomic status updates with locking
- [`findById()`](../../../apps/server/src/domain/repositories/task.repository.ts:224) - Task retrieval with validation

Tests: [state-core.test.ts](../../../tests/unit/state-core.test.ts)
```

#### Inline ссылки на код

```markdown
The StateManager uses distributed locking implemented in 
[LockManagerService](../../apps/server/src/services/state/lock-manager.service.ts:50) 
to ensure atomic operations across multiple workers.

Key architectural decision is documented in the 
[`acquireLock()` method](../../apps/server/src/services/state/lock-manager.service.ts:167-210)
which implements exponential backoff retry strategy.
```

#### Ссылки с номерами строк

**Формат:** `file.ts:line` или `file.ts:start-end`

```markdown
- [TaskRepository constructor](../../apps/server/src/domain/repositories/task.repository.ts:131-170)
- [updateStatus implementation](../../apps/server/src/domain/repositories/task.repository.ts:409)
- [Error handling pattern](../../apps/server/src/services/state/lock-manager.service.ts:249-282)
```

### Секции для разных типов ссылок

#### Architecture + Implementation секция

```markdown
## Architecture & Implementation

**Design Pattern:** State Manager implements Repository pattern with atomic operations.

**Core Components:**
- [TaskRepository](../../apps/server/src/domain/repositories/task.repository.ts) - Main state operations
- [LockManagerService](../../apps/server/src/services/state/lock-manager.service.ts) - Distributed locking  
- [RedisCore](../../packages/redis/src/redis-core.ts) - Low-level Redis operations

**Key Algorithms:**
- [Atomic State Update](../../apps/server/src/domain/repositories/task.repository.ts:451-520) - ACID-compliant state changes
- [Lock Acquisition](../../apps/server/src/services/state/lock-manager.service.ts:232-282) - Distributed lock with timeout
```

#### Testing секция

```markdown
## Testing

**Unit Tests:**
- [TaskRepository Global Vars](../../tests/unit/domain/task.repository.global-vars.test.ts) - Core functionality testing
- [StepRepository Partial Updates](../../tests/unit/domain/step.repository.partial.test.ts) - Locking / atomic updates integration

**E2E Scenarios:**
- [WF Total (E2E)](../../tests/e2e/wf-total/wf-total.test.ts) - End-to-end workflow flow
- [Pause/Resume (E2E)](../../tests/e2e/control/pause-resume.real.test.ts) - Control-flow scenario  

**Test Documentation:**  
- [TaskRepository Unit Testing](../tests-docs/unit/task-repository.md) - Testing approach and patterns
```

#### Related Code секция

```markdown
## Related Code

**Dependencies:**
- [UnifiedRedisService](../../packages/redis/src/unified-redis.service.ts) - Redis operations abstraction
- [V7EventBus](../../apps/server/src/services/v7/event-bus.ts) - Event system integration

**Dependents:**  
- [EventOrchestrator](../../apps/server/src/services/v7/event-orchestrator.ts) - Main orchestrator service
- [NavigationEngineV7](../../apps/server/src/services/navigation/navigation-engine-v7.service.ts) - State-dependent navigation
```

## Валидация кросс-ссылок

### Автоматические проверки

#### Проверка JSDoc ссылок

```bash
# Поиск всех @docs и @see тегов
grep -r "@docs\|@see" --include="*.ts" apps/ packages/

# Проверка что файлы по ссылкам существуют  
# Валидация формата ссылок
# Проверка что описания не пустые
```

#### Проверка Markdown ссылок

```bash
# Поиск всех ссылок на код в документации
grep -r "\](.*\.ts" .memory-bank/docs/

# Проверка существования файлов
# Валидация номеров строк (если указаны)
# Проверка доступности файлов
```

### Custom command для валидации ссылок

```markdown
# /mb-sync-refs команда:
1. Сканирует все .ts файлы на JSDoc теги
2. Проверяет существование файлов в @docs/@see ссылках
3. Сканирует все .md файлы на ссылки на код  
4. Проверяет что implementation_files существуют
5. Генерирует отчет о broken links
6. Предлагает исправления для неработающих ссылок
```

### Метрики качества кросс-ссылок

**Coverage метрики:**
- **Code→Doc Coverage:** % .ts файлов с @docs тегами
- **Doc→Code Coverage:** % .md файлов со ссылками на implementation  
- **Bidirectional Coverage:** % концепций с двусторонними ссылками

**Quality метрики:**
- **Link Health:** % рабочих ссылок
- **Annotation Quality:** % ссылок с информативными описаниями  
- **Specificity:** % ссылок на конкретные секции/методы

## Best Practices

### Создание новых кросс-ссылок

1. **При написании кода:**
   - Добавить @docs на главную архитектурную документацию
   - Добавить @see на смежную документацию и тесты
   - Использовать специфичные описания ссылок

2. **При написании документации:**
   - Указать implementation_files в frontmatter
   - Создать Implementation секцию со ссылками на ключевой код
   - Добавить ссылки на тесты и примеры

3. **При рефакторинге:**
   - Обновить JSDoc ссылки при перемещении файлов
   - Актуализировать Markdown ссылки при изменении structure
   - Проверить работоспособность всех ссылок

### Поддержание актуальности

**Workflow обновления:**
1. Code changes → Update JSDoc tags
2. Documentation changes → Update implementation_files  
3. File moves → Update all references
4. Regular validation → Fix broken links

**Integration с CI/CD:**
```yaml
# GitHub Actions check
- name: Validate cross-references
  run: pnpm mb-sync-refs --validate-only
```

### Антипаттерны

**❌ Избегать:**
- Ссылки на несуществующие файлы
- Общие описания ("See documentation")  
- Односторонние ссылки (только код→док или только док→код)
- Ссылки на устаревшие файлы
- Циклические ссылки без ценности

**✅ Стремиться к:**  
- Актуальные двусторонние ссылки
- Специфичные описания цели ссылки
- Ссылки на конкретные секции/методы
- Регулярная валидация и обновление
- Интеграция с процессом разработки

---

**Качественная система кросс-ссылок превращает код и документацию в связанную сеть знаний, где каждая концепция имеет как техническую реализацию, так и архитектурное обоснование.**
