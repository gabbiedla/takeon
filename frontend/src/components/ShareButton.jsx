import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const ShareButton = () => {
  return (
    <LinkContainer to="/calendar/:id">
      <button className="share-btn rounded border-0">Share</button>
    </LinkContainer>
  );
};

export default ShareButton;
