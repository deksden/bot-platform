# A12 Deep Review: Code Quality Checks, Delivery Gates, and Phase Completion Criteria

Дата обзора: 2026-04-23
Область: только аспект `A12`
Нормативная база: `A12-code-quality-checks-and-delivery-gates.md`

## Executive verdict

Текущая картина по A12 неоднородная:

- на уровне framework standards база уже сильная: `delivery-standards.md` и MBB guides хорошо фиксируют evidence-first closure, hosted preflight, security gate, scenario-first verification и обязательность status/evidence linkage;
- на уровне активных child protocols (`PRT-039`, `PRT-040`) эти требования пока не дотянуты до исполнимых delivery gates;
- на уровне реально enforced repo gate в `bot-platform` сейчас есть только минимальный protected-branch baseline: CI запускает `pnpm check`, а `pnpm check` сводится к `pnpm build`, без hard enforcement для scenario/test/lint/hosted/security evidence.

Итоговая оценка: **норматив сильнее исполнения**. Закрывать волну “по документам” уже сложно, но закрыть ее “на бумаге” все еще реально, потому что protocol-level hard gates и closure criteria не привязаны к must-run proof pack и не синхронизированы с current status / verification truth автоматически.

## 1. Оценка текущих quality gates

### Что уже хорошо

1. Framework delivery standard сформулирован качественно и по сути уже задает правильный hard baseline:
   - mandatory closure требует code-quality checks, scenario/verification contract, evidence в owning doc, hosted verification для runtime-facing изменений, CI/deploy evidence, observability baseline и explicit security closure gate (`.memory-bank/spec/engineering/delivery-standards.md:31-47`);
   - closure contract требует внешний signal поверх локальных проверок: green GitHub checks, deployment `Ready`, commit/workflow/deploy identifiers и явные `N/A` причины (`.memory-bank/spec/engineering/delivery-standards.md:67-79`);
   - ambiguity gate корректно запрещает coding при неясном acceptance contour (`.memory-bank/spec/engineering/delivery-standards.md:49-65`).

2. MBB delivery docs guide правильно отделяет protocol как curated execution/evidence trace и требует после завершения обновлять `EP-*` / `FT-*`, статусы, deprecations и verification links (`.memory-bank/mbb/delivery-docs-guide.md:121-145`).

3. MBB scenario guide правильно различает `planned anchor` и `full scenario contract` и прямо говорит, что acceptance-critical scenario должен стать full contract до feature closure (`.memory-bank/mbb/scenario-docs-guide.md:89-102`).

4. Hosted beta contract тоже зрелый: есть обязательный preflight, layered evidence model и запрет считать preview за beta acceptance без documented exception (`.memory-bank/spec/operations/hosted-beta-acceptance-contract.md:28-68`, `.memory-bank/spec/operations/hosted-beta-acceptance-contract.md:70-99`).

5. Product-local protocols выглядят дисциплинированнее framework child protocols:
   - у SellerAgent и Docoved есть явные acceptance anchors (`../seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md:277-303`, `../docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md:306-332`);
   - они хотя бы требуют обновлять локальные spec/guides/scenario anchors при изменении acceptance contour.

### Что уже слабо

1. `PRT-039` и `PRT-040` имеют только декларативные acceptance gates:
   - `PRT-039` ограничивается формулами уровня “shared object vocabulary is stable”, “structured writes use one validation path”, “product auth overlays remain intact” (`.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:219-224`);
   - `PRT-040` ограничивается формулами уровня “raw input becomes one canonical extraction bundle”, “ImportRun does not bypass review”, “Docoved semantics remain intact” (`.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:177-182`).

   Это хорошие acceptance intents, но не quality gates в инженерном смысле: в них нет must-run command, scenario id, evidence location, hosted contour, security check и closure status.

2. `PRT-038` уже говорит, что каждая extraction wave должна сохранять repo-local verification baselines и product acceptance anchors (`.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:108-111`), но не переводит это в конкретный cross-repo gate packet с проверяемыми командами и evidence shape.

3. В реальном репозитории enforced baseline минимален:
   - `package.json` определяет `check` как просто `pnpm build` (`package.json:6-14`);
   - `Verification` workflow запускает только install + `pnpm check` (`.github/workflows/ci.yml:14-33`);
   - в репозитории не обнаруживаются отдельные lint/test configs или test suites, которые были бы частью enforced gate.

