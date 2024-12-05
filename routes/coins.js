const express = require('express');
const router = express.Router();

const coinController = require('../controllers/coinController');

router.get('/', coinController.getAllCoins);

module.exports = router;
