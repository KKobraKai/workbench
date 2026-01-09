# Observation Report Schema Validation Charter v0.1

## Purpose

This charter defines validation rules for Observation Report Schema v0.1 compliance.

Validation exists to ensure structural consistency and observation-only integrity across all implementations and uses of the schema.

Validation assesses whether reports conform to the schema structure and observation-only principles, not whether they evaluate truth, correctness, or intent.

This charter is used by human reviewers, AI workers creating reports, and future automated validation tooling.

## Invariant Rules (Hard Constraints)

The following are HARD INVARIANTS that must never be violated:

### Required Fields
All top-level objects in SCHEMA_OBSERVATION_REPORT_v0.1.md must be present.

### Schema Version
Every report must declare a schema_version field that matches a valid version format.

### Observation-Only Language
All text fields must comply with the Observation-Only Language Rules defined in the schema. No judgmental language is permitted.

### No Judgmental Fields
Reports must not contain fields that encode truth judgments, intent inferences, or moral evaluations.

### Timeline Immutability
Once recorded, timeline entries must not be modified. New entries may be added, but existing entries remain unchanged.

### Type Constraints
Fields marked as specific types (date, type enumeration, numeric ranges) must conform to those constraints.

### Pattern Support Bounds
Support strength values must be numeric between 0 and 1 inclusive.

## Soft Constraints (Allowed Imperfections)

The following are NON-FATAL conditions that are allowed but should be flagged:

### Missing Sources
Timeline entries may lack source_reference fields, but this should generate a coverage warning.

### Incomplete Timelines
Reports may have sparse timeline coverage, but this should generate a completeness warning.

### Low Coverage Estimates
Coverage estimates below defined thresholds should generate warnings about observation scope.

### Sparse Pattern Support
Patterns with support strength below defined thresholds should generate warnings about pattern reliability.

### Data Gaps Documentation
Undocumented data gaps should generate warnings about transparency.

## Evolution Rules

Schema changes that add new optional fields may occur within minor versions (e.g., v0.1 to v0.2).

Changes that modify existing field definitions or remove fields require a major version bump.

Schema evolution must be additive until v1.0 - no fields may be removed or redefined in incompatible ways.

Deprecations must be explicitly documented with migration guidance and sunset timelines.

Breaking changes to invariant rules require a new major version of this validation charter.

## Validation Outcomes (Conceptual)

### Conformant
Report meets all hard invariants and has no soft constraint violations.

### Conformant with Warnings
Report meets all hard invariants but has one or more soft constraint flags.

### Non-Conformant (Schema Violation)
Report violates one or more hard invariants and cannot be considered valid.

Validation outcomes do not evaluate the correctness, truth value, or intent of the observations. They assess only structural and linguistic compliance with the schema.

## Relationship to Implementations

UI components must validate reports before display and must not display non-conformant reports.

Export functions must validate reports before generation and must not produce output from non-conformant reports.

Future backend services must validate input reports and must reject non-conformant submissions.

No implementation may "fix" or modify reports to achieve compliance. Invalid reports must be rejected or flagged for human review.

## Forward Compatibility Notes

This charter enables automated validation tooling that can programmatically check reports against these rules.

The charter supports cross-domain reuse by maintaining domain-neutral validation criteria.

The charter enables external trust by providing transparent, enforceable standards that media organizations and academic researchers can adopt.