# Setup Checklists

Work these in order. Each section is done when every box is ticked.

## DNS

- [ ] The domain is registered and its nameservers point to Cloudflare.
- [ ] The DNS zone is active in the Cloudflare dashboard.
- [ ] The apex record (A, AAAA, or CNAME) points at the right target.
- [ ] The `www` record exists and redirects to the apex, or the apex redirects to `www`. Pick one direction and keep it.
- [ ] No leftover records point at an old host. Check the A, AAAA, CNAME, and MX records line by line.
- [ ] DNS changes are given time to propagate before you declare them broken. Check with a DNS lookup tool first.

## Pages

- [ ] A Pages project exists with the right name. The name is what the deploy command uses.
- [ ] The build output folder is set (for example `build/`).
- [ ] The custom domain is attached to the project.
- [ ] The production branch is `main`.
- [ ] The first deploy is done through Wrangler: `wrangler pages deploy build --project-name=<name> --branch=main` (Rule 1).
- [ ] The live site returns 200 on the homepage and on one inner page.

## Workers

- [ ] `wrangler.toml` has `name`, `main`, and `compatibility_date`. See `examples/wrangler-example.toml` for the shape.
- [ ] Every binding the Worker uses is declared in `wrangler.toml` and passed on every deploy (Rule 2).
- [ ] The route is declared and points at the right zone. Without a route, the Worker only publishes to workers.dev.
- [ ] The compatibility date matches the deploy tool's date (Rule 3).
- [ ] Secrets are set with `wrangler secret put` or in the dashboard, never in the config file.
- [ ] Cron triggers are declared in `[triggers]` and the Free plan limit of 5 is respected.
- [ ] The Worker responds live on its routes after deploy.

## Email Routing

- [ ] Email Routing is enabled on the domain.
- [ ] The MX records point at Cloudflare's Email Routing servers.
- [ ] A catch-all address or the specific addresses route to the Email Worker or the destination mailbox.
- [ ] A test email to a routed address arrives. If it does not, check the MX records first, then the routing rules.
- [ ] SPF, DKIM, and DMARC records exist for the domain if the project sends mail. Without them, mail is likely to be rejected or marked as spam.

## D1

- [ ] The D1 database exists and its ID is in `wrangler.toml` under `[[d1_databases]]` with the right `binding` name.
- [ ] The binding name in the config matches the name the Worker code uses (`env.DB` means the binding must be named `DB`).
- [ ] Migrations have been applied to the database. An empty database returns empty results, not errors, so check the tables exist.
- [ ] The Worker can read and write the database live after deploy.
- [ ] The database ID in the config is the real one. A placeholder ID fails at runtime, not at deploy time.
