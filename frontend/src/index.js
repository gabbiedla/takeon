import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; //optonal
// import './bootstrap.custom.css';
import './index.css';
import Home from './pages/Home';
import App from './App';
import ExternalView from './pages/ExternalView';
import CreateActivity from './pages/CreateActivity';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/gdla-calendar" element={<ExternalView />} />
      <Route path="/add-activity" element={<CreateActivity />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App />  */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
