# Что уже хорошо

- Базовая MBB-навигация в `bot-platform` уже собрана как repo-local entrypoint system: корневой `.memory-bank/index.md`, `plans/index.md`, `spec/index.md`, `guides/index.md`, `scenarios/index.md` и `mbb/index.md` разводят normative, planning, Diataxis и verification слои вместо смешивания всего в одном протоколе.
- У `PRT-038` есть хорошая верхнеуровневая traceability-цепочка `ADR-005 -> spec/project/three-layer-product-line-architecture.md -> guides/explanation/product-line-layering-and-split-rationale.md -> product-local adoption boundaries / protocol hubs`. Для umbrella-wave это уже близко к operational Memory Bank, а не просто к текстовому плану.
- Сценарный слой в целом ведется по MBB-правилам split migration: `scenario-matrix.md` и `verification-matrix.md` явно используют repo-local anchors, отделяют framework truth от product acceptance и не выдают mixed-repo scenario ids за уже мигрировавшую локальную истину.
- Product-local kickoff discipline уже доведена до usable state: `seller-agent` и `docoved-agent` protocol hubs действительно фиксируют self-contained local start packets и переводят `bot-platform` в роль upstream provenance, а не daily execution source. Это хорошо согласуется с `PRT-038` gate и снижает cross-repo knowledge drift.
- В `PRT-038` уже есть важная оговорка про product-local normativity: после открытия локального adoption protocol binding rule должен быть mirrored в product-local docs, а не оставаться только в голове или в одном upstream protocol.

# Пробелы и риски

- Главный пробел: в самих `PRT-038/039/040` почти нет явных doc-deliverables на обновление `current-status-report.md`, `verification-matrix.md`, `scenario-matrix.md`, сценариев, guide-слоя и runbook/reference слоя. Для A04 это основной недобор MBB как operational documentation system: execution wave описана, а обязательный documentation closure contract не зафиксирован.
- `PRT-039` и `PRT-040` по факту несут normative design для shared control-plane и governed-content/import substrate, но оформлены только как protocols. По MBB `spec` обязателен, когда меняются shared capability boundaries, contract shape, migration semantics и regression gates. Здесь это именно такой случай. Сейчас есть broad anchors в `spec/project/*` и `spec/operations/control-plane-configuration-and-observability-surfaces.md`, но нет явного child-spec слоя под W1/W2. Риск: protocol станет competing normative truth вместо curated execution layer.
- Оба child protocol не дотягивают до собственного MBB template для protocol как evidence-bearing doc: у `PRT-039` и `PRT-040` нет `Execution summary`, `Evidence`, `Outcome`, `Memory Bank impact`. Значит, в них не встроено место, где фиксировать, какие документы были обновлены, какие scenario/verdict anchors landed и чем это подтверждено.
- `current-status-report.md` от `2026-04-22` не отражает волну `2026-04-23`: в нем нет `ADR-005`, `PRT-038`, `PRT-039`, `PRT-040`, platform rationale guide и факта product-local kickoff discipline. Для MBB это риск потери оперативной картины: root/plans уже указывают на новую convergence wave, а status snapshot еще живет предыдущим срезом.
- Diataxis coverage пока очень тонкая. `guides/index.md` перечисляет минимально обязательные docs, включая `reference/environment-access-and-verification.md`, `reference/deterministic-beta-scenarios.md`, `reference/hosted-beta-scenario-playbook.md`, authoring formats и integration declarations, но по факту в `guides/**` сейчас реально landed только explanation hub с одним guide и release runbook. `tutorials/index.md`, `how-to/index.md`, `reference/index.md` все еще описывают ожидаемые families, а не реальные guide surfaces.
- Из-за этого недооценен UI-doc layer. `PRT-039` уже вводит shared admin UI primitives, protected shell, membership/channel forms, diagnostics viewers, CLI and direct-chat boundaries, но не требует ни одного corresponding `how-to`, `reference` или runbook deliverable. Знание о том, как этим пользоваться и как не выходить за boundary, пока остается в protocol prose.
- Аналогично недооценен operations/import-doc layer. `PRT-040` уже фиксирует canonical extraction bundle, honesty rule, import lifecycle и import report skeleton, но не требует ни reference-format doc, ни operator how-to, ни runbook для import investigation/review. Это прямой риск “неявного знания в голове”, особенно для first consumer в Docoved.
- В execution docs нет прямых ссылок на актуальные MBB guides, которые реально govern этот слой: `delivery-docs-guide.md`, `scenario-docs-guide.md`, protocol template, indexing/cross-reference rules. MBB присутствует в repo как отдельный раздел, но не интегрирован в сам execution plan. В результате discipline есть “рядом”, а не “встроена в протокол”.
- Отдельный навигационный риск: task ожидал `spec-docs-guide.md` и `protocol-docs-guide.md`, но в актуальном `.memory-bank/mbb/` их нет; фактический source of truth сейчас сосредоточен в `delivery-docs-guide.md` плюс template. Если это не проговаривать явно, reviewers и исполнители будут искать несуществующие guide entrypoints.

