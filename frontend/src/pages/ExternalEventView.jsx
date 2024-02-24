import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
//import events from '../events'; //data
// import Activity from '../components/InternalActivities'; //event compoonent
import Activity from '../components/ExternalActivityDetails';
import CreateActivityButton from '../components/CreateActivityButton';
import ShareButton from '../components/ShareButton';
import axios from 'axios';
// import Loader from '../components/Loader';
// import Message from '../components/Message';

import { useParams } from 'react-router-dom';
import { useGetActivityDetailsQuery } from '../slices/activitiesApiSlice';

const ExternalEventView = () => {
  const { id: activityId } = useParams();

  const {
    data: activity,
    isLoading,
    error,
  } = useGetActivityDetailsQuery(activityId);

  // Use useEffect to execute side effects (like fetching data) after rendering
  useEffect(() => {
    // Fetch activity details here using activityId
  }, [activityId]); // Re-fetch data when activityId changes

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Container>
      <h1>Activity Details</h1>
      {activity && (
        <div>
          <Col sm={12} md={6} lg={4} xl={7}>
            <Activity activity={activity} />
          </Col>
          {/* <h2>{activity.name}</h2>
          <p>Location: {activity.location}</p>
          <p>Date: {activity.date}</p> */}
          {/* Add other details here */}
        </div>
      )}
    </Container>
  );
};

export default ExternalEventView;

// function Home() {

// const ExternalEventView = () => {
//   //   const [activities, setActivities] = useState([]);
//   const { id: activityId } = useParams();

//   //   const [name, setName] = useState('');
//   //   const [location, setLocation] = useState('');
//   //   const [date, setDate] = useState('');
//   //   const [formattedDate, setFormattedDate] = useState('');
//   //   const [time, setTime] = useState('');
//   //   const [url, setUrl] = useState('');
//   //   const [capacity, setCapacity] = useState('');
//   //   const [category, setCategory] = useState('');

//   const {
//     data: activity,
//     isLoading,
//     // refetch,
//     error,
//   } = useGetActivityDetailsQuery(activityId);

//   // Render loading state
//   if (isLoading) return <p>Loading...</p>;

//   // Render error state
//   if (error) {
//     console.log('Error:', error);
//     return <p>Error: {error.message}</p>;
//   }
//   //reutrn all product details
//   //   useEffect(() => {
//   //     if (activity) {
//   //       setName(activity.name || '');
//   //       setLocation(activity.location || '');
//   //       setDate(activity.date || '');
//   //       setFormattedDate(formatDate(activity.date || ''));
//   //       setTime(activity.time || '');
//   //       setUrl(activity.url || '');
//   //       setCapacity(activity.capacity || '');
//   //       setCategory(activity.category || '');
//   //     }
//   //   }, [activity]);

//   //   const formatDate = (inputDate) => {
//   //     // Implement your date formatting logic here
//   //     // For example, you can use the Date object to format the date
//   //     const formatted = new Date(inputDate).toISOString().split('T')[0];
//   //     return formatted;
//   //   };

//   //   const { userInfo } = useSelector((state) => state.auth);

//   //   const [activities, setActivities] = useState([]);

//   //   useEffect(() => {
//   //     const fetchActivities = async () => {
//   //       const { data } = await axios.get('/api/activities');
//   //       setActivities(data);
//   //     };

//   //     fetchActivities();
//   //   }, []);

//   return (
//     <>
//       <Container className="home-heading">
//         <h1 className="calendar-title">My Calendar</h1>
//         {/* <div className="buttons">
//           <ShareButton />
//           {userInfo ? <CreateActivityButton /> : null}
//         </div> */}
//       </Container>

//       <Row className="activity-container">
//         {/* {activities.map((activity) => (
//           <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
//             {' '}
//             <Activity activity={activity} />
//           </Col>
//         ))} */}
//         <Col sm={12} md={6} lg={4} xl={3}>
//           <Activity activity={activity} />
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default ExternalEventView;
