# A10 Review — UI Management Surfaces And UI Doc Contracts (agent-3)

## Что уже хорошо

- В platform-слое уже есть правильная базовая модель surface-классов и write ownership: разделение `Admin UI` / `Admin CLI` / `Direct-admin chat`, плюс запрет превращать чат в основной редактор сложной конфигурации (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:53`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:75`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:178`).
- Для control-plane уже задан полезный минимальный контракт данных и операций: channel/source/run read models, validation/auditability, list/detail/update операции (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:117`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:150`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:171`).
- В `PRT-039` зафиксирован нужный “middle path”: reusable platform primitives + product-local IA, без обязательной ранней централизации в один global admin app (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:190`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:205`).
- SellerAgent уже имеет зрелый UI-doc packet по MBB-духу: app-shell IA, role workflows, screen registry, screen specs, stable ids, automation contract, POM mapping (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/index.md:41`, `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/screen-registry.md:32`, `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/ui-automation-contract.md:33`, `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/dashboard-pom-mapping.md:30`).
- В product-local протоколах уже есть правильная анти-overengineering рамка: bounded direct-admin chat, сохранение product IA, запрет раздувать `dv-admin` в вторую тяжелую admin-платформу (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md:112`, `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md:120`, `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md:162`).

## Пробелы и риски

- `PRT-039` и `PRT-040` формулируют surfaces на уровне primitives/flows, но не фиксируют screen-level contract (screen_id/route/actions/feedback/states/permissions), который MBB ожидает для governed UI (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:160`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:111`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/mbb/architectural-approaches.md:111`).
- В protocol-гейтах нет обязательных UI-doc deliverables. Сейчас acceptance формулируется функционально, но не требует screen registry/spec/id/POM/automation contracts (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:219`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:177`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/mbb/architectural-approaches.md:103`).
- У Docoved есть только протокольный route intent (`/app/knowledge/*`, `/app/channels/*`, `/app/access`, `/app/diagnostics/runs`), но нет продуктового UI spec tree с screen registry/spec/POM/id governance (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md:175`, `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/index.md:11`).
- “Diagnostics / Runs” в child-протоколах остается недоопределенным как UI-контракт: нет обязательной раскладки action semantics, visible feedback и state transitions на экране, хотя read-model база уже есть в operations spec (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:166`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:130`).
- Высокий риск surface drift между UI/CLI/chat: “one validation path” уже закреплен, но per-action authority map и явный UI action allowlist не дотянуты до протокольного уровня (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:45`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:92`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:158`).
- Формулировка про `generic table/detail patterns` в `PRT-039` без UI-doc guardrails может подтолкнуть к framework-owned admin UX раньше стабилизации product screens (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:167`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md:139`).

## Что убрать/не вводить

- Не вводить universal cross-product admin app как deliverable первой волны; сохранять product IA локально.
- Не вводить framework-owned route maps, selector registries, product POM mappings (это product-owned зона).
- Не превращать direct-admin chat в редактор membership/channel/source/import lifecycle.
- Не раздувать `dv-admin` в “вторую shared admin platform” поверх текущего thin-shell подхода.
- Не пытаться выровнять SellerAgent и Docoved в один “общий экранный набор” до стабилизации их product semantics.

## Что минимально добавить в протокол

- В `PRT-039` и `PRT-040` добавить обязательный раздел `UI contract deliverables` с минимальным пакетом:
`ui/index.md`, `ui/screen-registry.md`, `ui/screens/*`, `ui/pom/*`, stable-id registry, `ui-automation-contract`.
- Добавить обязательную таблицу `surface matrix` для первой волны:
`Access/Memberships`, `Channels/Bindings`, `Knowledge Sources`, `Imports`, `Diagnostics/Runs` с колонками `screen_id`, `route`, `actors`, `displayed info`, `actions`, `visible feedback`, `states`, `canonical read/write contract`.
- Добавить `surface authority matrix` (UI vs CLI vs direct-chat) с явным allowlist/denylist по операциям.
- Сделать UI-doc completeness отдельным acceptance gate child-протоколов: новая governed screen surface не считается landed без registry/spec/id/POM updates в той же волне.
- Для Docoved в `PRT-038` перевести рекомендованные routes в явный screen contract baseline (минимум: что видно, что можно сделать, какие состояния обязательны) и связать его с product verification anchors.

## Premature abstractions

- Единый framework-level “UI super-kit” для всех control-plane экранов до подтверждения двух реальных потребителей.
- Универсальный cross-product POM/test-id registry, который забирает product route/screen ownership в `bot-platform`.
- “Generic table/detail engine” как обязательный фундамент до фиксации конкретных operator screens/actions/states.
- Раннее превращение `dv-admin` из bounded owner-side CLI в широкую shared admin orchestration platform.
- Преждевременное создание централизованного hosted control-plane UX слоя вместо продуктовой композиции поверх platform primitives.
