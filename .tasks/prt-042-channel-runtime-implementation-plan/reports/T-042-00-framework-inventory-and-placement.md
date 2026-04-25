# T-042-00 Framework Inventory And Placement Report

## Outcome

Completed a read-only inventory of existing framework vocabulary and package placement constraints.

Decision: first-wave channel-runtime should land in a new package, `@dd-bot-platform/channel-runtime`, rather than in `@dd-bot-platform/core` or `@dd-bot-platform/api-contract`.

## What Was Learned

- `core` already owns execution-kernel, pipeline-registry, channel-binding, and observability vocabulary.
- `api-contract` already owns the schema/read-model mirror for channel, pipeline, capability, and trace surfaces.
- channel-runtime needs a narrow typed seam plus small pure helpers, which fits a dedicated package better than widening either existing package.
- commands remain deferred by the contract, so they should not influence the first package shape.

## Lessons / Insights

- Created one durable insight file: `.tasks/prt-042-channel-runtime-implementation-plan/lessons/001-insights.md`.
- No lesson file was needed beyond that insight.

## Evidence Location

- Detailed inventory: `.tasks/prt-042-channel-runtime-implementation-plan/inventory/T-042-00-framework-inventory-and-placement.md`
- Exact commands and searched paths: recorded in the inventory report.

## Follow-Up

- T-042-01 should implement the new package/module shape using reuse/re-export, not duplicate vocabulary.
- Build and publish readiness work will need `tsconfig.build.json` and `scripts/publish-private-packages.mjs` updates if the new package is created.
