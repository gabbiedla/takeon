// import React from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
// import { useParams } from 'react-router-dom';

// const ShareButton = () => {
//   const { userId } = useParams();
//   return (
//     // <LinkContainer to="/activities/:userId">
//     <LinkContainer to="/activities">
//       <button className="share-btn rounded border-0">Share</button>
//     </LinkContainer>
//   );
// };

// export default ShareButton;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ShareButton = ({ userId }) => {
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     // Navigate to the desired URL
//     navigate(`/activities/user/${userId}`);
//   };

//   return <button onClick={handleButtonClick}>Go to activities</button>;
// };

// export default ShareButton;

// ///NEW
// const ShareButton = ({ userId }) => {
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     // Ensure userId is defined before navigating
//     if (userId) {
//       navigate(`/activities/user/${userId}`);
//     } else {
//       console.error('userId is not defined');
//       // Handle the case where userId is not defined
//       // For example, you could display an error message to the user
//     }
//   };

//   return <button onClick={handleButtonClick}>Go to activities</button>;
// };

// export default ShareButton;

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

const ShareButton = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Ensure userId is defined before navigating
    if (userId) {
      navigate(`/activities/user/${userId}`);
    } else {
      console.error('userId is not defined');
      // Handle the case where userId is not defined
      // For example, you could display an error message to the user
    }
  };

  return <button onClick={handleButtonClick}>Go to activities</button>;
};

export default ShareButton;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ShareButton = () => {
//   const [userID, setUserID] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulating fetching the signed-in user ID
//     const fetchUserID = async () => {
//       // Assuming you have a function to get the signed-in user ID
//       const userIDFromAPI = await fetchUserIDFromAPI();
//       setUserID(userIDFromAPI);
//     };
//     fetchUserID();
//   }, []);

//   const fetchUserIDFromAPI = async () => {
//     // You would replace this with actual logic to fetch the signed-in user ID
//     // For demonstration, let's say it returns a mock user ID after some delay
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve('123456'); // Mock user ID
//       }, 1000);
//     });
//   };

//   const handleClick = () => {
//     // Navigate to a new page with the user ID
//     if (userID) {
//       navigate(`/profile/${userID}`);
//     }
//   };

//   return <button onClick={handleClick}>Go to Profile</button>;
// };

// export default ShareButton;
