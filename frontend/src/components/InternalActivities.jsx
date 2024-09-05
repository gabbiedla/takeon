import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
// import { EventShareButton } from './EventShareButton';
import { LinkContainer } from 'react-router-bootstrap';
import {
  FaPencilAlt,
  FaMapPin,
  FaRegCalendar,
  FaRegClock,
  FaLink,
  FaRegUser,
  FaTag,
  FaShare,
} from 'react-icons/fa';

//

const Activity = ({ activity }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // // Debugging statements

    // console.log('Date before formatting:', date);

    // // Adjust for the timezone offset
    // const offset = date.getTimezoneOffset();
    // date.setDate(date.getDate() - 1); // Subtract one day
    // date.setTime(date.getTime() - offset * 60 * 1000);

    // const formattedDate = date.toLocaleDateString('en-US'); // Adjust locale as needed
    // console.log('Date after formatting:', formattedDate);
    // return formattedDate;
    // Debugging statements
    // console.log('Date before formatting:', date);

    // // Adjust for the timezone offset
    // const offset = date.getTimezoneOffset();
    // date.setTime(date.getTime() - offset * 60 * 1000);

    // const formattedDate = date.toLocaleDateString('en-US'); // Adjust locale as needed
    // console.log('Date after formatting:', formattedDate);
    // return formattedDate;
    // // Debugging statements
    // console.log('Date before formatting:', date);
    // const formattedDate = date.toLocaleDateString('en-US'); // Adjust locale as needed
    // console.log('Date after formatting:', formattedDate);
    // return formattedDate;
    // const date = new Date(dateString);
    console.log('Date before formatting:', dateString);
    const formattedDate = date.toLocaleDateString('en-US'); // Adjust locale as needed
    console.log('Date after formatting:', formattedDate);
    return formattedDate;
    // console.log('Date before formatting:', dateString);
    // const date = new Date(dateString);
    // console.log('Date after formatting:', date);
    // return date.toLocaleDateString('en-US'); // Adjust locale as needed
  };
  const iconData = [
    { icon: <FaMapPin />, data: activity.location },
    // { icon: <FaRegCalendar />, data: activity.date },
    { icon: <FaRegCalendar />, data: formatDate(activity.date) },
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
            {/* Updated onClick event handler for FaShare */}
            {/* <FaShare
              className="mx-2"
              onClick={() => handleShare(activity._id)}
            /> */}
            <LinkContainer to={`/activity/${activity._id}/view`}>
              <Button onClick={() => console.log('Share button clicked')}>
                {' '}
                <FaShare className="mx-2" />
              </Button>
            </LinkContainer>
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

// const Activity = ({ activity }) => {
//   return (
//     <Card className="my-3 p-3 mx-3  bg-light border-0">
//       {/* <a href={`/event/${event._id}`}> */}
//       <Container className="card-items  text-white">
//         <Card.Title as="div">
//           <h3 className="card-title">{activity.name}</h3>
//         </Card.Title>
//         {/* <button className="edit-button">Edit</button> */}
//         <FaPencilAlt />
//         <FaShare />
//         {/* </a> */}
//       </Container>
//       <Card.Body>
//         {/* <a href={`/event/${event._id}`}> */}
//         {activity.location && (
//           <Card.Text as="p">
//             <FaMapPin /> {activity.location}
//           </Card.Text>
//         )}
//         {/* </a> */}
//         {activity.date && (
//           <Card.Text as="p">
//             <FaRegCalendar /> {activity.date}
//           </Card.Text>
//         )}
//         {activity.time && (
//           <Card.Text as="p">
//             <FaRegClock /> {activity.time}
//           </Card.Text>
//         )}
//         {activity.url && (
//           <Card.Text as="p" className="activity-url">
//             <FaLink />
//             <a href={`/activity/${activity._id}`}> {activity.url}</a>
//           </Card.Text>
//         )}
//         {activity.capacity && (
//           <Card.Text as="p">
//             <FaRegUser /> {activity.capacity}
//           </Card.Text>
//         )}
//         <Card.Text as="p">
//           <FaTag /> {activity.category}
//         </Card.Text>
//       </Card.Body>
//       {/* <Container className="card-item">
//         <button className="rsvp-button">RSVP</button>
//       </Container> */}
//     </Card>
//   );
// };
