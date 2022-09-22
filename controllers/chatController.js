const DMList = require("../models/DmList");
const User = require("../models/User");
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

  if (req.params.id == "new") {
    res.render("dashboard", {
      user: req.user,
      flash: req.flash(),
      firstDMList,
      secondDMList,
      messages: null,
      chatId: 0,
      mode: "new chat",
    });

    return;
  }

  res.render("dashboard", {
    user: req.user,
    flash: req.flash(),
    firstDMList,
    secondDMList,
    messages,
    chatId: req.params.id,
    mode: "chat messages",
  });
};

const post = async (req, res) => {
  if (req.body.id) {
    if (req.body.id !== req.user.username) {
      const isUserValid = await User.findOne({
        where: {
          username: req.body.id,
        },
      });

      if (isUserValid) {
        const firstDMList = await DMList.findOne({
          where: {
            creator_id: req.user.id,
            chatter_id: isUserValid.id,
          },
        });

        const secondDMList = await DMList.findOne({
          where: {
            creator_id: isUserValid.id,
            chatter_id: req.user.id,
          },
        });

        if (firstDMList || secondDMList) {
          req.flash("danger", "You have converstation with this user.");
        } else {
          await DMList.create({
            creator_id: req.user.id,
            chatter_id: isUserValid.id,
            creator_name: req.user.username,
            chatter_name: isUserValid.username,
          });
        }
      } else {
        req.flash("danger", "User is not defined");
      }
    } else {
      req.flash("danger", "You can't start converstation to your self");
    }
  } else {
    await Message.create({
      chat_id: req.params.id,
      text: req.body.text,
      sender_id: req.user.id,
    });
  }

  res.redirect(`/chat/${req.params.id}`);
};

module.exports = {
  get,
  post,
};
