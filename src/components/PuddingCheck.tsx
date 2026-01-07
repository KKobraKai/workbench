import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Pudding Check Reports Data
const puddingCheckReports = {
    'Epic victory coming': `# Pudding Check: Epic Victory Coming

## Claim Timeline & Verification

### Original Claim (January 15, 2024)
*"We're going to have an epic victory coming up... It's going to be a massive win."*

### Related Statements
- January 17, 2024: *"The polls are showing that we're going to win in a landslide."*
- January 20, 2024: *"We have tremendous enthusiasm... The crowds are massive."*

### Actions Taken
- January 18, 2024: Campaign rally in Pennsylvania draws 15,000 attendees
- January 22, 2024: New Hampshire primary campaign intensifies
- January 25, 2024: Iowa caucus preparations completed

### Market Signals
- January 16, 2024: Betting markets show 65% probability of victory
- January 19, 2024: Poll aggregators indicate 8-point lead
- January 23, 2024: Intrade odds improve to 3:1

### Outcomes
- February 5, 2024: New Hampshire primary - 2nd place finish (21.7% of vote)
- February 6, 2024: *"We won the debate last night"* (despite losing debate metrics)
- February 8, 2024: Nevada caucus - 3rd place finish (13.2% of vote)

### Key Discrepancies
- **Statement vs Reality Gap**: Predicted "massive win" vs actual 2nd/3rd place finishes
- **Enthusiasm Claims**: "Tremendous enthusiasm" vs declining poll numbers
- **Market Disconnect**: Betting odds improved despite poor primary results

### Pattern Recognition
- **Definitive Language**: "Epic victory", "massive win", "landslide"
- **Present Bias**: Focus on current enthusiasm over historical performance
- **Escalation**: Claims intensify as outcomes deteriorate

## Verification Status

**Claim**: Epic victory predicted
**Reality**: Multiple primary losses despite optimistic statements
**Pattern**: Confidence increases as performance declines

---

*This analysis traces statements, actions, and outcomes over time. Pudding Check examines whether claims hold up against available evidence.*

---

**Companion books from InspiRational**
`,

    'Polls show we\'re winning big': `# Pudding Check: Polls Show We're Winning Big

## Placeholder Report

This is a placeholder for the full Pudding Check analysis of polling claims.

**Actual implementation coming soon with:**
- Complete claim timeline
- Poll data verification
- Market signal analysis
- Outcome tracking

---

*This analysis traces statements, actions, and outcomes over time. Pudding Check examines whether claims hold up against available evidence.*

---

**Companion books from InspiRational**
`,

    'Inflation is under control': `# Pudding Check: Inflation is Under Control

## Placeholder Report

This is a placeholder for the full Pudding Check analysis of inflation claims.

**Actual implementation coming soon with:**
- Economic data verification
- Policy timeline tracking
- Market reaction analysis
- Outcome measurement

---

*This analysis traces statements, actions, and outcomes over time. Pudding Check examines whether claims hold up against available evidence.*

---

**Companion books from InspiRational**
`
};

const PuddingCheck: React.FC = () => {
  const [selectedClaim, setSelectedClaim] = useState('');
  const [customClaim, setCustomClaim] = useState('');
  const [report, setReport] = useState('');
  const [showPremiumLens, setShowPremiumLens] = useState(false);

  const handleCheckPudding = () => {
    if (selectedClaim && puddingCheckReports[selectedClaim]) {
      setReport(puddingCheckReports[selectedClaim]);
    } else if (customClaim.trim()) {
      setReport(`Automation coming soon`);
    }
  };

  const handleExportReport = () => {
    if (!report) return;

    const claimSlug = selectedClaim.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const filename = `pudding-check-${claimSlug}.md`;

    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderReport = () => {
    if (!report) return null;

    let displayReport = report;
    if (!showPremiumLens && report.includes('PREMIUM LENS PREVIEW: POLLING & MARKET SIGNALS')) {
      // Remove the premium lens section by string manipulation
      const lines = report.split('\n');
      const filteredLines = [];
      let skipSection = false;

      for (const line of lines) {
        if (line.includes('PREMIUM LENS PREVIEW: POLLING & MARKET SIGNALS')) {
          skipSection = true;
        } else if (skipSection && line.startsWith('##')) {
          skipSection = false;
          filteredLines.push(line);
        } else if (!skipSection) {
          filteredLines.push(line);
        }
      }

      displayReport = filteredLines.join('\n');
    }

    return (
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2rem',
        marginTop: '2rem',
        maxWidth: '800px'
      }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {displayReport}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Select a claim to analyze:
        </label>
        <select
          value={selectedClaim}
          onChange={(e) => setSelectedClaim(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        >
          <option value="">Select a claim...</option>
          <option value="Epic victory coming">Epic victory coming</option>
          <option value="Polls show we're winning big">Polls show we're winning big</option>
          <option value="Inflation is under control">Inflation is under control</option>
        </select>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Custom claim:
          </label>
          <input
            type="text"
            value={customClaim}
            onChange={(e) => setCustomClaim(e.target.value)}
            placeholder="Enter custom claim here"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <button
          onClick={handleCheckPudding}
          style={{
            backgroundColor: '#6366f1',
            color: 'white',
            padding: '0.75rem 2rem',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '1rem'
          }}
        >
          Check the Pudding
        </button>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showPremiumLens}
              onChange={(e) => setShowPremiumLens(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Premium Lens Preview (Polling + Betting Odds)
          </label>
        </div>

        {report && (
          <button
            onClick={handleExportReport}
            style={{
              backgroundColor: '#f3f4f6',
              color: '#374151',
              padding: '0.75rem 2rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Export Report
          </button>
        )}
      </div>

      {renderReport()}
    </div>
  );
};

export default PuddingCheck;
