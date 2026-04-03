---
name: doc-refiner
description: >
  Refine, restructure, and polish unstructured markdown documents. Use this skill
  whenever the user mentions refining a file or document in ANY phrasing, including:
  "refine this file", "refine this .md file", "refine this particular file",
  "refine feature-spec.md", "refine this markdown", "clean up this doc",
  "clean this file", "make this readable", "structure this doc", "polish this",
  "fix this document", "tidy up this file", or any variation where "refine" or
  "clean up" appears near a file name or file reference. Also trigger when the user
  says "run doc-refiner", "deduplicate this", "remove repetition from this doc",
  or points to any .md file and asks to improve, restructure, or simplify it.
  IMPORTANT: Never ask clarifying questions. Read the document, refine it in place,
  and output the cleaned version immediately. Optimized for Claude Code — zero-friction,
  single-pass execution.
---

# Doc Refiner

Read an unstructured markdown document, refine it for clarity and structure, preserve the author's voice, and output a clean, readable version with a TL;DR prepended.

---

## Core Principle: Zero Questions, Full Execution

**NEVER ask the user clarifying questions.** When pointed at a document, immediately read it, refine it, and output the cleaned version. The user will review and adjust afterward. Speed matters.

---

## Input

The input is one of the following:

- A **markdown file path** (e.g., `refine ./docs/feature-spec.md`)
- A **document pasted in chat**
- A **file referenced by the user** (e.g., "refine this doc", "clean up the PRD")

Read the entire document before making any changes.

---

## What This Skill Does

In a single pass, apply all of the following:

### 1. Prepend a TL;DR

Add a `## TL;DR` section at the very top of the document.

Rules:
- **Maximum 100 words**
- 2-3 lines that capture what this document is trying to achieve
- Written in plain, direct language
- No jargon unless the document itself is heavily technical
- This is a summary of the document's **purpose and goal**, not a table of contents

**Format:**
```markdown
## TL;DR
[2-3 lines, max 100 words, explaining what this document is trying to achieve]

---
```

### 2. Add Structure

Organize the content into logical sections with clear markdown headings. Follow these rules:

- Use `##` for major sections, `###` for subsections
- Group related ideas together under a common heading
- If the document has no structure at all, infer sections from the content (e.g., "Problem", "Approach", "Use Cases", "Open Questions")
- If the document already has some structure, preserve and improve it — don't reorganize for the sake of reorganizing
- Add a logical flow: the document should read top-to-bottom without the reader needing to jump around

### 3. Remove Repetition

- If the same point, idea, or statement appears multiple times, **keep the strongest version and remove the rest**
- If two paragraphs say the same thing in different words, merge them into one clear paragraph
- If a bullet point repeats what a paragraph already says, remove the bullet
- Do NOT remove information that looks similar but adds a distinct nuance — only remove true duplicates

### 4. Fix Spelling and Grammar

- Fix typos, spelling mistakes, and grammatical errors
- Fix incorrect punctuation
- Fix inconsistent capitalization
- Do NOT rewrite sentences that are grammatically correct just to make them "sound better" — preserve the author's phrasing

### 5. Preserve the Author's Voice

This is critical. The goal is **refinement, not rewriting**.

- Keep the author's original words and phrasing wherever possible
- Keep the tone (casual, technical, formal) as-is
- Keep domain-specific terms, abbreviations, and jargon the author uses
- Do NOT replace simple words with fancier synonyms
- Do NOT add transitions, filler phrases, or corporate polish that wasn't there
- Do NOT inject new opinions, conclusions, or content that the author didn't write
- If the author wrote in short, punchy sentences — keep them short and punchy
- If the author used bullet points heavily — keep the bullet-heavy style

**The reader should still feel like the same person wrote it.**

### 6. Improve Readability

- Break up walls of text into shorter paragraphs (max 4-5 sentences per paragraph)
- Ensure bullet points are parallel in structure (all start with verbs, or all start with nouns — match whatever the author was doing)
- Add blank lines between sections for visual breathing room
- If a sentence is genuinely hard to parse, simplify its structure without changing the meaning
- If acronyms are used without being defined, define them on first use only if the definition is obvious from context — otherwise leave them as-is

---

## What This Skill Does NOT Do

- Does NOT add new content or ideas
- Does NOT change the document's conclusions or recommendations
- Does NOT rewrite the author's voice into a "professional" or "corporate" tone
- Does NOT reorganize a document that already has a clear, logical structure
- Does NOT remove content just because it seems informal or rough — if it carries meaning, it stays
- Does NOT add sections like "Next Steps" or "Summary" unless the content already implies them

---

## Output

- Output the **full refined document** as a single markdown block
- The TL;DR section is always at the top, followed by a `---` separator
- Preserve all original content that isn't a duplicate
- If the input was a file path, write the refined version back to the same file

---

## Execution Rules

1. **Never ask questions.** Read. Refine. Output.
2. **Always prepend the TL;DR** (max 100 words, 2-3 lines).
3. **Always fix** spelling, grammar, and punctuation.
4. **Always remove** true duplicates and redundant repetitions.
5. **Always add structure** if the document lacks headings or logical grouping.
6. **Never rewrite** the author's voice, tone, or style.
7. **Never add** new ideas, opinions, or content.
8. **Never remove** content that carries unique meaning, even if it's rough.
9. If the document is already well-structured and clean, make minimal changes and say so.
10. If the input is a file, read the full file first, then produce the refined version in one shot.

---

## Quality Checklist

Before delivering, verify:

- [ ] TL;DR is present at the top, ≤ 100 words, captures the document's purpose
- [ ] Document has clear headings and logical section flow
- [ ] No repeated points or duplicate paragraphs remain
- [ ] Spelling, grammar, and punctuation are clean
- [ ] Author's original voice and tone are preserved
- [ ] No new content, opinions, or conclusions were added
- [ ] Walls of text are broken into readable paragraphs
- [ ] Bullet points are parallel in structure
- [ ] The document reads top-to-bottom without confusion
