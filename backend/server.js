//use ES6 modules so that languge on frontned matches backend but not necessary.

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
// import events from './data/events.js';
import activities from './data/activities.js';

connectDB(); // Connect to MongoDB

const port = process.env.PORT || 5002;

//const app = express();common js syntax
// const port = 5001; select port it opens on
const app = express(); //code to initialize express so calling it app

//first route
app.get('/', (req, res) => res.send('API is running...'));

//data route serving all products
app.get('/api/activities', (req, res) => {
  res.json(activities);
});

//route for serving single product
app.get('/api/activities/:id', (req, res) => {
  const event = activities.find((p) => p._id === req.params.id);
  res.json(activity);
});
//start server up

app.listen(port, () => console.log(`Server running on port ${port}`));
