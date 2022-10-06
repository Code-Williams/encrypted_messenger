const Message = require("../models/Message");

module.exports = {
  name: "newMessage",
  async execute(socket, data) {
    await Message.create({
      chat_id: parseInt(data["chat_id"]),
      sender_id: parseInt(data["sender_id"]),
      text: data["message"],
    });
  },
};
