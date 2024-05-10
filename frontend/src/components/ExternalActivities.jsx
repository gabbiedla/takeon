// import React from 'react';
// import { useState } from 'react';
// import { Card, Container } from 'react-bootstrap';
// import {
//   FaMapPin,
//   FaRegCalendar,
//   FaRegClock,
//   FaLink,
//   FaRegUser,
//   FaPlus,
//   FaMinus,
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// const ExternalActivity = ({ activity }) => {
//   const [isCollapsed, setIsCollapsed] = useState(true);

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   // const externalEvent = ({ event }) => {
//   return (
//     <Card className="my-3 p-3 mx-3  bg-light border-0">
//       {/* <a href={`/event/${event._id}`}> */}
//       <Container className="card-items  text-white">
//         <Card.Title as="div">
//           <h3 className="card-title">{activity.name}</h3>
//         </Card.Title>
//         {/* <button className="edit-button">Edit</button> */}
//         <button
//           onClick={toggleCollapse}
//           className="collapse-btn"

//           // data-bs-toggle="collapse"
//           // data-bs-target="#collapseExample"
//           // aria-expanded="false"
//           // aria-controls="collapseExample"
//         >
//           {isCollapsed ? <FaPlus /> : <FaMinus />}
//         </button>
//         {/* </a> */}
//       </Container>
//       {!isCollapsed && (
//         <Card.Body>
//           {/* <a href={`/event/${event._id}`}> */}
//           <Card.Text as="p">
//             <FaMapPin /> {activity.location}
//           </Card.Text>

//           {/* </a> */}
//           <Card.Text as="p">
//             <FaRegCalendar /> {activity.date}
//           </Card.Text>
//           <Card.Text as="p">
//             <FaRegClock /> {activity.time}
//           </Card.Text>
//           <Card.Text as="p" className="activity-url">
//             <FaLink />
//             <a href={`/activity/${activity._id}`}> {activity.url}</a>
//           </Card.Text>
//           <Card.Text as="p">
//             <FaRegUser /> {activity.capacity}
//           </Card.Text>
//           {/* <Container className="card-item"> */}
//           <button className="rsvp-button">RSVP</button>
//           {/* Use Link component to route to RSVP page */}
//           <Link to={`/activity/${activity._id}/rsvp`} className="rsvp-button">
//             RSVP
//           </Link>
//           {/* </Container> */}
//         </Card.Body>
//       )}
//     </Card>
//   );
// };

// export default ExternalActivity;
//model code rsvp
import React, { useState } from 'react';
import { Card, Container, Modal, Button, Form } from 'react-bootstrap';
import {
  FaMapPin,
  FaRegCalendar,
  FaRegClock,
  FaLink,
  FaRegUser,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRegisterRsvpMutation } from '../slices/rsvpsApiSlice';

const ExternalActivity = ({ activity }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [rsvp, setRsvp] = useState({
    activityId: activity._id, // Set the activity ID for the RSVP
    name: '',
    email: '',
    // guests: 0,
    comments: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Importing the hook from rsvpSlice.js

  const [registerRsvp, { isLoading, isSuccess, isError }] =
    useRegisterRsvpMutation(); // Using the hook to handle RSVP submission

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCloseRSVPModal = () => {
    setShowRSVPModal(false);
  };

  const handleOpenRSVPModal = () => {
    setShowRSVPModal(true);
  };

  // const handleRSVPSubmit = (e) => {
  //   e.preventDefault();
  //   // Process RSVP form submission here
  //   // For example, you can send the data to your backend
  //   console.log('RSVP Details:', rsvpDetails);
  //   // After submission, you can display a confirmation message
  //   setRSVPSubmitted(true);
  // };

  // const handleRSVPSubmit = async (e) => {
  //   // Changed handleRSVPSubmit to an async function
  //   e.preventDefault();
  //   try {
  //     await registerRsvp(rsvp); // Calling the mutation function with RSVP details
  //     setRsvpSubmitted(true);
  //   } catch (error) {
  //     // Handle error if submission fails
  //   }
  // };

  const handleRSVPSubmit = async (e) => {
    // Changed handleRSVPSubmit to an async function
    e.preventDefault();
    console.log('Submitting RSVP:', rsvp); // Log the RSVP data before submission
    try {
      await registerRsvp(rsvp); // Calling the mutation function with RSVP details
      console.log('RSVP submitted successfully!');
      setRsvpSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error); // Log any errors that occur during submission
      // Handle error if submission fails
    }
  };

  return (
    <Card className="my-3 p-3 mx-3  bg-light border-0">
      <Container className="card-items  text-white">
        <Card.Title as="div">
          <h3 className="card-title">{activity.name}</h3>
        </Card.Title>
        <button onClick={toggleCollapse} className="collapse-btn">
          {isCollapsed ? <FaPlus /> : <FaMinus />}
        </button>
      </Container>
      {!isCollapsed && (
        <Card.Body>
          <Card.Text as="p">
            <FaMapPin /> {activity.location}
          </Card.Text>
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
          <Button onClick={handleOpenRSVPModal} className="rsvp-button">
            RSVP
          </Button>
        </Card.Body>
      )}

      {/* RSVP Modal */}
      <Modal show={showRSVPModal} onHide={handleCloseRSVPModal}>
        <Modal.Header closeButton>
          {/* <Modal.Title>RSVP</Modal.Title> */}
          <Modal.Title>RSVP for {activity.name}</Modal.Title>
          {/* <p>RSVP for {activity.time}</p> */}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRSVPSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={rsvp.name}
                onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
              />
            </Form.Group>
            {/* <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={rsvp.phone}
                onChange={(e) => setRsvp({ ...rsvp, phone: e.target.value })}
              />
            </Form.Group> */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={rsvp.email}
                onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })}
              />
            </Form.Group>

            {/* <Form.Group controlId="formGuests">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={rsvp.guests}
                onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
              />
            </Form.Group> */}

            <Form.Group controlId="formComments">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={rsvp.comments}
                onChange={(e) => setRsvp({ ...rsvp, comments: e.target.value })}
              />
            </Form.Group>
            {/* Add other form fields as needed */}
            <Button variant="primary" type="submit">
              Submit RSVP
            </Button>
          </Form>
          {rsvpSubmitted && (
            <p className="text-success mt-3">RSVP submitted successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRSVPModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ExternalActivity;
