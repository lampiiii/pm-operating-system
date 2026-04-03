# PM Operating System

A markdown-based operating system for Product Managers, powered by Claude Code. Zero dependencies. Seven interactive dashboards. Eleven custom skills. Four specialized AI agents. Twenty-four governance files.

No Notion. No Jira. No Confluence. Just markdown files, a Node.js server, and AI.

## What This Is

A fully functional PM workspace that runs from your terminal. It manages tasks, tracks 1:1 syncs, maintains product backlogs, visualizes strategy, builds persona empathy, and documents proof of value — all through markdown files served as interactive dashboards.

Every component is designed to demonstrate a specific PM skill that AI can't replace: governance design, domain expertise, platform thinking, and system-level architecture.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/lampiiii/pm-operating-system.git
cd pm-operating-system

# Start the server (zero dependencies — no npm install needed)
node pm-workspace/action-tracker/server.js

# Open in browser
open http://localhost:3000/home
```

That's it. No `npm install`. No build step. No configuration.

## Dashboards

| Route | Dashboard | What It Does |
|-------|-----------|-------------|
| `/home` | Homepage | Composable daily cockpit — tasks, activity, deadlines, sync nudges, persona drips |
| `/` or `/tracker` | Action Tracker | LNO-prioritized task management with real-time SSE updates |
| `/sync` | 1:1 Check-in Hub | Multi-person weekly sync tracker with per-person dashboards |
| `/playbook` | Strategic Playbook | Career positioning framework visualization |
| `/backlog` | Product Backlog | Idea tracking with priority and status management |
| `/docs` | Docs Viewer | Browse, search, and edit workspace markdown files |

All dashboards support dark mode, live updates via Server-Sent Events, and share a consistent design system.

## Architecture

```
pm-operating-system/
├── CLAUDE.md                          # Root governance file
├── pm-workspace/
│   ├── CLAUDE.md                      # Workspace conventions
│   ├── action-tracker/                # Task management + server
│   │   ├── server.js                  # Zero-dependency Node.js server
│   │   ├── active-tasks.md            # Current tasks (markdown = database)
│   │   ├── completed-tasks.md         # Archived tasks
│   │   ├── action-tracker-dashboard.html
│   │   └── claude-code-activity-log.md
│   ├── growth-and-syncs/              # Career growth + 1:1 tracking
│   │   ├── framework-and-mindset/     # Strategic playbook, proof of value
│   │   └── weekly-sync-log/           # Multi-person sync hub
│   ├── products/                      # Product workspaces
│   │   └── your-product/              # Template product structure
│   │       ├── features/              # Feature folders
│   │       ├── product-ideas-backlogs/# Backlog with dashboard
│   │       ├── strategy/              # Vision, roadmap, OKRs
│   │       └── research/              # User research, competitive analysis
│   ├── skills/                        # Custom slash commands
│   ├── persona-drip/                  # Daily persona immersion system
│   ├── styles/                        # Writing style guides
│   └── velyo/                         # Homepage, docs viewer, shared UI
├── .claude/
│   ├── agents/                        # 4 specialized AI agents
│   └── commands/                      # Slash commands
└── packages/                          # Package tracking
```

## Key Design Decisions

| Decision | Why |
|----------|-----|
| **Zero npm dependencies** | Reduces attack surface, eliminates supply chain risk, proves you can build production infra with fundamentals |
| **Markdown as the data layer** | Human-readable, version-controlled, AI-parseable — works across every tool |
| **SSE for live updates** | Real-time dashboard refreshes when markdown files change — no polling |
| **CSS custom properties as design API** | Change a variable, and 7 pages update — design tokens without a framework |
| **24 CLAUDE.md governance files** | Hierarchical instruction system scoping AI behavior per directory — team charters for agents |

## The Governance System

This repo demonstrates AI governance through two mechanisms:

### Hooks (Deterministic Automation)
Seven lifecycle hooks that fire at specific events — no LLM involved, no chance of forgetting:

| Hook | What It Does |
|------|-------------|
| Desktop Notifications | macOS alert when Claude needs input |
| Secret File Protection | Hard block on .env file edits |
| Markdown Table Validator | Catches malformed data before it breaks the API |
| Server Syntax Check | `node --check` after every server.js edit |
| Package Install Reminder | Tracks new dependencies |
| Context Re-Injection | Restores rules after context compaction |

### CLAUDE.md Hierarchy (Contextual Governance)
24 files creating scoped instructions per directory:

```
Root (repo conventions, server config, git rules)
  └── Workspace (workflows, communication styles)
        ├── Action Tracker (LNO framework, task lifecycle)
        ├── Growth & Syncs (sync workflows, playbook reference)
        ├── Products (feature pipeline, domain context)
        ├── Skills (module descriptions, execution guidelines)
        └── Persona Drip (generation rules, rotation schedule)
```

## Custom AI Agents

| Agent | Purpose |
|-------|---------|
| **Competitive Strategic Lens** | 7-step competitive analysis for any product feature — comparison, differentiation, moat assessment, AI disruption threats |
| **PRD Edge Case Analyzer** | 10-dimension risk analysis across user, data, state, integration, security, performance, business logic, error handling, operations, and metrics |
| **Persona Drip** | Daily B2B persona immersion — generates vivid workday scenarios to build PM empathy |
| **Claude Code Coach** | 8-pillar workflow audit — plan mode, tasks, memory, CLAUDE.md, skills, agents, prompts, context management |

## Custom Skills

| Skill | What It Does |
|-------|-------------|
| `/doc-refiner` | Restructure and polish unstructured markdown |
| `/epic-creator` | Generate structured product epics |
| `/story-creator` | Create user stories with acceptance criteria |
| `/meeting-prep` | Prioritized agenda from freeform notes |
| `/team-message` | Convert rough thoughts to professional messages |
| `/image-to-spec` | Screenshot to feature specification |
| `/cc-check` | Claude Code workflow audit |
| `/spin-up` | Delegate tasks to sub-agents |

## Voice-to-Data Feature

The dashboards include voice input — dictate tasks, sync points, or backlog items, and the system extracts structured data using the Claude API. Requires an `ANTHROPIC_API_KEY` in your `.env` file.

## Customizing for Your Workflow

1. **Rename the product folder**: `products/your-product/` → `products/your-actual-product/`
2. **Update `people.json`**: Add your real 1:1 sync partners
3. **Customize agents**: The agents are configured for CSM domain — swap in your domain expertise
4. **Add your goals**: Create `growth-and-syncs/my-goals.md` with your career objectives
5. **Configure hooks**: See `.claude/settings.json` for hook examples

## The Proof of Value Framework

The `proof-of-value.md` file is a living evidence log organized across 10 skill areas. It captures not what you *did*, but what *judgment* you demonstrated — the work AI can't replace. Use it to answer: "What would be lost if I weren't here?"

## Philosophy

This workspace embodies a specific belief: PM work splits into two layers.

**Task Execution** — writing tickets, managing backlogs, sending status updates. AI does all of this now.

**Strategic Apex** — defining what to build and why, setting guardrails for AI systems, encoding domain knowledge, making judgment calls with incomplete data. This gets *more* valuable as AI gets better.

Every component in this repo is proof of Strategic Apex work: governance design, domain expertise, platform architecture, and system-level thinking.

## Built With

- **Node.js** — Built-in `http`, `fs`, `path` modules only
- **Claude Code** — Every line of code was written with Claude Code
- **Markdown** — The entire data layer
- **Vanilla HTML/CSS/JS** — No frameworks, no build step

## License

MIT — see [LICENSE](LICENSE)
