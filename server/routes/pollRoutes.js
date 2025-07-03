const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

router.get('/history', async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 }).limit(10);
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching polls' });
  }
});

module.exports = router;
