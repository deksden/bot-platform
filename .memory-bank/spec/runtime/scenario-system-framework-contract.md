---
file: .memory-bank/spec/runtime/scenario-system-framework-contract.md
description: 'Canonical framework contract for the shared scenario-system owned by bot-platform.'
purpose: Define the lean framework-owned scenario surface so extraction waves promote only stable scenario mechanics into bot-platform and leave product scenario truth in product repos.
version: 0.1.0
date: 2026-04-20
status: ACTIVE
tags: [runtime, scenario-system, framework-contract, evidence, semantic-eval, bot-platform]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/scenarios/index.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
target_audience: [developers, ai-agents]
automation_ready: true
history:
  - version: 0.1.0
    date: 2026-04-20
    changes: Canonicalized the first framework-owned scenario-system contract from the accepted PRT-036 scenario-runner seam findings.
---

# Scenario System Framework Contract

## Goal

Define the shared scenario-system slice that `bot-platform` may own as framework truth.

This contract is intentionally narrow.
It does not authorize moving `packages/scenario-runner` wholesale into `bot-platform`.

## Ownership Rule

`bot-platform` owns only the product-agnostic scenario-system framework:
- shared scenario vocabulary;
- shared fixture-profile vocabulary;
- shared verification-tier semantics;
- shared artifact and evidence contracts;
- framework-safe execution shell helpers;
- framework-safe semantic-eval packet, result, and provenance rules.

`bot-platform` does not own product scenario truth.
Product registries, suites, auth flows, host adapters, and product fixtures remain product-local even when they currently sit beside reusable helpers in mixed source packages.

## Framework-Owned Surface

### 1. Scenario Definition Vocabulary

`bot-platform` owns the schema and semantics for a scenario definition.

The framework vocabulary may define fields such as:
- scenario identifier and title;
- family and kind;
- execution status;
- local runtime policy;
- supported environments;
- acceptance level;
- verification tiers;
- fixture profile reference;
- feature/document trace fields;
- executable entrypoint contract.

Framework rule:
- `bot-platform` may own the type system, validation, and execution semantics for these fields.

Framework non-rule:
- `bot-platform` must not own the canonical registry of SellerAgent scenarios or Docoved scenarios.

Implication:
- products compose their own scenario catalogs on top of the framework vocabulary;
- the framework may ship generic registry helpers, but not mixed product registries.

### 2. Fixture Profile Vocabulary

`bot-platform` owns the schema for fixture profiles and the meaning of shared fixture fields.

The framework vocabulary may define:
- fixture profile identifier, title, and description;
- workspace or target-scope reference shape;
- seed strategy classes;
- hosted actor reuse modes;
- hosted execution grouping and sequencing hints;
- execution-policy classes;
- notes and metadata slots.

Framework rule:
- the framework may standardize fixture-profile shape and lifecycle semantics.

Framework non-rule:
- the framework must not own SellerAgent operator fixtures, Docoved grounding fixtures, or any other product-specific fixture truth.

Implication:
- shared fixture schemas may live in `bot-platform`;
- concrete product fixture registries live in product repos unless a fixture is genuinely cross-product and independently justified.

### 3. Verification Tiers

`bot-platform` owns the verification-tier vocabulary and the meaning of each tier.

The framework contract may define tiers such as:
- `dev_smoke`;
- `pre_merge`;
- `nightly`;
- `beta_on_demand`.

Framework rule:
- tier names, runner expectations, and high-level intent are framework-owned.

Framework non-rule:
- which scenarios belong to a tier is product-local unless the scenario itself is a framework-owned scenario.

Implication:
- products may map their own suites to the shared tier vocabulary;
- the framework must not become the canonical home for product tier membership.

### 4. Execution Harness And CLI Shell

`bot-platform` may own a minimal shared execution harness when it remains product-agnostic.

Allowed framework surface:
- scenario run and tier-run orchestration contracts;
- CLI argument vocabulary for listing, single-run, tier-run, JSON output, env-file loading, and subprocess fan-out;
- generic run result and tier result envelopes;
- generic failure capture that writes artifacts through the shared artifact contract.

Framework rule:
- the shared harness must operate on injected scenario catalogs and injected fixture registries.

Framework non-rule:
- the shared harness must not bootstrap SellerAgent local servers, import product composition roots, or embed Docoved acceptance wiring.

