# Aspect A08: Observability, Logging, Diagnostics, and Investigability

Цель:
- проверить, достаточно ли в протоколе предусмотрен контур observability;
- убедиться, что после внедрения можно будет расследовать баги и operational incidents;
- найти missing telemetry/logging/trace requirements.

Что смотреть:
- `PRT-039`, `PRT-040`
- `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`
- `.memory-bank/spec/runtime/execution-traces-and-token-accounting.md`
- `.memory-bank/spec/runtime/trace-artifact-governance.md`
- `.memory-bank/spec/runtime/decision-explanation-envelope.md`
- любые docs про diagnostics / trace viewer / execution artifacts

Что искать:
- достаточно ли фиксируются start/finish/failure events;
- хватает ли correlation IDs / run IDs / import IDs / channel binding diagnostics;
- есть ли требования к structured logs, traces, artifacts, audit trail;
- предусмотрен ли capture context для расследований;
- не пропущены ли ключевые ветки логики;
- не оставлены ли critical paths без observability expectations.

Особый фокус:
- import workflow observability;
- access/membership/channel change auditability;
- product-instance/channel/source management diagnostics;
- failure investigation for background workflows;
- использование проектных средств observability, если они есть, вместо ad hoc logging.

Ожидаемый отчет:
- что уже покрыто хорошо;
- что необходимо явно доложить в protocol;
- какие logs/artifacts/events должны быть обязательными;
- где нужен явный audit trail;
- как не скатиться в шумный, но бесполезный логгинг.
