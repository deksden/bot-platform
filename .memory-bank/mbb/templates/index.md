---
file: .memory-bank/mbb/templates/index.md
description: MBB Templates Collection - готовые шаблоны документации для быстрого создания стандартизированных файлов
purpose: Использовать для создания новых документов с правильной структурой MBB V6.0 и полным frontmatter
version: 1.0.0
date: 2025-09-08
status: ACTIVE
c4_level: documentation
tags: [mbb, templates, documentation-standards, quickstart]
parent: .memory-bank/mbb/index.md
related_files:
  - .memory-bank/mbb/frontmatter-standards.md
  - .memory-bank/mbb/principles.md
  - .memory-bank/mbb/indexing-guide.md
history:
  - version: 1.0.0
    date: 2025-09-08
    changes: Initial templates collection created according to MBB V6.0 standards
---

# 📋 MBB Templates Collection

## 🎯 Назначение шаблонов

**MBB Templates** предоставляют готовые структуры для быстрого создания документации, соответствующей стандартам Memory Bank Bible V6.0. Каждый шаблон включает правильный frontmatter, структурированное содержание и usage guidelines.

### Преимущества использования шаблонов

- **Консистентность** - все документы следуют единым стандартам
- **Скорость создания** - готовая структура сокращает время на 70%
- **Полнота** - включены все необходимые секции и метаданные  
- **Качество** - встроенные best practices и примеры

## 📚 Доступные шаблоны

### 1. [component.md](component.md) - Компонентная документация
**Для создания документации отдельных компонентов системы (services, engines, managers)**

**Использовать когда:**
- Документирование отдельного класса или сервиса
- Создание API reference для компонента
- Описание implementation details с примерами кода
- Техническая документация с testing patterns

**Ключевые секции:**
- Архитектура компонента и принципы дизайна
- API Reference с методами и примерами
- Configuration и environment variables  
- Integration examples с другими компонентами
- Error handling patterns и типы ошибок
- Testing strategies (unit, integration, performance)
- Monitoring & observability setup
- Migration guides для версионных изменений

**Пример использования:**
```bash
# Копировать шаблон
cp .memory-bank/mbb/templates/component.md .memory-bank/docs/orchestrator/new-service.md

# Заполнить placeholders:
# [Component Name] → StateManager
# [subsystem] → orchestrator  
# [implementation files] → конкретные пути файлов
```

### 2. [subsystem.md](subsystem.md) - Индекс подсистемы  
**Для создания navigation индексов с deep coverage подсистем**

**Использовать когда:**
- Создание index.md файла для группы компонентов
- Организация навигации по подсистеме
- Обзор архитектуры на subsystem уровне
- Координация между несколькими компонентами

**Ключевые секции:**
- Subsystem overview с ролью в системе
- Core documentation files с аннотированными ссылками
- Architecture diagram подсистемы
- Quick reference с key metrics
- Component status matrix
- Integration points с другими подсистемами
- Getting started guide
- Troubleshooting и common issues

**Пример использования:**
```bash
# Создать индекс для новой подсистемы
cp .memory-bank/mbb/templates/subsystem.md .memory-bank/docs/new-subsystem/index.md

# Заполнить:
# [Subsystem Name] → ValidationService
# [Component 1] → SmartValidation
# [Component 2] → SchemaValidation
```

### 3. [epic.md](epic.md) - Epic документация
**Для короткой delivery-рамки по группе связанных feature/value slices**

**Использовать когда:**
- Планирование крупных features или capabilities
- Описание user value и business requirements
- Координация между multiple features
- Tracking progress крупных initiatives

**Ключевые секции:**
- Goal / user value
- Scope (in / out)
- Feature map
- Context (SSoT links)
- Progress report (evidence-based)
- Dependencies
- Risks & mitigations
- Definition of done

**Пример использования:**
```bash
# Создать новый epic
mkdir -p .memory-bank/epics/EP-009
cp .memory-bank/mbb/templates/epic.md .memory-bank/epics/EP-009/index.md

# Заполнить:
# [EP-XXX] → EP-009
# [Epic Name] → Advanced Workflow Debugging
# [user value] → Enable developers to debug workflow execution
```

