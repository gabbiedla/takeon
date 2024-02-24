// import React from 'react';

// const EventShareButton = () => {
//   return <button className="share-btn rounded border-0">Share Event</button>;
// };

// export default EventShareButton;
import React from 'react';

const EventShareButton = ({ onClick }) => {
  return (
    <button className="share-btn rounded border-0" onClick={onClick}>
      Share Event
    </button>
  );
};

export default EventShareButton;
