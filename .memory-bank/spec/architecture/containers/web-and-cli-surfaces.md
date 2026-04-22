---
file: .memory-bank/spec/architecture/containers/web-and-cli-surfaces.md
description: 'Container contract for framework web/CLI/operator surfaces as thin consumers of canonical runtime and contract owners.'
purpose: Read when evolving framework-facing tools and control surfaces so they remain role-appropriate and avoid hidden runtime ownership.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
c4_level: L2
tags: [architecture, container, web, cli, control-plane, tooling]
parent: .memory-bank/spec/architecture/containers/index.md
related_files:
  - .memory-bank/spec/architecture/dependency-and-placement-rules.md
  - .memory-bank/spec/client-api/typed-client-api-and-sdk.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/spec/project/feature-area-boundaries.md
history:
  - version: 0.1.0
    date: 2026-04-22
    changes: Migrated and reframed the web/CLI surfaces architecture into bot-platform as framework-only thin-surface guidance under PRT-036 Wave 151.
---

# Web And CLI Surfaces

## Role

These containers are framework-facing control and tooling surfaces over canonical contracts.

Primary surfaces:
- `apps/cli`
- optional framework web/control surfaces when present
- optional verification/maintainer surfaces

## Ownership split

### Framework web/control surfaces

May own:
- control-plane UI composition;
- diagnostics and configuration views.

May not own:
- runtime semantics;
- persistence truth;
- private semantic contracts that bypass canonical runtime owners.

### `apps/cli`

Owns:
- maintainer/developer tooling ergonomics;
- governed operational commands.

Rule:
- once a canonical client/API contract exists, CLI should prefer it over private local invocation paths.

### Verification and maintainer tools

Own:
- framework verification and diagnostics workflows.

Do not own:
- runtime semantics or product-domain behavior as framework truth.

## Cross-repo boundary note

Product-admin and product-operator surfaces belong in product repos.
This container captures framework-side surface rules only.

## Rule

Web/CLI/tooling surfaces consume canonical framework contracts.
They must not become hidden owners for runtime, evaluation, or persistence semantics.
