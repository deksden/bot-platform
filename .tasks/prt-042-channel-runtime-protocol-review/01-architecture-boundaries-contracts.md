# Review Task 01: Architecture, Boundaries, Entities, Contracts

Read:
- `.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `.memory-bank/plans/protocols/index.md`
- `.memory-bank/spec/architecture/boundaries.md`
- `.memory-bank/spec/project/three-layer-product-line-architecture.md` if present
- `.memory-bank/spec/project/feature-area-boundaries.md` if present

Focus:
- Review the protocol top-down as a framework architecture document.
- Check whether ownership boundaries match the accepted project model: bot-platform owns framework truth; Docoved and SellerAgent own product truth.
- Inspect proposed entities: `CanonicalResponseDocument`, sections, citations, metadata, renderers, adapters, command registry, actor capabilities.
- Identify overbroad or underdefined entities.
- Check if the contract is typed enough and whether it should live in `@dd-bot-platform/channel-runtime` versus existing packages.
- Check whether process boundaries are clear: mapping, rendering, delivery, command handling, product adoption.
- Look for missing relationships to existing packages (`core`, `api-contract`, `scenario-system`) and any boundary conflicts.

Output:
- Write your report to `.tasks/prt-042-channel-runtime-protocol-review/report-01-architecture-boundaries-contracts.md`.
- Include: strengths, risks, concrete protocol edits, and any proposed wording.
