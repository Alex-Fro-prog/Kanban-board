import React, { useState } from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import AddCardButton from './AddCardButton';
import styles from './ModuleCSS/TaskList.module.css';

interface TaskListProps {
    title: string;
    tasks: Task[];
    addTask?: (title: string) => void;
    addTaskToReady?: () => void;
    addTaskToInProgress?: () => void;
    addTaskToFinished?: () => void;
    backlogTasks?: Task[];
    readyTasks?: Task[];
    inProgressTasks?: Task[];
    selectedTask?: number | null;
    setSelectedTask?: (id: number | null) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    title,
    tasks,
    addTask,
    addTaskToReady,
    addTaskToInProgress,
    addTaskToFinished,
    backlogTasks,
    readyTasks,
    inProgressTasks,
    selectedTask,
    setSelectedTask,
}) => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [isAddingBacklog, setIsAddingBacklog] = useState<boolean>(false);
    const [isAddingReady, setIsAddingReady] = useState<boolean>(false);
    const [isAddingInProgress, setIsAddingInProgress] = useState<boolean>(false);
    const [isAddingFinished, setIsAddingFinished] = useState<boolean>(false);

    const handleAddTask = () => {
        if (taskTitle.trim()) {
            addTask?.(taskTitle);
            setTaskTitle('');
            setIsAddingBacklog(false);
        }
    };

    const handleAddToReady = () => {
        if (selectedTask !== null) {
            addTaskToReady?.();
            resetState();
        }
    };

    const handleAddToInProgress = () => {
        if (selectedTask !== null) {
            addTaskToInProgress?.();
            resetState();
        }
    };

    const handleAddToFinished = () => {
        if (selectedTask !== null) {
            addTaskToFinished?.();
            resetState();
        }
    };

    const resetState = () => {
        setIsAddingBacklog(false);
        setIsAddingReady(false);
        setIsAddingInProgress(false);
        setIsAddingFinished(false);
        setSelectedTask?.(null);
    };

    return (
            <div className={styles.taskBlock}>
                <h2 className={styles.taskTitle}>{title}</h2>
                <ul className={styles.taskList}>
                    {tasks.map((task) => (
                        <li key={task.id} className={styles.taskItem}>
                            <TaskItem task={task} />
                        </li>
                    ))}
                </ul>

                {/* Логика для Backlog */}
                {title === "Backlog" && (
                    <div>
                        {!isAddingBacklog ? (
                            <AddCardButton onClick={() => setIsAddingBacklog(true)} disabled={false} />
                        ) : (
                            <div className={styles.taskInfo}>
                                <input
                                    type="text"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    placeholder="Введите название задачи"
                                />
                                <button className={styles.taskSubmit} onClick={handleAddTask} disabled={!taskTitle.trim()}>Submit</button>
                                <button className={styles.taskCancel} onClick={resetState}>Cancel</button>
                            </div>
                        )}
                    </div>
                )}

                {/* Логика для Ready */}
                {title === "Ready" && (
                    <div>
                        {isAddingReady && (
                            <div>
                                {backlogTasks && backlogTasks.length > 0 && (
                                    <select className={styles.taskSelect} value={selectedTask || ''} onChange={(e) => setSelectedTask?.(Number(e.target.value))}>
                                        <option value="" disabled>Выберите задание</option>
                                        {backlogTasks.map((task) => (
                                            <option key={task.id} value={task.id}>
                                                {task.title}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <button className={styles.taskSubmit} onClick={handleAddToReady} disabled={selectedTask === null}>Submit</button>
                                <button className={styles.taskCancel} onClick={resetState}>Cancel</button>
                            </div>
                        )}
                        <AddCardButton 
                            onClick={() => setIsAddingReady(!isAddingReady)} 
                            disabled={backlogTasks?.length === 0} 
                        />
                    </div>
                )}

                {/* Логика для In Progress */}
                {title === "In Progress" && (
                    <div>
                        {isAddingInProgress && (
                            <div>
                                {readyTasks && readyTasks.length > 0 && (
                                    <select className={styles.taskSelect} value={selectedTask || ''} onChange={(e) => setSelectedTask?.(Number(e.target.value))}>
                                        <option value="" disabled>Выберите задание</option>
                                        {readyTasks.map((task) => (
                                            <option key={task.id} value={task.id}>
                                                {task.title}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <button className={styles.taskSubmit} onClick={handleAddToInProgress} disabled={selectedTask === null}>Submit</button>
                                <button className={styles.taskCancel} onClick={resetState}>Cancel</button>
                            </div>
                        )}
                        <AddCardButton 
                            onClick={() => setIsAddingInProgress(!isAddingInProgress)} 
                            disabled={readyTasks?.length === 0} 
                        />
                    </div>
                )}

                {/* Логика для Finished */}
                {title === "Finished" && (
                    <div>
                        {isAddingFinished && (
                            <div>
                                {inProgressTasks && inProgressTasks.length > 0 && (
                                    <select className={styles.taskSelect} value={selectedTask || ''} onChange={(e) => setSelectedTask?.(Number(e.target.value))}>
                                        <option value="" disabled>Выберите задание</option>
                                        {inProgressTasks.map((task) => (
                                            <option key={task.id} value={task.id}>
                                                {task.title}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <button className={styles.taskSubmit} onClick={handleAddToFinished} disabled={selectedTask === null}>Submit</button>
                                <button className={styles.taskCancel}  onClick={resetState}>Cancel</button>
                            </div>
                        )}
                        <AddCardButton 
                            onClick={() => setIsAddingFinished(!isAddingFinished)} 
                            disabled={inProgressTasks?.length === 0} 
                        />
                    </div>
                )}
            </div>
    );
};

export default TaskList;