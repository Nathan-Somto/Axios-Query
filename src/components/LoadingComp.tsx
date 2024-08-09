import React from 'react';
import './LoadingComp.css'; // Import the CSS file

export function LoadingComp() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
}
