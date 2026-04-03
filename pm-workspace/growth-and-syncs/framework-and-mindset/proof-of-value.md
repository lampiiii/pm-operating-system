# Proof of Value

## TL;DR

This is a living document that captures proof of **Strategic Apex** skills — the hard-to-replicate PM capabilities that agents cannot replace. Proof is organized into 10 skill areas matching the [Proof of Value portfolio](/proof-of-value), drawing from two sources: the **PM Operating System** (workspace architecture) and **Product Work** (feature design decisions on the CSM platform). Each entry is a concrete demonstration of judgment, governance, architecture design, or system-level thinking.

---

## Why This Matters

The AI PM Strategic Playbook identifies a split: PMs either stay at the **Task Execution** layer (writing tickets, managing backlogs — increasingly automatable) or move to the **Strategic Apex** (vision, governance, system design — irreplaceable).

This document collects proof across every skill area the playbook identifies as irreplaceable. It's not a portfolio — it's an evidence log.

---

## 1. Platform Thinking

Designing products and systems that work across platforms, personas, and tools — not just within one silo.

### PM Operating System

A markdown-based workspace orchestrated through Claude Code, serving 7+ interactive dashboards from a zero-dependency Node.js server. Not a toy project — this is my actual daily operating system for managing products, tasks, syncs, and strategy.

**Architecture decisions that demonstrate platform thinking:**

| Decision | Why It Matters |
|----------|---------------|
| Zero npm dependencies for the server | Reduces attack surface, eliminates supply chain risk, proves you can build production-grade infra with fundamentals |
| SSE (Server-Sent Events) for live updates | Real-time data flow between markdown files and dashboards without WebSocket complexity |
| Markdown as the data layer | Human-readable, version-controlled, AI-parseable — works across every tool in the ecosystem |
| File watchers triggering dashboard refreshes | Event-driven architecture at the OS level, not polling |
| Shared design system across 7+ HTML pages | Consistent UX without a framework — CSS custom properties as the API contract |

**MCP Integrations — Cross-System Orchestration:**

| Integration | What It Enables |
|-------------|----------------|
| **Figma Console MCP** | 56+ tools for full read-write Figma access — design token extraction, component instantiation, screenshots, plugin debugging. Enables design-to-code workflows without leaving the terminal. |
| **Google Workspace MCP** | Gmail, Docs, Sheets, Slides, Calendar, Drive, Forms — 100+ tools. Enables document creation, email drafting, and calendar management from within Claude Code. |
| **Anthropic Plugin Marketplace** | 10+ plugins including PDF/DOCX/PPTX generation, frontend design, skill creation — extending Claude Code's native capabilities. |

These aren't standalone tools. They form a connected system where a single Claude Code session can read a Figma design, generate a feature spec in Google Docs, create tasks in the action tracker, and update the portfolio — all through orchestrated MCP connections.

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| 2026-03-18 | Executive Briefing | Designed the account-level briefing for **all personas** visiting Account 360 (CSMs, account executives, salespersons, support engineers, technical engineers, CS leaders) — not just CSMs. The briefing is scoped to the account, not the viewer. This is platform thinking: designing for the broader ecosystem rather than a single persona. | Multi-persona ecosystem design |
| 2026-03-18 | Executive Briefing | Designed the briefing content structure with 7 prioritized categories (Risks → Declining Metrics → Opportunities → Team Activity Changes → Upcoming Changes → Market Changes → What This Means). The final category — "What This Means" — is an AI-synthesized "so what" that connects dots across all others. Combined into a single view after UX research validated that separate tabs added friction. | Progressive disclosure / layered information architecture |
| 2026-03-27 | PM Operating System | Homepage evolved from static page to **composable dashboard** — Focus Today (tasks API), Activity Feed (activity log API), Deadline Strip (tasks API), Sync Nudge (sync points API), and now Persona Drip (new drips API). Each section is an independent data source rendered into a unified daily cockpit. The pattern is: markdown files → server API → homepage JS fetch → rendered section. Adding a new section requires only: API endpoint + HTML section + JS loader. | Composable dashboard architecture / API-driven content feeds |
| 2026-03-19 | PM Operating System | Built `/refresh-portfolio` skill that scans 10+ source files (resume, features, skills, agents, CLAUDE.md files, memory, MCP configs, directory tree) and diffs them against 3 portfolio HTML pages, updating only what changed. Treats source files as truth and portfolio as derived views — the same pattern as a data pipeline feeding a dashboard. | Source-of-truth architecture / derived view pattern |
| 2026-03-23 | Executive Briefing | Designed a 36-trigger taxonomy across three pillars (Sales/Support/Success) + prompt-driven social intelligence, with every trigger mapped to UX categories. Triggers span two fundamentally different mechanisms: **data-driven** (threshold-based, from internal [your platform] data) and **prompt-driven** (discovery-based, AI web search for external signals). Same taxonomy reused at both account and engagement levels with scoping rules for what applies where. | Cross-pillar trigger architecture / reusable taxonomy design |
| 2026-03-27 | PM Operating System | Executed a **unified design system migration** across 7 HTML pages, 1 shared navbar component, and 1 shared CSS file — all in a single session. The design system is built on CSS custom properties as the API contract between the shared navbar/form-view and each page. Changing the theme required updating variables in each page's `:root` and `[data-theme="dark"]` blocks, and the entire UI chain (navbar, search overlay, cards, forms, modals) inherits automatically. This is the same pattern as a design token system in Figma — centralized decisions, distributed rendering. Orchestrated 5 parallel agents to update dashboards simultaneously. | Design system architecture / CSS-variable-as-API-contract pattern |
| 2026-03-31 | PM Operating System | Converted the single-person weekly sync tracker into a **multi-entity hub** — the same architectural pattern used in SaaS multi-tenancy. A `people.json` registry acts as the entity catalog, `syncFilesFor(slug)` dynamically resolves file paths per entity, all 5 API endpoints accept a `?person=` parameter, and the same dashboard HTML serves any entity by reading the slug from the URL. Adding a new person requires zero code changes — just a JSON entry and a directory. The aggregate API (`GET /api/sync-points` without `?person`) returns cross-entity totals for the homepage nudge. This is the registry + resolver + parameterized-consumer pattern — the same approach used to scale any single-tenant system to multi-tenant. | Single-entity → multi-entity architecture / registry pattern |

