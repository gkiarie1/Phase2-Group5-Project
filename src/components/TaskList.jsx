import React from 'react';

function TaskList({ tasks }) {
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <fieldset>
              <legend>{task.taskName}</legend>
              <p>Start Date: {task.startTime}</p>
              <p>Due Date: {task.endTime}</p>
              <p>Description: {task.taskDetails}</p>
              <p>Priority: {task.importance}</p>
            </fieldset>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
