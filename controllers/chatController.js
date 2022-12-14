const DMList = require("../models/DmList");
const User = require("../models/User");
const Message = require("../models/Message");

const get = async (req, res) => {
  let messages = await Message.findAll({
    where: {
      chat_id: req.params.id,
    },
  });
  let firstDMList = await DMList.findAll({
    where: {
      creator_id: req.user.id,
    },
  });

  let secondDMList = await DMList.findAll({
    where: {
      chatter_id: req.user.id,
    },
  });

  let chatId = req.params.id == "new" ? 0 : req.params.id;
  let mode = req.params.id == "new" ? "new chat" : "chat messages";
  if (req.params.id == "new") messages = null;

  if (mode == "chat messages") {
    const searchSecondDM = secondDMList.find((dm) => dm.id == req.params.id);

    if (searchSecondDM && searchSecondDM.chatter_id == req.user.id)
      searchSecondDM.update({ password: null });
  }

  let opennedDM = firstDMList.find((dm) => dm.id == req.params.id);
  if (!opennedDM) {
    opennedDM = secondDMList.find((dm) => dm.id == req.params.id);
    if (opennedDM) opennedDM = opennedDM.creator_name;
  } else {
    opennedDM = opennedDM.chatter_name;
  }

  res.render("dashboard", {
    user: req.user,
    flash: req.flash(),
    firstDMList,
    secondDMList,
    messages,
    chatId,
    mode,
    opennedDM,
  });
};

// ------------------ POST -----------------

const post = async (req, res) => {
  if (req.body.id == req.user.username) {
    req.flash("danger", "You can't start converstation to your self");
    return res.redirect("/chat/new");
  }

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
      return res.redirect("/chat/new");
    }

    let password;

    req.body.encryptMsg == undefined
      ? (password = false)
      : (password = req.body.password);

    await DMList.create({
      creator_id: req.user.id,
      chatter_id: isUserValid.id,
      creator_name: req.user.username,
      chatter_name: isUserValid.username,
      password,
    }).then((s) => {
      res.redirect(`/chat/${s.dataValues.id}`);
    });
  } else {
    req.flash("danger", "User is not defined");
    res.redirect("/chat/new");
  }
};

module.exports = {
  get,
  post,
};
