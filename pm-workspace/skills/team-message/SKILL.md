---
name: team-message
description: Convert rough, unstructured thoughts into clear, professional team messages. Use when the user wants to draft a message for their team, asks to "write a message", "send this to the team", "clean this up for Teams/Slack", "make this readable for the team", or provides rough notes and wants them turned into a polished team communication. Also trigger when the user says "team message", "format this for the team", or provides rambling context and wants a crisp message out of it.
---

# Team Message

Convert rough, unstructured input into a clear, conversational message ready to paste into Teams or Slack.

## Core Principles

1. **Zero questions, full execution** — Never ask clarifying questions. Read input, produce complete output immediately.
2. **Conversational, not corporate** — Write like a real person talking to a colleague. Not a template. Not a formal email.
3. **Respectful and straight to the point** — Be polite but don't waste words.
4. **Preserve every point** — Capture everything the user is saying. Do not drop topics or questions.

## Voice & Tone

The output should sound like a real person writing to a colleague — natural, respectful, and clear. Customize the voice patterns below to match your own communication style.

### Writing Style:

- **Greeting**: "Hey [Name]," — casual, warm, one line.
- **Opens with context immediately** — no preamble, no "I hope you're doing well." First line after greeting states the topic.
- **Short paragraphs** — 1-3 sentences each. Reads like chat messages, not an essay.
- **Bold for key terms and concepts** — bold the important nouns/phrases, NOT the questions themselves.
- **Questions are asked naturally** — inline, conversational. No "Question:" labels. Just ask directly.
- **Numbered points only when listing distinct issues/challenges** — not for every paragraph.
- **Natural transitions** — "As we've gone deeper into this...", "This brings me to...", "Given these constraints..."
- **Closings vary by context**:
  - Asking for input: "Looking forward to your thoughts."
  - Asking for guidance: "Would appreciate your guidance here. Thanks!"
  - Quick update/FYI: "Kindly check whenever you get time"
  - Short ask: "Let me know how you want to handle this"
