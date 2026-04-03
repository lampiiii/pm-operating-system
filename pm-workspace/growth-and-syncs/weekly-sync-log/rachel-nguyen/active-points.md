╔══════════════════════════════════════════════════════════════╗
║             WEEKLY SYNC — ACTIVE DISCUSSION POINTS           ║
╚══════════════════════════════════════════════════════════════╝

| # | Topic | Category | Context / Details | Added On | Status |
|---|-------|----------|-------------------|----------|--------|
| 1 | Integration architecture for health score v2 | Work Item | Rachel designed the data flow for ingesting product usage events from customer systems. Need to review her proposal: webhook-based vs. polling-based approach. | 2026-04-01 | Ready to Discuss |
| 2 | API versioning strategy for breaking changes | Decision | After the v3.8.2 incident, Rachel drafted an API versioning RFC. Proposes sunset windows, migration tooling, and CS pre-notification. Need PM sign-off. | 2026-04-02 | To Discuss |
| 3 | Enterprise customer SSO integration backlog | Issue | 4 enterprise deals blocked on SSO integrations we don't support yet (Okta SCIM, Azure AD conditional access). Rachel has a prioritized list. | 2026-04-02 | To Discuss |
| 4 | AI copilot — context window design | Work Item | For the save plan generation feature, Rachel is proposing we feed the LLM: last 90 days of account activity, health score inputs, and CSM notes. Need to align on context boundaries. | 2026-04-03 | To Discuss |

<!--
How to use:
- Add points you want to discuss in your next weekly sync
- Category values: Work Item, Issue, Feedback, Career Growth, Decision, FYI
- Status values: To Discuss / Ready to Discuss / Discussed
- When marked "Discussed" → move to discussed-points.md with sync date and outcome
-->
