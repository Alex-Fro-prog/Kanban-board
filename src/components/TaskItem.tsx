import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const navigate = useNavigate();
  
  const handleTaskClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div onClick={handleTaskClick} style={{ cursor: 'pointer' }}>
      <h3>{task.title}</h3>
    </div>
  );
};

export default TaskItem;