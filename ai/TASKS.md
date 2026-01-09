# Tasks

## Completed Tasks

### Pudding Check MVP
- **Goal**: Static claim verification reports for political/media claims
- **Acceptance Criteria**: React component with sample reports, export functionality
- **Status**: completed

### Canonical schema + AI control plane setup
- **Goal**: Create AI control-plane documentation (WORKER_RULES.md, STATE.md, TASKS.md, DECISIONS.md, LOG.md)
- **Acceptance Criteria**: All five files created under /ai with correct content
- **Status**: completed

### SCHEMA-OBSERVATION-REPORT-v0.1
- **Goal**: Define Observation Report Schema v0.1 as read-only, schema-first specification
- **Acceptance Criteria**: Schema document created with all required sections
- **Status**: completed

### SCHEMA-OBSERVATION-REPORT-VALIDATION-v0.1
- **Goal**: Define schema validation and invariants charter for v0.1
- **Acceptance Criteria**: Validation charter document created with all required sections
- **Status**: completed

### TASK_GOVERNANCE_ENFORCEMENT_PROTOCOLS_V0_1
- **Goal**: Add self-enforcement mechanisms to WORKER_RULES to prevent skipped steps
- **Acceptance Criteria**: WORKER_RULES.md contains Execution Verification Protocol with checklists
- **Status**: completed

### TASK_CREATE_PROMPT_TEMPLATE_V0_1
- **Goal**: Create standard template for well-formed task prompts
- **Acceptance Criteria**: /ai/templates/TASK_PROMPT_TEMPLATE.md exists with structure, checklist, and examples
- **Status**: completed

### TASK_RESTORE_LOG_MD_V0_1
- **Goal**: Restore missing LOG.md and append base path fix record
- **Acceptance Criteria**: LOG.md exists with header and recent append, committed
- **Status**: completed

## Active Tasks

### TASK_FIX_REACT_MODULE_LOADING_V0_1
- **Goal**: Fix React module system mismatch causing require() errors
- **Acceptance Criteria**: index.html uses type="module" for Vite entry point only
- **Status**: completed

### TASK_VERIFY_MODULE_LOADING_FIX_V0_1
- **Goal**: Verify that the React module loading fix resolves the blank screen issue
- **Acceptance Criteria**: Valid report URLs render content instead of blank screens or errors
- **Status**: pending

## Future Tasks

### Midterm 2026 Lens
- **Goal**: Election-focused claim tracing and verification
- **Acceptance Criteria**: TBD
- **Status**: pending

### Schema v1.0
- **Goal**: Canonical JSON schemas for all data structures
- **Acceptance Criteria**: TBD
- **Status**: pending

### SCHEMA-OBSERVATION-REPORT-v0.2
- **Goal**: TBD
- **Acceptance Criteria**: TBD
- **Status**: pending

### SCHEMA-OBSERVATION-REPORT-VALIDATION-v0.2
- **Goal**: TBD
- **Acceptance Criteria**: TBD
- **Status**: pending

### TASK_GOVERNANCE_RECON_TEMPLATES
- **Goal**: Create reusable templates for common recon patterns
- **Acceptance Criteria**: `/ai/templates/RECON_TEMPLATE.md` created with standard sections for config/routing/inventory checks
- **Status**: pending
- **Priority**: Low (only needed if recon becomes frequent)

### TASK_GOVERNANCE_DECISION_MARKERS
- **Goal**: Standardize decision point flagging in Viggo responses
- **Acceptance Criteria**: VIGGO_COLLAB.md updated with decision marker format (🔴 DECISION REQUIRED: [context])
- **Status**: pending
- **Priority**: Low (quality-of-life improvement)

### TASK_GOVERNANCE_BLOCKER_AUDIT
- **Goal**: Review existing LOG.md entries and reclassify any blockers with new system
- **Acceptance Criteria**: All historical blockers categorized (if any exist)
- **Status**: pending
- **Priority**: Low (retrospective cleanup)

### TASK_DEPLOY_PRODUCTION_TO_GITHUB_V0_1
- **Goal**: Commit and push production-ready code to GitHub for Pages deployment
- **Acceptance Criteria**: Code pushed to GitHub main branch with commit hash, LOG.md and STATE.md updated with deployment status
- **Status**: completed

### TASK_FIX_GITHUB_PAGES_BASE_PATH_V0_1
- **Goal**: Add Vite base path configuration for GitHub Pages subdirectory deployment
- **Acceptance Criteria**: vite.config.js contains base: '/workbench/', production build verified, pushed to GitHub main
- **Status**: completed

### Automation
- **Goal**: Backend infrastructure for live claim analysis
- **Acceptance Criteria**: TBD
- **Status**: pending
