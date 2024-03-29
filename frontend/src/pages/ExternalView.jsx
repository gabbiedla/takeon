import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
// import events from '../events';
import axios from 'axios';
import ExternalActivities from '../components/ExternalActivities';

const ExternalView = () => {
  // useparams allows non users to view  activities on this page with userID attached
  const { userId } = useParams();
  console.log('userId inside Home component:', userId);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        let url = '/api/activities';
        if (userId) {
          url = `/api/activities/user/${userId}`;
        }
        const { data } = await axios.get(url);
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, [userId]);

  console.log('Render - activities:', activities); // Debug code

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
  );
};

export default ExternalView;

// function externalView()
// const ExternalView = () => {
//   const [activities, setActivities] = useState([]);

//   useEffect(() => {
//     const fetchActivities = async () => {
//       const { data } = await axios.get('/api/activities');
//       setActivities(data);
//     };

//     fetchActivities();
//   }, []);
//   return (
//     <>
//       <Container className="home-heading">
//         <h1 className="calendar-title">Gabbie's Calendar</h1>
//       </Container>
//       <Row className="activity-container">
//         {activities.map((activity) => (
//           <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
//             <ExternalActivities activity={activity} />
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default ExternalView;
