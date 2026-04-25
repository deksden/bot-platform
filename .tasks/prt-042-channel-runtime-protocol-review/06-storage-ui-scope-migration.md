# Review Task 06: Storage/DB, UI Scope, Migration Safety, Release Process

Read:
- `.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `.memory-bank/spec/project/repo-structure.md`
- `.memory-bank/spec/client-api/index.md` if present
- `.memory-bank/spec/security/index.md` if present
- Existing package release docs/runbooks if present

Focus:
- Determine whether protocol correctly avoids DB/schema changes in first wave.
- If future persisted `responseId`/`answerId`/delivery records are implied, check whether protocol should explicitly defer DB work.
- Review UI implications: whether any UI is in scope now, and if not, ensure protocol says so. If future UI is implied, list MBB/UI doc requirements.
- Check release/publishing process for a new package: versioning, changeset, private publish allowlist, downstream adoption order.
- Check migration safety across bot-platform, docoved-agent, seller-agent/sales-agent.
- Identify compatibility risks and rollback rules.

Output:
- Write your report to `.tasks/prt-042-channel-runtime-protocol-review/report-06-storage-ui-scope-migration.md`.
- Include: scope corrections, release/migration improvements, and exact protocol edits.
