import React, { useState } from 'react';
import Event from './Event';

const Day = ({
  day,
  events,
  currentMonth,
  currentYear,
  addNewEventHandler,
  editEventHandler,
  deleteEventHandler
}) => {
  const [newEvent, setNewEvent] = useState({
    id: '',
    name: '',
    time: '',
    invitees: '',
  });
  const [editEvent, setEditEvent] = useState(null);
  const [usedColors, setUsedColors] = useState([])

  // Get random colour
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
    const saturation = Math.floor(Math.random() * 30 + 70); // Random saturation between 70 and 100
    const lightness = Math.floor(Math.random() * 10 + 80); // Random lightness between 80 and 90

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    if(localStorage.events){
      JSON.parse(localStorage.events).forEach(event => {
        if (event.color === color) {
          // If it's a duplicate, generate a new color recursively
          return getRandomColor();
        }
      });
    }

    setUsedColors([...usedColors, color])
    return color
  };

  // Handle input change for new event
  const handleInputChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  // Handle new event submission
  const handleNewEventSubmit = (e) => {
    console.log("masuk ke sini")
    e.preventDefault();

    if (!localStorage.eventId) {
      localStorage.setItem("eventId", 1)
    } else {
      localStorage.setItem("eventId", parseInt(localStorage.eventId) + 1)
    }

    const event = {
      ...newEvent,
      id: localStorage.eventId,
      color: getRandomColor(),
      date: day,
      month: currentMonth,
      year: currentYear,
    };
    // Add new event logic
    console.log('New event:', event);
    addNewEventHandler(event)

    // Reset new event form
    setNewEvent({
      name: '',
      time: '',
      invitees: '',
    });
  };

  // Handle edit event
  const handleEditEvent = (editEvent) => {
    editEventHandler(editEvent);

    // Reset edit event state and new event form
    setEditEvent(null);
    setNewEvent({
      name: '',
      time: '',
      invitees: '',
    });
  };

  // Handle delete event
  const handleDeleteEvent = (event) => {
    // Delete event logic
    console.log('Deleted event:', event);
    deleteEventHandler(event)
  };

  // Render events for the day
  const renderEvents = () => {
    return events.map((event) => (
      <Event
        key={event.id}
        event={event}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    ));
  };

  return (
    <div className="day rounded p-2 mb-2 bg-white shadow-sm">
      <h4>{day}</h4>
      {renderEvents()}
      {events.length < 3 && (
        <form onSubmit={handleNewEventSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="time"
              className="form-control"
              placeholder="Event Time"
              value={newEvent.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="invitees"
              className="form-control"
              placeholder="Invitees (separated by commas)"
              value={newEvent.invitees}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark mt-2">
            Add Event
          </button>
        </form>
      )}
    </div>
  );
};

export default Day;
