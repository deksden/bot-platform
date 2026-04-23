---
file: .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
description: 'Repo-local runtime spec for the pipeline registry: canonical pipeline identifiers, argument contracts, pipeline defaults, and validation rules for channel-bound pipeline binding.'
purpose: Read when implementing pipeline selection and channel binding validation in `bot-platform`, and when deciding what belongs to pipeline definitions versus channel transport config.
version: 1.4.0
date: 2026-04-23
status: ACTIVE
c4_level: L2
tags: [runtime, pipelines, registry, binding, workflow-families, control-plane, bot-platform]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/feature-area-boundaries.md
history:
  - version: 1.4.0
    date: 2026-04-23
    changes: Added the naming-alignment rule so new shared control-plane contracts keep `pipelineId` and `channelKind` aligned with the registry seam unless an explicit compatibility mapping is documented.
  - version: 1.3.0
    date: 2026-04-21
    changes: Migrated as repo-local framework pipeline-registry spec into `bot-platform` under PRT-036 Wave 92 with bot-platform ownership positioning and index linkage.
  - version: 1.2.0
    date: 2026-04-10
    changes: Clarified that pipelines are execution modes inside a product rather than product identities, and that channel binding should be understood as product-instance plus entry-pipeline selection.
  - version: 1.1.0
    date: 2026-04-07
    changes: Added the dedicated `docoved_answer` pipeline identity and clarified that final Docoved surfaces should bind to it rather than to the old research scaffold.
  - version: 1.0.0
    date: 2026-04-05
    changes: Initial target spec created for the pipeline registry and channel-binding validation contract.
---

# Pipeline Registry And Binding Contract

## Goal

Сделать `pipelineId` не строкой "по договоренности", а явной конфигурируемой сущностью платформы.

Нужно, чтобы система однозначно знала:
- какие пайплайны вообще существуют;
- какие аргументы они принимают;
- какие дефолты им принадлежат;
- какие каналы они могут обслуживать;
- какие intents и capabilities они вправе использовать.

## Why this spec exists

После введения channel-bound pipeline configuration не хватает одного нормативного слоя:
- канал знает, что он привязан к `pipelineId`;
- kernel знает workflow families;
- но control plane еще должен знать, как валидировать сам bind и его аргументы.

Этот документ и есть такой мост.

## Core rule

`pipelineId` must resolve through a registry, not through scattered code assumptions.

Это не обязательно отдельная пользовательская таблица с динамическим CRUD.
На первом этапе registry может быть:
- code-backed;
- versioned with the app;
- exposed in read models and validation logic.

## Naming alignment rule

Shared platform-owned contracts around channel binding should keep:
- `pipelineId` as the canonical pipeline selector name;
- `channelKind` as the canonical transport selector name.

Do not introduce alternate top-level names such as `pipelineRef` in new shared control-plane/runtime contracts unless an explicit compatibility mapping is required and documented.

Reason:
- this keeps control-plane vocabulary aligned with the existing registry seam and validation payloads;
- it avoids unnecessary adapter code and drift in later channel-binding work.

## Product-instance boundary

`pipeline` is not the product itself.

Canonical distinction:
- `product instance` = installed SellerAgent or Docoved surface inside a workspace;
- `pipeline` = execution mode inside that product.

Implications:
- one product may expose multiple pipelines;
- a channel binds to one product instance and one entry pipeline;
- `pipelineId` must not become a hidden tenancy or product-installation anchor.

## Canonical object

### `PipelineDefinition`

Defines:
- `pipelineId`
- `workflowFamily`
- `label`
- `status`
- `supportedChannelKinds`
- `argumentSchema`
- `pipelineDefaults`
- `allowedCapabilities`
- `allowedResultIntents`
- optional compatibility notes

Recommended minimal shape:

```yaml
pipelineId: docoved_answer
workflowFamily: docoved_answer
label: Docoved Answer
status: active
supportedChannelKinds:
  - web_chat
  - telegram
argumentSchema:
  required:
    - knowledgeSourceRef
  optional:
    - answerMode
    - channelPresentationMode
pipelineDefaults:
  modelPolicyRef: docoved-defaults
  answerMode: direct_answer
allowedCapabilities:
  - memory-bank-search
  - document-read
allowedResultIntents:
  - send_message
  - create_artifact
```

## Binding validation

When a channel binds to a pipeline:
1. `pipelineId` must exist in the registry;
2. `channelKind` must be allowed by that pipeline definition;
3. `pipelineArgs` must satisfy the pipeline argument contract;
4. optional channel-level overrides may narrow behavior, but must not violate pipeline invariants.

## Ownership boundaries

### Channel owns
- transport config;
- channel identity;
- workspace and product-instance ownership;
- pipeline binding;
- optional per-channel policy override.

