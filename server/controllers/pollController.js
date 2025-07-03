const Poll = require('../models/Poll');

// GET all polls (latest first)
const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single poll by ID
const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });
    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a new poll manually (not via socket)
const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    const newPoll = await Poll.create({ question, options, results: {} });
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllPolls,
  getPollById,
  createPoll,
};
