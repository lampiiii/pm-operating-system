Commit all changes and push to remote. Do not ask any clarifying questions.

Execute these steps exactly:

## Step 1 — Assess changes (run in parallel)
- `git status -u` to see all modified and untracked files
- `git diff --stat` to see a summary of changes
- `git log --oneline -5` to see recent commit message style

## Step 2 — Stage files
- Add all relevant changed and untracked files by name (not `git add -A`)
- Do NOT stage `.env`, `node_modules/`, `.DS_Store`, or any files in `.gitignore`
- Do NOT stage files that likely contain secrets or credentials

## Step 3 — Commit
- Draft a concise commit message (1-2 sentences) that summarizes the "why" not the "what"
- If changes span multiple areas, use a short title line + bullet points in the body
- Always end with: `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
- Use a HEREDOC to pass the message

## Step 4 — Push
- `git push` to the remote
- If push fails due to upstream changes, notify the user — do NOT force push

## Step 5 — Verify
- `git status` to confirm clean working tree
- Report the commit hash and number of files changed
