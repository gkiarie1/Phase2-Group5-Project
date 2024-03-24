
import React, { useState } from 'react';
import CreateTask from './CreateTask';

function TaskList({ tasks, setTasks, importanceFilter, statusFilter, onImportanceChange, onStatusChange, onMarkAsCompleted }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
    setShowUpdateForm(true);
  };

  const handleMarkCompletedClick = async (taskId) => {
    try {
      const response = await fetch(`https://db-json-task-manager.onrender.com/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Completed' })
      });

      if (!response.ok) {
        throw new Error('Failed to mark task as completed');
      }

      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: 'Completed' };
        }
        return task;
      });
      setTasks(updatedTasks);
      onMarkAsCompleted(taskId);
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const handleDeleteClick = async (task) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this task?');

      if (!confirmDelete) {
        return; // Do nothing if the user cancels the deletion
      }

      const response = await fetch(`https://db-json-task-manager.onrender.com/tasks/${task.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      const updatedTasks = tasks.filter(t => t.id !== task.id);
      setTasks(updatedTasks);

      window.location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
    }

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

      <h2>Tasks</h2>
      <div>
        <label>
          Importance:
          <select value={importanceFilter} onChange={onImportanceChange}>
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          State:
          <select value={statusFilter} onChange={onStatusChange}>
            <option value="All">All</option>
            <option value="Pending">Todo</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </div>
      <ul className='tasks'>
        {tasks.map(task => (
          <li key={task.id}>
            <fieldset className='task-container'>
              <legend>{task.taskName}</legend>
              <p>Start Date: {task.startDate}</p>
              <p>Start Time: {task.startTime}</p>
              <p>Description: {task.taskDetails}</p>
              <p>Priority: {task.importance}</p>
              <p>Due Date: {task.endDate}</p>
              <p>Due Time: {task.endTime}</p>
              <p>Status: {task.status}</p>
              {showUpdateForm && selectedTask && selectedTask.id === task.id && (
                <>
                  {task.status !== 'Completed' && (
                    <button onClick={() => handleMarkCompletedClick(task.id)}>Mark as Completed</button>
                  )}
                  <button onClick={() => handleDeleteClick(task)}>Delete</button>
                </>
              )}
              <button onClick={() => handleUpdateClick(task)}>Update</button>
            </fieldset>
          </li>
        ))}
      </ul>
      
      {showUpdateForm && selectedTask && (
        <CreateTask
          isOpen={showUpdateForm}
          onToggle={() => setShowUpdateForm(false)}
          task={{
            task: selectedTask.taskName,
            taskDetails: selectedTask.taskDetails,
            startTime: selectedTask.startTime,
            endTime: selectedTask.endTime,
            importance: selectedTask.importance,

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