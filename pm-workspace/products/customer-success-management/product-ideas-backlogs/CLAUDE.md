# Product Ideas & Backlogs

Captures and tracks product ideas for your product. See parent `../CLAUDE.md` for full product context.

## Files

- `active-backlog.md` — Current ideas/backlog items (table format)
- `completed-backlog.md` — Shipped/completed items with completion date
- `backlog-dashboard.html` — Interactive visual dashboard (served via action-tracker server at `/backlog`)

## Conventions

- **Priority**: LNO framework — L (Leverage, go all-in), N (Neutral, 70% effort), O (Overhead, good enough)
- **Status values**: Not Started, In Progress, Blocked, Done
- When an item is Done: move row from `active-backlog.md` to `completed-backlog.md` with today's date
- Renumber remaining items after removal to keep sequence clean
- Dashboard reads from the markdown files — keep table format consistent
