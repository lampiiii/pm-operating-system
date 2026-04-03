# CLAUDE.md — Action Tracker

## What This Is

Node HTTP server + task management system. Zero external dependencies (uses only Node built-ins).

## Files

- `server.js` — HTTP server on port 3000. Serves all workspace HTML pages and exposes REST APIs.
- `active-tasks.md` — Current tasks in markdown table format (8 columns: #, Task, Due Date, Priority, Status, Feature, Visibility, Notes). Visibility values: `Active` (default) / `Someday` (hidden by default)
- `completed-tasks.md` — Archived tasks with completion dates
- `action-tracker-dashboard.html` — Interactive dashboard UI with SSE live updates. Uses shared navbar (`/resources/navbar.js`) and form layout (`/resources/form-view.css`). Top navbar for navigation (no sidebar). Task detail modal uses horizontal form-view layout (label-left, field-right, with dividers). Features: Visibility toggle (Active/Someday/All), Feature tags displayed under task names, Feature filter pills, Group By Feature option.
- `claude-code-activity-log.md` — Auto-logged Claude Code session activity for pattern review (hooks/skills/agents opportunities)

## Starting the Server

```bash
node server.js
# http://localhost:3000
```

## Server Routes

**Pages**: `/` and `/tracker` (Action Tracker), `/home` (Homepage), `/playbook`, `/sync` (1:1 hub or `?person=<slug>` for per-person dashboard), `/backlog`, `/workspace`, `/docs`

**APIs**: Task CRUD at `/api/tasks`, sync people at `/api/sync-people`, sync points at `/api/sync-points?person=<slug>` (or without `?person` for aggregate), backlog items at `/api/backlogs`, persona drips at `/api/drips`. SSE endpoint at `/api/events` for live file-change updates. Activity log at `/api/activity-log`. File operations at `/api/files/tree`, `/api/files/read`, `/api/files/search`, `/api/files/backlinks`, `/api/files/write`. AI extraction endpoints at `/api/extract-points`, `/api/extract-tasks`, `/api/extract-backlogs`.

**Static files**: Serves static files (.js, .css, .jpg, .webp) from the `velyo/resources/` directory at `/resources/`. Mime types: `.js` (application/javascript), `.css` (text/css), `.webp` (image/webp), plus PDF and image types. `.js`/`.css` files served inline (no attachment header).

## Task Workflow

1. Tasks live in `active-tasks.md` as pipe-delimited markdown table rows
2. Priority uses LNO framework: **L** (Leverage), **N** (Neutral), **O** (Overhead)
3. Status values: `Not Started` / `In Progress` / `Blocked` / `Done`
4. When marked **Done** → remove from `active-tasks.md`, append to `completed-tasks.md` with today's date
5. Renumber remaining tasks after removal

## Environment

Reads `../.env` for environment variables (re-reads on each API call, no restart needed).

## Key Implementation Details

- File watcher on `active-tasks.md` broadcasts SSE events on disk changes
- `parseTasks()` reads markdown table rows; `generateMarkdown()` writes them back
- `suppressWatch` flag prevents watcher from firing during server-initiated writes
