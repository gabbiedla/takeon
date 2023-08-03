import React from 'react';
import { Container } from 'react-bootstrap';

const CreateActivity = () => {
  return (
    <form className="activity-form">
      <Container className="activity-form-container rounded">
        <h4 className="form-title ">Activity Details</h4>
        <label>Activity Name</label>
        <input type="text" name="activityName" />

        <label>Date </label>
        <input type="date" name="activityDate" />

        <label>Location</label>
        <input type="text" name="activityLocation" />

        {/* <label>Time</label>
        <input type="Time" name="activityTime" /> */}

        <label>Url </label>
        <input type="link" name="activityLink" />

        <label>Accepting</label>
        <select name="activity-capacity">
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

export default CreateActivity;