Implication:
- framework CLI and runner code must stay as a shell;
- product repos provide concrete catalogs, preflight, bootstrap, and host composition.

### 5. Artifact And Evidence Contracts

`bot-platform` owns the base artifact and evidence contract for scenario execution.

The framework contract includes:
- canonical artifact root layout for scenario runs and tier runs;
- run identifier and timestamp requirements;
- latest-artifact conventions;
- tier-artifact conventions;
- evidence-path preparation and evidence-file writing helpers;
- manifest-entry shape for cross-run indexing.

Framework rule:
- framework artifacts must preserve stable base fields needed for tooling, inspection, and later migration.

Minimum stable scenario artifact fields:
- `scenarioId`;
- `runId`;
- `recordedAt`;
- pass/fail state when known;
- catalog snapshot when available;
- fixture-profile snapshot when available.

Minimum stable tier artifact fields:
- `tier`;
- `runId`;
- `recordedAt`;
- scenario membership and per-scenario results.

Framework extension rule:
- products may append extra evidence payload, but must not break or silently redefine the base contract.

### 6. Browser And Runtime Shell Contracts

`bot-platform` may own only the browser/runtime shell that is safe at framework level.

Allowed framework surface:
- generic Playwright launch and context lifecycle;
- generic page/session execution wrapper contracts;
- generic tracing hooks;
- generic deterministic-vs-live runtime mode vocabulary;
- generic provider-mode resolution interfaces when they do not hard-code product secrets, product routes, or product business knowledge.

Framework exclusion rule:
- the framework must not own product POMs;
- the framework must not own product route maps or selector registries;
- the framework must not own hosted cookie names, hosted session bootstrap, or product hostname derivation;
- the framework must not inject SellerAgent runtime knowledge bundles or Docoved product context as framework defaults.

Implication:
- only the shell may graduate into `bot-platform`;
- product login/session/bootstrap and UI mapping stay in product repos.

### 7. Semantic-Eval Packet, Result, And Provenance Rules

`bot-platform` owns the framework-safe semantic-eval contract.

The framework contract includes:
- canonical transcript normalization rules;
- minimal context-window vocabulary;
- semantic-eval input-packet shape;
- packet hashing rules;
- result envelope shape;
- provenance fields for judge runs;
- evidence reference conventions used by semantic-eval outputs.

Stable provenance fields may include:
- generation timestamp;
- workspace revision when available;
- runtime platform details such as node version, OS, and architecture.

Framework rule:
- packet/result/provenance schemas and transcript normalization semantics are shared framework concerns.

Framework non-rule:
- product-specific expectation contracts, heuristic fixtures, transcript cases, and domain-specific judge logic remain product-local unless they become truly framework-wide and product-agnostic.

## Explicit Product-Owned Exclusions

The following are explicitly outside `bot-platform` ownership:
- SellerAgent and Docoved scenario suites;
- product scenario catalogs and tier membership;
- product fixture registries and product fixture data truth;
- product POMs and governed selector mappings;
- product hosted auth, session, and mailbox/bootstrap flows;
- product host adapters, local composition roots, and in-process server wiring;
- product URL derivation and deployment alias knowledge;
- product-specific semantic-eval fixtures, contracts, and domain heuristics.

These exclusions apply even if the current mixed source package stores them next to reusable helpers.

## Promotion Rule For Future Helpers

A scenario helper may graduate into `bot-platform` only when at least one of these is true:
1. the helper is genuinely product-agnostic; or
2. the helper already has at least two real product consumers.

Promotion gate:
- the helper must have a stable contract that can be described without SellerAgent-only or Docoved-only truth;
- the helper must not require product secrets, product routes, product hostnames, product DB state, or product business fixtures;
- if a helper mixes shell behavior with product bootstrap, it must be split first and only the framework-safe shell may move.

Default rule:
- if ownership is unclear, keep the helper product-local until the seam is explicit.

## No-New-Dumping-Ground Rule

`bot-platform` must not become a replacement dumping ground for anything currently located in `packages/scenario-runner`.

Therefore:
- do not introduce a long-lived mixed `shared scenarios` bucket;
- do not move whole registries just because they already compile together;
- do not promote product helpers under vague names such as `shared`, `common`, or `generic` without a real framework contract;
- do not store product-only suites in `bot-platform` while waiting for a later cleanup wave.

The framework repo owns a lean scenario-system contract.
Everything else stays with the product that defines the behavior.
