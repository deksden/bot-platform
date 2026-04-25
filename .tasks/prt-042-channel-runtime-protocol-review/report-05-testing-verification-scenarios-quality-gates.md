# Review 05 — Testing, Verification, Scenarios, Quality Gates

## Test Matrix

| Срез | Что проверять | Минимальный fixture / proof | Ожидаемый сигнал |
| --- | --- | --- | --- |
| Markdown rendering | Парсинг и детерминированный рендер `markdown -> html/plain_text`, список/заголовки/код/ссылки, chunking | Набор статических markdown-fixture строк и snapshot-выводов | Один и тот же вход всегда даёт одинаковый `html` и `plain_text`, без утечек operator/debug полей |
| Document mapping | `DocovedAnswerArtifact` / SellerAgent answer-artifact -> `CanonicalResponseDocument` | Маппинг fixtures с public / operator / debug секциями и citations | Секция public остаётся чистой; metadata и artifacts уходят в typed extension slots, а не в transport payload |
| Command policy | Capability-based allow/deny, visibility classes, unknown/parse/validation/access separation | Таблица actor/capability/command fixtures | `access_denied` не смешивается с parse/validation, public channels не видят debug/operator commands |
| Import boundaries | Пакет не тащит `docoved-agent`, `seller-agent`, `sales-agent`, DB/client SDKs | Compile/import smoke из внешнего consumer package | `@dd-bot-platform/channel-runtime` остаётся framework-only и импортируется без product dependencies |
| Package publish shape | Export map, `prepack`, `files`, `tsconfig` refs, package versioning | `pnpm pack` + import smoke on tarball | Пакет публикуется как standalone artifact и не ломает existing allowed-package flow |
| Cross-product adoption | Docoved + SellerAgent читают один shared contract | Repo-local adoption fixtures в product repos | Одинаковая canonical document semantics на обеих сторонах, при сохранении product-owned handlers |

## Scenario Gaps

1. В `bot-platform` нет flat scenario doc/family, который покрывает именно channel-runtime end-to-end: markdown rendering, canonical document mapping, command policy, и import boundaries пока распадаются на отдельные specs.
2. `SCN-176` / `SCN-178` / `SCN-221` закрывают shared control-plane, но не доказывают shared response rendering и command capability policy для email/Telegram/web.
3. В `docoved-agent` уже есть явные acceptance anchors `SCN-211` и `SCN-214`, но они остаются Docoved-owned и их нужно связать с новым framework contract rather than duplicating logic in the product repo.
4. В `seller-agent` есть `SCN-168` по channel topology / release assignment, но нет явного product anchor for shared command/runtime rendering adoption.
5. Вертикаль documentation coverage for the new contract is missing: нужен отдельный scenario/doc anchor в `bot-platform` и cross-repo mapping notes in Docoved/SellerAgent, иначе verification matrix останется too abstract.

## Quality Gates

### Before commit / PR
- `pnpm typecheck` в `bot-platform`.
- `pnpm check` в `bot-platform`.
- import smoke для нового пакета из чистого consumer package.
- fixture-level assertions for markdown/document/command policy helpers.

### Before package publish
- `pnpm build` and `pnpm changeset:publish --dry-run`.
- `scripts/publish-private-packages.mjs` allowlist update is required for any new publishable package.
- `pnpm pack` for `@dd-bot-platform/channel-runtime` and one tarball import smoke.

### Before cross-repo adoption sign-off
- Docoved keeps its current beta Telegram/email proofs green while swapping only the contract seam.
- SellerAgent proves no product dependency leaks back into the framework package.
- One shared regression proof per product repo that the same canonical document renders correctly on that product’s supported channels.

## Reuse of Existing Infra

- `pnpm check` already maps to the repo build baseline, so it should remain the main pre-merge gate for framework code.
- Existing GitHub CI (`.github/workflows/ci.yml`) already runs install + `pnpm check`; that is the right place to add any new package build/import smoke without inventing a separate release pipeline.
- Existing release workflow (`.github/workflows/release-packages.yml`) already does `pnpm build` and `changeset:publish --dry-run`; the new package should join that flow instead of creating a bespoke publisher.
- `scripts/publish-private-packages.mjs` already encodes the publishable package allowlist; use that as the single release control plane for framework packages.
- `packages/api-contract` already shows the preferred pattern: typed `zod` contracts, no runtime coupling, and a publishable package with `prepack` / `build` / `typecheck`.
- `packages/scenario-system` already provides reusable artifact/fixture primitives; those should be reused for scenario evidence and import-smoke harnesses instead of inventing a new proof store.
- `packages/core` and the existing runtime specs already establish the ownership boundary language for helpers, tracing, and product exclusions.

## Concrete Protocol Edits

1. Add an explicit `Verification Matrix` subsection for `channel-runtime` with four named proof buckets: markdown rendering, canonical document mapping, command access policy, and import boundary smoke.
2. Add a `Scenario/Docs` subsection that requires a flat framework scenario family under `bot-platform/scenarios/` plus product-local adoption anchors in `docoved-agent` and `seller-agent`.
3. Tighten the package rollout wording so `@dd-bot-platform/channel-runtime` is listed in the root build graph, `tsconfig.build.json`, and publish allowlist as a first-wave requirement, not a later follow-up.
4. Add explicit gate wording that the first wave is “types + pure helpers + import smoke”; do not imply hosted adapters or transport senders are part of the initial package.
5. Add explicit fixture expectations for public/operator/debug visibility separation, because that is the easiest place for regression when document mapping starts sharing code across products.
6. Add an explicit note that Docoved and SellerAgent adoption proofs must preserve their existing beta or local runtime baselines; the framework package is only the contract seam, not the product acceptance owner.
7. Add a sentence that `sales-agent` remains historical lineage only, while canonical scenario routing must point to `bot-platform`, `docoved-agent`, and `seller-agent`.

## Bottom Line

The protocol direction is sound, but verification is currently under-specified relative to the breadth of the contract. The safest minimal path is:
- keep the first package wave type-only or types-plus-pure-helpers;
- add one flat framework scenario/doc anchor for the channel-runtime seam;
- reuse existing build/release infrastructure and the existing package publish allowlist;
- require one import smoke and one mapping/rendering fixture set before any product adoption claim.
