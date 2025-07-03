const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  question: String,
  answers: {
    type: Map,
    of: Number,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Poll', PollSchema);
