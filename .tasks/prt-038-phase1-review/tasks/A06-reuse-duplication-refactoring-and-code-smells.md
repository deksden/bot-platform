# Aspect A06: Reuse, Duplication, Refactoring Opportunities, and Code Smells

Цель:
- оценить, насколько хорошо протокол использует уже существующие сильные стороны кодовой базы;
- проверить, не дублирует ли план уже существующую функциональность;
- найти подсистемы, где уместен refactoring “заодно”, потому что иначе мы законсервируем code smells.

Что смотреть:
- `PRT-038/039/040`
- product-local adoption protocols
- duplicated runtime evidence already found between SellerAgent and Docoved
- code anchors mentioned in protocol docs:
  - `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/conversations/service.ts`
  - `/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/runtime/pipelines.ts`
  - `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/src/runtime/pipelines.ts`
- package ownership and boundary specs

Что искать:
- планируемое дублирование;
- уже существующие reusable seams, которые не использованы;
- refactoring opportunities, которые естественно входят в эту волну;
- legacy tails, которые лучше убрать сейчас, чем тянуть дальше;
- smells в naming, package placement, dependency direction, mixed ownership, compatibility layers.

Особый фокус:
- duplicated runtime helpers;
- fake shared buckets;
- residual `@sales-agent/*` assumptions;
- hidden product integrations, выдаваемые за shared logic;
- implicit server-only configuration paths.

Ожидаемый отчет:
- что можно безопасно переиспользовать;
- что нельзя переиспользовать и почему;
- что лучше отрефакторить в этой волне;
- какие code smells протокол уже адресует, а какие пропускает;
- какие cleanup tasks надо явно добавить в protocol backlog.
