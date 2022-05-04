import React from 'react';

export default function FullPageSpinner() {
  return (
    <div
      style={{
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#fff',
      }}
    >
      <div className="spinner-border text-dark position-absolute start-50">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
