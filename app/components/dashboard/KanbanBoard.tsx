'use client';

import { useState } from 'react';
import DashboardCard from '../DashboardCard';
import styles from './KanbanBoard.module.css';

interface Task {
  id: string;
  title: string;
  type: 'task' | 'bug' | 'feature';
  assignee: string;
  points: number;
}

const initialTasks = {
  todo: [
    { id: '1', title: 'Fix login redirect bug', type: 'bug' as const, assignee: 'Y.A', points: 2 },
    { id: '2', title: 'Module Registre Risques', type: 'feature' as const, assignee: 'A.G', points: 5 },
  ],
  inProgress: [
    { id: '3', title: 'Board Kanban UI', type: 'feature' as const, assignee: 'A.G', points: 8 },
    { id: '4', title: 'Intégration Gemini API', type: 'task' as const, assignee: 'S.E', points: 5 },
  ],
  done: [
    { id: '5', title: 'Setup Auth JWT', type: 'task' as const, assignee: 'Y.A', points: 3 },
    { id: '6', title: 'Docker Compose setup', type: 'task' as const, assignee: 'S.E', points: 3 },
  ],
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId: string, from: keyof typeof tasks, to: keyof typeof tasks) => {
    if (from === to) return;
    const task = tasks[from].find((t) => t.id === taskId);
    if (!task) return;
    setTasks({
      ...tasks,
      [from]: tasks[from].filter((t) => t.id !== taskId),
      [to]: [...tasks[to], task],
    });
  };

  const Column = ({ title, status, taskList }: { title: string; status: keyof typeof tasks; taskList: Task[] }) => (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h4 className={styles.columnTitle}>{title}</h4>
        <span className={styles.taskCount}>{taskList.length}</span>
      </div>
      <div className={styles.columnTasks}>
        {taskList.map((task) => (
          <div key={task.id} className={`${styles.task} ${styles[`type${task.type}`]}`}>
            <div className={styles.taskTop}>
              <span className={styles.taskType}>{task.type === 'bug' ? '🐛' : task.type === 'feature' ? '✨' : '✓'}</span>
              <span className={styles.taskPoints}>{task.points}pts</span>
            </div>
            <p className={styles.taskTitle}>{task.title}</p>
            <div className={styles.taskFooter}>
              <span className={styles.assignee}>{task.assignee}</span>
              {status !== 'done' && (
                <button
                  className={styles.moveBtn}
                  onClick={() => {
                    const next = status === 'todo' ? 'inProgress' : 'done';
                    moveTask(task.id, status, next as keyof typeof tasks);
                  }}
                >
                  →
                </button>
              )}
            </div>
          </div>
        ))}
        {taskList.length === 0 && <div className={styles.emptyState}>No tasks</div>}
      </div>
    </div>
  );

  return (
    <DashboardCard title="Kanban Board" subtitle="Sprint tasks management" icon="📋" fullHeight>
      <div className={styles.kanbanContainer}>
        <Column title="To Do" status="todo" taskList={tasks.todo} />
        <Column title="In Progress" status="inProgress" taskList={tasks.inProgress} />
        <Column title="Done" status="done" taskList={tasks.done} />
      </div>
    </DashboardCard>
  );
}
