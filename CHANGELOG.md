# Changelog

## v1.0.1 - 2026-11-16

- Cache-busting check in the premium deploy checker: `deploy-check.py --dist <dir>` scans the built frontend output for script and stylesheet references without a version query string and warns on any local `.js` or `.css` reference that has neither a query string nor a content hash in the filename. The check is a warning, never an error. SKILL.md Rule 6 now documents the check, and the Pages deploy procedure runs it before the deploy.
- Premium references: a GitHub Actions workflow template (`references/github-actions-deploy.yml`) that deploys a Pages site and a Worker from the main branch, running the checker first as a gate and deploying both through Wrangler only; and a monorepo blueprint (`references/monorepo-wrangler.toml`) for a project with a Pages frontend and two Workers.
- Deliberately not added: a direct-upload fallback script. The direct-upload route caused the HTTP 500 the skill is built to prevent, so a fallback recommending it would contradict the skill's core rule. The scope also stays as built (Pages plus Workers plus D1 plus Email Routing); it is the scope the real deployment scars cover.

## v1.0.0 - 2026-11-16

First release.

- Free skill: the cloudflare-deploy skill for Claude Code, built from real deployment scars (the six hard rules: Wrangler-only Pages deploys, full bindings on every Worker redeploy, compatibility date check, sequenced builds and deploys, one permanent token, version bump plus live verification). Includes the setup checklists (DNS, Pages, Workers, Email Routing, D1), the error-diagnosis guide, install steps for Claude Code, Codex, Cursor, and Claude.ai, a complete example wrangler.toml, an example deploy config, and a pre-deploy checklist.
- Premium pack: the free skill plus the pre-deploy checker (`deploy-check.py`), a complete reference Worker config (`references/full-stack-wrangler.toml`), and the post-deploy verification checklist.
- Price: $15, one-time payment, single-user licence.
