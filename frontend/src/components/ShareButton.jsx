import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const ShareButton = () => {
  return (
    <LinkContainer to="/gdla-calendar">
      <button className="share-btn rounded border-0">Share</button>
    </LinkContainer>
  );
};

export default ShareButton;
