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
          }}
        />
      )}
    </div>
  );
}

export default TaskList;
