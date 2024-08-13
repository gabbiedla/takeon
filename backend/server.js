//use ES6 modules so that languge on frontned matches backend but not necessary.
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import activityRoutes from './routes/activityRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
// import events from './data/events.js';
import rsvpRoutes from './routes/rsvpRoutes.js';

connectDB(); // Connect to MongoDB

const port = process.env.PORT || 5001;

//const app = express();common js syntax
// const port = 5001; select port it opens on
const app = express(); //code to initialize express so calling it app

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

//first route
app.get('/', (req, res) => res.send('API is running...'));

app.use('/api/activities', activityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/rsvps', rsvpRoutes);

const __dirname = path.resolve(); // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//app.use

app.use(notFound);
app.use(errorHandler);

//start server up

app.listen(port, () => console.log(`Server running on port ${port}`));
