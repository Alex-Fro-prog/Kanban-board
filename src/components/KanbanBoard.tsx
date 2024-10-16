import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import { Task } from '../types';

interface KanbanBoardProps {
    updateTaskCounts: (allTasks: Task[]) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ updateTaskCounts }) => {
    const [backlogTasks, setBacklogTasks] = useState<Task[]>([]);
    const [readyTasks, setReadyTasks] = useState<Task[]>([]);
    const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
    const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<number | null>(null);

    useEffect(() => {
        const loadTasks = () => {
            const savedBacklog = localStorage.getItem('backlogTasks');
            const savedReady = localStorage.getItem('readyTasks');
            const savedInProgress = localStorage.getItem('inProgressTasks');
            const savedFinished = localStorage.getItem('finishedTasks');
            
            const loadedBacklog = savedBacklog ? JSON.parse(savedBacklog) : [];
            const loadedReady = savedReady ? JSON.parse(savedReady) : [];
            const loadedInProgress = savedInProgress ? JSON.parse(savedInProgress) : [];
            const loadedFinished = savedFinished ? JSON.parse(savedFinished) : [];

            setBacklogTasks(loadedBacklog);
            setReadyTasks(loadedReady);
            setInProgressTasks(loadedInProgress);
            setFinishedTasks(loadedFinished);

            updateTaskCounts([...loadedBacklog, ...loadedReady, ...loadedInProgress, ...loadedFinished]);
        };

        loadTasks();
    }, []);

    useEffect(() => {
        localStorage.setItem('backlogTasks', JSON.stringify(backlogTasks));
        localStorage.setItem('readyTasks', JSON.stringify(readyTasks));
        localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks));
        localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));

        updateTaskCounts([...backlogTasks, ...readyTasks, ...inProgressTasks, ...finishedTasks]);
    }, [backlogTasks, readyTasks, inProgressTasks, finishedTasks]);

    const addTask = (title: string) => {
        const newTask: Task = { id: Date.now(), title, description: '', status: 'backlog' };
        setBacklogTasks([...backlogTasks, newTask]);
        console.log("Задача добавлена в Backlog:", newTask);
    };

    const addTaskToReady = () => {
        if (selectedTask !== null) {
            const taskToAdd = backlogTasks.find(task => task.id === selectedTask);
            if (taskToAdd) {
                setReadyTasks([...readyTasks, { ...taskToAdd, status: 'ready' }]);
                setBacklogTasks(backlogTasks.filter(task => task.id !== selectedTask));
                setSelectedTask(null);
                console.log("Задача перемещена в Ready:", taskToAdd);
            }
        }
    };

    const addTaskToInProgress = () => {
        if (selectedTask !== null) {
            const taskToAdd = readyTasks.find(task => task.id === selectedTask);
            if (taskToAdd) {
                setInProgressTasks([...inProgressTasks, { ...taskToAdd, status: 'in-progress' }]);
                setReadyTasks(readyTasks.filter(task => task.id !== selectedTask));
                setSelectedTask(null);
                console.log("Задача перемещена в In Progress:", taskToAdd);
            }
        }
    };

    const addTaskToFinished = () => {
        if (selectedTask !== null) {
            const taskToAdd = inProgressTasks.find(task => task.id === selectedTask);
            if (taskToAdd) {
                setFinishedTasks([...finishedTasks, { ...taskToAdd, status: 'finished' }]);
                setInProgressTasks(inProgressTasks.filter(task => task.id !== selectedTask));
                setSelectedTask(null);
                console.log("Задача перемещена в Finished:", taskToAdd);
            }
        }
    };

    return (
        <div>
            <TaskList
                title="Backlog"
                tasks={backlogTasks}
                addTask={addTask}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
            />
            <TaskList
                title="Ready"
                tasks={readyTasks}
                backlogTasks={backlogTasks}
                addTaskToReady={addTaskToReady}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
            />
            <TaskList
                title="In Progress"
                tasks={inProgressTasks}
                readyTasks={readyTasks}
                addTaskToInProgress={addTaskToInProgress}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
            />
            <TaskList
                title="Finished"
                tasks={finishedTasks}
                inProgressTasks={inProgressTasks}
                addTaskToFinished={addTaskToFinished}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
            />
        </div>
    );
};

export default KanbanBoard;