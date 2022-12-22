const Redis = require('ioredis');
const fs = require('fs');

const cache = new Redis({
    host: 'redis-13374.c264.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 13374,
    password: 'himnnrZPvZYUSa1xAsvHJW0sExcmLGYX'
});

module.exports = cache;