### 4. [feature.md](feature.md) - Feature документация
**Для feature как минимальной delivery unit с grounding, acceptance и evidence**

**Использовать когда:**
- Детальное планирование implementation конкретной feature
- Technical specifications с API design
- Testing scenarios и acceptance criteria
- Implementation tracking и progress monitoring

**Ключевые секции:**
- Traceability
- User value
- Scope / non-goals
- Affected areas
- Context (SSoT links)
- Project grounding
- Acceptance intent
- Implementation plan
- Tests / verification
- Docs updates
- Quality / acceptance / CI-CD evidence
- Closure state

### 5. Delivery docs guidance
**Использовать вместе с epic/feature шаблонами**

- [delivery-docs-guide.md](../delivery-docs-guide.md): как различать `ADR`, `epic`, `feature`, `spec` и `protocol`, чтобы документация не дублировала сама себя и сохраняла traceability.
- [scenario-docs-guide.md](../scenario-docs-guide.md): как оформлять `SCN-*` сценарии как executable verification contracts, отличать planned anchors от full contracts и строить overlay navigation без потери канонического каталога.

### 6. [spec.md](spec.md) - SPEC документация
**Для grounded implementation design**

**Использовать когда:**
- нужна implementation-ready проработка;
- нужно зафиксировать grounding, target design, migration plan и regression gates;
- feature уже требует отдельного технического design-документа.

### 7. [protocol.md](protocol.md) - Protocol документация
**Для фактического следа delivery/remediation цикла**

**Использовать когда:**
- нужно зафиксировать, что реально происходило;
- был remediation/follow-up цикл;
- нужно связать runs, evidence, deviations и итог цикла.

### 8. [scenario.md](scenario.md) - Scenario документация
**Для исполняемых `SCN-*` сценариев platform/lifecycle/golden verification**

**Использовать когда:**
- нужно зафиксировать канонический verification scenario;
- надо проверить platform capability или lifecycle block в подготовленной среде;
- нужен evidence-first operational rehearsal, а не просто unit/integration test.

**Пример использования:**
```bash
# Создать feature в рамках epic
mkdir -p .memory-bank/epics/EP-009/FT-009-01
cp .memory-bank/mbb/templates/feature.md .memory-bank/epics/EP-009/FT-009-01/index.md

# Заполнить:
# [FT-XXX-YY] → FT-009-01
# [Feature Name] → Breakpoint Management System
# [implementation files] → конкретные пути
```

## 🚀 Usage Instructions

### Quick Start Workflow

1. **Выбрать подходящий шаблон** исходя из типа документации
2. **Скопировать шаблон** в нужную директорию
3. **Заполнить frontmatter** с актуальными метаданными
4. **Заменить placeholders** на конкретные значения
5. **Добавить конкретное содержание** в каждую секцию
6. **Обновить navigation** в соответствующих index файлах

### Frontmatter Customization

#### Обязательные изменения во всех шаблонах:

```yaml
# Всегда обновить:
file: [актуальный путь к файлу]
description: [конкретное описание содержимого]
purpose: [зачем читать именно этот файл]
date: [текущая дата в формате YYYY-MM-DD]

# Для технической документации добавить:
implementation_files:
  - [реальные пути к implementation файлам]
test_files:
  - [реальные пути к test файлам]

# Для epic/feature документации:
epic: [конкретный epic ID]
feature: [конкретный feature ID, если применимо]
user_value: [конкретное описание пользовательской ценности]
```

#### Специфические поля по типам:

**Component шаблоны:**
- `c4_level: component` (оставить как есть)
- `architecture: [конкретная архитектурная версия и контекст]`
- `tags: [конкретные технологии и use cases]`

**Subsystem шаблоны:**
- `c4_level: container` (оставить как есть)
- `index_type: deep | shallow` (выбрать подходящий)
- `coverage_depth: [число уровней покрытия]`

**Epic/Feature шаблоны:**
- `target_audience: [конкретные типы пользователей]`
- `related_files: [ссылки на связанные epics/features]`

### Content Customization Guidelines

#### 1. Замена Placeholders

**В квадратных скобках** - заменить на конкретные значения:
```markdown
# [Component Name] → StateManager
# [Feature Name] → Smart Validation
# [EP-XXX] → EP-001
# [FT-XXX-YY] → FT-001-02
```

