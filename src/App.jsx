import React, { useState } from 'react';
import MidtermWorkbench from './components/MidtermWorkbench';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Read initial tab from URL
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    window.history.replaceState({}, '', `?${url.searchParams.toString()}`);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          The Workbench
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          Epistemic Integrity Tools · OpenSauce
        </p>

        {/* Navigation */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '◈' },
              { id: 'midterm', label: 'Midterm Workbench', icon: '🏛️' },
              { id: 'assessment', label: 'Trust Audit', icon: '◎' },
              { id: 'forensics', label: 'Forensics', icon: '◉' },
              { id: 'builder', label: 'Prompt Builder', icon: '◇' },
              { id: 'about', label: 'About & Methodology', icon: '◆' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#f1f5f9' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                  color: activeTab === tab.id ? '#6366f1' : '#64748b',
                  padding: '0.875rem 1.25rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  borderRadius: '8px 8px 0 0',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ opacity: 0.7 }}>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && (
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '20px',
            padding: '2.5rem',
            marginBottom: '2rem',
            color: '#ffffff',
            boxShadow: '0 10px 40px rgba(99, 102, 241, 0.2)'
          }}>
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: 700 }}>
              The Wrench Framework
            </h2>
            <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.9, maxWidth: '700px' }}>
              Based on <em>The Wrench: A Forensic Account of Epistemic Trust and Mechanical Failure</em>,
              this workbench provides tools for evaluating AI system reliability, identifying failure patterns,
              and constructing prompts that maintain structural integrity.
            </p>
          </div>
        )}

        {activeTab === 'midterm' && <MidtermWorkbench />}

        {activeTab === 'assessment' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Epistemic Trust Audit</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Trust audit functionality coming soon...</p>
          </div>
        )}

        {activeTab === 'forensics' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Conversation Forensics</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Forensic analysis functionality coming soon...</p>
          </div>
        )}

        {activeTab === 'builder' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Prompt Integrity Builder</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Prompt builder functionality coming soon...</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div style={{ maxWidth: '900px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>About & Methodology</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>About section coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;