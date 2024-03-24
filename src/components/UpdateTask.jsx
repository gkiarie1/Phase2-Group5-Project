import React, { useState } from 'react';
import CreateTask from './CreateTask';

const UpdateTask = ({ task, onUpdate, onDelete, onReschedule }) => {
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);

  const handleInputChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updatedTitle.trim()) return;
    onUpdate({ ...task, title: updatedTitle });
    setUpdatedTitle('');
  };

  const handleReschedule = () => {
    setShowRescheduleForm(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={updatedTitle}
          onChange={handleInputChange}
          placeholder="Update task title"
        />
        <button type="submit">Update Task</button>
      </form>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={handleReschedule}>Reschedule</button>
      {showRescheduleForm && (
        <CreateTask
          isOpen={true}
          onToggle={() => setShowRescheduleForm(false)}
          onCreate={onReschedule}
          defaultValues={{
            task: task.task,
            taskDetails: task.taskDetails,
            startTime: task.startTime,
            endTime: task.endTime,
            importance: task.importance
          }}
        />
      )}
    </div>
  );
};

export default UpdateTask;
