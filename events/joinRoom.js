module.exports = {
  name: "joinRoom",
  description: "For when user wants to join to a room",
  execute(socket, data) {
    socket.join(data.room);
  },
};
