# PRT-043 Pre-code Gate Decision

Date: 2026-04-26

Inputs:
- `T-043-01-report.md`
- `T-043-05-report.md`
- `T-043-06-report.md`

## Accepted decisions

### G-043-01 command-framework implementation/export location

Accepted: materialize command-framework typed contracts in `@dd-bot-platform/core` under `packages/core/src/command-framework/`, exported from `packages/core/src/index.ts`.

Rationale:
- `@dd-bot-platform/core` already owns framework refs, channel/control-plane vocabulary, and has no package dependencies.
- Avoids a new package before dependency direction requires it.
- Avoids command-framework leakage into `@dd-bot-platform/channel-runtime`.

### G-043-02 threading/delivery intent scope

Accepted: add provider-neutral summary-only threading and outbound-delivery intent/result types to `@dd-bot-platform/channel-runtime`.

Constraints:
- no provider SDK sender;
- no framework retry loop;
- no queues/schedulers;
- no DB/read models;
- no provider payload/header/reply SDK objects as first-class framework fields.

### G-043-03 Docoved first parity command set

Provisional: `/help`, `/sources`, `/status`, `/report`.

Status: not ready for implementation. Product adoption remains blocked until Docoved decides canonical writable command-policy authority and builds/approves a live email command dispatch path.

### G-043-04 SellerAgent first subset

Accepted for planning: read-only diagnostics/readback subset only.

Candidate subset:
- `/start`, `/help`, `/whoami`, `/status`, `/context`, `/pipeline`, `/why`, `/inspect`, `/versions`, `/releases`, `/current`.

Status: broad adoption/mutation work blocked. Release-control mutation is out of first proof slice.

### G-043-05 delivery fields

Platform shared first slice:
- `deliveryId`, `attemptId`, `responseId`, `runId`, `traceId`, `channelRef`, `transportMessageRef`, `idempotencyKey`, `status`, `reasonCode`, timing summary, safe extensions.

Product-local:
- provider payloads, retry history, stored delivery records, delivery plan steps, product workflow states, SellerAgent-specific job/conversation records.

### G-043-06 threading config shape

Platform first slice:
- default mode;
- fallback allowed flag;
- reply-to-origin required flag;
- namespaced adapter config summary/extensions.

Product-local:
- provider ref lookup;
- email headers;
- Telegram reply params;
- config snapshots/storage.

## Implementation authorization

Authorized now:
- `T-043-02`: command-framework typed contracts in `@dd-bot-platform/core`.
- `T-043-03`: threading/delivery intent/result types in `@dd-bot-platform/channel-runtime`.

Still blocked:
- `T-043-07`: Docoved adoption implementation.
- `T-043-08`: SellerAgent adoption implementation.
- any DB/UI/provider sender/mutation-command expansion.

