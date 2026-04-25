# Aspect A02: Domain Entities, Ownership, and Semantic Boundaries

Цель:
- проверить набор общих сущностей и их границы;
- убедиться, что сущности действительно принадлежат нужному слою;
- найти дублирование, ложную обобщенность, missing entities или сущности, которые сейчас не нужны.

Что смотреть:
- `PRT-038`, разделы про canonical shared object vocabulary;
- `PRT-039`, разделы про control-plane objects;
- `PRT-040`, разделы про governed-content objects;
- `.memory-bank/spec/project/three-layer-product-line-architecture.md`
- `.memory-bank/spec/security/auth-and-access.md`
- `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`
- product-local protocols in SellerAgent and Docoved

Что искать:
- правильно ли выделены `User`, `Principal`, `Session`, `Membership`, `Workspace`, `ProductInstance`, `Channel`, `PipelineBinding`, `ConnectedSource`, `SourceRevision`, `ImportRun`, `ProcessingArtifact`, `ExecutionRun`, `TraceArtifact`;
- нет ли сущностей, которые сейчас premature;
- нет ли missing сущностей, без которых жизненный цикл будет недоопределен;
- не смешаны ли domain identity, runtime identity и operational artifacts;
- нет ли двусмысленности между shared object и product-local read model;
- достаточно ли ясно описано, какие product-local сущности не должны быть generalized.

Особый фокус:
- проверить, не вводим ли “generic content” там, где по сути остается product-specific meaning;
- проверить, что бизнес-профиль Seller и knowledge snapshot Docoved не размываются через shared vocabulary;
- проверить, хватает ли object model для управления каналами, источниками, импортами и правами без добавления новых ненужных сущностей.

Ожидаемый отчет:
- краткая оценка текущего набора сущностей;
- список проблемных сущностей и типов границ;
- список потенциально лишних сущностей;
- список потенциально недостающих атрибутов/идентичностей/ownership-правил;
- конкретные предложения по коррекции словаря.
