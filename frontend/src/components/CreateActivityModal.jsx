// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Modal } from 'react-bootstrap';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { Input, NativeSelect, Button, Space } from '@mantine/core';
// import { TimeInput, DatePickerInput } from '@mantine/dates';
// import dayjs from 'dayjs';
// import timezone from 'dayjs/plugin/timezone';
// import { IconDeviceFloppy } from '@tabler/icons-react';

// dayjs.extend(timezone);

// const CreateActivityModal = ({ show, handleClose }) => {
//   const navigate = useNavigate();
//   const [activityData, setActivityData] = useState({
//     name: '',
//     date: dayjs().add(1, 'week'),
//     location: '',
//     url: '',
//     time: '18:00',
//     capacity: '', // Default value
//     category: '',
//     timeZone: dayjs.tz.guess(),
//   });

//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const isLoggedIn = !!localStorage.getItem('userInfo');
//     if (!isLoggedIn) {
//       console.error(
//         'User is not logged in. Redirect to login page or show an error.'
//       );
//       return navigate('/');
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setActivityData({ ...activityData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting activity data:', activityData);

//     try {
//       const [formattedDate = ''] = activityData.date.toISOString().split('T');
//       const requestData = {
//         ...activityData,
//         date: formattedDate,
//       };

//       const response = await axios.post('/api/activities', requestData);
//       console.log('Activity created:', response.data);
//       navigate(`/activity/${response.data._id}/view`);
//       handleClose(); // Close modal after successful submission
//     } catch (error) {
//       console.error('Error creating activity:', error);
//     }
//   };

//   if (!userInfo) {
//     return <div>User is not logged in.</div>;
//   }

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Create Activity</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form className="activity-form" onSubmit={handleSubmit}>
//           <Container className="activity-form-container rounded">
//             <h4 className="form-title">Activity Details</h4>
//             <Input.Wrapper label="Activity Name">
//               <Input
//                 type="text"
//                 name="name"
//                 value={activityData.name}
//                 onChange={handleChange}
//               />
//             </Input.Wrapper>

//             <Input.Wrapper label="Location">
//               <Input
//                 type="text"
//                 name="location"
//                 value={activityData.location}
//                 onChange={handleChange}
//               />
//             </Input.Wrapper>

//             <DatePickerInput
//               label="Date"
//               firstDayOfWeek={0}
//               valueFormat="MM/DD/YYYY"
//               value={activityData.date}
//               onChange={(value) =>
//                 setActivityData({ ...activityData, date: value })
//               }
//             />

//             <TimeInput
//               label="Time"
//               format="12"
//               value={activityData.time}
//               onChange={handleChange}
//               name="time"
//             />

//             <Input.Wrapper label="Url">
//               <Input
//                 type="text"
//                 name="url"
//                 value={activityData.url}
//                 onChange={handleChange}
//               />
//             </Input.Wrapper>

//             <Input.Wrapper label="Accepting">
//               <NativeSelect
//                 name="capacity"
//                 value={activityData.capacity}
//                 onChange={handleChange}
//                 data={[
//                   'group',
//                   ...Array.from(Array(20).keys()).map((number) =>
//                     (number + 1).toString()
//                   ),
//                 ]}
//               />
//             </Input.Wrapper>

//             <Input.Wrapper label="Category">
//               <Input
//                 type="text"
//                 name="category"
//                 value={activityData.category}
//                 onChange={handleChange}
//               />
//             </Input.Wrapper>
//             <Space h="md" />

//             <Button type="submit">
//               <IconDeviceFloppy /> &nbsp;Add
//             </Button>
//           </Container>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default CreateActivityModal;

/// new FIX
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Input, NativeSelect, Button, Space } from '@mantine/core';
import { TimeInput, DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { IconDeviceFloppy } from '@tabler/icons-react';

dayjs.extend(timezone);

const CreateActivityModal = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState({
    name: '',
    date: dayjs().add(1, 'week'), // Ensure this is a dayjs object
    location: '',
    url: '',
    time: '18:00',
    capacity: '', // Default value
    category: '',
    timeZone: dayjs.tz.guess(),
  });

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('userInfo');
    if (!isLoggedIn) {
      console.error(
        'User is not logged in. Redirect to login page or show an error.'
      );
      return navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleDateChange = (value) => {
    setActivityData({ ...activityData, date: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting activity data:', activityData);

    try {
      const formattedDate = activityData.date.format('YYYY-MM-DD'); // Ensure the date is formatted correctly
      const requestData = {
        ...activityData,
        date: formattedDate,
      };

      const response = await axios.post('/api/activities', requestData);
      console.log('Activity created:', response.data);
      navigate(`/activity/${response.data._id}/view`);
      handleClose(); // Close modal after successful submission
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  if (!userInfo) {
    return <div>User is not logged in.</div>;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="activity-form" onSubmit={handleSubmit}>
          <Container className="activity-form-container rounded">
            <h4 className="form-title">Activity Details</h4>
            <Input.Wrapper label="Activity Name">
              <Input
                type="text"
                name="name"
                value={activityData.name}
                onChange={handleChange}
              />
            </Input.Wrapper>

            <Input.Wrapper label="Location">
              <Input
                type="text"
                name="location"
                value={activityData.location}
                onChange={handleChange}
              />
            </Input.Wrapper>

            <DatePickerInput
              label="Date"
              firstDayOfWeek={0}
              valueFormat="MM/DD/YYYY"
              value={activityData.date} // Ensure it is a dayjs object
              onChange={handleDateChange} // Use the specific handler for date changes
            />

            <TimeInput
              label="Time"
              format="12"
              value={activityData.time}
              onChange={handleChange}
              name="time"
            />

            <Input.Wrapper label="Url">
              <Input
                type="text"
                name="url"
                value={activityData.url}
                onChange={handleChange}
              />
            </Input.Wrapper>

            <Input.Wrapper label="Accepting">
              <NativeSelect
                name="capacity"
                value={activityData.capacity}
                onChange={handleChange}
                data={[
                  'group',
                  ...Array.from(Array(20).keys()).map((number) =>
                    (number + 1).toString()
                  ),
                ]}
              />
            </Input.Wrapper>

            <Input.Wrapper label="Category">
              <Input
                type="text"
                name="category"
                value={activityData.category}
                onChange={handleChange}
              />
            </Input.Wrapper>
            <Space h="md" />

            <Button type="submit">
              <IconDeviceFloppy /> &nbsp;Add
            </Button>
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateActivityModal;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Modal } from 'react-bootstrap';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { Input, NativeSelect, Button, Space } from '@mantine/core';
// import { TimeInput, DatePickerInput } from '@mantine/dates';
// import dayjs from 'dayjs';
// import timezone from 'dayjs/plugin/timezone';
// import { IconDeviceFloppy } from '@tabler/icons-react';

// dayjs.extend(timezone);

// const CreateActivityModal = ({ show, handleClose }) => {
//   const navigate = useNavigate();
//   const [activityData, setActivityData] = useState({
//     name: '',
//     date: dayjs().add(1, 'week'),
//     location: '',
//     url: '',
//     time: '18:00',
//     capacity: '', // Default value
//     category: '',
//     timeZone: dayjs.tz.guess(),
//   });

//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const isLoggedIn = !!localStorage.getItem('userInfo');
//     if (!isLoggedIn) {
//       console.error(
//         'User is not logged in. Redirect to login page or show an error.'
//       );
//       return navigate('/');
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setActivityData({ ...activityData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting activity data:', activityData);

//     try {
//       const formattedDate = activityData.date.toISOString().split('T')[0];
//       const requestData = {
//         ...activityData,
//         date: formattedDate,
//       };

//       const response = await axios.post('/api/activities', requestData);
//       console.log('Activity created:', response.data);
//       navigate(`/activity/${response.data._id}/view`);
//       handleClose(); // Close modal after successful submission
//     } catch (error) {
//       console.error('Error creating activity:', error);
//     }
//   };

//   if (!userInfo) {
//     return <div>User is not logged in.</div>;
//   }

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Create Activity</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form className="activity-form" onSubmit={handleSubmit}>
//           <Container className="activity-form-container rounded">
//             <h4 className="form-title">Activity Details</h4>
//             <Input.Wrapper label="Activity Name">
//               <Input
//                 type="text"
//                 name="name"
//                 value={activityData.name}
//                 onChange={handleChange}
//               />
//             </Input.Wrapper>

//             <Input.Wrapper label="Location">
//               <Input
//                 type="text"
//                 name="location"
//                 value={activityData.location}
//                 onChange={handleChange}
//               />
//             </Input.Wrapper>

//             <DatePickerInput
//               label="Date"
//               firstDayOfWeek={0}
//               valueFormat="MM/DD/YYYY"
//               value={activityData.date}
//               onChange={(value) =>
//                 setActivityData({ ...activityData, date: value })
//               }
//               minDate={dayjs()} // Optionally prevent past date selection
//             />

//             <TimeInput
//               label="Time"
//               format="12"
//               value={activityData.time}
//               onChange={handleChange}
//               name="time"
//             />

//             <Input.Wrapper label="Url">
//               <Input
//                 type="text"
//                 name="url"
//                 value={activityData.url}
//                 onChange={handleChange}
//               />
//             </Input.Wrapper>

//             <Input.Wrapper label="Accepting">
//               <NativeSelect
//                 name="capacity"
//                 value={activityData.capacity}
//                 onChange={handleChange}
//                 data={[
//                   'group',
//                   ...Array.from(Array(20).keys()).map((number) =>
//                     (number + 1).toString()
//                   ),
//                 ]}
//               />
//             </Input.Wrapper>

//             <Input.Wrapper label="Category">
//               <Input
//                 type="text"
//                 name="category"
//                 value={activityData.category}
//                 onChange={handleChange}
//               />
//             </Input.Wrapper>
//             <Space h="md" />

//             <Button type="submit">
//               <IconDeviceFloppy /> &nbsp;Add
//             </Button>
//           </Container>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default CreateActivityModal;
