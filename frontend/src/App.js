import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
// import Home from './pages/Home';
import CreateActivity from './pages/CreateActivity';
import ExternalView from './pages/ExternalView';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        {/* <Container>
          <div>Welcome to TakeOn</div>
        </Container> */}
        <Outlet />
        {/* <CreateEvent />
        <ExternalView /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
