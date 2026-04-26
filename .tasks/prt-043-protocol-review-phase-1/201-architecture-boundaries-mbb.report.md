# PRT-043 Architecture, Boundaries, and MBB Review Report

## Summary verdict

PRT-043 is directionally sound and should proceed only after a documentation hardening pass. The protocol correctly frames the platform/product split and mostly keeps product behavior out of `bot-platform`, but it currently overstates a few candidate framework seams as settled ownership, duplicates stable spec material, and lacks a dedicated MBB routing section equivalent to PRT-042.

Question-by-question verdict:

1. **Top-down architecture:** Mostly clear. The flow in `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md` section `Target architecture` lines 109-124 gives a readable adapter -> parser -> dispatcher -> handler -> render/thread/deliver sequence, but it should explicitly label the layers as platform -> product -> adapter -> transport.
2. **Entity placement:** Partially correct but needs a normative ownership table. Command entities belong to `command-framework`; canonical response, render, threading-intent, and delivery-intent vocabulary may be channel-runtime-adjacent only within the thin seam. The current `Interaction contract boundaries` section lines 126-152 says "framework-owned contracts" without identifying the owning feature area for each entity.
3. **Boundary consistency:** Good intent, but not fully safe. The protocol says command dispatch remains command-framework-owned at lines 77-79 and 587-593, matching `.memory-bank/spec/project/feature-area-boundaries.md` lines 60-85, but `ThreadingIntent` / `OutboundDeliveryIntent` are described as channel-runtime-owned before the boundary gate is fully resolved.
4. **Duplication vs links:** Needs trimming. It links to the owning specs in frontmatter and at lines 77-79, but repeats command-framework and channel-runtime contract content in several long sections instead of treating specs as SSoT.
5. **Process precision:** Close, not implementation-ready. Parse outcomes, policy precedence, failure types, threading fallback, delivery idempotency, and logging events are present, but the protocol needs one step contract table with inputs, outputs, owner, failure result, and event names for each boundary crossing.
6. **MBB routing:** Incomplete. Indexes already mention PRT-043, but the protocol itself lacks explicit routing rules for spec vs protocol vs product-local docs vs `.tasks` artifacts.
7. **MBB principles:** Referenced but not fully followed. The file is 819 lines, crosses the MBB >800-line decomposition threshold, and duplicates stable spec truth, conflicting with SSOT/atomicity guidance.
8. **Required documentation changes:** Add an ownership table, mark candidate seams as gated, trim duplicate spec material, add MBB routing rules, resolve Phase-0/open-question contradictions, and add precise implementation boundary contracts.

## Accepted strengths

- **Clear platform/product principle:** PRT-043 states that `bot-platform` owns shared interaction mechanics while product repos own product behavior in `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md` lines 71-84.
- **Good high-level flow:** The target architecture sequence in lines 109-124 is a useful implementation backbone and already separates adapter, parser, dispatcher, handler, renderer, threading, delivery, and diagnostics.
- **Strong command boundary intent:** Lines 77-79 and 244-271 correctly say command parser/dispatch primitives must reuse the command framework and must not become Telegram-shaped platform truth.
- **Correct product-local exclusions:** Lines 139-152, 526-552, and 554-578 keep actor lookup, product command catalogs, provider credentials, business semantics, and provider send behavior in product/adapters.
- **No DB/UI scope creep:** Lines 84, 513-524, and 800-808 explicitly reject shared UI/admin, framework DB/read-model tables, provider SDK senders, and product command catalogs.
- **Operational safety is concrete:** Lines 386-397 define idempotency expectations, lines 456-497 list structured diagnostics and redaction rules, and lines 499-511 add anti-abuse/rate-limit hooks.

## Findings requiring documentation change

### 1. Add an explicit entity ownership table before implementation

PRT-043 lists `CommandInvocationSource`, `CommandActorContext`, `CommandAvailabilityPolicy`, `CommandAvailabilityDecision`, `CommandExecutionResult`, `ThreadingIntent`, and `OutboundDeliveryIntent` together as "Framework-owned contracts" in `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md` lines 130-137. That is too coarse for this repo's feature-area model.

Required change:

