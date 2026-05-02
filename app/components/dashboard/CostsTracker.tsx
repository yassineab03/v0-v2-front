'use client';

import DashboardCard from '../DashboardCard';
import styles from './CostsTracker.module.css';

interface Cost {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  status: 'on-track' | 'warning' | 'over';
}

const costs: Cost[] = [
  { id: '1', name: 'ProjAI Platform', budgeted: 45000, spent: 32000, status: 'on-track' },
  { id: '2', name: 'E-Commerce Refonte', budgeted: 72000, spent: 18000, status: 'on-track' },
  { id: '3', name: 'API Gateway v2', budgeted: 28000, spent: 29500, status: 'over' },
];

export default function CostsTracker() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalBudgeted = costs.reduce((sum, c) => sum + c.budgeted, 0);
  const totalSpent = costs.reduce((sum, c) => sum + c.spent, 0);
  const totalPercentage = Math.round((totalSpent / totalBudgeted) * 100);

  return (
    <DashboardCard title="Costs Tracking" subtitle="Budget overview" icon="💰">
      <div className={styles.costsContainer}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Total Budgeted</span>
            <span className={styles.summaryValue}>{formatCurrency(totalBudgeted)}</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Total Spent</span>
            <span className={styles.summaryValue} style={{ color: totalPercentage > 100 ? '#ef4444' : 'var(--green)' }}>
              {formatCurrency(totalSpent)}
            </span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Utilization</span>
            <span className={`${styles.summaryValue} ${styles[`util${totalPercentage > 100 ? 'Over' : totalPercentage > 80 ? 'Warn' : 'Good'}`]}`}>
              {totalPercentage}%
            </span>
          </div>
        </div>

        <div className={styles.costsList}>
          {costs.map((cost) => {
            const percentage = Math.round((cost.spent / cost.budgeted) * 100);
            const diff = cost.budgeted - cost.spent;
            return (
              <div key={cost.id} className={`${styles.costItem} ${styles[`status${cost.status}`]}`}>
                <div className={styles.costHeader}>
                  <h4 className={styles.costName}>{cost.name}</h4>
                  <span className={styles.costStatus}>
                    {cost.status === 'on-track' ? '✅' : cost.status === 'warning' ? '⚠️' : '❌'}
                  </span>
                </div>

                <div className={styles.costProgress}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        background:
                          cost.status === 'on-track'
                            ? 'linear-gradient(90deg, var(--green), var(--green-light))'
                            : cost.status === 'warning'
                              ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                              : 'linear-gradient(90deg, #ef4444, #f87171)',
                      }}
                    />
                  </div>
                  <span className={styles.progressPercent}>{percentage}%</span>
                </div>

                <div className={styles.costMetrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Spent</span>
                    <span className={styles.metricValue}>{formatCurrency(cost.spent)}</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>{diff >= 0 ? 'Remaining' : 'Over'}</span>
                    <span className={`${styles.metricValue} ${diff < 0 ? styles.negative : ''}`}>
                      {formatCurrency(Math.abs(diff))}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardCard>
  );
}