### Pipeline definition owns
- semantic behavior family;
- argument schema;
- pipeline-level defaults;
- allowed capabilities;
- allowed emitted intents.

### Execution engine owns
- actual step execution;
- model resolution;
- retry/fallback behavior;
- step/attempt tracing.

## Pipeline defaults

`pipelineDefaults` are the middle layer between system defaults and channel overrides.

They may include:
- default `modelPolicyRef`
- default response mode
- default review mode
- bounded feature flags that truly belong to this pipeline family

They should not include:
- transport config
- provider credentials
- tenant ownership
- arbitrary ad hoc business state already implied elsewhere

## First grounded pipelines

### `seller_conversation`

Expected binding traits:
- optimized for live customer chat or message-based selling
- expects seller/business grounding
- commonly emits `send_message`, `handoff_request`, `update_state`

Typical args:
- `releaseRef`
- optional narrow seller behavior overrides

### `research_then_answer`

Expected binding traits:
- optimized for progressive-disclosure research and evidence-backed synthesis
- expects configured knowledge source
- may emit direct answer, artifact, review draft or clarification request

Typical args:
- `knowledgeSourceRef`
- optional `responseMode`
- optional `reviewMode`

Historical note:
- this pipeline remains the scaffold proof of the first knowledge workflow family;
- it is not the owning product pipeline for final Docoved surfaces.

### `docoved_answer`

Expected binding traits:
- optimized for document-grounded answering over an active snapshot;
- requires configured `knowledgeSourceRef`;
- returns the canonical Docoved answer artifact with source table and verification summary;
- does not keep heuristic compatibility fallback behavior.

Typical args:
- `knowledgeSourceRef`
- optional `channelPresentationMode`
- optional `answerMode`

### `draft_review`

Expected binding traits:
- optimized for operator-assist and review-first flows
- does not require direct transport delivery on every run

Typical args:
- `reviewPolicy`
- optional artifact/delivery mode

## Channel compatibility rule

Not every pipeline must support every channel kind.

Examples:
- `draft_review` may initially be internal-only and not directly bindable to public inbound channels;
- `research_then_answer` may be valid for web chat and email before Telegram;
- `docoved_answer` is the preferred binding for final Docoved API and Telegram product surfaces;
- `seller_conversation` remains grounded first on Telegram compatibility.

This rule should live in the registry, not in UI guesswork.

## Argument design rule

`pipelineArgs` must stay small and pipeline-shaped.

Do:
- pass stable refs
- pass explicit mode switches
- pass only what the pipeline cannot infer from the channel or tenant context

Do not:
- embed raw filesystem paths when a stable source ref exists
- duplicate `businessProfileSlug` when the channel already owns tenancy
- leak transport-only fields into pipeline args

## Registry operating model

First implementation recommendation:
- registry definitions are code-backed and versioned;
- control plane exposes them as read-only selectable pipeline catalog;
- channels store only `pipelineId` and validated `pipelineArgs`.

This is intentionally simpler than building editable pipeline definitions in the first wave.

## Relationship to model policy

Pipeline definitions may declare defaults, but they do not replace the policy system.

Resolution order remains:
1. channel override
2. pipeline defaults
3. system defaults

The registry tells the platform what defaults a pipeline family carries.
The execution engine still resolves the final target through the model policy system.

## Non-goals

- user-editable arbitrary workflow composition
- plugin marketplace for pipeline definitions
- storing large prompt templates directly in pipeline bindings
- replacing workflow-family code with declarative no-code pipeline graphs

## Risks

- Risk: pipeline registry turns into a speculative workflow-builder system.
  - Mitigation: keep the first registry code-backed and limited to real pipeline families.
- Risk: `pipelineArgs` become a dumping ground for unrelated flags.
  - Mitigation: each pipeline definition owns an explicit argument contract.
- Risk: channel config validation drifts across web app, CLI and backend.
  - Mitigation: one registry-backed validation source must govern all surfaces.

## Migration / implementation plan

1. Introduce `PipelineDefinition` as the canonical registry concept.
2. Define the first pipeline catalog for `seller_conversation`, `research_then_answer`, `docoved_answer`, and `draft_review`.
3. Validate channel bindings against the registry.
4. Expose the registry through control-plane read models before considering mutable pipeline-definition editing.

## Regression gates

- Contract: every persisted `pipelineId` resolves to a known definition.
- Contract: invalid `pipelineArgs` are rejected consistently across surfaces.
- Integration: workflow dispatch remains aligned with the same pipeline identifiers used in control plane.

## Rollback / abort criteria

- abort if the registry starts modeling pipelines we do not actually run or plan to run;
- abort if channel binding still depends on transport-specific code branching after the registry is added.
