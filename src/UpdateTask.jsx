import React from "react";
import React, { useState } from 'react';

const UpdateTask = ({ task, onUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState(task.title);

  const handleInputChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updatedTitle.trim()) return;
    onUpdate({ ...task, title: updatedTitle });
    setUpdatedTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={updatedTitle}
        onChange={handleInputChange}
        placeholder="Update task title"
      />
      <button type="submit">Update Task</button>
    </form>
  );
};






export default UpdateTask;