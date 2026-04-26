# PRT-043 Ops / Release / Deployment Review

## Summary Verdict

PRT-043 is **close but not ops-complete**. It already covers commit/push discipline, hosted beta gating, rollback hygiene, and release-traceability basics, but it still needs one explicit end-to-end release/deploy/publish sequence and one explicit “no migrations/backups” guard before it can be treated as fully operational for beta/prod handoff.

### Question Readout

- **Q1**: partial — `PRT-043` says when to commit, push, and deploy beta in `.../PRT-043-channel-interaction-runtime-command-render-thread-delivery.md:759-778`, but it does not say when to version or publish packages.
- **Q2**: mostly yes — it says not to trigger hosted builds “just to see what happens” and to push only when ready, but it does not explicitly tie that to versioned release commits or block unnecessary preview/publish loops.
- **Q3**: partial — package pinning is stated in `...:595-603`, but the release sequence and consumer-cutover order are not explicit.
- **Q4**: partial — compatibility is mentioned, but rollback-by-version-revert for consumers is missing.
- **Q5**: no — DB/UI are non-goals, but the protocol never clearly says migrations/backups are out of scope unless a later protocol adds them.
- **Q6**: mostly yes — Docoved and SellerAgent hosted beta checks are listed in `...:738-757`, but the stable alias / hosted-status readback gate should be stated more explicitly.
- **Q7**: yes, but only at closure — `...:774-776` requires GitHub/CI and Vercel/hosting verification after pushes/deployments.
- **Q8**: mostly yes — the lessons rules are fine at a generic level, but they should explicitly route release/deploy/rollback lessons back into the owning runbook or Memory Bank section.
- **Q9**: see the patch direction below.

## Ops / Release Gaps

- `PRT-043`’s `## Operations and git-flow` section (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md:759-778`) covers commit, push, and beta deployment timing, but it never defines the package-release order. Compare that with the explicit release flow in `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/guides/reference/npm-package-release-runbook.md:54-103` and `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/reference/npm-package-release-runbook.md:54-103`.
- `PRT-043`’s `## Package strategy` (`...:595-603`) says product repos must pin released versions, but it does not say rollback happens by reverting the pinned version first. That omission is inconsistent with `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/private-registry-package-bridge.md:128-143`.
- `PRT-043` excludes framework UI/admin surfaces and framework-owned DB tables in `...:513-524` and `...:800-806`, but it still never states that migrations/backups are not part of this protocol. Because the same document uses “migration compatibility” language elsewhere (`...:68, 423-427, 597`), the scope boundary should be made explicit.
- `PRT-043`’s lessons section (`...:780-798`) is directionally fine, but it should name release/deploy/rollback lessons as required durable outputs, not only docs-missing/debugging learnings.

## Deployment / Rollback Risks

- The hosted beta checks for Docoved and SellerAgent are present (`...:738-757`), but the protocol does not require an explicit stable-alias or live-hosted truth readback before closure. That is weaker than the framework baseline in `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/deployment-architecture.md:69-104` and `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/hosted-beta-acceptance-contract.md:49-102`.
- `do not trigger hosted builds just to “see what happens”` (`...:771`) is good, but the doc still leaves room for unnecessary preview/publish cycles that are not tied to a versioned release commit.
- Package-adoption rollback is under-specified. The safe rule is “revert the pinned package version first,” as documented in `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/private-registry-package-bridge.md:128-143`; `PRT-043` should say that directly so consumers do not improvise source-copy rollbacks.
- The Docoved product runbook already has the exact manual beta/prod rollout and rollback sequence in `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-hosted-bootstrap-runbook.md:205-233, 486-540, 573-590`. `PRT-043` should reference that sequence instead of stopping at generic “deploy beta only when ready” wording.

## Suggested Exact Patch Direction

- Add a new `## Release, deploy, and rollback sequence` subsection under `## Operations and git-flow` in `PRT-043`.
  - Required order should be explicit: local checks → package versioning if applicable (`pnpm changeset version`) → commit the versioned state → push/PR merge → CI/package readiness → beta deploy → live alias/readback verification → hosted beta proof → `main` promotion → prod deploy/readback → rollback by alias/version revert if needed.
- Expand `## Package strategy` to say:
  - released packages are consumed only through pinned versions;
  - consumer rollback is a version revert, not source copying;
  - compatibility-sensitive changes must cite the package bridge and consumer adoption docs.
- Add one explicit non-goal sentence near `## Non-goals`:
  - “No DB schema migrations, backups, or restore workflows are introduced by this protocol; any later data-path change requires a separate protocol.”
- Tighten `## Lessons learned and insights` so release/deploy/rollback lessons are promoted into the owning Memory Bank section and referenced from the relevant runbook, not left only in `.tasks/`.
- If you want this protocol to stand alone operationally, mirror the same release-order wording into the Docoved and SellerAgent release docs already serving as the runbook SSoT:
  - `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-hosted-bootstrap-runbook.md:205-233, 486-540`
  - `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/operations/deployment-architecture.md:167-188, 323-339`
