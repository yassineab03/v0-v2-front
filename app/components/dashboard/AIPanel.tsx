'use client';

import { useState } from 'react';
import DashboardCard from '../DashboardCard';
import styles from './AIPanel.module.css';

export default function AIPanel() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const handleAnalyze = () => {
    setRunning(true);
    setDone(false);
    setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, 2500);
  };

  return (
    <DashboardCard title="AI Assistant" subtitle="Gemini-powered insights" icon="✨" fullHeight>
      <div className={styles.aiContainer}>
        <div className={styles.aiContent}>
          <div className={styles.aiIntro}>
            <p className={styles.aiText}>
              {!running && !done && 'Ready to analyze your project specifications?'}
              {running && 'Analyzing CDC with Gemini...'}
              {done && 'Analysis complete! Review the insights below.'}
            </p>
          </div>

          {!running && !done && (
            <div className={styles.aiButtons}>
              <button className={styles.analyzeBtn} onClick={handleAnalyze}>
                🚀 Analyze CDC
              </button>
              <button className={styles.secondaryBtn}>
                📖 View History
              </button>
            </div>
          )}

          {running && (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner} />
              <p className={styles.loadingText}>Processing with Gemini...</p>
            </div>
          )}

          {done && (
            <div className={styles.resultsState}>
              <div className={styles.resultItem}>
                <span className={styles.resultIcon}>📊</span>
                <div className={styles.resultContent}>
                  <h4>Estimated Effort</h4>
                  <p>14 days total • Medium complexity</p>
                </div>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultIcon}>⚡</span>
                <div className={styles.resultContent}>
                  <h4>Key Milestones</h4>
                  <p>3 major phases identified</p>
                </div>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultIcon}>⚠️</span>
                <div className={styles.resultContent}>
                  <h4>Risk Assessment</h4>
                  <p>2 high-level risks flagged</p>
                </div>
              </div>
              <button className={styles.newAnalysisBtn} onClick={handleAnalyze}>
                🔄 New Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
