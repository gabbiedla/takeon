// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Form, Button } from 'react-bootstrap';

// const RsvpPage = ({ activity }) => {
//   // Extract activity details
//   const { activityId } = useParams();
//   const [rsvpDetails, setRSVPDetails] = useState({
//     name: '',
//     email: '',
//     guests: 0,
//     comments: '',
//   });

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send RSVP details to backend
//     console.log('RSVP Details:', rsvpDetails);
//     // You can send this data to your backend API for processing
//   };

//   return (
//     <Container>
//       {/* <h1>RSVP for {activity.name}</h1> */}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formName">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your name"
//             value={rsvpDetails.name}
//             onChange={(e) =>
//               setRSVPDetails({ ...rsvpDetails, name: e.target.value })
//             }
//           />
//         </Form.Group>

//         <Form.Group controlId="formEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={rsvpDetails.email}
//             onChange={(e) =>
//               setRSVPDetails({ ...rsvpDetails, email: e.target.value })
//             }
//           />
//         </Form.Group>

//         <Form.Group controlId="formGuests">
//           <Form.Label>Number of Guests</Form.Label>
//           <Form.Control
//             type="number"
//             min="0"
//             value={rsvpDetails.guests}
//             onChange={(e) =>
//               setRSVPDetails({ ...rsvpDetails, guests: e.target.value })
//             }
//           />
//         </Form.Group>

//         <Form.Group controlId="formComments">
//           <Form.Label>Comments</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={rsvpDetails.comments}
//             onChange={(e) =>
//               setRSVPDetails({ ...rsvpDetails, comments: e.target.value })
//             }
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Submit RSVP
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default RsvpPage;

// MODAL FORMAY
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button, Modal } from 'react-bootstrap';

const RsvpPage = ({ activity }) => {
  // Extract activity details
  const { activityId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [rsvpDetails, setRSVPDetails] = useState({
    name: '',
    email: '',
    guests: 0,
    comments: '',
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send RSVP details to backend
    console.log('RSVP Details:', rsvpDetails);
    setShowModal(true);
    // You can send this data to your backend API for processing
  };

  return (
    <Container>
      {/* <h1>RSVP for {activity.name}</h1> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={rsvpDetails.name}
            onChange={(e) =>
              setRSVPDetails({ ...rsvpDetails, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={rsvpDetails.email}
            onChange={(e) =>
              setRSVPDetails({ ...rsvpDetails, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formGuests">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={rsvpDetails.guests}
            onChange={(e) =>
              setRSVPDetails({ ...rsvpDetails, guests: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formComments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={rsvpDetails.comments}
            onChange={(e) =>
              setRSVPDetails({ ...rsvpDetails, comments: e.target.value })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit RSVP
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>RSVP Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for your RSVP! We've received your details.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RsvpPage;

//END

//   const { activityId } = useParams(); // Get activityId from route parameters
//   const [activity, setActivity] = useState(null);

//   useEffect(() => {
//     // Fetch activity data based on activityId
//     // Replace this with your actual fetch logic
//     const fetchActivity = async () => {
//       try {
//         const response = await fetch(`/api/activities/${activityId}`); // Assuming you have an API endpoint to fetch activity data
//         const activityData = await response.json();
//         setActivity(activityData);
//       } catch (error) {
//         console.error('Error fetching activity data:', error);
//       }
//     };

//     fetchActivity();
//   }, [activityId]);

//   if (!activity) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>RSVP Page</h2>
//       <h3>{activity.name}</h3>
//       <p>{activity.date}</p>
//       {/* Add RSVP form or functionality here */}
//     </div>
//   );
// };

// export default RsvpPage;
