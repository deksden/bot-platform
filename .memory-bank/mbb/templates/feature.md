---
file: .memory-bank/epics/[EP-XXX]/[FT-XXX-YY]/index.md
description: [Feature Name] - [brief description of the delivered value and implementation scope]
purpose: Reference when implementing, verifying, or closing this feature
version: 1.5.0
date: YYYY-MM-DD
status: ACTIVE
epic: EP-XXX
feature: FT-XXX-YY
user_value: [Specific value this feature delivers]
target_audience: [implementers, testers, maintainers]
tags: [feature, delivery, acceptance]
parent: .memory-bank/epics/[EP-XXX]/index.md
implementation_files:
  - apps/[app-or-package]/src/[primary-implementation-file].ts
related_files:
  - .memory-bank/specs/[SPEC-XXX].md
history:
  - version: 1.0.0
    date: YYYY-MM-DD
    changes: Initial feature documentation created from MBB template
---

# Feature [FT-XXX-YY]: [Feature Name]

> Feature — это минимальная unit of delivered value. Не превращай feature в длинный protocol-log или в полный implementation spec.

## Traceability (mandatory)

- Epic: [EP-XXX](../index.md)
- Spec(s): [SPEC-XXX](../../specs/[SPEC-XXX].md)
- Related runs / evidence: [link if already exists]
- Implementation files: keep `implementation_files` in frontmatter updated once the feature has a concrete code anchor.
- Code trace tags: primary implementation owners should carry JSDoc `@epic`, `@feature`, and relevant `@spec`.

> Feature должна связывать value -> spec -> evidence. Если traceability не выстроена, feature быстро становится “ещё одним markdown-файлом”.
> Для зрелой traceability код тоже должен ссылаться обратно на `EP/FT` через JSDoc теги там, где это имеет смысл.

## User value

Что меняется для пользователя или системы и какой outcome должен появиться.

> Пиши в терминах результата, а не списка внутренних рефакторингов.

## Scope / non-goals

### In scope
- [Delivered capability 1]
- [Delivered capability 2]

### Non-goals
- [Explicitly excluded item 1]
- [Explicitly excluded item 2]

## Affected areas

- [Subsystem / feature area 1]
- [Subsystem / feature area 2]

> Этот раздел помогает grounding и impact analysis. Здесь достаточно верхнеуровневых boundaries, а не списка файлов.

## Context (SSoT links)

- [Relevant system/project doc](../../docs/[path].md) — [why it must be read]
- [Relevant architecture/contract doc](../../docs/[path].md) — [why it matters]

## Project grounding (mandatory before coding)

- [ ] Прочитан feature doc целиком.
- [ ] Прочитаны связанные SSoT docs из `Context`.
- [ ] Понятны затронутые boundaries / feature areas / ownership rules.
- [ ] Понятен expected acceptance contour.
- [ ] Определён минимальный regression gate.
- [ ] Зафиксировано, что уже реализовано в проекте и какие текущие surfaces эта feature не должна обойти или сломать.
- [ ] Security / access / data-exposure impact рассмотрен явно.
- [ ] Если меняется schema/storage/auth/data surface, зафиксированы `RLS + grants + exposure decision + hosted verification`.
- [ ] Если остаются contract/boundary/fallback ambiguities, они явно перечислены ниже и перед кодингом запланирован отдельный research pass.

> Grounding — это обязательная часть feature lifecycle. Без него implementation plan считается предварительным.

## Open questions / required research

- [Open question or `none`]
- [Required research step or `none`]

> Если здесь остаются нетривиальные вопросы, которые могут materially поменять design, реализация не должна идти “по ощущению”.
> Сначала narrowing/research, потом coding.

## Acceptance intent

Опиши, как будем доказывать, что feature действительно доставлена.

### Scenario summary
- [Scenario 1] — [what it proves]
- [Scenario 2] — [what it proves]

### Execution contour
- `dev/local`: [yes/no + why]
- `beta/staging`: [yes/no + why]
- `human review needed`: [yes/no + why]
- `hosted preflight required`: [yes/no + why]
- `preferred hosted execution model`: [`beta_api` / `beta_ui` / `beta_external_manual` / `mixed` + why]

### Expected evidence
- [Artifact / screenshot / report / log / command output]
- [Artifact / screenshot / report / log / command output]
- [Hosted UI proof if relevant]
- [Protected API/read-model proof if relevant]

