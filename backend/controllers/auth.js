const User = require('../models/User');
const cache = require('../redis_db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        // Hash the user's password
        const hash = await bcrypt.hash(req.body.password, 10);

        // Create a new user document
        const user = new User({
            username: req.body.username,
            password: hash,
        });

        // Save the user to the database
        await user.save()
        // add user to redis
        await cache.zadd('leaderboard', user.score, user.username);

        // io.emit('update', {username: user.username, score: user.score});

        // Generate a JWT and return it to the client
        // const token = jwt.sign(user, 'test', { expiresIn: "1h" });
        const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_KEY, { expiresIn: "10h" });

        return res.status(201).json({
            message: 'User created',
            token: token,
            userName: user.username,
            score: user.score
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_KEY, { expiresIn: "10h" });
        return res.status(200).json({
            message: 'Auth successful',
            token: token
        });

    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
}

