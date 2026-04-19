---
file: '.memory-bank/mbb/templates/scenario.md'
description: 'MBB template: executable SCN-* scenario for platform, lifecycle, or golden-path verification.'
purpose: 'Copy when creating a new scenario document so it captures goal, fixtures, phases, evidence, and pass criteria clearly.'
version: '1.3.0'
date: '2026-04-05'
status: 'ACTIVE'
c4_level: 'standard'
parent: '.memory-bank/mbb/templates/index.md'
architecture: 'MBB Templates'
tags: [mbb, template, scenario, verification, evidence]
---

```yaml
file: .memory-bank/scenarios/SCN-XXX-[slug].md
description: [SCN-XXX - short description of the capability/journey being proved]
purpose: [Why this scenario matters for acceptance/verification]
version: 1.0.0
date: YYYY-MM-DD
status: DRAFT
scenario: SCN-XXX
kind: capability # capability | lifecycle | golden
execution_status: planned # planned | runnable_local | runnable_beta | mixed | archived
parent: .memory-bank/scenarios/index.md
epic: EP-XXX # optional
feature: FT-XXX-YY # optional
tags: [scenario, scn, domain-tag]
related_files:
  - .memory-bank/plans/verification-matrix.md
```

# [SCN-XXX] [Scenario Title]

> Опиши проверяемый use case, а не внутреннюю реализацию раннера.
> Если сценарий пока только acceptance anchor и ещё не оформлен как полный runnable contract, оставь `status: DRAFT`, `execution_status: planned` и не притворяйся closure-ready evidence source.

## Goal

Коротко: какую capability / lifecycle block / user journey доказывает этот сценарий.

## Kind

- `capability` / `lifecycle` / `golden`

## Covered Features

- Primary:
- Secondary:

## Execution Profile

- Execution modes:
- Automation level:
- Acceptance level:
- Beta gate:

> Для hosted сценариев предпочитай explicit combinations:
> - `beta_api`
> - `beta_ui`
> - `beta_external_manual`
> - `mixed`
> а не размытое "что-то на beta через браузер".

## Preconditions

> Фиксируй только действительно необходимые предусловия: fixture project, совместимость, environment, plugins, profiles.

- 

## Hosted Preflight

> Заполняй для `beta_api`, `beta_ui`, `beta_external_manual` и `mixed`. Если сценарий purely local, явно напиши `N/A`.

- Target hosted surfaces:
- Expected deployment pair / alias:
- Required environment identity check:
- Required auth / session bootstrap:
- External integration readiness:
- Proof that preview is not being used as beta replacement:

## Fixtures

- Fixture project:
- Fixture providers / profiles:
- Required plugins:
- Required external tooling / CLI:

## Phases

> Фазы должны быть реально исполнимыми и соответствовать evidence, которое собирает раннер.

1. [Phase name]
   - What happens:
   - Expected intermediate outcome:
   - Evidence:

2. [Phase name]
   - What happens:
   - Expected intermediate outcome:
   - Evidence:

## Expected Evidence

- Run ids / flow refs:
- Key artifacts:
- Reports / screenshots / logs:
- Acceptance outputs:
- Hosted UI proof:
- Hosted protected API / read-model proof:
- Hosted bootstrap/session proof:
- External manual proof if applicable:

## Environment Evidence

- Local / dev evidence:
- Beta / live evidence:
- Release-close evidence:

## Pass Criteria

> Сформулируй так, чтобы был однозначный verdict.

- 

## Supported Environments

- `local`
- `beta`
- `staging`

## Related Decisions / Docs

- ADR:
- Feature / spec:
- Protocol / evidence:
- Verification domains:

## Notes

- 

## Policy Notes

- Для externally-facing capabilities local scenario не закрывает приемку в одиночку.
- Если сценарий проверяет реальный transport, auth, storage, webhook, provider или user-facing surface, у него должен быть `beta` contour: `beta_api`, `beta_ui`, `beta_external_manual` или `mixed`.
- Для hosted beta сценариев требуется preflight: deployment pair, alias parity, `/health` или equivalent environment check, и рабочий auth/session bootstrap.
- Для hosted сценариев business truth по возможности выносится в `beta_api`, а browser automation остаётся thin proof layer.
- `preview` не считается заменой `beta`, если это не зафиксировано отдельным временным исключением и не подтверждено в `Hosted Preflight`.
- Для хрупких hosted flows предпочтительно двойное evidence: UI/browser proof плюс protected API/read-model proof.
- Если beta contour пока невозможен, это должно быть явно зафиксировано в `Beta gate` и `Notes`.
- `SCN/XE` files живут как flat canonical catalog; domain/epic indexes являются только overlay navigation.
