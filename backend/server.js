//use ES6 modules so that languge on frontned matches backend but not necessary.

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import activityRoutes from './routes/activityRoutes.js';
import userRoutes from './routes/userRoutes.js';

// import events from './data/events.js';

connectDB(); // Connect to MongoDB

const port = process.env.PORT || 5002;

//const app = express();common js syntax
// const port = 5001; select port it opens on
const app = express(); //code to initialize express so calling it app

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//first route
app.get('/', (req, res) => res.send('API is running...'));

app.use('/api/activities', activityRoutes);
app.use('/api/users', userRoutes);

//app.use

app.use(notFound);
app.use(errorHandler);

//start server up

app.listen(port, () => console.log(`Server running on port ${port}`));
