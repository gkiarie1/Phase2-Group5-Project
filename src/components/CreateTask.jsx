import React, { useState } from 'react';

const CreateTask = ({ isOpen, onToggle, onCreate }) => {
  const [form, setForm] = useState({
    task: '',
    taskDetails: '',
    startTime: '',
    endTime: '',
    importance: '',
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.task || !form.startTime || !form.endTime || !form.taskDetails) {
      alert('Please fill in all required fields');
      return;
    }

    const newTask = {
      ...form,
      id: Date.now(), // Generates a unique ID for the new task
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('newTask:', newTask);

    fetch('https://db-json-task-manager.onrender.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Task saved:', newTask);

          onCreate(newTask);

          setForm({
            task: '',
            taskDetails: '',
            startTime: '',
            endTime: '',
            importance: '',
          });

          onToggle();
        } else {
          throw new Error('Failed to save task');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to save task');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isOpen && (
        <>
          <h2>Create Task</h2>
          <div>
            <label htmlFor="task">Task:</label>
            <input
              id="task"
              type="text"
              name="task"
              value={form.task}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="taskDetails">Task Details:</label><textarea
id="taskDetails"
              name="taskDetails"
              value={form.taskDetails}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="startTime">Start Time:</label>
            <input
              id="startTime"
              type="datetime-local"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time:</label>
            <input
              id="endTime"
              type="datetime-local"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="importance">Importance:</label>
            <select name="importance" value={form.importance} onChange={handleChange} required>
              <option value=""></option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="add-task-btn"
            disabled={!form.task || !form.startTime || !form.endTime || !form.taskDetails}
          >
            {isOpen ? 'Save Task' : 'Add Task'}
          </button>
        </>
      )}
    </form>
);
};

export default CreateTask;