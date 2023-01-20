const express = require('express');
const router = express.Router();
const dynamo = require('../dynamo');
const cache = require('../redis_db');


function scoresRoute(io) {
    router.patch('/', async (req, res) => {
        try {
            const user = await dynamo.getData(req.username);
            // console.log(item);
            console.log(user)
            let amount = req.body.amount;

            if (req.body.type === "debit") {
                amount = -amount;
            }

            user.score += amount;
            if (user.score < 0) {
                throw new Error("Score cannot be negative");
            }

            await dynamo.updateData(user);
            await cache.zadd("leaderboard_dynamo", user.score, user.username);

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