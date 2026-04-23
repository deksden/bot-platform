# A09 review: testing scenarios and verification

## Что уже хорошо

- В `PRT-038` правильно зафиксирован базовый no-regression принцип: каждая extraction wave должна сохранять repo-local verification baseline и product acceptance anchors, а не подменять их новой общей платформенной приемкой. Это сильная отправная точка для A09.
- У `bot-platform` уже есть нормальная общая verification substrate, и она достаточно зрелая, чтобы не изобретать новый раннер:
  - taxonomy / tiers / fixture / evidence описаны в `.memory-bank/spec/scenarios/scenario-system-and-evidence.md`;
  - hosted layering и browser-thin policy описаны в `.memory-bank/spec/scenarios/hosted-beta-execution-model.md` и `ADR-003`;
  - кодовые примитивы уже есть в `packages/scenario-system/src/types.ts`, `packages/scenario-system/src/fixtures.ts`, `packages/scenario-system/src/artifacts.ts`.
- Важное ограничение на ownership уже проведено корректно: framework owns scenario-system semantics, но не owns SellerAgent/Docoved suites, fixture data и hosted bootstrap flows. Это прямо снижает риск “сделать еще один общий test zoo”.
- `PRT-039` и опорные framework specs уже хорошо формулируют safety-инварианты для control-plane:
  - server-authoritative access в `.memory-bank/spec/security/auth-and-access.md`;
  - one canonical write path / one validation path / auditability в `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`;
  - channel/pipeline binding contract в `.memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md`.
- `PRT-040` тоже концептуально выстроен верно: shared import substrate не должен превращаться в ложный “generic content product”, import остается workflow-backed и reviewable, а SellerAgent business-profile publication не схлопывается в Docoved-style importer.
- Продуктовые no-regression anchors уже существуют и их нужно переиспользовать, а не дублировать:
  - SellerAgent: `.memory-bank/plans/verification-matrix.md`, `.memory-bank/scenarios/scenario-matrix.md`, `SCN-031`, `SCN-032`, `SCN-053`, `SCN-107`, `SCN-166`, `XE-007`;
  - Docoved: `.memory-bank/plans/verification-matrix.md`, `.memory-bank/spec/runtime/docoved-acceptance-scenarios-and-host-contract.md`, `.memory-bank/guides/reference/docoved-local-regression-pack.md`, plus owner-side commands in `docoved-agent/package.json` such as `pnpm docoved:verify:local`, `pnpm docoved:verify:local:prt-032`, `pnpm docoved:verify:beta:*`.

## Пробелы и риски

- В `PRT-039` и `PRT-040` пока нет явной layered test strategy по типам проверки: unit / contract / integration / workflow / scenario / hosted. Сейчас есть acceptance gates на уровне намерения, но нет execution contour, по которому можно закрывать wave без споров.
- Не зафиксирован verification ownership по слоям. Из framework docs уже видно, что:
  - framework должен владеть contract checks и scenario/evidence semantics;
  - products должны владеть fixture data, host adapters, acceptance journeys и hosted overlays.
  Но сами `PRT-039/040` это не превращают в рабочую таблицу “что проверяется где и чьей командой”.
- В framework-level `.memory-bank/plans/verification-matrix.md` и `.memory-bank/scenarios/scenario-matrix.md` нет отдельных verification rows/families под shared control-plane substrate и governed-content/import substrate. То есть новые protocol areas уже появились, а framework verification inventory под них еще не оформлен.
- Нет явного minimal effective regression pack per wave. Из-за этого очень вероятны две крайности:
  - либо будут запускать слишком много и дорого, дублируя product packs;
  - либо будут закрывать wave по абстрактным acceptance gates без достаточного доказательства.
- Для `PRT-039` недофиксированы обязательные coverage areas:
  - deny/allow access cases и сохранение product role overlays;
  - session replace/revoke / authority selection;
  - channel kind vs pipeline compatibility;
  - `pipelineArgs` schema validation;
  - audit trail emission на config writes;
  - bounded direct-admin chat behavior;
  - binding readback через canonical read models, а не через DB-only inspection.
- Для `PRT-040` недофиксированы обязательные coverage areas:
  - `ImportRun` lifecycle и idempotency/retry/resume;
  - явная проверка состояний `review_required`, `ready_for_activation`, `failed`;
  - classification `supported` / `degraded` / `unsupported`;
  - explicit unsupported-item reporting;
  - activation gating / rollback safety;
  - duplicate/conflict and binding resolution;
  - import report schema как стабильный evidence artifact, а не просто лог.
- Не хватает guidance по seeded data / fixtures / helper reuse именно на уровне `PRT-039/040`. Общий framework contract это уже умеет, но протоколы не говорят, какие existing helpers являются canonical:
  - reuse `@dd-bot-platform/scenario-system` for fixture profiles and artifacts;
  - reuse product-local host/verification seams in Docoved;
  - reuse existing SellerAgent scenario families as no-regression overlays instead of inventing platform-owned mirrors.
