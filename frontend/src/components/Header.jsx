import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>TakeOn</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link href="/cart">
                <FaShoppingCart />
                {` `} Cart
              </Nav.Link> */}
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser />
                  {` `} Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/create-account">
                <Nav.Link>
                  <FaUser />
                  {` `} Create Account
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
