# Что уже хорошо

- Базовый MBB-каркас в `bot-platform` уже не номинальный, а рабочий: корневой entrypoint разводит `spec`, `plans`, `guides`, `scenarios`, `mbb` и явно отделяет framework truth от product truth (`.memory-bank/index.md:46`, `.memory-bank/index.md:53`, `.memory-bank/index.md:56`).
- Для Diataxis есть правильный каркас и явные exclusions: `guides/index.md` разводит `tutorials`, `how-to`, `explanation`, `reference` и отдельно запрещает перенос product runbooks и product acceptance packs в framework guides (`.memory-bank/guides/index.md:33`, `.memory-bank/guides/index.md:40`, `.memory-bank/guides/index.md:91`).
- Верхняя MBB-traceability уже частично собрана: `PRT-038` ссылается на `ADR-005`, нормативный spec и rationale guide, а также на product-local adoption anchors (`.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:78`, `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:242`, `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:289`).
- Есть живые status/verification entrypoints, а не только protocol-docs: `plans/index.md` держит `current-status-report.md` и `verification-matrix.md` как обязательные документы (`.memory-bank/plans/index.md:49`, `.memory-bank/plans/index.md:55`), сами эти документы активны и используются (`.memory-bank/plans/current-status-report.md:107`, `.memory-bank/plans/verification-matrix.md:35`).
- Scenario layer оформлен по-MBB: есть flat catalog, scenario matrix, repo-local `SCN-*`, и в сценарной документации зафиксированы evidence-first и split-aware правила (`.memory-bank/scenarios/scenario-matrix.md:30`, `.memory-bank/spec/scenarios/scenario-system-and-evidence.md:34`, `.memory-bank/mbb/scenario-docs-guide.md`).
- Важный плюс по discipline: в scenario matrix уже соблюдается правило candidate/gated seams и не заявляется ложное framework ownership там, где split еще не закрыт (`.memory-bank/scenarios/scenario-matrix.md:75`, `.memory-bank/scenarios/scenario-matrix.md:76`, `.memory-bank/mbb/delivery-docs-guide.md:180`).

# Пробелы и риски

- Главный пробел: `PRT-038/039/040` почти не вшивают MBB как operational system. В них есть архитектурные ссылки и acceptance gates, но нет явного требования после каждого wave обновлять `current-status-report.md`, `verification-matrix.md`, `scenario-matrix.md`, repo-local `SCN-*` и соответствующие guide/spec hubs (`PRT-038`: `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:160`, `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:297`; `PRT-039`: `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:212`; `PRT-040`: `.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:169`).
- В execution docs нет прямых ссылок на MBB guidance. Ни `PRT-038`, ни `PRT-039`, ни `PRT-040` не ссылаются на `delivery-docs-guide.md` или `scenario-docs-guide.md`, хотя именно они задают minimal traceability и separation rules. В результате соблюдение MBB сейчас остается подразумеваемым, а не обязательным.
- Есть навигационная дыра: задача просит смотреть `.memory-bank/mbb/spec-docs-guide.md` и `.memory-bank/mbb/protocol-docs-guide.md`, но таких файлов в repo нет. Фактическая truth для `spec/protocol` сейчас свернута в `.memory-bank/mbb/delivery-docs-guide.md`. Это повышает риск, что исполнители будут искать несуществующие стандарты или считать protocol/spec discipline неполной.
- `current-status-report.md` еще живет логикой `PRT-036` bootstrap и на 2026-04-23 не выглядит перефокусированным на новую активную волну `PRT-038/039/040` (`.memory-bank/plans/current-status-report.md:3`, `.memory-bank/plans/current-status-report.md:4`, `.memory-bank/plans/current-status-report.md:107`). Для MBB это риск: active execution contract уже сменился, а status SSoT еще не синхронизирован с новой программой.
- Verification/scenario planning пока почти не отражает новые workstreams `shared control-plane` и `governed-content/import` как отдельные framework delivery waves. Матрицы хорошо покрывают старые feature groups, но не дают явного `PRT-039/040 -> spec/scenario/evidence/status` маршрута. Для MBB это значит, что child protocols пока слабо встроены в трассируемую verification систему.
- Diataxis layer существует как структура, но содержательно пока полупустой. В `guides/index.md` перечислен большой must-exist набор reference docs (`environment-access-and-verification`, `deterministic-beta-scenarios`, `hosted-beta-scenario-playbook`, authoring formats и т.д.), но реально из этого списка materialized только `npm-package-release-runbook.md` (`.memory-bank/guides/index.md:42`; фактический каталог показывает только hubs и один runbook). Это означает, что user-facing knowledge для framework consumers пока во многом остается "planned later".
- UI-doc layer недооценен. `PRT-039` много говорит про reusable management blocks, protected shell, diagnostics primitives и границу platform UI vs product IA (`.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:158`, `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:190`), но не требует ни UI reference/how-to deliverables, ни screen/surface documentation anchors. Есть риск, что решение будет "в коде понятно", а в Memory Bank останется только abstract prose.
- Operations layer описан на уровне spec, но execution protocol не требует его синхронизации при изменении control-plane/import flows. Если в волне поменяются bootstrap, diagnostics, release/verification or hosted preflight expectations, без прямого protocol-obligation это легко останется вне guide/reference слоя.

