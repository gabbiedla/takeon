import React from 'react';
import { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import {
  FaMapPin,
  FaRegCalendar,
  FaRegClock,
  FaLink,
  FaRegUser,
  FaPlus,
} from 'react-icons/fa';

const ExternalEvent = ({ event }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // const externalEvent = ({ event }) => {
  return (
    <Card className="my-3 p-3 mx-3 rounded bg-light border-0">
      {/* <a href={`/event/${event._id}`}> */}
      <Container className="card-items rounded-top text-white">
        <Card.Title as="div">
          <h3 className="card-title">{event.title}</h3>
        </Card.Title>
        {/* <button className="edit-button">Edit</button> */}
        <button
          onClick={toggleCollapse}
          className="collapse-btn"

          // data-bs-toggle="collapse"
          // data-bs-target="#collapseExample"
          // aria-expanded="false"
          // aria-controls="collapseExample"
        >
          <FaPlus />
        </button>
        {/* </a> */}
      </Container>
      {!isCollapsed && (
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
          {/* <Container className="card-item"> */}
          <button className="rsvp-button">RSVP</button>
          {/* </Container> */}
        </Card.Body>
      )}
    </Card>
  );
};

export default ExternalEvent;
