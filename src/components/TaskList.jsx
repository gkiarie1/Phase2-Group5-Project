import React, { useState, useEffect } from 'react';
import DeleteTask from './DeleteTask';
import AddButton from './AddButton';
import CreateTask from './CreateTask';

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return new Date(date).toLocaleDateString('en-US', options);
};

const TaskList = ({ tasks, onCreate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleDelete = (taskToDelete) => {
    const updatedTasks = taskList.filter(task => task.id !== taskToDelete.id);
    setTaskList(updatedTasks);
    onDelete(taskToDelete);
  };

  return (
    <div>
      <h2>Task List</h2>
      <AddButton
        text="Add Task"
        onClick={() => setIsOpen(true)}
      />
      <ul className="task-list">
        {taskList.map((task) => (
          <li key={task.id} className={`task-item__${task.status}`}>
            <div>{task.task}</div>
            <div>{task.taskDetails}</div>
            <div>{formatDate(task.startTime)}</div>
            <div>{formatDate(task.endTime)}</div>
            <div>{task.importance}</div>
            <DeleteTask onDelete={() => handleDelete(task)} task={task} />
          </li>
        ))}
      </ul>
      {isOpen && (
        <CreateTask
          isOpen={isOpen}
          onToggle={() => setIsOpen(false)}
          onCreate={(task) => {
            onCreate(task);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;