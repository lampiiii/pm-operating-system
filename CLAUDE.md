# CLAUDE.md — Repo Root

## What This Is

A PM Operating System workspace — an open-source, markdown-based productivity system for Product Managers. All meaningful content lives in `pm-workspace/`. See `pm-workspace/CLAUDE.md` for the full guide.

## Structure

- `pm-workspace/` — Main workspace (tasks, products, frameworks, skills)
- `.claude/agents/` — Custom Claude Code agents
- `.claude/commands/` — Custom slash commands
- `packages/` — Installed package tracking (`installed-packages.md`)

## Running the Server

```bash
npm start
# or: node pm-workspace/action-tracker/server.js
# Serves all workspace pages at http://localhost:3000
```

## Key Routes

| Route | Page |
|-------|------|
| `/` | Action tracker dashboard |
| `/tracker` | Action tracker dashboard |
| `/dashboard` | Action tracker dashboard (alias) |
| `/home` | PM Workspace homepage |
| `/playbook` | Strategic playbook dashboard |
| `/sync` | Weekly sync dashboard |
| `/backlog` | Product backlog dashboard |
| `/workspace` | Workspace overview |
| `/docs` | Docs viewer (browse/search workspace files) |

## Shared UI Resources

`/resources/` serves static assets used across all pages:
- `navbar.js` — Shared navigation bar component (theme-aware, search, avatar, theme toggle)
- `form-view.css` — Shared form layout for record detail modals
- `profile.jpg` — User avatar

## Git

- `.gitignore` excludes: `.DS_Store`, `.env`, `.claude/`, `node_modules/`, `dist/`, `venv/`
- All dates use YYYY-MM-DD format
- When installing packages, update `packages/installed-packages.md`
