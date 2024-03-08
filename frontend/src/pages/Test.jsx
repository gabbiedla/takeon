// Assuming this code is in a file named App.js
import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ExternalActivities from '../components/ExternalActivities';
import { useParams } from 'react-router-dom'; // Assuming you use React Router for routing
import axios from 'axios';

const Test = () => {
  const { username } = useParams();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      console.log('Fetching activities for username:', username); // Log username before fetching activities
      try {
        const response = await axios.get(`/api/users/${username}`);
        // Extract the activities from the response data
        const { activities } = response.data;
        setActivities(activities); // Assuming activities are returned under 'activities' key in response data
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (username) {
      fetchActivities();
    }
  }, [username]);

  return (
    <>
      <Container className="home-heading">
        <h1 className="calendar-title">Gabbie's Calendar</h1>
      </Container>
      <Row className="activity-container">
        {activities.map((activity) => (
          <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
            <ExternalActivities activity={activity} />
          </Col>
        ))}
      </Row>
    </>
    // <div>
    //   <h1>User Activities</h1>
    //   <ul>
    //     {activities.map((activity) => (
    //       <li key={activity._id}>{activity}</li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default Test;

//______

// // UserActivityPage.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Test = () => {
//   const { username } = useParams();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`/api/users/${username}`);
//         setUserData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [username]);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : userData ? (
//         <div>
//           <h1>User Profile</h1>
//           <p>Name: {userData.user.name}</p>
//           <p>Username: {userData.user.username}</p>
//           <p>Email: {userData.user.email}</p>
//           <p>Location: {userData.user.location}</p>
//           <h2>Activities</h2>
//           <ul>
//             {userData.activities.map((activity) => (
//               <li key={activity._id}>
//                 {activity.name} - {activity.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>User not found</p>
//       )}
//     </div>
//   );
// };

// export default Test;

// import React, { useState, useEffect } from 'react';
// import { useFetchActivitiesByUsernameQuery } from '../api/usersApiSlice';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Test = () => {
//   const { username } = useParams();
//   const {
//     data: activities,
//     isLoading,
//     isError,
//   } = useFetchActivitiesByUsernameQuery(username);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching activities</div>;
//   }

//   // const [activities, setActivities] = useState([]);
//   // const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchActivities = async () => {
//   //     try {
//   //       const response = await axios.get(`/users/${username}`);
//   //       setActivities(response.data.activities);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error('Error fetching activities:', error);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchActivities();
//   // }, [username]);

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   return (
//     <div>
//       <h1>Activities for {username}</h1>
//       <ul>
//         {activities.map((activity) => (
//           <li key={activity._id}>
//             <p>Name: {activity.name}</p>
//             <p>Location: {activity.location}</p>
//             <p>Date: {activity.date}</p>
//             <p>Time: {activity.time}</p>
//             {/* Add more details as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Test;

// const { username } = useParams();
// const [userId, setUserId] = useState(null);
// const [activities, setActivities] = useState([]);

// useEffect(() => {
//   const fetchUserId = async () => {
//     try {
//       const response = await axios.get(`/users/${username}`); // Assuming the endpoint to fetch userId is /users/{username}
//       setUserId(response.data._id);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//     }
//   };

//   if (username) {
//     fetchUserId();
//   }
// }, [username]);

// useEffect(() => {
//   const fetchActivities = async () => {
//     try {
//       if (userId) {
//         const response = await axios.get(`/users/user/${username}`);
//         setActivities(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching activities:', error);
//     }
//   };

//   fetchActivities();
// }, [userId]);

// useEffect(() => {
//   const fetchActivities = async () => {
//     try {
//       const response = await axios.get(`/users/user/${username}`);
//       setActivities(response.data);
//     } catch (error) {
//       console.error('Error fetching activities:', error);
//     }
//   };

//   fetchActivities();
// }, [username]);

//   useEffect(() => {
//     console.log('Fetching activities for username:', username); // Log username before fetching activities

//     const fetchActivities = async () => {
//       try {
//         if (username) {
//           // Fetch activities based on username
//           const response = await axios.get(`/activities/user/${username}`);
//           console.log('Fetched activities:', response.data); // Log fetched activities

//           setActivities(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching activities:', error);
//       }
//     };

//     fetchActivities();
//   }, [username]);

// useEffect(() => {
//   console.log('Activities changed:', activities); // Log activities whenever it changes
// }, [activities]);

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         // Look up the user by username to get userId
//         const response = await axios.get(`/activities/user/${username}`);
//         setUserId(response.data._id);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     if (username) {
//       fetchUserId();
//     }
//   }, [username]);

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         if (userId) {
//           // Fetch activities based on userId
//           const response = await axios.get(`/activities/user/${userId}`);
//           setActivities(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching activities:', error);
//       }
//     };

//     fetchActivities();
//   }, [userId]);
