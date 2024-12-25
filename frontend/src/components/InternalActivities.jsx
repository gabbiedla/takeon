// OG CODE AND WORKING WITHOUT CARD.BODY STRUCUTRE MIRRORING EXT VIEW ------------------
// import React from 'react';
// import { Button, Card, Container } from 'react-bootstrap';
// // import { EventShareButton } from './EventShareButton';
// import { LinkContainer } from 'react-router-bootstrap';
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
// import { format } from 'date-fns';
// //

// const Activity = ({ activity }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     //testing
//     console.log('Date before formatting:', dateString);
//     // // Debugging statements

//     // console.log('Date before formatting:', date);

//     // // Adjust for the timezone offset
//     // const offset = date.getTimezoneOffset();
//     // date.setDate(date.getDate() - 1); // Subtract one day
//     // date.setTime(date.getTime() - offset * 60 * 1000);

//     // const formattedDate = date.toLocaleDateString('en-US'); // Adjust locale as needed
//     // console.log('Date after formatting:', formattedDate);
//     // return formattedDate;
//     // Debugging statements
//     // console.log('Date before formatting:', date);

//     // // Adjust for the timezone offset
//     // const offset = date.getTimezoneOffset();
//     // date.setTime(date.getTime() - offset * 60 * 1000);

//     // const formattedDate = date.toLocaleDateString('en-US'); // Adjust locale as needed
//     // console.log('Date after formatting:', formattedDate);
//     // return formattedDate;
//     // // Debugging statements
//     // console.log('Date before formatting:', date);
//     // const formattedDate = date.toLocaleDateString('en-US'); // Adjust locale as needed
//     // console.log('Date after formatting:', formattedDate);
//     // return formattedDate;
//     // const date = new Date(dateString);
//     console.log('Date before formatting:', dateString);
//     //GABBIE COMMENTED OUT ON Dec 22 upon noticing a discrepency with date after formatting
//     // const formattedDate = date.toLocaleDateString('en-US');
//     //CODE ADDED WITH GPT HELP - working
//     const formattedDate = date.toLocaleDateString('en-US', { timeZone: 'UTC' });
//     // // Adjust locale as needed
//     console.log('Date after formatting:', formattedDate);
//     return formattedDate;
//     // console.log('Date before formatting:', dateString);
//     // const date = new Date(dateString);
//     // console.log('Date after formatting:', date);
//     // return date.toLocaleDateString('en-US'); // Adjust locale as needed
//   };
//   const iconData = [
//     { icon: <FaMapPin />, data: activity.location },
//     // { icon: <FaRegCalendar />, data: activity.date },
//     { icon: <FaRegCalendar />, data: formatDate(activity.date) },
//     { icon: <FaRegClock />, data: activity.time },
//     { icon: <FaLink />, data: <a href={activity.url}>{activity.url}</a> },
//     { icon: <FaRegUser />, data: activity.capacity },
//     { icon: <FaTag />, data: activity.category },
//   ];

//   // Function to generate unique link
//   // const handleShare = (activityId) => {
//   //   // Generate unique link logic here using the activityId
//   //   console.log('Share button clicked for activity with ID:', activityId);
//   // };

//   const renderIconData = () => {
//     return iconData.map((item, index) => (
//       <React.Fragment key={index}>
//         {item.data && (
//           <div className="icon-data-item">
//             <div
//               className="icon-container"
//               // style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
//             >
//               {item.icon}
//               <span>&nbsp;{item.data}</span>
//             </div>
//             {/* <div className="data-container"> */}
//             {/* <span className="label">{item.l}</span> */}
//             {/* <span className="data">{item.data}</span> */}
//           </div>
//           // </div>
//         )}
//       </React.Fragment>
//     ));
//   };

//   return (
//     <Card className="my-3 p-3 mx-3 bg-light border-0">
//       <Container className="int-card-items text-white">
//         <Card.Title as="div">
//           <h3 className="int-card-title">
//             {activity.name}
//             <div className="int-activity-btns">
//               <LinkContainer to={`/activity/${activity._id}/edit`}>
//                 <Button
//                   className="bg-transparent border-0"
//                   onClick={() => console.log('Edit button clicked')}
//                 >
//                   {' '}
//                   <FaPencilAlt
//                     className="int-edit-btn, mx-2"
//                     // style={{
//                     //   color: 'white',
//                     //   fontSize: '1em',
//                     // }}
//                   />
//                 </Button>
//               </LinkContainer>
//               {/* Updated onClick event handler for FaShare */}
//               {/* <FaShare
//               className="mx-2"
//               onClick={() => handleShare(activity._id)}
//             /> */}
//               <LinkContainer to={`/activity/${activity._id}/view`}>
//                 <Button
//                   className="bg-transparent border-0"
//                   onClick={() => console.log('Share button clicked')}
//                 >
//                   {' '}
//                   <FaShare
//                     className="int-share-btn, mx-2"
//                     // style={{
//                     //   color: 'white',
//                     //   fontSize: '1em',
//                     // }}
//                   />
//                 </Button>
//               </LinkContainer>
//             </div>
//             {/* <FaShare
//               className="mx-2" */}
//             {/* // onClick={() => handleShare(activity.id)} */}
//             {/* /> */}
//           </h3>
//         </Card.Title>
//         {/* Render other card title content if needed */}
//       </Container>
//       <Card.Body>{renderIconData()}</Card.Body>
//     </Card>
//   );
// };
// export default Activity;
//-------------------------------------------------------------------------------------
// NEW FROM GPT WITH CARD.BODY structure as EXT view. EDIT DEC 23 4:44PM
import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
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

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', { timeZone: 'UTC' });
  return formattedDate;
};

