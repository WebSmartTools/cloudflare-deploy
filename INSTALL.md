# Install cloudflare-deploy

The skill is one folder: `cloudflare-deploy`. Copy it into your agent's skills folder and the agent loads it whenever a task matches its description.

## Claude Code

```bash
mkdir -p ~/.claude/skills
cp -r cloudflare-deploy ~/.claude/skills/
```

Restart Claude Code, or run `/skills` to confirm it is listed.

## Codex CLI

```bash
mkdir -p ~/.codex/skills
cp -r cloudflare-deploy ~/.codex/skills/
```

## Cursor

```bash
mkdir -p .cursor/skills
cp -r cloudflare-deploy .cursor/skills/
```

Cursor reads project skills from `.cursor/skills/` in the project root. For a global install, use `~/.cursor/skills/` instead.

## Claude.ai

Go to Settings, then Capabilities, then Skills, and upload the `cloudflare-deploy` folder.

## Check it works

Ask your agent: "Check my wrangler.toml before I deploy, following the cloudflare-deploy skill."

The result should be a check of the project name, the main file, the compatibility date, the routes, and the bindings, with any missing piece named plainly. If the agent deploys without checking the bindings list first, point it at Rule 2 in SKILL.md.

## Updating

The free skill is updated on GitHub. Replace the folder with the new version. Your own project values (IDs, tokens, secrets) live in your project config, not in the skill, so an update will not overwrite them.
