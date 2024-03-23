import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskDetails from './TaskDetails';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://db-json-task-manager.onrender.com/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks', error));
  }, []);

  return (
    <div>
      <h1 className='header'>Task Buddy</h1>
      <p className='comment'>This is just a demo. We promise the final project will look great.</p>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
