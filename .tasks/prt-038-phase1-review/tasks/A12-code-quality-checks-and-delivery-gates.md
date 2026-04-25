# Aspect A12: Code Quality Checks, Delivery Gates, and Phase Completion Criteria

Цель:
- проверить, насколько хорошо в протоколе зафиксированы quality gates и критерии завершения волн;
- убедиться, что delivery plan требует реальные инженерные проверки;
- найти missing completion criteria, из-за которых можно “закрыть волну на бумаге”.

Что смотреть:
- `PRT-038/039/040`
- current status / verification references in bot-platform if needed
- MBB delivery-docs guidance
- product-local protocols where acceptance anchors are listed

Что искать:
- есть ли ясные phase gates;
- требуют ли они typecheck/lint/build/test/scenario evidence там, где это уместно;
- есть ли distinction between documentation landed and implementation proven;
- достаточно ли честно разделены `partial`, `done`, `adopted`, `archive`;
- нет ли vague wording вроде “implement later” без quality gate;
- есть ли обязательство обновлять current status/reporting after phase completion.

Особый фокус:
- verification before commit / merge / release;
- protocol completion evidence;
- product handoff criteria;
- clarity of “what counts as phase complete”.

Ожидаемый отчет:
- оценка текущих delivery gates;
- missing quality checks;
- слабые места completion criteria;
- что стоит добавить как минимальный hard gate;
- как сделать фазу проверяемой без излишнего process overhead.