- **NO markdown headers** (no ## or ###) in the message body. Uses bold text and numbered lists instead.
- **Data-driven** — includes specific numbers, technical details, API names when relevant.
- **When proposing an idea** — explains the problem and constraints first, then proposes the solution with reasoning, then asks for thoughts.

### What NOT to Do:

- No "Subject:" line in the message (these are chat messages, not emails)
- No "Question:" labels
- No formal section headings
- No "Hi team," (uses "Hey [Name]," when addressing someone specific, or just starts talking if it's a group)
- No bullet points for the main flow — uses paragraphs. Bullets only for listing specific items within a point.
- No filler ("just wanted to reach out", "I was wondering if", "hope this finds you well")

## Output Format

Produce the message body directly — ready to copy-paste into Teams/Slack.

**Message types and their patterns:**

### Quick Update (2-4 lines)
For FYIs, status updates, simple asks.
```
Hey [Name],
[What's done / what's new] — [specific detail].
[Any caveat or note].
[Simple ask if needed]
```

### Detailed Discussion (Multi-paragraph)
For problems, proposals, technical discussions.
```
Hey [Name],
[1-2 sentences: what this is about and why you're bringing it up]

[Problem/context explanation — as many short paragraphs as needed]

[Numbered points if listing distinct issues:]
1. **Issue name**
[2-3 sentences explaining it]

2. **Issue name**
[2-3 sentences explaining it]

[Transition to proposal or ask]
[Your recommendation or question, asked naturally]

[Warm closing]
```

## Examples (From Real Conversations)

### Example 1: Quick Update
**User input**: "[Manager] needs to know the TPSM adoption index sheet has been updated with December data"

**Output**:
Hey [Manager],
TPSM Capability Adoption Index sheet is now updated with Dec 2025 data.
Kindly check whenever you get time.

### Example 2: Status + Ask
**User input**: "Tell [Manager] the proactive cases metric is ready. It combines proactive cases from incidents, changes, and tech product support cases. Added it as non-star on PSEW dashboard. But tech product support cases for last month aren't included yet because the metric was only recently published monthly — should be there by tomorrow."

**Output**:
Hey [Manager], the calculated metric for the **Proactive Service Experience Workflow** is ready. It combines three inputs: proactive cases created from incidents, proactive cases created from changes, and technology product support cases. I've added it as a non-star metric on the PSEW dashboard — please review it and let me know if there's anything else you'd like me to do.

One thing to note: for now, the metric isn't including **technology product support cases** for last month since that metric was only recently published on a monthly frequency, so it doesn't have values yet. Once the data refreshes (likely by tomorrow or the day after), all three definitions should be reflected correctly.

### Example 3: Problem + Proposal
**User input**: "We're using a decision table to map success outcomes to success initiatives but it has problems. Duplicates can happen because there's no uniqueness enforcement. And for applicable success outcomes, the decision table is worse — no glide list result type so we're stuck with string fields. Users would have to copy-paste outcome template numbers. We could add multiple columns but that's a hack. Team is focused on solving the one-to-many relationship for now. I think we should introduce a Success Initiative Template table instead of forcing everything through the decision table. Want [Manager]'s thoughts."

**Output**:
I also wanted to discuss one more thing yesterday, but couldn't due to time constraints.

We're currently building a feature that utilizes a **decision table to map a Success Outcome to multiple Success Initiatives**, with the plan to later extend this to also support **Applicable Success Outcomes** by creating the corresponding M2M relationship records.

As we've gone deeper into this, we're running into a couple of challenges with the decision table approach:

1. **Duplicate record creation**
If you look at the Success Outcome Template → Success Initiative subflow, it's possible to create duplicate mappings. There's no clean way to enforce uniqueness or prevent duplicate combinations through the decision table today. This makes it difficult for us to prevent users from accidentally creating duplicate relationships, and the team is struggling to establish a reliable guardrail in this area.

2. **Poor support for Applicable Success Outcomes**
For Applicable Success Outcomes, the decision table is even more limiting:
- There's no result type that supports a glide list, so we're forced to use a string field.
- This requires users to manually copy-paste outcome template numbers, which is not user-friendly and will likely hurt adoption.
- An alternative could be to introduce multiple columns (Applicable Outcome 1, 2, 3, etc.), but that raises obvious questions around limits — and in reality, the number of applicable outcomes can vary widely. Even shipping with a fixed number feels like a workaround rather than a real solution.

Given these constraints, the team is currently focusing on solving only the first problem — using the decision table strictly for a **one-to-many relationship (one Success Outcome → many Success Initiatives)**. However, for Applicable Success Outcomes, I strongly feel the decision table approach is not the right fit.

This brings me to an alternative idea I wanted to get your thoughts on:
Should we consider introducing a **Success Initiative Template table** and directly model the relationships as part of the **Success Outcome Template design** itself? From a user perspective, this feels far more intuitive, easier to understand, and much cleaner than encoding relationships indirectly through a decision table — especially since the decision table is preventing us from achieving the full feature capability anyway.

Looking forward to your thoughts.

## Saving Output

After generating the message, **prepend** it to the single file:
`pm-workspace/conversations/teams/teams-conversations.md`

- Insert the new message directly after the first `---` (below the file title), pushing older messages down.
- Format each entry as:

```
## YYYY-MM-DD — [Brief Topic]

**Context:** [Brief 1-line context]

[Message body exactly as generated]

---
```

- Latest message is always on top. Never delete old messages unless explicitly asked.

## Auto-Open Preview (MANDATORY)

After saving the message, you MUST automatically open the file in your editor so the user can copy from a formatted view:

```bash
# Example — adjust the path and editor command to match your setup
code pm-workspace/conversations/teams/teams-conversations.md
```

This opens the file in your editor. Toggle markdown preview for formatted copy-paste.