### Security / access review
- exposure decision: [`internal_only` / `explicit_exposed_surface` / `N/A`]
- RLS / grants impact: [what changes or why none]
- hosted security verification: [`pnpm verify:security`, `pnpm verify:security:live`, Advisor/manual proof, or `N/A`]

> Acceptance intent должен быть реалистичным и исполнимым. Не пиши абстрактное “проверить, что всё работает”.
> Если feature затрагивает hosted UI, auth, webhook, transport, storage или provider wiring, `beta/staging` contour и hosted preflight нужно планировать заранее.
> Если hosted flow можно доказать через canonical API/read-model path, делай `beta_api` основным acceptance layer, а UI оставляй thin proof.
> Если feature меняет DB/auth/data surfaces, security review не оставляется “на потом” и планируется здесь же.

## Implementation plan

Краткий grounded plan реализации:
- [Step / slice 1]
- [Step / slice 2]
- [Step / slice 3]

> Здесь нужен именно implementation plan уровня feature, а не полный execution protocol.
> Если change требует отдельного normative design, migration semantics или shared contract work, рядом должен появиться `SPEC-*`, а не разрастаться сама feature.

## Tests / verification

- Unit: [what is expected]
- Integration: [what is expected]
- E2E / acceptance automation: [what is expected]
- Manual verification (if needed): [what is expected]

## Docs updates (SSoT / Memory Bank)

- [Document / section that must be updated]
- [Document / section that must be updated]

> Если feature меняет architecture, acceptance, delivery/ops contract или user-visible behavior, docs updates обязательны.

## Quality checks evidence

- Date: YYYY-MM-DD
- Checks run:
  - `[command]`
  - `[command]`
- Result: passed / failed
- Notes: [short explanation]

## Acceptance evidence

- Date: YYYY-MM-DD
- Scenario(s) run: [scenario ids / descriptions]
- Result: passed / failed / partial
- Artifacts:
  - [artifact link]
  - [artifact link]

## CI/CD evidence

Если для feature релевантны deploy/runtime/integration changes:
- GitHub workflow(s): [Verification / Release Packages / other]
- GitHub run link(s): [link]
- GitHub status: [success / failed / N/A]
- Vercel deploy URL / environment: [link]
- Vercel status: [Ready / failed / N/A]

Если не релевантно:
- `N/A` — [why]

> Для implementation wave closure external signals не опускаются молча. Даже если deploy или workflow не релевантны, это должно быть явно отмечено как `N/A`.

## Closure state

- Current state: `drafted | planned | implementing | candidate_ready | accepted_dev | merged | accepted_beta | completed | follow_up_needed`
- Open follow-ups:
  - [gap / follow-up]
  - [gap / follow-up]

> Closure state должен отражать реальный delivery lifecycle, а не просто “ACTIVE/COMPLETED” в frontmatter.

## Project-specific addendum for `sales-agent`

При использовании этого шаблона в `sales-agent` дополнительно соблюдаем:
- feature описывается как vertical slice, а не как список задач по слоям;
- если feature трогает runtime surface, она должна явно указать contract impact;
- если feature участвует в пользовательском пути, она должна быть привязана хотя бы к одному `SCN-*` или `XE-*`;
- для externally-facing feature acceptance contour должен явно различать `local` и `beta` anchors;
- для externally-facing feature hosted acceptance plan должен быть виден ещё до начала реализации, а не добавляться постфактум;
- для implementation wave, в которую попадает feature, внешний closure signal обязан быть отражен явно:
  - GitHub checks green or `N/A`
  - Vercel deployment `Ready` or `N/A`;
- если feature требует GUI, UI logic не должна становиться единственным местом реализации поведения;
- перед реализацией feature обязательно проходит `Project grounding`; implementation plan без grounding считается предварительным;
- закрытая feature не должна превращаться в execution log; в самой feature фиксируется только краткий `Implementation result`, а подробная сводка волны живет в `protocol` / curated evidence layer;
- как только у feature появляется реальный кодовый owner, frontmatter должен по возможности заполнить `implementation_files`;
- primary implementation files should carry JSDoc trace tags back to `EP/FT` and relevant `SPEC-*`;
- feature с реальными интеграциями не считается полностью закрытой, пока нет `beta` evidence или явно зафиксированного временного исключения.
