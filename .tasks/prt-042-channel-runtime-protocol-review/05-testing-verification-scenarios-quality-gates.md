# Review Task 05: Testing, Verification, Scenarios, Quality Gates

Read:
- `.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `.memory-bank/plans/verification-matrix.md`
- `.memory-bank/scenarios/index.md`
- `.memory-bank/scenarios/scenario-matrix.md`
- package scripts in `package.json` and package manifests
- Current product proof references in Docoved MB if needed

Focus:
- Review planned tests and gates.
- Check whether protocol uses existing test/proof infrastructure rather than inventing new heavy systems.
- Identify concrete fixture tests needed for markdown rendering, document mapping, command policy, import boundaries.
- Check whether cross-product adoption needs scenario anchors in bot-platform, docoved-agent, and SellerAgent.
- Recommend minimal but sufficient CI/build/typecheck gates before commits and before package publishing.
- Look for gaps in hosted proof expectations for Docoved email/Telegram and future SellerAgent adoption.

Output:
- Write your report to `.tasks/prt-042-channel-runtime-protocol-review/report-05-testing-verification-scenarios-quality-gates.md`.
- Include: required test matrix, scenario/doc additions, and protocol wording improvements.
