# Decisions

## Already-Decided Positions

### Schema-first architecture chosen
Frontend-only MVP prioritizes schema design over implementation complexity. JSON/Markdown as canonical artifacts.

### Frontend-only MVP chosen
No backend infrastructure yet. Static deployment via GitHub. Fast iteration prioritized over scalability.

### Backend deferred
Live polling, accounts, and automation explicitly not built yet. Focus on proving core value proposition first.

### Domain-as-config principle
Analysis patterns and claim types defined as configuration, not code. Enables rapid iteration without refactoring.

### Observation-only doctrine
Tool surfaces patterns for human interpretation. No verdicts rendered. Epistemic observatory, not oracle.

### S.A.U.C.E. Doctrine framework adopted
Five pillars: Consistency Verification, Uncertainty Calibration, Source Integrity, Structural Coherence, Failure Mode Awareness.

### React as viewport principle
UI is presentation layer only. Schema-first mindset. Data/schema separate from UI implementation.

### Demo reports stored as static JSON under /reports
Reports stored as JSON files conforming to Observation Report Schema v0.1. URL parameter 'report' used for share links.

### Dev runtime uses Vite; canonical share links use query params (?tab=midterm&report=...)
Vite replaces static Python server for proper React/TSX compilation. Share links use query parameters instead of paths for static hosting compatibility.

### Governance Ceiling Principle (Established Jan 9, 2026)

Add structure only to prevent repeated costly failures.

**Justified structure:**
- Context loss → governance files
- Skipped steps → verification checklists
- Ambiguous authority → role definitions

**Unjustified structure:**
- Stylistic preferences (formatting, naming)
- Premature optimization (before patterns proven)
- Edge cases that haven't occurred

**Test for new governance:**
- Has this failure happened 3+ times?
- Does fixing it enable faster work?
- Can it be added without breaking existing good work?

If no to any: defer the governance.

**Goal:** Minimum viable governance that maximizes creative velocity.

**Application:** Templates, rules, and protocols are references and patterns, not mandates. Deviation is permitted when context requires it.