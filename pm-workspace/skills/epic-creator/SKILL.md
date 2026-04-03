---
name: epic-creator
description: >
  Create structured product epics with Subject, Description, and Acceptance Criteria
  for Customer Success Management (CSM) product development. Use this skill whenever
  the user asks to create an epic, write a product epic, draft a feature epic, generate
  acceptance criteria, or mentions "epic" in a product management context. Also trigger
  when the user says "create an epic for this", "write an epic from this doc", "epic",
  "AC", "acceptance criteria", or provides a feature document and asks for an epic.
  IMPORTANT: Never ask clarifying questions. Always assume, draft the full epic, and
  let the user refine afterward. This skill is optimized for Claude Code usage where
  speed and zero-friction execution matter.
---

# Epic Creator

> **Note:** Configured for CSM (Customer Success Management) domain -- customize the personas, examples, and domain defaults for your product domain.

Create structured, copy-ready product epics with three components: **Subject**, **Description**, and **Acceptance Criteria**.

---

## Core Principle: Zero Questions, Full Output

**NEVER ask the user clarifying questions.** When given any input — a document, a brief description, even a single sentence — immediately produce the complete epic. Make reasonable assumptions based on the CSM domain. The user will refine afterward. Speed and momentum matter more than perfection on first draft.

---

## Input

The input is typically one of the following:

- A **feature document** (uploaded file) explaining what the feature is, what it achieves, and the use cases
- A **brief description** in the chat (even a single sentence is enough)
- A **reference to a concept** from the CSM domain

That's it. No other input is needed. Do not ask for personas, outcomes, telemetry, or any other field. Infer everything from the input and the domain defaults below.

---

## Output Format

**The final deliverable must be a markdown file (.md).** Write the epic directly as a well-structured markdown document.

- Use `#` for the epic title (Subject)
- Use `##` for the top-level sections (Description, Acceptance Criteria)
- Use `###` for AC subsections (Problem Statement / Overview, Persona(s), Functional Details, etc.)
- Use standard markdown formatting: bold, bullet lists, numbered lists
- Save the .md file to the same `workings/` directory as the feature

### Platform Formatting (Optional)

If your project management tool requires rich text (HTML) for the acceptance criteria field, convert the markdown AC to HTML with these styling rules:

- **Section headings** (`<h3>`): 12pt, not bold, underlined — use inline style: `style="font-size:12pt;font-weight:normal;text-decoration:underline;"`
- **Body text** (`<p>`, `<ul>`, `<ol>`): 10pt — use inline style: `style="font-size:10pt;"`
- **Bold text** within body: use `<b>` tags (e.g., for functional detail item names)
- **Bullet lists**: `<ul>` with `<li>` items
- **Numbered lists**: `<ol>` with `<li>` items
- **Links**: use `<a href="...">label</a>` (e.g., for Lucid/Figma links in Design Engagement)
- **Line breaks** within a paragraph: use `<br/>`
- **HTML entities**: escape `&` as `&amp;`, `<` as `&lt;`, `>` as `&gt;`

The markdown file is the source of truth. The HTML is a rendering for your platform only.

---

### 1. Subject

A concise epic title. Rules:

- **Maximum 10 words**
- Start with the module or area prefix (e.g., "CSM:", "Renewals:", "Health Score:", "Onboarding:")
- Use title case
- Be specific — avoid vague words like "Improvements" or "Enhancements"

**Examples:**
- `CSM: AI-Powered Success Play Recommendations via Triggers`
- `Renewals: Automated Contract Renewal Risk Assessment`
- `Health Score: Composite Scoring with Adoption Signals`
- `Onboarding: Guided Setup Workflow with Milestone Tracking`

---

### 2. Description

A short paragraph explaining the epic. Rules:

- **Maximum 75 words**
- Cover **What** this epic delivers, **Why** it matters, and **Who** it serves
- Write in clear, direct language suitable for executive and engineering audiences
- No filler, no fluff

**Example:**
> This epic introduces an AI-driven success play recommendation engine that surfaces next-best-actions for CSMs based on real-time trigger events like license utilization thresholds and renewal proximity. It shifts CSM workflows from reactive to proactive, improving time-to-value and reducing churn risk. Serves Customer Success Managers and CSM leadership.

---

### 3. Acceptance Criteria

Use the **exact template below**. Every section must be present. Follow the word limits and caps specified for each section.

```
## Acceptance Criteria

### Problem Statement / Overview
[5W1H paragraph — max 100 words. See writing guide below.]

### Persona(s)
[Bulleted list. Use defaults below unless the feature context clearly requires others.]

### Design Engagement
LUCID:-
FIGMA PROTOTYPE:-

### Functional Details
[High-level numbered outline of how we solve the problem.]

### Customer Outcome / Value
[Maximum 5 bullet points. Pick the top 5 most impactful outcomes.]

### Business Outcome / Value
[Maximum 5 bullet points. Pick the top 5 most impactful outcomes.]

### Pricing
No impact

### Telemetry
[Maximum 7 bullet points. Focus on usage, adoption, and success metrics.]

### Documentation
NA

### Other Considerations
NA
```

---

## Section-by-Section Writing Guide

### Problem Statement / Overview

**Maximum 100 words.** Answer the 5W1H in a tight paragraph:

| Question | Maps To                                          |
|----------|--------------------------------------------------|
| **Who**  | Which persona faces this problem?                |
| **What** | What is the problem or gap?                      |
| **When** | At what point in the workflow does it occur?      |
| **Where**| In which module, table, or screen?               |
| **Why**  | Why does it matter? What's the impact?           |
| **How**  | How are we solving it at a high level?           |

