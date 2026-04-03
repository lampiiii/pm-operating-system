---
name: story-creator
description: >
  Create structured user stories with Short Description, Description, and Acceptance
  Criteria for Customer Success Management (CSM) product development. Use this skill
  whenever the user asks to create a story, write a user story, draft a story, generate
  story acceptance criteria, or mentions "story" in a product management context. Also
  trigger when the user says "create a story for this", "write a story from this epic",
  "break this into stories", "story AC", or provides a feature description and asks
  for a story. IMPORTANT: Never ask clarifying questions. Always assume, draft the
  full story, and let the user refine afterward. This skill is optimized for Claude
  Code usage where speed and zero-friction execution matter.
---

# Story Creator

> **Note:** Configured for CSM (Customer Success Management) domain -- customize the personas, examples, and domain defaults for your product domain.

Create structured, copy-ready user stories with three components: **Short Description**, **Description**, and **Acceptance Criteria**.

---

## Core Principle: Zero Questions, Full Output

**NEVER ask the user clarifying questions.** When given any input — an epic, a feature description, a brief sentence — immediately produce the complete story. Make reasonable assumptions based on the CSM domain. The user will refine afterward.

---

## Input

The input is typically one of the following:

- An **epic or feature document** that needs to be broken into stories
- A **brief description** of what the story should cover (even a single sentence is enough)
- A **reference to a specific piece of functionality** from the CSM domain

That's it. No other input is needed. Infer everything from the input and the domain defaults below.

---

## Output Format

Generate all three sections in a single, clean output block.

---

### 1. Short Description

A concise story title. Rules:

- **Maximum 10 words**
- Be specific about what this story delivers
- Use action-oriented language (e.g., "Add", "Create", "Display", "Enable", "Configure")
- No vague words like "Update" or "Improve" without context

**Examples:**
- `Add trigger event listener on account health table`
- `Display daily brief card in CSM workspace`
- `Create play-mapping decision table for recommendations`
- `Enable AI assistant prompt for success plays`
- `Configure renewal risk scoring threshold rules`
- `Build onboarding milestone completion tracking UI`

---

### 2. Description

A single sentence explaining the story. Rules:

- **Maximum 25 words**
- Cover **what** is being built and **why** it matters
- Direct and functional — no filler

**Examples:**
- `Build a trigger event listener on the account health table to detect threshold breaches and fire downstream play recommendations.`
- `Create a daily brief card component in the CSM workspace that surfaces the top recommended action for each account.`
- `Add a decision table mapping trigger event types and account segments to the appropriate success play from the play library.`

---

### 3. Acceptance Criteria

Use the **exact template below**. Both sections must always be present.

```
__GENERAL ACCEPTANCE CRITERIA__

As part of this story, we will work on the following items:-

* [Functional detail 1]
* [Functional detail 2]
* [Functional detail 3]
* ...

__GENERAL USER INTERACTION__

When a Customer Success Manager logs in, they will [describe what the user sees, experiences, or can do as a result of this story — max 75 words].
```

---

## Section-by-Section Writing Guide

### General Acceptance Criteria

This section lists the **functional details** — the concrete technical and functional work items that make up this story. Rules:

- Each bullet is a specific, implementable work item
- Bullets should cover: data model changes, business logic, UI components, integrations, validations, edge cases
- Be concrete — mention table names, field names, API endpoints, components, conditions, and logic where possible
- The number of bullets **varies by story complexity** — no fixed cap, include everything that's needed
- Order bullets in a logical implementation sequence (data layer → logic → UI → edge cases)
- Each bullet should be independently verifiable — a developer or QA engineer should be able to check if it's done

**Writing style for bullets:**
- Start each bullet with an action verb (Add, Create, Build, Configure, Display, Validate, Ensure, Handle, Log, Update)
- Be specific enough that a developer knows what to build without asking questions
- Include field names, table names, conditions, and thresholds where applicable