4. `current-status-report.md` сам называет это именно “minimal protected-branch verification baseline” и фиксирует только `pnpm check` + `Verification` workflow (`.memory-bank/plans/current-status-report.md:157-160`). То есть документально система сама признает, что это baseline, а не полноценный delivery gate pack.

5. Framework scenario truth пока в основном paper-only:
   - verification matrix уже actualized, но ее current inventory не содержит отдельных rows под shared control-plane substrate и governed-content/import substrate; там есть `auth-framework`, `workflow-framework`, `command-framework`, `persistence-interfaces` и др., но не отдельные protocol-owned verification rows для `PRT-039`/`PRT-040` (`.memory-bank/plans/verification-matrix.md:43-60`);
   - текущие flat framework scenarios существуют, но все просмотренные anchors в `bot-platform` имеют `execution_status: planned`, например `SCN-001`, `SCN-012`, `SCN-116`, `SCN-118`, `SCN-168`, `SCN-170`, `SCN-175` (`.memory-bank/scenarios/SCN-001-typed-sdk-parity.md:7-10`, `.memory-bank/scenarios/SCN-012-scenario-auth-bootstrap.md:7-10`, `.memory-bank/scenarios/SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md:7-10`).

### Практический вывод по текущему состоянию

Сейчас quality gate landscape можно описать так:

- **standards layer:** сильный;
- **protocol layer:** средний или слабый;
- **repo-enforced layer:** слабый;
- **closure evidence layer:** частично зрелый у Docoved, слабый у framework control-plane/import waves и у SellerAgent.

## 2. Missing hard gates

Ниже именно те hard gates, отсутствие которых сейчас позволяет закрыть фазу раньше инженерного доказательства.

### 2.1. Нет protocol-level must-run gate для `PRT-039` и `PRT-040`

В child protocols нет обязательного набора:

- `local build/typecheck` gate;
- `scenario/verification` gate;
- `hosted verification` gate, если change runtime-facing;
- `security gate`, если change затрагивает auth/data/access surface;
- `CI green` gate с run id;
- `N/A` semantics, если конкретный слой проверки в этой волне не нужен.

Без этого protocol говорит “что должно стать правдой”, но не говорит “что именно нужно прогнать, чтобы считать это доказанным”.

### 2.2. Нет hard distinction между documentation landed и implementation proven

Это один из главных пробелов.

- `PRT-038` уже содержит `Result: partial` и отдельно satisfied kickoff gate (`.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:237-303`);
- `PRT-039` и `PRT-040` вообще не имеют явного outcome/closure taxonomy;
- сценарный норматив отдельно говорит, что `planned anchor` не должен притворяться closure-ready evidence source (`.memory-bank/mbb/scenario-docs-guide.md:91-102`).

Но в текущей системе child protocol может выглядеть “landed and active” без runnable proof contour.

### 2.3. Нет hard gate на runnable acceptance-critical scenarios

Для acceptance-critical paths framework guide требует full scenario contract до closure, но:

- framework scenario anchors в `bot-platform` пока planned;
- у SellerAgent acceptance anchors из `PRT-008` все просмотренные ключевые SCN/XE также `planned`, включая `SCN-031`, `SCN-032`, `SCN-053`, `SCN-091`, `SCN-107`, `SCN-166`, `XE-007`;
- у Docoved ситуация лучше, но тоже смешанная: `SCN-179`, `SCN-195`, `SCN-205`, `SCN-212` runnable, `SCN-201` hosted/manual, а `SCN-203` и `SCN-204` остаются `planned`.

Следствие: формула “anchors remain true” сама по себе недостаточна как hard gate. Нужен rule, что для phase closure хотя бы acceptance-critical subset этих anchors должен иметь runnable/full-contract status и быть реально прогнан.

### 2.4. Нет hard gate на status/matrix synchronization after closure

MBB guide требует после завершения обновлять statuses и verification links (`.memory-bank/mbb/delivery-docs-guide.md:141-145`), но у `PRT-039` и `PRT-040` этого нет как closure condition.

Сейчас можно:

- обновить protocol prose;
- частично внедрить код;
- не обновить `current-status-report.md`;
- не обновить `verification-matrix.md`;
- не обновить `scenario-matrix.md`;
- не обновить product-local mirrors;

и при этом оставить видимость продвинутого closure.

### 2.5. Нет hard gate на CI/deploy/hosted evidence для runtime-facing волн

