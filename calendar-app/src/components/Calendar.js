import React, { useState } from 'react';
import Day from './Day';
import eventsData from '../data/events.json';

const Calendar = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // const jsonData = JSON.stringify(eventsData)
  const eventsLocal = JSON.parse(localStorage.events ? localStorage.events : JSON.stringify([{}]))

  const [render, setRender] = useState({})
  const [eventId, setEventId] = useState(localStorage.eventId)

  // Generate an array of days in the current month
  const getDaysInMonth = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const events = eventsLocal.filter(
        (event) =>
          event.date === i &&
          event.month === currentMonth &&
          event.year === currentYear
      );
      days.push(
        <Day
          key={i}
          day={i}
          events={events}
          currentMonth={currentMonth}
          currentYear={currentYear}
          addNewEventHandler={addNewEvent}
          editEventHandler={editEvent}
          deleteEventHandler={deleteEvent}
        />
      );
    }
    return days;
  };

  const addNewEvent = (event) => {
    console.log(event)
    let newData = [...eventsLocal, event]
    localStorage.setItem('events', JSON.stringify(newData));

    setRender({})
  }

  const editEvent = (event) => {
    console.log("masuk ke updateEventData")
    let updatedData = eventsLocal.map(ev =>
      event.id === ev.id ? event : ev
    )
    console.log(updatedData)
    localStorage.setItem('events', JSON.stringify(updatedData));
    setRender({})
  };
  
  const deleteEvent = (event) => {
    console.log("masuk ke deleteEvent")
    let updatedData = eventsLocal.filter(ev => {
      return ev.id !== event.id
    })
    localStorage.setItem('events', JSON.stringify(updatedData));
    setRender({})
  }

  return <div className="calendar" >{getDaysInMonth()}</div>;
};

export default Calendar;