- Add a table near `Interaction contract boundaries` with columns: `Entity`, `Owning feature area`, `Owning stable spec`, `Implementation package/module candidate`, `Product-owned inputs`, `Adapter-owned inputs`.
- Place command entities under `.memory-bank/spec/runtime/command-framework-contract.md`, especially `CommandEnvelope`, parser/normalization, registry, dispatch, failures, and access hook shape per lines 40-49, 55-68, 70-84, 105-117, 119-149.
- Place `CanonicalResponseDocument` under `.memory-bank/spec/runtime/channel-runtime-contract.md` lines 72-97 and current code in `packages/channel-runtime/src/document.ts` lines 61-84.
- Mark `ThreadingIntent`, `ThreadingResolution`, `OutboundDeliveryIntent`, and `OutboundDeliveryResult` as a **candidate/gated channel-runtime extension**, not settled stable ownership, until Phase 1 proves the thin seam.
- State that refs such as workspace/product/channel/run/trace must reuse existing core/api-contract vocabulary, consistent with `.memory-bank/spec/project/feature-area-boundaries.md` lines 83-85 and PRT-042's reuse rule in `.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md` lines 449-460.

Why required:

- `.memory-bank/spec/project/feature-area-boundaries.md` says `command-framework` owns command envelope/parser/registry/execution hooks at lines 60-66.
- The same file says `channel-runtime` owns canonical response/render vocabulary but does **not** own command dispatch/access policy, transport senders, retries, threading state, provider payloads, DB, or UI at lines 68-85.
- `.memory-bank/mbb/delivery-docs-guide.md` warns candidate seams must not be documented as owned truth at lines 230-246.

### 2. Resolve the Phase-0 completion contradiction

PRT-043 says Phase 0 is complete at lines 55-69 and lines 622-624. It also says Phase-0 exit criteria are satisfied at lines 616-620. But the `Open questions before implementation` section says the questions "must be resolved in Phase 0 before code changes begin" at lines 810-819, and those questions include unresolved ownership/package decisions.

Required change:

- Either mark Phase 0 as **not fully complete** until lines 812-817 are resolved, or move those questions into a new "Phase 1 gates before code" section.
- Change line 617's "no unresolved ownership ambiguity" claim to a narrower statement, for example: "design direction is agreed; package/module placement remains a pre-code gate."
- Align `Protocol elaboration state`, `Phase-0 status`, and `Open questions before implementation` so they do not disagree.

Why required:

- The package-boundary question is material. Current repo packages are `@dd-bot-platform/core`, `@dd-bot-platform/api-contract`, and `@dd-bot-platform/channel-runtime`; there is no command-framework package in `packages/*/package.json`.
- PRT-043 acknowledges this at lines 601-603, but still states Phase 0 has no ownership ambiguity at lines 616-620.

### 3. Do not let channel-runtime absorb command policy or dispatch by implication

The protocol is mostly careful, but some sections can be misread as channel-runtime owning the whole interaction runtime because the protocol title and package strategy emphasize `@dd-bot-platform/channel-runtime`. The hard rule at lines 587-593 is correct, but it needs to be elevated earlier and made normative.

Required change:

- In `Core decision`, add a short normative split:
  - `command-framework` owns command envelope, normalization, registry, dispatcher, command availability policy, command failures, and command diagnostics.
  - `channel-runtime` owns canonical response documents, visibility, render target vocabulary, and candidate response/thread/delivery intent/result contracts.
  - adapters own provider syntax, provider payloads, reply/header mapping, and final send.
- In `Package strategy`, replace "channel-runtime owns ... threading intent, delivery intent/result" at lines 591-593 with "channel-runtime may own ... if the Phase 1 boundary gate confirms they are provider-neutral and do not include threading state, provider senders, retries, or delivery orchestration."

Why required:

- `.memory-bank/spec/runtime/channel-runtime-contract.md` excludes command dispatch, command registry, command access policy, delivery orchestration, retry queues, threading, provider send logic, DB, and UI from the first-wave contract at lines 45-55.
- `.memory-bank/spec/runtime/channel-runtime-contract.md` lines 149-155 explicitly require future command adoption to reuse the command framework rather than adding parallel `ChannelCommand*` primitives.

### 4. Trim duplicated stable spec content and link to SSoT instead

