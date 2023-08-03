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
  FaMinus,
} from 'react-icons/fa';

const ExternalActivity = ({ activity }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // const externalEvent = ({ event }) => {
  return (
    <Card className="my-3 p-3 mx-3  bg-light border-0">
      {/* <a href={`/event/${event._id}`}> */}
      <Container className="card-items  text-white">
        <Card.Title as="div">
          <h3 className="card-title">{activity.name}</h3>
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
          {isCollapsed ? <FaPlus /> : <FaMinus />}
        </button>
        {/* </a> */}
      </Container>
      {!isCollapsed && (
        <Card.Body>
          {/* <a href={`/event/${event._id}`}> */}
          <Card.Text as="p">
            <FaMapPin /> {activity.location}
          </Card.Text>

          {/* </a> */}
          <Card.Text as="p">
            <FaRegCalendar /> {activity.date}
          </Card.Text>
          <Card.Text as="p">
            <FaRegClock /> {activity.time}
          </Card.Text>
          <Card.Text as="p" className="activity-url">
            <FaLink />
            <a href={`/activity/${activity._id}`}> {activity.url}</a>
          </Card.Text>
          <Card.Text as="p">
            <FaRegUser /> {activity.capacity}
          </Card.Text>
          {/* <Container className="card-item"> */}
          <button className="rsvp-button">RSVP</button>
          {/* </Container> */}
        </Card.Body>
      )}
    </Card>
  );
};

export default ExternalActivity;
