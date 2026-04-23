# A10 Review: UI management surfaces and UI doc contracts

## Что уже хорошо

- `PRT-039` правильно фиксирует базовую рамку ownership: platform owns shared control-plane substrate and reusable management primitives, but does not own full product IA. Это хороший анти-перекос против раннего “единого админ-приложения”.
- `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md` уже задает сильный общий operating model: один canonical write path на object class, единый validation contract, permission model и audit trail для UI/CLI/direct-admin chat.
- В `PRT-039` удачно названы именно те platform-owned building blocks, которые действительно могут быть общими: protected shell skeleton, workspace/product-instance selectors, membership/channel forms, diagnostics and trace viewers, generic table/detail patterns.
- `PRT-040` хорошо удерживает import/source контур от unsafe UX drift: bot/chat допускается как submit/status surface, но не как primary editor for heavy structured changes or activation bypass.
- В `feature-area-boundaries.md`, `scenario-system-framework-contract.md` и MBB guidance уже есть нужная boundary discipline: framework may own generic shell/contracts, but must not absorb product route maps, product POMs, selector registries, hosted auth/bootstrap specifics.
- SellerAgent показывает целевой уровень зрелости UI-doc contracts: там уже есть связка `authenticated-app-shell-and-information-architecture`, `role-based-employee-workflows`, `ui-contract-layer`, `screen-registry`, `screen-specs`, `test-id-registry`, `ui-automation-contract`.
- Docoved product-local docs уже хотя бы фиксируют first-wave operator IA и route family для `Knowledge sources`, `Imports`, `Channels`, `Access`, `Diagnostics / Runs`. Это подтверждает, что product-local composition поверх shared primitives задумана в правильную сторону.

## Пробелы и риски

- Главный gap: `PRT-039` и operations spec описывают surface classes и reusable primitives, но не описывают сами platform-owned management surfaces на уровне screen/action/state contract. Сейчас это скорее “какие блоки нужны”, чем “какие surfaces обязаны существовать и что на них можно делать”.
- Для access/membership contour не хватает минимального surface inventory. Есть shared objects `User`, `Principal`, `Session`, `Membership`, `Workspace`, `ProductInstance`, но не зафиксировано, какие из них обязаны иметь list/detail/edit surfaces, какие действия допустимы, где проходит invite/revoke/change-role/session-revoke flow.
- Есть отдельный session-management gap. `auth-and-access.md` требует `resolve current session`, `list active/recent sessions`, `revoke/logout specific session`, но в `PRT-039` это не превращено в operator-facing surface contract.
- Для channel management зафиксирован хороший object model, но не хватает UI grammar: нет минимального определения для `channel list`, `channel detail`, `binding edit`, `policy override`, `status/readiness`, `compatibility failure`, `disabled/degraded` states и visible feedback after mutation.
- Для source/import management `PRT-040` силен как lifecycle contract, но слаб как UI-doc contract. В нем нет even minimal shared surface map для `ConnectedSource`, `ImportRun`, `ImportReport`, `ProcessingArtifact`. В результате разные продукты почти гарантированно начнут invent different operator grammars around the same shared objects.
- Для diagnostics/runs surfaces задан read model, но не задан navigation/readback model. В отличие от SellerAgent judge docs и Docoved route outline, в platform docs нет ясного `overview -> run -> artifact` или аналогичного first-wave flow. Это риск появления нескольких несовместимых diagnostics surfaces поверх одного execution truth.
- Не хватает явных action/result semantics. MBB architectural guidance требует screen-level definitions of displayed information, actions, key states and visible feedback. В platform protocols этого нет для shared surfaces: не описаны loading/empty/error/forbidden states, optimistic/pending states, validation error presentation, audit confirmation, cross-linking to trace artifacts.
- Не определена граница между reusable platform blocks и reusable platform UI contracts. Сейчас есть риск двух плохих исходов:
  - либо platform даст только object model, и каждый product заново изобретет surface contracts;
  - либо platform начнет владеть route maps/selectors too high in the stack.
