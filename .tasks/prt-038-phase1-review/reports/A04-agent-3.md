# A04 Review — MBB Documentation Coverage, Diataxis, and Linking Discipline

## Что уже хорошо

- В `bot-platform` есть рабочие навигационные entrypoints верхнего уровня: `index -> spec/plans/guides/scenarios/mbb`, и они явно связаны между собой (`.memory-bank/index.md:12-17,44-57`).
- Базовая архитектурная трассировка `ADR -> spec -> protocol` уже собрана и читается: `ADR-005` ссылается на `PRT-038`, `three-layer` spec и product boundary docs; `PRT-038` закрепляет umbrella + child protocols `PRT-039/040` (`.memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md:10-17,94-97`; `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:52-55,243-249`).
- Для product-local execution уже введена здравая норма self-contained packet + upstream sync rule (Seller/Docoved), что снижает неявное знание “в голове” и cross-repo хаос (`seller-agent PRT-008:117-126,298-303`; `docoved-agent PRT-038:125-134,327-332`).
- Scenario слой как каркас существует: есть flat `SCN-*`, scenario matrix и verification matrix, плюс split-aware правила в MBB (`.memory-bank/scenarios/index.md:54-69`; `.memory-bank/scenarios/scenario-matrix.md:68-91`; `.memory-bank/mbb/scenario-docs-guide.md:75-85,99-103,118-124`).
- Diataxis как модель явно зафиксирован в MBB principles и в `guides/index.md` (`.memory-bank/mbb/principles.md:259-270`; `.memory-bank/guides/index.md:33-39`).

## Пробелы и риски

- В целевом MBB пакете нет отдельных `spec-docs-guide.md` и `protocol-docs-guide.md`; фактически есть только `delivery-docs-guide.md` и `scenario-docs-guide.md` (`.memory-bank/mbb/index.md:14-15,46-48`; содержимое каталога `.memory-bank/mbb/`). Это создает разрыв ожиданий по явным правилам именно для spec/protocol authoring.
- В execution docs (`PRT-038/039/040`) нет прямых ссылок на MBB guidance (delivery/scenario/Diataxis). То есть operational plan не привязан явно к правилам, которые должен исполнять (поиск по этим файлам не дает `MBB`, `Diataxis`, `delivery-docs-guide`, `scenario-docs-guide`).
- Разорвана целевая цепочка `ADR -> spec -> protocol -> scenario -> current status/reporting`:
  - `PRT-039` и `PRT-040` не содержат явных scenario anchors и ссылок на verification matrix/current-status (`PRT-039:219-224`; `PRT-040:177-183`).
  - У `PRT-039/040` отсутствует раздел `Memory Bank impact`, а у `PRT-038` он есть, но без обязательств на обновление `current-status`, `verification-matrix`, `scenario-matrix`, `guides` (`PRT-038:305-311`).
  - `current-status-report.md` не синхронизирован с новой convergence-wave: нет упоминаний `ADR-005`, `PRT-038`, `PRT-039`, `PRT-040`; дата файла старше (`2026-04-22`) (`.memory-bank/plans/current-status-report.md:6`; поиск по именам протоколов/ADR пустой).
- Verification/scenario planning все еще в логике pre-convergence feature groups: нет отдельных framework feature/scenario anchors под control-plane substrate и governed-content/import substrate из `PRT-039/040` (`.memory-bank/plans/epics/framework-feature-registry.md:34-45`; `.memory-bank/plans/verification-matrix.md:45-55`).
- Diataxis формально объявлен, но практически недопокрыт:
  - `tutorials`/`how-to`/`reference` в основном пустые или “expected first ...” (`guides/tutorials/index.md:18-20`; `guides/how-to/index.md:18-22`; `guides/reference/index.md:21-29`).
  - Из минимального набора reference-docs в `guides/index.md` реально есть только `npm-package-release-runbook.md`; остальные ожидаемые файлы отсутствуют (`guides/index.md:48-57` + фактическое отсутствие файлов).
- UI-doc и operations layer недофиксированы как deliverables в протоколах:
  - `PRT-039` описывает UI composition, но не ставит обязательные doc outcomes для UI/reference/how-to (`PRT-039:190-199`).
  - `PRT-040` описывает workflow-backed import lifecycle, но не фиксирует обязательные updates в operations/runbook/hosted acceptance документах (`PRT-040:111-120,159-167`).

## Что убрать/не вводить

- Не вводить отдельный обязательный doc-type “implementation report”; эту роль уже должен нести protocol (MBB delivery rule) (`.memory-bank/mbb/delivery-docs-guide.md:218-225`).
- Не маскировать пробелы ссылками на будущие placeholder docs как на текущий SSoT (`.memory-bank/mbb/scenario-docs-guide.md:123-129`).
- Не считать mixed/source-side scenario anchors доказательством repo-local scenario coverage (`.memory-bank/mbb/scenario-docs-guide.md:106-114`).
- Не дублировать normative смысл между `spec`, `protocol`, `guide`; нужно усиливать owning layer, а не копипастить в несколько мест (`.memory-bank/mbb/principles.md:213-217`).

## Что минимально добавить в протокол

- В `PRT-038` добавить один обязательный gate уровня umbrella: wave не может перейти в `completed/partial` без синхронного обновления:
  - `.memory-bank/plans/current-status-report.md`
  - `.memory-bank/plans/verification-matrix.md`
  - `.memory-bank/scenarios/scenario-matrix.md`
  - релевантных `spec/*` и `guides/*` entrypoints.
- В `PRT-039` и `PRT-040` добавить короткий раздел `Documentation Deliverables (MBB)` с 4 пунктами: `spec updates`, `guides (Diataxis) updates`, `scenario anchors (SCN or planned->full status)`, `status/reporting updates`.
- В `PRT-039/040` добавить явные ссылки на MBB guidance: `mbb/delivery-docs-guide.md`, `mbb/scenario-docs-guide.md`, `mbb/principles.md` (пункты про Diataxis и verification layers).
- В acceptance gates `PRT-039/040` добавить минимум по traceability: “есть linkable chain до scenario/evidence и отражение в current-status”.

## Premature abstractions

- Отдельные “глобальные” MBB-сущности ради процесса (новые реестры/мета-протоколы/универсальные отчеты) до закрытия базовой цепочки `protocol -> scenario -> status` в текущих файлах.
- Полноценный новый пакет абстрактных spec/protocol guides вместо точечного доусиления существующего `delivery-docs-guide` и protocol sections.
- Гипер-универсальная UI-doc abstraction без сначала конкретных first-wave how-to/reference для `PRT-039` и `PRT-040`.
