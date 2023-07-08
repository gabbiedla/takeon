import { Row, Col } from 'react-bootstrap';
import events from '../events';
import E from '../components/E';

function Home() {
  return (
    <>
      <h1>Calendar</h1>
      <Row>
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
