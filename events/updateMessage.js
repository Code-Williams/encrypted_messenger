const Message = require("../models/Message");

module.exports = {
  name: "updateMessage",
  description: "Update a message with new text",
  async execute(socket, data) {
    const { id, message } = data;
    const findMessage = await Message.findByPk(id);
    if (findMessage) {
      findMessage.update({
        text: message,
      });
    }
  },
};
