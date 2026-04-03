# Growth & Syncs

Career growth frameworks, personal goals, and multi-person 1:1 check-in tracking.

## Directory Structure

### Root Files
- `my-goals.md` -- Personal goals and objectives

### `framework-and-mindset/`
- `ai-pm-strategic-playbook.md` -- Career positioning playbook for the Agentic AI era (Strategic Apex, M-shaped orchestrator model, moat skills, daily action framework)
- `roadmap-planning-guide.md` -- Three-horizon roadmap planning model, countdown timeline, product pipeline stages, pre-quarter checklist
- `proof-of-value.md` -- Proof of value framework and methodology
- `strategic-playbook-dashboard.html` -- Interactive dashboard for the strategic playbook; uses shared navbar (`/resources/navbar.js`)

### `weekly-sync-log/`
Multi-person 1:1 check-in hub. Each person has their own subdirectory with separate data files.
- `people.json` -- Registry of all 1:1 relationships (slug, name, role, color). Add new people here.
- `sync-hub.html` -- Hub landing page showing all people as cards (served at `/sync`)
- `weekly-sync-dashboard.html` -- Per-person sync dashboard (served at `/sync?person=<slug>`); uses shared navbar and form-view.css
- `<person-slug>/active-points.md` -- Points queued for that person's next sync
- `<person-slug>/discussed-points.md` -- Archive of discussed points with outcomes (append-only log)
- Example people: `your-manager/`, `stakeholder-a/` (customize with your own 1:1 relationships)

## Key Workflows

### Weekly Sync Log
1. Add discussion points to `weekly-sync-log/<person-slug>/active-points.md` anytime during the week
2. Each point needs: Topic, Category, Context/Details, Added On date, Status
3. **Categories**: Work Item, Issue, Feedback, Career Growth, Decision, FYI
4. **Statuses**: To Discuss, Ready to Discuss, Discussed
5. When marked "Discussed" -> remove from `active-points.md`, append to `discussed-points.md` with sync date and outcome
6. Renumber remaining points in `active-points.md` after removal
7. Never delete entries from `discussed-points.md`

### Strategic Playbook
- Cross-reference all tasks against this playbook to identify growth opportunities
- Key skill areas: pricing strategy, agent supervision, domain expertise, proof of value, platform thinking, stakeholder management

## UI Patterns
- Navigation is via the shared top navbar (`/resources/navbar.js`) -- no sidebar navigation
- Record detail modals use horizontal form-view layout (label-left, field-right, dividers via `/resources/form-view.css`) -- consistent with Action Tracker and Backlogs

## Rules
- All dates use YYYY-MM-DD format
- Never modify the HTML dashboards without explicit request
- The strategic playbook is the canonical reference for career growth nudges
