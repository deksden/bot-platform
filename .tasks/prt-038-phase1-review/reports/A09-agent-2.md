# Что уже хорошо

- В `bot-platform` уже есть правильная verification-рамка верхнего уровня: `.memory-bank/spec/scenarios/scenario-system-and-evidence.md` фиксирует слои `unit / integration / acceptance`, fixture-profile discipline, evidence model и hosted layering; `.memory-bank/mbb/scenario-docs-guide.md` отдельно удерживает anti-zoo правила: scenario не заменяет тесты, `beta_ui` не заменяет `beta_api`, а hosted/manual overlays не должны подменять детерминированный базовый proof.
- `PRT-038` правильно задает shared-governance framing для verification: shared substrate должен проверяться без поглощения product truth, а hosted gate обязан сохранять repo-local baselines и product acceptance anchors. Это хороший фундамент для split-aware verification, а не для еще одного смешанного test pack.
- Product-local protocols уже содержат явные no-regression anchors вместо абстрактного "ничего не сломать": у SellerAgent это `SCN-031/032/053/091/107/166` и `XE-007` в `seller-agent/.memory-bank/plans/protocols/PRT-008-...`; у Docoved это `SCN-179/195/201/203/204/205/212` и explicit non-gate для `docoved:verify:beta:api-seeded` в `docoved-agent/.memory-bank/plans/protocols/PRT-038-...`.
- Граница ownership у verification в целом проведена здраво: `bot-platform/.memory-bank/scenarios/scenario-matrix.md` и `bot-platform/.memory-bank/plans/verification-matrix.md` оставляют framework owner only для taxonomy/evidence/tooling, а acceptance meaning держат в product repos. Это снижает риск дублировать product packs в shared repo.
- У Docoved уже есть полезный anti-sprawl pattern: `docoved-agent/.memory-bank/plans/verification-matrix.md`, `docoved-agent/.memory-bank/spec/runtime/docoved-acceptance-scenarios-and-host-contract.md` и `docoved-agent/.memory-bank/guides/reference/docoved-local-regression-pack.md` честно разводят runnable-local pack, hosted overlays и legacy/recovery scripts. Для A09 это сильная база: видно, что авторы понимают разницу между canonical regression pack и боковыми proof scripts.

# Пробелы и риски

- В самих `PRT-039` и `PRT-040` verification strategy пока слишком плоская. Есть только короткие `Acceptance gates`, но нет явного layer map вида `unit -> integration -> workflow -> scenario -> hosted overlay`, нет required evidence per layer и нет run entrypoints. Для aspect A09 это главный недобор: протоколы формулируют "что должно остаться истинным", но почти не формулируют "каким минимальным набором это доказывается".
- `PRT-039` особенно слаб по operational verification contour. Он описывает shared objects, capabilities и UI composition rule, но не привязывает их к конкретным framework/product anchors по auth/access/channel/binding lifecycle. Между тем у SellerAgent уже есть релевантные anchors `SCN-107` (session revoke/replace) и `SCN-053` (observed user verification/revoke/rebind). Без прямой привязки child protocol легко прочитать так, будто control-plane extraction можно закрыть unit/integration аргументами без product no-regression по access/binding flows.
- У SellerAgent acceptance anchors есть, но runnable pack не оформлен как canonical command surface. В `seller-agent/package.json` нет даже минимального локального verification entrypoint, тогда как большинство связанных SCN (`SCN-053`, `SCN-107`) имеют `execution_status: planned`. Риск: `PRT-039`-совместимые изменения в shared auth/channel substrate будут считаться "проверенными" без исполнимого Seller no-regression contour.
- У Docoved противоположная проблема: anchors и commands есть, но между ними есть разрыв. `PRT-038` Docoved rightly запрещает считать `docoved:verify:beta:api-seeded` canonical proof, однако текущий `pnpm docoved:verify:local` по `docoved-local-regression-pack.md` покрывает owner-side seam proofs, а не значимую часть import/binding/activation scenarios, которые перечислены как protocol gates. Особенно заметно это по `SCN-203`: scenario есть, но verification matrix прямо говорит, что runnable-local evidence сейчас не anchored canonical local pack'ом. Значит, shared governed-content wave может "пройти" локальный pack и все равно оставить дыру в prompt-traceability / continuity acceptance.
- В `PRT-040` не хватает явных negative-path scenarios для import lifecycle. Протокол хорошо говорит про honesty rule (`supported/degraded/unsupported`) и review/activation semantics, но не превращает их в acceptance anchors для ошибок и ретраев: duplicate import/idempotency, failed extraction with partial degradation, approval denied, activation rollback, repeated import for same source revision, broken binding between `ConnectedSource` and product-local activation. Для A09 это риск недопокрытия самых дорогих реальных сбоев.
- Недостаточно зафиксировано fixture/seed reuse. `scenario-system-and-evidence.md` требует named fixture profiles и artifact snapshots, но `PRT-039/040` не говорят, какие seeded data, bundles, mocks или stubs должны переиспользоваться из существующих product packs и какие новые fixture profiles допустимы. Риск: каждая волна начнет заводить свои "минимальные" окружения и локальные helper scripts.
- Неоперационализирован ownership split для scenario updates. Документы хорошо говорят, что framework owns scenario-system, products own acceptance, но `PRT-039/040` не отвечают на практический вопрос: если меняется shared substrate contract и одновременно затрагивается product behavior, где должен появиться новый anchor first: framework scenario, product scenario, или оба. Для review scope это риск рассинхронизации после split.

