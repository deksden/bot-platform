---
file: .memory-bank/spec/runtime/decision-explanation-envelope.md
description: 'Framework runtime contract for one bounded decision-explanation envelope per terminal outcome.'
purpose: Read when implementing final-outcome explainability so all workflow families project one shared explanation contract derived from canonical execution truth.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
c4_level: L2
tags: [runtime, explainability, decision-envelope, traces, diagnostics, bot-platform]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
  - .memory-bank/spec/architecture/boundaries.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Initial repo-local framework contract for final-outcome decision explainability envelope under PRT-036 Wave 112.
---

# Decision Explanation Envelope

## Goal

Define one framework-shared envelope for explaining terminal runtime outcomes so all products can answer:
- what final outcome was chosen;
- why it was chosen over stronger nearby outcomes;
- what evidence/constraints decided it;
- what is still missing for a stronger result.

## Framework ownership boundary

`bot-platform` owns:
- canonical envelope shape and required fields;
- normalization rules for decisive factors and provenance;
- projection-safe relationship with traces and artifacts.

`bot-platform` does not own:
- product-specific status taxonomies;
- product-specific UI wording policy;
- product-specific report templates and delivery surfaces.

Product examples may appear as illustrations, but they are not canonical ownership center.

## Core invariants

The decision-explanation envelope is:
- produced after terminal outcome resolution;
- derived from canonical execution truth (run/step/attempt traces and governed artifacts);
- semantically aligned with final result contracts;
- reusable across operator, public, and machine-readable projections.

The envelope is not:
- a second truth source;
- a free-form workflow-local reason blob;
- a container for hidden chain-of-thought.

## Canonical contract

Every terminal outcome may emit one canonical internal envelope with this bounded structure:

- `subject`
  - identifies envelope target (`workflow_family`, `run_id`, `surface`, `decision_kind`)
- `final_outcome`
  - terminal decision truth (`status`, `reason_code`, optional `terminal_stage`)
- `summaries`
  - bounded semantic summaries by audience
  - recommended fields:
    - `operator`: concise operator/debug summary
    - `public`: nullable user-safe summary
    - `why_not_stronger_outcome`: concise explanation of the nearest rejected stronger outcome
- `decisive_factors`
  - normalized explanation atoms; each item should include:
    - `factor_kind`
    - `summary`
    - optional `ref`
- `missing_requirements`
  - concrete absent requirements that would have changed the outcome
- `provenance`
  - derivation metadata (`derived_from_artifacts`, `deterministic_fields`, `model_authored_fields`, `redaction_state`)

Optional field:
- `recommended_next_actions`
  - bounded next actions for operator and/or end user.

## Decisive factor vocabulary

`decisive_factors` should use a shared controlled vocabulary:
- `evidence_found`
- `evidence_missing`
- `verification_result`
- `policy_constraint`
- `ambiguity`
- `budget_exhaustion`
- `fallback_event`
- `delivery_outcome`
- `operator_action`

Products may extend with local kinds, but shared kinds must keep canonical semantics unchanged.

## Final-outcome comparison rule

When relevant, explanations must include why the strongest nearby outcome was rejected.

Examples of valid comparisons:
- chosen `not_found` instead of stronger answer status because relevant evidence was absent;
- chosen `insufficient_evidence` instead of grounded result because evidence failed verification;
- chosen `clarification_required` instead of traversal because ambiguity prevented safe targeting;
- chosen `blocked` instead of allowed delivery because policy verification failed.

This comparison lives in `summaries.why_not_stronger_outcome`.

## Production and projection rules

Production rule:
- assemble deterministic outcome, codes, refs, and counters first;
- generate only bounded semantic summary fields as needed;
- persist envelope only after final outcome is known.

Projection rule:
- one internal envelope can feed:
  - operator diagnostics;
  - public bounded explanation;
  - machine-readable diagnostics (reason/factor filters, tests).
- projections may differ in verbosity but must stay semantically consistent.

## Relationship to traces and artifacts

Execution traces remain canonical persisted lineage truth.

The envelope:
- may be persisted as a trace-linked artifact;
- may reference governed artifacts and verification bundles;
- must obey redaction/access/retention controls from trace-artifact governance;
- must not contradict trace truth or final outcome contracts.

If disagreement exists, canonical trace and final result contracts win.

## Model-use rule

Do not ask models for one unbounded essay-style explanation.

Preferred split:
- deterministic code writes structural truth (`subject`, `final_outcome`, refs, codes);
- model-assisted generation is limited to bounded semantic fields inside `summaries` and optional next actions;
- normalization/validation enforces schema and banned-content rules before persistence.

## Product-example handling

Product examples are preserved as non-normative illustrations:
- they demonstrate projection patterns and failure modes;
- they must not redefine field meaning or add required product-only keys;
- they stay subordinate to this framework contract.

## Non-goals

- defining product-local status universes as framework canon;
- allowing ad hoc workflow-local reason blobs in place of the envelope;
- replacing product-facing answer/result contracts;
- replacing trace lineage with summary text.
