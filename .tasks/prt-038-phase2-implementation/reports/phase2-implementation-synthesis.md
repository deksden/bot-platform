# PRT-038 Phase 2 Implementation Planning Synthesis

Дата: 2026-04-23
Статус: `стадия проработки плана: фаза 2 выполнена`

## Что исследовано

На фазе 2 были собраны три независимых research-направления:

- `T01` — operating model для субагентов, task-doc contract, report contract, verifier-input contract
- `T02` — implementation slicing, dependency graph, task boundaries, milestone gates
- `T03` — verification/testing/staged-rollout contour, verifier checklist, hosted/security expectations

Артефакты:
- `T01-report.md`
- `T02-report.md`
- `T03-report.md`

## Сводный вывод

Hardened packet `PRT-038/039/040` готов не только как normative design layer, но и как основа для implementation-oriented execution model.

Правильный следующий operating model:
- `PRT-038` остается umbrella execution contract;
- `PRT-039` и `PRT-040` остаются normative child packets для shared layers;
- `.tasks/` используется как lean execution layer для subagent tasks и reports;
- каждая implementation task имеет bounded write scope, task file, report file и verifier step;
- product repos начинают реальную реализацию только после достижения shared-workstream gates, а не по одному лишь `P0`.

## Рекомендованная subagent model

### 1. `.tasks/` — это execution layer, не новый SSoT

`.tasks/` должен хранить:
- bounded delegated tasks;
- structured reports;
- phase-level synthesis.

`.tasks/` не должен становиться:
- новым spec layer;
- вторым protocol layer;
- свободным implementation diary.

### 2. Один task = один bounded slice

Каждый subagent task должен иметь:
- один task file;
- один declared write scope;
- один report file;
- явные upstream normative docs;
- явные grounding steps;
- явные verification expectations.

### 3. Верификация — отдельный контур

Implementation task не должен считаться закрытым только по self-report.

Нужны:
- implementation task;
- verifier task or verifier pass;
- status/doc sync task when the wave changes closure state.

## Обязательный task-file contract

Каждый subagent task file должен содержать:

1. `Purpose`
2. `Scope / non-goals`
3. `Write scope / no-touch boundaries`
4. `Context (SSoT links and exact inspection anchors)`
5. `Project grounding (mandatory before coding)`
6. `Open questions / ambiguity gate`
7. `Task`
8. `Deliverables`
9. `Constraints / anti-goals / required rules`
10. `Verification plan`
11. `Report requirements`
12. `Definition of done`

В frontmatter обязательно:
- `file`
- `description`
- `purpose`
- `version`
- `date`
- `status`
- `parent`
- `task_type`
- `protocol`
- `report_file`
- `related_files`
- `write_scope`

Желательно:
- `no_touch`

## Что subagent обязан собрать до начала работы

Минимальный grounding:
- прочитать task file целиком;
- прочитать owning `PRT-*`;
- прочитать связанные `FT-*` / `SPEC-*`, если task на них опирается;
- прочитать `delivery-standards.md`;
- прочитать `coding-style.md`;
- прочитать `delivery-docs-guide.md`;
- прочитать `scenario-docs-guide.md`, если есть verification/hosted/surface impact;
- просмотреть exact code anchors;
- просмотреть exact test/verification anchors;
- явно отметить unresolved ambiguities до coding.

## Что считать выполнением subagent task

Task считается выполненным только если:
- выполнен declared scope;
- не нарушены no-touch boundaries;
- прогнан local verification baseline;
- зафиксирован named verification path или honest `N/A`;
- обновлены требуемые docs/status surfaces, если task это включает;
- written report содержит sufficient evidence for verifier review.

## Report contract для implementation subagent

Каждый report должен содержать минимум:
- summary of work completed;
- files changed;
- commands/checks run;
- result of checks;
- unresolved issues / follow-ups;
- doc/status updates performed or `N/A`;
- explicit statement of anything not run and why.

## Recommended implementation task graph

### Control-plane workstream

- `T039-01-control-plane-vocabulary`
- `T039-02-channel-binding-contract`
- `T039-03-control-plane-api-read-models`
- `T039-04-control-plane-export-integration`
- `T039-V1-control-plane-verifier`
- `T039-S1-control-plane-sync`

### Governed-content/import workstream

- `T040-01-governed-content-vocabulary`
- `T040-02-source-processing-bundle-contract`
- `T040-03-import-lifecycle-idempotency`
- `T040-04-governed-content-api-read-models`
- `T040-05-governed-content-export-integration`
- `T040-V1-governed-content-verifier`
- `T040-S1-governed-content-sync`

## Parallelization model

Можно безопасно параллелить:
- `T039-01` и `T040-01`
- после `T039-01`: `T039-02` и `T039-03`
- после `T040-01`: `T040-02` и `T040-03`

Нельзя без careful serialization:
- shared package barrel integration tasks
- `current-status-report.md`
- `verification-matrix.md`
- `scenario-matrix.md`
- общие protocol/status sync surfaces

## Milestone gates

- `G1-control-plane-shared-contract-ready`
  - control-plane domain + API + verifier + sync complete
  - открывает безопасный старт product-local control-plane adoption

- `G2-governed-content-shared-contract-ready`
  - governed-content domain + API + verifier + sync complete
  - открывает безопасный старт Docoved import adoption

- `G3-cross-repo-adoption-handshake`
  - `G1` + `G2` + mirrored product-local assumptions
  - это реальный safe implementation start across repos

## Verification contour

### Every implementation task

Должен оставить:
- local baseline, сегодня минимум `pnpm check`;
- named verification path or explicit `N/A`;
- CI signal;
- report with evidence pointers.

### Additional required layers

- hosted proof:
  - только для hosted/protected/runtime-facing changes
- security/rollout notes:
  - для auth/access/exposure/retention/migration/rollback-sensitive changes
- product adoption proof:
  - обязательно, если task or wave claims `adopted`

### Honesty rule

Нельзя:
- считать `design_hardened` equivalent to implementation proof;
- считать planned scenario anchor runnable acceptance proof;
- считать platform-local proof equivalent to product adoption proof.

## Verifier task expectations

Verifier должен проверить:
- alignment with owning protocol;
- local proof;
- CI proof;
- scenario honesty;
- hosted proof when required;
- security/rollout notes when required;
- product adoption links when claimed;
- documentation/status sync.

Allowed verifier verdicts:
- `pass`
- `pass_with_followups`
- `partial_only`
- `blocked`

## Что не делать

- не открывать mega-task “implement PRT-039” or “implement PRT-040”
- не начинать с shared admin app / shared DB / shared service
- не смешивать W1 и W2 в одном write scope
- не затаскивать product activation/publication truth в `bot-platform`
- не пропускать verifier tasks
- не трогать shared status surfaces параллельно несколькими implementation tasks

## Практический итог

Фаза 2 дала достаточно материала, чтобы:
- встроить subagent operating model прямо в umbrella protocol;
- зафиксировать implementation task graph;
- зафиксировать verifier flow;
- зафиксировать local / CI / scenario / hosted / rollout contour;
- использовать это как основу для следующего реального implementation wave.