Framework standards требуют explicit CI/deploy/hosted evidence (`.memory-bank/spec/engineering/delivery-standards.md:67-116`), а hosted-beta contract требует preflight и layered evidence (`.memory-bank/spec/operations/hosted-beta-acceptance-contract.md:39-99`). Но `PRT-039`/`PRT-040` не заставляют приложить:

- GitHub workflow/run id;
- deployment identity;
- hosted preflight verdict;
- beta_api / beta_ui / beta_external_manual contour;
- explicit `N/A`.

Для access/channel/import surfaces это существенная missing gate.

### 2.6. Нет hard gate на security closure для auth/access/import waves

`delivery-standards.md` прямо требует exposure decision + security verification commands + hosted rollout/preflight evidence для DB/auth/data-surface changes (`.memory-bank/spec/engineering/delivery-standards.md:44-47`), но child protocols не превращают это в обязательный closeout item.

Для `PRT-039` это особенно критично, потому что речь о users/sessions/memberships/workspaces/channels/bindings.

## 3. Completion-criteria gaps

### 3.1. Неясно, что именно считается “phase complete”

Сейчас child protocols фактически не различают:

- design settled;
- docs landed;
- code landed locally;
- CI green;
- product no-regression locally proven;
- hosted acceptance proven;
- cross-repo mirror/status sync complete.

Из-за этого completion interpretation остается в голове исполнителя.

### 3.2. Нет единой closure taxonomy для child protocols

В `PRT-038` есть хотя бы `Result: partial`, но у `PRT-039` и `PRT-040` нет явных состояний вроде:

- `draft`
- `in_progress`
- `partial`
- `done_local`
- `accepted_beta`
- `adopted_by_product`
- `archived / superseded`

Из-за этого пропадает честное разделение между “shared contract landed”, “shared implementation proven”, “product adopted”, “legacy seam retired”.

### 3.3. Нет canonical evidence sink per gate

Протоколы не говорят, где именно должна жить closure evidence:

- в protocol evidence section;
- в related scenario doc;
- в current-status report;
- в verification matrix current_state note;
- в product-local protocol.

Без явного evidence sink проверка closure остается ad hoc.

### 3.4. Не хватает explicit gate на product handoff completion

`PRT-038` хорошо фиксирует product-local normativity и synchronization rule (`.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:268-281`), но child protocols не определяют, когда shared wave действительно handoff-ready для SellerAgent/Docoved.

То есть нет условия вида:

- shared contract updated;
- framework verification row updated;
- product-local adoption doc mirrored;
- product-specific no-regression proof rerun.

### 3.5. Verification matrices пока не замыкают closure для новых protocol areas

Framework verification inventory shallow и capability-first, но не доведен до explicit execution inventory под `PRT-039`/`PRT-040` (`.memory-bank/plans/verification-matrix.md:43-60`).

Практический эффект:

- у новых platform waves нет canonical “must-run proof pack” в matrix form;
- phase completion нельзя быстро проверить по одной таблице;
- status drift между protocol text и verification truth остается вероятным.

### 3.6. Product acceptance anchors неравномерно зрелые

Это важный A12 gap, потому что gate strength определяется не списком anchors, а зрелостью anchors:

- SellerAgent protocol перечисляет хорошие anchors, но просмотренные ключевые scenario docs still `planned`;
- Docoved verification contour уже заметно честнее и ближе к runnable closure, но не весь acceptance set покрыт runnable evidence: например `SCN-203` и `SCN-204` planned, при том что они входят в protocol gate.

Следовательно, completion criteria должны учитывать не только presence of anchor, но и `execution_status`.

## 4. Lean recommendations без лишнего process overhead

Ниже только минимальные изменения, которые реально усилят A12, не превращая процесс в бюрократию.

### 4.1. Добавить в `PRT-039` и `PRT-040` компактную таблицу hard gates

Формат достаточно держать очень lean:

| gate | required when | minimum proof | evidence sink |
| --- | --- | --- | --- |
| local baseline | всегда | `pnpm build` или repo canonical command | protocol evidence note |
| scenario proof | если capability changes | 1+ must-run scenario/verification command из matrix | scenario/protocol evidence |
| hosted proof | если runtime-facing | hosted preflight + target contour verdict | scenario/protocol evidence |
| security gate | если auth/db/data surface | exposure decision + security command(s) + hosted security note or `N/A` | protocol evidence |
| status sync | при closure | updated `current-status-report`, `verification-matrix`, `scenario-matrix`, affected product-local mirrors | protocol closeout |

Ключевой принцип: **не перечислять все возможные проверки, а только canonical minimum**.

