//use ES6 modules so that languge on frontned matches backend but not necessary.

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import activityRoutes from './routes/activityRoutes.js';
dotenv.config();
// import events from './data/events.js';

connectDB(); // Connect to MongoDB

const port = process.env.PORT || 5002;

//const app = express();common js syntax
// const port = 5001; select port it opens on
const app = express(); //code to initialize express so calling it app

//first route
app.get('/', (req, res) => res.send('API is running...'));

app.use('api/activities', activityRoutes);

//start server up

app.listen(port, () => console.log(`Server running on port ${port}`));
