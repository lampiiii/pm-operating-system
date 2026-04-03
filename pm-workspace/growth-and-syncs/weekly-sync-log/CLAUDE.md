# Weekly Sync Log

Multi-person 1:1 check-in tracking system. Each person has their own subdirectory with separate active and discussed point files.

## Structure

- `people.json` — Registry of all 1:1 relationships (slug, name, role, color). Add new people here first.
- `sync-hub.html` — Hub landing page showing all people as cards (served at `/sync`).
- `weekly-sync-dashboard.html` — Per-person sync dashboard (served at `/sync?person=<slug>`). Uses shared navbar and form-view.css.
- `<person-slug>/active-points.md` — Points queued for that person's next sync.
- `<person-slug>/discussed-points.md` — Append-only archive of discussed points with outcomes.

## Example People

`your-manager/`, `stakeholder-a/` — Replace these with your actual 1:1 relationships.

## Workflow

1. Add points to `<person-slug>/active-points.md` anytime (fields: Topic, Category, Context, Added On, Status).
2. Categories: Work Item, Issue, Feedback, Career Growth, Decision, FYI.
3. Statuses: To Discuss, Ready to Discuss, Discussed.
4. When "Discussed" — remove from `active-points.md`, append to `discussed-points.md` with sync date and outcome.
5. Renumber remaining points in `active-points.md` after removal.
6. Never delete entries from `discussed-points.md`.

## Rules

- To add a new person: add entry to `people.json`, then create `<slug>/active-points.md` and `<slug>/discussed-points.md`.
- Do not modify the HTML dashboards without explicit request.
- See parent `../CLAUDE.md` for full workflow details.
