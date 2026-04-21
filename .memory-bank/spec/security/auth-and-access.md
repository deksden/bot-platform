---
file: .memory-bank/spec/security/auth-and-access.md
description: Framework auth-and-access contract describing reusable login/session/access mechanics while keeping product trust policy as external overlays.
purpose: Read when defining auth flows, session lifecycle, and access-check boundaries shared by framework packages and product repos.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
spec: SPEC-006
tags: [spec, security, auth, access, sessions, framework, boundaries]
parent: .memory-bank/spec/security/index.md
related_files:
  - .memory-bank/spec/security/auth-core.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Migrated shared auth-and-access mechanics from mixed source docs into framework form, trimming product-specific membership and deployment policy.
---

# SPEC-006: Auth And Access

## Goal

Зафиксировать reusable auth/access mechanics так, чтобы:
- browser and CLI surfaces имели единый auth vocabulary;
- customer/channel identities не смешивались с operator/admin auth identities;
- access checks оставались server-authoritative;
- bootstrap/testing paths были явно ограничены и не дрейфовали в normal production login flow.

## Scope split

This spec is framework-owned for mechanics and boundary contracts.

Product repos remain owners of:
- trust-policy content (domains/allowlists/modes);
- concrete role semantics and membership governance;
- product provisioning flows and environment-specific operational policy.

## Audience model (framework level)

- `customers`: channel/end-user identities; not operator web/CLI principals.
- `operators/admins`: authenticated principals for protected control surfaces.
- `platform maintainers`: internal actors operating bootstrap/provision workflows where allowed.

Separation between customer identity and operator/admin auth is mandatory.

## Principal and access model

Framework primitives:
- auth principal;
- scoped membership;
- role-bearing access context;
- server-side access decision with machine-readable reasons.

Rules:
- access checks run on trusted server boundary, not from client claims alone;
- session resolution and membership evaluation are authoritative inputs for allow/deny;
- transport-specific actor classifications must not replace canonical access state.

## Login and completion model

### Browser path
1. Start login intent from a public entry surface.
2. Send first-party login link tied to the intent.
3. Complete at a canonical auth completion route.
4. Exchange into authenticated session and enter protected app shell.

Required guardrail:
- initiation responses should avoid account enumeration leakage.

### CLI path

Primary pattern is browser-first intent:
1. CLI starts short-lived auth intent.
2. Browser flow confirms intent ownership.
3. CLI polls state until approved/expired.
4. Completed session is persisted in CLI auth storage.

Optional fast path:
- explicit email can start an attempt-bound email link flow without changing completion semantics.

Shared rules:
- links are attempt-bound and fail closed after expiry/abandonment;
- repeated login should replace active authority-scoped session unless policy says otherwise;
- send throttling is server-governed.

## Session lifecycle contract

Required lifecycle surfaces:
- resolve current session;
- list active/recent sessions;
- revoke/logout specific session;
- replace session on re-login for the same authority when configured.

Contract expectation:
- signed tokens may remain transport format, but authoritative resolve/revoke must be backed by persisted session state.

## Bootstrap and automation boundary

Bootstrap/login bypass flows are allowed only as explicit environment-gated contracts.

Rules:
- bootstrap/scenario token exchange is non-production by default;
- bypass operations are narrow, auditable, and validated by dedicated secret/credential policy;
- automation/deploy tokens are separate from human login sessions and should be scoped with TTL and action limits.

## Data-exposure boundary

Auth/session/membership tables are internal by default.

Rules:
- no implicit public data-API exposure for internal auth tables;
- exceptions must be explicitly documented with verification;
- schema changes touching auth/access include explicit RLS/grants/exposure decisions.

## Product overlay policy

The following remain product-overlay concerns and must not be frozen as framework truth:
- workspace/business trust policy defaults;
- product role ladder and membership mutation UX;
- product-specific invite issuance lifecycle details;
- product sender identities and channel-specific notification policy.

Framework docs may reference these overlays as external owning specs, but must not duplicate them as canonical rules.

## Guardrails

- Customer/channel identities must never be auto-treated as operator auth principals.
- Access checks live on server boundaries, not solely in client/UI code.
- Public auth surfaces avoid account enumeration and avoid leaking sensitive state.
- Bootstrap bypass and test helpers are forbidden in production unless an explicit exception contract exists.
- Hosted auth changes require staged verification evidence before production promotion.

## Non-goals

- Define one product's role taxonomy as framework RBAC canon.
- Specify product invite/admin runbooks or trust-policy playbooks.
- Replace product-owned security operations docs.
