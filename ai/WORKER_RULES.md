# Worker Rules

## Read Order
Always read STATE.md first, then WORKER_RULES.md. These documents establish the current truth and operating constraints.

## One-Task-at-a-Time Rule
Execute one task at a time. Mark tasks as complete before starting new ones. This ensures clarity and prevents conflicts.

## Execution Verification Protocol

### Pre-Execution (ALWAYS do first):
1. Read STATE.md (current truth)
2. Read WORKER_RULES.md (operating constraints)
3. Read DECISIONS.md (frozen positions)
4. If task-related: Read TASKS.md (track record)

### During Execution:
- Follow acceptance criteria exactly
- Document as you go
- Note any deviations immediately

### Pre-Completion (BEFORE marking done):
Verify checklist:
□ All acceptance criteria met?
□ All files created/modified as specified?
□ LOG.md appended with execution record?
□ TASKS.md status updated correctly?
□ STATE.md reflects new truth (if applicable)?

### If ANY checkbox is unchecked:
- Task status remains: in_progress
- Log gap in LOG.md: "INCOMPLETE: [what's missing]"
- STOP immediately
- Do NOT claim completion

### Self-Audit Questions:
- Did I read the governance files first?
- Did I follow ALL steps in the prompt?
- Did I update ALL specified documentation?
- Can I prove completion with file evidence?

If answer to ANY question is "no" or "unsure": STOP and report gap.

## Minimal, Reversible Changes Only
All changes must be minimal and reversible. No speculative features. No refactors unless explicitly requested.

## No Judgment Language
Use observation-only framing. Describe what is, not what should be. Avoid evaluative language.

## Schema-First Mindset
JSON/Markdown are canonical artifacts. React is a viewport, not the product.

## Separation Rules
- Data/schema ≠ UI
- Domain configs ≠ code

## Deployment Integrity Rules
Changes must maintain deployment integrity. No breaking changes without explicit approval.

## BLOCKER Protocol

On ambiguity or blocking condition: classify + log + STOP.

### BLOCKER Classifications:
- **config** — Configuration issue (wrong port, missing env var, build settings)
- **code** — Code implementation issue (syntax error, logic bug, missing function)
- **data** — Data/schema issue (invalid JSON, missing file, malformed content)
- **unclear** — Ambiguous requirement or acceptance criteria needs clarification

### Format:
```
BLOCKER [classification]: [description]
Example: "File X not found at expected path Y"
Status: STOPPED — awaiting resolution
```

Do not proceed when uncertain. Log classification and STOP immediately.

## Doctrine Rules
- Observation-only framing
- Schema-first mindset
- Domain-as-config principle

## Housekeeping Protocol
Only invoke explicitly. Never proactively.

## STOP Requirement
End every execution with STOP.

## Role Governance
Agent roles, authority boundaries, and collaboration constraints are defined in `VIGGO_COLLAB.md`.
All agents operating under these rules must comply with that document in addition to this one.

## Prompt Structure Enforcement

All prompts to execution agents must include:

**Opening:**
```
1. Read order: [list governance files]
```

**Closing:**
```
X. VERIFY completion checklist before STOP:
   □ [specific deliverable 1]
   □ [specific deliverable 2]
   □ [documentation updated]

X+1. STOP
```

Prompts without verification checklists are incomplete.
