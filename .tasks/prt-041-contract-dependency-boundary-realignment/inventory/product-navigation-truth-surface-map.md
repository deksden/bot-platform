---
file: .tasks/prt-041-contract-dependency-boundary-realignment/inventory/product-navigation-truth-surface-map.md
description: Structured cross-repo Memory Bank entrypoint truth-surface inventory for T041-I3.
purpose: Identify current normative entrypoint wording that still blurs active protocols and closed baselines.
date: 2026-04-24
task: T041-I3
status: COMPLETE
---

# Product Navigation Truth-Surface Map

This map only classifies current entrypoint wording. Historical `history:` entries were ignored unless the current body repeated the stale claim.

| repo | file | current wording | risk | recommended change | normative or historical |
| --- | --- | --- | --- | --- | --- |
| `bot-platform` | `.memory-bank/index.md` | Protocols hub says `PRT-036` / `PRT-038` are closed split/convergence protocols and `PRT-041` is active dependency-boundary cleanup. Reading order also says `PRT-038` is closed architecture/handoff baseline and `PRT-036` is closed split lineage. | low | No change required. | normative |
| `bot-platform` | `.memory-bank/plans/index.md` | Immediate planning priorities say `PRT-038` is closed, active execution is `PRT-041`, and `PRT-039`/`PRT-040` are closed child packets. | low | No change required. | normative |
| `bot-platform` | `.memory-bank/plans/protocols/index.md` | Current protocol status says `PRT-038` closed, `PRT-039`/`PRT-040` closed, `PRT-041` active, and new work should not extend closed `PRT-038` unless explicitly part of `PRT-041`. | low | No change required. | normative |
| `bot-platform` | `.memory-bank/plans/current-status-report.md` | A body section says “protocol hardening is now landed in the active convergence packet” for `PRT-038`; later sections correctly say `PRT-038` is closed and `PRT-041` is next. | medium | Replace “active convergence packet” with “closed convergence packet baseline” or equivalent. | normative |
| `seller-agent` | `.memory-bank/index.md` | Root says `PRT-008` is a closed adoption protocol/baseline and upstream `PRT-041` is current dependency-boundary cleanup. | low | No change required. | normative |
| `seller-agent` | `.memory-bank/plans/index.md` | Core entrypoints say “Active next-wave local protocol: PRT-008”; kickoff rule says “The current local planning start packet is: PRT-008” and points upstream to `bot-platform PRT-038`. | high | Reframe `PRT-008` as closed baseline; point dependency-boundary cleanup to upstream `PRT-041`; require a new SellerAgent-local protocol for new product work. | normative |
| `seller-agent` | `.memory-bank/plans/protocols/index.md` | Protocol hub says `PRT-008` is closed baseline and dependency-boundary cleanup aligns with upstream `PRT-041`. | low | No change required. | normative |
| `seller-agent` | `.memory-bank/plans/current-status-report.md` | Status says `PRT-008` has no open hosted blocker and follow-up aligns with upstream `PRT-041`; one list says “planned PRT-008 governed-surface anchors.” | low | Optional cleanup from “planned PRT-008” to “PRT-008 governed-surface anchors.” | normative |
| `docoved-agent` | `.memory-bank/index.md` | Root says local `PRT-038` is a closed adoption protocol/baseline and upstream `PRT-041` is current dependency-boundary cleanup. | low | No change required. | normative |
| `docoved-agent` | `.memory-bank/plans/index.md` | Remaining backlog says “Active next-wave local protocol is PRT-038”; kickoff rule says “The current local planning start packet is: PRT-038” and points upstream to `bot-platform PRT-038`. | high | Reframe local `PRT-038` as closed baseline; point dependency-boundary cleanup to upstream `PRT-041`; require a new Docoved-local follow-up only when product-owned code/docs are touched. | normative |
| `docoved-agent` | `.memory-bank/plans/protocols/index.md` | Protocol hub says local `PRT-038` is the closed self-contained Docoved adoption baseline and dependency cleanup aligns with upstream `PRT-041`. | low | No change required. | normative |
| `docoved-agent` | `.memory-bank/plans/current-status-report.md` | Status says Wave 04/05 `PRT-038` follow-up line is closed and next work aligns with upstream `PRT-041`. | low | No change required. | normative |

