# Aspect A11: Storage, DB, Migrations, and Release Safety

Цель:
- проверить слой хранения и миграционный контур там, где он затрагивается протоколом;
- оценить, достаточно ли безопасно описаны schema/data changes;
- найти missing release/migration/backward-compatibility considerations.

Что смотреть:
- `PRT-039`, `PRT-040`
- `.memory-bank/spec/operations/deployment-architecture.md`
- `.memory-bank/spec/operations/production-rollout-runbook.md`
- `.memory-bank/spec/security/auth-and-access.md`
- product-local protocols where source/channel/access/import state is discussed

Что искать:
- явно ли зафиксированы data authority и storage ownership;
- не предполагаются ли unsafe schema jumps;
- есть ли понимание rollout for beta/prod;
- нужна ли staged migration / dual-read / dual-write / backfill / idempotent migrate;
- предусмотрены ли backup/rollback/recovery concerns там, где они реально нужны;
- не слишком ли рано протокол пытается фиксировать общую БД без operational необходимости.

Особый фокус:
- `Membership`, `Channel`, `PipelineBinding`, `ConnectedSource`, `SourceRevision`, `ImportRun`;
- activation and publication persistence semantics;
- compatibility between product-local implementations and future shared extraction;
- release-safe evolution with minimal disruption.

Ожидаемый отчет:
- что в storage story уже достаточно;
- какие missing migration/release-safety clauses стоит добавить;
- где нужен explicit rollout note;
- где current wording опасно расплывчата;
- что нужно удержать простым и локальным на первой волне.
