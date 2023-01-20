require('dotenv').config();
const Redis = require('ioredis');
const fs = require('fs');

const cache = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

module.exports = cache;