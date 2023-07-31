import { useEffect, useState } from 'react';
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
// import events from '../events';
import axios from 'axios';
import ExternalActivities from '../components/ExternalActivities';

// function externalView()
const ExternalView = () => {
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
