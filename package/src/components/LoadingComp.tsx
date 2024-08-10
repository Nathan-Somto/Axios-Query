import React from 'react';
import { Styles } from '../types';
import { injectKeyframes } from '../utils';
const styles: Styles = {
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTopColor: '#3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '10px',
    fontSize: '1.2em',
    color: '#3498db',
  },
  
};
export function LoadingComp() {
  React.useEffect(() => {
    injectKeyframes(); 
  }, []);
  return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <div style={styles.loadingText}>Loading...</div>
    </div>
  );
}