# Что убрать/не вводить

- Не вводить отдельный "implementation report" или новый doc type поверх уже существующих `protocol + current-status + verification-matrix + scenario evidence`. MBB прямо говорит, что factual implementation/evidence log живет в protocol, а не в отдельном competing log (`.memory-bank/mbb/delivery-docs-guide.md:152`).
- Не пытаться тащить product operator runbooks, Seller/Docoved acceptance overlays и product deployment guidance в `bot-platform/guides`; это уже правильно запрещено, и это ограничение нужно сохранить (`.memory-bank/guides/index.md:91`, `.memory-bank/spec/index.md:106`).
- Не объявлять control-plane UI или governed-content UI полностью framework-owned раньше времени. В `PRT-039` и в MBB уже есть правильная осторожность про local product IA и candidate seams; не надо превращать ее в premature central admin app doctrine (`.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:169`, `.memory-bank/mbb/delivery-docs-guide.md:180`).
- Не считать stub hubs завершенным Diataxis. Наличие `tutorials/index.md` и `how-to/index.md` само по себе не закрывает documentation coverage; нельзя фиксировать "guides layer done", пока ключевые reference/how-to/tutorial docs остаются только в wish-list.
- Не документировать MBB как набор "желательных практик". Для active protocols правила должны быть встроены как execution obligations, иначе knowledge снова уедет "в голову команды".

# Что минимально добавить в протокол

- В `PRT-038` добавить короткий обязательный раздел вида `Documentation deliverables / MBB sync`, где для каждой child wave фиксируется минимум:
  - обновить `current-status-report.md`;
  - обновить `verification-matrix.md`;
  - обновить `scenario-matrix.md`, если меняется verification contour;
  - landed/new `SCN-*` или явное объяснение, почему пока остается hub-level anchor;
  - обновить spec/guides hubs и related child docs, если появились новые normative or user-facing surfaces.
- В `PRT-039` явно потребовать doc deliverables для control-plane wave:
  - normative spec anchors для shared object/capability/surface model;
  - verification anchor для control-plane scenario coverage;
  - guide/reference or how-to anchor для reusable management surfaces и diagnostics usage;
  - status update после каждого принятого seam.
- В `PRT-040` явно потребовать doc deliverables для governed-content/import wave:
  - normative spec anchor для extraction bundle/import report contract;
  - scenario anchor для workflow-backed import proof;
  - reference/how-to anchor для import lifecycle и review/report semantics;
  - status/verification sync после каждой landed contract slice.
- В `PRT-038/039/040` добавить прямые ссылки на MBB governance docs:
  - `.memory-bank/mbb/delivery-docs-guide.md`
  - `.memory-bank/mbb/scenario-docs-guide.md`
  - при желании `.memory-bank/mbb/index.md` как общий entrypoint.
- В `PRT-038` отдельно зафиксировать, что kickoff для product-local protocols включает не только чтение upstream docs, но и зеркалирование material shared-contract changes в product-local protocol/boundary/status docs. Частично это уже сказано (`PRT-038`: sync rule), но не дотянуто до явного documentation gate (`.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:277`).
- Минимально стоит синхронизировать `current-status-report.md` с новой реальностью: active program уже не `PRT-036 bootstrap`, а `PRT-038 umbrella + PRT-039/040 child waves`. Без этого operational entrypoint отстает от actual execution plan.

# Premature abstractions

- Отдельные `spec-docs-guide.md` и `protocol-docs-guide.md` сейчас не нужны как новые файлы только ради симметрии названий. Если truth уже живет в `delivery-docs-guide.md`, лучше либо поправить ссылки/ожидания в задачах и протоколах, либо добавить явную навигационную ремарку в `mbb/index.md`, а не плодить почти дублирующие guides.
- Не стоит заранее заводить большой набор framework guide docs только потому, что они перечислены в `guides/index.md`. Нужны first-class guides под реальные active seams: release flow уже материализован правильно; дальше приоритетнее control-plane/reference, hosted verification/reference и scenario authoring/how-to, а не массовое заполнение каталога ради полноты.
- Не стоит заранее создавать отдельный framework-owned UI doc tree, если reusable surfaces еще не стабилизированы. Но как только `PRT-039` фиксирует shared primitives, должен появиться хотя бы один normative/reference anchor; иначе будет обратная крайность, когда слой реально есть, но нигде не описан.
- Не стоит превращать scenario coverage в giant universal framework matrix для всех будущих product flows. MBB здесь уже задает верную модель: framework owns shared scenario taxonomy and specific framework checks; product repos own product journeys. Нужно усиливать links и obligations, а не расширять ownership beyond boundary.