**Example (within 100 words):**
> Customer Success Managers (Who) lack automated guidance on which success play to execute next (What) when key trigger events like 90% license utilization or missed onboarding milestones occur (When) within the CSM workspace (Where). This leads to inconsistent engagement and higher churn risk (Why). We will build an AI-powered recommendation engine that maps trigger events to a curated play library and surfaces next-best-actions via AI assistant prompts (How).

---

### Persona(s) — Defaults

Use these defaults based on feature context:

| Feature Context                        | Default Personas                                              |
|----------------------------------------|---------------------------------------------------------------|
| **General CSM features**               | Customer Success Manager, Director of Customer Success        |
| **Features involving onboarding**      | Customer Success Manager, Director of Customer Success, Onboarding Agent |
| **Renewals-specific features**         | Customer Success Manager, Director of Customer Success, Renewal Specialist |

Always include **Customer Success Manager** and **Director of Customer Success** as the base pair. Add additional personas only when the feature explicitly involves their workflow (e.g., onboarding → Onboarding Agent).

---

### Design Engagement — Static

This section is always the same. Never modify it:

```
LUCID:-
FIGMA PROTOTYPE:-
```

---

### Functional Details

Provide a **numbered high-level outline**. Cover:

- Key workflows and user interactions
- Data model changes (new tables, fields, relationships) if applicable
- Integration points (APIs, AI assistant, external systems) if applicable
- Decision logic or rules
- UI changes (workspace updates, new components) if applicable
- Edge cases or constraints

Keep it concrete — mention specific tables, fields, modules, and logic where possible.

---

### Customer Outcome / Value

**Maximum 5 bullet points.** If you identify more than 5, pick the top 5 that are most critical to include in the epic. Rank by direct customer impact.

Frame each bullet as a concrete outcome the customer achieves. Start each bullet with an action verb or outcome noun.

**Example:**
- Faster time-to-value through proactive, data-driven engagement
- Reduced churn risk via early intervention on at-risk signals
- Consistent success motions across all CSMs regardless of experience
- Improved customer satisfaction from timely, relevant outreach
- Greater visibility into health trends and recommended actions

---

### Business Outcome / Value

**Maximum 5 bullet points.** Same ranking logic — pick the top 5 if more exist.

Frame each bullet as a concrete outcome for the business.

**Example:**
- Increased net retention through proactive renewal and expansion plays
- Higher CSM productivity by reducing manual triage time
- Stronger product differentiation in the CSM platform market
- Improved forecasting accuracy from structured play outcome data
- Reduced onboarding-to-value cycle time across customer segments

---

### Telemetry

**Maximum 7 bullet points.** Focus on three categories:

1. **Usage** — Is the feature being used? (e.g., invocation counts, unique users)
2. **Adoption** — Is it being adopted broadly? (e.g., % of CSMs using it, frequency trends)
3. **Success** — Is it working? (e.g., correlation to renewal, churn reduction, time saved)

Each bullet should name a specific, measurable metric or event.

**Example:**
- Count of trigger events fired per event type per period
- Count of play recommendations generated vs. accepted vs. dismissed
- % of active CSMs who engaged with at least one recommendation per week
- Time from trigger event to CSM action (response latency)
- Correlation of play execution to renewal outcome (renewed / churned / downgraded)
- AI assistant prompt invocation count and completion rate
- Week-over-week trend in recommendation acceptance rate

---

## Execution Rules

1. **Never ask questions.** Infer everything. Assume. Draft. Let the user refine.
2. **Always produce all three sections** (Subject, Description, Acceptance Criteria) in one output.
3. **Always include all AC subsections**, even if they are "NA" or static.
4. **Respect all caps and word limits:**
   - Subject: max 10 words
   - Description: max 75 words
   - Problem Statement: max 100 words
   - Customer Outcome: max 5 bullets
   - Business Outcome: max 5 bullets
   - Telemetry: max 7 bullets
5. **Use persona defaults** from the table above. Do not ask the user which personas to include.
6. **Design Engagement is always static:** `LUCID:-` and `FIGMA PROTOTYPE:-`
7. **Pricing is always:** `No impact`
8. **Documentation is always:** `NA`
9. **Other Considerations is always:** `NA`
10. If input is a document, read the full document first, then produce the epic in one shot.
11. **Always output a markdown file (.md).** Save to the same `workings/` directory as the feature.
12. **When pushing to a platform**, convert the AC to HTML following the Platform Formatting rules above (12pt underlined unbolded headings, 10pt body, proper HTML tags and entities).

---

## Quality Checklist

Before delivering, verify:

- [ ] Subject ≤ 10 words, specific, has module prefix
- [ ] Description ≤ 75 words, covers What/Why/Who
- [ ] Problem Statement ≤ 100 words, covers all 5W1H
- [ ] Personas use correct defaults from the persona table
- [ ] Design Engagement is exactly `LUCID:-` and `FIGMA PROTOTYPE:-`
- [ ] Functional Details are concrete with tables, fields, logic, integrations
- [ ] Customer Outcome ≤ 5 bullets, ranked by impact
- [ ] Business Outcome ≤ 5 bullets, ranked by impact
- [ ] Pricing = `No impact`
- [ ] Telemetry ≤ 7 bullets, covering usage + adoption + success
- [ ] Documentation = `NA`
- [ ] Other Considerations = `NA`
- [ ] All sections present, no sections skipped
- [ ] Output is a markdown file (.md) with proper heading hierarchy
- [ ] If pushing to a platform: AC is HTML with 12pt underlined unbolded headings, 10pt body, proper tags and entities
