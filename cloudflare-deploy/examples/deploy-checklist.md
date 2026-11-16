# Pre-Deploy Checklist

Run through this before every deploy. It takes two minutes and catches the failures that cost a day.

## Before you deploy anything

- [ ] Nothing else is building or deploying against the same build folder right now (Rule 4).
- [ ] The compatibility date in `wrangler.toml` matches the deploy tool's date (Rule 3).
- [ ] The app version query string was bumped if `app.js` changed (Rule 6).

## Pages deploy

- [ ] The build finished cleanly into the build folder.
- [ ] Deploy command is `wrangler pages deploy build --project-name=<name> --branch=main` (Rule 1).
- [ ] Live check after deploy: homepage returns 200, one tool page returns 200, the new content is in the served HTML.
- [ ] If every path serves 500, redeploy the same build through Wrangler before investigating anything else.

## Worker redeploy

- [ ] Every binding the Worker uses is listed: D1, rate limits, KV, R2, queues (Rule 2).
- [ ] The deploy passes the full bindings list. Nothing is left out.
- [ ] Secrets needed by the Worker are set (`wrangler secret put` or dashboard). They are never in the config file.
- [ ] Live check after deploy: the Worker routes respond, the bindings are still listed in the dashboard, the cron triggers are still there.
- [ ] If a binding is missing after the deploy, redeploy with the full list. Do not patch it by hand and leave the config wrong.

## If you use the premium deploy-check script

- [ ] Run `python3 deploy-check.py wrangler.toml --config deploy-config.json` and fix every error before deploying. Warnings are things to check by hand.
