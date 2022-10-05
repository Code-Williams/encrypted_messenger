module.exports = {
  name: "messageCreate",
  execute(socket, data) {
    socket.broadcast.to(data.room).emit("message", data);
  },
};
