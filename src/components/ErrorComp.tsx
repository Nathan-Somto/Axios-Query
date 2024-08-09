import React from 'react';
import './ErrorComp.css'; // Import the CSS file

export function ErrorComp() {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <div className="error-message">An error occurred. Please try again later.</div>
    </div>
  );
}