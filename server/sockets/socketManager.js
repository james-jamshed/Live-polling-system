const pollController = require('../controllers/pollController');
const chatController = require('../controllers/chatController');

const connectedStudents = new Map();

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

   
    socket.on('student_join', (name) => {
      connectedStudents.set(socket.id, name);
      io.emit('update_participants', Array.from(connectedStudents.values()));
    });

    
    socket.on('create_poll', (data) => {
      pollController.handleCreatePoll(io, data);
    });

    
    socket.on('submit_answer', (data) => {
      pollController.handleSubmitAnswer(io, data);
    });

    
    socket.on('chat_message', (msg) => {
      chatController.handleChatMessage(io, msg);
    });

  
    socket.on('kick_student', (name) => {
      for (let [id, studentName] of connectedStudents.entries()) {
        if (studentName === name) {
          io.to(id).emit('kick_student', name);
          connectedStudents.delete(id);
          break;
        }
      }
      io.emit('update_participants', Array.from(connectedStudents.values()));
    });

    socket.on('disconnect', () => {
      connectedStudents.delete(socket.id);
      io.emit('update_participants', Array.from(connectedStudents.values()));
      console.log('Socket disconnected:', socket.id);
    });
  });
};
