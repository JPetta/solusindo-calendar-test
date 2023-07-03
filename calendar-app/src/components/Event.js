import React from 'react';
import swal from 'sweetalert2'

const Event = ({ event, onEdit, onDelete }) => {
  const { id, name, time, invitees, color, date, year, month } = event;

  const cardStyle = {
    backgroundColor: color,
  };

  const handleEditClick = () => {
    swal.fire({
      title: 'Add New Event',
      html: `
        <input id="name" class="swal2-input" placeholder="Event Name" value="${name}" required>
        <input id="time" class="swal2-input" placeholder="Event Time" value="${time}" required>
        <input id="invitees" class="swal2-input" placeholder="Invitees (separated by commas)" value="${invitees}" required>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = swal.getPopup().querySelector('#name').value;
        const time = swal.getPopup().querySelector('#time').value;
        const invitees = swal.getPopup().querySelector('#invitees').value;

        // Perform validation if needed

        const newEvent = {
          id,
          name,
          time,
          invitees,
          date,
          month,
          year,
        };

        // Add new event logic
        console.log('New event:', newEvent);
        onEdit(newEvent);
      }
    });
  }

  return (
    <div className="card shadow-sm event" style={cardStyle}>
      <div className="card-header p-0">.</div>
      <div className="card-body">
        <h5 className="card-text">  {name}  </h5>
        <p className="card-text">Time: {time}</p>
        <p className="card-text">Invitees: {invitees}</p>
        <button
          type="button"
          className="btn btn-sm btn-dark me-2"
          onClick={() => handleEditClick(event)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(event)}
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default Event;
