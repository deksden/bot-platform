# A12 Review — code quality checks, delivery gates, and phase completion (agent-3)

## Краткий вывод

По A12 база в целом сильная, но сейчас она сильнее в общих standards, чем в самих активных execution protocols. `delivery-standards.md`, `hosted-beta-acceptance-contract.md` и MBB `delivery-docs-guide.md` уже задают evidence-first модель, но `PRT-038`/`039`/`040` пока не доводят ее до проверяемых hard gates на уровне текущей волны.

Главный риск: программу можно преждевременно объявить "закрытой по фазе" на основании того, что документы landed и vocabulary зафиксирован, хотя implementation proof, adoption proof и status/verification sync еще не показаны. Особенно заметен разрыв между "doc landed" и "implementation proven", а также между platform protocol и product-local adoption evidence.

## Что уже хорошо

- `delivery-standards.md` задает правильный minimum closure contract: code-quality checks, scenario/verification contract, CI/deploy evidence, hosted preflight, explicit evidence recording, security gate для risky changes (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/engineering/delivery-standards.md:31-123`).
- MBB `delivery-docs-guide.md` очень четко разводит роли `spec`/`protocol`/`scenario` и требует traceability-цепочку `spec -> runs/evidence -> closure state`, а для platform verification — `capability -> scenario -> evidence -> verdict/follow-up` (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/mbb/delivery-docs-guide.md:121-145`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/mbb/delivery-docs-guide.md:248-265`).
- Протокольный шаблон уже ожидает `Evidence`, `Outcome` и `Memory Bank impact`, то есть модель честного closure trace у проекта есть (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/mbb/templates/protocol.md:41-96`).
- В репозитории уже материализован минимальный hard gate baseline: `pnpm check` существует и сейчас маппится на repo build/type baseline, а GitHub `Verification` workflow реально прогоняет `pnpm install --frozen-lockfile` + `pnpm check` (`/Users/deksden/Documents/_Projects/bot-platform/package.json:6-14`, `/Users/deksden/Documents/_Projects/bot-platform/.github/workflows/ci.yml:14-33`).
- Product-local protocols у SellerAgent и Docoved выглядят честнее по completion logic, чем platform child protocols: в них уже есть explicit scenario anchors и explicit `Memory Bank impact required from execution` (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md:277-303`, `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md:306-332`).

## Главные findings

### 1. `PRT-038` смешивает kickoff-by-docs и implementation completion, поэтому wave можно "закрыть на бумаге"

`PRT-038` правильно вводит kickoff gate `P0 ready_for_product_adoption_protocols`, но его условия целиком документарные: landed ADR/spec/guide/child protocols/adoption docs/hubs (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:237-254`). При этом тот же документ ниже честно фиксирует `Result: partial` и перечисляет незавершенные follow-ups: реализовать W1/W2, открыть product-local adoption protocols, retire legacy seams after owner-side proof (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:297-303`).

Это допустимо как kickoff, но опасно как completion language: сейчас нет жесткой маркировки, что `gate satisfied` означает только `design landed / local execution may start`, а не `phase implementation proven`. В результате статус легко прочитать как "волна закрыта", хотя фактически она только стартовала.

Что стоит добавить:

- явное разделение состояний: `design_landed`, `implementation_in_progress`, `implementation_proven`, `product_adopted`, `archive_ready`, `archived`;
- отдельное правило, что `P0 satisfied` не является ни acceptance verdict, ни phase completion verdict;
- запрет использовать `gate satisfied` как суррогат `done`.

### 2. `PRT-039` и `PRT-040` описывают design и intent, но почти не дают execution/evidence closure

Оба child protocol заканчиваются на qualitative `Acceptance gates`, не доводя документ до MBB-шаблонного execution trace: в них нет `Evidence`, нет `Outcome`, нет `Memory Bank impact`, нет required commands/check ids, нет явной связи с CI/deploy proof (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:212-233`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:169-191`). Это расходится и с шаблоном protocol, и с delivery-docs-guide, и с delivery standards (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/mbb/templates/protocol.md:41-96`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/mbb/delivery-docs-guide.md:121-145`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/engineering/delivery-standards.md:33-79`).

Следствие: по текущему тексту child wave можно считать "успешной", даже если:

- никто не указал, какие команды были прогнаны;
- нет ни одного scenario/verdict;
- нет CI run ids;
- нет hosted/deploy evidence;
- нет обязательного status/verification sync.

