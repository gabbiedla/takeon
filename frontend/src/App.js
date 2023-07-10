import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import ExternalView from './pages/ExternalView';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        {/* <Container>
          <div>Welcome to TakeOn</div>
        </Container> */}
        <Home />
        <CreateEvent />
        <ExternalView />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
