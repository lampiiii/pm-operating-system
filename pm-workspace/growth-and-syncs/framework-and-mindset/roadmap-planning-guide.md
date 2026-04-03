# Roadmap Planning & Execution Guide

> **Goal**: At any point, if someone asks "what are we doing for Q4?" — you should be able to answer everything, and everything should already be prepared.

---

## The Three-Horizon Operating Model

Operate on three time horizons simultaneously at all times:

| Horizon | What You're Doing | Example |
|---------|-------------------|---------|
| **Q0 (Now)** | Executing, shipping, unblocking | Building Q2 features |
| **Q+1 (Next)** | Designs done, eng scoped, stakeholders aligned | Q3 is fully prepped |
| **Q+2 (After)** | Discovery, research, problem validation | Q4 ideas are being explored |

---

## The Countdown Timeline (Working Backwards from Target Quarter)

```
Q-2 (6+ months out)     SIGNALS & DISCOVERY
  - Collect raw inputs: customer feedback, support tickets, churn data, competitive moves
  - Run weekly customer interviews (Teresa Torres: at least 1/week)
  - Build an Opportunity Solution Tree: Outcome → Opportunities → Solutions → Tests
  - Maintain a living ideas backlog (not a roadmap yet)

Q-1 (3-6 months out)    VALIDATION & DESIGN
  - Validate top problems with customers (interviews, prototype tests)
  - Write problem briefs / one-pagers for top 5-8 candidates
  - Design team begins exploration (wireframes, flows)
  - Engineering does feasibility spikes on risky items
  - Prioritize using RICE, LNO, or Gibson Biddle's GEM framework

8-6 weeks before         SCOPING & ALIGNMENT
  - Hi-fi designs in progress for top initiatives
  - Engineering t-shirt sizing and estimation
  - Cross-team dependencies identified and negotiated
  - PRDs / product briefs written and reviewed
  - Architect discussions completed

4-3 weeks before         STAKEHOLDER SIGN-OFF
  - Present draft roadmap to leadership
  - Get engineering commitment on capacity
  - Resolve conflicts, make trade-off decisions
  - Finalize commitments vs. stretch goals

2-1 weeks before         SPRINT-READY
  - Designs complete for Sprint 1 and Sprint 2
  - Epics broken into stories with acceptance criteria
  - Success metrics defined for every initiative
  - Launch plan documented

Week 1 of Quarter        EXECUTE
  - No "what are we building?" conversations
  - Everyone has full context, PM focuses on unblocking
  - Discovery for Q+1 is already underway
```

---

## The Product Pipeline (Always Have Items at Every Stage)

```
Stage 0: SIGNALS          (50+ raw inputs: feedback, data, competitive intel)
Stage 1: PROBLEMS          (15-20 validated problem statements)
Stage 2: DISCOVERY         (5-8 actively being explored with customers/design)
Stage 3: SCOPED            (3-5 with designs done, eng estimates, PRD written)
Stage 4: COMMITTED         (2-3 in the current quarter's plan)
Stage 5: SHIPPED           (Launched, measuring results)
Stage 6: MEASURED          (Impact assessed, learnings documented)
```

**Critical rule:** If Stage 1-2 is empty, next quarter is already in trouble.

---

## Where to Source Ideas

