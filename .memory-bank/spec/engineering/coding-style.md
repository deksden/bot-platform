---
file: .memory-bank/spec/engineering/coding-style.md
description: Coding style baseline for bot-platform, including logging, error-handling, traceability, and boundary discipline rules.
purpose: Read before implementation so framework and product-integrating code keeps consistent observability and error semantics.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
tags: [spec, engineering, coding-style, observability, errors, framework]
parent: .memory-bank/spec/engineering/index.md
related_files:
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/security/auth-and-access.md
  - .memory-bank/spec/operations/runbook.md
  - .memory-bank/mbb/frontmatter-standards.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Migrated shared coding-style and observability guardrails from mixed-repo docs into framework-owned form, removing product-specific path assumptions.
---

# Coding Style

## Purpose

Зафиксировать минимальные инженерные правила, чтобы:
- код был предсказуемым;
- ошибки обрабатывались одинаково;
- observability не зависела от индивидуального стиля автора.

## Logging rules

### Use structured logging only
- use platform logger helpers
- log with `event` and structured payload
- avoid free-form debug paragraphs in application logs

### No direct `console.*`
- `console.*` запрещен в production runtime modules
- исключения допускаются только там, где это явно зафиксировано код-стандартом owning repo
- CLI user output должен идти через `process.stdout` / `process.stderr`

### Log ownership
- error логируется один раз в owning boundary
- не дублировать одно и то же исключение на каждом слое

### Required boundary behavior
Every HTTP/webhook/job boundary:
- creates correlation context
- logs start / completion / failure where meaningful
- preserves request/attempt identifiers end-to-end

## JSDoc traceability rules

Governed code that implements documented behavior should carry trace tags.

Required tags on primary implementation owners:
- `@epic EP-XXX` when epic-owned
- `@feature FT-XXX-YY` when feature-owned
- `@spec SPEC-XXX` when spec-governed

Recommended complementary tags:
- `@docs path/to/doc.md`
- `@see path/to/doc-or-code`

Apply this on:
- route handlers
- service entrypoints
- adapters/integration boundaries
- other modules that are primary implementation owners

Do not over-tag:
- tiny pure helpers
- trivial type-only files
- every internal function in one module

## Memory Bank linkage rules

When a Memory Bank document describes implemented behavior, it should expose code linkage in frontmatter via `implementation_files` where practical.

Typical docs that should carry `implementation_files` after implementation exists:
- feature docs
- specs
- ADRs with concrete code anchors
- implementation reports/protocol summaries

`related_files` is for conceptual linkage.  
`implementation_files` is for “where it lives in code”.

## Error handling rules

### Expected errors
- represent as typed/domain errors
- return safe contract payload
- avoid noisy exception telemetry by default

### Unexpected errors
- capture in the configured telemetry sink
- log structured failure with correlation ids
- fail fast at boundary

### Preserve `cause`
When rethrowing or wrapping an error:
- keep `cause` where available
- do not replace useful context with generic text only

## Retry rules

- retries only for idempotent or attempt-based operations
- retry exhaustion must be observable
- do not retry validation/auth/forbidden/not-found errors

## Ambiguity and research-before-code rule

Если после grounding остаются неясности, которые могут materially изменить:
- contract shape;
- boundary ownership;
- fallback behavior;
- rollout semantics;
- acceptance design;

implementation не должен продолжаться “по догадке”.

Обязательное правило:
- unresolved ambiguity фиксируется в owning feature/protocol/spec doc;
- до coding выполняется focused research against current code owners and docs;
- implementation начинается только после deliberate narrowed decision.

## Database and access boundary rules

- internal tables must not rely on exposed public access as a shortcut;
- schema changes ship with explicit `RLS + grants + exposure decision`;
- direct data-API access to internal operational tables запрещен без documented exception и verification;
- security hardening applies both to migration paths and legacy bootstrap DDL where still present;
- for DB/auth/data-surface changes run the repo security verification gate before marking wave ready.

## Privacy rules

Never log:
- tokens
- passwords
- authorization headers
- cookies
- secret keys
- full prompt payloads
- chain-of-thought

Prefer logging identifiers, counts, and short summaries instead of raw user/customer content.
