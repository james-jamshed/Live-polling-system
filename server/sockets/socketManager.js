const {
  handleCreatePoll,
  handleSubmitAnswer,
  handleKickStudent,
} = require('../controllers/pollController');
const { handleChat } = require('../controllers/chatController');

function socketManager(io, socket) {
  console.log('Socket connected:', socket.id);

  socket.on('create_poll', (data) => handleCreatePoll(io, data));
  socket.on('submit_answer', (data) => handleSubmitAnswer(io, data));
  socket.on('chat_message', (msg) => handleChat(io, msg));
  socket.on('kick_student', (name) => handleKickStudent(io, name));

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
}

module.exports = socketManager;
