# Aspect A09: Testing, Scenario Coverage, and Verification Strategy

Цель:
- проверить, насколько хорошо в протоколе спланирован verification contour;
- убедиться, что тесты опираются на существующую инфраструктуру, а не создают новый зоопарк;
- понять, достаточно ли ясны acceptance anchors и сценарии по планируемым изменениям.

Что смотреть:
- `PRT-038/039/040`
- scenario-related MBB guides
- `.memory-bank/spec/scenarios/scenario-system-and-evidence.md`
- product-local protocols and linked scenarios in SellerAgent/Docoved
- current verification matrices and current-status docs where relevant

Что искать:
- есть ли явная test strategy по слоям: unit/integration/workflow/scenario;
- достаточно ли acceptance anchors для control-plane and import flows;
- используются ли уже существующие scenario families и infra;
- есть ли missing tests for error/retry/auth/access/binding/import lifecycle;
- не планируется ли писать избыточные или дорогие тесты без реальной пользы;
- хватает ли seeded data / mocks / stubs / helper reuse guidance.

Особый фокус:
- shared substrate verification without duplicating product test packs;
- product no-regression anchors;
- scenario ownership after split;
- minimal effective regression pack for each wave.

Ожидаемый отчет:
- сильные стороны current verification approach;
- пропущенные coverage areas;
- что стоит опереть на существующие test helpers/scenarios;
- какие новые scenario/doc anchors нужно добавить;
- где verification strategy можно сделать проще и сильнее одновременно.
