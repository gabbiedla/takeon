import React from 'react';
import { Card, Container } from 'react-bootstrap';
// import { EventShareButton } from './EventShareButton';
// import { LinkContainer } from 'react-router-bootstrap';

import {
  // FaPencilAlt,
  FaMapPin,
  FaRegCalendar,
  FaRegClock,
  FaLink,
  FaRegUser,
  FaTag,
  // FaShare,
} from 'react-icons/fa';

const Activity = ({ activity }) => {
  const iconData = [
    { icon: <FaMapPin />, data: activity.location },
    { icon: <FaRegCalendar />, data: activity.date },
    { icon: <FaRegClock />, data: activity.time },
    { icon: <FaLink />, data: <a href={activity.url}>{activity.url}</a> },
    { icon: <FaRegUser />, data: activity.capacity },
    { icon: <FaTag />, data: activity.category },
  ];

  // Function to generate unique link
  // const handleShare = (activityId) => {
  //   // Generate unique link logic here using the activityId
  //   console.log('Share button clicked for activity with ID:', activityId);
  // };

  const renderIconData = () => {
    return iconData.map((item, index) => (
      <React.Fragment key={index}>
        {item.data && (
          <div className="icon-data-item">
            <div className="icon-container">
              {item.icon}
              <span>&nbsp;{item.data}</span>
            </div>
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Card className="my-3 p-3 mx-3 bg-light border-0">
      <Container className="card-items text-white">
        <Card.Title as="div">
          <h3 className="card-title">
            {activity.name}

            {/* Updated onClick event handler for FaShare */}
            {/* <FaShare
              className="mx-2"
              onClick={() => handleShare(activity._id)}
            /> */}
            {/* <FaShare
              className="mx-2" */}
            {/* // onClick={() => handleShare(activity.id)} */}
            {/* /> */}
          </h3>
        </Card.Title>
        {/* Render other card title content if needed */}
      </Container>
      <Card.Body>{renderIconData()}</Card.Body>
    </Card>
  );
};

export default Activity;
