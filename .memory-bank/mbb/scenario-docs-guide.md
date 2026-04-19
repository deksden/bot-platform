---
file: '.memory-bank/mbb/scenario-docs-guide.md'
description: 'MBB guide: how to document executable SCN-* scenarios for platform and lifecycle verification.'
purpose: 'Read when creating or updating scenario documents so platform scenarios stay reproducible, evidence-first, and distinct from normal tests.'
version: '1.2.0'
date: '2026-03-17'
status: 'ACTIVE'
c4_level: 'standard'
parent: '.memory-bank/mbb/index.md'
architecture: 'MBB Standards'
tags: [mbb, scenario, testing, verification, evidence]
---

# Scenario Docs Guide

Этот guide фиксирует, как документировать `SCN-*` сценарии для платформы и lifecycle blocks.

## 1. Что такое scenario

`Scenario` — это first-class executable verification contract.

Он нужен, когда мы хотим проверить:
- platform capability;
- lifecycle block;
- canonical user journey;
- operational rehearsal платформы в подготовленной среде.

## 2. Чем scenario отличается от test

Тест:
- проверяет код, API, контракт или UI behaviour на уровне unit/integration/e2e.

Scenario:
- проверяет, что система как инструмент реально работает end-to-end;
- использует controlled environment, fixture projects, flows, evidence collection;
- даёт verdict по capability/use case, а не только по одному куску кода.

## 3. Когда нужен scenario

Используй scenario, когда нужно проверить:
- `mb-sync`/compatibility bootstrap;
- wanted outcome shaping;
- `mini` как implementation engine;
- queued merge / child-flow queueing;
- acceptance and beta verification;
- plugin install / readiness flows;
- golden user journey платформы.

## 4. Что должен содержать scenario doc

Минимум:
- `scenario id`
- `goal`
- `kind` (`capability`, `lifecycle`, `golden`)
- `preconditions`
- `fixtures`
- `phases`
- `expected evidence`
- `pass criteria`
- `supported environments`
- links на related ADR/feature/spec, если релевантно

## 4a. Flat catalog, overlay navigation

Канонические scenario docs хранятся как flat `SCN-*` / `XE-*` files under `scenarios/`.

Допустимы вторичные overlay-индексы:
- по verification domain;
- по epic;
- по другой navigation projection, если она помогает чтению.

Правило:
- сам `SCN/XE` file и его id остаются SSoT;
- overlay indexes не заменяют канонический scenario doc;
- не нужно физически раскладывать сценарии по domain-owned папкам как по новой primary hierarchy.

## 4b. Planned anchor vs full scenario contract

У scenario есть два нормальных состояния зрелости:

- `planned anchor`
  - acceptance/design anchor существует, но runnable contract ещё не оформлен полностью;
  - допустима короткая форма;
  - не должен притворяться closure-ready evidence source.
- `full scenario contract`
  - документ уже содержит execution profile, fixtures, phases, expected evidence и pass criteria;
  - может использоваться в verification matrix и feature closure.

Правило:
- planned anchor допустим на ранней стадии feature/spec;
- acceptance-critical scenario должен быть доведён до full contract до feature closure;
- короткий scenario stub не должен silently считаться полноценным must-run contract.

## 5. Evidence-first rule

Scenario не заканчивается только `passed/failed`.

Он должен оставлять:
- summary report;
- relevant run ids;
- evidence artifacts;
- explicit verdict;
- follow-up notes, если сценарий провалился или дал partial result.

Raw runner output, debug dumps и длинные workspace logs не являются Memory Bank scenario doc.
Они живут в artifact/evidence layer; в scenario doc хранится только curated contract и expected evidence shape.

## 6. Local vs hosted rule

Для externally-facing capabilities одного `local` контура недостаточно.

Используй:
- `local/dev` — для инженерной отладки, фикстур и regression safety;
- `beta/live` — для финальной приемки на реальном домене, с реальными env, auth, transport, webhook, storage и provider wiring.

`preview` не считается эквивалентом `beta` по умолчанию.

Если сценарий проверяет:
- auth;
- webhook;
- Telegram / provider transport;
- hosted operator UI;
- storage/provider wiring;

то scenario doc обязан явно фиксировать hosted contour и `Hosted Preflight`.

## 7. Hosted execution model

Hosted scenario не должен быть одним расплывчатым "ручным beta smoke".

Предпочтительная модель:
- `beta_api` — основной hosted deterministic proof через SDK/API и canonical assertions;
- `beta_ui` — тонкий browser proof поверх уже подтверждённого hosted state;
- `beta_external_manual` — только для truly external systems и live-channel checks;
- `mixed` — если сценарий осознанно сочетает несколько hosted execution layers.

## 8. Hosted preflight rule

Для `beta_api`, `beta_ui`, `beta_external_manual` и `mixed` сценариев обязательно документируй:
- какие hosted surfaces проверяются;
- какой deployment pair считается целевым;
- как подтверждается environment identity;
- как поднимается hosted session/bootstrap;
- почему текущий запуск действительно идёт против `beta`, а не против случайного preview alias.

Это не формальность. Большая часть hosted фейлов происходит не в feature logic, а в deployment/env wiring.

## 9. Determinism rule

Для hosted сценариев старайся вынести большую часть business assertions из браузера:
- seeded context должен быть явным;
- canonical state должен читаться через protected API/read-model path;
- UI automation должна доказывать governed visual/interaction layer, а не заменять backend truth.

Если removing browser still leaves most assertions intact, scenario should probably be mostly `beta_api`.

## 10. Dual evidence rule

Для hosted user-facing flows browser/UI automation полезна, но не должна быть единственным доказательством.

Если это возможно, собирай минимум два типа evidence:
- hosted UI/browser proof;
- protected API/read-model proof или другой канонический server-side evidence path.

Так расследование становится устойчивее, даже если браузерная автоматизация flaky.

## 11. Runner rule

Scenario runner может быть реализован поверх `vitest`, но:
- `vitest` — это harness;
- `SCN-*` — это смысловая модель.

Документация scenario не должна превращаться в пересказ test runner API.

## 12. GUI/browser rule

Если scenario включает GUI/browser automation:
- он должен опираться на screen contracts;
- использовать POM mapping;
- использовать стабильные `data-testid`;
- следовать project-level UI automation contract.

## 13. Naming rule

Используй идентификаторы вида:
- `SCN-001`
- `SCN-002`

и короткий slug/название, объясняющее цель сценария.

Идентификатор должен быть уникальным.
Недопустимо держать два разных scenario docs с одним и тем же `SCN-XXX`.

## 14. Practical scope rule

Не делай scenario слишком узким:
- если он проверяет только один helper method, это test, а не scenario.

Не делай scenario слишком расплывчатым:
- он должен иметь ясные pass criteria и reproducible preconditions.

## 15. Minimal metadata rule

Для full scenario contract поддерживай минимум:
- `scenario`
- `kind`
- `status`
- `execution_status`
- `parent`
- `tags`

Рекомендуется дополнительно:
- `epic`
- `feature`
- `related_files`
- `implementation_files`
- `verification_domains`, если проект использует domain overlays.
