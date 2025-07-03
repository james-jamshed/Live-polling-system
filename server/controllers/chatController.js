exports.handleChatMessage = (io, msg) => {
  io.emit('chat_message', msg);
};
