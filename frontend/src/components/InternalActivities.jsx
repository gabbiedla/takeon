import React from 'react';
import { Card, Container } from 'react-bootstrap';
import {
  FaPencilAlt,
  FaMapPin,
  FaRegCalendar,
  FaRegClock,
  FaLink,
  FaRegUser,
  FaTag,
} from 'react-icons/fa';

const Activity = ({ activity }) => {
  return (
    <Card className="my-3 p-3 mx-3  bg-light border-0">
      {/* <a href={`/event/${event._id}`}> */}
      <Container className="card-items  text-white">
        <Card.Title as="div">
          <h3 className="card-title">{activity.name}</h3>
        </Card.Title>
        {/* <button className="edit-button">Edit</button> */}
        <FaPencilAlt />
        {/* </a> */}
      </Container>
      <Card.Body>
        {/* <a href={`/event/${event._id}`}> */}
        {activity.location && (
          <Card.Text as="p">
            <FaMapPin /> {activity.location}
          </Card.Text>
        )}
        {/* </a> */}
        {activity.date && (
          <Card.Text as="p">
            <FaRegCalendar /> {activity.date}
          </Card.Text>
        )}
        {activity.time && (
          <Card.Text as="p">
            <FaRegClock /> {activity.time}
          </Card.Text>
        )}
        {activity.url && (
          <Card.Text as="p" className="activity-url">
            <FaLink />
            <a href={`/activity/${activity._id}`}> {activity.url}</a>
          </Card.Text>
        )}
        {activity.capacity && (
          <Card.Text as="p">
            <FaRegUser /> {activity.capacity}
          </Card.Text>
        )}
        <Card.Text as="p">
          <FaTag /> {activity.category}
        </Card.Text>
      </Card.Body>
      {/* <Container className="card-item">
        <button className="rsvp-button">RSVP</button>
      </Container> */}
    </Card>
  );
};

export default Activity;
