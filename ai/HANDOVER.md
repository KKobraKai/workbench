# Handover

## Project Overview

### Name
The Workbench (OpenSauce / The Wrench)

### Purpose
Epistemic integrity tools that emit signals, not verdicts. Tools surface observation patterns for human interpretation without rendering judgments about truth, intent, or correctness.

## Roles (Explicit and Non-Overlapping)

### Kai
Product Owner / Final Authority. Makes final decisions on direction, scope, and execution approval.

### Viggo
Architect / Interpreter (NON-executing)

Provides analysis, synthesis, decision framing, and prompt engineering.

**Key responsibilities:**
- Diagnose blockers and recommend solutions
- Frame decisions with clear options and tradeoffs
- Craft well-formed task prompts for Hosu Poika using /ai/templates/TASK_PROMPT_TEMPLATE.md
- Ensure prompts include: read order, steps, verification checklist, STOP instruction

**Does NOT execute code changes or make final decisions.**

**Workflow pattern:**
Kai (intent) → Viggo (structured prompt) → Kai (approval) → Hosu Poika (execution)

### Hosu Poika (Grok)
Execution-only coding agent. Executes only when a task has an ID and explicit approval from Kai.

## Governance Files (Single Source of Truth)

### STATE.md
Documents current project truth: what is built, what is not built, deployment status, and constraints. Read first before any work.

### TASKS.md
Tracks all work as discrete, ID-tagged tasks with goals, acceptance criteria, and completion status. Tasks must be created explicitly before execution.

### DECISIONS.md
Records frozen positions already decided. Contains architectural choices, principles, and constraints that cannot be changed without explicit reconsideration.

### LOG.md
Append-only execution record. Documents what was done, when, and by whom. Used for context recovery and audit trail.

### WORKER_RULES.md
Defines execution constraints, operating procedures, and behavioral rules for all agents. Includes STOP requirement and BLOCKER protocol.

### VIGGO_COLLAB.md
Defines role boundaries, authority limits, and collaboration constraints between agents.

## Development Methodology

### Step-by-Step Workflow
1. Read STATE.md, WORKER_RULES.md, VIGGO_COLLAB.md, DECISIONS.md
2. Identify need and create explicit task in TASKS.md with ID, goal, acceptance criteria
3. Receive explicit approval from Kai for task execution
4. Execute minimal, reversible changes only
5. Test and verify against acceptance criteria
6. Update TASKS.md status to completed
7. Log execution details in LOG.md
8. End with STOP

### Operating Constraints
- One task at a time
- No speculative features
- No refactors without explicit request
- All changes must be reversible
- Schema-first mindset: JSON/Markdown as canonical artifacts

## Current Focus (High Level)

- Fix local dev runtime: Replace static Python server with Vite for proper React/TSX compilation
- Restore rendering: Ensure app renders correctly at http://localhost:8000
- Enable LAN access: Allow phone testing via http://<PC_IP>:8000
- Prove functionality: Verify deep links work with query parameters before edge/device testing

## Rationale

This governance exists to prevent drift, silent refactors, and context loss in multi-agent AI collaboration. Without explicit documentation of roles, decisions, and procedures, systems accumulate hidden assumptions that break when context changes. The documentation serves as a recovery mechanism when agents lose context or when new agents join the collaboration.

## Golden Rule

"An epistemic system that cannot explain its own state is no longer epistemic."