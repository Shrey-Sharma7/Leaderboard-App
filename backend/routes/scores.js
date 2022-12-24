const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cache = require('../redis_db');
// const scoresController = require('../controllers/scores');

// update score

function scoresRoute(io) {
    router.patch('/', async (req, res) => {
        try {
            const user = await User.findById(req.userId);

            let amount = req.body.amount;

            if (req.body.type === "debit") {
                amount = -amount;
            }

            user.score += amount;
            if (user.score < 0) {
                throw new Error("Score cannot be negative");
            }
            
            
            await user.save();
            await cache.zadd("leaderboard", user.score, user.username);
            
            io.emit('updateScore', 'Update Score');

            res.status(200).json({
                username: user.username,
                score: user.score
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    return router;
}

module.exports = scoresRoute;