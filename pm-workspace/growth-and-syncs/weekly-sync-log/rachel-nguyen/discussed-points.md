╔══════════════════════════════════════════════════════════════╗
║             WEEKLY SYNC — DISCUSSED POINTS LOG               ║
╚══════════════════════════════════════════════════════════════╝

| # | Topic | Category | Context / Details | Discussed On | Outcome / Next Steps |
|---|-------|----------|-------------------|--------------|----------------------|
| 1 | Salesforce integration data model | Work Item | Mapping CRM fields to our account model. 15 standard fields, 8 custom fields needed for enterprise customers. | 2026-02-24 | Approved standard field mapping. Custom fields as Phase 2. Rachel to document the mapping spec by March 7. |
| 2 | Webhook reliability for real-time health updates | Issue | Webhooks failing silently for 2 customers due to firewall rules. No retry mechanism in place. | 2026-03-10 | Added exponential backoff retry (3 attempts, 1min/5min/30min). Rachel implementing dead letter queue for persistent failures. |
| 3 | Data residency requirements for EU customers | Decision | Three EU prospects requiring data to stay in EU region. Current architecture is US-only. | 2026-03-24 | Decided to support EU region by Q3. Rachel scoping infrastructure changes. Estimated 6-week effort. Not blocking current deals — using contractual safeguards interim. |

<!--
Archive of all points discussed in weekly syncs.
- Points move here from active-points.md once marked "Discussed"
- Never delete entries, only append
-->
