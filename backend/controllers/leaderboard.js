const User = require('../models/User');
const cache = require('../redis_db');

exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await cache.zrevrange("leaderboard", 0, 20, "WITHSCORES");
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
}