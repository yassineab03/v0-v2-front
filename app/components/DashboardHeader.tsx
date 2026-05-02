'use client';

import { useState } from 'react';
import styles from './DashboardHeader.module.css';

export default function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <h1 className={styles.headerTitle}>{title}</h1>
        {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
      </div>

      <div className={styles.headerRight}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search projects, tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <div className={styles.headerStats}>
          <div className={styles.statBadge}>
            <span className={styles.statLabel}>Active Projects</span>
            <span className={styles.statValue}>2</span>
          </div>
          <div className={styles.statBadge}>
            <span className={styles.statLabel}>Sprint Progress</span>
            <span className={styles.statValue}>68%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
