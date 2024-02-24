import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
//import events from '../events'; //data
import Activity from '../components/InternalActivities'; //event compoonent
import CreateActivityButton from '../components/CreateActivityButton';
import ShareButton from '../components/ShareButton';
import axios from 'axios';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
import { useSelector } from 'react-redux';

// function Home() {

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data } = await axios.get('/api/activities');
      setActivities(data);
    };

    fetchActivities();
  }, []);

  return (
    <>
      <Container className="home-heading">
        <h1 className="calendar-title">My Calendar</h1>
        <div className="buttons">
          {<ShareButton />}
          {userInfo ? <CreateActivityButton /> : null}
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