---

## 2. Agent Governance

Defining guardrails, decision boundaries, and automated enforcement — the skill that separates senior PMs from task managers.

### PM Operating System

**The Hooks System: Deterministic Governance**

The most direct proof of governance thinking. Instead of relying on AI memory (probabilistic, lossy during compaction), I built deterministic automation that fires at key lifecycle events.

| Before (Memory-Based) | After (Hook-Based) |
|------------------------|---------------------|
| "Remember to update packages.md after installs" | Hook fires automatically on every `npm install` / `pip install` |
| "Don't edit .env files" | PreToolUse hook blocks the edit with an error, every time |
| "Run Tailwind build after HTML changes" | PostToolUse hook compiles CSS automatically |
| "Validate markdown tables" | PostToolUse hook checks column consistency, blocks malformed edits |
| "Check server.js syntax after edits" | PostToolUse hook runs `node --check` immediately |
| "Re-inject context after compaction" | SessionStart hook restores all critical rules deterministically |
| "Notify me when Claude needs input" | Notification hook sends macOS alert with sound |

**The Seven Hooks:**

| # | Hook | Event | What It Does |
|---|------|-------|-------------|
| 1 | Desktop Notifications | Notification | macOS native alert + Glass sound when Claude needs input |
| 2 | Secret File Protection | PreToolUse | Hard block on .env file edits — prevents API key exposure |
| 3 | Auto-Rebuild Tailwind | PostToolUse | Compiles CSS after any HTML/CSS edit |
| 4 | Markdown Table Validator | PostToolUse | Checks column consistency in task/sync/backlog files |
| 5 | Server Syntax Check | PostToolUse | Runs `node --check` on server.js after edits |
| 6 | Package Install Reminder | PostToolUse | Deterministic reminder to update installed-packages.md |
| 7 | Context Re-Injection | SessionStart | Restores LNO framework, task lifecycle, date formats, career growth rules after compaction |

**The CLAUDE.md Context System — Multi-Layered Governance:**

24 CLAUDE.md files create a hierarchical instruction system:

```
Root (repo conventions, server config, git rules)
  └── Workspace (daily/weekly workflows, data analysis, communication styles)
        ├── Action Tracker (LNO framework, task lifecycle, API routes)
        ├── Manager Guidance (sync workflows, strategic playbook reference)
        ├── Products (CSM product structure, feature pipeline)
        │     ├── AI Insights (data model changes, PA indicators, guardrails)
        │     ├── Meeting Creation V2 (3 entry points, "propose don't ask" principle)
        │     ├── AI Web Agents (45+ use cases, Edge Agent model)
        │     ├── Priority Plays Recommendation (health scores, risk, renewal)
        │     └── Executive Briefing (account & engagement scoping)
        ├── Portfolio (design system, page descriptions)
        ├── Skills (module descriptions, execution guidelines)
        ├── [App-Specific] (app-specific design system, quality bar)
        └── ... (resources, styles, stakeholders, claude-code-reference)
```

