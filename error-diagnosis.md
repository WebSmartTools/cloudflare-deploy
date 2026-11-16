# Error-Diagnosis Guide

Work the table in order. Find the symptom, run the check, apply the fix. Do not guess past the table.

## Pages deploy serves HTTP 500 on every path, including the homepage

- Likely cause: the deploy went through a direct-upload route instead of Wrangler (Rule 1).
- Check: redeploy the exact same build with `wrangler pages deploy build --project-name=<name> --branch=main`.
- Fix: the Wrangler deploy. If the Wrangler deploy also serves 500, the build itself is broken. Check the build output folder and the build command.

## The site shows old content after a deploy

- Likely cause: the browser is serving a cached copy of `app.js` or the page (Rule 6).
- Check: look at the served file. Is the version query string the new one? Is the new code in it?
- Fix: bump the app version query string on every `app.js` change, redeploy, and check live again. A hard refresh on your own browser is not a fix for your visitors.

## A binding is gone after a Worker redeploy

- Likely cause: the deploy did not list the binding, and the metadata replace wiped it (Rule 2).
- Check: open the Worker in the dashboard and list the bindings. Compare with the list the Worker code uses.
- Fix: redeploy with the full bindings list. Then check the dashboard again. Do not patch the binding by hand and leave the deploy config wrong, or the next deploy wipes it again.

## The Worker only responds on workers.dev, not on the real domain

- Likely cause: no route is declared, or the route points at the wrong zone.
- Check: `wrangler.toml` routes. Each route needs a `pattern` with the real domain and a `zone_name` (or `zone_id`) for that domain.
- Fix: add or correct the route and redeploy.

## A route returns 404

- Likely cause: the route pattern does not match the path being requested, or the Worker code does not handle that path.
- Check: the exact pattern in `wrangler.toml` against the exact URL. A pattern of `example.com/api/*` does not match `example.com/blog/`.
- Fix: correct the pattern, or add the missing path handler in the Worker code, then redeploy.

## The Worker throws an error about a binding or env value being undefined

- Likely cause: the binding name in the config does not match the name the code uses, or the secret was never set.
- Check: the binding name in `wrangler.toml` against the name in the code (`env.DB` needs a binding named `DB`). For secrets, check the dashboard or run `wrangler secret list`.
- Fix: correct the name, or set the secret with `wrangler secret put`, then redeploy.

## Cron trigger never fires

- Likely cause: the trigger is not in the config, the cron expression is malformed, or the Free plan limit of 5 triggers is hit.
- Check: `[triggers]` in `wrangler.toml`. A cron expression has 5 fields. Count the triggers.
- Fix: correct the expression, or remove a trigger you no longer need, then redeploy.

## The deploy fails with an authentication error

- Likely cause: the token is wrong, expired, rolled, or missing a scope (Rule 5).
- Check: the scopes first. A token without the Workers Scripts scope cannot deploy a Worker. A token without the D1 scope cannot touch a database.
- Fix: use the one permanent full-scope token from the secure credential store. If a project needs a scope the token lacks, raise it before starting work, never mid-build. Never roll the token mid-project.

## The deploy fails with a compatibility date error

- Likely cause: the date is in the future, malformed, or missing.
- Check: `compatibility_date` in `wrangler.toml` is a real past date in `YYYY-MM-DD` form.
- Fix: set a valid date and redeploy. Then compare it with the deploy tool's date (Rule 3).

## Port 25 reports closed or filtered

- Likely cause: none. Cloudflare blocks outbound port 25 from Workers.
- Check: nothing to check. It is the platform.
- Fix: none. Report the result as connection-based and move on.

## An external screenshot or check service fails on the main domain but works on the Pages deployment domain

- Likely cause: Bot Fight Mode is blocking the automated service.
- Check: try the same check against the Pages deployment domain. If it works there, Bot Fight Mode is the cause.
- Fix: none, unless the project is willing to turn Bot Fight Mode off. Do not turn it off silently. It is a security setting, and the trade-off belongs to the project owner.

## Email Routing does not deliver

- Likely cause: the MX records do not point at Cloudflare, or the routing rule does not match the address.
- Check: the MX records for the domain, then the routing rules in the dashboard, then send a test email.
- Fix: correct the MX records or the rule, and wait for DNS to propagate before testing again.

## D1 queries return empty results

- Likely cause: the migrations were never applied, so the tables do not exist, or the Worker is talking to a different database.
- Check: the database ID in the config against the real database, and list the tables.
- Fix: apply the migrations to the right database and redeploy.
