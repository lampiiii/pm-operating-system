# Spin Up

## Purpose
Offload a task to a dedicated sub-agent to preserve the main session's context window. Use this whenever a task is research-heavy, code-intensive, or exploratory — anything that would consume significant context if done inline.

## Slash Command
`/spin-up <task description>`

## When to Use
- Deep codebase exploration or search
- Multi-file code changes or refactors
- Research that requires many file reads or web searches
- Any task where the journey (intermediate results, dead ends) matters less than the final answer
- When the main session is already context-heavy and you want to keep it lean

## How It Works
1. User invokes `/spin-up` with a task description
2. Claude picks the right agent type and launches it with a self-contained prompt
3. Agent does all the work in its own context window
4. Claude returns a concise summary to the main session

## Design Principles
- **Zero questions** — launch immediately with reasonable assumptions
- **Self-contained prompts** — the agent gets everything it needs upfront
- **Concise summaries** — only the result matters, not the agent's journey
- **Chain when needed** — suggest another `/spin-up` for follow-up heavy lifting
