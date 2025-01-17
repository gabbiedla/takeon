import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
// import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from './ProfileImage';
import { FaHome } from 'react-icons/fa';

// import { useParams } from 'react-router-dom';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const username = userInfo?.username || '';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="md" collapseOnSelect>
        <Container>
          {/* <LinkContainer to={`/home/${username}`}> */}
          <LinkContainer className="ga4-app-name" to={`/`}>
            {/* <LinkContainer to="/"> old code*/}
            <Navbar.Brand>Circyl</Navbar.Brand>
            {/* <FaHome /> */}
          </LinkContainer>
          {userInfo && (
            <div className="ga4-home-icon-btn">
              <LinkContainer
                // className="ga4-home-icon-btn"
                to={`/home/${username}`}
                style={{ display: 'inline-block', cursor: 'pointer' }}
              >
                <div
                  // className="ga4-home-icon-btn"
                  style={{
                    backgroundColor: '#000000',
                    padding: '10px',
                    borderRadius: '50%',
                  }}
                >
                  <FaHome
                    // className="ga4-home-icon-btn"
                    style={{ color: 'white', fontSize: '20px' }}
                  />
                </div>
              </LinkContainer>
            </div>
          )}
          {/* <LinkContainer
            to={`/home/${username}`}
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            <div
              style={{
                backgroundColor: '#000000',
                padding: '10px',
                borderRadius: '50%',
              }}
            >
              <FaHome style={{ color: 'white', fontSize: '20px' }} />
            </div>
          </LinkContainer> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link href="/cart">
                <FaShoppingCart />
                {` `} Cart
              </Nav.Link> */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {userInfo.profileImage && (
                    <ProfileImage image={userInfo.profileImage} />
                  )}
                  <LinkContainer className="ga4-account-btn" to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    className="ga4-logout-btn"
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="ga4-header-sign-in-btn">
                      <FaUser />
                      {` `} Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaUser />
                      {` `} Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {/* <LinkContainer to="/register">
                <Nav.Link>
                  <FaUser />
                  {` `} Register
                </Nav.Link>
              </LinkContainer> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
