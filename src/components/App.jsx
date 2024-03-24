import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './TaskList';
import NavBar from './NavBar';
import AddButton from './AddButton';
import CreateTask from './CreateTask';
import LogIn from './LogIn';
import SignUp from './SignUp';
import DeleteTask from './DeleteTask';
import LogOut from './LogOut';
import MyCalendar from './MyCalendar';
import Reminder from './Reminder';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [importanceFilter, setImportanceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('https://db-json-task-manager.onrender.com/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
        setFilteredTasks(data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = tasks.filter(task =>
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleImportanceChange = (e) => {
    setImportanceFilter(e.target.value);
    filterTasks(e.target.value, statusFilter);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    filterTasks(importanceFilter, e.target.value);
  };

  const filterTasks = (importance, status) => {
    const filtered = tasks.filter(task => {
      if (importance !== 'All' && task.importance !== importance) {
        return false;
      }
      if (status !== 'All' && task.status !== status) {
        return false;
      }
      return true;
    });
    setFilteredTasks(filtered);
  };

  const handleCreateTask = (newTask) => {
    const currentTime = new Date().getTime();
    if (newTask.time > currentTime) {
      newTask.status = 'Pending';
    } else if (newTask.time === currentTime) {
      newTask.status = 'In Progress';
    } else {
      newTask.status = 'Completed';
    }
    setTasks([...tasks, newTask]);
    setFilteredTasks([...filteredTasks, newTask]);
  };

  const handleMarkAsCompleted = async (taskId) => {
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
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    return <Navigate to="/task-list" />;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear user-related data from local storage or any other storage mechanism
    // Example: localStorage.clear();
    return <Navigate to="/" />;
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://db-json-task-manager.onrender.com/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Router>
      <div>
        <NavBar onSearch={handleSearch} />
        <AddButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        {isOpen && (
          <CreateTask
            isOpen={isOpen}
            onToggle={() => setIsOpen(false)}
            onCreate={handleCreateTask}
          />
        )}
        <Routes>
          <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/delete-task" element={<DeleteTask />} />
          <Route path="/logout" element={<LogOut onLogout={handleLogout} />} />
          <Route
            path="/my-calendar"
            element={isAuthenticated ? <MyCalendar /> : <Navigate to="/login" />}
          />
          <Route
            path="/reminder"
            element={isAuthenticated ? <Reminder /> : <Navigate to="/login" />}
          />
          <Route
            path="/add"
            element={isAuthenticated ? <AddButton /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-task"
            element={isAuthenticated ? <CreateTask /> : <Navigate to="/login" />}
          />
          <Route
            path="/task-list"
            element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />}
          />
        </Routes>
        <div>
          <TaskList
            tasks={filteredTasks}
            setTasks={setTasks}
            importanceFilter={importanceFilter}
            statusFilter={statusFilter}
            onImportanceChange={handleImportanceChange}
            onStatusChange={handleStatusChange}
            onMarkAsCompleted={handleMarkAsCompleted}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
