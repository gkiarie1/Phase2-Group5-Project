import React, { useState } from 'react';

const CreateTask = ({ isOpen, onToggle, onCreate }) => {
  const [form, setForm] = useState({
    taskName: '',
    taskDetails: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    importance: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.taskName || !form.startDate || !form.endDate || !form.taskDetails) {
      alert('Please fill in all required fields');
      return;
    }

    const newTask = {
      ...form,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

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
            taskName: '',
            taskDetails: '',
            startDate: '',
            startTime: '',
            endDate: '',
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
    <form className="create-task-modal" onSubmit={handleSubmit}>
      {isOpen && (
        <>
          <h2>Create Task</h2>
          <div>
            <label htmlFor="taskName">Task Name:</label>
            <input
              id="taskName"
              type="text"
              name="taskName"
              value={form.taskName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="taskDetails">Task Details:</label>
            <textarea
              id="taskDetails"
              name="taskDetails"
              value={form.taskDetails}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={form.startDate}
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
            <label htmlFor="endDate">End Date:</label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={form.endDate}
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
            <select
              name="importance"
              value={form.importance}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="add-task-btn"
            disabled={
              !form.taskName ||
              !form.startDate ||
              !form.endDate ||
              !form.taskDetails
            }
          >
            {isOpen ? 'Save Task' : 'Add Task'}
          </button>
          <button type="button" onClick={onToggle}>Close</button>
        </>
      )}
    </form>
  );
};

export default CreateTask;
