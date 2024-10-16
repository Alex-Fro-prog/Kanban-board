import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import KanbanBoard from './components/KanbanBoard';
import TaskDetail from './pages/TaskDetail';
import UserMenu from './components/UserMenu';
import Footer from './components/Footer';
import { Task } from './types';
import styles from './components/ModuleCSS/App.module.css';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [backlogCount, setBacklogCount] = useState<number>(0);
  const [finishedCount, setFinishedCount] = useState<number>(0);

  // Обновляем задачи и подсчёты в зависимости от изменений
  const updateTaskCounts = (allTasks: Task[]) => {
    setTasks(allTasks);
    const backlogTasks = allTasks.filter(task => task.status === 'backlog').length;
    const finishedTasks = allTasks.filter(task => task.status === 'finished').length;
    setBacklogCount(backlogTasks);
    setFinishedCount(finishedTasks);
  };

  return (
    <div>
        <header className={styles.headerContainer}>
          <UserMenu />
        </header> 
        <main>
          <Routes>
            <Route path="/" element={<div className={styles.kanbanBoardContainer}><KanbanBoard updateTaskCounts={updateTaskCounts} /></div>} />
            <Route path="/tasks/:id" element={<div className={styles.taskDetailContainer}><TaskDetail tasks={tasks} /></div>} />
          </Routes>
        </main>
        <Footer
        backlogCount={tasks.filter(task => task.status === 'backlog').length}
        finishedCount={tasks.filter(task => task.status === 'finished').length}
        />
    </div>
  );
};

export default App;