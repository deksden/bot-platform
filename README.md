# bot-platform

Framework monorepo bootstrap for the repo-split program.

Current private package scope:
- `@dd-bot-platform/*`

Primary documentation entrypoint:
- `.memory-bank/index.md`

## Local verification

Install dependencies and run the protected-branch baseline locally:

```bash
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` intentionally maps to the repo build baseline. Release publication remains handled by the controlled `Release Packages` workflow.