### 4.2. Ввести правило `done only with runnable proof, иначе partial`

Простая формула:

- если acceptance-critical anchors остаются `planned`, wave может быть `partial`, но не `done`;
- если proof только local, но hosted contour обязателен, wave не выше `done_local`;
- `accepted_beta` только при выполнении hosted contract;
- `adopted` только после product-local mirror + no-regression proof.

Это даст честное различие между landed docs, landed code и proven delivery без расширения document set.

### 4.3. Сделать `execution_status` частью gate-логики, а не просто метаданными scenario docs

Минимальное правило:

- protocol gate не считается закрытым ссылкой на scenario anchor, если у acceptance-critical anchor `execution_status: planned`;
- в таком случае protocol обязан либо:
  - ссылаться на другой runnable canonical proof,
  - либо явно маркировать wave как `partial`.

### 4.4. Зафиксировать обязательный closeout sync в one-line rule

Хватит одной фразы в каждом child protocol:

> Wave cannot be marked complete until `current-status-report.md`, `verification-matrix.md`, `scenario-matrix.md`, and affected product-local adoption docs are synced to the final evidence state.

Это очень дешевый по процессу, но сильный по эффекту gate.

### 4.5. Усилить repo hard gate без раздувания CI

Не нужно вводить большой multi-job pipeline. Достаточно:

1. Оставить текущий `Verification` workflow как single entrypoint.
2. Расширить canonical baseline так, чтобы он явно включал все реально существующие обязательные проверки, а не только `build`.
3. Если для очередной волны нет lint/test stack, писать в protocol `N/A`, а не молча опускать этот слой.

Практически:

- либо сделать `pnpm check` честным umbrella command;
- либо добавить protocol-specific must-run command в closure evidence, если глобальный CI пока intentionally minimal.

### 4.6. Добавить по одному runnable proof family на каждую child-wave область

Не нужен большой каталог. Нужен минимум:

- для `PRT-039`: один runnable control-plane/auth/channel-management proof family;
- для `PRT-040`: один runnable import-run/review/extraction-bundle proof family.

Пока этого нет, child protocols останутся design-heavy и closure останется mostly narrative.

## Bottom line

Сильная сторона текущего состояния в том, что проект уже сформулировал правильные правила игры на уровне standards: evidence-first delivery, hosted preflight, scenario maturity, security closure и status sync.

Слабая сторона в том, что `PRT-039` и `PRT-040` пока не переводят эти правила в короткие, жесткие и проверяемые delivery gates. Из-за этого главный риск A12 остается: **можно закрыть волну на уровне “документы есть и intent хороший”, не дойдя до инженерно доказанного closure**.

Минимально достаточное исправление:

1. дать child protocols compact hard-gate table;
2. завязать closure на runnable proof и `execution_status`;
3. сделать status/matrix sync обязательной частью closeout;
4. считать отсутствие нужного hosted/security/scenario evidence не “молчаливым допуском”, а `partial` или explicit `N/A`.

Такой набор усиливает проверяемость фазы без лишнего process overhead и хорошо соответствует исходному нормативу A12.

## Просмотренные ключевые документы

- `.tasks/prt-038-phase1-review/tasks/A12-code-quality-checks-and-delivery-gates.md`
- `.memory-bank/spec/engineering/delivery-standards.md`
- `.memory-bank/mbb/delivery-docs-guide.md`
- `.memory-bank/mbb/scenario-docs-guide.md`
- `.memory-bank/spec/operations/hosted-beta-acceptance-contract.md`
- `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `.memory-bank/plans/current-status-report.md`
- `.memory-bank/plans/verification-matrix.md`
- `.memory-bank/scenarios/scenario-matrix.md`
- `package.json`
- `.github/workflows/ci.yml`
- `../seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md`
- `../seller-agent/.memory-bank/plans/verification-matrix.md`
- `../seller-agent/.memory-bank/scenarios/SCN-031-*.md`, `SCN-032-*.md`, `SCN-053-*.md`, `SCN-091-*.md`, `SCN-107-*.md`, `SCN-166-*.md`, `XE-007-*.md`
- `../docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md`
- `../docoved-agent/.memory-bank/plans/verification-matrix.md`
- `../docoved-agent/.memory-bank/scenarios/SCN-179-*.md`, `SCN-195-*.md`, `SCN-201-*.md`, `SCN-203-*.md`, `SCN-204-*.md`, `SCN-205-*.md`, `SCN-212-*.md`
