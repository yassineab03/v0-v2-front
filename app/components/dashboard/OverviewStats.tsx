'use client';

import DashboardCard from '../DashboardCard';
import styles from './OverviewStats.module.css';

export default function OverviewStats() {
  const stats = [
    { label: 'Active Projects', value: '2', icon: '📊', color: 'green' },
    { label: 'Total Tasks', value: '24', icon: '✅', color: 'blue' },
    { label: 'Risks Identified', value: '4', icon: '⚠️', color: 'amber' },
    { label: 'Budget Used', value: '71%', icon: '💰', color: 'purple' },
  ];

  return (
    <DashboardCard title="Overview" subtitle="Key metrics at a glance" icon="📊">
      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} className={`${styles.statItem} ${styles[`color${stat.color}`]}`}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
