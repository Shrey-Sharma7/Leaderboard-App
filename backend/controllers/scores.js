const User = require('../models/User');
const cache = require('../redis_db');

exports.updateScore = async (req, res) => {
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

        io.emit('update', {username: user.username, score: user.score});
        
        res.status(200).json({
            username: user.username,
            score: user.score
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

