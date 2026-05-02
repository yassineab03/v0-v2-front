'use client';

import DashboardCard from '../DashboardCard';
import styles from './Deliverables.module.css';

interface Deliverable {
  id: string;
  name: string;
  dueDate: string;
  status: 'delivered' | 'pending' | 'overdue';
  progress: number;
}

const deliverables: Deliverable[] = [
  { id: '1', name: 'Rapport tests JUnit Sprint 1', dueDate: '2025-02-15', status: 'delivered', progress: 100 },
  { id: '2', name: 'Swagger API Documentation', dueDate: '2025-03-01', status: 'pending', progress: 60 },
  { id: '3', name: 'Docker Compose Final', dueDate: '2025-01-30', status: 'overdue', progress: 40 },
  { id: '4', name: 'Slides Soutenance PDF', dueDate: '2025-05-25', status: 'pending', progress: 20 },
];

export default function Deliverables() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return '✅';
      case 'pending':
        return '⏳';
      case 'overdue':
        return '⚠️';
      default:
        return '❓';
    }
  };

  return (
    <DashboardCard title="Deliverables" subtitle="Track deliverables" icon="📦">
      <div className={styles.deliverablesList}>
        {deliverables.map((deliverable) => (
          <div key={deliverable.id} className={`${styles.deliverableItem} ${styles[`status${deliverable.status}`]}`}>
            <div className={styles.deliverableInfo}>
              <div className={styles.deliverableHeader}>
                <h4 className={styles.deliverableName}>{deliverable.name}</h4>
                <span className={styles.statusIcon}>{getStatusIcon(deliverable.status)}</span>
              </div>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${deliverable.progress}%` }} />
                </div>
                <span className={styles.progressText}>{deliverable.progress}%</span>
              </div>
              <p className={styles.dueDate}>Due: {new Date(deliverable.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