- В workstreams и acceptance gates `PRT-039`/`PRT-040` не встроены UI-doc deliverables. Есть “materialize primitives” и “adopt in products”, но нет требования выпустить surface matrix, screen registry for shared surfaces, stable ids for shared primitives, or adoption checklist for product-local IA.
- Есть maturity mismatch между продуктами: SellerAgent already has a formal UI contract packet, Docoved пока держит operator IA mostly in protocol/runbook form. Без минимального platform-level UI-doc contract adoption likely drift will increase, not decrease.

## Что убрать/не вводить

- Не вводить один global cross-product admin app как первую волну shared control-plane. Это прямо противоречит текущему anti-centralization stance и создаст лишний ownership conflict.
- Не вводить framework-owned product route maps, product screen registries, product `data-testid` registries или product POM mappings для SellerAgent/Docoved. Это должно оставаться product-local.
- Не превращать direct-admin chat в основной editor для memberships, channels, sources, imports, approvals, activations или other heavy structured operations.
- Не дублировать один и тот же truth across multiple surfaces без явной роли. Если уже есть canonical diagnostics/read-model surface, не надо параллельно плодить “debug page”, “ops page”, “runs page” и “artifact page” без четкой grammar.
- Не тащить design-system/component-layer detail в protocol раньше, чем зафиксированы screen responsibilities, actions, states и ownership.
- Не маскировать product-specific semantics под “generic platform UI”, если это на самом деле Docoved review/activation semantics или SellerAgent team-access semantics.

## Что минимально добавить в протокол

- Явно добавить required UI-doc deliverable для shared surfaces: один небольшой platform-owned doc packet для control-plane/import surfaces. Не product IA, а именно shared surface contracts.
- В этом packet минимально зафиксировать surface matrix для platform-owned primitives:
  - `surface_id`
  - shared object/read model
  - primary actors/capabilities
  - allowed actions
  - visible states and feedback
  - what is platform-owned vs product-composed
- Для первой волны явно перечислить minimal reusable surfaces, даже если без canonical global routes:
  - workspace/product-instance selector
  - membership management surface
  - session list/revoke surface
  - channel list/detail/binding editor
  - execution run list/detail
  - trace artifact detail/readback
  - connected source list/detail
  - import run list/detail/report summary
- Для diagnostics/import surfaces добавить explicit state vocabulary, а не оставлять ее имплицитной. Минимум: `idle`, `loading`, `empty`, `forbidden`, `validation_failed`, `ready`, `degraded`, `disabled`, `failed`, `review_required`, `ready_for_activation`.
- Для platform-owned reusable primitives добавить minimal automation contract: stable `surface_id`/root-id namespace и update rule for shared selectors/ids. Не product POM, а lowest shared contract for surfaces the platform itself owns.
- В acceptance gates добавить отдельную проверку: product adoption is not complete until each adopting product links its local IA/screen docs to these shared surfaces and does not redefine the shared object/action semantics.

## Premature abstractions

- Generic no-code admin studio / schema-driven CRUD generator “for all control-plane objects”. Сейчас это почти наверняка создаст more abstraction than clarity.
- Universal cross-product sidebar/navigation framework with one canonical menu tree. Shared shell primitives нужны, shared product IA tree пока нет.
- Framework-wide role ladder or UI permission matrix beyond capability vocabulary. Standardize capabilities, not product role names and not full UI visibility models.
- Shared mega-diagnostics console, где в одну grammar forcibly mixed `ExecutionRun`, judge runs, import runs, channel incidents, trace artifacts and product-specific reports. Лучше зафиксировать shared read models and linking rules, чем один oversized surface.
- Separate source-processing/import microservice or standalone “import product” до того, как устоятся first real consumers and operator workflows.
- Platform-owned full screen registry/POM package for product routes. Нужен only a contract for platform-owned surfaces; product route/screen governance must stay local.
