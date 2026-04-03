The user is telling you that the current task should be handled by a dedicated sub-agent, NOT in the main session. This preserves the main context window for higher-level work.

Task to spin up: $ARGUMENTS

Steps:
1. Determine the best agent type for the task:
   - `general-purpose` — default for most code, research, or multi-step tasks
   - `Explore` — for codebase search, file discovery, or "how does X work?" questions
   - `Plan` — for designing implementation plans or architectural decisions
   - Use a custom agent (e.g., `competitive-strategic-lens`, `persona-drip`, `prd-edge-case-analyzer`) if the task clearly matches one
2. Launch the agent using the Agent tool with a clear, self-contained prompt that includes all necessary context so the agent can work autonomously without back-and-forth.
3. When the agent returns, present a concise summary of the result to the user. Do NOT paste the full agent output — distill it to what matters.
4. If follow-up work is needed that would also be context-heavy, suggest another `/spin-up` rather than doing it inline.

Rules:
- Do NOT do any of the work yourself in the main session. The whole point is to offload it.
- Do NOT ask clarifying questions before launching — make reasonable assumptions and go.
- If no task is provided ($ARGUMENTS is empty), ask the user what they'd like to spin up.
