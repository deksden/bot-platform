# Что уже хорошо

- `PRT-039` хорошо фиксирует правильную верхнюю границу ownership: framework задает shared object vocabulary, capability families, write ownership и reusable management primitives, но не забирает себе complete product IA. Для A10 это сильная база против ранней централизации всего control-plane UI.
- `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md` уже задает полезный UI-facing минимум на уровне read/write contracts: есть canonical object classes, required read models для `Channel` / `ExecutionRun` / `KnowledgeSource`, единый validation path и auditability rule. Это защищает UI от дрейфа в private config dialects.
- В framework-доках уже явно удерживается граница automation ownership: `.memory-bank/spec/runtime/scenario-system-framework-contract.md` запрещает `bot-platform` владеть product POMs, route maps и selector registries. Это правильный anti-overreach guardrail.
- SellerAgent дает хороший product-local precedent того, как UI governance должна выглядеть в зрелом виде: `seller-agent/.memory-bank/spec/ui/authenticated-app-shell-and-information-architecture.md` уже фиксирует public/private boundary, app shell, route map, top-level sections и purpose экранов, а `seller-agent/packages/ui-contract/src/index.ts` держит screen registry, section registry, POM action mapping и automation contract entries как first-class contract layer.
- Docoved adoption protocol тоже уже мыслит в правильную сторону: `docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md` прямо требует explicit first-wave operator IA с поверхностями `Knowledge sources`, `Imports`, `Channels`, `Access / Members`, `Diagnostics / Runs`. То есть потребность в явных UI surfaces не спорная, а уже признанная product-side.

# Пробелы и риски

- Главный пробел `PRT-039`: он описывает reusable primitives, но не доводит это до screen-level contract. Сейчас есть перечисление классов поверхностей и блоков (`protected shell skeleton`, selectors, forms, viewers, table/detail patterns), но нет route family, screen inventory, primary actions, visible states и feedback semantics. В таком виде документ больше про substrate, чем про operator-facing UI contract.
- В `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md` read models описаны хорошо, но не сказано, как они должны быть разложены по экранам. Например, для channel/source/run есть object truth, но нет минимального ответа на вопросы: где list vs detail, какие safe edits допустимы из UI, какие операции делаются inline, какие требуют отдельного detail screen, какие состояния loading/empty/error/forbidden обязательны.
- Особо недоопределен control-plane app shell. `PRT-039` говорит про `protected-shell primitives`, но не фиксирует shell grammar: workspace/product-instance switcher placement, persistent navigation, breadcrumb rules, diagnostics entrypoints, cross-surface context carry-over. SellerAgent spec показывает, что без этого быстро начинается route drift и потеря automation stability.
- Membership/access/channel/source/import/runs surfaces пока недоопределены как operator flows. Есть object vocabulary и capability vocabulary, но нет explicit actor-to-screen mapping: кто открывает что ежедневно, какие действия primary, что read-only, где mutating controls скрываются, а где допустимы. Это риск noisy UI, особенно для first-wave operator experience.
- Diagnostics/runs surfaces описаны как object/readback concern, но не как investigation flow. Для A10 это важно: `ExecutionRun` и `TraceArtifact` read models есть, однако отсутствует минимальный IA contract вида `runs list -> run detail -> bounded artifact drilldown`, а также неясно, как связаны diagnostics surface, channel detail и evaluation/judge readbacks.
- По import/source management есть междокументный разрыв: `PRT-040` хорошо описывает lifecycle объектов и workflow-backed import, а Docoved protocol уже предлагает route family, но на framework-уровне не закреплено, что такие surfaces должны быть явными продуктовыми экранами, а не набором CLI/chat/status endpoints. Это риск, что implementation уйдет в good backend / weak UI.
- Нет явного UI-doc contract для identifiers и automation readiness. По MBB-подходу нужны screen registry, screen specs, stable interaction ids и POM mapping, но в `bot-platform` сейчас нет аналогичного framework deliverable или даже требования, что adopting product должен завести product-local screen contract pack для governed surfaces. Поиск по `bot-platform` не показывает собственного `ui-contract` / `screen registry` seam.
- Есть риск дублирования информации между surfaces: channel detail, product instance detail, knowledge-source detail и diagnostics run detail могут начать повторять одинаковые summaries без правила, где canonical primary read, а где linked contextual projection. Сейчас этот boundary не зафиксирован.

