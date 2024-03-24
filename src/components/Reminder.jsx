import React, { useState } from 'react';

function Reminder() {
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const handleDateChange = (e) => {
    setReminderDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setReminderTime(e.target.value);
  };

  const handleSetReminder = () => {
    const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
    
    const timeDiff = reminderDateTime - new Date();
    
    // Schedule an alert when the reminder time is reached
    setTimeout(() => {
      alert('Reminder: It is time to start your task!');
    }, timeDiff);
    

    console.log('Reminder set for:', reminderDateTime);
    
    // Clear the inputs after setting the reminder
    setReminderDate('');
    setReminderTime('');
  };

  return (
    <div>
      <h2>Set Reminder</h2>
      <div>
        <label>Date:</label>
        <input type="date" value={reminderDate} onChange={handleDateChange} />
      </div>
      <div>
        <label>Time:</label>
        <input type="time" value={reminderTime} onChange={handleTimeChange} />
      </div>
      <button onClick={handleSetReminder}>Set Reminder</button>
    </div>
  );
}

export default Reminder;