PRT-043 repeats a lot of stable command and channel-runtime vocabulary:

- `Command input normalization` lines 216-243 overlaps `.memory-bank/spec/runtime/command-framework-contract.md` lines 70-84.
- `Command ownership boundaries` lines 244-271 overlaps `.memory-bank/spec/runtime/command-framework-contract.md` lines 40-53, 139-161, and 163-176.
- `Canonical response and universal rendering` lines 297-327 overlaps `.memory-bank/spec/runtime/channel-runtime-contract.md` lines 72-132.
- `Package strategy` lines 580-603 restates ownership already covered by `.memory-bank/spec/project/feature-area-boundaries.md` lines 60-85 and the two runtime specs.

Required change:

- Keep PRT-043 focused on the delta after PRT-042: actor-aware availability, command-result-to-canonical-document bridge, threading intent fallback semantics, delivery intent/result correlation, migration compatibility, and adoption waves.
- Replace repeated stable definitions with links such as "must conform to Command Framework Contract / Channel Runtime Contract."
- Promote any stable new contract shape from PRT-043 into the owning runtime spec once accepted; do not leave stable truth only in the protocol.

Why required:

- `.memory-bank/mbb/principles.md` requires Single Source of Truth at lines 23-42.
- `.memory-bank/mbb/delivery-docs-guide.md` says a protocol must not store duplicated normative design that belongs in a spec at lines 203-205.

### 5. Add one implementation boundary contract table for the nine-step flow

The target flow at `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md` lines 113-121 is readable, but implementation teams still have to infer exact boundary contracts across parser, dispatcher, product handler, renderer, threading, and delivery.

Required change:

- Add a table after `Target architecture` with one row per step:
  - input contract;
  - output contract;
  - owner (`command-framework`, `channel-runtime`, product, adapter, transport);
  - required failure/result kind;
  - required diagnostic event from lines 456-471;
  - whether the step is side-effect free.
- Explicitly specify these boundary transitions:
  - `not_a_command` returns to ordinary answer flow, not command dispatch.
  - `parse_error` / `unknown_command` / `validation_error` / `access_denied` convert to safe `CanonicalResponseDocument` only when user-facing feedback is required.
  - `ThreadingIntent` is resolved by the adapter into `ThreadingResolution` before final provider send.
  - `OutboundDeliveryIntent` carries or derives an idempotency key before any transport call.

Why required:

- Current process details are split across parse outcomes at lines 229-233, command result/failure rules at lines 273-295, threading fallback at lines 354-366, delivery idempotency at lines 386-390, and logging events at lines 456-471.
- `.memory-bank/mbb/delivery-docs-guide.md` requires ambiguity-sensitive documents that touch contract shape, fallback semantics, ownership boundaries, or acceptance-critical runtime behavior to list open questions/research and avoid pretending the design is fully settled at lines 281-298.

### 6. Add a dedicated MBB routing section

PRT-043 frontmatter links MBB guides at lines 21-23, and product sections mention routing at lines 552 and 578, but the protocol lacks explicit rules for where stable truth and adoption truth live.

Required change:

- Add `## Memory Bank documentation rules` modeled on PRT-042 lines 751-779.
- State:
  - stable command contract truth lives in `.memory-bank/spec/runtime/command-framework-contract.md`;
  - stable channel response/render/thread/delivery-intent truth lives in `.memory-bank/spec/runtime/channel-runtime-contract.md` only after accepted/gated promotion;
  - cross-wave sequencing and evidence live in PRT-043;
  - Docoved adoption details live in Docoved Memory Bank;
  - SellerAgent adoption details live in SellerAgent Memory Bank;
  - `.tasks/prt-043-protocol-review-phase-1/` reports are transient review evidence, not canonical contract truth.
- Add a required docs update list for runtime specs and indexes when the protocol is hardened.

Why required:

- `.memory-bank/mbb/principles.md` requires explicit documentation operating model at lines 199-216.
- `.memory-bank/mbb/delivery-docs-guide.md` defines source-of-truth by document type at lines 189-215.
- `.memory-bank/mbb/indexing-guide.md` requires indexes to stay current when files/content change at lines 27-31 and 361-367.

