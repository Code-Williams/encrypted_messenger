const Message = require("../models/Message");

const post = async (req, res) => {
  await Message.create({
    chat_id: req.body["chat_id"],
    sender_id: req.body["sender_id"],
  }).then((msg) => {
    res.send(msg);
  });
};

module.exports = {
  post,
};
