import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
// import { EventShareButton } from './EventShareButton';
import { LinkContainer } from 'react-router-bootstrap';
// import {
//   FaPencilAlt,
//   FaMapPin,
//   FaRegCalendar,
//   FaRegClock,
//   FaLink,
//   FaRegUser,
//   FaTag,
//   FaShare,
// } from 'react-icons/fa';

//

const Profile = ({ activity }) => {
  const iconData = [
    { icon: <FaMapPin />, data: activity.location },
    { icon: <FaRegCalendar />, data: activity.date },
    { icon: <FaRegClock />, data: activity.time },
    { icon: <FaLink />, data: activity.url },
    { icon: <FaRegUser />, data: activity.capacity },
    { icon: <FaTag />, data: activity.category },
  ];

  const renderIconData = () => {
    return iconData.map((item, index) => (
      <React.Fragment key={index}>
        {item.data && (
          <div className="icon-data-item">
            <div className="icon-container">
              {item.icon}
              <span>{item.data}</span>
            </div>
            {/* <div className="data-container"> */}
            {/* <span className="label">{item.l}</span> */}
            {/* <span className="data">{item.data}</span> */}
          </div>
          // </div>
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
            <LinkContainer to={`/activity/${activity._id}/edit`}>
              <Button onClick={() => console.log('Edit button clicked')}>
                {' '}
                <FaPencilAlt className="mx-2" />
              </Button>
            </LinkContainer>
            <FaShare
              className="mx-2"
              // onClick={() => handleShare(activity.id)}
            />
          </h3>
        </Card.Title>
        {/* Render other card title content if needed */}
      </Container>
      <Card.Body>{renderIconData()}</Card.Body>
    </Card>
  );
};

export default Profile;
