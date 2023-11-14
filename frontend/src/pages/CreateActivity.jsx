import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CreateActivity = () => {
  const [activityData, setActivityData] = useState({
    name: '',
    date: '',
    location: '',
    url: '',
    time: '',
    capacity: '', // Default value
    category: '',
    user: null,
  });

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if the user is logged in (you can customize this based on your authentication logic)
    const isLoggedIn = !!localStorage.getItem('userInfo');
    if (!isLoggedIn) {
      // If user is not logged in, you may redirect them to the login page or show an error message
      console.error(
        'User is not logged in. Redirect to login page or show an error.'
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isLoggedIn = !!localStorage.getItem('userInfo');
      if (!isLoggedIn) {
        // If user is not logged in, you may redirect them to the login page or show an error message
        console.error(
          'User is not logged in. Redirect to login page or show an error.'
        );
        return;
      }

      // Log the activityData before making the POST request
      console.log('Submitting activity data:', activityData);

      // Make a POST request to your backend API to create the activity
      // const response = await axios.post('/api/activities', activityData);
      const response = await axios.post('/api/activities', activityData);

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

    // Log the time to check if it matches the expected format
    // if (name === 'time') {
    //   console.log('Entered time:', value);
    // }

    setActivityData({
      ...activityData,
      [name]: value,
    });
  };

  // Render the component content only if the user is logged in
  if (!userInfo) {
    // You may choose to display a message or handle the situation here
    return (
      <div>
        User is not logged in. Display a message or handle the situation.
      </div>
    );
  }
  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <Container className="activity-form-container rounded">
        <h4 className="form-title">Activity Details</h4>
        <label>Activity Name</label>
        <input
          type="text"
          name="name"
          value={activityData.name}
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={activityData.location}
          onChange={handleChange}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={activityData.date}
          onChange={handleChange}
        />

        <label>Time</label>
        <input
          type="text"
          name="time"
          value={activityData.time}
          onChange={handleChange}
        />

        <label>URL</label>
        <input
          type="text"
          name="url"
          value={activityData.url}
          onChange={handleChange}
        />

        <label>Accepting</label>
        <select
          name="capacity"
          value={activityData.capacity}
          onChange={handleChange}
        >
          <option value="group">Group</option>
          {[...Array(20).keys()].map((number) => (
            <option key={number + 1} value={String(number + 1)}>
              {number + 1}
            </option>
          ))}
        </select>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={activityData.category}
          onChange={handleChange}
        />
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
