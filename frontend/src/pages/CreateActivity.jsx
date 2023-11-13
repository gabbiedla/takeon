import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const CreateActivity = () => {
  const [activityData, setActivityData] = useState({
    activityName: '',
    activityDate: '',
    activityLocation: '',
    activityLink: '',
    activityTime: '',
    activityCapacity: '1', // Default value
    user: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API to create the activity
      const response = await axios.post('/api/activities', activityData);

      // Handle success or display an error message
      console.log('Activity created:', response.data);
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setActivityData({ ...activityData, [name]: value });
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`);
    setActivityData({
      ...activityData,
      [name]: value,
    });
  };

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <Container className="activity-form-container rounded">
        <h4 className="form-title">Activity Details</h4>
        <label>Activity Name</label>
        <input
          type="text"
          name="activityName"
          value={activityData.activityName}
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          type="text"
          name="activityLocation"
          value={activityData.activityLocation}
          onChange={handleChange}
        />

        <label>Date</label>
        <input
          type="date"
          name="activityDate"
          value={activityData.activityDate}
          onChange={handleChange}
        />

        <label>Time</label>
        <input
          type="time"
          name="activityTime"
          value={activityData.activityTime}
          onChange={handleChange}
        />

        <label>URL</label>
        <input
          type="text"
          name="activityLink"
          value={activityData.activityLink}
          onChange={handleChange}
        />

        <label>Accepting</label>
        <select
          name="activityCapacity"
          value={activityData.activityCapacity}
          onChange={handleChange}
        >
          <option value="group">Group</option>
          {[...Array(20).keys()].map((number) => (
            <option key={number + 1} value={String(number + 1)}>
              {number + 1}
            </option>
          ))}
        </select>
        {/* <select
          name="activityCapacity"
          value={activityData.activityCapacity}
          onChange={handleChange}
        >
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="group">Group</option>
        </select> */}

        <input type="submit" value="Add" className="add-btn rounded border-0" />
      </Container>
    </form>
  );
};

export default CreateActivity;

// const CreateActivity = () => {
//   return (
//     <form className="activity-form">
//       <Container className="activity-form-container rounded">
//         <h4 className="form-title ">Activity Details</h4>
//         <label>Activity Name</label>
//         <input type="text" name="activityName" />

//         <label>Date </label>
//         <input type="date" name="activityDate" />

//         <label>Location</label>
//         <input type="text" name="activityLocation" />

//         {/* <label>Time</label>
//         <input type="Time" name="activityTime" /> */}

//         <label>Url </label>
//         <input type="link" name="activityLink" />

//         <label>Accepting</label>
//         <select name="activity-capacity">
//           <option value="one">1</option>
//           <option value="two">2</option>
//           <option value="group">Group</option>
//         </select>

//         <input type="submit" value="Add" className="add-btn rounded border-0" />
//       </Container>
//     </form>
//   );

//   //   <div>CreateEvent</div>;
// };

// export default CreateActivity;
