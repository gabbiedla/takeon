import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button, FormGroup } from 'react-bootstrap';

import {
  useUpdateUserMutation,
  useUploadProfileImageMutation,
} from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { FormControl } from 'react-bootstrap';
import ProfileImage from '../components/ProfileImage';

const ProfilePage = () => {
  const { id: userId } = useParams();
  const [image, setImage] = useState('');
  const [updateUser, { isLoading: LoadingUpdate }] = useUpdateUserMutation();

  const [uploadProfileImage, { isLoading: LoadingUpload }] =
    useUploadProfileImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // const updateUser = {
    //   _id: user._Id,
    //   name,
    //   email,
    //   location,
    // };

    const result = await updateUser(updateUser);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('User updated');
      console.log('Before navigate');
      navigate('/');
      console.log('After navigate');
    }
  };

  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setLocation(userInfo.location || '');
    }
  }, [userInfo]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleEmailEdit = () => {
    setIsEditingEmail(true);
  };

  const handleLocationEdit = () => {
    setIsEditingLocation(true);
  };

  const handleNameSave = async () => {
    setIsEditingName(false);
    try {
      await axios.put(`/api/users/${userInfo._id}`, { name });
      // Assuming you have an API endpoint for updating user name
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const handleEmailSave = async () => {
    setIsEditingEmail(false);
    try {
      await axios.put(`/api/users/${userInfo._id}`, { email });
      // Assuming you have an API endpoint for updating user email
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handleLocationSave = async () => {
    setIsEditingLocation(false);
    try {
      await axios.put(`/api/users/${userInfo._id}`, { location });
      // Assuming you have an API endpoint for updating user email
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProfileImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // || err.error

  return (
    <>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <Form.Group controlId="image">
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <FormControl
              type="file"
              label="Choose File"
              onChange={uploadFileHandler}
            ></FormControl>
          </Form.Group>
          <FormGroup controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
        {image && <ProfileImage image={image} />}
      </FormContainer>
    </>
  );
};

export default ProfilePage;
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
