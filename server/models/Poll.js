const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  question: String,
  options: [String],
  results: Object
}, { timestamps: true });

module.exports = mongoose.model('Poll', PollSchema);
