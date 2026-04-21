---
file: .memory-bank/spec/security/auth-core.md
description: Framework auth-core contract for principal, session, and access-check boundaries across bot-platform consumers.
purpose: Reference when implementing or integrating reusable auth surfaces in framework packages and product repos.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
spec: SPEC-005
tags: [spec, security, auth, access, framework, contracts, bot-platform]
parent: .memory-bank/spec/security/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/runtime/index.md
  - .memory-bank/spec/client-api/typed-client-api-and-sdk.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Introduced the first framework auth-core contract distilled from mixed product auth/access material and grounded in shared operation + SDK surfaces.
---

# SPEC-005: Auth Core

## Goal

Define framework-owned auth primitives and boundaries that product repos can reuse:
- principal and session vocabulary;
- auth-attempt and completion flow shape for browser and CLI;
- access-check contract shape and ownership seams.

This document intentionally does not freeze any one product's trust policy as framework canon.

## Grounding

### Docs / SSoT

- [Framework boundaries](../architecture/boundaries.md): framework vs product ownership rule.
- [Runtime hub](../runtime/index.md): runtime-level ownership of shared auth framework seams.
- [Typed client API and SDK](../client-api/typed-client-api-and-sdk.md): operation-first and thin client contract expectations.
- `sales-agent/.memory-bank/spec/security/auth-and-access.md`: mixed product source distilled into reusable framework truth only.

### Code grounding

Auth operation family exists in `sales-agent/packages/api-contract/src/operations.ts`:
- login initiation/completion and CLI intent flow (`auth.requestEmployeeLoginLink`, `auth.startCliLoginIntent`, `auth.completeCliBrowserLogin`);
- session lifecycle (`auth.getSession`, `auth.listSessions`, `auth.revokeSession`);
- access check and admission governance (`auth.checkAccess`, workspace-member/invite/trust-policy operations, system-admin invite operations);
- bounded bootstrap path (`auth.issueScenarioToken`) and non-human token issuance (`auth.issueDeployToken`).

Typed SDK mirrors this family in `sales-agent/packages/client-sdk/src/index.ts` under `client.auth.*`, confirming shared client-facing expectations independent of one UI surface.

## Framework auth vocabulary

### Principal model

Framework primitive: `auth principal`.
- Represents an authenticated operator/admin identity for protected control surfaces.
- Is distinct from channel/customer identity models.
- Can hold multiple scoped memberships resolved by product policy.

Framework primitive: `membership`.
- Binds principal to a scope (workspace/business/project) with a role.
- Role names and policy semantics are product-owned; framework only owns the contract that access is membership-derived.

### Session model

Framework primitive: `session`.
- Issued after successful auth completion.
- Has source metadata (for example magic-link, CLI login, scenario token, deploy token), issuance/expiry timestamps, and revocation state.
- Must be resolvable server-side for authoritative access checks.

Framework primitive: `session record`.
- Persisted lifecycle record used for list/revoke/replace semantics.
- Enables explicit logout/revoke behavior across browser and CLI consumers.

### Access-check primitive

Framework primitive: `access check`.
- Input includes target action/resource context and current principal/session context.
- Output is an explicit allow/deny decision with machine-readable reasons.
- Must execute on the server boundary; client-side hints are advisory only.

## Reusable auth flow patterns

### Browser login pattern

Reusable contract:
1. Start login intent (`auth.requestEmployeeLoginLink`) from public entry surface.
2. Complete via canonical first-party completion route.
3. Exchange completion into an authenticated session consumed by protected app routes.

Framework requirement:
- initiation responses should avoid account enumeration leakage.

### CLI browser-first intent pattern

Reusable contract:
1. CLI starts short-lived auth intent (`auth.startCliLoginIntent`).
2. Browser confirms ownership for that intent and completes.
3. CLI polls intent state (`auth.getCliLoginIntent` / `auth.getCliBrowserLoginState`) until approved or expired.
4. Abandon path exists for stale intents (`auth.abandonCliLoginIntent`).

Optional fast path:
- explicit-email request can trigger intent-bound email delivery (`auth.requestCliLoginMagicLink`) without changing completion semantics.

### Session lifecycle pattern

Reusable contract:
- resolve current session (`auth.getSession`);
- enumerate active/recent sessions (`auth.listSessions`);
- revoke/logout a specific session (`auth.revokeSession`);
- keep session replace semantics explicit when re-login occurs for the same authority.

### Bootstrap and automation pattern

Reusable contract split:
- `auth.issueScenarioToken` supports non-production bootstrap/testing handoff where allowed by environment policy.
- `auth.issueDeployToken` supports unattended automation with scoped actions and TTL.

Framework rule:
- bootstrap-style bypasses are product/environment gated and must never silently become default production login behavior.

## Boundary contract

### Framework owns

- auth primitive vocabulary (principal/session/access-check/intent);
- typed operation-family contract shape for auth flows;
- server-authoritative access-check requirement;
- shared separation of customer identity from operator/admin auth identity;
- reusable session lifecycle semantics (issue/resolve/list/revoke/replace).

### Product repos own

- trust policy content and admission rules (domains/allowlists/modes);
- membership role taxonomy semantics and business-profile-specific governance;
- provisioning runbooks, environment overlays, and issuer identities;
- channel-specific projection rules and operator communications policy.

### Framework anti-drift rule

If an auth rule cannot be expressed without product nouns (workspace naming conventions, product role policy, product bootstrap process), it remains product-owned until generalized by at least one additional product consumer.

## Operation-family expectations (shared surface only)

Framework auth operation family should remain grouped by intent rather than transport:
- `auth.login.*` intent lifecycle;
- `auth.session.*` resolve/list/revoke lifecycle;
- `auth.access.*` decision contract;
- `auth.membership.*` and `auth.invite.*` governance operations (policy content product-owned);
- `auth.bootstrap.*` / `auth.token.*` for controlled automation paths.

Current mixed-repo operation IDs already follow this family pattern under `auth.*`; product repos can evolve policy while preserving this shared contract style.

## Non-goals

- Define product-specific role ladders as framework-canonical RBAC policy.
- Define workspace trust policy defaults or escalation runbooks as framework truth.
- Require a standalone shared auth service implementation in `bot-platform` today.
- Treat product bootstrap internals as normal human auth baseline.

## Risks

- Risk: product-specific policy drifts into framework docs.
  Mitigation: keep this doc focused on primitives and boundary rules; product policy remains in product specs.

- Risk: auth operation IDs in products diverge without shared contract discipline.
  Mitigation: preserve `auth.*` operation-family semantics and typed SDK parity checks as migration gates.

## Docs impact

- Security section is now first-class in `spec/index.md`.
- Root Memory Bank entry points include Security docs for discoverability.
