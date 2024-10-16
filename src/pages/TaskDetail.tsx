import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../types';
import styles from '../components/ModuleCSS/TaskDetail.module.css';


interface TaskDetailProps {
  tasks: Task[];
}

interface TaskDescription {
  id: number;
  description: string;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ tasks }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskId = Number(id);

  const getStoredTasks = (): Task[] => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const storedTasks = tasks.length ? tasks : getStoredTasks();
  const task = storedTasks.find((task) => task.id === taskId);
  
  console.log("Загруженные задачи:", storedTasks);
  console.log("Найденная задача:", task);

  const getSavedDescriptions = (): TaskDescription[] => {
    const storedDescriptions = localStorage.getItem('taskDescriptions');
    return storedDescriptions ? JSON.parse(storedDescriptions) : [];
  };

  const savedDescriptions = getSavedDescriptions();
  const savedDescription = savedDescriptions.find((desc) => desc.id === taskId);

  const [description, setDescription] = useState<string>(savedDescription?.description || task?.description || '');

  console.log("Начальное описание:", description);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    console.log("Изменено описание:", e.target.value);
  };

  const handleSave = () => {
    const updatedDescriptions = savedDescriptions.filter((desc) => desc.id !== taskId);
    updatedDescriptions.push({ id: taskId, description });
    localStorage.setItem('taskDescriptions', JSON.stringify(updatedDescriptions));

    console.log("Описание сохранено:", { id: taskId, description });
  };

  if (!task) {
    return <p>Задача не найдена</p>;
  }

  const handleBackToMain = () => {
    console.log("Возврат на главную страницу");
    navigate('/');
  };

  return (
    <div>
      <div className={styles.taskDetailContainer}>
        <div className={styles.taskDetailInfo}>
          <h2 className={styles.taskDetailTitle}>{task.title}</h2>
          <textarea className={styles.taskDetailText}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Введите описание задачи"
          />

          {/* Кнопка для сохранения описания */}
          <button className={styles.taskDetailSave} onClick={handleSave}>
            Сохранить описание
          </button>
        </div>
        
        {/* Кнопка возврата на главную страницу */}
        <button className={styles.taskDetailBackToMain} onClick={handleBackToMain}>
          ✖️ {/* Крестик */}
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;