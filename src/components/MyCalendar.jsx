import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CreateTask from './CreateTask'; 

const localizer = momentLocalizer(moment);

function MyCalendar({ events, onEventClick }) {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDay(slotInfo.start);
    setShowCreateTaskForm(true);
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={onEventClick}
      />
      {showCreateTaskForm && (
        <CreateTask
          isOpen={true}
          onToggle={() => setShowCreateTaskForm(false)}
          onCreate={(newTask) => {
            console.log('New Task:', newTask);
            setShowCreateTaskForm(false);
          }}
          defaultValues={{
            startDate: moment(selectedDay).format('YYYY-MM-DD'),
            endDate: moment(selectedDay).format('YYYY-MM-DD'),
            startTime: moment(selectedDay).format('HH:mm'),
            endTime: moment(selectedDay).add(1, 'hour').format('HH:mm'),
            importance: 'Medium', 
          }}
        />
      )}
    </div>
  );
}

export default MyCalendar;
