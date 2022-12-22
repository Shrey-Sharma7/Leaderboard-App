const express = require('express');
const router = express.Router();
const scoresController = require('../controllers/scores');


// update score
router.patch('/', scoresController.updateScore);

// get leaderboard
router.get('/', scoresController.getLeaderboard);

module.exports = router;