Highest-yield sources (based on Lenny Rachitsky's research):

1. **Talk to customers directly** — interviews, ride-alongs, site visits
2. **Talk to people who talk to customers** — sales, support, CSMs
3. **Watch customers through data** — analytics, session recordings, usability tests
4. **Mine existing research** — insights from past studies never acted on
5. **Use your own product** — dogfooding reveals friction data misses
6. **Quiet thinking time** — block 2-3 hours/week for unstructured reflection
7. **Analyze churn patterns** — why are people leaving?
8. **Study competitors** — not to copy, but to understand gaps
9. **Look at adjacent markets** — what are parallel industries doing?
10. **Work backwards from vision** — "what must be true in 2 years?"

---

## Design-to-Development Handoff

Design must always lead engineering by 1-2 sprints. Never let them run in lockstep.

```
Sprint N-2:  Design explores/wireframes Feature X
Sprint N-1:  Design completes hi-fi mocks + specs
             Engineering does technical spike
             Joint design-eng review (PM facilitates)
Sprint N:    Engineering builds Feature X
             Design is already working on N+2 features
Sprint N+1:  QA + polish + launch
```

**Key rules:**
- Never hand off designs without a joint walkthrough session
- Involve engineers in discovery/design critiques early (not just at handoff)
- Handoff package must include: hi-fi mocks, interaction specs, edge cases, error states, empty states, and acceptance criteria

---

## Rituals That Make This Work

| Cadence | Ritual | Purpose |
|---------|--------|---------|
| **Weekly** | 1 customer interview | Feed discovery pipeline |
| **Weekly** | Metrics check (30 min) | Catch problems early |
| **Weekly** | Stakeholder 1:1 (rotating) | Surface needs, manage expectations |
| **Bi-weekly** | Design review | Review upcoming designs with eng |
| **Bi-weekly** | Backlog grooming | Keep pipeline healthy |
| **Monthly** | Roadmap review | Update NOW/NEXT/LATER |
| **Monthly** | Competitive intel review | Track market shifts |
| **Monthly** | Feedback synthesis | Theme and aggregate all inputs |
| **Quarterly** | Quarter retro | What shipped, what slipped, why |
| **Quarterly** | Next-Q planning (multiple sessions) | Finalize Q+1 roadmap |

---

## Pre-Quarter Checklist (The "Am I Ready?" Test)

Before any quarter starts, verify all of these:

- [ ] Top 3-5 initiatives are validated (customer evidence exists)
- [ ] Designs complete for Sprint 1-2 work
- [ ] Engineering has scoped and estimated each initiative
- [ ] Dependencies on other teams identified and agreed
- [ ] Success metrics defined for each initiative
- [ ] Stakeholders have reviewed and aligned
- [ ] Launch plan exists for any GA releases
- [ ] Stretch goals identified separately from commitments
- [ ] Risk register documented (what could go wrong?)
- [ ] Q+1 discovery pipeline has 3-5 items in early exploration

---

## Common Mistakes to Avoid

1. **Treating the roadmap as a delivery contract** — it's a strategic communication tool, not a Gantt chart
2. **Feature list instead of outcomes** — frame as "reduce onboarding time by 40%," not "build SSO"
3. **Overloading the quarter** — plan for **70% capacity** (20% unplanned work, 10% tech debt)
4. **Empty discovery pipeline** — if you're not discovering for Q+1 during Q0, next quarter starts blind
5. **No stakeholder alignment before Day 1** — align 3-4 weeks before, not on Day 1
6. **Ignoring cross-team dependencies** — negotiate weeks before, not mid-sprint
7. **No defined success metrics** — every initiative needs a hypothesis before building
8. **No quarter retro** — without one, you repeat the same planning mistakes

---

## Frameworks Reference

| Framework | Creator | Use For |
|-----------|---------|---------|
| **NOW / NEXT / LATER** | Janna Bastow | Communicating roadmap without fixed dates |
| **Opportunity Solution Trees** | Teresa Torres | Structuring discovery work |
| **DHM + GEM** | Gibson Biddle | Strategic filtering (Delight, Hard-to-copy, Margin-enhancing) |
| **LNO** | Shreyas Doshi | Task prioritization |
| **Pre-mortem** | Shreyas Doshi | Before committing: "imagine this failed — what went wrong?" |
| **Four Risks** | Marty Cagan | Value, Usability, Feasibility, Viability — address all before building |

### NOW / NEXT / LATER (Janna Bastow)

- **NOW**: Committed, in progress, high confidence, designs complete
- **NEXT**: Validated problems, early designs, will likely happen in 1-3 months
- **LATER**: Strategic bets, early discovery, direction not commitment

### Opportunity Solution Trees (Teresa Torres)

```
Desired Outcome (business metric you own)
  |
  +-- Opportunity 1 (customer need/pain)
  |     +-- Solution A --> Assumption Test 1, 2
  |     +-- Solution B --> Assumption Test 3
  |
  +-- Opportunity 2 (customer need/pain)
        +-- Solution C --> Assumption Test 4
```

Start with the outcome, not the solution. Discovery is a weekly rhythm, not a one-time phase.

### DHM + GEM (Gibson Biddle)

- **DHM**: Does this initiative delight customers in hard-to-copy, margin-enhancing ways?
- **GEM**: Prioritize by Growth, Engagement, Monetization

### Four Risks (Marty Cagan)

Address all four before building:
- **Value**: Will customers buy/use it?
- **Usability**: Can they figure it out?
- **Feasibility**: Can we build it?
- **Viability**: Does it work for the business?

---

## Sources & Further Reading

- Shreyas Doshi — LNO Framework, Pre-mortem Thinking
- Lenny Rachitsky — Where Great Product Roadmap Ideas Come From, 7 Habits of Top PMs
- Gibson Biddle — DHM Model, Rolling Four-Quarter Roadmap
- Marty Cagan (SVPG) — Continuous Discovery, Empowered Teams, Four Risks
- Teresa Torres — Opportunity Solution Trees, Weekly Customer Touch Points
- Janna Bastow (ProdPad) — NOW/NEXT/LATER Roadmap
- Roman Pichler — Product Roadmapping Mistakes to Avoid
