const DMList = require("../models/DmList");
const Message = require("../models/Message");

const get = async (req, res) => {
  const messages = await Message.findAll({
    where: {
      chat_id: req.params.id,
    },
  });
  const firstDMList = await DMList.findAll({
    where: {
      creator_id: req.user.id,
    },
  });

  const secondDMList = await DMList.findAll({
    where: {
      chatter_id: req.user.id,
    },
  });

  res.render("dashboard", {
    user: req.user,
    flash: req.flash(),
    firstDMList,
    secondDMList,
    messages,
    chatId: req.params.id,
  });
};

const post = async (req, res) => {
  await Message.create({
    chat_id: req.params.id,
    text: req.body.text,
    sender_id: req.user.id,
  });

  res.redirect(`/chat/${req.params.id}`);
};

module.exports = {
  get,
  post,
};
