import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useHistory hook
import { Row, Col, Container, Button, Dropdown } from 'react-bootstrap';
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
  const { username } = useSelector((state) => state.auth.userInfo) || {};
  const { userInfo } = useSelector((state) => state.auth) || {};
  const [activities, setActivities] = useState([]);
  const [sortedActivities, setSortedActivities] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [viewFormat, setViewFormat] = useState('normal'); // State to toggle view format
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate(); // Initialize useNavigate hook
  // const { userId } = useParams();

  const handleActivitiesClick = () => {
    navigate(`/${username}`);
  };

  const toggleViewFormat = () => {
    setViewFormat((prevFormat) =>
      prevFormat === 'normal' ? 'grouped' : 'normal'
    );
  };

  useEffect(() => {
    console.log('Inside useEffect, userId:', userId);

    const fetchActivities = async () => {
      try {
        const { data } = await axios.get('/api/activities');
        setActivities(data);
        setLoading(false); // Update loading state when data is fetched
      } catch (error) {
        console.error('Error fetching activities:', error);
        setLoading(false); // Update loading state when data is fetched
      }
    };

    if (userId) {
      fetchActivities();
    } else {
      console.warn('userId is undefined');
      setLoading(false); // Update loading state if userId is undefined
    }
  }, [userId]);

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
    const sorted = [...activities].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
    });
    setActivities(sorted); // Update activities array with sorted order
  };

  // Group activities by time periods and filter out old events
  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const upcomingThisWeek =
      today.getTime() + (7 - today.getDay()) * 24 * 60 * 60 * 1000;
    const thisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    const todayEvents = [];
    const upcomingEvents = [];
    const thisMonthEvents = [];
    const nextMonthEvents = [];
    const restOfYearEvents = [];

    activities.forEach((activity) => {
      const activityDate = new Date(activity.date);
      if (activityDate.getTime() >= today.getTime()) {
        if (activityDate.getTime() === today.getTime()) {
          todayEvents.push(activity);
        } else if (activityDate < upcomingThisWeek) {
          upcomingEvents.push(activity);
        } else if (activityDate <= thisMonth) {
          thisMonthEvents.push(activity);
        } else if (activityDate <= nextMonth) {
          nextMonthEvents.push(activity);
        } else {
          restOfYearEvents.push(activity);
        }
      }
    });

    const sorted = [
      { title: 'Today', events: todayEvents },
      { title: 'Upcoming (This Week)', events: upcomingEvents },
      { title: 'This Month', events: thisMonthEvents },
      { title: 'Next Month', events: nextMonthEvents },
      { title: 'Rest of the Year', events: restOfYearEvents },
    ];

    setSortedActivities(sorted);
  }, [activities]);

  return (
    <>
      <Container className="home-heading">
        <h1 className="calendar-title">My Calendar</h1>
        <div className="buttons">
          {userInfo ? <CreateActivityButton /> : null}
          {/* <ShareButton /> old code */}

          {/* <ShareButton userId={userId} /> */}
          {/* <Button onClick={handleSortByName}>Sort by Name</Button> */}
          <Button onClick={toggleViewFormat}>
            {viewFormat === 'normal'
              ? 'Switch to Grouped View'
              : 'Switch to Normal View'}
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {/* Sort by: {sortBy === 'name' ? 'Name' : 'Date'} */}
              Sort by:{' '}
              {sortBy === 'name'
                ? 'Name'
                : sortBy === 'date'
                ? 'Date'
                : 'Category'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort('name')}>
                Name
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('date')}>
                Date
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('category')}>
                Category
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button onClick={handleActivitiesClick}>View Public Calendar</Button>
        </div>
      </Container>

      {loading ? (
        <div>Loading...</div>
      ) : viewFormat === 'normal' && activities.length > 0 ? (
        <Row className="activity-container">
          {activities.map((activity) => (
            <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
              <Activity activity={activity} />
            </Col>
          ))}
        </Row>
      ) : (
        sortedActivities.map((group, index) => (
          <div key={index}>
            <h2>{group.title}</h2>
            <Row className="activity-container">
              {group.events.map((activity) => (
                <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
                  <Activity activity={activity} />
                </Col>
              ))}
            </Row>
          </div>
        ))
      )}
    </>
  );
};

export default Home;

/* <Row className="activity-container"> */

/* {activities.map((activity) => ( */

/* {(sortedActivities.length > 0 ? sortedActivities : activities).map(
            (activity) => (
              <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
                <Activity activity={activity} />
              </Col>
            )
          )}
        </Row> */

// <Row className="activity-container">
//   {activities.map((activity) => (
//     <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
//       <Activity activity={activity} />
//     </Col>
//   ))}
// </Row>

/* <Row className="activity-container">
        {(sortedActivities.length > 0 ? sortedActivities : activities).map(
          (activity) => (
            <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
              <Activity activity={activity} />
            </Col>
          )
        )}
      </Row>
    </>
  );
}; */

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
