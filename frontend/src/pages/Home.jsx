import { Row, Col, Container } from 'react-bootstrap';
import events from '../events';
import E from '../components/E';
import CreateEventButton from '../components/CreateEventButton';
import CreateEvent from './CreateEvent';
import ShareButton from '../components/ShareButton';

function Home() {
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
            <E event={event} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Home;
