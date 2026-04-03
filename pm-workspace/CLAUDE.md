# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **Product Manager Operating System** - a markdown-based knowledge management and workflow system designed to help manage products, track progress, and execute efficiently. This is not a traditional software development codebase.

## Core Philosophy

This workspace operates on three principles:
1. **Structured Knowledge**: Information is organized systematically across templates, styles, and product-specific folders
2. **AI-Assisted Workflow**: AI agents help with task management, analysis, documentation, and research
3. **Progressive Organization**: Daily -> Weekly -> Monthly workflows build on each other

## Directory Structure

### `/action-tracker` - Task Management
LNO-prioritized task tracking system.
- `active-tasks.md` - Current tasks with Priority (L/N/O), Status, Feature, and Visibility (Active/Someday) columns
- `completed-tasks.md` - Archived done tasks with completion dates
- `action-tracker-dashboard.html` - Interactive dashboard UI for task visualization
- `claude-code-activity-log.md` - Auto-logged Claude Code session activity for pattern review (hooks/skills/agents opportunities)
- `server.js` - Node server serving the dashboard and other workspace HTML pages (multiple routes)
- When a task is marked Done -> move from active to completed with today's date
- Priority uses the LNO framework (Shreyas Doshi): L (Leverage), N (Neutral), O (Overhead)

### `/claude-code-reference` - Claude Code Tool Guides
Quick reference documentation for Claude Code integrations and MCPs.
- `figma-console-mcp/figma-console-mcp-guide.md` - Figma Console MCP quick reference

### `/growth-and-syncs` - Career Growth, Goals & 1:1 Syncs
System for capturing leadership frameworks and mindset guidance.
- `framework-and-mindset/` - Frameworks and mindset resources
  - `ai-pm-strategic-playbook.md` - Career strategic playbook for the Agentic AI era (Strategic Apex positioning, M-shaped orchestrator model, moat skills, build priorities, daily action framework)
  - `roadmap-planning-guide.md` - Comprehensive roadmap planning & execution guide (three-horizon model, countdown timeline, product pipeline stages, pre-quarter checklist, frameworks reference)
  - `proof-of-value.md` - Proof of value framework and methodology
  - `strategic-playbook-dashboard.html` - Interactive dashboard for the strategic playbook
- `weekly-sync-log/` - Track discussion points for weekly manager syncs
  - `active-points.md` - Points to discuss in the next sync (categories: Work Item, Issue, Feedback, Career Growth, Decision, FYI)
  - `discussed-points.md` - Archive of all discussed points with outcomes and next steps
  - `weekly-sync-dashboard.html` - Interactive dashboard for weekly sync tracking
  - When a point is marked "Discussed" -> move from active to discussed with sync date and outcome

### `/velyo` - Homepage & Shared UI Resources
PM workspace homepage, docs viewer, and shared UI components served by the action-tracker server.
- `pm-workspace-home.html` - Full-screen hero homepage (served at `/home`); includes a Persona Drip section showing latest daily drips
- `docs-viewer.html` - Browse, search, and edit workspace markdown files (served at `/docs`)
- `resources/` - Shared static assets served at `/resources/`:
  - `navbar.js` - Shared navigation bar (theme-aware, search, avatar, theme toggle) -- included by all dashboards
  - `form-view.css` - Shared form layout for record detail modals -- used by Action Tracker, 1:1 Check-in, Backlogs
  - `profile.jpg` - User avatar photo (replace with your own)

### `/products` - Product-Specific Workspaces
Product workspaces. Each product has its own directory with strategy, features, backlog, and research:
- `strategy/` - Vision, mission, roadmap, OKRs
- `features/` - Active features being developed
- `product-ideas-backlogs/` - Product backlog tracking with `active-backlog.md`, `completed-backlog.md`, and `backlog-dashboard.html`
- `data-analysis/` - Platform exports, insights, queries
- `research/` - User research, competitive analysis
- `documentation/` - Product documentation and reference PDFs

**To add your own product**: Create a new directory under `products/` following this same structure and add a product-specific `CLAUDE.md`.

### `/resources` - Research Materials
Research artifacts and reference materials.

### `/skills` - Specialized PM Task Modules
Structured approaches to common PM tasks with examples:
- `doc-refiner/` - Document refinement workflow
- `epic-creator/` - Epic creation workflow
- `story-creator/` - User story creation workflow
- `meeting-prep/` - Meeting preparation workflow (`SKILL.md` + `meeting-prep.skill`)
- `team-message/` - Convert rough thoughts into clear, professional team messages
- `image-to-spec/` - Convert screenshots or images into structured markdown feature specs
- Each skill has a SKILL.md explaining purpose, usage, and best practices

### `/persona-drip` - Daily Persona Immersion
Daily B2B persona immersion scenarios for empathy building.
- `drip-log.md` -- Tracks all generated drips (date, scenario, category, segment)
- `drips/` -- Individual drip files (`YYYY-MM-DD-drip-NNN.md`)
- Generated by `persona-drip` custom agent, runs weekdays at 11 AM
- Default persona: configurable (e.g., CSM, PM, Sales Engineer); 6 categories rotated, 4 segments rotated

