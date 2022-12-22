require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cache = require('./redis_db');
const { authCheck } = require('./middlewares/auth');
const authRoute = require('./routes/auth');

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
    console.log('We are connected');
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use(`/api/auth`, authRoute);
app.use('/api/scores', authCheck, require('./routes/scores'));

module.exports = app;
