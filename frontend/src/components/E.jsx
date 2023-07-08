import React from 'react';
import { Card, Container } from 'react-bootstrap';

const Event = ({ event }) => {
  return (
    <Card className="my-3 p-3 rounded">
      {/* <a href={`/event/${event._id}`}> */}
      <Container>
        <Card.Title as="div">
          <h3>{event.title}</h3>
        </Card.Title>
        <button>Edit</button>
        {/* </a> */}
      </Container>

      <Card.Body>
        {/* <a href={`/event/${event._id}`}> */}
        <Card.Title as="p">{event.location}</Card.Title>
        {/* </a> */}

        <Card.Text as="p">{event.date}</Card.Text>
        <Card.Text as="p">{event.time}</Card.Text>
        <a href={`/event/${event._id}`}>
          <Card.Text as="p">{event.url}</Card.Text>
        </a>
      </Card.Body>
      <Container>
        <Card.Text as="p">{event.accepting}</Card.Text>
        <button>RSVP</button>
      </Container>
    </Card>
  );
};

export default Event;
