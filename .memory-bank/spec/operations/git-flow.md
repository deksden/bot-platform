---
file: .memory-bank/spec/operations/git-flow.md
description: Git flow for sales-agent - stable promotion path from feature work to beta and production.
purpose: Read before creating branches or promoting changes so beta/prod releases stay predictable and traceable.
version: 1.2.0
date: 2026-04-19
status: ACTIVE
tags: [spec, operations, git-flow, delivery, promotion]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/plans/verification-matrix.md
---

# Git Flow

## Purpose

Зафиксировать простой и устойчивый promotion path для платформы, где есть отдельные `beta` и `prod` окружения и live channel integrations.

## Branches

- `main`: production branch. Деплоится в production environment.
- `develop`: staging branch. Деплоится в beta environment.
- `feature/*`: рабочие ветки от `develop`.
- `hotfix/*`: экстренные правки от `main`.

## Current implementation phase

- Active parallel streams:
  - `EP-006 Operator Control Plane`
  - `EP-010 Operator Auth And Access`
- Deferred next stream:
  - `EP-008 Scenarios And Verification` starts after the first stable operator/auth surfaces land on `develop`.
- Parallel planning reference:
  - [Parallel delivery plan](../../plans/parallel-delivery-plan.md)

## Branch naming

- `feature/FT-XXXX-<slug>` — по умолчанию.
- `feature/EP-XXX-<slug>` — если работа поперек нескольких FT внутри одного эпика.
- `hotfix/FT-XXXX-<slug>` или `hotfix/EP-XXX-<slug>` — только для срочных production fixes.

## Promotion path

1. Работа идет в `feature/*`.
2. Merge `feature/* -> develop` через PR.
3. Hosted beta deployment pair is prepared and verified.
4. Проверка на `beta`.
5. Merge `develop -> main` через PR.
6. Проверка production deploy и post-release smoke.

## Merge rules

- Прямые push в `main` и `develop` запрещены.
- `main` и `develop` защищены branch protection.
- Любой merge делается только через PR.
- Политика по умолчанию для protected branches: `merge commit`.
- Нормальный путь promotion:
  - `feature/* -> develop` через PR merge commit;
  - `develop -> main` через PR merge commit;
  - `hotfix/* -> main` через PR merge commit с обязательным back-merge в `develop`.
- `squash` и `rebase` merge не являются стандартным delivery path.
- Если feature-ветка получилась слишком шумной, историю нужно привести в порядок на самой feature-ветке до PR, а не компенсировать это squash на границе protected branch.
- Coherent local commits должны сохранять связь с implementation slices, protocol evidence и review context после merge в `develop` и `main`.
- Для параллельных implementation waves каждый активный epic stream должен жить в отдельном `git worktree`.
- Если нужен hotfix:
  1. `hotfix/*` от `main`
  2. merge в `main`
  3. обязательный back-merge `main -> develop`

## Worktree rules

- Каждый активный epic stream получает:
  - свою feature branch
  - свой `git worktree`
  - своего owning agent или подкоманду
- Recommended worktree naming:
  - `sales-agent-ep006`
  - `sales-agent-ep010`
  - `sales-agent-ep008`
- Recommended branch naming:
  - `feature/EP-006-operator-control-plane`
  - `feature/EP-010-operator-auth-access`
  - `feature/EP-008-scenarios-verification`
- Worktrees branch from `develop`, not from `main`.
- Shared contract changes should be merged early and in small slices to reduce rebasing pain across worktrees.

## Required checks before merge to `develop`

- typecheck/build/tests для затронутого слайса;
- relevant `SCN-*` / `XE-*` по verification matrix;
- preview deploy `Ready`, если менялся web/server surface;
- если фича влияет на runtime/channel behavior, должен быть запланирован beta verification step.
- если фича требует hosted acceptance, должен быть подготовлен hosted beta preflight plan, а не только сценарный intent.

## Required checks before merge to `main`

- beta deployment `Ready`;
- hosted beta deployment pair verified for the scenario set being used;
- beta verification for user-facing/runtime-facing changes is green;
- evidence обновлен в feature/epic/scenario docs;
- production promotion согласован только из `develop`, без cherry-pick из feature branches.

## Notes for this project

- Preview deployments не являются staging replacement.
- `develop -> beta` считается завершённым только после подтверждения реального aliased deployment pair, а не по одному факту существования preview deploy.
- Live Telegram webhooks не привязываются к preview branches.
- Telegram-related promotion смотрим по beta/prod server environments, а не по случайным branch URLs.
- Пока `develop` только активируется, текущий stable baseline остается на `main`; после activation parallel feature work should stop branching from `main`.

## Related specs

- [Deployment architecture](deployment-architecture.md)
- [Delivery standards](../engineering/delivery-standards.md)
