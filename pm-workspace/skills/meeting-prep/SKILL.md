---
name: meeting-prep
description: Generate a concise meeting subject line and a structured, prioritized agenda from free-form input. Use when the user wants to schedule, plan, or prepare for a meeting — triggered by phrases like "schedule a meeting", "set up a meeting", "meeting about", "create a meeting for", "meeting prep", "meeting agenda", or any request that involves defining what a meeting should cover.
---

# Meeting Prep

Generate a meeting **Subject** and a structured **Agenda** from any free-form input the user provides about a meeting.

## Output Format

Always produce exactly two sections:

### 1. Subject

- A single line, **maximum 8 words**.
- Capture the core purpose of the meeting.
- Use title case.
- No trailing punctuation.

### 2. Agenda

- A numbered list of discussion items derived from the user's input.
- Each item has:
  - **Topic**: A clear, concise description of what will be discussed.
  - **Priority**: One of `High`, `Medium`, or `Low` — judged from the user's input based on urgency, importance, and emphasis.
- Order items by priority (High first, then Medium, then Low).
- Cover everything the user mentions — do not drop topics.
- If the user's input implies follow-ups, decisions, or action items, include those as agenda items too.

## Example

**User input**: "We need to meet about the delayed API integration with Salesforce — it's blocking the release. Also want to check on the QA timeline and briefly align on the demo script for next week's customer call."

**Output**:

**Subject:** Salesforce API Delay and Release Readiness

**Agenda:**

| # | Topic | Priority |
|---|-------|----------|
| 1 | Salesforce API integration delay — root cause, blockers, and resolution plan | High |
| 2 | Impact on release timeline and mitigation options | High |
| 3 | QA timeline review and status update | Medium |
| 4 | Demo script alignment for next week's customer call | Medium |
| 5 | Action items and owners for follow-up | Low |

## Guidelines

- Infer priority from signal words (e.g., "blocking", "urgent", "critical" → High; "briefly", "also", "quick check" → Low).
- When priority is ambiguous, default to Medium.
- Keep agenda items actionable — phrase them as discussion topics, not vague labels.
- If the user provides very little context, still produce a reasonable agenda and note any assumptions made.
