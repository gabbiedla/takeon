import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './index.css';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const App = () => {
  const location = useLocation();

  // Define background colors based on routes
  const getBackgroundColor = () => {
    switch (location.pathname) {
      case '/':
        return '#4269e2'; // Landing Page background
      case '/home/:userId':
        return '#e7e7e7'; // Home Page background
      default:
        return '#e7e7e7'; // Default background
    }
  };
  return (
    <MantineProvider>
      <Header />
      {/* <main className="py-3"> */}
      <main style={{ backgroundColor: '#e7e7e7', minHeight: '100vh' }}>
        {/* <main backgroundColor={getBackgroundColor()}> */}
        <Container fluid style={{ padding: 0, margin: 0 }}>
          <Outlet />
        </Container>
      </main>
      <Footer backgroundColor={getBackgroundColor()} />
      <ToastContainer />
    </MantineProvider>
  );
};

export default App;
