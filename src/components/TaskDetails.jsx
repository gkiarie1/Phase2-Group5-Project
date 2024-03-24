import React, { useState } from 'react';
import tasksData from './db.json'; // Importing the JSON data

const TaskDetails = () => {
  const [taskDetails, setTaskDetails] = useState(null);

  const handleTaskClick = (task) => {
    setTaskDetails(task);
  };

  return (
    <div>
      <h1>Task Details</h1>
      <ul>
        {tasksData.map((task) => (
          <li key={task.id}>
            <button onClick={() => handleTaskClick(task)}>{task.taskName}</button>
          </li>
        ))}
      </ul>
      {taskDetails && (
        <div>
          <h2>{taskDetails.taskName}</h2>
          <p><strong>Task Details:</strong> {taskDetails.taskDetails}</p>
          <p><strong>Start Time:</strong> {taskDetails.startTime}</p>
          <p><strong>End Time:</strong> {taskDetails.endTime}</p>
          <p><strong>Importance:</strong> {taskDetails.importance}</p>
          <p><strong>Status:</strong> {taskDetails.status}</p>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
