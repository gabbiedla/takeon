import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
//import events from '../events'; //data
import Event from '../components/InternalEvents'; //event compoonent
import CreateEventButton from '../components/CreateEventButton';
import ShareButton from '../components/ShareButton';
import axios from 'axios';

// function Home() {

const Home = () => {
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
        <h1 className="calendar-title">My Calendar</h1>
        <div className="buttons">
          <ShareButton />
          <CreateEventButton />
        </div>
      </Container>
      <Row className="event-container">
        {events.map((event) => (
          <Col key={event._id} sm={12} md={6} lg={4} xl={3}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
