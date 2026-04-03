╔══════════════════════════════════════════════════════════════╗
║             WEEKLY SYNC — DISCUSSED POINTS LOG               ║
╚══════════════════════════════════════════════════════════════╝

| # | Topic | Category | Context / Details | Discussed On | Outcome / Next Steps |
|---|-------|----------|-------------------|--------------|----------------------|
| 1 | Health score v1 model review | Work Item | Current model over-indexes on login frequency, under-weights support ticket severity | 2026-03-03 | Agreed to add support ticket sentiment and resolution time as inputs in v2. Priya to prototype by March 20. |
| 2 | Data pipeline reliability | Issue | Usage data ingestion failing silently for 3 accounts — stale scores shown as current | 2026-03-17 | Added data freshness checks and alerting. Root cause: API rate limiting from customer's product. Increased retry logic. |

<!--
Archive of all points discussed in weekly syncs.
- Points move here from active-points.md once marked "Discussed"
- Never delete entries, only append
-->
