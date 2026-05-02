'use client';

import DashboardCard from '../DashboardCard';
import styles from './RisksRegistry.module.css';

interface Risk {
  id: string;
  description: string;
  probability: number;
  impact: number;
  status: 'identified' | 'ongoing' | 'mitigated' | 'closed';
}

const risks: Risk[] = [
  { id: '1', description: 'Indisponibilité API Gemini', probability: 2, impact: 5, status: 'ongoing' },
  { id: '2', description: 'Dépassement planning (2 mois)', probability: 3, impact: 4, status: 'identified' },
  { id: '3', description: 'Réponses IA incorrectes JSON', probability: 3, impact: 3, status: 'mitigated' },
  { id: '4', description: 'Mauvaise intégration front/back', probability: 2, impact: 3, status: 'closed' },
];

export default function RisksRegistry() {
  const getCriticality = (p: number, i: number) => {
    const score = p * i;
    if (score >= 10) return 'critical';
    if (score >= 6) return 'high';
    return 'medium';
  };

  return (
    <DashboardCard title="Risks Registry" subtitle="Risk management & mitigation" icon="⚠️">
      <div className={styles.risksList}>
        {risks.map((risk) => {
          const criticality = getCriticality(risk.probability, risk.impact);
          const score = risk.probability * risk.impact;
          return (
            <div key={risk.id} className={`${styles.riskItem} ${styles[`criticality${criticality}`]}`}>
              <div className={styles.riskMain}>
                <div className={styles.riskHeader}>
                  <h4 className={styles.riskDescription}>{risk.description}</h4>
                  <span className={`${styles.riskScore} ${styles[`score${criticality}`]}`}>{score}</span>
                </div>
                <div className={styles.riskMetrics}>
                  <div className={styles.metricBadge}>
                    <span className={styles.metricLabel}>P:</span>
                    <span className={styles.metricVal}>{risk.probability}</span>
                  </div>
                  <div className={styles.metricBadge}>
                    <span className={styles.metricLabel}>I:</span>
                    <span className={styles.metricVal}>{risk.impact}</span>
                  </div>
                </div>
              </div>
              <span className={`${styles.statusBadge} ${styles[`status${risk.status}`]}`}>
                {risk.status === 'identified' ? '🔵' : risk.status === 'ongoing' ? '🟠' : risk.status === 'mitigated' ? '🟢' : '⚪'}
              </span>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
