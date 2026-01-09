import React, { useState } from 'react';
import PuddingCheck from './PuddingCheck';
import ObservationReportViewer from './ObservationReportViewer';

const MidtermWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pudding');

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Midterm Workbench
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          Election observation tools and demo reports
        </p>

        {/* Sub-tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <button
              onClick={() => setActiveTab('pudding')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'pudding' ? '#f1f5f9' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'pudding' ? '2px solid #6366f1' : '2px solid transparent',
                color: activeTab === 'pudding' ? '#6366f1' : '#64748b',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            >
              Pudding Check
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'reports' ? '#f1f5f9' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'reports' ? '2px solid #6366f1' : '2px solid transparent',
                color: activeTab === 'reports' ? '#6366f1' : '#64748b',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            >
              Demo Reports
            </button>
          </div>
        </div>

        {activeTab === 'pudding' && (
          <div style={{ maxWidth: '800px' }}>
            <PuddingCheck />
          </div>
        )}

        {activeTab === 'reports' && (
          <ObservationReportViewer />
        )}
      </div>
    </div>
  );
};

export default MidtermWorkbench;