- Для SellerAgent сейчас есть хорошие repo-local scenario anchors, но в отличие от Docoved в текущем пакете нет явно названного owner-side command pack для этой новой wave. Если `PRT-039` не перечислит точные seller anchors, есть риск скрытого ожидания “где-то потом появится общий раннер”.

## Что убрать/не вводить

- Не вводить новый bot-platform-owned acceptance pack, который будет пытаться заново проверять SellerAgent и Docoved product behavior.
- Не вводить browser-first shared control-plane e2e suite как основной proof. Для hosted verification уже принят правильный порядок: `beta_api` / read-model first, `beta_ui` only as thin overlay.
- Не вводить общий “universal admin app” verification contour как prerequisite для `PRT-039`. Сначала должны жить shared contracts и reusable blocks, а не единая централизованная acceptance surface.
- Не вводить отдельный importer-specific verification zoo для `PRT-040`, если его можно закрыть через:
  - contract/integration checks shared substrate;
  - Docoved product-local acceptance anchors;
  - существующие owner-side verify scripts.
- Не тащить SellerAgent business-profile publication в generic import regression family только потому, что обе области используют governed content vocabulary.
- Не плодить новые fixture corpora, mocks и stubs в `bot-platform`, если эти данные уже продуктово принадлежат SellerAgent или Docoved.
- Не делать shared hosted control-plane service, shared database или separate source-processing service обязательным условием verification first wave.

## Что минимально добавить в протокол

- В оба child-протокола (`PRT-039`, `PRT-040`) добавить маленькую verification table с колонками:
  - layer;
  - owner repo;
  - existing anchor / command;
  - required for every wave or only when touched.
- Для `PRT-039` минимальный pack должен быть явно прописан так:
  - framework unit/contract: capability vocabulary, access envelope, channel shape, pipeline-binding schema, transport-agnostic compatibility matrix;
  - framework integration: server-authoritative access resolution, session replace/revoke, canonical binding validation, audit record creation;
  - framework scenario anchor: reuse `SCN-012` plus один новый narrow shared contract scenario для channel/pipeline binding and readback;
  - SellerAgent no-regression overlay when touched: `XE-007`, `SCN-107`, `SCN-053`;
  - Docoved no-regression overlay when touched: `SCN-201` and the `SCN-204` / `SCN-214` family anchors from Docoved acceptance docs.
- Для `PRT-040` минимальный pack должен быть явно прописан так:
  - framework unit/contract: extraction bundle manifest, fingerprint/provenance fields, degradation markers, import-report schema;
  - framework integration/workflow: `ImportRun` state machine, callback/status semantics, retry/idempotency, review/activation transitions;
  - Docoved local no-regression overlay: `SCN-179`, `SCN-205`, `SCN-212`, `SCN-195`, `SCN-203`, плюс format-fidelity family `SCN-189..193` через существующий local regression guidance;
  - hosted overlays only when touched: `SCN-201` / `SCN-202` families or existing `pnpm docoved:verify:beta:*` commands, а не всегда по умолчанию;
  - SellerAgent overlay only if a real shared governed-content seam is reused there; иначе явно записать, что SellerAgent business-profile path is exempt from the base `PRT-040` regression pack.
- Явно добавить protocol rule: каждый новый shared scenario/doc anchor должен фиксировать `fixtureProfileId`, seed strategy, expected artifact path и ownership type (`framework contract check` vs `product no-regression overlay`).
- Явно добавить protocol rule: closure of a wave requires updating not only protocol prose, but also framework `verification-matrix.md` and `scenario-matrix.md`, иначе verification contour будет снова “в голове”, а не в SSoT.
- Для `PRT-039` стоит прямо сослаться на существующий `pnpm check` в `bot-platform/package.json` как на базовый repo gate, но не выдавать его за достаточную acceptance verification.
- Для `PRT-040` стоит прямо сослаться на существующие owner-side Docoved entrypoints из `docoved-agent/package.json`, чтобы протокол запрещал создавать параллельный runner без реальной причины.

## Premature abstractions

- Один универсальный RBAC scenario pack для всех продуктов. Правильная shared abstraction здесь: capability vocabulary и access envelope, но не единая product role acceptance.
- Один общий end-to-end `ConnectedSource -> SourceRevision -> ImportRun -> Activation` сценарий как будто SellerAgent и Docoved подтверждают одну и ту же product truth.
- Platform-owned UI/POM abstraction для всех control-plane экранов до того, как реально стабилизировался narrow reusable primitive set.
- Heavy mock-based source-processing harness, который живет отдельно от Docoved corpus/host contract и therefore дает “зеленые” тесты без product-level signal.
- Cross-product hosted smoke pack, который пытается из `bot-platform` подтверждать SellerAgent/Docoved product semantics.
- Попытка оформить один общий “wave mega-pack” на все extraction changes. Для этого цикла сильнее и дешевле иметь:
  - узкий shared contract pack в `bot-platform`;
  - product no-regression overlays only for touched surfaces;
  - hosted overlays only where a hosted surface was actually changed.
