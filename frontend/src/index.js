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
import 'bootstrap/dist/css/bootstrap.min.css'; //optonal
// import './bootstrap.custom.css';
import './index.css';

import App from './App';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import ExternalView from './pages/ExternalView';
import CreateActivity from './pages/CreateActivity';
import Register from './pages/Register';
import Login from './pages/Login';
import ActivityEdit from './pages/ActivityEdit';
import Profile from './pages/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route index={true} path="/" element={<Home />} /> */}
      <Route path="/gdla-calendar" element={<ExternalView />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/activity/:id/edit" element={<ActivityEdit />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}

      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/add-activity" element={<CreateActivity />} />
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
    {/* <App />  */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
