Run a Claude Code best practices audit using the claude-code-coach agent. Audit my workflow and surface the top improvements I should make.

Focus area (optional): $ARGUMENTS

Steps:
1. Launch the `claude-code-coach` agent with this task: "Run a full Claude Code workflow audit. Read the activity log at `pm-workspace/action-tracker/claude-code-activity-log.md`, the memory index at `~/.claude/projects/*/memory/MEMORY.md`, existing commands in `.claude/commands/`, and skills in `pm-workspace/skills/CLAUDE.md`. Score all 8 pillars, then return the audit report in the full output format defined in your instructions. If a focus area was specified ($ARGUMENTS), weight that pillar more heavily in your assessment."
2. Present the audit report to the user
3. Ask: "Want me to implement any of these improvements now?"