**Example:**
```
__GENERAL ACCEPTANCE CRITERIA__

As part of this story, we will work on the following items:-

* Create an automation rule on the `account_health` table that triggers when the `license_utilization` field crosses 90%.
* The rule fires an event to the `trigger_events` table with event_type = "license_threshold_breach", severity, and account reference.
* Add a lookup from `trigger_events` to the `play_mapping` decision table to resolve the recommended play based on event_type + account_segment.
* Store the recommendation in the `play_recommendations` table with fields: account, recommended_play, trigger_event, status (pending/accepted/dismissed), and created_timestamp.
* Handle edge case: if no matching play exists in the decision table, log the event with status = "unmapped" and do not surface a recommendation.
* Add access control rules to restrict read/write access on `play_recommendations` to the `csm_manager` and `csm_admin` roles.
```

### General User Interaction

This section describes the **end-user experience** — what the CSM sees or can do after this story is delivered. Rules:

- **Maximum 75 words**
- Always starts with: `When a Customer Success Manager logs in, they will`
- Describe the visible outcome from the user's perspective
- Focus on what they see, what they can interact with, and what value they get
- Do not repeat the functional details — this is the user-facing narrative, not the implementation list
- If the story involves a persona other than CSM (e.g., Onboarding Agent, Director of CS), adjust the opening accordingly but keep the same structure

**Example:**
```
__GENERAL USER INTERACTION__

When a Customer Success Manager logs in, they will see a new "Recommended Action" card on their CSM workspace dashboard. This card displays the top recommended success play for each at-risk account, triggered by real-time events like license utilization breaches. The CSM can accept, dismiss, or modify the recommendation, and all actions are logged for reporting.
```

---

## Persona Defaults

Use these defaults based on story context. Do not ask the user.

| Story Context                          | Default Opening for General User Interaction                     |
|----------------------------------------|------------------------------------------------------------------|
| **General CSM features**               | When a Customer Success Manager logs in, they will...            |
| **Features involving onboarding**      | When an Onboarding Agent logs in, they will...                   |
| **Director/Manager-level features**    | When a Director of Customer Success logs in, they will...        |
| **Multi-persona features**             | Use the primary actor's persona for the opening line             |

---

## Execution Rules

1. **Never ask questions.** Infer everything. Assume. Draft. Let the user refine.
2. **Always produce all three sections** (Short Description, Description, Acceptance Criteria) in one output.
3. **Always include both AC subsections** (General Acceptance Criteria + General User Interaction).
4. **Respect all word limits:**
   - Short Description: max 10 words
   - Description: max 25 words
   - General User Interaction: max 75 words
   - General Acceptance Criteria: no fixed limit — varies by story
5. **General Acceptance Criteria must contain functional details** — concrete, implementable, verifiable bullets.
6. **General User Interaction always starts with** the persona-appropriate "When a [Persona] logs in, they will..." opening.
7. **Use the exact template formatting** — `__GENERAL ACCEPTANCE CRITERIA__` and `__GENERAL USER INTERACTION__` as section headers with double underscores.
8. If input is a document or epic, read it fully, then produce the story in one shot.
9. If the input implies multiple stories, produce each story separately with a clear separator (`---`).

---

## Quality Checklist

Before delivering, verify:

- [ ] Short Description ≤ 10 words, action-oriented, specific
- [ ] Description ≤ 25 words, covers what and why
- [ ] `__GENERAL ACCEPTANCE CRITERIA__` section is present with functional detail bullets
- [ ] Bullets are concrete — mention tables, fields, logic, conditions, components
- [ ] Bullets are ordered logically (data → logic → UI → edge cases)
- [ ] `__GENERAL USER INTERACTION__` section is present and ≤ 75 words
- [ ] User interaction starts with "When a [Persona] logs in, they will..."
- [ ] User interaction describes the visible outcome, not implementation details
- [ ] Exact template formatting is used (double underscores, bullet style)
- [ ] All sections present, no sections skipped
