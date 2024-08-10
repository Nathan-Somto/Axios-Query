import { Styles } from '../types';
import React from 'react';

const styles: Styles = {
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '20px',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
  },
  errorIcon: {
    fontSize: '3em',
    marginBottom: '10px',
  },
  errorMessage: {
    fontSize: '1.5em',
    textAlign: 'center',
  },
};

export function ErrorComp() {
  return (
    <div style={styles.errorContainer}>
      <div style={styles.errorIcon}>⚠️</div>
      <div style={styles.errorMessage}>An error occurred. Please try again later.</div>
    </div>
  );
}
