// Example Worker. Replace with your own Worker code.
// The only Cloudflare features it uses are the bindings declared in
// wrangler-example.toml: the D1 database (env.DB), the rate limit
// bindings, and the two example secrets (env.MY_API_KEY and
// env.SESSION_SECRET) listed in deploy-config-example.json.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, db: !!env.DB });
    }

    if (url.pathname === "/api/admin") {
      if (request.headers.get("X-Admin-Token") !== env.SESSION_SECRET) {
        return new Response("forbidden", { status: 403 });
      }
      return Response.json({ ok: true });
    }

    if (url.pathname === "/api/keyed") {
      // env.MY_API_KEY is the key for an upstream API.
      return Response.json({ ok: true, keySet: !!env.MY_API_KEY });
    }

    return new Response("not found", { status: 404 });
  },
};
