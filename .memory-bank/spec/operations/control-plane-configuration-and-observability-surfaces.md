---
file: .memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md
description: Framework operations contract for control-plane surfaces that read and mutate channel bindings, model-policy assignments, knowledge sources, and execution diagnostics.
purpose: Read when implementing framework-owned admin surfaces so configuration writes and observability readbacks stay contract-driven across products.
version: 1.2.0
date: 2026-04-22
status: ACTIVE
tags: [spec, operations, control-plane, channels, policies, knowledge-sources, traces, framework]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/client-api/typed-client-api-and-sdk.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
  - .memory-bank/plans/adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
history:
  - version: 1.2.0
    date: 2026-04-22
    changes: Migrated into bot-platform as framework-owned control-plane operations truth, generalized surface ownership, and removed product-runbook semantics.
  - version: 1.1.0
    date: 2026-04-10
    changes: Updated control-plane vocabulary to workspace/product-instance terms instead of seller-only business ownership language.
  - version: 1.0.0
    date: 2026-04-05
    changes: Initial control-plane target spec for channel config, pipeline binding, policy assignment, and execution diagnostics.
---

# Control-Plane Configuration And Observability Surfaces

## Goal

Define one framework operating model for first-party surfaces that read and mutate:
- channel configuration;
- pipeline binding;
- model policy assignment;
- knowledge-source bindings;
- execution trace and artifact diagnostics.

Without this layer, backend contracts can be correct while operator surfaces drift into incompatible behavior.

## Core rule

Structured configuration must have one canonical write path per object class.

Multiple first-party surfaces are allowed only if they share:
- one object vocabulary;
- one validation contract;
- one permission model;
- one audit trail model.

## Framework-supported surface classes

### Admin UI surfaces

Primary role:
- human-friendly read models;
- curated edits for common safe paths;
- incident-friendly diagnostics entrypoints.

### Admin CLI / structured operations clients

Primary role:
- precise contract-driven reads and writes;
- maintainers and automation workflows;
- low-ambiguity operational actions.

### Privileged direct-admin chat surfaces

Primary role:
- bounded inspection;
- narrow, high-signal operational toggles.

Not the primary place for:
- large structured config editing;
- free-form policy mutation;
- dumping heavy trace artifacts.

## Canonical object classes

First-wave control-plane surfaces must understand at least:
- `Workspace` read model;
- `ProductInstance` read model;
- `Channel`;
- `PipelineDefinition` read model;
- `KnowledgeSource`;
- `ModelPolicy` and policy-assignment refs;
- `ExecutionTrace` read model;
- `TraceArtifact` bounded read model.

## Write ownership matrix

### Admin UI

May own:
- common channel edits;
- pipeline reassignment where the UI enforces schema validation;
- safe knowledge-source selection;
- read-first policy inspection.

### Admin CLI / structured operations clients

May own:
- full structured channel edits;
- model-policy ref assignment;
- knowledge-source create/update;
- maintenance-grade diagnostics commands.

### Privileged direct-admin chat

Should own only:
- bounded inspection;
- narrow operational toggles;
- no large free-form structured editing by default.

## Required read models

### Channel detail read model

Must include:
- channel identity and kind;
- workspace scope;
- bound product instance;
- transport config summary;
- bound pipeline and effective pipeline args;
- policy override ref when present;
- operational status.

### Execution run read model

Must include:
- run identity and status;
- channel/integration context;
- workflow family;
- step list;
- attempts, retries, and failovers;
- normalized usage summary;
- linked artifact summary.

### Knowledge source read model

Must include:
- source ref and kind;
- workspace scope;
- bound product instances where applicable;
- root/entry summary;
- enabled status.

## Validation rule

No surface may implement private validation logic for channel binding.

All write surfaces must validate through backend-owned contracts for:
- pipeline existence and compatibility;
- `pipelineArgs` schema;
- policy override ref validity;
- knowledge-source ref validity.

## Auditability rule

Every configuration mutation should record:
- actor;
- timestamp;
- target object;
- changed fields;
- old/new summary where safe.

Heavy prompt/context artifacts are not configuration objects and follow trace-artifact governance policy.

## Minimal first-wave operations

Implementation-ready minimum:
- list channels;
- get channel detail;
- create/update channel pipeline binding;
- assign or clear channel model-policy override;
- list knowledge sources;
- create/update knowledge source;
- inspect execution run;
- inspect bounded trace artifact metadata.

This wave does not require a generic no-code admin studio.

## Product overlay rule

Products may add product-specific UI layouts, workflows, and operator procedures on top of these contracts.

Products may not redefine:
- canonical object vocabulary;
- write validation semantics;
- auditability requirements.

## Legacy compatibility terminology

During migration, older storage terms (for example `integration`) may remain behind compatibility bridges.

Rule:
- surfaces may expose target vocabulary (`Channel`, `Workspace`, `ProductInstance`) while compatibility fields continue to exist internally;
- compatibility terminology must stay explainable until migration is complete.

## Non-goals

- full RBAC redesign in this wave;
- product-specific admin IA decisions;
- using direct-admin chat as the primary editor for complex structured configuration.

## Risks

- Risk: each surface grows a private config dialect.
  - Mitigation: one backend validation path and one canonical object vocabulary.
- Risk: operators bypass structured surfaces and overuse chat writes.
  - Mitigation: keep direct-chat writes narrow and contract-bound.
- Risk: read models lag behind stored truth.
  - Mitigation: derive read models from canonical contracts and verified compatibility bridges.

## Migration / implementation plan

1. Expose stable read models for channels, knowledge sources, and execution traces.
2. Add structured writes for pipeline binding and source registration through contract-driven admin clients.
3. Add curated admin UI reads first, then safe common edits.
4. Keep direct-admin surfaces bounded to inspection and narrow operational actions.

## Regression gates

- Operations: channel binding and policy assignment are inspectable without DB-only spelunking.
- Safety: no surface bypasses central validation for writes.
- Diagnostics: execution traces are readable through first-party surfaces, not only raw logs.

## Rollback / abort criteria

- abort if complex structured editing is pushed first into direct-chat surfaces;
- abort if UI and admin clients diverge on validation or object shape.
