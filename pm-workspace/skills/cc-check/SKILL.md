---
name: cc-check
description: Audit your Claude Code workflow and get prioritized best practices coaching. Use when you want to know how well you're using Claude Code, get improvement nudges, or do a periodic workflow check-in. Triggers on "/cc-check", "audit my Claude Code workflow", "how am I using Claude Code", "coach me on Claude Code".
---

# Claude Code Workflow Check

Run a structured audit of how you're using Claude Code and surface the top improvements you should make.

## What This Does

Invokes the `claude-code-coach` agent, which:
1. Reads your recent activity log, memory, skills, and commands
2. Scores your workflow across 8 best practices pillars
3. Returns a prioritized list of specific, actionable improvements

## The 8 Pillars

| Pillar | The question it answers |
|--------|------------------------|
| Plan Mode | Do you research before you act? |
| Task Tracking | Do you break work into tracked steps? |
| Memory Hygiene | Are corrections being saved so you don't repeat them? |
| CLAUDE.md Usage | Are recurring instructions codified, not repeated verbally? |
| Skills & Commands | Are repeatable workflows automated? |
| Agent Delegation | Are you using agents for parallel/specialized work? |
| Prompt Quality | Are your requests specific and scoped? |
| Context Management | Is your conversation context lean and intentional? |

## When to Run

- **Weekly** — quick check on whether habits are improving
- **Before a complex task** — make sure you're set up to work well
- **After a frustrating session** — diagnose what went wrong
- **When onboarding new workflows** — make sure you're using them right

## Usage

```
/cc-check
```

No arguments needed. The agent reads your workspace context automatically.

To focus on a specific pillar:
```
/cc-check memory
/cc-check prompt quality
/cc-check agents
```
