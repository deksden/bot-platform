# PRT-038 / PRT-039 / PRT-040 Phase 1 Consolidated Review

Дата: 2026-04-23
Рабочая папка: `.tasks/prt-038-phase1-review/`
Статус: `стадия проработки плана: фаза 1 выполнена`

## Что было сделано

В рамках фазы 1 был проведен полный review-проход по 12 аспектам:

- `A01` архитектура, слои, границы
- `A02` сущности, ownership, семантические границы
- `A03` контракты, процессы, state transitions
- `A04` MBB / документационное покрытие
- `A05` lean design / anti-overengineering
- `A06` reuse / duplication / refactoring / code smells
- `A07` error handling / reliability / concurrency
- `A08` observability / logging / diagnostics
- `A09` testing / scenarios / verification
- `A10` UI surfaces / UI-doc contracts
- `A11` storage / DB / migrations / release safety
- `A12` code quality checks / delivery gates / completion criteria

Для каждого аспекта были:

- подготовлены отдельные task-файлы;
- запущены 3 независимых субагента;
- получены 3 независимых отчета;
- выполнен сводный synthesis;
- интегрированы принятые findings в единый вывод.

Итого: 12 аспектов, 36 субагентских отчетов, 1 сводный review packet.

## Общий вердикт

Пакет `PRT-038/039/040` концептуально собран сильно.

Главное, что уже выбрано правильно:

- трехслойная модель в целом корректна;
- в первой волне сохраняется product-local implementation/storage;
- не навязывается shared hosted control plane и shared DB;
- SellerAgent и Docoved сохраняют product truth;
- движение идет в сторону shared contracts, а не premature platformization продуктов.

Главная проблема пакета сейчас не в архитектурном направлении, а в степени операционализации. Иначе говоря:

- верхнеуровневая модель хорошая;
- границы в целом выбраны верно;
- но child protocols пока недостаточно дожимают эти решения до уровня исполнимых контрактов, жестких ограничений и closure-gates.

Именно поэтому пакет сейчас выглядит как:

- `architecture-ready`
- `design-ready`
- `kickoff-ready`

но еще не как:

- `implementation-closed`
- `verification-closed`
- `adoption-proven`

## Трехслойная карта

### 1. Platform substrate

Здесь все выглядит концептуально правильно. Платформа должна владеть:

- execution/runtime substrate;
- auth/session/membership primitives;
- workflow substrate;
- diagnostics/trace substrate;
- shared contracts and type vocabulary;
- reusable control-plane primitives;
- reusable governed-content/import substrate contracts.

Это не должно превращаться в:

- shared product semantics;
- shared product IA;
- shared product role models;
- shared product DB;
- universal admin product.

### 2. Shared cross-product substrate

Это слой, который действительно имеет смысл выделять как общий.

Сюда естественно ложатся:

- interaction substrate;
- channel / pipeline binding substrate;
- shared control-plane vocabulary;
- connected source / revision / import substrate;
- processing artifact lineage;
- workflow-backed import entry semantics;
- shared diagnostics linkage and observability envelope.

Но этот слой должен оставаться lean:

- shared contracts, invariants, read/write rules;
- shared minimal lifecycle semantics;
- shared validation paths;
- shared evidence / observability / verification expectations.

Он не должен prematurely забирать:

- product serving truth;
- product activation semantics;
- product review semantics;
- product UI trees;
- full storage ownership.

### 3. Product policy packs

Здесь по-прежнему должны жить:

- SellerAgent business-profile publication semantics;
- SellerAgent assist/review/takeover/customer-memory behavior;
- Docoved active snapshot / review / duplicate-conflict / semantic navigation truth;
- product IA and screens;
- product prompts / runbooks / operator workflows;
- product-specific storage and rollout policies.

Ключевой вывод review:

Shared layer должен нормализовать общий substrate, но не “сплющивать” SellerAgent и Docoved в один generic product.

## Что в пакете уже действительно хорошо

### 1. Правильный anti-centralization baseline

Повторяющийся strong finding по A01/A05/A11:

- не требуется global shared service в первой волне;
- не требуется shared DB;
- first wave = contracts first, not infrastructure first.

Это правильная база, ее нужно сохранить.

### 2. Product-local normativity после `P0`

Это сильное решение.

Правильно, что:

- `bot-platform` владеет upstream shared truth;
- product repos работают по своим локальным adoption protocols;
- локальные product protocols становятся primary execution contracts в продуктовых репо.

Но этому решению нужен более жесткий synchronization handshake.

### 3. Lean-first intent

Во многих местах уже видна здоровая осторожность:

- нет требования к universal admin app;
- chat не делается full editor;
- source-processing service не выносится prematurely;
- products сохраняют свой UI и свою operational grammar.

Это очень хороший фундамент.

## Главные системные пробелы

### P1. Не хватает явных ownership / write-authority / storage-authority matrix

Это один из самых повторяющихся выводов.

Нужно явно зафиксировать:

- кто canonically владеет meaning;
- кто canonically владеет mutation authority;
- где live-serving truth;
- где first-wave physical storage authority;
- где допустимы только projections / aliases / adapters.

Особенно для:

- `Membership`
- `Channel`
- `PipelineBinding`
- `ConnectedSource`
- `SourceRevision`
- `ImportRun`

### P2. Не хватает минимальных shared lifecycle contracts

Особенно слабые места:

