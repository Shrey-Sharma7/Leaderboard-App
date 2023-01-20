const express = require('express');
const router = express.Router();
const cache = require('../redis_db');
const dynamo = require('../dynamo');

module.exports = function (io) {
    // using dynamo
    router.get('/', async (req, res) => {
        try {
            const leaderboard = await cache.zrevrange("leaderboard_dynamo", 0, 20, "WITHSCORES");
            const users = [];

            for (let i = 0; i < leaderboard.length; i += 2) {
                users.push({
                    username: leaderboard[i],
                    score: leaderboard[i + 1]
                });
            }

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    return router;
}