import { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState(userInfo.location || ''); // Set default value if username is undefined NOT SURE WE NEED THIS FORMAT REVIST
  // const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setUsername(userInfo.username);
      setLocation(userInfo.Location || ''); //POSSIBLY REVISIT
    }
  }, [
    userInfo,
    userInfo.name,
    userInfo.email,
    userInfo.username,
    userInfo.location,
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log('submitHandler');
    if (password !== confirmPassword) {
      toast.error('Password do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          username,
          location,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message);
        // toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="username" className="my-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="location" className="my-2">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="location"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>Column 2</Col>
    </Row>
  );
};

export default ProfilePage;
// --------- WORKING CODE ---------------------
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux/es/hooks/useSelector';
// import { useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Form, Button, FormGroup } from 'react-bootstrap';

// import {
//   useUpdateUserMutation,
//   useProfileMutation,
//   useUploadProfileImageMutation,
// } from '../slices/usersApiSlice';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import FormContainer from '../components/FormContainer';
// import { FormControl } from 'react-bootstrap';
// import ProfileImage from '../components/ProfileImage';

// const ProfilePage = () => {
//   const { id: userId } = useParams();
//   const [image, setImage] = useState('');
//   const [updateUser, { isLoading: LoadingUpdate }] = useUpdateUserMutation();

//   const [uploadProfileImage, { isLoading: LoadingUpload }] =
//     useUploadProfileImageMutation();

//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     // const updateUser = {
//     //   _id: user._Id,
//     //   name,
//     //   email,
//     //   location,
//     // };

//     const result = await updateUser(updateUser);
//     if (result.error) {
//       toast.error(result.error);
//     } else {
//       toast.success('User updated');
//       console.log('Before navigate');
//       navigate('/');
//       console.log('After navigate');
//     }
//   };

//   const { userInfo } = useSelector((state) => state.auth);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [location, setLocation] = useState('');

//   const [isEditingName, setIsEditingName] = useState(false);
//   const [isEditingEmail, setIsEditingEmail] = useState(false);
//   const [isEditingLocation, setIsEditingLocation] = useState(false);

//   useEffect(() => {
//     if (userInfo) {
//       setName(userInfo.name);
//       setEmail(userInfo.email);
//       setLocation(userInfo.location || '');
//     }
//   }, [userInfo]);

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   const handleNameEdit = () => {
//     setIsEditingName(true);
//   };

//   const handleEmailEdit = () => {
//     setIsEditingEmail(true);
//   };

//   const handleLocationEdit = () => {
//     setIsEditingLocation(true);
//   };

//   const handleNameSave = async () => {
//     setIsEditingName(false);
//     try {
//       await axios.put(`/api/users/${userInfo._id}`, { name });
//       // Assuming you have an API endpoint for updating user name
//     } catch (error) {
//       console.error('Error updating name:', error);
//     }
//   };

//   const handleEmailSave = async () => {
//     setIsEditingEmail(false);
//     try {
//       await axios.put(`/api/users/${userInfo._id}`, { email });
//       // Assuming you have an API endpoint for updating user email
//     } catch (error) {
//       console.error('Error updating email:', error);
//     }
//   };

//   const handleLocationSave = async () => {
//     setIsEditingLocation(false);
//     try {
//       await axios.put(`/api/users/${userInfo._id}`, { location });
//       // Assuming you have an API endpoint for updating user email
//     } catch (error) {
//       console.error('Error updating location:', error);
//     }
//   };

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append('image', e.target.files[0]);
//     try {
//       const res = await uploadProfileImage(formData).unwrap();
//       toast.success(res.message);
//       setImage(res.image);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   // || err.error

//   return (
//     <>
//       <FormContainer>
//         <Form onSubmit={submitHandler}>
//           <FormGroup controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             ></Form.Control>
//           </FormGroup>
//           <FormGroup controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             ></Form.Control>
//           </FormGroup>
//           <Form.Group controlId="image">
//             <Form.Label>Profile Photo</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter image url"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//             ></Form.Control>
//             <FormControl
//               type="file"
//               label="Choose File"
//               onChange={uploadFileHandler}
//             ></FormControl>
//           </Form.Group>
//           <FormGroup controlId="location">
//             <Form.Label>Location</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             ></Form.Control>
//           </FormGroup>
//           <Button type="submit" variant="primary" className="my-2">
//             Update
//           </Button>
//         </Form>
//         {image && <ProfileImage image={image} />}
//       </FormContainer>
//     </>
//   );
// };

// export default ProfilePage;

// ---------------------------------------------------------------
// import { Container } from 'react-bootstrap';
// // import FormContainer from '../components/FormContainer';

// const Profile = () => {
//   //   const { userInfo } = useSelector((state) => state.auth);
//   return (
//     <>
//       <Container>
//         <h1>Profile</h1>
//         <h2>Name</h2>
//         <h2>photo</h2>
//         <h3>location</h3>
//       </Container>
//     </>
//   );
// };

// export default Profile;
//----
// const ProfilePage = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [name, setName] = useState('John Doe');
//   const [email, setEmail] = useState('johndoe@example.com');
//   const [isEditingName, setIsEditingName] = useState(false);
//   const [isEditingEmail, setIsEditingEmail] = useState(false);

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleNameEdit = () => {
//     setIsEditingName(true);
//   };

//   const handleEmailEdit = () => {
//     setIsEditingEmail(true);
//   };

//   const handleNameSave = () => {
//     setIsEditingName(false);
//     // Save name to backend or update state
//   };

//   const handleEmailSave = () => {
//     setIsEditingEmail(false);
//     // Save email to backend or update state
//   };

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <div>
//         <label>Name: </label>
//         {isEditingName ? (
//           <input
//             type="text"
//             value={name}
//             onChange={handleNameChange}
//             onBlur={handleNameSave}
//             autoFocus
//           />
//         ) : (
//           <span onClick={handleNameEdit}>{name}</span>
//         )}
//       </div>
//       <div>
//         <label>Email: </label>
//         {isEditingEmail ? (
//           <input
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             onBlur={handleEmailSave}
//             autoFocus
//           />
//         ) : (
//           <span onClick={handleEmailEdit}>{email}</span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// <div>
//   <h1>Profile Page</h1>
//   <div>
//     <label>Name: </label>
//     {isEditingName ? (
//       <input
//         type="text"
//         value={name}
//         onChange={handleNameChange}
//         onBlur={handleNameSave}
//         autoFocus
//       />
//     ) : (
//       <span onClick={handleNameEdit}>{name}</span>
//     )}
//   </div>
//   <div>
//     <label>Email: </label>
//     {isEditingEmail ? (
//       <input
//         type="email"
//         value={email}
//         onChange={handleEmailChange}
//         onBlur={handleEmailSave}
//         autoFocus
//       />
//     ) : (
//       <span onClick={handleEmailEdit}>{email}</span>
//     )}
//   </div>
//   <div>
//     <label>Location: </label>
//     {isEditingLocation ? (
//       <input
//         type="text"
//         value={location}
//         onChange={handleLocationChange}
//         onBlur={handleLocationSave}
//         autoFocus
//       />
//     ) : (
//       <span onClick={handleLocationEdit}>{location}</span>
//     )}
//   </div>
//   <div>
//     <label
//       type="text"
//       placeholder="Enter image url"
//       value={image}
//       onChange={(e) => setImage}
//     >
//       Image
//     </label>
//     <label
//       type="file"
//       label="Choose file"
//       onChange={uploadFileHandler}
//     ></label>
//   </div>
// </div>
