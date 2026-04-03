Update the activity log at pm-workspace/action-tracker/claude-code-activity-log.md with entries from this session, and optionally update the proof-of-value document if relevant skills were demonstrated.

Do not ask clarifying questions. Scan the conversation and generate entries.

## Step 1 — Read current state
- Read `pm-workspace/action-tracker/claude-code-activity-log.md` to see the last entry date and existing entries (avoid duplicates)
- Read `pm-workspace/manager-guidance/framework-and-mindset/proof-of-value.md` to understand the 10 skill categories and what's already documented

## Step 2 — Scan this conversation
Review everything done in this session. For each distinct piece of work, capture:
- **Date**: Today's date (YYYY-MM-DD)
- **What I Did**: One-line summary of the action — be specific (file names, counts, what changed). Start with a verb.
- **Claude Code Feature Used**: Which tools/features were used (e.g., Edit, Write, Bash, Agent, Skill, Read, Grep, Direct output)
- **Automation Opportunity**: One of:
  - `None — one-time [reason]` for non-repeatable work
  - `Skill — [description]` if this pattern could become a reusable skill
  - `Already automated via [hook/skill/memory]` if it's already handled
  - `Pattern — [insight]` for general workflow patterns worth noting

## Step 3 — Write activity log entries
- Append new rows to the markdown table in the activity log
- Each distinct action gets its own row — don't merge unrelated work
- Skip trivial actions (reading files for context, minor typo fixes)
- Use the same concise style as existing entries
- Do NOT duplicate entries that already exist in the log

## Step 4 — Assess proof-of-value relevance
Check if any work in this session demonstrates a Strategic Apex skill from the playbook's 10 categories:
1. Platform Thinking
2. Agent Supervision & Governance
3. Pricing Strategy & Commercial Acumen
4. Domain Expertise
5. Proof of Value & Stakeholder Persuasion
6. Vision Setting & Ambiguity Navigation
7. System-Level Thinking
8. Organizational Alignment
9. M-Shaped Orchestrator Skills
10. AI-Era Career Positioning

**Only update if the work is genuinely noteworthy** — not every session produces proof-of-value entries. Look for:
- Architecture decisions (not just code changes)
- Judgment calls that agents couldn't make
- Cross-system design, governance, or orchestration
- Novel patterns or frameworks applied

**Skip if**: the session was routine maintenance, bug fixes, styling tweaks, or incremental feature work.

## Step 5 — Update proof-of-value (only if relevant)
If relevant proof was found:
- Append entries to the appropriate skill section(s) in `pm-workspace/manager-guidance/framework-and-mindset/proof-of-value.md`
- Follow the existing format: brief description + why it matters
- Do NOT add filler — only concrete, specific demonstrations

If nothing qualifies, skip this step and note "No proof-of-value updates — session was [reason]" in the summary.

## Step 6 — Confirm
- Report how many activity log entries were added and the date range covered
- Report whether proof-of-value was updated, and if so, which skill categories
