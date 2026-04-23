# Aspect A04: MBB Documentation Coverage, Diataxis, and Linking Discipline

Цель:
- проверить, соответствует ли планируемый пакет документов принципам MBB;
- понять, где протокол и связанные документы не дотягивают до MBB как до operational documentation system;
- проверить, есть ли явные ссылки на стандарты MBB и достаточно ли они интегрированы в execution plan.

Что смотреть:
- `.memory-bank/mbb/index.md`
- `.memory-bank/mbb/delivery-docs-guide.md`
- `.memory-bank/mbb/spec-docs-guide.md`
- `.memory-bank/mbb/scenario-docs-guide.md`
- `.memory-bank/mbb/protocol-docs-guide.md`
- текущие `PRT-038/039/040`
- related `index.md`/`spec/index.md`/`plans/index.md`/`guides/*`
- product-local protocols and boundaries

Что искать:
- хватает ли в протоколе явных требований на обновление spec/guides/scenarios/status;
- есть ли понятная MBB traceability: `ADR -> spec -> protocol -> scenario -> current status/reporting`;
- не недооценен ли UI-doc layer, scenario layer, operations layer;
- есть ли в планах места, где документирование должно быть обязательным deliverable, но это не зафиксировано;
- не остались ли неявные знания “в голове” вместо закрепления в Memory Bank.

Особый фокус:
- проверка Diataxis separation;
- наличие навигационных entrypoints;
- наличие ссылок на MBB guidance в execution docs;
- достаточность требований к обновлению `current-status`, `verification`, `spec`, `guides`, `scenarios`.

Ожидаемый отчет:
- что уже соответствует MBB хорошо;
- каких MBB-обязательств не хватает;
- где надо добавить прямые ссылки на MBB guides;
- какие doc deliverables нужно явно встроить в протокол;
- что нельзя документировать “потом”.
