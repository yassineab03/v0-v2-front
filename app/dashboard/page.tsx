'use client';

import { useState } from 'react';
import HorizontalNav from '@/app/components/HorizontalNav';
import DashboardHeader from '@/app/components/DashboardHeader';
import OverviewStats from '@/app/components/dashboard/OverviewStats';
import ProjectsManager from '@/app/components/dashboard/ProjectsManager';
import KanbanBoard from '@/app/components/dashboard/KanbanBoard';
import RisksRegistry from '@/app/components/dashboard/RisksRegistry';
import Deliverables from '@/app/components/dashboard/Deliverables';
import AIPanel from '@/app/components/dashboard/AIPanel';
import CostsTracker from '@/app/components/dashboard/CostsTracker';
import styles from './dashboard-new.module.css';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <OverviewStats />
            <ProjectsManager />
            <Deliverables />
            <AIPanel />
            <CostsTracker />
          </>
        );
      case 'projects':
        return (
          <>
            <ProjectsManager />
            <CostsTracker />
          </>
        );
      case 'kanban':
        return <KanbanBoard />;
      case 'risks':
        return <RisksRegistry />;
      case 'deliverables':
        return <Deliverables />;
      case 'ai':
        return <AIPanel />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <HorizontalNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.dashboardContent}>
        <DashboardHeader 
          title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
          subtitle="Manage your projects efficiently"
        />

        <div className={styles.gridContainer}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
