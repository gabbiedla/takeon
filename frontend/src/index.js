import React from 'react';

import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { IconHome } from '@tabler/icons-react';

import App from './App';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import CreateActivity from './pages/CreateActivity';
import OnboardCreateActivity from './pages/OnboardingForm';
import Register from './pages/Register';
import Login from './pages/Login';
import ActivityEdit from './pages/ActivityEdit';
import Profile from './pages/Profile';
import ExternalEventView from './pages/ExternalEventView';
import Test from './pages/Test';
import RsvpPage from './pages/RsvpPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/** Index page */}
      {/* <Route index={true} element={<IconHome size={48} />} /> */}
      <Route index={true} element={<LandingPage />} />

      {/* <Route index={true} path="/" element={<Home />} /> */}

      {/* //allows non users to view activities by user */}
      {/* <Route path="/activities/user/:userId" element={<ExternalView />} /> */}

      {/* //testingusername need to create new page */}
      {/* <Route path="/activities/user/username" element={<ExternalView />} /> */}

      {/* THis allows button to work and navigate and view activites internally... */}
      {/* <Route path="/activities/user/:userId" element={<ExternalViewTwo />} /> */}
      <Route path="/:username" element={<Test />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activity/:id/view" element={<ExternalEventView />} />
      <Route path="/activity/:id/rsvp" element={<RsvpPage />} />

      {/* <Route path="/activity/:id/edit" element={<ActivityEdit />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}

      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/home/:userId" element={<Home />} />
        <Route path="/add-activity" element={<CreateActivity />} />
        <Route path="/create-activity" element={<OnboardCreateActivity />} />
        <Route path="/activity/:id/edit" element={<ActivityEdit />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* <Route path="" element={<AdminRoute />}>
        <Route path="/admin/activity/:id/edit" element={<ActivityEdit />} />
      </Route> */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
