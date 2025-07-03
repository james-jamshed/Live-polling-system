const express = require('express');
const router = express.Router();
const { getAllPolls } = require('../controllers/pollController');

router.get('/', getAllPolls);

module.exports = router;