Это и есть главный пробел между "документ landed" и "реализация доказана".

Минимум, которого не хватает прямо в child protocols:

- explicit local repo baseline check for code waves;
- explicit scenario/verification anchor per wave или `N/A with reason`;
- explicit CI/hosted/release evidence rules;
- explicit `Outcome` state;
- explicit `Memory Bank impact`.

### 3. `current-status-report.md` и `verification-matrix.md` не обновлены под текущую программу и не помогают отличить doc landed от implementation proven

`current-status-report.md` все еще описан как snapshot "under PRT-036", датирован `2026-04-22`, и вообще не отзеркаливает landing `PRT-038`/`039`/`040` и `ADR-005`, появившихся `2026-04-23` (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/current-status-report.md:3-8`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:1-24`). Более того, в `Immediate next document wave` статус-репорт все еще говорит о follow-up child protocols and ADR decisions "after `PRT-030`, `PRT-036`, `ADR-003`, and `ADR-004`", хотя child protocols and `ADR-005` уже landed (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/current-status-report.md:266-275`).

`verification-matrix.md` тоже не покрывает новую программу: в нем нет rows для shared control-plane substrate или governed-content/import substrate, нет links to evidence locations, а поле `current_state` системно смешивает "contract docs landed" и "consumer proof later" (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/verification-matrix.md:43-60`). Сам matrix прямо признает, что позже должен эволюционировать до `feature_group -> contract docs -> scenario ids -> evidence location -> execution history`, но для PRT-038/39/40 это пока не сделано (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/verification-matrix.md:56-60`).

Это критично, потому что A12 как раз требует обязательства обновлять current status/reporting after phase completion. Сейчас platform protocols начали новую активную программу, но status/verification truth не синхронизированы с ней.

Минимальное требование на будущее:

- каждый material protocol/state change в `PRT-038`/`039`/`040` должен сопровождаться update в `current-status-report.md`;
- `verification-matrix.md` должен получить отдельные строки хотя бы для `shared-control-plane` и `governed-content-import`;
- у этих строк должны быть не только docs/scenario anchors, но и explicit `evidence location` и `latest verdict`.

### 4. Для shared-substrate waves не зафиксирован минимальный adoption proof до статуса `done`

`PRT-039` и `PRT-040` формулируют workstreams, которые заканчиваются adoption inside product repos: у `PRT-039` это "Adopt those primitives in SellerAgent and Docoved", у `PRT-040` — "Adopt in Docoved first" (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:212-217`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:169-175`). Но их acceptance gates не требуют ни одного product-local scenario/verdict.

При этом product-local protocols уже говорят гораздо честнее:

- SellerAgent protocol success explicitly depends on specific product scenarios and требует local doc/scenario updates when acceptance contours change (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md:277-303`);
- Docoved protocol success explicitly depends on Docoved scenarios and тоже требует local runtime/guide/scenario updates (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md:306-332`).

Именно это различие показывает, что platform child protocols пока не дотягивают до полной completion logic. Для shared-substrate wave status `done` должен появляться не на момент landing platform docs/packages, а только после хотя бы одного explicit product adoption proof.

Рекомендуемое правило:

- `implementation_proven` в `bot-platform` — только после local repo proof;
- `adopted` — только после хотя бы одного product-local protocol verdict green;
- `multi-product adopted` — только после второго product proof, если wave заявлена как shared cross-product substrate;
- `archive_ready`/`archived` legacy seam — только после owner-side proof and cutover proof.

### 5. Минимальный quality baseline существует, но в protocols он не сформулирован как current hard gate

Фактическая repo baseline сегодня очень скромная, но реальная: `pnpm check` = `pnpm build`, а `Verification` workflow прогоняет install + `pnpm check` (`/Users/deksden/Documents/_Projects/bot-platform/package.json:6-14`, `/Users/deksden/Documents/_Projects/bot-platform/.github/workflows/ci.yml:29-33`). Release workflow дополнительно требует build и `pnpm changeset:publish --dry-run` before publish (`/Users/deksden/Documents/_Projects/bot-platform/.github/workflows/release-packages.yml:36-49`, `/Users/deksden/Documents/_Projects/bot-platform/.github/workflows/release-packages.yml:69-79`).

Проблема не в том, что здесь нет universal lint/test mandate. Проблема в другом: active protocols не фиксируют, что именно является current hard gate today. Поэтому wording вроде "quality checks" остается расплывчатым.

Без такого уточнения можно получить два плохих режима:

- либо завышенный процесс-театр, где документ требует "typecheck/lint/build/test/scenario", а в repo половины этих слоев просто нет;
- либо заниженный closure, где кто-то говорит "checks passed", не уточняя, что речь шла только о build baseline.

Правильная формула для текущего состояния:

- требовать `all currently materialized repo baseline checks`;
- перечислять их по имени;
- если слоя нет, писать не "passed", а `not present in repo baseline`;
- для runtime-facing/product-facing waves обязательно добавлять scenario/adoption proof поверх build baseline.

## Минимальные hard gates перед объявлением wave complete

Ниже тот минимум, который стоит закрепить прямо в `PRT-038`/`039`/`040`, чтобы фаза была проверяемой без лишнего process overhead.

### 1. Для doc-only wave

- явно помечать результат как `design_landed`, а не `done`;
- обновлять protocol hub / current status / related indexes;
- не делать implementation claims;
- если changed assumptions bind product repos, mirror them into local product protocols before calling them binding.

### 2. Для platform code wave в `bot-platform`

- прогнан current repo baseline: сегодня это минимум `pnpm install --frozen-lockfile` + `pnpm check`;
- зафиксировано, какие layers отсутствуют в baseline today (`lint`, `test`, etc.), если их реально нет;
- указан хотя бы один релевантный verification/scenario contract или честное `N/A` с причиной;
- GitHub `Verification` check green for the relevant commit/PR;
- protocol `Evidence` section records command set, commit sha, workflow run id/status.

### 3. Для hosted-facing or release-facing wave

- hosted preflight / beta rules follow `hosted-beta-acceptance-contract.md`;
- browser proof не является единственным бизнес-доказательством;
- если wave publish/release touching, есть `changeset:publish --dry-run` or equivalent release-readiness proof plus final workflow/run evidence.

### 4. Для shared-substrate adoption wave

- минимум один product-local adoption protocol has green acceptance verdict;
- platform protocol links to that product evidence explicitly;
- `verification-matrix.md` and `current-status-report.md` updated in the same wave;
- status uses `adopted` only after that link exists.

### 5. Для legacy retirement / archive wave

- old path marked `archive` only after owner-side replacement is proven;
- there is explicit cutover proof;
- status surfaces no longer advertise the legacy seam as active owner;
- rollback/containment note remains documented until the old path is truly retired.

## Как лучше развести статусы

Сейчас в программе смешаны `landed`, `partial`, `satisfied`, `archive-only`, а `done/adopted` явно не нормализованы. Для A12 безопаснее ввести маленький фиксированный словарь:

- `design_landed`
- `implementation_in_progress`
- `implementation_proven`
- `adopted_in_product`
- `multi_product_adopted`
- `archive_ready`
- `archived`

Ключевое правило:

- `landed` отвечает только на вопрос "документ/код появился";
- `proven` отвечает на вопрос "есть verification evidence";
- `adopted` отвечает на вопрос "потребитель реально перешел";
- `archived` отвечает на вопрос "старый путь больше не является execution owner".

## Практический synthesis

Сильная сторона текущего состояния в том, что проект уже знает, как должен выглядеть evidence-first delivery. Слабое место в том, что эта дисциплина пока живет в standards и product-local protocols лучше, чем в центральных child protocols `PRT-039`/`040` и в status/verification surfaces вокруг них.

Если коротко: documents landed, but implementation proof is not yet encoded as a hard gate for this program. Пока это не исправлено, волна остается уязвимой к ложному ощущению завершенности.

## Изученные документы

- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-phase1-review/tasks/A12-code-quality-checks-and-delivery-gates.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/current-status-report.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/verification-matrix.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/engineering/delivery-standards.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/hosted-beta-acceptance-contract.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/mbb/delivery-docs-guide.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/mbb/templates/protocol.md`
- `/Users/deksden/Documents/_Projects/bot-platform/package.json`
- `/Users/deksden/Documents/_Projects/bot-platform/.github/workflows/ci.yml`
- `/Users/deksden/Documents/_Projects/bot-platform/.github/workflows/release-packages.yml`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/index.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/index.md`
