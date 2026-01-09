# Observation Report Schema v0.1

## Purpose

This schema represents the structure of observation reports that document recorded statements, actions, and outcomes over time.

The schema is used for encoding epistemic observations as structured data that can be rendered into reports, exported to various formats, and potentially consumed by future analysis tools.

The schema is consumed by UI components for display, export functions for report generation, and will serve as the data contract for future API services.

## Non-Goals

This schema does not perform truth adjudication, intent inference, moral judgment, prediction validation, or "fact checking."

The schema does not encode conclusions about veracity, honesty, or correctness. It does not support judgments about whether claims are true or false.

The schema does not support inference of motivation, intent, or psychological states. It records what was observed, not why it occurred.

The schema does not support moral or ethical evaluations of observed behavior.

The schema does not validate predictions against outcomes. It records both predictions and outcomes as separate observations.

## Schema Versioning Rules

Schema versions follow semantic versioning format: v{major}.{minor}

v0.x versions are considered unstable and may include breaking changes.

Backward compatibility is expected within minor versions (e.g., v1.0 to v1.1).

Breaking changes require incrementing the major version number.

Schema versions are declared in the report_metadata.schema_version field.

## Canonical Structure (Field Definitions)

### report_metadata
Container for report-level information.

### schema_version
Version identifier following versioning rules above.

### generated_at
Timestamp when the report was generated.

### domain
Category of observation (elections, ai, media, etc.).

### scope / timeframe
Time period covered by the observations.

### current_claim
Container for the primary claim being examined.

### claim_text
Text of the claim as recorded.

### source
Origin of the claim if known.

### date
When the claim was made.

### rhetorical_signals (list, optional)
List of observed rhetorical patterns present in the claim text.

### timeline
Sequence of observations over time.
Each entry contains:

#### date
When the observation occurred.

#### type
Category of observation (statement, action, outcome).

#### description
Neutral description of what was observed.

#### context
Additional context about the observation.

#### source_reference
Reference to the source of the observation.

#### signals
List of patterns or indicators observed in this entry.

### patterns
Analysis of recurring patterns across the timeline.
Each pattern contains:

#### pattern_type
Category of pattern observed.

#### description
Neutral description of the pattern.

#### supporting_timeline_entries
References to timeline entries that exhibit this pattern.

#### support_strength
Numeric value from 0 to 1 indicating the proportion of timeline entries that support this pattern observation.

### metadata
Additional information about the observation process.

### source_count_by_tier
Count of sources by reliability tier.

### coverage_estimate
Estimate of how comprehensively the claim has been examined.

### data_gaps
Documented areas where observation data is incomplete or unavailable.

## Quantification Guardrails

Quantification is permitted for observation coverage, pattern support strength, and data completeness estimates.

Quantification is not permitted for truth values, intent assessment, or deception detection.

Numeric fields must be accompanied by clear documentation explaining what they measure and their limitations.

Support strength values represent pattern coverage across observations, not truth probability.

Coverage estimates represent data completeness, not claim validity.

All quantified values are explicitly documented as measurements of observation scope, not truth adjudication.

## Observation-Only Language Rules

### Allowed phrasing
"observed", "recorded", "appears in record", "found in sources", "timeline shows", "pattern detected", "data indicates"

### Disallowed phrasing
"false", "lied", "proved wrong", "deceptive", "intentional", "should have", "ought to", "correct", "incorrect", "valid", "invalid"

Language must describe what was observed without evaluating truth, intent, or morality.

All descriptions must be factual and verifiable against the recorded data.

## Forward Compatibility Notes

This schema could later support real-time data streams by adding update timestamps and incremental observation entries.

The schema could be rendered into Markdown reports, PDF documents, and interactive UI visualizations.

The schema could be produced by automated analysis services that scan multiple data sources and extract observations according to these rules.