This is organizational design for AI. Each CLAUDE.md scopes Claude's knowledge and behavior to the right context — like defining team charters and domain boundaries, but for an AI agent system.

**Voice-to-Data API Governance:**

| Decision | Why It Matters |
|----------|---------------|
| Switched voice extraction from Sonnet to Haiku | Right-sizing: extraction is a structured task, not a reasoning task — Haiku is 10x cheaper, faster, and less prone to overload. This is the same SKU-tier judgment PMs make when choosing which AI model powers a feature. |
| Added 3x retry with exponential backoff on 529 | Resilience pattern: API overload is inevitable at scale. Instead of failing on first attempt, the system degrades gracefully — retries silently, only surfaces the error after exhausting attempts. |
| Increased max_tokens from 1024 to 4096 | Capacity planning: users dictating 10+ items in one session need room. Under-provisioning tokens silently truncates output — a subtle failure mode that's hard to debug from the user's perspective. |

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| 2026-03-30 | Executive Briefing | Discovered through iteration that [your platform] rich text fields silently drop markdown formatting — acceptance criteria pushed as plain text rendered as a wall of unstyled text. Diagnosed the root cause (HTML required with inline styles), iterated through 4 formatting rounds (plain text → HTML → font sizing → unbold + underline), then **codified the formatting rules into the epic-creator skill** so every future epic auto-formats correctly on first push. This is governance: turning a discovered failure mode into a permanent system rule. | Failure mode discovery → skill codification |

---

## 3. Pricing Strategy

AI compute costs, SKU tradeoffs, margin compression — the commercial judgment that determines whether AI features create value or burn money.

### PM Operating System

| Date | Proof | Skill Demonstrated |
|------|-------|-------------------|
| | *(No entries yet)* | |

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| | | *(No entries yet)* | |

---

## 4. Domain Expertise

Deep CSM domain knowledge encoded into systems, not just tribal knowledge.

### PM Operating System

The Competitive Strategic Lens agent and PRD Edge Case Analyzer both encode CSM-specific domain knowledge (health scores, CXOR risk records, engagement models, renewal workflows) as reusable, queryable systems.

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| 2026-03-23 | Executive Briefing | Defined 12 Success triggers with precise conditions drawn from CSM domain knowledge — e.g., Red Zone Entry (`health_score < 40 AND 21_ago >= 40`), High Value Engagement Gap (`contract_value > $500K AND days_since_last_touchpoint > 21`), Value Realization at Risk (`realised_rate <= 30% AND planned_stop within 90d`). These encode domain-specific thresholds that only someone who understands the CSM operational model would define correctly. | CSM domain-specific trigger design |
| 2026-03-23 | Executive Briefing | Designed 13 Sales triggers covering the full commercial lifecycle: opportunity stage changes, renewal/cross-sell won and lost, opportunity owner handoffs, quote generation, renewal approaching windows. Each maps to UX categories that surface the right signal to the right narrative section. | Sales lifecycle signal modeling |
| 2026-03-30 | Executive Briefing | Defined 6 compound signal cluster themes (Health Degradation, Support Crisis, Leadership Transition, Revenue Risk, Growth Momentum, Competitive Threat) with specific trigger membership rules and activation thresholds. Each cluster encodes domain knowledge about which triggers genuinely compound vs. coincidentally co-occur — e.g., C2+C4+C5+C8 = real health degradation, but C11+C9 = unrelated events in the same window. | CSM domain-encoded signal clustering |
| 2026-03-27 | Persona Drip System | Each drip encodes deep CSM domain knowledge — e.g., Drip #2 depicts a CSM discovering stale Snowflake sync data breaking Gainsight health scores before a $1.4M QBR, navigating Jira triage that doesn't account for "revenue at risk," and manually reverse-engineering a health score from 4 tools. The invisible friction reveals product gaps (staleness signals, cross-functional urgency fields) that only someone embedded in the CSM workflow would identify. | CSM operational reality encoding — pain points as product signal |

---

## 5. Outcome Stories

Measurable customer and business outcomes over feature launches — proving impact, not output.

### PM Operating System

| Date | Proof | Skill Demonstrated |
|------|-------|-------------------|
| | *(No entries yet)* | |

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| | | *(No entries yet)* | |

---

## 6. Stakeholder Management

Influence without authority, executive alignment, cross-functional leadership.

### PM Operating System

| Date | Proof | Skill Demonstrated |
|------|-------|-------------------|
| | *(No entries yet)* | |

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| | | *(No entries yet)* | |

---

## 7. Design Thinking