- `ImportRun`
- activation / review handoff
- channel/binding status lifecycle
- retry / idempotency / dedup
- failure / rollback / concurrency behavior

Сейчас flow narrative есть, но minimal state/action contract еще не дотянут.

### P3. Не хватает protocol-level hard gates

Framework-level standards уже сильные, но child protocols пока не делают их обязательными.

Из-за этого возможна ложная завершенность:

- документы landed;
- kickoff gates satisfied;
- а implementation/adoption proof еще нет.

Нужно жестче различить:

- `design_landed`
- `implementation_in_progress`
- `implementation_proven`
- `adopted_in_product`
- `multi_product_adopted`
- `archive_ready`
- `archived`

### P4. Не хватает explicit MBB closure discipline inside child protocols

В протоколах пока недостаточно встроены:

- `Evidence`
- `Outcome`
- `Memory Bank impact`
- status sync requirements
- verification/scenario sync requirements
- UI-doc deliverables

MBB-подход в проекте уже есть, но child packets используют его слабее, чем могли бы.

### P5. Не хватает явного anti-contamination / anti-overengineering envelope

Самые опасные риски:

- расползание `policy.*` в generic policy engine;
- ранняя фиксация лишних shared entities;
- превращение reusable UI primitives в platform-owned admin app;
- premature shared storage;
- generic CRUD/meta-builder abstractions;
- неявное затаскивание product semantics в platform layer.

### P6. Не хватает stronger verification / observability / release-safety binding

Нужно лучше зафиксировать:

- verification contour per child protocol;
- required scenario anchors and execution status;
- required observability inheritance;
- required correlation bundle;
- release-sensitive migration notes;
- environment-scoped activation and rollback rules.

## Концептуально правильное направление доработки протокола

### Umbrella level: `PRT-038`

Здесь важно усилить не “архитектуру вообще”, а governing frame:

- добавить явную отметку о фазах проработки;
- развести kickoff gate и implementation completion;
- закрепить contract-sync handshake с product-local protocols;
- закрепить rule against new cross-product owner leaks;
- закрепить phase taxonomy и closure semantics.

### Shared control-plane level: `PRT-039`

Здесь нужно довести пакет до operational contract:

- ownership/write-authority matrix;
- minimal binding lifecycle;
- UI contract deliverables;
- verification contour;
- observability inheritance;
- security/release-safe gate for auth/access/channel mutations;
- compatibility bridge rules;
- status/evidence closure rules.

### Governed-content/import level: `PRT-040`

Здесь ключевые усиления:

- `ImportRun` minimal state machine;
- idempotency and retry rules;
- `ConnectedSource` / `SourceRevision` authority and serving-truth boundary;
- candidate vs live truth separation;
- activation invariants and rollback rules;
- import/report/readback surface contracts;
- workflow/trace/artifact lineage obligations;
- product activation remains product-owned.

## Минимальный пакет правок, который даст максимальный эффект

Если идти бережно и без оверинжиниринга, то самый полезный следующий шаг не в том, чтобы переписывать все, а в том, чтобы добавить компактные, но нормативные блоки.

### 1. В `PRT-038`

- `Plan refinement status`
- `Phase taxonomy`
- `Shared-to-product sync handshake`
- `No new cross-product owner leaks`

### 2. В `PRT-039`

- `Ownership and authority matrix`
- `Compatibility bridge and migration sequencing`
- `Verification contour`
- `UI contract deliverables`
- `Observability inheritance`
- `Security / rollout-sensitive mutations`

### 3. В `PRT-040`

- `Minimal lifecycle contract`
- `Idempotency / retry / concurrency rules`
- `Candidate vs live truth boundary`
- `Rollback and recovery minimums`
- `Import/readback UI deliverables`
- `Verification contour`
- `Observability inheritance`

### 4. В status surfaces

- sync `current-status-report.md` to the new convergence program;
- later add explicit verification rows for `PRT-039` / `PRT-040`;
- keep scenario linkage honest: `planned` is not enough for `done`.

## Что важно не делать

### Не делать сейчас

- shared DB
- universal hosted control-plane product
- generic policy engine
- generic no-code CRUD/admin studio
- universal screen registry inside `bot-platform`
- full UI ownership in platform
- flattening Seller and Docoved into one content/product model

### Делать сейчас

- shared contracts
- shared invariants
- shared authority rules
- shared lifecycle minimums
- shared verification and observability obligations
- shared documentation closure rules
- product-local implementation and adoption

## Итоговый вывод

Пакет нужно не разворачивать заново, а доуплотнить.

Архитектурно он уже идет в правильную сторону.
Сейчас требуются не новые сущности и не новая мегаструктура, а точечное усиление нормативных мест, где:

- еще не зафиксированы границы;
- еще не дожаты контракты;
- еще не разведены design/implementation/adoption states;
- еще не включены hard gates и MBB closure rules.

Если это сделать, получится хороший lean shared substrate:

- без легаси-хвостов;
- без лишней платформизации;
- без потери функциональности SellerAgent и Docoved;
- с ясным путем к product-local параллельной реализации.

## Ключевые артефакты фазы

- synthesis: `.tasks/prt-038-phase1-review/reports/_phase1-synthesis.md`
- финальный отчет: `.tasks/prt-038-phase1-review/reports/phase1-consolidated-review.md`
- все task-файлы: `.tasks/prt-038-phase1-review/tasks/`
- все субагентские отчеты: `.tasks/prt-038-phase1-review/reports/A*-agent-*.md`