const Activity = ({ activity }) => {
  const iconData = [
    { icon: <FaMapPin />, data: activity.location },
    { icon: <FaRegCalendar />, data: formatDate(activity.date) },
    { icon: <FaRegClock />, data: activity.time },
    { icon: <FaLink />, data: <a href={activity.url}>{activity.url}</a> },
    { icon: <FaRegUser />, data: activity.capacity },
    { icon: <FaTag />, data: activity.category },
  ];

  const renderIconData = () =>
    iconData.map((item, index) => (
      <React.Fragment key={index}>
        {item.data && (
          <div className="d-flex align-items-center mb-2">
            {item.icon}
            <span className="ms-2">{item.data}</span>
          </div>
        )}
      </React.Fragment>
    ));

  return (
    <Card className="my-3 p-3 mx-3 bg-light border-0">
      {/* Header Section */}
      <Container className="int-card-items text-white">
        <Card.Title as="div">
          <h3 className="int-card-title d-flex justify-content-between align-items-center">
            {activity.name}
            <div>
              <LinkContainer to={`/activity/${activity._id}/edit`}>
                <Button
                  className="bg-transparent border-0"
                  onClick={() => console.log('Edit button clicked')}
                >
                  <FaPencilAlt className="int-edit-btn mx-2" />
                </Button>
              </LinkContainer>
              <LinkContainer to={`/activity/${activity._id}/view`}>
                <Button
                  className="bg-transparent border-0"
                  onClick={() => console.log('Share button clicked')}
                >
                  <FaShare className="int-share-btn mx-2" />
                </Button>
              </LinkContainer>
            </div>
          </h3>
        </Card.Title>
      </Container>

      {/* Body Section */}
      <Card.Body>{renderIconData()}</Card.Body>
    </Card>
  );
};

export default Activity;
//----------------------------------------------------------------------------------
//TESTING WITH EDIT AND SHARE BTN -- NOT WORKING BTNS -- I also like how the LINK IS DESIGNED
// import React from 'react';
// import { Card, Container, Button } from 'react-bootstrap';
// import {
//   FaMapPin,
//   FaRegCalendar,
//   FaRegClock,
//   FaLink,
//   FaRegUser,
//   FaTag,
// } from 'react-icons/fa';

// const Activity = ({ activity }) => {
//   return (
//     <Card className="my-3 p-3 mx-3 bg-light border-0">
//       <Container className="card-items text-white">
//         <Card.Title as="div">
//           <h3 className="card-title">{activity.name}</h3>
//         </Card.Title>
//       </Container>
//       <Card.Body>
//         <Card.Text as="p">
//           <FaMapPin /> {activity.location}
//         </Card.Text>
//         <Card.Text as="p">
//           <FaRegCalendar /> {activity.date}
//         </Card.Text>
//         <Card.Text as="p">
//           <FaRegClock /> {activity.time}
//         </Card.Text>
//         <Card.Text as="p">
//           <FaRegUser /> Capacity: {activity.capacity}
//         </Card.Text>
//         <Card.Text as="p">
//           <FaTag /> Category: {activity.category}
//         </Card.Text>
//         <Card.Text as="p" className="activity-url">
//           <FaLink />
//           <a
//             href={`/activity/${activity._id}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             View Details
//           </a>
//         </Card.Text>
//       </Card.Body>
//       <Card.Footer className="text-muted">
//         <Button variant="primary" size="sm" className="me-2">
//           Edit
//         </Button>
//         <Button variant="secondary" size="sm">
//           Share
//         </Button>
//       </Card.Footer>
//     </Card>
//   );
// };

// export default Activity;

//TESTING

// import React from 'react';
// import { Card, Container } from 'react-bootstrap';
// import {
//   FaMapPin,
//   FaRegCalendar,
//   FaRegClock,
//   FaLink,
//   FaRegUser,
//   FaTag,
// } from 'react-icons/fa';
// import { format } from 'date-fns';

// const Activity = ({ activity }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { timeZone: 'UTC' }); // Format date in 'en-US' locale
//   };

//   return (
//     <Card className="my-3 p-3 mx-3 bg-light border-0">
//       <Container className="card-items text-white">
//         <Card.Title as="div">
//           <h3 className="card-title">{activity.name}</h3>
//         </Card.Title>
//       </Container>
//       <Card.Body>
//         <Card.Text as="p">
//           <FaMapPin /> {activity.location}
//         </Card.Text>
//         <Card.Text as="p">
//           <FaRegCalendar /> {formatDate(activity.date)}
//         </Card.Text>
//         <Card.Text as="p">
//           <FaRegClock /> {activity.time}
//         </Card.Text>
//         <Card.Text as="p" className="activity-url">
//           <FaLink />
//           <a
//             href={`/activity/${activity._id}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             {activity.url}
//           </a>
//         </Card.Text>
//         <Card.Text as="p">
//           <FaRegUser /> {activity.capacity}
//         </Card.Text>
//         <Card.Text as="p">
//           <FaTag /> {activity.category}
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Activity;

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
