import React from 'react';
import { Container } from 'react-bootstrap';

const CreateEvent = () => {
  return (
    <form className="event-form">
      <Container className="event-form-container rounded">
        <h4 className="form-title ">Activity Details</h4>
        <label>Activity Name</label>
        <input type="text" name="eventName" />

        <label>Date </label>
        <input type="date" name="eventDate" />

        <label>Location</label>
        <input type="text" name="eventLocation" />

        <label>Time</label>
        <input type="Time" name="eventTime" />

        <label>Url </label>
        <input type="link" name="eventLink" />

        <label>Accepting</label>
        <select name="event-capactiy">
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="group">Group</option>
        </select>

        <input type="submit" value="Add" className="add-btn rounded border-0" />
      </Container>
    </form>
  );

  //   <div>CreateEvent</div>;
};

export default CreateEvent;
