import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
// import Home from './pages/Home';
import CreateActivity from './pages/CreateActivity';
import ExternalView from './pages/ExternalView';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
        {/* <CreateEvent />
        <ExternalView /> */}
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