# Что убрать/не вводить

- Не вводить единый framework-owned global admin IA с полным route tree для всех продуктов. `PRT-039` правильно говорит, что platform owns reusable blocks, а product repos собирают их в свою IA; это нельзя размывать.
- Не вводить framework-owned product POM, selector registry или full screen registry для SellerAgent/Docoved. Это прямо конфликтует с `.memory-bank/spec/runtime/scenario-system-framework-contract.md`, где product route maps и selector registries оставлены product-local.
- Не превращать direct-admin chat в альтернативный editor для memberships, channels, knowledge sources или imports. Во всех связанных протоколах chat уже ограничен bounded inspection/toggles; A10 review подтверждает, что расширять его нельзя.
- Не строить generic no-code admin studio или overly abstract “management meta-surface” в first wave. Текущие документы достаточно ясно подталкивают к curated screens, а не к schema-driven UI builder.
- Не вводить лишний component/platform layer между reusable primitives и product screens, если у него нет двух реальных consumers. Иначе получится еще один shared abstraction без понятной IA ownership.

# Что минимально добавить в протокол

- В `PRT-039` нужен короткий раздел `UI deliverables for adopting products`. Минимум:
  - product-local app shell / IA spec для protected control-plane surfaces;
  - screen registry с `screen_id`, route/surface id и owner boundary;
  - screen-level contracts для governed management screens;
  - automation-facing id/POM mapping для governed surfaces.
- В том же `PRT-039` нужно зафиксировать minimal first-wave screen inventory по shared control-plane area:
  - `Access / Members`
  - `Channels`
  - `Product instances`
  - `Knowledge sources`
  - `Diagnostics / Runs`
  - при наличии policy-facing UI: `Policies`
  Это не означает central route canon, но означает обязательность явного product-local surface map.
- Для каждого governed screen протокол должен требовать явно описывать:
  - actors / roles;
  - displayed information;
  - sections / panes;
  - primary and secondary actions;
  - key states: loading, empty, error, forbidden, success;
  - visible feedback from actions;
  - links на automation/test ids и owning implementation anchors.
- Для shell-level surfaces минимально нужен contract на persistent context:
  - workspace selector;
  - product-instance selector или equivalent context binding;
  - breadcrumbs;
  - route transition rules между configuration/access/channel/diagnostics areas.
- Для diagnostics/runs нужен минимальный investigation flow contract:
  - runs list;
  - run detail;
  - bounded artifact/trace drilldown;
  - links back to related channel / source / product instance where relevant.
- `PRT-040` стоит дополнять симметричным UI-doc пунктом для import/source contour:
  - `Sources` list/detail;
  - `Imports` list/detail;
  - explicit run/report/review state visibility;
  - clear separation between starting an import, reviewing report, and activation decision.
- Стоит прямо сослаться на MBB-guidance pattern из `docoved-agent/.memory-bank/mbb/architectural-approaches.md`: screen registry, screen specs, `ui/pom/`, stable interaction ids и обязанность обновлять эти артефакты при изменении governed screens. Сейчас этот стандарт существует, но не встроен в shared protocol как required deliverable.

# Premature abstractions

- Premature abstraction: общий cross-product screen registry внутри `bot-platform`. Framework должен задавать vocabulary и reusable primitives, но не хранить canonical registry экранов продуктов.
- Premature abstraction: универсальный “control-plane builder” из generic tables/forms/cards. Пока нет доказанных двух+ consumers с одинаковой IA, это будет только маскировка недоопределенных product flows.
- Premature abstraction: попытка выровнять SellerAgent и Docoved под один и тот же navigation tree. Даже при shared objects у них разные operator tasks и разные dominant workflows.
- Premature abstraction: обязательный shared design-system layer для control-plane wave. На этом этапе важнее screen contracts, stable ids и action/state semantics, чем общий visual language contract.
- Premature abstraction: framework-side automation contract for product screens. Правильнее требовать product-local automation-facing mapping поверх shared vocabulary, как это уже сделано в SellerAgent, чем тянуть product selectors обратно в platform repo.