# Что убрать/не вводить

- Не вводить новый bot-platform-owned mega-pack, который пытается запускать SellerAgent и Docoved acceptance из shared repo. Нужен reuse shared scenario infra, а не возврат к mixed execution ownership.
- Не вводить отдельный "control-plane UI e2e pack" как primary proof для `PRT-039`. По MBB guide hosted/browser proof должен быть тонким overlay поверх API/read-model evidence, а не главным gate.
- Не вводить для `PRT-040` новый специальный import-only runner или отдельный source-processing test framework, если можно опереться на существующий `@dd-bot-platform/scenario-system`, product-local acceptance host и уже существующие Docoved command packs.
- Не считать `docoved:verify:beta:api-seeded` или любые legacy/recovery scripts эквивалентом canonical regression evidence. Это уже правильно запрещено локальным Docoved protocol, и этот запрет не стоит размывать.
- Не требовать полного hosted/manual rerun для каждой shared-wave правки. Для control-plane и import substrate нужен минимальный deterministic local/core pack плюс точечные hosted overlays на release-level change, иначе verification станет дорогим и начнет обходиться людьми.

# Что минимально добавить в протокол

- В `PRT-039` и `PRT-040` нужен короткий раздел `Verification contour`, одинаковый по форме:
  - `unit/contracts`: schema/validation/object-shape checks;
  - `integration`: structured write/readback, auth/access envelopes, import/report state transitions;
  - `workflow`: long-running lifecycle, retries, idempotency, status transitions;
  - `scenario/product no-regression`: какие existing SCN/XE anchors обязательны;
  - `hosted overlay`: когда требуется `beta_api`, `beta_ui` или `beta_external_manual`.
- В `PRT-039` нужно минимально перечислить reuse anchors для first wave:
  - framework side: `bot-platform` verification/scenario matrices и shared scenario-system contract;
  - Seller side: `SCN-107`, `SCN-053`, `XE-007`;
  - Docoved side: channel/binding acceptance families хотя бы через `SCN-201` и binding-related rows из `docoved-agent` verification matrix.
- В `PRT-040` нужен minimal effective regression pack per wave, а не просто список aspirations. Для первой волны достаточно явно зафиксировать:
  - canonical local contract proof for extraction bundle + report shape;
  - Docoved no-regression anchors `SCN-179`, `SCN-205`, `SCN-212`;
  - один negative-path anchor на `degraded/unsupported` processing;
  - один lifecycle anchor на re-import/idempotency or activation rollback.
- Оба child protocols стоит дополнить правилом `existing first, new only if gap is real`: сначала переиспользовать существующие product scenarios, local packs, acceptance host seams и framework scenario infra; новый scenario/doc anchor добавлять только когда текущие anchors не выражают acceptance-critical behavior.
- Нужен минимальный `ownership after split` rule в verification terms:
  - framework protocol changes shared evidence/tooling/contract docs in `bot-platform`;
  - product-visible behavior change must update the owning product verification matrix and at least one product-local scenario/proof anchor before closure;
  - protocol closure невозможен, если anchor остается только в upstream prose.
- Для SellerAgent минимально не хватает одного canonical repo-local verification entrypoint, даже если он сначала будет thin pack над уже существующими proofs. Без этого `PRT-039` не имеет симметричного product no-regression gate по сравнению с Docoved.

# Premature abstractions

- Универсальный cross-repo regression suite для всех shared waves выглядел бы как преждевременная абстракция. Документы уже правильно разделяют framework scenario-system и product acceptance; склеивать это обратно ради "единой проверки" не нужно.
- Отдельная generic control-plane acceptance family без product overlays тоже premature abstraction. Реальные риски здесь product-shaped: session revoke semantics, employee verification, channel binding, authority selection. Их нельзя честно доказать одной обезличенной shared scenario family.
- Для import substrate premature abstraction было бы сразу вводить богатую shared family из десятков format/channel/import scenarios. Сейчас сильнее выглядит маленький shared contract pack плюс product-owned Docoved acceptance anchors, потому что второй consumer еще не доказан.
- Полный browser-first admin verification contour для `PRT-039` тоже premature abstraction. По имеющимся guides сначала должен жить structured API/read-model proof, а UI automation должна оставаться thin governed overlay.
- Отдельная новая fixture universe под shared substrate без жесткой reuse policy была бы premature abstraction и прямой дорогой к zoo. Здесь лучше дорастить named fixture profiles поверх уже существующих SellerAgent/Docoved acceptance seams, чем создавать третью параллельную test reality.
