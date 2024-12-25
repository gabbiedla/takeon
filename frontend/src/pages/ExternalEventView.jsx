// OG WORKING CODE ----------------------------------------------------------------------
// import { useEffect } from 'react';
// import Activity from '../components/ExternalActivityDetails';
// import { Container } from '@mantine/core';

// import { useParams } from 'react-router-dom';
// import { useGetActivityDetailsQuery } from '../slices/activitiesApiSlice';
// import CopyURLButton from '../components/CopyUrlButton';

// const ExternalEventView = () => {
//   const { id: activityId } = useParams();

//   const {
//     data: activity,
//     isLoading,
//     error,
//   } = useGetActivityDetailsQuery(activityId);

//   // Use useEffect to execute side effects (like fetching data) after rendering
//   useEffect(() => {
//     // Fetch activity details here using activityId
//   }, [activityId]); // Re-fetch data when activityId changes

//   return (
//     <Container>
//       <h1>Activity Details1</h1>
//       <div className="buttons">
//         <CopyURLButton />
//       </div>
//       {error && <p>Error: {error.message}</p>}
//       {isLoading && <p>Loading...</p>}
//       {activity && (
//         <div>
//           <Activity activity={activity} />
//         </div>
//       )}
//     </Container>
//   );
// };

// export default ExternalEventView;
// NEW CODE WITH new CARD.BODY STRUCTURE AND RSVP FUNCTIONALITY
import { useEffect, useState } from 'react';
import Activity from '../components/ExternalActivityDetails';
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
// import { Container, Card, Button, Modal, Form } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetActivityDetailsQuery } from '../slices/activitiesApiSlice';
import CopyURLButton from '../components/CopyUrlButton';
// import { FaPlus, FaMinus } from 'react-icons/fa';
import { useRegisterRsvpMutation } from '../slices/rsvpsApiSlice';
import dayjs from 'dayjs';

const ExternalEventView = () => {
  const { id: activityId } = useParams();

  const {
    data: activity,
    isLoading,
    error,
  } = useGetActivityDetailsQuery(activityId);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [rsvp, setRsvp] = useState({
    activityId: activityId,
    name: '',
    email: '',
    comments: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const [registerRsvp, { isLoading: isRsvpLoading, isSuccess, isError }] =
    useRegisterRsvpMutation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleOpenRSVPModal = () => {
    setRsvpSubmitted(false);
    setRsvp({ activityId: activityId, name: '', email: '', comments: '' });
    setShowRSVPModal(true);
  };

  const handleCloseRSVPModal = () => {
    setShowRSVPModal(false);
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerRsvp(rsvp);
      setRsvpSubmitted(true);
      setTimeout(() => {
        setShowRSVPModal(false);
      }, 2500);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    }
  };

  useEffect(() => {
    // Fetch activity details here using activityId
  }, [activityId]);

  return (
    <Container className="ext-single-activity">
      <h1>Activity Details</h1>
      <div className="buttons">
        <CopyURLButton />
      </div>
      {error && <p>Error: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      {activity && (
        <Card className="my-3 p-3 mx-3 bg-light border-0">
          <Container className="card-items text-white">
            <Card.Title as="div">
              <h3 className="card-title">{activity.name}</h3>
            </Card.Title>
            {/* <button onClick={toggleCollapse} className="collapse-btn">
              {isCollapsed ? <FaPlus /> : <FaMinus />}
            </button> */}
          </Container>

          {/* {!isCollapsed && ( */}
          <Card.Body>
            <Card.Text as="p">
              {/* <strong>Location:</strong> {activity.location} */}
              <FaMapPin /> {activity.location}
            </Card.Text>
            <Card.Text as="p">
              {/* <strong>Date:</strong>{' '}
              {dayjs(activity.date).format('MMMM D, YYYY')} */}
              <FaRegCalendar /> {dayjs(activity.date).format('MMMM D, YYYY')}
            </Card.Text>
            <Card.Text as="p">
              {/* <strong>Time:</strong> {activity.time} */}
              <FaRegClock /> {activity.time}
            </Card.Text>
            <Card.Text as="p">
              {/* <strong>Capacity:</strong> {activity.capacity} */}
              <FaRegUser /> {activity.capacity}
            </Card.Text>
            <Card.Text as="p">
              <FaLink />{' '}
              <a href={activity.url} target="_blank" rel="noopener noreferrer">
                View more details
              </a>
            </Card.Text>
            <Button onClick={handleOpenRSVPModal} className="rsvp-button">
              RSVP
            </Button>
          </Card.Body>
          {/* )} */}

          {/* RSVP Modal */}
          <Modal show={showRSVPModal} onHide={handleCloseRSVPModal}>
            <Modal.Header closeButton>
              <Modal.Title>RSVP for {activity.name}</Modal.Title>
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
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={rsvp.email}
                    onChange={(e) =>
                      setRsvp({ ...rsvp, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formComments">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={rsvp.comments}
                    onChange={(e) =>
                      setRsvp({ ...rsvp, comments: e.target.value })
                    }
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit RSVP
                </Button>
              </Form>
              {rsvpSubmitted && (
                <p className="text-success mt-3">
                  RSVP submitted successfully!
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseRSVPModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>
      )}
    </Container>
  );
};

export default ExternalEventView;
