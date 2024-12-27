import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const CreateActivityButton = () => {
  return (
    // <div>CreateEventButton</div>
    <LinkContainer className="ga4-create-event-btn" to="/add-activity">
      <button className="new-activity-button rounded border-0 fs-8 fw-bold">
        Create Event
      </button>
    </LinkContainer>
  );
};

export default CreateActivityButton;
