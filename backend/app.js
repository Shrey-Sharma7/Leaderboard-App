require('dotenv').config();
const express = require('express');
const app = express();

const server = require('http').createServer(app);
const { Server } = require('socket.io');
const port = process.env.PORT || 3000;

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
    }
});

const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cache = require('./redis_db');
const { authCheck } = require('./middlewares/auth');
const authRoute = require('./routes/auth')(io);
const scoresRoute = require('./routes/scores')(io);
const leaderboardRoute = require('./routes/leaderboard')(io);
const User = require('./models/User');

// Connect to redis

cache.on('connect', () => {
    console.log('Redis client connected');
});
cache.on('error', (err) => {
    console.log(`Something went wrong ${err}`);
});

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // We're connected!
    console.log('MongoDB connected');
});

setInterval(() => {
    // Fetch the latest data from the MongoDB collection
    User.find((err, leaderboard) => {
        if (err) {
            console.error(err);
        } else {
            // Delete data from the Redis sorted set if it is not present in the MongoDB collection
            cache.zrange('leaderboard', 0, -1, (err, names) => {
                if (err) {
                    console.error(err);
                } else {
                    names.forEach((name) => {
                        if (!leaderboard.find((item) => item.username === name)) {
                            cache.zrem('leaderboard', name, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                    });
                }
            });
            // Add the data to the Redis sorted set
            leaderboard.forEach((item) => {
                cache.zadd('leaderboard', item.score, item.username, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
            io.emit('updateScore', 'Update Score');
            // console.log('Redis sorted set updated');
        }
    });
}, 5000);

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use(`/api/auth`, authRoute);
app.use('/api/scores', authCheck, scoresRoute);
app.use('/api/leaderboard', leaderboardRoute);

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
});

server.listen(port, () => {
    console.log(`server started on port ${port}`);
});