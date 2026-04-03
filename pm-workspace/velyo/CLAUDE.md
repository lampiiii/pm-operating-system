# CLAUDE.md — PM OS Homepage

## What This Is

PM workspace homepage. Standalone HTML served by the action-tracker server.

## Files

- `pm-workspace-home.html` — Full-screen hero homepage (served at `/home`). Includes Persona Drip section (loads via `/api/drips`, shows latest drip with back/forward navigation, expandable play-by-play)
- `docs-viewer.html` — Browse, search, and edit workspace markdown files (served at `/docs`)
- `resources/` — Shared static assets:
  - `navbar.js` — Shared navigation bar injected into all dashboard pages and homepage (theme-aware, includes Cmd+K search, avatar, theme toggle)
  - `form-view.css` — Shared form layout used for record detail modals across Action Tracker, 1:1 Check-in, and Backlogs
  - `profile.jpg` — User avatar (replace with your own)

## Design System

All pages use a shared design system with a blue-to-indigo gradient palette:
- CSS custom properties (variables) for theming
- Light and dark mode toggle support
- Every page that includes `navbar.js` must define CSS custom variables for correct theming: `--surface`, `--border`, `--text`, `--text-muted`, `--blue`, etc.
- `pm-workspace-home.html` uses a distinct full-screen hero layout (no sidebar)

## Editing Guidelines

- Keep CSS variables consistent across all HTML files when changing theme colors
- Dark mode styles are toggled via a class or attribute; ensure both modes look correct
- Static assets are served from `resources/` via the server's static file handler
- No build step required — edit HTML directly
