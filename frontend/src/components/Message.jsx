import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ varient, children }) => {
  return <Alert varient={varient}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
