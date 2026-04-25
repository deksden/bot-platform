# PRT-042: review storage/UI scope, migration safety, release process

## DB/UI scope

- Протокол в целом правильно держит `bot-platform` как owner shared contracts, а продуктовые репозитории — как owner product truth.
- Сильная часть уже есть: в Wave 1 явно заявлены `types and pure helpers only`, `no DB dependency`, `no provider SDK dependency`, `no product package dependency`.
- Но этого недостаточно для закрытия риска: сейчас в тексте остаётся пространство для скрытой трактовки, что `responseId` / `answerId` / delivery records могут стать shared persisted truth в первом wave. Это надо запретить явно.
- Рекомендация: зафиксировать, что `channel-runtime` в первой волне не владеет таблицами, миграциями, схемами, projection-rows и any persisted delivery log. Если позже нужны persisted `responseId` / `answerId` / delivery records, они должны оставаться product-local, а framework должен описывать только contract shape и compatibility mapping.
- По UI scope сейчас тоже есть недосказанность: в протоколе упомянуты `web`/`admin` surfaces как будущая wave, но нет жёсткой нормы, что UI не входит в first wave implementation.
- Рекомендация: явно сказать, что первая волна не создаёт UI/app-shell/admin screens в `bot-platform`; если позже появятся governed screens, product-local UI-doc packet должен требоваться как обязательный companion.
- Для будущего UI scope стоит сразу потребовать MBB/UI пакет уровня продукта: protected-shell/app-shell IA, screen registry, screen specs, stable ids или POM mapping, UI automation contract, и критерий, что routes/menus/layout остаются product-local.

## Release process

- Текущий release контур уже описан хорошо: Changesets + workflow + controlled publish script.
- Но новый пакет `@dd-bot-platform/channel-runtime` сейчас не вписан в реальный allowlist публикации: `scripts/publish-private-packages.mjs` разрешает только `@dd-bot-platform/api-contract`, `@dd-bot-platform/core`, `@dd-bot-platform/scenario-system`.
- Значит, фраза из протокола про “package is added to the controlled private-package publish allowlist if publishing is in scope” должна стать обязательным gate, а не опциональным хвостом.
- Нужен явный order of adoption/publish:
  1. `bot-platform` — package + typecheck/import smoke;
  2. `docoved-agent` — first consumer proof;
  3. `seller-agent` — second consumer proof;
  4. `sales-agent` — only as mixed-repo tracker / migration input, not as canonical owner.
- Для publish readiness стоит закрепить, что package не считается publish-ready без Changeset intent, `pnpm changeset:publish --dry-run`, packed-manifest inspection и consumer import smoke.
- Если package действительно должен публиковаться в той же волне, его надо добавить и в release allowlist, и в protocol closure criteria; иначе protocol обещает publishability, которой current release tooling ещё не даёт.

## Migration safety

- Самая важная safety-норма уже верно направлена: first rollout must be additive.
- Но для этой конкретной темы надо усилить формулировки: destructive schema renames, table swaps и data ownership moves должны быть explicitly out of scope for wave 1.
- Если будущие persisted delivery records всё же появятся, их migration должна быть additive, with one writer + compatibility reads, без default dual-write.
- Для runtime safety стоит зафиксировать, что command/rendering adoption не должна менять in-flight binding semantics: effective binding/config snapshot должен сниматься на acceptance time и не должен переписываться поздними edits.
- Compatibility adapters должны быть первым шагом, а не последним; shared contract/read model vocabularies должны появляться раньше любых physical extraction steps.
- Если UI когда-нибудь появится, migration safety должна требовать, чтобы product-local routes/menus/layouts менялись вместе с contract docs, а не “догоняли” hidden backend truth.

## Rollback

- Самый безопасный rollback для этой волны — сначала откатить consumer version pin, а не source-copy или schema surgery.
- Для package-level rollback нужен последний known-good version `@dd-bot-platform/channel-runtime`, плюс сохранённые compatibility adapters в consumer repos.
- Если в consumer repo уже начались persisted changes, rollback должен идти через additive reversal: оставить старые names/fields как compatibility bridge до полного parity proof, а не удалять их первым движением.
- Для channel binding / delivery runtime важно сохранить compare-and-swap или version-token protection, чтобы rollback не конфликтовал с concurrent edits.
- Для release rollback нужно прямо описать: rollback inputs = released package version, consumer adoption order, current binding snapshot, and any product-local storage backfill state.

## Concrete protocol edits

- В `Package contents` после `The package must not encode:` добавить:
  - `No framework-owned tables, migrations, or persistent delivery records are introduced in wave 1. Any future persisted responseId/answerId/delivery records remain product-local and are mapped into the shared contract only at the boundary.`
- В том же блоке добавить:
  - `No UI/app-shell/admin screen implementation is in scope for wave 1. If a later wave introduces governed UI, the owning product repo must also carry the UI-doc packet for routes, screens, selectors, and automation.`
- В `Phase 1: Contract package` уточнить:
  - `No DB or schema work, including migrations, indexes, or read-model tables, is part of the first package wave.`
- В `Phase 2: Framework docs` добавить явную UI-norm:
  - `This phase may document future UI implications, but it does not introduce framework-owned UI surfaces. Product-local UI-doc packets remain the required owner for any later governed screens.`
- В `Compatibility rules` заменить общий additive language на более жёсткий:
  - `Do not introduce shared persistence for canonical response-document delivery records in wave 1; keep storage product-local and contract-first.`
- В `Release/publishing` части протокола добавить:
  - `Publishing is only valid after the package is added to the controlled publish allowlist, has a Changeset entry, passes packed-manifest inspection, and has at least one consumer import smoke recorded.`
- В `Product adoption model` добавить explicit order:
  - `Docoved adopts first, SellerAgent second, sales-agent remains a mixed-repo tracker and may only host transitional references.`

## Итог

- Протокол уже в правильной архитектурной траектории, но сейчас он слишком мягко формулирует границы storage/UI scope и слишком оптимистично намекает на publishability.
- Если добавить явный запрет на first-wave DB/schema/UI ownership, жёсткий release gate через allowlist/Changesets, и additive rollback/migration language, wave станет заметно безопаснее для downstream adoption.
