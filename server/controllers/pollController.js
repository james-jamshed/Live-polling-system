const Poll = require('../models/Poll');

let currentPoll = null;
let answeredStudents = new Set();

exports.handleCreatePoll = (io, data) => {
  currentPoll = {
    question: data.question,
    options: data.options,
    answers: {},
    time: data.time || 60,
  };
  answeredStudents = new Set();

  io.emit('new_poll', currentPoll);

  setTimeout(() => {
    io.emit('poll_results', currentPoll.answers);
    const newPoll = new Poll({
      question: currentPoll.question,
      answers: currentPoll.answers,
    });
    newPoll.save();
    currentPoll = null;
  }, currentPoll.time * 1000);
};

exports.handleSubmitAnswer = (io, { name, answer }) => {
  if (!currentPoll || answeredStudents.has(name)) return;

  currentPoll.answers[answer] = (currentPoll.answers[answer] || 0) + 1;
  answeredStudents.add(name);

};

exports.handleKickStudent = (io, name) => {
  io.emit('kick_student', name);
};
