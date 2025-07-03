const { Server } = require('socket.io');
const Poll = require('./models/Poll');

let activePoll = null;
let answers = {};

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('teacher:createPoll', async (questionData) => {
      if (!activePoll) {
        activePoll = questionData;
        answers = {};
        io.emit('poll:started', activePoll);

        setTimeout(async () => {
          io.emit('poll:results', answers);
          await Poll.create({ ...activePoll, results: answers });
          activePoll = null;
        }, 60000);
      }
    });

    socket.on('student:submitAnswer', async ({ name, answer }) => {
      answers[name] = answer;
      const totalResponses = Object.keys(answers).length;
      io.emit('poll:updateResults', { answers, totalResponses });

      if (totalResponses >= 3 && activePoll) {
        io.emit('poll:results', answers);
        await Poll.create({ ...activePoll, results: answers });
        activePoll = null;
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}

module.exports = { setupSocket };