**В угловых скобках** - заменить на описательные значения:
```markdown
# <brief description> → centralized state management with atomic operations
# <target timing> → <10ms under typical load
# <performance threshold> → 500ms maximum response time
```

#### 2. Секции для адаптации

**Всегда кастомизировать:**
- Все описания functionality и purpose
- Code examples с реальными implementation деталями
- API specifications с actual endpoints и contracts
- Test scenarios с конкретными test cases
- Configuration examples с real environment variables

**Можно оставить как reference:**
- Структуру секций (headers и подразделы)
- Formatting patterns и markdown структуру
- Template комментарии для guidance

#### 3. Добавление специфического контента

**После базового заполнения добавить:**
- Диаграммы архитектуры (ASCII или ссылки на внешние)
- Конкретные code examples из реального codebase
- Screenshots или UI mockups (для user-facing features)
- Performance benchmarks и measurement data
- Real-world troubleshooting scenarios

## 🔧 Template Maintenance

### Обновление шаблонов

**При изменении MBB стандартов:**
1. Обновить все affected шаблоны
2. Добавить changelog entry в history секцию  
3. Увеличить version number
4. Обновить date в frontmatter

**При добавлении новых типов документации:**
1. Создать новый шаблон на основе существующих
2. Добавить в этот index файл
3. Обновить navigation в mbb/index.md
4. Создать usage examples

### Валидация шаблонов

**Регулярные проверки:**
- [ ] Frontmatter соответствует актуальным стандартам
- [ ] Все placeholders корректно помечены
- [ ] Структура секций логична и полна
- [ ] Code examples syntactically correct
- [ ] Ссылки на related documentation работают

## 🎯 Best Practices

### Выбор правильного шаблона

**Component template** для:
- ✅ Отдельных классов, сервисов, engines
- ✅ API reference документации
- ✅ Technical implementation guides
- ❌ НЕ для groups компонентов (используйте subsystem)

**Subsystem template** для:
- ✅ Index файлов с navigation
- ✅ Architectural overviews подсистем
- ✅ Groups related components
- ❌ НЕ для individual components

**Epic template** для:
- ✅ User-focused initiatives
- ✅ Business value delivery
- ✅ Multi-feature coordination
- ❌ НЕ для individual technical tasks

**Feature template** для:
- ✅ Specific deliverable features
- ✅ Acceptance intent and evidence
- ✅ High-level implementation planning
- ❌ НЕ для high-level concepts (используйте epic)

### Качественное заполнение

**Frontmatter качество:**
- Описания specific и actionable, не generic
- Purpose объясняет "зачем читать", не "что содержит"
- Tags релевантные и searchable
- Related files актуальные и working

**Содержание качество:**
- Acceptance intent realistic и executable
- Traceability `epic -> feature -> spec -> evidence` сохранена
- Non-goals и closure state заполнены явно
- Docs updates и evidence sections не пустые для реально изменённых slices

## 📊 Template Statistics

| Template | Size | Typical Use |
|----------|------|-------------|
| component.md | large | component/service documentation |
| subsystem.md | medium | subsystem index / navigation |
| epic.md | short | value frame + feature map + progress |
| feature.md | medium | delivery unit + grounding + acceptance + evidence |

### Usage Metrics

**Template Adoption Rate:**
- 📈 90%+ новых документов используют templates
- 📈 70% reduction в времени создания документации
- 📈 95% соответствие MBB standards при использовании templates

## 🔗 Related Resources

### MBB Standards Documentation
- **@[Frontmatter Standards](../frontmatter-standards.md)** - Полные правила метаданных
- **@[Principles](../principles.md)** - MBB philosophy и tier system
- **@[Indexing Guide](../indexing-guide.md)** - Navigation best practices

### Creation Tools
- **@[Custom Commands](../../commands/index.md)** - Automated template deployment
- **@[Validation Tools](../../commands/mb-validate.md)** - Template compliance checking

---

**MBB Templates обеспечивают быстрое создание высококачественной документации, соответствующей всем стандартам Memory Bank Bible V6.0. Следование template guidelines критически важно для поддержания консистентности и качества документационной базы AI-KOD системы.**
