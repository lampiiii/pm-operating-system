# PM Workspace

A markdown-based Product Manager Operating System — structured knowledge management, AI-assisted workflows, and systematic task tracking.

## Structure

| Directory | Purpose |
|-----------|---------|
| `action-tracker/` | LNO-prioritized task management + Node.js server (port 3000) |
| `velyo/` | Homepage, docs viewer, shared UI resources (navbar, form-view CSS, branding) |
| `growth-and-syncs/` | Career frameworks, strategic playbook, goals, and multi-person 1:1 sync logs |
| `products/` | Product workspaces (currently: Customer Success Management) |
| `skills/` | 11 specialized PM task modules (epic creator, story creator, meeting prep, LinkedIn post, etc.) |
| `resources/` | Reverse demo transcripts and prospect intelligence |
| `linkedin-posts/` | LinkedIn content creation (ideas, drafts, published posts) |
| `persona-drip/` | Daily B2B persona immersion scenarios |
| `conversations/` | Generated team messages and ad-hoc content |
| `stakeholders/` | Stakeholder mapping and communication planning |
| `styles/` | Writing style guides (executive email) |
| `claude-code-reference/` | Claude Code tool guides and MCP references |

## Quick Start

```bash
node action-tracker/server.js
# → http://localhost:3000
```

## Key Routes

| Route | Page |
|-------|------|
| `/` | Action Tracker dashboard |
| `/home` | PM Workspace homepage |
| `/sync` | 1:1 Check-in hub (multi-person) |
| `/playbook` | Strategic playbook dashboard |
| `/backlog` | Product backlog dashboard |
| `/docs` | File explorer (browse/edit workspace files) |
| `/workspace` | Workspace overview |

## Conventions

- All dates use **YYYY-MM-DD** format
- Files use **lowercase-with-hyphens** naming
- Each major directory has a **CLAUDE.md** with scoped context (29 total)
- Tasks use the **LNO framework** (Leverage / Neutral / Overhead)
- Zero npm dependencies — server uses only Node.js built-ins

See `CLAUDE.md` in each directory for detailed guidance.

---

**Last Updated**: 2026-03-31
