import { useEffect, useState } from 'react';
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
// import events from '../events';
import axios from 'axios';
import ExternalEvents from '../components/ExternalEvents';

// function externalView()
const ExternalView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('/api/events');
      setEvents(data);
    };

    fetchEvents();
  }, []);
  return (
    <>
      <Container className="home-heading">
        <h1 className="calendar-title">Gabbie's Calendar</h1>
      </Container>
      <Row className="event-container">
        {events.map((event) => (
          <Col key={event._id} sm={12} md={6} lg={4} xl={3}>
            <ExternalEvents event={event} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ExternalView;
