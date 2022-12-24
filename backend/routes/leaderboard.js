const express = require('express');
const router = express.Router();
const cache = require('../redis_db');
const User = require('../models/User');
// const leaderboardController = require('../controllers/leaderboard');

module.exports = function (io) {
    router.get('/', async (req, res) => {
        try {
            const leaderboard = await cache.zrevrange("leaderboard", 0, 20, "WITHSCORES");
            const users = [];

            for (let i = 0; i < leaderboard.length; i += 2) {
                users.push({
                    username: leaderboard[i],
                    score: leaderboard[i + 1]
                });
            }
            // io.emit("leaderboard", users);
            res.status(200).json(users);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    return router;
}
