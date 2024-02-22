// ProfileImage.js
import React from 'react';

const ProfileImage = ({ image }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Uploaded Image Preview</h2>
      <img
        src={image}
        alt="Profile"
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default ProfileImage;
