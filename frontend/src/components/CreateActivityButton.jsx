import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const CreateActivityButton = () => {
  return (
    // <div>CreateEventButton</div>
    <LinkContainer to="/add-activity">
      <button className="new-activity-button rounded border-0">
        Add Activity
      </button>
    </LinkContainer>
  );
};

export default CreateActivityButton;