Empathy-driven decisions, user research, observation over assumption.

### PM Operating System

| Date | Proof | Skill Demonstrated |
|------|-------|-------------------|
| 2026-03-23 | Revamped the workspace homepage using the `/design-thinker` skill — ran structured empathy questions before writing any code. Discovered: user always starts at homepage then navigates elsewhere; needs a "what should I focus on today?" view, not a marketing page; feature grids and vision timelines are for audiences that don't exist (this is a single-player tool). Replaced the entire marketing-style page with a personal cockpit: dynamic greeting, product-agnostic hero, and a 4-card launchpad. | Empathy-first design process — interrogating the problem before building |
| 2026-03-27 | Built a **Persona Drip** system — daily B2B persona immersion scenarios that force the PM to inhabit a CSM's workday. Each drip follows a structured format: vivid play-by-play (naming specific tools, Slack messages, emotions), invisible friction points the persona wouldn't articulate in an interview, and a PM takeaway. Rotates across 6 categories and 4 segments. This is design thinking operationalized as a daily habit, not a workshop exercise. | Systematic empathy building — daily persona immersion as a forcing function for user understanding |

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| | | *(No entries yet)* | |

---

## 8. Ethical AI

Trust, bias mitigation, transparency, responsible deployment.

### PM Operating System

| Date | Proof | Skill Demonstrated |
|------|-------|-------------------|
| | *(No entries yet)* | |

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| | | *(No entries yet)* | |

---

## 9. Navigating Ambiguity

Judgment calls with incomplete data, structured decision-making under uncertainty.

### PM Operating System

| Date | Proof | Skill Demonstrated |
|------|-------|-------------------|
| | *(No entries yet)* | |

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| 2026-03-23 | Executive Briefing | Designed prompt-driven triggers — a fundamentally different trigger mechanism where the AI web-searches for external signals (exec changes, M&A, layoffs, funding, tech investments) with no internal data to validate against. Defined what to search for, how to filter relevance, and how to surface findings — all under uncertainty. Prioritized 5 from 10 candidates based on cross-pillar impact assessment. | Structured decision-making with external, unstructured data |
| 2026-03-30 | Executive Briefing | Designed hybrid prioritization framework with explicit **data separation principle**: rule-based scoring (Stages 1–3) uses only activity tracking table fields, business context (ARR, renewal, health) enters only at the LLM stage (Stage 4). Initial design baked business context multipliers into rule scoring; challenged this on data coupling grounds — activity records don't carry account-level attributes. Redesigned with a clean hybrid handoff line separating deterministic rules from contextual LLM judgment. | Architecture redesign driven by data lineage analysis — separating intrinsic vs. extrinsic signals across system boundaries |

---

## 10. Reusable Architecture

Building templated, composable systems that scale across features and products — not one-off solutions.

### PM Operating System

**Custom Agents:**

| Agent | Purpose | Why It Matters |
|-------|---------|---------------|
| **Competitive Strategic Lens** | Analyze any CSM feature against the competitive landscape. 7-step analysis covering feature comparison (vs. Gainsight, Totango, ChurnZero, Planhat, Vitally, Salesforce), differentiation classification, moat assessment, AI disruption threats, and sustainable advantage scoring. | Encodes competitive intelligence as a reusable, queryable system — not tribal knowledge locked in someone's head |
| **PRD Edge Case Analyzer** | Systematic risk analysis across 10 dimensions before engineering handoff. User/Actor edge cases, Data/Input, State/Flow, Integration risks, Security/Privacy, Performance, Compliance, UX, Operations, and a mandatory CSM Impact Assessment. | Reduces defect escape rate and demonstrates governance thinking — defining what to check, not just checking |

**Custom Skills:**

| Skill | What It Does | Strategic Skill Demonstrated |
|-------|-------------|------------------------------|
| `/epic-creator` | Generates structured epics with AC, personas, outcomes, telemetry | Domain expertise (CSM-specific structure) |
| `/story-creator` | Creates user stories with constrained descriptions and AC | Reusable architecture (templated, consistent) |
| `/meeting-prep` | Produces prioritized agendas from free-form input | Stakeholder management (structured prep) |
| `/doc-refiner` | Refines unstructured markdown in a single pass | System-level thinking (information architecture) |
| `/design-thinker` | Asks empathy-driven questions before building | Design thinking (the moat skill) |
| `/figma-console` | Connects to Figma for design-to-code workflows | Platform thinking (cross-tool integration) |
| `persona-drip` agent | Generates daily B2B persona immersion scenarios with category/segment rotation, drip log tracking, and file-per-drip output | Domain expertise + design thinking (systematic empathy) |

