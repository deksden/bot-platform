---
file: .memory-bank/guides/index.md
description: 'Guides hub для bot-platform: Diataxis-layer для framework consumers, maintainers и product repos, использующих platform packages и standards.'
purpose: Использовать как user-facing вход в документацию `bot-platform`, когда нужен ответ не только "что является нормой", но и "как этим framework-layer пользоваться и как его правильно встраивать".
version: 0.1.0
date: 2026-04-19
status: DRAFT
tags: [guides, diataxis, bot-platform, framework, reference, how-to]
parent: .memory-bank/index.md
children:
  - tutorials/index.md
  - how-to/index.md
  - explanation/index.md
  - reference/index.md
history:
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial draft guides hub for the future bot-platform Memory Bank under PRT-036.
---

# Guides Hub

Этот раздел считается user-facing слоем `bot-platform`, но его аудитория не end-customer.
Главные читатели:
- framework maintainers;
- authors of product repos;
- operators, которые работают с shared release/verification tooling;
- AI agents, которым нужно быстро понять supported usage paths.

## Diataxis map

- [Tutorials](tutorials/index.md): пошаговый onboarding для первого успешного результата на framework layer.
- [How-to guides](how-to/index.md): практические задачи для maintainers и product repos.
- [Explanation](explanation/index.md): объяснение ownership model, package layering и verification model.
- [Reference](reference/index.md): точные contracts, authoring formats и release/verification reference docs.

## Что должно существовать сразу

Минимальный стартовый набор guides для `bot-platform`:

- `tutorials/index.md`
- `how-to/index.md`
- `explanation/index.md`
- `reference/index.md`
- `reference/environment-access-and-verification.md`
- `reference/npm-cli-release-runbook.md`
- `reference/deterministic-beta-scenarios.md`
- `reference/hosted-beta-scenario-playbook.md`
- `reference/judge-authoring-format.md`
- `reference/runtime-authoring-format.md`
- `reference/runtime-model-policy-format.md`
- `reference/runtime-model-profile-format.md`
- `reference/telegram-bot-integration-declarations.md`

## First guide families

### Tutorials

Первые tutorial docs должны помогать сделать bounded first success:
- подключить product repo к platform package;
- добавить новую framework-owned scenario;
- пройти базовый package release + verification path.

### How-to

Практические guide families для первых волн:
- как добавить новую operation contract + SDK consumer;
- как author'ить shared scenario и evidence expectations;
- как выпускать npm package из framework repo;
- как mirror'ить MBB в product repos без content drift.

### Explanation

Этот слой нужен, чтобы не переучивать команду в каждом репо заново.
Сразу полезны объяснения про:
- framework vs product ownership;
- package layering и dependency rules;
- hosted verification layering (`beta_api`, `beta_ui`, `beta_external_manual`).

### Reference

Reference section должен стать домом для stable shared contracts и runbooks, которые действительно используются несколькими repo:
- authoring formats;
- deterministic beta guidance;
- release/reference docs;
- shared environment/verification notes.

## Explicit exclusions

В `bot-platform/guides` не должны переезжать:
- business-profile tutorials;
- SellerAgent operator runbooks;
- Docoved local/hosted acceptance packs;
- product deployment guides и product secret maps.
