---
task_id: T-043-02
title: Command framework typed contracts in core
suggested_agent: worker / gpt-5.3-codex
status: READY
write_scope:
  - packages/core/src/command-framework/**
  - packages/core/src/index.ts
  - packages/core/src/command-framework.spec.ts
report_path: .tasks/prt-043-channel-interaction-runtime/T-043-02-report.md
---

# T-043-02 Command framework typed contracts in core

## Goal

Add the first lean, product-neutral command-framework implementation surface to `@dd-bot-platform/core`.
This task must implement typed contracts and pure helpers only: command actor context, invocation envelope, parser result, registry metadata, actor/channel availability policy, dispatcher result envelopes, and deterministic tests.

## Context readiness checklist

Before editing, explicitly gather and record context in the report:
- confirm branch and git status;
- read `.memory-bank/index.md`;
- read `.memory-bank/spec/runtime/command-framework-contract.md`;
- read `.memory-bank/spec/project/feature-area-boundaries.md`;
- read `.memory-bank/spec/operations/observability-and-incident-diagnostics.md`;
- read `.tasks/prt-043-channel-interaction-runtime/001-task-packet-template.md`;
- inspect `packages/core/src/index.ts`;
- inspect existing `packages/core/src/runtime/**` and `packages/core/src/control-plane/**` patterns for type-only contracts, errors, and tests;
- run searches for `Command`, `access_denied`, `Capability`, `Actor`, `ChannelRef`, `ResultIntent`;
- list assumptions and any blockers before coding.

Do not code until the context is complete. If the docs or existing code contradict this task, stop and report the blocker.

## Implementation scope

Create `packages/core/src/command-framework/` with a narrow surface:
- actor/context vocabulary for command availability:
  - user types must cover at least `system_admin`, `workspace_admin`, `employee`, `known_external`, `unknown_external`, and `anonymous`;
  - actor context must be generic and product-neutral;
- command envelope:
  - stable `commandKey`;
  - raw input and normalized args;
  - actor, channel, ownership/scope, correlation metadata;
- parser contracts:
  - parsed / not-a-command / failed result variants;
  - parse diagnostics separate from validation/access/dispatch;
- registry contracts/helpers:
  - command definition metadata;
  - `createCommandRegistry`, `listCommandDefinitions`, `getCommandDefinition`, `requireCommandDefinition`;
  - duplicate-key detection;
- availability policy:
  - actor-type allow/deny;
  - channel-kind allow/deny;
  - concrete channelRef allow/deny;
  - deny must win over allow;
  - missing policy should be permissive by default for registered commands, while products can deny externally;
- dispatch contracts/helpers:
  - normalized success/failure result envelope;
  - failure classes: `parse_error`, `unknown_command`, `validation_error`, `access_denied`, `dispatch_error`;
  - dispatcher invokes product-owned handler only after registry and availability checks;
  - handler may return payload, canonical response document later, or custom product payload via generic type.

Export the new surface from `packages/core/src/index.ts`.

## Non-goals

- no product command catalog;
- no Telegram/email parser quirks;
- no channel-runtime import from core;
- no DB/read-model persistence;
- no UI/admin;
- no provider SDK sender, queue, retry orchestration, or hosted deploy work;
- no broad refactor outside the write scope.

## Tests

Add deterministic Node test coverage in the package style:
- duplicate command keys are rejected;
- unknown command dispatch returns `unknown_command`;
- actor/channel/channelRef deny overrides allow;
- actor-type allow enables a command for the matching actor type;
- handler dispatch success returns normalized success envelope;
- thrown handler error returns `dispatch_error` without exposing raw secrets or stack as public summary.

If the repo currently only builds spec files via `tsc`, follow that existing style.

## Report

Write `.tasks/prt-043-channel-interaction-runtime/T-043-02-report.md` with:
- summary;
- context readiness evidence: docs read, searches run, files inspected, assumptions/blockers;
- files changed;
- implementation notes and deviations;
- checks run and results;
- risks/follow-ups;
- lessons learned / insights candidates, if any.
