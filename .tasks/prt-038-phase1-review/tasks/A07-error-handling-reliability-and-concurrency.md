# Aspect A07: Error Handling, Reliability, and Concurrency/Race Risks

Цель:
- проверить, насколько надежно спланированы обработка ошибок и отказоустойчивость;
- найти пропущенные error paths, race conditions, silent failures и хрупкие transitions;
- убедиться, что proposed changes не создают скрытых operational hazards.

Что смотреть:
- `PRT-039` и `PRT-040` как документы, где должны быть error/failure semantics;
- `.memory-bank/spec/security/auth-and-access.md`
- `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`
- relevant workflow/runtime docs if needed;
- product-local protocols in parts about imports, access, channels, activation.

Что искать:
- где ошибки должны быть first-class states, но пока описаны слишком общо;
- где retry/recovery не отделены от normal path;
- где возможны гонки при import/activation/channel reassignment/membership changes;
- где возможны double-submit, duplicate import, conflicting activation, stale binding, lost update;
- где можно упростить sequencing для снижения race risk;
- не предполагает ли протокол проглатывание ошибок в пользу “user-friendly simplicity”.

Особый фокус:
- `ImportRun` lifecycle;
- source revision activation;
- channel and pipeline binding updates;
- membership/access changes;
- interaction between bot submission and backend workflow.

Ожидаемый отчет:
- карта основных failure modes;
- где нужен явный error policy;
- где нужен idempotency / dedup / optimistic concurrency / serialization;
- где можно упростить design ради reliability;
- какие ошибки должны логироваться/эскалироваться, а не скрываться.
