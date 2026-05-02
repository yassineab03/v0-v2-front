'use client';

import { useState } from 'react';
import DashboardCard from '../DashboardCard';
import styles from './ProjectsManager.module.css';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  team: number;
  budget: string;
}

const projects: Project[] = [
  { id: '1', name: 'ProjAI Platform', status: 'active', progress: 68, team: 4, budget: '32k / 45k€' },
  { id: '2', name: 'E-Commerce Refonte', status: 'active', progress: 31, team: 6, budget: '18k / 72k€' },
  { id: '3', name: 'API Gateway v2', status: 'completed', progress: 100, team: 3, budget: '29.5k / 28k€' },
];

export default function ProjectsManager() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <DashboardCard
      title="Projects"
      subtitle="Active & completed projects"
      icon="📁"
      actionButton={{ label: '+ New Project', onClick: () => {} }}
    >
      <div className={styles.container}>
        <div className={styles.projectList}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${styles.projectItem} ${selectedProject.id === project.id ? styles.active : ''}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className={styles.projectInfo}>
                <h4 className={styles.projectName}>{project.name}</h4>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${project.progress}%` }} />
                </div>
                <p className={styles.projectMeta}>{project.progress}% • {project.team} members</p>
              </div>
              <span className={`${styles.statusBadge} ${styles[`status${project.status}`]}`}>
                {project.status === 'active' ? '🟢' : project.status === 'paused' ? '🟡' : '✅'}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.projectDetail}>
          <div className={styles.detailHeader}>
            <h3>{selectedProject.name}</h3>
            <span className={`${styles.statusBadge} ${styles[`status${selectedProject.status}`]}`}>
              {selectedProject.status.toUpperCase()}
            </span>
          </div>
          <div className={styles.detailMetrics}>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Budget</span>
              <span className={styles.metricValue}>{selectedProject.budget}</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Team Size</span>
              <span className={styles.metricValue}>{selectedProject.team} people</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Progress</span>
              <span className={styles.metricValue}>{selectedProject.progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
