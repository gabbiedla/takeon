import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting activity data:', activityData); // Log the form data before submission

    // Validate time format
    // const timeRegex = /^(0?[1-9]|1[0-2]|0?[1-9]:[0-5][0-9])\s?(AM|PM)$/i;
    // if (!timeRegex.test(activityData.time)) {
    //   console.error(
    //     'Invalid time format. Please enter time in HH:MM AM/PM format.'
    //   );
    //   return;
    // }

    try {
      const isLoggedIn = !!localStorage.getItem('userInfo');
      if (!isLoggedIn) {
        // If user is not logged in, you may redirect them to the login page or show an error message
        console.error(
          'User is not logged in. Redirect to login page or show an error.'
        );
        return;
      }

      // // Format the date in the desired format ("yyyy-MM-dd")
      // const formattedDate = new Date(activityData.date)
      //   .toISOString()
      //   .split('T')[0];

      // // Create a new object with the formatted date
      // const requestData = {
      //   ...activityData,
      //   date: formattedDate,
      // };

      // Format the date in the desired format ("yyyy-MM-dd")
      const formattedDate = new Date(activityData.date)
        .toISOString()
        .split('T')[0];

      // Create a new object with the formatted date
      const requestData = {
        ...activityData,
        date: formattedDate,
      };

      console.log('Submitting activity data:', requestData);

      // Make a POST request to create the activity
      // const response = await axios.post('/api/activities', requestData);
      const response = await axios.post('/api/activities', activityData);

      // Log the activityData before making the POST request
      console.log('Submitting activity data:', activityData);

      // Make a POST request to your backend API to create the activity
      // const response = await axios.post('/api/activities', activityData);
      // const response = await axios.post('/api/activities', activityData);

      console.log('Activity created:', response.data);
      // After successfully creating the activity, navigate back to "/"
      console.log('Before navigate');
      navigate('/');
      console.log('After navigate');
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  // const handleChange = (e) => {
  //   // const { name, value } = e.target;
  //   // setActivityData({ ...activityData, [name]: value });
  //   const { name, value } = e.target;
  //   console.log(`Setting ${name} to ${value}`);

  //   // Log the time to check if it matches the expected format
  //   // if (name === 'time') {
  //   //   console.log('Entered time:', value);
  //   // }

  //   setActivityData({
  //     ...activityData,
  //     [name]: value,
  //   });
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(`Setting ${name} to ${value}`);

  //   // Format the date if the input field is for the date
  //   const formattedValue =
  //     name === 'date' ? new Date(value).toISOString() : value;

  //   setActivityData({
  //     ...activityData,
  //     [name]: formattedValue,
  //   });
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(`Setting ${name} to ${value}`);

  //   // Format the date if the input field is for the date
  //   const formattedValue = name === 'date' ? value.split('T')[0] : value;

  //   setActivityData({
  //     ...activityData,
  //     [name]: formattedValue,
  //   });
  // };
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