### `/stakeholders` - Stakeholder Management
Stakeholder mapping and communication planning.
- `stakeholder-map.md` - Key stakeholders and their interests

### `/styles` - Writing Style Guides
Communication guidelines for different contexts:
- `executive-email.md` - Executive email style guide (pyramid structure, subject line conventions, pre-send checklist)
- Always follow style guides when drafting communications

## Key Workflows

### Daily Workflow
1. Check active tasks in `action-tracker/active-tasks.md`
2. Check product-specific todos and priorities in `products/[product-name]/`
3. Update relevant feature documentation as work progresses
4. Log insights and decisions in appropriate locations
5. End of day: Update tasks and plan tomorrow

### Weekly Workflow
1. Review and add points to `growth-and-syncs/weekly-sync-log/<person-slug>/active-points.md` before weekly syncs (each person has their own subdirectory)
2. After sync: mark discussed points -> move to `discussed-points.md` with outcomes
3. Review leadership frameworks in `growth-and-syncs/framework-and-mindset/`
4. Update product roadmaps and OKRs in `products/[product-name]/strategy/`
5. Plan next week's focus areas and priorities

## Common Tasks & Commands

**Finding relevant style guide:**
```bash
# Search for communication guidance
grep -i "email" styles/*.md

# List all available styles
ls -1 styles/*.md
```

**Managing tasks:**
```bash
# Find overdue or blocked items
grep -i "blocked\|overdue\|urgent" action-tracker/active-tasks.md

# Move completed items
# When task is Done -> move from active-tasks.md to completed-tasks.md with today's date
```

**Working with product data:**
```bash
# Search for specific analysis
grep -r "churn\|retention" products/*/data-analysis/
```

## Communication Style Guidelines

When drafting executive communications, follow `/styles/executive-email.md`:

**Core Principles**: Lead with the headline, be concise, be action-oriented, respect their time

**Structure** (Pyramid):
- Start with the ask/headline in the first sentence
- Key points in 3-5 bullets
- Context only if essential
- Clear next steps and timing

## AI Agent Operating Guidelines

When acting as the PM Assistant agent:

1. **Task Management**: Track items in `action-tracker/`, flag overdue items, suggest updates
2. **Documentation**: Draft updates using appropriate styles from `/styles`
3. **Product Management**: Help maintain strategy docs, feature documentation, and release planning
4. **Proactive Behaviors**: Flag overdue action items, suggest documentation improvements, identify patterns

## Decision Guide: What to Use When

**"I need to write an email to leadership"**
-> Use: `styles/executive-email.md`

**"I need to track manager feedback"**
-> Use: `growth-and-syncs/weekly-sync-log/` for sync points, `growth-and-syncs/framework-and-mindset/` for frameworks, `action-tracker/active-tasks.md` for tasks

**"I need to document a new feature"**
-> Create: Feature directory in `products/[product]/features/[feature-name]/`

**"I need to prepare for 1-on-1 / weekly sync"**
-> Review: `growth-and-syncs/weekly-sync-log/active-points.md` + `action-tracker/active-tasks.md` + `growth-and-syncs/framework-and-mindset/`

**"I need to communicate to executives"**
-> Use: `styles/executive-email.md` for format, bottom-line-first approach

**"I need to reference Claude Code tool documentation"**
-> Check: `claude-code-reference/` for MCP guides and tool references

**"I need to manage the product backlog"**
-> Use: `products/[product-name]/product-ideas-backlogs/active-backlog.md`

**"I need to write a team message"**
-> Use: `skills/team-message/` for the skill

**"I want to understand my persona's daily reality"**
-> Use: `persona-drip/` for daily drips, or invoke the persona-drip agent directly

## File Organization Conventions

**Naming Standards:**
- **Dates**: Always YYYY-MM-DD format
- **Documents**: descriptive-name-with-hyphens.md
- **Data files**: YYYY-MM-DD_description_segment.csv

**Where to Create New Files:**
- **Product strategy**: `products/[product]/strategy/`
- **Feature docs**: `products/[product]/features/[feature-name]/`
- **Research**: `products/[product]/research/[type]/`
- **Data analysis**: `products/[product]/data-analysis/`
- **Claude Code references**: `claude-code-reference/[tool-name]/`
- **Team messages**: via `skills/team-message/`
- **Meeting notes**: relevant product directory or feature working folder

**When to Update vs. Create:**
- **Update existing** if: Adding to ongoing work, correcting information, appending to logs
- **Create new** if: New initiative, different time period, distinct topic area

## Important Notes

- This workspace uses **markdown files** for documentation and **HTML files** for interactive dashboards - no build process required (dashboards served via `action-tracker/server.js`)
- All dates follow **YYYY-MM-DD** format
- The `.env` file contains environment-specific settings
- Always maintain the organizational structure - don't create files in wrong locations

## When Assisting

1. **Understand Context**: Reference product-specific CLAUDE.md and strategy docs first
2. **Follow Styles**: Apply guidelines from `/styles` based on audience
4. **Maintain Structure**: Keep files organized in their proper directories
5. **Log Systematically**: Update action items, growth tracker, and data exports consistently
6. **Be Action-Oriented**: Every communication should have clear next steps
7. **Stay Organized**: Track work through manager guidance and product-specific documentation
