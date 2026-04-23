---
file: .memory-bank/spec/engineering/delivery-standards.md
description: Delivery standards for bot-platform and consuming product repos, defining evidence-first closure and environment readiness gates.
purpose: Read before merging or promoting changes so implementation waves close with explicit verification and deployment signals instead of assumptions.
version: 1.1.0
date: 2026-04-21
status: ACTIVE
tags: [spec, engineering, delivery, verification, evidence, framework]
parent: .memory-bank/spec/engineering/index.md
related_files:
  - .memory-bank/spec/operations/git-flow.md
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/security/auth-and-access.md
history:
  - version: 1.1.0
    date: 2026-04-23
    changes: Added the dist-verifier sequencing rule so compiled `dist` checks are not treated as valid evidence until the producing build has completed.
  - version: 1.0.0
    date: 2026-04-21
    changes: Migrated the mixed-repo delivery baseline into framework-owned standards and trimmed product-specific deployment/auth assumptions.
---

# Delivery Standards

## Purpose

Зафиксировать минимальную дисциплину закрытия implementation waves так, чтобы:
- delivery был трассируемым;
- verification и promotion были evidence-driven;
- framework и product repos не расходились по обязательному quality baseline.

## Mandatory closure checklist

Каждая wave с реальными изменениями считается завершенной только если:
1. Коммиты и PR привязаны к owning `FT-*`, `EP-*` или protocol task.
2. Прогнаны обязательные code-quality проверки для затронутого слайса.
3. Прогнан хотя бы один релевантный scenario/verification contract из owning repo matrix.
4. В owning feature/protocol evidence отражены результаты quality and acceptance checks.
5. Для user-facing или runtime-facing изменений есть hosted verification на целевом staging контуре.
6. Для deploy/integration изменений есть evidence по CI и target deployment readiness.
7. Для runtime/channel changes соблюден observability baseline: correlation ids, structured logs и error policy.
8. Для hosted closures выполнен preflight: deployment pair compatibility, alias parity, environment identity и auth/session bootstrap readiness.
9. Для hosted user-facing/operator-facing flows есть минимум два evidence слоя: UI/browser proof и protected API/read-model proof, когда это технически возможно.
10. Hosted acceptance по умолчанию проектируется как API/read-model first; browser automation не должна быть единственным слоем business assertions.
11. Для DB/auth/data-surface changes зафиксирован security closure gate:
  - exposure decision documented
  - security verification command(s) executed
  - hosted rollout/preflight has explicit security evidence or `N/A` reason.

## Pre-implementation ambiguity gate

До начала реализации feature/protocol должна пройти ambiguity check.

Минимальный вопрос:
- есть ли неясности, которые могут изменить contract shape, ownership boundary, fallback semantics, rollout model или acceptance contour?

Если ответ “да”, обязательны следующие действия:
1. зафиксировать open questions в owning feature/protocol doc;
2. явно отметить, что implementation plan предварительный;
3. провести focused research pass до кодинга;
4. обновить doc после research с narrowed design.

Implementation slice не считается ready, если:
- ключевое поведение still depends on guesswork;
- acceptance assertions нельзя сформулировать конкретно;
- boundary ambiguity скорее всего приведет к rework across multiple modules.

## Implementation-wave closure contract

Для каждой завершенной code wave дополнительно нужен внешний closure signal поверх локальных проверок.

Минимальный набор:
- relevant GitHub checks green for pushed wave commit or merge commit;
- target deployment status `Ready` for the affected hosted surface (если wave hosted-facing);
- evidence explicitly records:
  - commit sha;
  - GitHub workflow/run ids and final status;
  - target environment(s);
  - deployment ids or URLs and final `Ready` status;
  - note if a signal is `N/A` and why.

### Merge-policy consequence

Для protected branches нормальный путь:
- PR merge commit как default.

Следствия:
- coherent local slice history не должна молча схлопываться на границе protected branch;
- closure evidence может ссылаться на pushed wave commits или resulting merge commit;
- если выбран `squash` или `rebase`, это фиксируется как explicit exception в closure evidence.

## Environment gates

### Preview
- используется для PR/branch validation;
- подходит для smoke и integration sanity checks;
- не заменяет staging acceptance без явного documented exception.

### Staging/Beta
- обязательный контур для hosted verification перед production promotion;
- runtime/channel-facing изменения проходят этот контур;
- acceptance проводится только после подтверждения совместимого deployment pair.

### Production
- получает только промоутнутые изменения из protected promotion path;
- проверки на prod минимальны и без разрушительных ручных экспериментов.

## Evidence expectations

Для значимых waves фиксируем:
- commit/PR linkage;
- какие проверки и сценарии прогнаны;
- какой deployment/alias использовался;
- какой hosted preflight пройден;
- какие CI workflows green и для какого commit;
- итоговый статус `success / ready / failed`;
- причину и исправление, если был fail перед green.

## Rules for this framework

- `main`/`develop` и эквивалентные protected branches не принимают direct push.
- Параллельные implementation waves ведутся через отдельные `git worktree`.
- Shared contract changes мержатся ранними малыми слайсами, чтобы не накапливать cross-wave rebase debt.
- Если wave включает dependency bump и последующие проверки должны видеть новый installed surface, одного lockfile-only обновления недостаточно: нужен реальный install/relink перед typecheck/build/scenario verification.
- Если verifier или scenario proof запускается по compiled `dist` artifacts, producing build должен завершиться до старта `node --test` или любого другого dist-based check; иначе evidence может читать stale compiled output и считается некорректным.

## Non-goals

- Не описывать здесь команды конкретной CI-системы.
- Не превращать standard в incident runbook.
- Не фиксировать product-specific deployment topology как framework truth.
