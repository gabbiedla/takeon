import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useHistory hook
import { Row, Col, Container, Button, Dropdown } from 'react-bootstrap';
//import events from '../events'; //data
import Activity from '../components/InternalActivities'; //event compoonent
import CreateActivityButton from '../components/CreateActivityButton';
import CreateActivityModal from '../components/CreateActivityModal';
import axios from 'axios';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
import { useSelector } from 'react-redux';
import { FaEye, FaRegular, FaFilter } from 'react-icons/fa';
import { BsLayoutSidebarInset } from 'react-icons/bs';

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
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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

      return 0;
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
      <Container className="home-container">
        <h1
          className="calendar-title"
          style={{
            fontSize: '1.5em',
          }}
        >
          My Events
        </h1>
        <h4
          className="prompt"
          style={{
            fontSize: '1em',
          }}
        >
          What is on your bucket list for 2025?
        </h4>
        <div className="home-heading, buttons">
          {userInfo ? <CreateActivityButton /> : null}
        </div>
        <div className="home-heading, buttons ">
          {/* {userInfo ? <CreateActivityButton /> : null} */}
          {/* {userInfo ? <CreateActivityModal /> : null} */}
          {/* {userInfo ? (
            <>
              <Button onClick={handleShowModal}>Create Activity</Button>
              <CreateActivityModal
                show={showModal}
                handleClose={handleCloseModal}
              />
            </>
          ) : null} */}
          {/* {userInfo ? (
            <>
              <div
                className="create-modal"
                onClick={handleShowModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: '25px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f7f7f7',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '500px',
                  marginBottom: '15px',
                  boxSizing: 'border-box',
                }}
              >
                <FaPlus style={{ marginRight: '10px', fontSize: '20px' }} />
                <span style={{ fontSize: '16px', color: '#555' }}>
                  What activity is on your bucket list?
                </span>
              </div>
              <CreateActivityModal
                show={showModal}
                handleClose={handleCloseModal}
              />
            </>
          ) : null} */}

          {/* <ShareButton /> old code */}

          {/* <ShareButton userId={userId} /> */}
          {/* <Button onClick={handleSortByName}>Sort by Name</Button> */}
          <Button
            className="switch-view-button, ga4-layout-btn"
            onClick={toggleViewFormat}
            style={{
              background: 'white',
              // border: '2px solid #00b8a9',
              border: '2px solid lightgrey',

              // color: '#00b8a9',
              color: 'black',
              // fontWeight: 'bold',
              fontSize: '.9em',
            }}
          >
            <BsLayoutSidebarInset size={22} />
            Layout
            {/* {viewFormat === 'normal'
              ? 'Switch to Grouped View'
              : 'Switch to Normal View'} */}
          </Button>
          <Dropdown>
            <Dropdown.Toggle
              className="sort-button, ga4-sort-btn"
              variant="primary"
              id="dropdown-basic"
              style={{
                background: 'white',
                // border: 'none',
                // color: 'black',
                border: '2px solid lightgrey',
                // border: '2px solid #00b8a9',

                // border: 'none',
                // color: '#00b8a9',
                color: 'black',
                // fontWeight: 'bold',
                fontSize: '.9em',
              }}
            >
              {/* Sort by: {sortBy === 'name' ? 'Name' : 'Date'} */}
              <div>
                {' '}
                <FaFilter size={17} /> {/* Sort by:{' '} */}
              </div>

              {sortBy === 'name'
                ? 'Name'
                : sortBy === 'date'
                ? 'Date'
                : 'Category'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort('name')}>
                Name A-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('date')}>
                Date
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('category')}>
                Category
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            className="public-view-button, ga4-view-public-profile-btn"
            onClick={handleActivitiesClick}
            style={{
              background: 'white',
              // border: 'none',
              // color: 'black',
              // border: '2px solid #00b8a9',
              border: '2px solid lightgrey',
              // border: 'none',
              // color: '#00b8a9',
              color: 'black',
              // fontWeight: 'bold',
              fontSize: '.9em',
            }}
          >
            <FaEye size={23} />
            Public
          </Button>
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
            <h2 className="int-period-header">{group.title}</h2>
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
// /* <Button variant="primary" onClick={handleShare}>
//         <FaShare /> Share
//       </Button> */
// /* <Button variant="primary" onClick={() => handleShare(userId)}>
//         <FaShare /> Share
//       </Button> */
