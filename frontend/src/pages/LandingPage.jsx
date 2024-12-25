// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="container">
//       <header className="header">
//         <h1>What’s Next for You?</h1>
//         <h2>Seize the Day Your Way</h2>
//         <h3>Create, Share, Experience</h3>
//       </header>

//       <section className="body">
//         <p>
//           From casual coffee chats to unforgettable adventures, take charge of your plans and your time. Create events, share your calendar, and let friends RSVP with ease. Simplified planning means more time to live the life you want—starting now.
//         </p>
//       </section>

//       <footer className="cta">
//         <button className="cta-button">Plan Your Way</button>
//       </footer>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import '../landingpage.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// import './App.css';

const LandingPage = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: '#4269e2', // Replace with your desired color
          // minHeight: '100vh',
          minHeight: '100vh',
          // width: '100%',
          // position: 'relative',
          // margin: 0,
          // padding: 0,
        }}
      >
        <div className="landing-page-container">
          <div>
            <h1 className="header-one">What&#39;s Next for You?</h1>
            {/* <h2 className="header-two">Seize the day your way</h2> */}
            {/* <h3 className="header-three">Create. Share. Experience.</h3> */}
            <h3 className="header-three">Sieze the Day Your Way</h3>
          </div>
          <section className="about">
            <p>
              Whether you&#39;re in the mood for casual coffee chats or
              unforgettable adventures,{' '}
              <strong style={{ color: 'black' }}>create</strong> events,{' '}
              <strong style={{ color: 'black' }}>share</strong> your calendar,
              and let others{' '}
              <strong style={{ color: 'black' }}>experience</strong> moments
              with you. Simplified planning means more time living fully!
            </p>
          </section>

          {/* <section className="steps">
        <h3>How it Works</h3>
        <div className="steps-row">
          <div className="step">
            <div className="circle">1</div>
            <h4>Create</h4> */}
          {/* <p>
              Plan your events effortlessly. From casual coffee chats to
              unforgettable adventures, start organizing your moments with ease.
            </p> */}
          {/* </div>
          <div className="step">
            <div className="circle">2</div>
            <h4>Share</h4> */}
          {/* <p>
              Share your plans and calendar with friends, and let them RSVP
              instantly. Keep everyone on the same page, hassle-free.
            </p> */}
          {/* </div>
          <div className="step">
            <div className="circle">3</div>
            <h4>Experience</h4> */}
          {/* <p>
              Enjoy memorable moments with friends, family, and peers.
              Simplified planning means more time to live the life you want.
            </p> */}
          {/* </div>
        </div>
      </section> */}

          <div className="hero-cta-container">
            <Link to="/register">
              <button className="hero-cta-button">Plan Your Way</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
