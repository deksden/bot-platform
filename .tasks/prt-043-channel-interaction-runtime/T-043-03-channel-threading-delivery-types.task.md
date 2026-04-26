---
task_id: T-043-03
title: Channel threading and delivery intent/result types
suggested_agent: worker / gpt-5.3-codex
status: READY
write_scope:
  - packages/channel-runtime/src/threading.ts
  - packages/channel-runtime/src/delivery.ts
  - packages/channel-runtime/src/index.ts
  - packages/channel-runtime/src/channel-runtime.spec.ts
report_path: .tasks/prt-043-channel-interaction-runtime/T-043-03-report.md
---

# T-043-03 Channel threading and delivery intent/result types

## Goal

Add provider-neutral threading intent and outbound delivery result-summary contracts to `@dd-bot-platform/channel-runtime`.
This task must keep side effects product-owned: only types and small pure helpers belong here.

## Context readiness checklist

Before editing, explicitly gather and record context in the report:
- confirm branch and git status;
- read `.memory-bank/index.md`;
- read `.memory-bank/spec/runtime/channel-runtime-contract.md`;
- read `.memory-bank/spec/runtime/command-framework-contract.md`;
- read `.memory-bank/spec/project/feature-area-boundaries.md`;
- read `.memory-bank/spec/operations/observability-and-incident-diagnostics.md`;
- read `.tasks/prt-043-channel-interaction-runtime/001-task-packet-template.md`;
- inspect `packages/channel-runtime/src/document.ts`, `render.ts`, `errors.ts`, `index.ts`, and `channel-runtime.spec.ts`;
- inspect `packages/core/src/control-plane/models.ts` and refs for existing `ChannelRef`/transport vocabulary;
- run searches for `replyThread`, `thread`, `delivery`, `attemptId`, `transportMessageRef`, `ChannelCapabilityMatrix`;
- list assumptions and any blockers before coding.

Do not code until the context is complete. If the docs or existing code contradict this task, stop and report the blocker.

## Implementation scope

Create lean channel-runtime contracts:
- threading config/intent:
  - product/channel instance can choose whether to reply in thread or not;
  - modes should cover at least `reply_to_inbound`, `new_thread`, and `none`;
  - include fallback behavior for unsupported/missing inbound target;
  - include optional inbound transport message reference and thread reference slots;
- delivery intent/result summary:
  - provider-neutral `OutboundDeliveryIntent` describing channelRef, target, document/format references, threading intent, and correlation ids;
  - provider-neutral `OutboundDeliveryResultSummary` with status, attempt id, transport message ref, trace/correlation ids, and safe diagnostics;
  - terminal statuses should distinguish delivered / suppressed / failed;
- pure helpers only if useful:
  - create default threading intent from config + inbound context;
  - classify delivery result terminal success/failure if needed by tests.

Export the new surface from `packages/channel-runtime/src/index.ts`.

## Non-goals

- no provider SDK senders;
- no email header generation or Telegram payload generation;
- no retry queue/orchestration;
- no DB tables/read models;
- no UI/admin;
- no product-specific defaults;
- no command parser/registry/dispatcher in channel-runtime.

## Tests

Extend package tests with deterministic coverage:
- default threading config can produce `reply_to_inbound` when inbound ref exists;
- fallback behavior can produce `new_thread` or `none` when inbound ref is missing/unsupported;
- delivery summary classifies delivered as terminal success;
- delivery summary classifies suppressed/failed distinctly;
- public exports expose the new types/helpers without importing product/provider code.

## Report

Write `.tasks/prt-043-channel-interaction-runtime/T-043-03-report.md` with:
- summary;
- context readiness evidence: docs read, searches run, files inspected, assumptions/blockers;
- files changed;
- implementation notes and deviations;
- checks run and results;
- risks/follow-ups;
- lessons learned / insights candidates, if any.
