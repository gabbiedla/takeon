import React from 'react';
import { Card, Container } from 'react-bootstrap';
import {
  FaPencilAlt,
  FaMapPin,
  FaRegCalendar,
  FaRegClock,
  FaLink,
  FaRegUser,
} from 'react-icons/fa';

const Event = ({ event }) => {
  return (
    <Card className="my-3 p-3 mx-3  bg-light border-0">
      {/* <a href={`/event/${event._id}`}> */}
      <Container className="card-items  text-white">
        <Card.Title as="div">
          <h3 className="card-title">{event.title}</h3>
        </Card.Title>
        {/* <button className="edit-button">Edit</button> */}
        <FaPencilAlt />
        {/* </a> */}
      </Container>
      <Card.Body>
        {/* <a href={`/event/${event._id}`}> */}
        <Card.Text as="p">
          <FaMapPin /> {event.location}
        </Card.Text>

        {/* </a> */}
        <Card.Text as="p">
          <FaRegCalendar /> {event.date}
        </Card.Text>
        <Card.Text as="p">
          <FaRegClock /> {event.time}
        </Card.Text>
        <Card.Text as="p" className="event-url">
          <FaLink />
          <a href={`/event/${event._id}`}> {event.url}</a>
        </Card.Text>
        <Card.Text as="p">
          <FaRegUser /> {event.accepting}
        </Card.Text>
      </Card.Body>
      {/* <Container className="card-item">
        <button className="rsvp-button">RSVP</button>
      </Container> */}
    </Card>
  );
};

export default Event;