# Что убрать/не вводить

- Не вводить отдельный обязательный doc type вроде `implementation-report` или параллельный “execution journal”. По MBB factual implementation/evidence log должен жить в protocol, а не рядом с ним.
- Не пытаться компенсировать пробелы тем, что protocol начнет играть роль full spec. Для shared control-plane и governed-content/import нужны отдельные normative child-specs, а protocol должен остаться execution/evidence layer.
- Не считать hub-level anchors или planned guide families достаточным покрытием. `index.md`/matrix могут временно быть canonical anchors, но ими нельзя закрывать вопрос “documentation is done”.
- Не переносить product-owned operator packs, acceptance overlays и product runbooks обратно в `bot-platform/guides`. Это сломает Diataxis separation и framework/product boundary.
- Не создавать ради симметрии дубликаты `spec-docs-guide.md` и `protocol-docs-guide.md`, если их содержимое будет пересказывать уже существующий `delivery-docs-guide.md`. Здесь лучше усилить явные ссылки на текущий canonical guide, чем плодить competing guidance.

# Что минимально добавить в протокол

- В `PRT-038` нужен явный `Documentation deliverables / Memory Bank closure` блок с обязательным чеклистом для каждой wave:
  - какие child-specs должны land;
  - какие guide/reference/how-to/runbook docs обязательны;
  - какие scenario anchors должны стать full contracts;
  - какие planning/status surfaces должны быть обновлены.
- В `PRT-039` минимально зафиксировать deliverables уровня:
  - child-spec для shared control-plane object model / capability vocabulary / surface ownership;
  - update `verification-matrix.md` и `scenario-matrix.md` для новых control-plane anchors;
  - хотя бы один `reference` или `how-to` doc про protected-shell / channel-management / diagnostics usage boundaries;
  - `Memory Bank impact`, `Evidence`, `Outcome`.
- В `PRT-040` минимально зафиксировать deliverables уровня:
  - child-spec для governed-content object model и extraction-bundle/import-report contracts;
  - scenario anchors для workflow-backed import and review path;
  - reference-format doc для extraction bundle / import report;
  - operator-facing how-to or runbook for import investigation / review / activation boundary;
  - `Memory Bank impact`, `Evidence`, `Outcome`.
- В `PRT-038` стоит добавить прямые ссылки на актуальные MBB governance sources: `mbb/delivery-docs-guide.md`, `mbb/scenario-docs-guide.md`, `mbb/templates/protocol.md`. Иначе execution doc не несет встроенного authoring discipline.
- В closure rules нужно явно написать, что wave не считается закрытой, пока не обновлены:
  - `plans/current-status-report.md`;
  - `plans/verification-matrix.md`;
  - `scenarios/scenario-matrix.md`;
  - соответствующие `spec/*` и `guides/*` entrypoints;
  - связанные product-local adoption/boundary docs, если изменился imported contract.

# Premature abstractions

- Не стоит сейчас заводить “универсальную control-plane documentation suite” или “universal admin app manual” до появления реального набора reusable primitives. Нужны узкие docs по уже принятому reusable surface, а не заранее раздутый doc tree.
- Не стоит оформлять source processing как отдельный product/service documentation stack раньше, чем появится второй реальный consumer и operational reason. Для текущей волны достаточно package seam + spec/reference/runbook слоя.
- Не стоит создавать broad generic authoring-format families “на будущее” без привязки к конкретным contracts из `PRT-039/040`. Иначе появятся пустые reference shells вместо MBB-grounded docs.
- Не стоит считать, что umbrella protocol сам по себе закрывает Diataxis. Чем дольше `PRT-039/040` остаются единственным местом для UI/import knowledge, тем выше шанс, что эти protocols станут не execution docs, а свалкой normative and user-facing knowledge.
