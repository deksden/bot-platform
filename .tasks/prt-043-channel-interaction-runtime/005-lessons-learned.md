# PRT-043 Lessons Learned

## 001 — Delivery intent must stay reference-only

When channel-runtime describes outbound delivery, the intent should carry stable references to the canonical response or rendered message, not the full `CanonicalResponseDocument`.

Why:
- keeps the package seam thin;
- avoids accidental duplication of product/runtime answer artifacts;
- prevents delivery contracts from becoming a hidden persistence or payload transport layer;
- leaves provider-specific payload generation and full document lifecycle in product/adapters.

Memory Bank promotion:
- promoted into `.memory-bank/spec/runtime/channel-runtime-contract.md` under `Outbound Delivery Result Summary`.

## 002 — Verifier tasks are useful even for small type-only slices

The verifier subagent caught a scope-widening field that passed typecheck and tests.
For protocol work that changes package contracts, verification should inspect actual exported shape, not only green checks.

Memory Bank promotion:
- promoted into `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md` through the accepted verifier/fix status for `T-043-03`.

## 003 — Task packets must not weaken protocol safety defaults

The implementation task packet originally allowed a permissive missing-policy default for commands, while the main PRT-043 protocol requires framework default deny.
The code was hardened to `default_deny`; product external policy remains optional, but a command definition must provide an internal allow policy before dispatch reaches the handler.

Memory Bank promotion:
- promoted into `.memory-bank/spec/runtime/command-framework-contract.md` through the current package anchor for availability policy;
- promoted into `.memory-bank/plans/protocols/PRT-043-channel-interaction-runtime-implementation-plan.md` as an accepted post-verification hardening.
