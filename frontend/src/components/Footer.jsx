import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = ({ backgroundColor }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: backgroundColor || '#c8c8c8', // Default fallback
        padding: '1rem 0',
        textAlign: 'center',
      }}
    >
      <Container>
        <Row>
          <Col>
            <p>Circyl &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
// className="text-center py-3" goes inside <Col>