### 7. Reduce or split the protocol because it crosses the MBB >800-line threshold

PRT-043 is 819 lines. `.memory-bank/mbb/principles.md` says Tier 3 documents over 800 lines require decomposition at lines 47-51.

Required change:

- Prefer trimming duplicated spec content below 800 lines.
- If it remains over 800 lines, split long detail into a small companion detail file and keep PRT-043 as the protocol summary with annotated links.
- Do not split into product-local details inside `bot-platform`; product adoption details should remain only high-level here and move to product repos.

Why required:

- This is not just cosmetic. The length comes largely from duplicated stable spec content and makes the protocol compete with runtime specs as SSoT.

## Findings that are optional/nice-to-have

- **Add a simple architecture diagram:** A small Mermaid diagram showing platform -> product -> adapter -> transport would make the top-down intent unambiguous.
- **Rename "Universal rendering":** The section title at line 297 could be "Canonical response rendering" because line 301 correctly says the framework does not own one universal provider renderer.
- **Add example entity rows:** One compact example each for Telegram, email, web/API, and CLI would help validate `CommandInvocationSource`, `CommandActorContext`, `ThreadingIntent`, and `OutboundDeliveryIntent` without adding product-specific truth.
- **Make actor vocabulary extensibility sharper:** Lines 158-166 define actor classes; add whether product extensions can affect framework policy directly or only through product capability tags.
- **Add "unknown vs anonymous" distinction:** Lines 164-165 list both; a short distinction would prevent inconsistent product mappings.
- **Use exact anchor links:** Where stable specs are cited, link to the specific section anchors instead of only listing files in frontmatter.

## Suggested exact patch direction

1. **Patch `Core decision` / `Interaction contract boundaries`:**
   - Insert a normative ownership matrix immediately after `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md` line 126.
   - Replace "Framework-owned contracts" at line 130 with "bot-platform-owned contracts by feature area."
   - Route `CommandInvocationSource`, `CommandActorContext`, `CommandAvailabilityPolicy`, `CommandAvailabilityDecision`, and `CommandExecutionResult` to `command-framework`, with reused auth/control-plane refs where applicable.
   - Route `CanonicalResponseDocument` to `channel-runtime`.
   - Route `ThreadingIntent` / `OutboundDeliveryIntent` to "candidate channel-runtime extension after Phase 1 boundary gate."

2. **Patch `Package strategy`:**
   - Keep lines 587-593 as the hard split but soften ownership of threading/delivery to candidate/gated language.
   - Add an explicit rule that no command-framework public types are exported from `@dd-bot-platform/channel-runtime` unless they are re-exports from the command owner and the dependency direction is documented.

3. **Patch `Phase-0 status` and `Open questions`:**
   - Move lines 812-817 into a "Pre-code gates" subsection or mark Phase 0 as still open.
   - Update lines 616-620 so they do not claim all ambiguity is resolved while package-boundary and field-shape questions remain.

4. **Patch process precision:**
   - Add a `Boundary step contracts` table after the target architecture flow.
   - Consolidate parse/result/failure/threading/delivery diagnostics into the table instead of scattering all implementation-critical rules across separate prose sections.

5. **Patch duplicated sections:**
   - Shorten `Command input normalization`, `Command ownership boundaries`, and `Canonical response and universal rendering` to PRT-043-specific deltas.
   - Replace stable vocabulary restatement with links to `.memory-bank/spec/runtime/command-framework-contract.md` and `.memory-bank/spec/runtime/channel-runtime-contract.md`.

6. **Patch MBB routing:**
   - Add a `Memory Bank documentation rules` section before `Lessons learned and insights`.
   - Explicitly state spec/protocol/product/task ownership.
   - Fix or clarify the task artifact path at line 789 so it does not conflict with the active review workspace `.tasks/prt-043-protocol-review-phase-1/`.

7. **Patch indexes after protocol hardening:**
   - `.memory-bank/spec/runtime/index.md` already mentions the command/channel contracts at lines 74-76; update only if new stable spec sections are promoted.
   - `.memory-bank/plans/index.md` lines 90-108 and `.memory-bank/plans/protocols/index.md` lines 81-82 already route readers to PRT-043; update history/status if Phase 0 is reclassified or gates are renamed.
