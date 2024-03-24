import React from 'react';

const DeleteTask = ({ task, onDelete }) => {
  const handleDelete = async () => {
    try {
      await fetch(`https://db-json-task-manager.onrender.com/tasks/${task.id}`, {
        method: 'DELETE',
      });

      onDelete(task);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <button
      type="button"
      className="delete-btn"
      onClick={handleDelete}
    >
      Delete Task
    </button>
  );
};

export default DeleteTask;