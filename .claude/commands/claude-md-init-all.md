Update all CLAUDE.md files and create missing ones across the repository starting from $ARGUMENTS (default: current working directory).

Execute these steps exactly. Do not ask any clarifying questions.

1. Discover: Run `find` from the starting folder to locate every existing CLAUDE.md file recursively. Also list all directories that could benefit from a CLAUDE.md but don't have one (exclude node_modules, .git, .claude, dist, and empty placeholder directories).

2. Create missing CLAUDE.md files: For each meaningful directory without a CLAUDE.md:
   - Examine its contents (files, subdirectories, configs)
   - Write a concise, scoped CLAUDE.md covering: purpose, key files, conventions, and workflows relevant to that folder
   - Do NOT duplicate content from parent CLAUDE.md files — reference them instead
   - Keep it brief and actionable

3. Update existing CLAUDE.md files: For every folder that already has a CLAUDE.md:
   - Analyze current folder contents against the documented state
   - Refresh commands, file references, and dependencies that changed
   - Add newly detected patterns or key files not yet documented
   - Remove references to files, commands, or patterns that no longer exist
   - PRESERVE all manually written instructions, preferences, warnings, and gotchas
   - Keep content concise — CLAUDE.md is context window real estate, not documentation

4. Report summary: Output a table listing each file, whether it was Created, Updated, or Unchanged, and a brief note on what changed.

Scope each CLAUDE.md to its own folder. Do not dump entire project context into every file. Only include folder-specific, actionable context. Use parallel agents where possible to speed up the process.