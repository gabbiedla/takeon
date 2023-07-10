import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const CreateEventButton = () => {
  return (
    // <div>CreateEventButton</div>
    <LinkContainer to="/add-event">
      <button className="new-event-button rounded border-0">Add Event</button>
    </LinkContainer>
  );
};

export default CreateEventButton;
