---
name: image-to-spec
description: >
  Convert a screenshot, photo, or image of a research board, UX mockup, whiteboard diagram,
  or product concept into a structured markdown feature spec.
  Use when the user says "extract from this image", "convert this screenshot to a spec",
  "turn this whiteboard into a spec", "analyze this mockup", or uploads/references any image
  with product or design content.
  IMPORTANT: Never ask clarifying questions. Read the image, extract everything visible,
  and produce a complete structured spec immediately.
---

# Image to Spec

Convert any product-related image (research board, mockup, whiteboard, UX screenshot, diagram)
into a structured markdown spec ready to use as a feature working document.

## What It Does

1. Reads and analyzes the provided image
2. Identifies the type of content (triggers, UI components, flows, data, concepts)
3. Extracts all visible information — labels, categories, groupings, annotations
4. Organizes it into a structured markdown spec with appropriate sections
5. Flags any gaps or areas that need follow-up

## When to Use

- Research board photos (sticky notes, affinity maps, trigger lists)
- UX mockups or wireframes (card layouts, modal designs, dashboard components)
- Whiteboard diagrams (system flows, architecture sketches, decision trees)
- Design screenshots (component specs, color palettes, layout grids)
- Any visual artifact you want to convert into a working document

## Execution Steps

When invoked with an image:

1. **Read the image** — use the Read tool on the file path provided, or ask the user to paste/attach if not yet provided
2. **Identify content type** — determine what kind of product artifact this is
3. **Extract all visible content** — do not summarize or simplify; capture every label, number, category, annotation visible
4. **Structure into sections** — choose sections based on what's in the image:

### Section Templates by Content Type

**Research board / trigger list:**
```markdown
## Overview
[What this board represents — feature context, scope]

## [Category 1 Name]
| ID | Item | Condition/Detail | Notes |
|----|------|-----------------|-------|
| ...

## [Category 2 Name]
...

## Gaps & Open Questions
- [ ] ...
```

**UX mockup / wireframe:**
```markdown
## Component: [Name]
**Type**: [Card / Modal / Table / Dashboard widget]
**Location**: [Where it appears in the product]

### Visual Structure
- [Element 1]: [Description]
- [Element 2]: [Description]

### Content Fields
| Field | Type | Source | Notes |
|-------|------|--------|-------|

### Interactions
- [Action] → [Result]

### Open Questions
- [ ] ...
```

**Whiteboard / flow diagram:**
```markdown
## Flow: [Name]
**Trigger**: [What initiates this]
**Actor**: [Who/what performs steps]

### Steps
1. [Step with condition if any]
2. ...

### Decision Points
- [Condition] → [Path A / Path B]

### Gaps & Open Questions
- [ ] ...
```

**General / mixed content:**
```markdown
## Summary
[1-2 sentence description of what this is]

## Extracted Content

### [Group 1]
...

### [Group 2]
...

## What Needs Clarification
- [ ] ...
```

## Output Format

Always output:
1. The full structured spec as a markdown code block (ready to save as a `.md` file)
2. A suggested filename: `YYYY-MM-DD-[descriptive-name].md`
3. A short note (1-2 sentences) on anything in the image that was unclear or partially visible

## Rules

- **Extract everything** — do not omit items because they seem minor; the user can trim later
- **Preserve original labels** — use the exact text visible in the image, not paraphrased versions
- **Flag gaps honestly** — if a section of the image is blurry, partially cut off, or ambiguous, note it explicitly
- **No invented content** — only include what is visible or directly inferable from the image
- **Always include an "Open Questions" or "Gaps" section** — there will always be something the image doesn't answer
