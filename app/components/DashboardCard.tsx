'use client';

import styles from './DashboardCard.module.css';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: string;
  actionButton?: { label: string; onClick: () => void };
  children: React.ReactNode;
  fullHeight?: boolean;
  noPadding?: boolean;
}

export default function DashboardCard({
  title,
  subtitle,
  icon,
  actionButton,
  children,
  fullHeight = false,
  noPadding = false,
}: DashboardCardProps) {
  return (
    <div className={`${styles.card} ${fullHeight ? styles.fullHeight : ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleGroup}>
          {icon && <span className={styles.cardIcon}>{icon}</span>}
          <div>
            <h3 className={styles.cardTitle}>{title}</h3>
            {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
          </div>
        </div>
        {actionButton && (
          <button className={styles.cardActionBtn} onClick={actionButton.onClick}>
            {actionButton.label}
          </button>
        )}
      </div>

      <div className={`${styles.cardContent} ${noPadding ? styles.noPadding : ''}`}>
        {children}
      </div>
    </div>
  );
}
