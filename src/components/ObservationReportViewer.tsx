import React, { useState, useEffect } from 'react';

interface TimelineEntry {
  date: string;
  type: string;
  description: string;
  context?: string;
  source_reference?: string;
  signals?: string[];
}

interface Pattern {
  pattern_type: string;
  description: string;
  supporting_timeline_entries: number[];
  support_strength: number;
}

interface ReportData {
  report_metadata: {
    schema_version: string;
    generated_at: string;
    domain: string;
    scope: {
      timeframe: string;
      description: string;
    };
  };
  current_claim: {
    claim_text: string;
    source?: string;
    date?: string;
    rhetorical_signals?: string[];
  };
  timeline: TimelineEntry[];
  patterns: Pattern[];
  metadata: {
    sources_checked?: number;
    is_demo?: boolean;
    notes?: string;
    data_gaps?: string[];
  };
  source_count_by_tier?: Record<string, number>;
  coverage_estimate?: number;
  data_gaps?: string[];
}

const REPORT_OPTIONS = [
  { id: 'elections_midterm_claim_example', label: 'Elections: Midterm Claim' },
  { id: 'media_claim_example', label: 'Media: Policy Impact' },
  { id: 'ai_output_example', label: 'AI: Quantum Computing' }
];

const ObservationReportViewer: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle URL parameters for share links
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reportParam = urlParams.get('report');
    if (reportParam && REPORT_OPTIONS.some(opt => opt.id === reportParam)) {
      setSelectedReport(reportParam);
    }
  }, []);

  // Update URL when report changes
  useEffect(() => {
    if (selectedReport) {
      const url = new URL(window.location.href);
      url.searchParams.set('report', selectedReport);
      window.history.replaceState({}, '', url.toString());
    }
  }, [selectedReport]);

  // Load report data
  useEffect(() => {
    if (!selectedReport) {
      setReportData(null);
      return;
    }

    setLoading(true);
    setError('');

    fetch(`/reports/${selectedReport}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load report');
        }
        return response.json();
      })
      .then(data => {
        // Basic validation
        const requiredFields = ['report_metadata', 'current_claim', 'timeline', 'patterns', 'metadata'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
          throw new Error(`Invalid report data: Missing required fields: ${missingFields.join(', ')}`);
        }

        setReportData(data);
      })
      .catch(err => {
        setError(err.message);
        setReportData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedReport]);

  const copyShareLink = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {
        // Fallback: select text in input
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.body.removeChild(input);
      });
    } else {
      // Fallback: select text in input
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.body.removeChild(input);
    }
  };

  const exportJSON = () => {
    if (!reportData) return;

    const dataStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `observation-report-${selectedReport}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportMarkdown = () => {
    if (!reportData) return;

    let markdown = `# Observation Report\n\n`;
    markdown += `**Domain:** ${reportData.report_metadata.domain}\n\n`;
    markdown += `**Generated:** ${new Date(reportData.report_metadata.generated_at).toLocaleString()}\n\n`;
    markdown += `**Schema Version:** ${reportData.report_metadata.schema_version}\n\n`;

    markdown += `## Current Claim\n\n`;
    markdown += `${reportData.current_claim.claim_text}\n\n`;
    if (reportData.current_claim.source) {
      markdown += `**Source:** ${reportData.current_claim.source}\n\n`;
    }
    if (reportData.current_claim.date) {
      markdown += `**Date:** ${reportData.current_claim.date}\n\n`;
    }

    markdown += `## Timeline\n\n`;
    reportData.timeline.forEach((entry, index) => {
      markdown += `### ${index + 1}. ${entry.type.charAt(0).toUpperCase() + entry.type.slice(1)} - ${new Date(entry.date).toLocaleDateString()}\n\n`;
      markdown += `${entry.description}\n\n`;
      if (entry.context) markdown += `**Context:** ${entry.context}\n\n`;
      if (entry.source_reference) markdown += `**Source:** ${entry.source_reference}\n\n`;
      if (entry.signals && entry.signals.length > 0) {
        markdown += `**Signals:** ${entry.signals.join(', ')}\n\n`;
      }
    });

    markdown += `## Patterns\n\n`;
    reportData.patterns.forEach(pattern => {
      markdown += `### ${pattern.pattern_type}\n\n`;
      markdown += `${pattern.description}\n\n`;
      markdown += `**Support Strength:** ${(pattern.support_strength * 100).toFixed(0)}%\n\n`;
      markdown += `**Timeline References:** ${pattern.supporting_timeline_entries.map(i => i + 1).join(', ')}\n\n`;
    });

    markdown += `## Metadata\n\n`;
    if (reportData.metadata.sources_checked) {
      markdown += `**Sources Checked:** ${reportData.metadata.sources_checked}\n\n`;
    }
    if (reportData.metadata.is_demo) {
      markdown += `**Demo Report:** Yes\n\n`;
      markdown += `**Notes:** ${reportData.metadata.notes || 'Demo data for illustration purposes'}\n\n`;
    }
    if (reportData.coverage_estimate) {
      markdown += `**Coverage Estimate:** ${(reportData.coverage_estimate * 100).toFixed(0)}%\n\n`;
    }

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `observation-report-${selectedReport}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>
          Demo Reports Viewer
        </h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Explore sample observation reports conforming to the canonical schema
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
          Select Report:
        </label>
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem',
            backgroundColor: 'white'
          }}
        >
          <option value="">Choose a report...</option>
          {REPORT_OPTIONS.map(option => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
      </div>

      {selectedReport && (
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={copyShareLink}
            style={{
              backgroundColor: '#f3f4f6',
              color: '#374151',
              padding: '0.75rem 1.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            Copy Share Link
          </button>
          {reportData && (
            <>
              <button
                onClick={exportJSON}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  marginRight: '1rem'
                }}
              >
                Export JSON
              </button>
              <button
                onClick={exportMarkdown}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Export Markdown
              </button>
            </>
          )}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
          Loading report...
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          padding: '1rem',
          marginBottom: '2rem',
          color: '#dc2626'
        }}>
          <strong>Invalid report data:</strong> {error}
        </div>
      )}

      {reportData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Current Claim */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.25rem' }}>Current Claim</h3>
            <blockquote style={{
              borderLeft: '4px solid #6366f1',
              paddingLeft: '1rem',
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              color: '#1e293b',
              fontStyle: 'italic'
            }}>
              "{reportData.current_claim.claim_text}"
            </blockquote>
            {reportData.current_claim.source && (
              <p style={{ margin: '0.5rem 0', color: '#64748b' }}>
                <strong>Source:</strong> {reportData.current_claim.source}
              </p>
            )}
            {reportData.current_claim.date && (
              <p style={{ margin: '0.5rem 0', color: '#64748b' }}>
                <strong>Date:</strong> {reportData.current_claim.date}
              </p>
            )}
          </div>

          {/* Timeline */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.25rem' }}>Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reportData.timeline.map((entry, index) => (
                <div key={index} style={{
                  border: '1px solid #f1f5f9',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: '#f8fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{
                      backgroundColor: entry.type === 'statement' ? '#dbeafe' : entry.type === 'action' ? '#dcfce7' : '#fef3c7',
                      color: entry.type === 'statement' ? '#1e40af' : entry.type === 'action' ? '#166534' : '#92400e',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{entry.description}</p>
                  {entry.context && (
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#64748b' }}>
                      <strong>Context:</strong> {entry.context}
                    </p>
                  )}
                  {entry.source_reference && (
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#64748b' }}>
                      <strong>Source:</strong> {entry.source_reference}
                    </p>
                  )}
                  {entry.signals && entry.signals.length > 0 && (
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#64748b' }}>
                      <strong>Signals:</strong> {entry.signals.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Patterns */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.25rem' }}>Detected Patterns</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 600, color: '#1e293b' }}>Pattern Type</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 600, color: '#1e293b' }}>Description</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 600, color: '#1e293b' }}>Support</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 600, color: '#1e293b' }}>Timeline Refs</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.patterns.map((pattern, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.75rem', color: '#1e293b', fontWeight: 500 }}>{pattern.pattern_type}</td>
                      <td style={{ padding: '0.75rem', color: '#64748b' }}>{pattern.description}</td>
                      <td style={{ padding: '0.75rem', color: '#1e293b', fontWeight: 500 }}>
                        {(pattern.support_strength * 100).toFixed(0)}%
                      </td>
                      <td style={{ padding: '0.75rem', color: '#64748b' }}>
                        {pattern.supporting_timeline_entries.map(i => i + 1).join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Metadata */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.25rem' }}>Report Metadata</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {reportData.metadata.sources_checked && (
                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Sources Checked</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>{reportData.metadata.sources_checked}</div>
                </div>
              )}
              {reportData.coverage_estimate && (
                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Coverage Estimate</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>{(reportData.coverage_estimate * 100).toFixed(0)}%</div>
                </div>
              )}
              {reportData.metadata.is_demo && (
                <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', border: '1px solid #f59e0b' }}>
                  <div style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '0.25rem' }}>Demo Report</div>
                  <div style={{ fontSize: '0.9rem', color: '#92400e' }}>{reportData.metadata.notes}</div>
                </div>
              )}
            </div>
            {(reportData.data_gaps || reportData.metadata.data_gaps) && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1rem' }}>Data Gaps</h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#64748b' }}>
                  {(reportData.data_gaps || reportData.metadata.data_gaps || []).map((gap, index) => (
                    <li key={index}>{gap}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ObservationReportViewer;