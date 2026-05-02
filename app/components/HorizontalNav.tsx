'use client';

import { useState } from 'react';
import styles from './HorizontalNav.module.css';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  description?: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: '📊', description: 'KPIs & Stats' },
  { id: 'projects', label: 'Projects', icon: '📁', description: 'Manage projects' },
  { id: 'kanban', label: 'Kanban', icon: '📋', description: 'Sprint board' },
  { id: 'risks', label: 'Risks', icon: '⚠️', description: 'Risk registry' },
  { id: 'deliverables', label: 'Deliverables', icon: '📦', description: 'Track deliverables' },
  { id: 'ai', label: 'AI Assistant', icon: '✨', description: 'Gemini insights' },
];

export default function HorizontalNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (id: string) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navContent}>
        <div className={styles.navItems}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
              onClick={() => onTabChange(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={styles.navItemContent}>
                <span className={styles.navIcon}>{item.icon}</span>
                <div className={styles.navTextGroup}>
                  <span className={styles.navLabel}>{item.label}</span>
                  {hoveredId === item.id && (
                    <span className={styles.navDesc}>{item.description}</span>
                  )}
                </div>
              </div>
              {activeTab === item.id && <div className={styles.activeIndicator} />}
            </button>
          ))}
        </div>

        <div className={styles.navDivider} />

        <div className={styles.navActions}>
          <button className={styles.navActionBtn} title="Settings">
            ⚙️
          </button>
          <button className={styles.navActionBtn} title="Profile">
            👤
          </button>
        </div>
      </div>
    </nav>
  );
}
