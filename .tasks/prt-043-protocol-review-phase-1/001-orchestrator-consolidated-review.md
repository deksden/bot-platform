# PRT-043 Protocol Review Phase 1 — Consolidated Orchestrator Report

## Summary verdict

PRT-043 is architecturally valid, but phase-1 review found that the protocol needs a documentation hardening patch before implementation tasks are opened.

Accepted direction:
- keep command dispatch and command policy in the command-framework boundary;
- keep canonical response rendering and visibility in channel-runtime;
- treat threading/delivery intent as gated channel-runtime-adjacent candidates, not settled orchestration ownership;
- keep provider senders, retry orchestration, DB/read models, UI/admin, and product command catalogs out of bot-platform;
- require Docoved and SellerAgent adoption waves to prove the contract before closure.

Main accepted fixes:
- add an explicit entity ownership matrix by feature area;
- add a boundary-step contract table for the inbound -> command -> response -> render -> thread -> delivery flow;
- resolve the phase-0/open-question contradiction by moving package and shape questions to pre-code gates;
- tighten lean scope by demoting delivery/threading nouns to minimal intent/result contracts and deferring orchestration;
- add MBB routing rules;
- add no-migrations/no-backups/no-hidden-storage language;
- add release/deploy/rollback sequence;
- add concrete test/scenario anchors and quality lanes;
- add product adoption side-effect details for Docoved and SellerAgent.

## Subagent reports used

- `201-architecture-boundaries-mbb.report.md`
- `202-lean-design-duplication-refactoring.report.md`
- `203-errors-reliability-observability.report.md`
- `204-testing-scenarios-quality.report.md`
- `205-ops-release-deployment-gitflow.report.md`
- `206-product-adoption-side-effects.report.md`
- `207-ui-db-scope-storage.report.md`

## Accepted findings by area

### Architecture and MBB

Accepted:
- PRT-043 needs an ownership table mapping each entity to command-framework, channel-runtime, product, or adapter ownership.
- PRT-043 needs explicit MBB routing rules like PRT-042.
- Phase 0 wording must not claim all package-boundary ambiguity is resolved if pre-code gates remain.
- The protocol should trim or demote duplicated stable spec material by pointing to owning specs.

Action:
- Patch protocol with `Entity ownership matrix`, `Boundary step contracts`, `Memory Bank documentation rules`, and `Pre-code gates`.

### Lean design and duplication

Accepted:
- Actor classes are useful, but should be framed as a minimum framework vocabulary plus product-owned mapping, not a replacement for product roles/capabilities.
- Delivery/threading should remain minimal intent/result/fallback contracts; no multi-step delivery plan or orchestration extraction in phase 1.
- Reuse existing `ChannelCapabilityMatrix`, `ReplyThreadLinkingFidelity`, and observability vocabularies where possible.
- Product-local Telegram compatibility and menu sync remain product/adapter responsibilities.

Action:
- Patch package strategy and ownership matrix to mark threading/delivery as gated candidate extensions.
- Add reuse rule for existing core/api-contract/control-plane vocabularies.

### Error handling, reliability, observability

Accepted:
- Need explicit duplicate/replay and config snapshot/version guidance.
- Need clearer fallback handling for missing reply targets and policy fallback.
- Need product-local incident-monitoring hooks without platform coupling.
- Need no silent swallow rule for dispatch/render/thread/delivery failures.

Action:
- Patch reliability sections with idempotency, effective config snapshot/readback, and incident-monitoring hooks.

### Testing and quality

Accepted:
- Current verification matrix is too generic.
- Need local/package/product/hosted lanes.
- Need concrete tests for policy precedence, command result envelopes, ordinary-email-not-command, unauthorized actors, threading fallback, duplicate delivery/idempotency, menu projection drift.
- Need cite existing scenario anchors, especially Docoved SCN-201/202/204/211 and SellerAgent SCN-053.
- Do not imply lint exists if repo does not expose it.

Action:
- Patch verification matrix and phase exit criteria.

### Ops and release

Accepted:
- Need explicit package release / consumer pin / rollback sequence.
- Need stable alias/readback requirement for hosted beta/prod checks.
- Need no migrations/backups statement for current wave.
- Release/deploy/rollback lessons must be promoted to owning runbooks.

Action:
- Patch Operations section and Non-goals / UI-DB sections.

### Product adoption

Accepted:
- Docoved needs ordinary email question non-command proof and unauthorized sender denial proof.
- SellerAgent should adopt read-only/diagnostic commands before mutation/release-control commands.
- Legacy `commandAccessPolicy` must be migration input only unless explicitly declared canonical by product docs.
- Product Memory Banks must state canonical writable command-policy authority.

Action:
- Patch Docoved/SellerAgent adoption sections and config compatibility section.

### UI/DB/storage

Accepted:
- Current UI/Admin and DB/read-model exclusions are directionally correct.
- Need explicit no migrations/backups/restore workflows in this protocol.
- Hidden persistence for transport-ref lookup, idempotency state, and config snapshots is product-owned.
- Future UI/storage gates should name required docs/scenario/POM/migration responsibilities.

Action:
- Patch UI/Admin, storage, non-goals, and future gates.

## Findings not accepted as immediate patch

- Moving detailed tables into a companion file was accepted during documentation hardening because the main protocol crossed the MBB decomposition threshold after phase-1 fixes.
- Adding a Mermaid diagram now: helpful but optional; table-based contracts provide enough precision for the next discussion.
- Creating new package names now: rejected until the pre-code package-boundary gate is resolved.

## Documentation patch checklist

- [x] PRT-043 version/history updated for phase 1.
- [x] Protocol state says phase 1 completed.
- [x] Entity ownership matrix added in companion details.
- [x] Boundary step contracts added in companion details.
- [x] Phase-0/open-question contradiction resolved via pre-code gates.
- [x] MBB routing rules added.
- [x] Verification matrix strengthened and linked to companion details.
- [x] Ops/release/rollback sequence added.
- [x] No migrations/backups/storage statement added.
- [x] Product adoption slices clarified.
- [x] Plans/protocol indexes updated.