**Persistent Memory — Cross-Session Intelligence:**

| Memory | What It Governs |
|--------|----------------|
| **Session Start Reminder** | Always pull latest code before work |
| **Action Tracker Workflow** | LNO priority assignment, task lifecycle rules |
| **Weekly Sync Log** | Discussion point lifecycle, category/status conventions |
| **UI Quality Bar** | Design quality standards from direct user feedback (rated 1/100) |
| **Proactive Career Growth** | MANDATORY cross-reference of every task against the Strategic Playbook |

**Dashboard Standardization:** Consistent UX patterns (sort, headers, dark mode) across 7+ pages.

### Product Work

| Date | Feature | Proof | Skill Demonstrated |
|------|---------|-------|-------------------|
| 2026-03-18 | Executive Briefing | Separated the briefing (informational — "what happened") from recommendations (actionable — "what to do") into two independent capabilities. The briefing uses a Now Assist Skill for synthesis; recommendations will live in a separate experience (Priority Plays / Next Best Action). Each capability stands alone and can evolve independently. | Modular capability separation |

---

## Connecting to the Strategic Apex

Every component maps to a skill the AI PM Strategic Playbook identifies as irreplaceable:

| Component | Playbook Skill | How It Demonstrates the Skill |
|-----------|---------------|-------------------------------|
| Hooks system | **Agent Governance** | Defined guardrails, decision boundaries, automated enforcement |
| Custom agents | **Domain Expertise** | Encoded competitive intelligence and risk analysis as reusable systems |
| CLAUDE.md hierarchy | **Agent Governance** | Scoped AI behavior across 23 contexts — team charters for agents |
| MCP integrations | **Platform Thinking** | Cross-system orchestration (Figma + Google + Terminal) |
| Skills | **Reusable Architecture** | Templated workflows that scale across features and products |
| Memory + Growth nudge | **Navigating Ambiguity** | Every session ties work to measurable career outcomes |
| Dashboard standardization | **Reusable Architecture** | Consistent UX patterns (sort, headers, dark mode) across 7+ pages |
| Markdown as data layer | **Platform Thinking** | Human-readable, version-controlled, AI-parseable — universal data format |
| Executive Briefing design | **Platform Thinking** | Single combined view layering raw signals → AI synthesis → standing context |
| Executive Briefing triggers | **Domain Expertise** | 36-trigger taxonomy encoding CSM, Sales, and Support domain knowledge as precise conditions |
| Prompt-driven triggers | **Navigating Ambiguity** | Discovery-based external intelligence using AI web search — structured decision-making with unstructured data |
| Persona Drip system | **Design Thinking** + **Domain Expertise** | Daily empathy immersion that encodes CSM operational reality and surfaces invisible friction as product signal |
| Homepage composable dashboard | **Platform Thinking** | 5 independent data feeds (tasks, activity, deadlines, sync, drips) unified into one API-driven daily cockpit |
| Action Tracker Visibility system | **Agent Governance** | Active/Someday separation — governance over task attention, not just priority. Default-hidden Someday prevents cognitive overload while preserving the backlog. |

---

## The Compound Effect

None of these components exist in isolation. The power is in how they compose:

1. **A task gets added** → Action tracker dashboard updates in real-time via SSE → LNO priority assigned via memory rules → Career growth nudge connects it to the playbook
2. **A feature spec gets written** → PRD Edge Case Analyzer reviews it → Competitive Strategic Lens evaluates market positioning → Epic creator generates the formal epic
3. **Code gets edited** → Hooks validate syntax, rebuild CSS, check table integrity → Notifications alert if input needed → Context re-injection preserves workflow rules through long sessions
4. **A meeting gets scheduled** → Meeting prep skill generates the agenda → Sync dashboard tracks the discussion points → Discussed points archive with outcomes

This is **system-level thinking**: seeing the full pipeline, not just one step.

---

## What This Proves

To reference the playbook's daily decision framework:

- **Am I at Strategic Apex or Task Execution?** Building the system, not executing within it.
- **Am I deepening a moat skill?** Governance design, platform architecture, domain expertise encoding.
- **Am I creating proof of value?** This document itself is the proof — a PM building production-grade developer experience, competitive intelligence systems, and automated governance without engineering support.
- **Am I thinking at system level?** Every component is designed to compose with others, not exist in isolation.

---

## One-Line Summary

> A PM who can architect AI governance systems, design cross-platform integrations, encode domain expertise as reusable agents, and build deterministic automation replacing probabilistic memory — is operating at the Strategic Apex that agents cannot reach.

---

*Template -- customize with your own proof entries. Fill in dates, features, and skill demonstrations from your own work.*
