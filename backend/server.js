//use ES6 modules so that languge on frontned matches backend but not necessary.

import express from 'express';
import events from './data/events.js';
//const app = express();common js syntax
const port = 5001; // select port it opens on
const app = express(); //code to initialize express so calling it app

//first route
app.get('/', (req, res) => res.send('API is running...'));

//data route serving all products
app.get('/api/events', (req, res) => {
  res.json(events);
});

//route for serving single product
app.get('/api/events/:id', (req, res) => {
  const event = events.find((p) => p._id === req.params.id);
  res.json(event);
});
//start server up

app.listen(port, () => console.log(`Server running on port ${port}`));
