import React from 'react';
import PuddingCheck from './PuddingCheck';

const MidtermWorkbench: React.FC = () => {
  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Midterm Workbench: Pudding Check
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          Trace related statements, actions, and outcomes over time
        </p>

        <PuddingCheck />
      </div>
    </div>
  );
};

export default MidtermWorkbench;
