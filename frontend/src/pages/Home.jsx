import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useHistory hook
import { Row, Col, Container, Button } from 'react-bootstrap';
//import events from '../events'; //data
import Activity from '../components/InternalActivities'; //event compoonent
import { FaShare } from 'react-icons/fa'; // Import share icon from react-icons/fa
import CreateActivityButton from '../components/CreateActivityButton';
import ShareButton from '../components/ShareButton';
import axios from 'axios';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
import { useSelector } from 'react-redux';

// function Home() {

const Home = () => {
  // OLD CODE to display activites internally without userID based on auth...
  // const { userInfo } = useSelector((state) => state.auth);

  // const [activities, setActivities] = useState([]);

  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     const { data } = await axios.get('/api/activities');
  //     setActivities(data);
  //   };

  //   fetchActivities();
  // }, []);
  const { userId } = useParams(); // Extract userId from route
  console.log('userId from useParams:', userId);
  const { username } = useSelector((state) => state.auth.userInfo);
  const { userInfo } = useSelector((state) => state.auth);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook
  // const { userId } = useParams();

  const handleActivitiesClick = () => {
    navigate(`/${username}`);
  };

  useEffect(() => {
    console.log('Inside useEffect, userId:', userId);

    const fetchActivities = async () => {
      try {
        const { data } = await axios.get('/api/activities');
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (userId) {
      fetchActivities();
    } else {
      console.warn('userId is undefined');
    }
  }, [userId]);

  return (
    <>
      <Container className="home-heading">
        <h1 className="calendar-title">My Calendar</h1>
        <div className="buttons">
          {userInfo ? <CreateActivityButton /> : null}
          {/* <ShareButton /> old code */}

          {/* <ShareButton userId={userId} /> */}
          <Button onClick={handleActivitiesClick}>Go to Activities</Button>
        </div>
      </Container>

      <Row className="activity-container">
        {activities.map((activity) => (
          <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
            <Activity activity={activity} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
// const handleShare = () => {
//   // Log userId value when Share button is clicked
//   console.log('userId in handleShare function:', userId);

//   // Implement the functionality to handle the share action here
//   console.log('Share button clicked');
//   if (userId) {
//     navigate(`/activities/user/${userId}`);
//   } else {
//     // Handle the case where userId is not defined
//     console.error('userId is not defined');
//   }
// };

// const handleShare = () => {
//   // Implement the functionality to handle the share action here
//   console.log('Share button clicked');

//   if (userId) {
//     navigate(`/activities/user/${userId}`);
//   } else {
//     // Handle the case where userId is not defined
//     console.error('userId is not defined');
//   }
//   // navigate(`/activities/user/${userId}`);

//   // navigate(`/activities/user/${userId}`);

//   // Handle the case where userInfo or userInfo.userId is undefined
// };

{
  /* <Button variant="primary" onClick={handleShare}>
            <FaShare /> Share
          </Button> */
}
{
  /* <Button variant="primary" onClick={() => handleShare(userId)}>
            <FaShare /> Share
          </Button> */
}
