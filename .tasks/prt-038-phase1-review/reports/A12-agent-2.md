# verdict

Текущая постановка A12 закрыта только частично. В `bot-platform` уже есть сильный framework-level стандарт для quality gates и evidence-first closure, но сами execution docs `PRT-038`, `PRT-039` и `PRT-040` пока не делают эти gates обязательной частью phase completion. В результате фазу можно формально продвинуть по признаку "документы landed / kickoff gate satisfied / acceptance intent declared", не предъявив обязательные typecheck/lint/build/test/scenario/CI/deploy/security доказательства там, где они явно требуются framework standards.

Главный вывод: проблема не в отсутствии стандартов, а в том, что новые protocol docs слабо связаны с уже существующим verification contract. Для A12 это означает, что delivery gates пока недостаточно жесткие и допускают "completion on paper".

# evidence

- `.memory-bank/spec/engineering/delivery-standards.md:31-47` и `:67-79` задают жесткий closure baseline: code-quality checks, scenario/verification contract, protocol evidence, hosted verification, CI/deployment readiness, observability baseline и security closure gate. Это сильный стандарт.
- `.memory-bank/spec/operations/hosted-beta-acceptance-contract.md:30-38`, `:49-68`, `:80-102` дополнительно требует beta preflight, dual evidence (`beta_ui` + `beta_api` when possible), environment identity proof и запрещает считать preview равным beta acceptance.
- `.memory-bank/spec/scenarios/scenario-system-and-evidence.md:53-75`, `:88-97`, `:145-155` требует, чтобы scenario contracts имели acceptance assertions, evidence classes, run artifacts, tier semantics и rollback/abort criteria.
- `.memory-bank/mbb/delivery-docs-guide.md:119-145`, `:203-205`, `:248-265` прямо говорит, что protocol должен быть curated execution/evidence trace волны, а минимальная traceability-цепочка должна включать `spec -> runs/evidence -> closure state` и `scenario -> evidence -> verdict/follow-up`.
- На этом фоне `PRT-038` фиксирует только kickoff gate уровня документации: `P0 ready_for_product_adoption_protocols` считается satisfied после landing ADR/spec/rationale/child protocols и product-local boundary docs (`.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:237-254`). Здесь нет требований к implementation proof, scenarios, CI, build или hosted evidence.
- Тот же `PRT-038` в секции evidence перечисляет только документы (`:289-295`), а outcome остается `partial` с follow-up "implement W1 and W2" (`:297-303`). Это честно отражает незавершенность, но одновременно показывает, что gate и evidence пока doc-centric.
- `PRT-039` формулирует acceptance gates как архитектурные инварианты (`.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:219-224`), но не связывает их с конкретными сценариями, check commands, CI signals, deployment readiness или artifact locations.
- `PRT-040` делает то же самое для governed-content/import (`.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:159-167`, `:177-182`): есть желаемое поведение `ImportRun`, но нет hard gate на доказательство этого поведения.
- `current-status-report` показывает, что в репозитории уже есть более строгий шаблон закрытия waves: фиксируются release closure, published package proof, `pnpm check` baseline и `Verification` workflow (`.memory-bank/plans/current-status-report.md:11-16`, `:149-159`). Значит, нужная delivery discipline в проекте существует, но пока не встроена в PRT-038/039/040.
- Product-local protocols уже выглядят строже: SellerAgent и Docoved прямо перечисляют обязательные scenario anchors в acceptance gates (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md:277-303`, `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md:306-332`). Это подтверждает, что проблема сконцентрирована именно в platform-level phase gates, а не в общем отсутствии acceptance culture.

# weak completion criteria

- `PRT-038` смешивает "kickoff gate satisfied" и "program execution still partial". Это нормально для старта, но без отдельной шкалы completion states легко получить ложное ощущение завершенности фазы.
- В `PRT-039` и `PRT-040` acceptance gates описывают desired end state, но не определяют, что именно считается phase-complete: landed docs, extracted package seam, first consumer adoption, hosted proof, or multi-consumer proof.
- Не разведены статусы вида `documented`, `implemented`, `verified`, `adopted`, `retired`. Для A12 это критично, потому что shared-substrate extraction по своей природе проходит несколько разных уровней готовности.
- Нет явного distinction between "contract landed" и "implementation proven". Особенно опасно это для `PRT-039`, где control-plane changes затрагивают auth, memberships, channels и diagnostics.
- Нет отдельного критерия для "adopted" versus "available". По текущим формулировкам shared seam может быть объявлен успешным после документирования и локальной реализации, даже если ни один product repo еще не доказал стабильное adoption proof.
- `archive-only lineage` и legacy retirement описаны содержательно, но нет формального критерия, когда legacy seam можно считать реально retired, а не просто помеченным как target cleanup.

# missing verification gates

- Нет обязательного per-wave hard gate на `typecheck`, `lint`, `build`, `test` или хотя бы repo-standard `pnpm check` для `PRT-039` и `PRT-040`, хотя `delivery-standards` этого ожидает.
- Нет требования, что каждый implementation wave должен быть связан хотя бы с одним bot-platform scenario/verification contract из matrix, либо с явным `N/A` reason, если сценарий еще не существует.
- Нет требования добавить или обновить `verification-matrix` и scenario anchors before marking W1/W2 complete. Сейчас в framework verification inventory нет явной строки под новые PRT-039/040 workstreams.
- Нет CI gate: protocol completion не требует green GitHub checks, workflow/run IDs или commit SHA evidence.
- Нет hosted gate для control-plane/import surfaces: нет требования к staging/beta preflight, environment identity proof, deployment pair compatibility и dual evidence, хотя эти surfaces по смыслу легко попадают под hosted acceptance contract.
- Нет explicit security closure gate для auth/membership/channel/import data-surface changes: exposure decision и auth impact в `PRT-038` названы, но commands/evidence не требуются.
- Нет observability gate для runtime/channel changes: correlation ids, structured logs и error policy не превращены в closure criteria конкретных workstreams.
- Нет cross-repo adoption gate: перед тем как объявлять extraction phase complete, не требуется доказать, что хотя бы один consuming product прошел свои acceptance anchors на новой shared seam.
- Нет обязательства обновить `current-status-report` после завершения каждой большой wave `PRT-039`/`PRT-040` с явным closure verdict и evidence pointers, хотя delivery guide требует status/verification linkage после protocol completion.

# recommendations

- Добавить в `PRT-039` и `PRT-040` минимальный hard-gate block для каждой implementation wave: `local quality checks`, `scenario/verification anchor`, `CI green`, `hosted beta gate if applicable`, `security gate if auth/data surface touched`, `observability gate if runtime/channel behavior touched`.
- Ввести явную phase-state taxonomy: `documented`, `implementation_started`, `implementation_partial`, `scenario_proven`, `adopted_in_first_consumer`, `multi_consumer_proven`, `legacy_retired`. Это снимет путаницу между landed docs и реально доказанной готовностью.
- Для каждого workstream W1/W2 определить минимум один bot-platform verification anchor. Если framework-level scenario пока отсутствует, phase не должна считаться complete без явного follow-up gap и `N/A` rationale.
- Сделать evidence section протоколов структурной, а не только ссылочной: commit SHA, executed commands, scenario IDs, workflow/run IDs, deployment IDs/URLs, verdict, `N/A` reasons.
- Зафиксировать separate adoption gate: shared seam считается не просто implemented, а adopted только после прохождения product-local acceptance anchors у первого потребителя; для более сильного closure можно отдельно ввести gate на second-consumer proof.
- Добавить hard rule: phase completion must update `current-status-report` и, если меняется verification contour, `verification-matrix`/scenario linkage в том же wave closure.
- Для `PRT-038` стоит явно назвать текущий `P0` не phase completion gate, а только `documentation/kickoff gate`, чтобы он не воспринимался как proof of implementation readiness.
