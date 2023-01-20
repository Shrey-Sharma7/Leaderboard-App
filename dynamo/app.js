require('dotenv').config();
const express = require('express');
const app = express();

const dynamo = require('./dynamo');
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const port = process.env.PORT || 3000;

// const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cache = require('./redis_db');
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

const { authCheck } = require('./middlewares/auth');
const authRoute = require('./routes/auth')(io);
const scoresRoute = require('./routes/scores')(io);
const leaderboardRoute = require('./routes/leaderboard')(io);

cache.on('connect', () => {
    console.log('Redis client connected');
});
cache.on('error', (err) => {
    console.log(`Something went wrong ${err}`);
});

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Set Interval to update redis cache every 5 minutes


// Routes
app.use('/api/auth', authRoute);
app.use('/api/scores', authCheck, scoresRoute);
app.use('/api/leaderboard', leaderboardRoute);

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
});

server.listen(port, () => {
    console.log(`server started on port ${port}`);
});