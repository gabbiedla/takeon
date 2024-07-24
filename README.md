# Calendar Social App

## Table of Contents

1 - Introduction
2 - Features
3 - Technology Used
4 - Usage
5 - Configuration

## Introduction

This application is meant to be a social calendar web app. One that was inspired
by a blend linktree and calendly. It is designed to help users organize
activities, share, and invite friends to join them. It features a public
calendar link where all events are public for people to view, rsvp functionality
for non users, creating event functionality, etc.

## Features

- Create, edit, share events
- Share event calendar
- Share event details page
- RSVP for non users
- RSVP for users

## Technology Used

- Built with MERN
- Frontend: React, Redux, Bootstrap, Axios
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Usage

### Locally

Uses the `node` from the host machine.

Run `npm i` in the root, and children folder.

#### Install Locally

```bash

npm i
cd backend
npm i
cd ../frontend
npm i
```

#### Run Locally

Uses concurrent to run the front end and server at the same time.

```bash

npm run dev
```

Opens the application in `localhost:3000` and attempts to connect to local mongo.

## Configuration

```bash

NODE_ENV=development
PORT=5001
MONGO_URI=mongodb+srv://gdla23:Socal23@cluster0.5ngsjz6.mongodb.net/socal?retryWrites=true&w=majority
JWT_SECRET=abc123
```

## Github Actions

Every pull request and deployment runs the following actions:

```bash

npm run test

npm run build
```

To verify that the test and build commands don't have new errors.

Checkout the workflow folder for details.

## Package Scripts

Available scripts in `package.json`

```js

    "test": "echo \"Warning: test success\"",
    "build": "echo \"Creating build process\"",
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "data:import": "node backend/seeder.js",
    "data:destroy": "node backend/seeder.js -d"
```
